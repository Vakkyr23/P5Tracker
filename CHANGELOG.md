# Changelog

All notable changes to this project will be documented in this file.

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
