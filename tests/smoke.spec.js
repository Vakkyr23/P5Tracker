// Smoke suite (v3.6.2) — the regression guards this project actually needs:
// boot + version lineage, the Royal Readiness derivation (incl. Kasumi's "5/MAX"
// parseInt), the one-way Metaverse Sync bridge, and full offline via the SW —
// lazy tab chunks included. Anything here breaking means a real user-facing bug.
import { test, expect } from '@playwright/test';
import { APP_VERSION } from '../src/data/version.js';

// Suppress first-run modals and pin state before the app boots.
const seed = (extra = {}) => (ctxPage) =>
  ctxPage.addInitScript((data) => {
    localStorage.setItem('p5r_onboardingComplete', 'true');
    localStorage.setItem('p5r_lastSeenVersion', '9.9.9');
    for (const [k, v] of Object.entries(data)) localStorage.setItem(k, v);
  }, extra);

const nav = async (page, label) => {
  await page.evaluate((t) => {
    [...document.querySelectorAll('nav button')].find((x) => x.textContent.includes(t))?.click();
  }, label);
  await page.waitForTimeout(600); // lazy chunk + mount
};

const readiness = (page) =>
  page.evaluate(() => {
    // v4.0.0: the h3 lives inside a plate header row, so closest('div') would
    // stop there — climb to the card shell (.pc-cut) and read the semantic
    // .pc-count spans instead. The guarded behavior (derivation incl. the
    // Kasumi "5/MAX" parseInt case) is unchanged.
    const card = [...document.querySelectorAll('h3')]
      .find((h) => h.textContent.includes('Royal Readiness'))?.closest('div.pc-cut');
    return card
      ? [...card.querySelectorAll('.pc-count')].map((s) => s.textContent)
      : null;
  });

test('boots with the right title and version', async ({ page }) => {
  await seed()(page);
  await page.goto('./', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle('P5R — 100% Phantom Chart');
  await expect(page.locator('body')).toContainText(`v${APP_VERSION}`);
});

test('Royal Readiness derives from the schedule + current day', async ({ page }) => {
  // NB: no p5r_day in the init seed — addInitScript re-runs on reload and would
  // stomp the mid-test day change. 4/9 is the app's own default (GAME_START).
  await seed()(page);
  await page.goto('./', { waitUntil: 'networkidle' });
  expect(await readiness(page)).toEqual(['0/9', '0/8', '0/5']);

  await page.evaluate(() => localStorage.setItem('p5r_day', '11/20'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const late = await readiness(page);
  expect(late?.[2]).toBe('5/5'); // Kasumi "5/MAX" — parseInt guard; Number() would give 0/5
  expect(late?.every((v) => !v.startsWith('0/'))).toBe(true);
});

test('Metaverse Sync registers one-way (uncheck never un-registers)', async ({ page }) => {
  await seed()(page);
  await page.goto('./', { waitUntil: 'networkidle' });
  await nav(page, 'Metaverse');
  const reg = () =>
    page.evaluate(() => JSON.parse(localStorage.getItem('p5r_checkedItems') || '{}')['p_Agathion']);
  await page.locator('.p5m .fus .box').first().click();
  await page.waitForTimeout(250);
  expect(await reg()).toBe(true);
  await page.locator('.p5m .fus .box').first().click();
  await page.waitForTimeout(250);
  expect(await reg()).toBe(true); // still registered
});

test('works fully offline, lazy tab chunks included', async ({ page, context }) => {
  await seed()(page);
  await page.goto('./', { waitUntil: 'networkidle' });
  // Wait until the SW is *activated and controlling this page* before cutting
  // the network. `serviceWorker.ready` resolves only after install completes —
  // i.e. the FULL Workbox precache is written (activate never fires
  // mid-install) — and `controller` (via clientsClaim) means the coming
  // reload's navigation is actually intercepted.
  // Gotcha (found v3.7.0): waitForFunction treats an async predicate's
  // *pending Promise* as truthy, so the old `cache entries >= 10` check was a
  // no-op that passed mid-install on timing luck; cutting the network then
  // killed the install → no controller → offline reload hit the network.
  // page.evaluate awaits its promise, so this version is race-free.
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise((res) =>
        navigator.serviceWorker.addEventListener('controllerchange', res, { once: true }));
    }
  });
  await context.setOffline(true);
  await page.reload({ waitUntil: 'load' });
  await expect(page.locator('nav button')).toHaveCount(5);
  for (const tab of ['Calendar', 'Confidants', 'Metaverse']) {
    await nav(page, tab);
  }
  await expect(page.locator('.p5m')).toBeVisible(); // lazy chunk served from cache
});

test('compendium card expands with details and never touches registration', async ({ page }) => {
  // D10 (v4.1.0): the chevron is a separate affordance — expanding must show
  // stats/affinities/skills/trait and must NOT flip the p_ registration key.
  await seed({ p5r_reg_subtab: 'personas' })(page);
  await page.goto('./#registry', { waitUntil: 'networkidle' });
  await page.fill('input[placeholder*="Search"]', 'Arsène');
  await page.getByRole('button', { name: 'Arsène details' }).click();
  const panel = page.locator('#pd-Ars_ne'); // sanitized aria-controls id
  await expect(panel).toBeVisible();
  await expect(panel).toContainText('Pinch Anchor');           // trait
  await expect(panel).toContainText('Ice · Weak');             // WEAK chip
  await expect(panel).toContainText('Innate');                 // base-level skill badge
  await expect(panel.locator('.grid.grid-cols-5 > div').first()).toContainText('2'); // St 2
  const registered = await page.evaluate(
    () => JSON.parse(localStorage.getItem('p5r_checkedItems') || '{}')['p_Arsène']);
  expect(registered).toBeFalsy();
});
