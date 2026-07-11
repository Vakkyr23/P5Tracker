# Changelog

All notable changes to this project will be documented in this file.

## [4.1.0] - 2026-07-11
### Added — Persona Compendium detail cards (Batch F complete, mockup D10)
- **All 232 personas carry full compendium details:** base stats (St/Ma/En/Ag/Lu), the 10-element affinity row, the learned-skill list with levels, and the Royal trait — expandable in place on every Registry card via a chevron. **Body click stays registration-only**; the chevron never touches the `p_` key (smoke-guarded).
- **Ungated by design:** stats/affinities/skills are mechanics, not story — the registry already lists every name and level.
- **Token chips per the signed-off mockup:** WEAK on the pinned warm-danger token (`--c-weak`, never the theme accent — it stays red under Clinic) with the Royal-only `edge-ink` rim, RESIST slate, NULL dark-outline, REPEL inverted, DRAIN green, neutral dimmed; **INNATE badge** replaces the level on base-level skills.
- **Data pipeline sealed:** `scripts/vendor/roy-demon-data.json` vendored (Unlicense; SHA-256 + provenance in `scripts/vendor/SOURCE.md`), one-shot `--all` ingest run (owner-approved source amendment), `check:details` green at **232/232**; sentinels verified (Arsène wk Ice/Bless + rs Curse, Regent's 11 innates via the fractional-counter rule, Mitra through the alias, Orichalcum wk Bless). Allchart remains the arbiter — a spot-check sheet ships with the session deliverables.
- **Smoke suite grows to 5:** the compendium card expand + registration-isolation guard.
### Notes
- Registry lazy chunk grows by the detail data (precache 742.9 → 831.5 KiB); still zero third-party requests.

## [4.0.1] - 2026-07-11
### Added
- **Orichalcum** — Royal's ninth treasure demon joins the tracker (Faith · lv 60 · Maruki's Palace, 3rd semester · weak Bless; Palace-only, never in Mementos). The vanilla-P5 list had missed Royal's addition; it was already in the 232 registry. New `Bless` weakness chip; roadmap #4 count corrected to 9.
- **`check:ids` gate** (`scripts/check-data-ids.mjs`, npm + CI): every stable check-state key source — deadline `id`s, award `id`s, persona names, demon names — must exist and be unique. Born from the 2026-07-11 live incident where id-less data files met id-keyed components and every award shared the key `t:undefined`.
### Changed — deferred Phantom polish (from the 4.0.0 list)
- **Calendar in-list weekend ink:** Sundays warm-red, Saturdays cyan (the DatePlate convention lands in the list); the active day carries a **today-diamond**; days behind the active day take the game's **elapsed slash** and dim.
- **More grid goes angular:** the seven navigation cards swap rounded corners for the `pc-cut` corner cut (clipped drop shadows dropped with them); icon plates squared.
- **App-wide focus sweep (D16):** the counter-color keyboard-focus ring now applies to every focusable element, not just the rail — including inputs that previously relied on border color alone.
- **Roadmap truth pass:** #5 (PWA) finally reads *Implemented* (shipped v3.6.0); #3's cheat-sheet line no longer claims day-tying (that's an explicit *Backlog* item now); #4 reflects nine demons.

## [4.0.0] - 2026-07-05
### Changed — "Phantom Chrome" design overhaul (Tiers A + B, mockup-approved D1–D17)
- **Shell:** sheared wordmark plate + keyline version chip, a diagonal seam replaces the straight border rule, skewed Sync button; the tab rail is parallelogram tabs with **one traveling selector** (D17) and counter-color focus rings (D16, `--c-focus`).
- **Motion (D14):** every new animation is opt-in behind a `data-motion` root attribute — More-menu setting (`p5r_motion`, raw: `system`/`full`/`reduced`; `system` follows `prefers-reduced-motion`). Tab-switch wipe (200 ms, D5), loading moment (D4), 150 ms stamp pop. No `!important` anywhere.
- **Theme (D15): Clinic replaces Night** — deep-navy surfaces + cobalt accent across the shell **and** all three scoped tabs (`.p5x/.p5s/.p5m`); stored `night` maps forward in the theme hook initializer, so current localStorage and old save files restore cleanly. Deep-fill convention: white ink + light keyline via `--chip-ink`/`--chip-line`; `.edge-ink` stays white-on-red only (Clinic disables the rim).
- **Semantics pinned per theme:** `--c-gold` (reward-yellow, maxed states only — D8), `--c-weak`, `--c-good`, `--c-focus`, `--c-sat`.
- **Briefing:** Royal Readiness gets the corner cut + plate header + slant-cut gauges; fully maxed = gold gauges, gold counts and a MAX chip (D8).
- **Registry (D9):** registered personas & treasure demons show a **green ✓ stamp at full opacity** — no more dim/strike (compendium, not a task list); level chips are sheared keyline chips. Task lists elsewhere keep dim + strike.
- **Date plate (D3):** the shared current day renders as the P5 date flag in Calendar + Command Suite (derived weekday, display-only; Sun red / Sat cyan).
- **Sync Terminal:** the export-age chip is a sprocket-edged save-slot. **Reference Hub:** plate header. **Backdrop:** static inline halftone.
### Notes
- No game-data values changed; check keys, aria contracts and both Ko-fi placements untouched. Zero new assets or requests (texture and marks are inline).

## [3.7.1] - 2026-07-04
### Added
- **Persona Compendium data track — Batch F groundwork** (no runtime change; nothing imports the new module yet):
  - `src/data/personaDetailData.js` — the approved Phase 1 schema (stats / affinities / skills / trait; itemization reserved for Phase 2), `AFFINITY_ORDER` + token constants, and an empty `PERSONA_DETAILS` awaiting the first ingest.
  - `scripts/check-persona-details.mjs` (**`npm run check:details`**, also a CI step) — integrity gate: exact registry-name keys, stat ranges, the 10-key affinity shape with the `wk/rs/nu/rp/dr/-` token whitelist, skill-level sanity vs base level incl. an innate-present check, non-empty traits, and a Phase-2 field tripwire.
  - `scripts/ingest-persona-details.mjs` — deterministic transform from the `aqiu384/megaten-fusion-tool` Royal dataset (Unlicense) into the schema: accent-aware name mapping + explicit alias table (registry "Mitra" ↔ dataset/official "Mithra"; registry names are never altered), verified resist-string order, innate-counter decoding (the source's `0.1…1.1` convention — integer `1` is an innate, never a learn level), arcana/level cross-guards per persona, `--arcana`/`--all`/`--dry` modes, merge-by-regeneration in registry order for stable diffs.

### Notes
- The designated stat authority (JP allchart) blocks automated access and has no archived snapshot; running the ingest is **gated on an owner-approved source amendment** (dataset validated in-session: 232/232 names mapped, full arcana/level agreement, end-to-end ingest + integrity pass demonstrated, then reverted). The allchart remains the arbiter for spot-checks and disputes.

## [3.7.0] - 2026-07-03
### Changed
- **App.jsx extracted into components** (~1,740 → ~670 lines; behavior unchanged, markup verbatim): the **Sync Terminal** (whole save system — envelope, import pipeline, export-age chip, file drop) → `components/SyncTerminal.jsx`; the shared **Modal** shell → `components/Modal.jsx`; the **Briefing** cheatsheet (dashboard, Royal Readiness derivation, tips, School/Crossword Answers, zucram's SupportCard — Ko-fi link intact) → `components/Briefing.jsx`; the **Persona Registry** (both sub-tabs + sticky controls + spoiler gate) → `components/PersonaRegistry.jsx`; the **Reference Hub** → `components/ReferenceHub.jsx`; the legacy **crossword migration** → `utils/migrateCrosswords.js` (shared by App's mount migration and the Terminal's legacy-save import).
- **All four remaining views are now `React.lazy`** like the original three. Main chunk **474.29 → 413.89 kB** (gzip 126.2 → 111.6 kB); new chunks: Briefing 27.5 kB, PersonaRegistry 14.6 kB, ReferenceHub 11.4 kB. The SW precaches all of them — offline unchanged (smoke-verified).
- **`usePersistentState` gained a `{ raw: true }` mode** (plain-string storage, optional `(stored) => value` initializer for validation/migration; JSON mode byte-identical for all existing callers). The six App-shell keys — `p5r_theme`, `p5r_route`, `p5r_activeTab`, `p5r_day` (in App) and `p5r_reg_subtab`, `p5r_td_mode` (now inside PersonaRegistry) — migrated off hand-rolled useState+effect pairs onto the hook **with their raw-string encoding preserved**, so existing stored values, old save files, and the smoke suite's raw seeds all stay valid. Hash-priority init and the legacy `activeTab` value mapping are intact (Playwright-probed: 9/9).
- **Route picker is keyboard-navigable**: ArrowUp/ArrowDown move focus through the options (wrapping; ArrowDown from the trigger enters the list), Home/End jump, Escape closes and returns focus to the trigger.

### Fixed
- **Smoke suite: latent service-worker precache race.** `waitForFunction` treats an async predicate's *pending Promise* as truthy, so the old "≥ 10 cache entries" wait was a no-op passing on timing luck; this session's extra lazy chunk shifted install timing and the offline test started cutting the network **mid-install** (no activation → no controller → `ERR_INTERNET_DISCONNECTED`). Replaced with an awaited, event-driven `page.evaluate` on `navigator.serviceWorker.ready` + `controllerchange` — race-free, and the suite is faster.

### Removed
- **Vestigial `anchoredMonth` state** (setter removed back in v3.1.0; nothing read it). The Sync Terminal keeps the legacy-import mapping so old flat saves still restore the key.
- Stale "PROTOTYPE (v2) / state is in-memory" header comment in CalendarView; the `.edge-ink` CSS comment now correctly says **white-on-red only**; the Metaverse compendium stamp's native `title=` became `role="img"` + `aria-label`.

### Notes
- One intentional consequence of the lazy conversion: **transient per-tab UI state now resets when you leave the tab** (Briefing's School-Answers search box; Registry search/arcana filter/spoiler peeks) — components unmount on tab switch, exactly like the Calendar/Confidants/Metaverse tabs have always behaved. Everything persisted (sub-tab, spoiler mode, theme, route, day, every checklist) is unaffected.

## [3.6.2] - 2026-07-03
### Added
- **CI guards (deploy workflow):** every push to `master` now runs ESLint, a **version-lineage check** (`scripts/check-version.mjs` — fails when `version.js`, `package.json` and the top CHANGELOG entry disagree; the guard against the checkpoint fork that lost a remediation pass), the build, and the smoke suite **before** anything deploys.
- **Committed smoke suite** (`tests/smoke.spec.js`, `@playwright/test`, `npm run test:smoke` against `vite preview` of the built app): boot + title + footer-version-matches-`APP_VERSION`; Royal Readiness derivation at two days **including the Kasumi `"5/MAX"` → `5/5` parseInt guard**; one-way Metaverse Sync (uncheck never un-registers); **full offline reload with lazy tab chunks served from the SW precache**.
- **"Last export" indicator in the Sync Terminal:** Download/Copy stamp `p5r_lastExport`; the terminal shows *today / yesterday / N days ago*, amber with a ⚠ when never exported or ≥ 7 days old — a nudge that the save *file* has an age even though the PWA keeps the app alive.

### Changed
- **Accessibility pass:** every check control (calendar day-complete, deadlines, Thieves' Den awards, fusion steps, Will Seeds, Registry persona cards) is now a real `role="checkbox"` with `aria-checked` + an accessible name, and Registry cards gained keyboard operation; blurred story lines and chip rows are keyboard-revealable (`Enter`/`Space`, with scroll-jump prevented); the NG+ carry-over cycler and demon register toggle announce their state; **modals are `role="dialog" aria-modal`** and move focus in on open / restore it on close.
- Deploy workflow Node 20 → 22 (matches the documented dev environment).

## [3.6.1] - 2026-07-03
### Changed
- **Code-split tabs (Batch D):** `CalendarView`, `CommandSuite` and `MetaverseAids` now load via `React.lazy` behind a themed Suspense fallback, each on first visit. Main chunk **546 kB → 472 kB** (gzip 146 → 125), plus three ~23–27 kB tab chunks and shared micro-chunks — **the 500 kB build advisory is gone**. The service worker precaches every chunk, so offline behavior is unchanged. `calendarData` deliberately stays in the main chunk: `App` itself needs it for the legacy `p5r_cal_activeIdx` save migration.

## [3.6.0] - 2026-07-03
### Added
- **Installable PWA:** web app manifest ("P5R — 100% Phantom Chart" / "Phantom Chart", standalone, `#08050a`) + a Workbox service worker (`vite-plugin-pwa`, `autoUpdate`) precaching the entire app shell — code, styles, fonts, icons (20 entries, ~720 KiB). Install it and the tracker opens instantly and **fully offline**, surviving a browser that clears site data on close. New deploys swap in on the next visit.
- **App icons:** original P5-flavored mark (black field, skewed scarlet plate, "P5R") as SVG favicon + 192/512 PNGs + a maskable 512 + apple-touch-icon. Replaces the default `vite.svg`.
- `navigator.storage.persist()` requested at boot (guarded) — asks the browser to exempt this origin from storage eviction.

### Changed
- **Fonts self-hosted (offline + zero third-party requests):** Inter (variable, 400–800) and Saira Condensed (600/700/800) now ship as latin-subset woff2s under `public/fonts/`, declared once in `index.css`. Removed the Google Fonts `<link>`s from `index.html` and the duplicate `@import`s from all three tab styles (Oswald was only an unreachable fallback in one of them and was dropped with its import). Rendering is unchanged — the files are the unmodified fonts.gstatic.com woff2s.

## [3.5.3] - 2026-07-02
### Fixed
- **Tooltip hover-storm:** `tipHandlers` fired a React state update on **every `mousemove`**, re-rendering the whole tab per pixel while hovering (297 DayCards on the Calendar). Now the only renders are one on show (enter/focus) and one on hide; cursor-following mutates the bubble's position directly through a ref, throttled to one update per animation frame. Behavior is unchanged — the bubble still tracks the pointer.

### Changed
- **Stable check-state keys (with one-time migration):** deadlines were keyed `"d:"+due+item.slice(0,8)` — text-fragile, and 8 of 13 rows share the literal prefix `"Send the"`, so one date edit away from a collision; Thieves' Den awards were keyed by array index — order-fragile. Both data modules now carry an explicit `id` field (13 semantic deadline slugs; 52 script-slugged, uniqueness-verified award ids) and the Command Suite keys on them. Legacy keys inside `p5r_cmd_checked` are migrated on first load (moved, then deleted — idempotent). Game-data *values* untouched.
- **Lint blind spot closed:** dropped `varsIgnorePattern: '^[A-Z_]'` (it exempted every component/icon/data import from `no-unused-vars` — how 8 dead imports hid at "0 problems") and added `eslint-plugin-react`'s `jsx-uses-vars` so JSX usage counts. Removed the now-redundant per-line disable in `App.jsx`. Still 0 problems, now with teeth.
- **Dependencies:** `npm audit fix` + patch-level updates — **10 advisories (5 high) → 0**. react/react-dom 19.2.3 → 19.2.7, vite 7.3.0 → 7.3.6, plus toolchain patches. No major-version jumps.

## [3.5.2] - 2026-07-02
### Fixed
- **Royal Readiness widget (was frozen):** the Briefing gauge read `p5r_confidantRanks`, a key nothing has written since v3.1.0, so Maruki/Akechi/Kasumi sat at 0 forever. Ranks are now **derived live** from `CONFIDANT_SCHEDULE` + the shared current day (`p5r_day`) via `useMemo`. Parsing uses `parseInt`, not `Number()` — Kasumi's rank is the string `"5/MAX"` (`Number()` → `NaN` → 0 would re-freeze her gauge). The dead state + its write-back effect were removed; the legacy save-import mapping for the old key is kept (inert, preserves old-save round-trips).
- **Runtime title override removed:** an effect forced `document.title` to "P5 Tracker" in prod ("P5Tracker - DEV" in dev), silently overriding `index.html`. The tab title is now `index.html`'s "P5R — 100% Phantom Chart" everywhere; the fork-rename decision stays open and now has a single place to land.

### Changed
- **Stale copy refresh:** Command Suite footer no longer says "Preview of three tabs … tabs come next"; Calendar footer no longer promises "later passes" for shipped features; **Metaverse PREVIEW badge removed** (+ its orphaned `.proto` CSS) and its footer updated — the tab is feature-complete since Metaverse Sync.
- **Roadmap reconciled:** #4 Persona Compendium → **Implemented** (Metaverse Sync *(Next)* → *(Done)*); #6 Fusion Calculator → **Link-out** ("deliberately not built in — use the community calculator in the Reference Hub"), matching the hard rule.
- **240 → 232:** the registry holds 232 Personas (matches upstream); corrected in `roadmap.js`, an `App.jsx` comment, and the v3.2.0 release-note line (wrong at publication, still shown in full history).
- `package.json` version synced to the app version (was stuck at 2.3.0).

## [3.5.1] - 2026-07-02
### Removed
- **Dead build config:** dropped the unused `__BRANCH__` define and its `execSync` git-branch probe from `vite.config.js` (nothing in the app read it; every zip-based build printed a "Could not determine git branch name" warning), plus the matching orphan `__BRANCH__` global in `eslint.config.js`.
- **Unused imports (hygiene, zero behavior change):** `React` default imports in `App.jsx` and all three tab components (automatic JSX runtime — no `React.*` usage anywhere), five unused lucide icons in `App.jsx` (`Circle`, `Coffee`, `Target`, `Gift`, `MessageCircle`), and two unused data imports (`CONFIDANT_INTERACTIONS`, `CONFIDANT_STAT_GATES`). Note: the project ESLint config exempts capitalized identifiers from `no-unused-vars` (`varsIgnorePattern: '^[A-Z_]'`), which is why these sat invisible at "0 problems" — flagged separately in the 2026-07-02 review.

## [3.5.0] - 2026-06-22
### Added
- **Metaverse Sync (Fusion Path → Compendium):** checking a Fusion Path step now registers its result Persona in the Registry via a **one-way bridge** (`f<i>` → `p_<result>`; unchecking never un-registers). A green, name-free "registered" stamp appears on each synced step. `MetaverseAids` now receives `currentDay`, `checkedItems`, and `toggleItem` from `App`. All 12 Fusion-Path result names match registry names verbatim, so the bridge needs no fuzzy matching.
- **Fusion sync panel:** a compendium strip above the Fusion Path showing **Fusion Path** (steps done /12), **Registered** (path results now in the Compendium /12), and **Compendium** (total registered /232).
- **Fusion Path sort:** a "Path order / By palace" toggle (`p5r_meta_fsort`). The Palace view groups steps under each Palace and flags the one open on the shared current day as **Available now**, driven by `PALACE_WINDOWS` (new in `fusionPathData.js`; window dates sourced from the in-app Calendar/Deadlines so the highlight never contradicts the Calendar tab).

## [3.4.4] - 2026-06-21
### Removed
- **Command Suite "PREVIEW" badge:** dropped the header `.proto` badge (a leftover build-status marker; the tab runs on real data). Metaverse keeps its badge for now (still preview).

### Changed
- **Centralized tooltip cursor:** the help cursor (`cursor: help`) was a Calendar-only rule, so tooltips elsewhere fell back to the text I-beam. Moved it into the shared tooltip system — `tipCss(scope)` now emits `${scope} .hastip{ cursor:help }`. `CalendarView` adopts `tipCss(".p5x")` (removing its duplicate inline `.tipbubble` + `.hastip` cursor rules — single source of truth now), and the Metaverse Fusion `alt` badge gained the `hastip` class. Every tooltip now shows the arrow-with-`?` cursor from one place.

## [3.4.3] - 2026-06-21
### Changed
- **Legend bubble:** the Command Suite legend now uses the tooltip-style surface (`--surf2` bg, `--line` border, rounded, `--shadow`) so it stands out from the background instead of blending in.
- **Route-aware Confidants legend:** the `♥ romance rank` key is shown only when a romance route is active (`romArcana` truthy). On the Platonic route no Confidant rank is heart-flagged (`ROMANCE` Platonic `arcana: null`), so listing it was misleading. (The `♥` marker itself was never broken — it flags the romance partner's Confidant at R9, e.g. Futaba/Hermit 11/27 R9; verified.)

## [3.4.2] - 2026-06-21
### Changed
- **Command Suite legends:** Replaced the repetitive per-element tooltips (confidant `·a`/`♥` rank markers, Thieves' Den medals header + P-Medals chip) with a compact **contextual legend** in the sub-tab row — right-aligned, swapping by active sub-tab (`·a auto-rank · ♥ romance rank` on Confidants; a gold `P = P-Medals · hideout currency` key on Thieves' Den). Removed the now-unused tooltip hook/plumbing from `CommandSuite`.

### Removed
- **Fusion "Result Persona" tooltip:** dropped — the chip already shows the Arcana + base level. The Fusion `alt` tooltip is retained.

## [3.4.1] - 2026-06-21
### Fixed
- **Tooltip consistency:** Command Suite (confidant rank `·a`/`♥` markers, Thieves' Den medals header + P-Medals chip) and Metaverse (Fusion result chip + `alt` badge) used native HTML `title` attributes that rendered as inconsistent, mispositioned browser tooltips. Extracted the Calendar's floating-tooltip system into a shared `src/hooks/useTooltip.js` (`useTooltip`, `tipHandlers`, `tipCss`) and wired all three tabs to it; `CalendarView` now consumes the same hook (single source of truth). All tooltips share identical styling + positioning and are theme-aware.

## [3.4.0] - 2026-06-21
### Added
- **Sync Terminal file import:** a "Load Save File" drop zone (click-to-pick + drag-and-drop) with a filename preview. Reads the chosen `.json`/`.txt` via `FileReader` into the existing import pipeline. The import logic was extracted into a shared `runImport(text)` used by both the file loader and the paste box; the destructive-replace confirmation is unchanged. Import text + filename clear when the terminal closes.

### Changed
- **Spoiler-Free blur (functional fix):** future days now blur *all* content — every `Day`/`Night`/`Notes` line (not just `story`-typed) plus the chips row (new `BlurChips` + `.chips.chipblur`, tap-to-reveal). Gate moved from `idx >= activeIdx` to `idx > activeIdx`, so the **active day stays clear** (matching Story-Safe's frontier); past days remain clear. Legend text updated.

### Fixed
- **Arcana filter dropdown:** added `md:min-w-[200px]` so long options ("All Arcanas", "Hierophant", "Councillor") no longer clip on desktop.

## [3.3.0] - 2026-06-21
### Added
- **Shared "current day":** The Calendar and Command Suite (Confidants tab) now read one shared day, lifted to `App` and persisted as `p5r_day` (a date string). New `src/data/timeline.js` holds the canonical 301-day spine (`DAY_AXIS`/`DAY_INDEX`) used by both. Moving the day in either tab updates the other; the Calendar maps the shared date to its nearest curated day for the four dates it skips.

### Changed
- `CommandSuite` and `CalendarView` no longer own their own day index — they derive it from the shared `currentDay` prop. `CommandSuite` now imports the axis from `timeline.js` instead of building its own.
- **Migration:** the legacy `p5r_cmd_activeIdx` / `p5r_cal_activeIdx` keys are migrated into `p5r_day` on first load (preferring the Command Suite axis as the superset) and then retired. Old `.json`/`.txt` saves still restore the day via the same migration path.

## [3.2.1] - 2026-06-21
### Fixed
- **Treasure Demon legibility:** Removed a misapplied `edge-ink` (a dark rim meant for *white*-on-red) from the black-on-red level badges and active Registry sub-tab, which was muddying them. They now match the app's black-text + inset-keyline tab/badge convention. The "Treasure Demons · n/8" count is now neutral so it reads clearly against the dark panel.

### Changed
- **Calendar Spoiler-Free:** Story beats now blur only on the active day and future days; days already passed (`idx < activeIdx`) render in the clear. (`CalendarView.jsx`: `blurStory` gated by `idx >= activeIdx`.)

## [3.2.0] - 2026-06-21
### Added
- **Treasure Demon Tracker:** The Persona Registry now has two sub-tabs — Personas (the 240) and Treasure Demons (all 8), each tracking its own progress. Demon cards show level, Arcana, Palace location, a color-coded weakness chip, and a battle tip.
- **Demon spoiler gating:** A per-sub-tab Story-Safe / Spoiler-Free / Reveal All switch (default Story-Safe, mirroring the Calendar). The gate keys on registration: Story-Safe seals unregistered demons (level spine shown, rest hidden) and Spoiler-Free blurs locale + tips until registered, both with tap-to-Peek. Registered state persists under `td_<name>` and is captured by the save system.

### Changed
- **Roadmap #4 (Persona Compendium):** Arcana Checklists and Treasure Demon Tracker marked done; Metaverse Sync flagged as next.

## [3.1.0] - 2026-06-21
### Added
- **Full Save System:** The Sync Terminal now backs up the entire app state — all progress, every tab's checklists (Calendar, Confidants, Will Seeds, NG+), route, and theme — in a single dated `.json` file, instead of only four App-level slices.

### Changed
- **Safe Restore:** Imports are validated, confirm before overwriting, then reload so every tab rehydrates from storage. Legacy `.txt` saves still import.
- **Royal Legibility:** White text on red surfaces (Royal Readiness card, palace banners, active tabs/pills) now carries a crisp comic-style edge to stop the red/white shimmer; the active main tab gains a hard keyline.

### Removed
- Redundant header "Support zucram" button (the Briefing banner and footer Ko-fi links remain).

## [3.0.0] - 2026-06-19
### Added
- **100% Completion Overhaul:** Day-by-day spoiler-gated calendar (4/9 → 2/3, incl. third semester) replacing the month grid, with Story-Safe / Spoiler-Free / Reveal All modes.
- **Command Suite:** Deadline dashboard, full Confidant schedule, and Thieves' Den (P-Medal) tracker.
- **Metaverse Aids:** Recommended fusion path, all 24 Will Seeds, and an NG+ / romance-rotation planner.
- **Royal & Night Themes:** CSS-variable-driven scarlet/black and cool-blue skins via a single header toggle.

### Changed
- JP-corrected stat values reconciled against the Japanese all-Confidant chart.

### Removed
- Umami analytics and the support-nudge subsystem (static Ko-fi credit links retained).

## [2.2.0] - 2026-01-10
### Added
- **Priority Roadmap:** Redesigned the monthly checklist into "Mission Critical" and "Timeline" sections.
- **Visual Task Categorization:** Tasks now use distinct icons and colors (School, Calendar, Ops) for faster scanning.

## [2.1.5] - 2026-01-10
### Fixed
- Prevented double popups (Onboarding + Changelog) for first-time users.

## [2.1.4] - 2026-01-10
### Changed
- Refined **Mission Briefing** (Onboarding) to be more action-oriented, explaining how to use the timeline anchor and backlog systems.

## [2.1.3] - 2026-01-10
### Added
- **Onboarding Guide:** New high-impact welcome tutorial for first-time users.
- **Help Center:** Replay the onboarding guide via the new "Help" link in footer.

### Fixed
- Changed default starting month to April (was July).

## [2.1.2] - 2026-01-10
### Added
- Integrated **Umami Analytics** (GDPR compliant, privacy-first).
- Custom event tracking for Support, Sync, Roadmap, and History toggles.

## [2.1.1] - 2026-01-10
### Fixed
- Improved changelog trigger logic to only popup on Major/Minor version changes.
- Updated support links to point directly to GitHub and Ko-fi.

## [2.1.0] - 2026-01-10
### Added
- **Mobile UX Redesign:** Complete overhaul for vertical screen density.
- **Accordion Lists:** Confidants and Mementos now use space-saving expandable cards.
- **Inline Controls:** Update Confidant ranks directly from the list view.
- **History Management:** Completed Palaces and Mementos paths are now archived/collapsed by default.
- **In-App Changelog:** New "What's New" modal to track updates.
- **Feature Roadmap:** In-app view of upcoming features.
- **Dynamic Versioning:** App automatically reflects version from configuration.

### Fixed
- Corrected Will Seed descriptions for all Palaces.
- Fixed Shido Palace seed locations and colors.
- Corrected Mementos "Path of Da'at" history detection.
- Improved auto-expansion logic for Palaces spanning multiple months.

## [2.0.4] - 2026-01-10
### Added
- "Support" button in header linking to Ko-fi.

## [2.0.1] - 2026-01-10
### Fixed
- Initialization bug where the app would reset to July on refresh instead of staying anchored.

## [2.0.0] - 2026-01-08
### Changed
- Major refactor to pure static site with localStorage persistence.
- Extraction of game data into modular JS files.
- Implementation of "Timeline Anchor" navigation.
