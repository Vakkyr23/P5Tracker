# P5R — 100% Phantom Chart

> A personal, work-in-progress fork of [zucram's **P5Tracker**](https://github.com/zucram/P5Tracker), rebuilt around a **day-by-day, spoiler-gated walkthrough** to help me (and anyone like me) finally clear **Persona 5 Royal** at 100%.

**This is not the original P5Tracker.** It's a personal fork with a different goal and a fair amount of added/rewritten functionality. If you want the original, polished tracker, go to **[zucram/P5Tracker](https://github.com/zucram/P5Tracker)** — all credit for the foundation (the React/Vite UI, the Confidant interaction guides, the Persona data) belongs to zucram.

---

## Why this fork exists

P5R isn't hard to *play* — it's hard to *finish at 100%*. The blockers are logistical: a time-gated calendar, missable Confidants, hard deadlines, and routes you can lock yourself out of. The original tracker is a great reference, but I wanted the **calendar to be the spine** of the whole thing: one scrollable, day-by-day plan I can follow from 4/9 to 2/3 without spoiling myself on what's coming next.

So this fork keeps what's good about the original and adds the planning layer I was missing.

## What's different from the original

- **Day-by-day calendar (the headline feature).** All ~297 days from April 9 to February 3, each with day/night actions, stat cues, Confidant windows, and deadline markers — replacing the original month-grid view.
- **Three-level spoiler gating.** *Story-Safe* (default) hides both story **and** mechanics past your current day; *Spoiler-Free* blurs plot but keeps mechanics; *Reveal All* shows everything. You set an "active day" and the future stays dark until you reach it.
- **Selectable romance route.** Pick any of the 10 romance options or stay **Platonic**. The calendar *and* the Confidants tab both react to your choice — the Christmas date, matching-Arcana XP cues, and the rank-9 romance flag all follow the route you picked.
- **Command Suite (Confidants tab).** A deadline dashboard (every Palace / Confidant hard date counting down to *your* day), a Confidant command center, and a full Thieves' Den award checklist.
- **Metaverse Aids tab.** Fusion-path recipes, a Will-Seed locator for every Palace, and an NG+ carry-over / romance-route planner.
- **Royal & Night themes**, a single unified theme switch, and `localStorage` persistence so your progress sticks.

## Status

Personal project, **actively in progress** — expect rough edges, placeholder sections, and frequent changes. It's as much a learning project as it is a tool. Installable PWA / second-screen support is the next priority.

## Run it locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
```

Requires Node 18+ (developed on Node 22). Stack: **React 19 + Vite + Tailwind CSS v3**.

## Credits & data sources

- **[zucram/P5Tracker](https://github.com/zucram/P5Tracker)** — the open-source project this is forked from. The UI foundation, Confidant interaction guides, and Persona/crossword data are theirs.
- Schedule & 100% data cross-checked against the JP & EN community all-charts, [PSNProfiles' 100% Perfect Schedule](https://psnprofiles.com/guide/11946-persona-5-royal-100-perfect-schedule), and [Push Square's Will Seed locations](https://www.pushsquare.com/guides/persona-5-royal-will-seed-locations-where-to-find-all-will-seeds).
- Full attributions live in the app under **More → Sources & Thanks**.

## Support & feedback

- **Support the original developer:** if this kind of tool saves you time, consider supporting **zucram** on [Ko-fi](https://ko-fi.com/K3K11RWTSL) — they built the foundation everything here stands on.
- **Feedback on this fork:** open an issue at **[Vakkyr23/P5Tracker/issues](https://github.com/Vakkyr23/P5Tracker/issues)**.

## Disclaimer

A fan-made tool. *Persona 5 Royal* is © ATLUS / SEGA. Not affiliated with or endorsed by ATLUS, SEGA, or zucram.
