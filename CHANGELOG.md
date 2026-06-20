# Changelog

All notable changes to this project will be documented in this file.

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
