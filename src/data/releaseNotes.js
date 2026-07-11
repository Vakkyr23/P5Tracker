export const RELEASE_NOTES = [
  {
    version: "4.1.0",
    date: "2026-07-11",
    title: "Full Analysis",
    description: "Every specimen in the Registry now opens like a compendium page \u2014 stats, all ten affinities, the complete skill list, and its Royal trait \u2014 for all 232 Personas. Third Eye, permanently on.",
    sections: [
      {
        title: "\ud83d\udcd6 Compendium Detail Cards",
        items: [
          "**Tap the chevron on any Registry card** to unfold base stats, the 10-element affinity row, learned skills with levels, and the persona's trait. The card body still toggles registration \u2014 the chevron never does.",
          "**Reads at a glance:** WEAK burns warm red in every theme, RESIST is slate, NULL is outlined, REPEL inverts, DRAIN is green \u2014 and innate skills wear an INNATE badge instead of a level.",
          "**No spoiler gate here on purpose:** these are battle mechanics, not story \u2014 the Registry already lists every name and level."
        ]
      },
      {
        title: "\ud83d\udd2c Where the numbers come from",
        items: [
          "**Transcribed from the community-standard Royal dataset** (public domain), cross-guarded against the Registry's arcana + levels at ingest, and gated by an integrity check covering all 232 entries.",
          "**The JP allchart stays the authority** \u2014 a spot-check sheet ships alongside this release for manual verification."
        ]
      }
    ]
  },
  {
    version: "4.0.1",
    date: "2026-07-11",
    title: "Fine Cut",
    description: "The deferred Phantom polish lands \u2014 weekend ink and an elapsed slash in the calendar, corner-cut More cards, focus rings everywhere \u2014 and the hunt gains its missing ninth mark: Orichalcum.",
    sections: [
      {
        title: "\ud83d\udc8e The Ninth Demon",
        items: [
          "**Orichalcum joins the Treasure Demon tracker** \u2014 Faith \u00b7 lv 60 \u00b7 Maruki's Palace only (3rd semester), weak to Bless, and the one demon that never shows in Mementos. The old list stopped at vanilla's eight; Royal added one more.",
          "**New Bless chip** for its weakness, and the roadmap now counts all nine."
        ]
      },
      {
        title: "\ud83d\udcc5 Calendar Ink",
        items: [
          "**Weekend coloring in the list itself:** Sundays warm-red, Saturdays cyan \u2014 the date plate's convention, applied to every day card.",
          "**Today-diamond:** the active day carries a small diamond mark by its number.",
          "**Elapsed slash:** days behind your active day take the game's slash and dim \u2014 spent time reads as spent."
        ]
      },
      {
        title: "\u2728 Chrome & Access",
        items: [
          "**More grid, corner-cut:** the seven navigation cards finally speak Phantom \u2014 no more rounded corners.",
          "**Focus rings everywhere:** keyboard focus shows the counter-color ring on every control, not just the tab rail.",
          "**Roadmap tells the truth:** PWA support reads Implemented (it shipped in 3.6.0), and the cheat-sheet line no longer claims a day-tie that isn't built yet."
        ]
      }
    ]
  },
  {
    version: "4.0.0",
    date: "2026-07-05",
    title: "Phantom Chrome",
    description: "The full P5 design language, everywhere: angular plates, a traveling tab selector, a 200 ms view wipe, reward-gold maxed states, green registration stamps \u2014 and Night is reborn as Clinic, Takemi's deep-cobalt calm.",
    sections: [
      {
        title: "\ud83c\udfa8 The Look",
        items: [
          "**Angular unification:** sheared plates, corner-cut cards and keyline chips replace the rounded shell \u2014 the whole app now speaks the language the three classic tabs always did.",
          "**Clinic theme:** Night is now Clinic \u2014 deep navy + cobalt, Takemi's calm register. Your saved theme carries over automatically.",
          "**Gold is earned:** reward-yellow appears only when something maxes \u2014 Royal Readiness at full glows gold with a MAX chip.",
          "**Registered = stamped:** personas and treasure demons get a green \u2713 stamp and stay fully readable \u2014 it's a compendium, not a task list."
        ]
      },
      {
        title: "\u26a1 Motion \u2014 yours to control",
        items: [
          "**Tab wipe & traveling selector:** a 200 ms scarlet sweep between views; the active tab slides along the rail.",
          "**Motion setting:** More \u2192 Motion cycles System / Full / Reduced \u2014 System follows your OS preference; Reduced means instant, never broken.",
          "**Loading moment:** the star mark and an INFILTRATING\u2026 plate replace the plain pulse."
        ]
      },
      {
        title: "\ud83d\uddd3 Details",
        items: [
          "**Date plate:** the shared day renders as the P5 date flag in Calendar and Confidants \u2014 Sundays red, Saturdays cyan, day N of 301.",
          "**Save-slot chip:** the Sync Terminal's export-age indicator now looks like the thing it is.",
          "**Focus rings:** keyboard focus is a counter-color ring \u2014 cyan on Royal, amber on Clinic."
        ]
      }
    ]
  },
  {
    version: "3.7.1",
    date: "2026-07-04",
    title: "Compendium Groundwork",
    description: "Foundations for the Persona Compendium data track \u2014 schema, integrity gates and an ingest pipeline. Nothing visible changes yet.",
    sections: [
      {
        title: "\u2728 Under the Hood",
        items: [
          "**Detail schema locked in:** every persona card will carry base stats, the 10-element affinity row, learned skills and its Royal trait \u2014 itemization comes in a later phase.",
          "**Integrity gate:** a new check (wired into CI) validates every future data batch against the registry before it can ship \u2014 wrong names, broken tokens or impossible skill levels fail the build.",
          "**Ingest pipeline ready:** a deterministic transform can populate all 232 entries the moment the data source is signed off."
        ]
      }
    ]
  },
  {
    version: "3.7.0",
    date: "2026-07-03",
    title: "Clean Slate Protocol",
    description: "A big internal reorganization \u2014 the app shell was split into focused components, so it loads faster and future work lands cleaner.",
    sections: [
      {
        title: "\u2728 Under the Hood",
        items: [
          "**Slimmer core, faster start:** the Briefing, Persona Registry, Reference Hub and Sync Terminal moved into their own modules; the four views stream in on demand like the other tabs. The up-front bundle shed another ~13% \u2014 offline mode still has everything.",
          "**Route picker, hands on keyboard:** open it and use \u2191\u2193 / Home / End to move, Enter to pick, Escape to close.",
          "**Sturdier test net:** fixed a subtle race in the offline smoke test that could cut the network mid-install \u2014 it now waits for the service worker properly.",
          "**Heads up:** search boxes and spoiler peeks inside a tab now clear when you leave that tab (saved progress, modes and settings are untouched)."
        ]
      }
    ]
  },
  {
    version: "3.6.2",
    date: "2026-07-03",
    title: "Safety Nets",
    description: "A save-file age reminder, full keyboard support, and a test suite standing guard over every deploy.",
    sections: [
      {
        title: "\u2728 New",
        items: [
          "**\u201CLast export\u201D reminder:** the Sync Terminal now tells you how old your newest save file is \u2014 and turns amber when it's been a week (or you've never made one).",
          "**Keyboard everything:** every checkbox, blurred spoiler line, and card can now be reached and toggled with Tab + Enter/Space, and dialogs handle focus properly.",
          "**Guarded deploys:** every push now runs lint, a version-consistency check, and a Playwright smoke suite (boot, Readiness math, one-way sync, full offline) before going live."
        ]
      }
    ]
  },
  {
    version: "3.6.1",
    date: "2026-07-03",
    title: "Lighter on Its Feet",
    description: "Each tab now loads only when you open it \u2014 a noticeably faster first paint.",
    sections: [
      {
        title: "\u2728 Under the Hood",
        items: [
          "**Split like a Calling Card:** the Calendar, Confidants and Metaverse tabs ship as separate bundles that stream in on first visit (with a suitably dramatic \u201CInfiltrating\u2026\u201D flash). The core app is ~14% smaller up front, and offline mode still has everything cached."
        ]
      }
    ]
  },
  {
    version: "3.6.0",
    date: "2026-07-03",
    title: "Take Your Time \u2014 Offline",
    description: "The Phantom Chart is now a real app: install it, and it works with no connection at all.",
    sections: [
      {
        title: "\u2728 New",
        items: [
          "**Install it:** use your browser's Install / Add-to-Home-Screen button and the tracker becomes a standalone app with its own icon \u2014 a proper scarlet calling card.",
          "**Fully offline:** everything the app needs (code, fonts, icons) is cached on your device, so it opens instantly and keeps working even when your browser wipes site data on close. Pair it with a Sync Terminal save file and nothing can touch your run.",
          "**No more font pings:** typefaces are bundled with the app now \u2014 zero third-party requests, ever."
        ]
      }
    ]
  },
  {
    version: "3.5.3",
    date: "2026-07-02",
    title: "Smooth Operator",
    description: "Tooltips stop hammering the page, and your checkmarks are future-proofed.",
    sections: [
      {
        title: "\u2728 Under the Hood",
        items: [
          "**Featherweight tooltips:** hovering a chip used to re-render the entire tab for every pixel the mouse moved. Tooltips still follow your cursor \u2014 they just do it without redrawing anything else.",
          "**Sturdier checkmarks:** deadline and Thieves' Den ticks now attach to permanent IDs instead of text snippets and list positions, so future wording or ordering tweaks can never silently drop your progress. Existing saves migrate automatically.",
          "**Zero known vulnerabilities:** the build toolchain took its security patches (10 advisories \u2192 0)."
        ]
      }
    ]
  },
  {
    version: "3.5.2",
    date: "2026-07-02",
    title: "Readiness, Revived",
    description: "The Royal Readiness gauge works now, and every leftover \u201Cpreview\u201D label is gone.",
    sections: [
      {
        title: "\u2728 Fixed",
        items: [
          "**Royal Readiness is live:** the Briefing gauge now tracks Maruki, Akechi and Kasumi straight from the Confidant schedule and your current day \u2014 it was stuck at zero before. Move your day and watch it fill.",
          "**One name in the tab:** the browser tab now always shows the app's real title instead of quietly switching to \u201CP5 Tracker\u201D."
        ]
      },
      {
        title: "\u2728 Tidied Up",
        items: [
          "**No more \u201Cpreview\u201D:** the Metaverse badge and the stale \u201Ctabs come next\u201D footers are gone \u2014 everything they promised has shipped.",
          "**Roadmap tells the truth:** Metaverse Sync is marked *Done*, the Persona count reads the correct **232**, and the Fusion Calculator entry now says what we decided \u2014 link out to the community calculator instead of building one in."
        ]
      }
    ]
  },
  {
    version: "3.5.0",
    date: "2026-06-22",
    title: "Metaverse Sync",
    description: "The Fusion Path now fills your Compendium as you go.",
    sections: [
      {
        title: "\u2728 New",
        items: [
          "**Fusion \u2192 Compendium sync:** Checking off a Fusion Path step now registers its result Persona in the Persona Registry automatically. A green stamp confirms it right on the step. (One-way \u2014 unchecking a step never un-registers the Persona.)",
          "**Sync panel:** The Fusion Path now shows progress at a glance \u2014 steps done, Personas registered from the path, and overall Compendium completion.",
          "**Sort by Palace:** Toggle the Fusion Path between path order and a Palace-grouped view. The Palace open on your current day is flagged **Available now**."
        ]
      }
    ]
  },
  {
    version: "3.4.4",
    date: "2026-06-21",
    title: "Finishing Touches",
    description: "Command Suite leaves preview, and tooltips get the right cursor everywhere.",
    sections: [
      {
        title: "\u2728 Tidied Up",
        items: [
          "**Command Suite out of preview:** Removed the \u201CPREVIEW\u201D badge from the Command Suite header now that the tab is done.",
          "**Tooltip cursor:** Hovering anything with a tooltip now shows the help cursor (the arrow with a \u201C?\u201D) across the whole app, not just the Calendar."
        ]
      }
    ]
  },
  {
    version: "3.4.3",
    date: "2026-06-21",
    title: "Legend Polish",
    description: "The Confidants key is easier to see and now matches your route.",
    sections: [
      {
        title: "\u2728 Tidied Up",
        items: [
          "**Legend bubble:** The Confidants / Thieves' Den key now sits in a bordered panel like the tooltips, so it stands out from the background.",
          "**Route-aware key:** The `\u2665` romance-rank marker only appears on a romance route (it flags your partner's Confidant at Rank 9). On the Platonic route there are none, so the key no longer lists it."
        ]
      }
    ]
  },
  {
    version: "3.4.2",
    date: "2026-06-21",
    title: "Cleaner Keys",
    description: "Repeating tooltips swapped for a tidy at-a-glance key.",
    sections: [
      {
        title: "\u2728 Tidied Up",
        items: [
          "**Confidants & Thieves' Den:** The same tooltip kept popping up on every chip. Replaced it with a small always-visible key beside the sub-tabs — `·a` auto-rank, `\u2665` romance, and what P-Medals are.",
          "**Fusion Path:** Removed the redundant \u201CResult Persona\u201D tooltip (the chip already shows the Arcana and level)."
        ]
      }
    ]
  },
  {
    version: "3.4.1",
    date: "2026-06-21",
    title: "Consistent Tooltips",
    description: "Every hover tip now looks and behaves the same across the app.",
    sections: [
      {
        title: "\ud83d\udd27 Fixes",
        items: [
          "**Tooltips:** The Confidants, Thieves' Den and Fusion Path hover tips were using the browser's default tooltip, which mispositioned and overlapped the content. They now use the same clean floating tooltip as the Calendar."
        ]
      }
    ]
  },
  {
    version: "3.4.0",
    date: "2026-06-21",
    title: "Easier Restores",
    description: "Load a save by dropping the file in \u2014 plus a sharper Spoiler-Free and a dropdown fix.",
    sections: [
      {
        title: "\ud83d\udcbe Sync Terminal",
        items: [
          "**Load Save File:** Import a backup by clicking or dragging your `.json` (or legacy `.txt`) straight into the terminal \u2014 no more opening the file and copy-pasting the text. The chosen filename is shown before you Apply. Pasting still works too."
        ]
      },
      {
        title: "\ud83d\udd27 Fixes",
        items: [
          "**Spoiler-Free:** Future days are now fully blurred (every line *and* the trophy/rank chips), not just plot lines. Past and current days stay clear; tap anything to peek.",
          "**Arcana filter:** The Persona Registry's Arcana dropdown no longer clips long names like \u201CAll Arcanas\u201D or \u201CHierophant.\u201D"
        ]
      }
    ]
  },
  {
    version: "3.3.0",
    date: "2026-06-21",
    title: "One Shared Day",
    description: "The Calendar and the Confidants tab now share a single \u201Cyour day\u201D \u2014 move it in one place and the other follows.",
    sections: [
      {
        title: "\ud83d\udcc5 Linked Timeline",
        items: [
          "**Synced Day:** Setting your current day in the Calendar updates the Confidants tab's deadlines and Confidant ranks instantly, and vice-versa \u2014 no more keeping two days in step by hand.",
          "**Carried Over:** Your existing day is migrated automatically the first time you open this version."
        ]
      }
    ]
  },
  {
    version: "3.2.1",
    date: "2026-06-21",
    title: "Polish & a Spoiler Fix",
    description: "Sharper Treasure Demon cards and a smarter Calendar blur.",
    sections: [
      {
        title: "\u2728 Fixes",
        items: [
          "**Crisper Demon Cards:** Level badges and the active sub-tab no longer smear against the red \u2014 they now use the same clean treatment as the rest of the app, and the progress count stands out.",
          "**Calendar Spoiler-Free:** Days you've already passed now show their story beats in the clear \u2014 only your current and future days stay blurred."
        ]
      }
    ]
  },
  {
    version: "3.2.0",
    date: "2026-06-21",
    title: "Treasure Demon Tracker",
    description: "The Persona Registry now has two sub-tabs \u2014 your 232 Personas and a new spoiler-gated tracker for all 8 Treasure Demons.",
    sections: [
      {
        title: "\ud83d\udc8e Treasure Demons",
        items: [
          "**New Sub-Tab:** The Registry splits into Personas and Treasure Demons. Each remembers its own progress.",
          "**Rich Cards:** Every demon shows its level, Arcana, Palace, weakness, and a battle tip \u2014 with a color-coded weakness chip.",
          "**Spoiler-Gated:** A Story-Safe / Spoiler-Free / Reveal All switch, defaulting to Story-Safe. Unregistered demons stay sealed until you mark them \u2014 tap Peek to look ahead."
        ]
      }
    ]
  },
  {
    version: "3.1.0",
    date: "2026-06-21",
    title: "Bulletproof Saves",
    description: "The Sync Terminal is now a complete backup \u2014 one file captures your entire run \u2014 plus a sharper Royal look.",
    sections: [
      {
        title: "\ud83d\udcbe Full Backup",
        items: [
          "**Everything In One File:** The Sync Terminal now backs up your whole run \u2014 all progress, every tab's checklists, plus your route and theme \u2014 not just the headline stats.",
          "**Safe Restore:** Importing validates the file first and asks before overwriting, then reloads so every tab comes back exactly as you left it.",
          "**Portable & Compatible:** Saves download as dated .json files, and older .txt saves still import cleanly."
        ]
      },
      {
        title: "\ud83c\udfa8 Royal Polish",
        items: [
          "**Sharper Reds:** White text on the scarlet panels, banners, and tabs now has a crisp edge, ending the shimmer against the dark background.",
          "**Tidier Header:** Removed the redundant \"Support zucram\" button \u2014 the Briefing banner and footer links stay."
        ]
      }
    ]
  },
  {
    version: "3.0.0",
    date: "2026-06-19",
    title: "The 100% Heist Update",
    description: "A full completion overhaul: a day-by-day calendar, exact deadline & Confidant tracking, and Metaverse aids \u2014 all rebuilt around finishing P5R at 100%.",
    sections: [
      {
        title: "\ud83d\udcc5 Day-by-Day Calendar",
        items: [
          "**Daily Walkthrough:** The monthly roadmap is replaced with a true day-by-day schedule (4/9 \u2192 2/3), including the third semester.",
          "**Spoiler Control:** Story and mechanics stay hidden on days you haven't reached \u2014 switch between Story-Safe, Spoiler-Free, and Reveal All.",
          "**Route Picker:** Choose your romance (or stay Platonic) and the calendar adapts the decision days.",
          "**JP-Corrected Stats:** Every stat gain was reconciled against the Japanese all-Confidant chart for accurate point values."
        ]
      },
      {
        title: "\ud83c\udfad Command Suite",
        items: [
          "**Deadline Dashboard:** Every hard deadline (Palaces, key Confidants, the 12/24 point of no return) with a live countdown from your active day.",
          "**Confidant Schedule:** All 23 Confidants with the exact date each rank is reached, romance markers, and auto-rank flags.",
          "**Thieves' Den Tracker:** All 52 P-Medal awards across four categories with running totals."
        ]
      },
      {
        title: "\u2694\ufe0f Metaverse Aids",
        items: [
          "**Fusion Path:** A clean, ordered recommended-fusion list toward the Confidant ultimates.",
          "**Will Seed Locator:** All 24 Will Seeds, three per Palace, with concise directions.",
          "**NG+ Planner:** A carry-over reference plus a romance-rotation planner for seeing every route."
        ]
      },
      {
        title: "\ud83c\udfa8 Royal Look",
        items: [
          "**Faithful Theme:** A scarlet-and-black 'Royal' skin with an easy-on-the-eyes 'Night' mode toggle.",
          "**Built to Extend:** The new tabs share one design system, so the tracker can be reused as a template for other games."
        ]
      }
    ]
  },
  {
    version: "2.3.0",
    date: "2026-01-16",
    title: "The Compendium Update",
    description: "The Persona Registry is finally here! Track your collection and sync your progress across the Metaverse.",
    sections: [
      {
        title: "📖 Persona Registry",
        items: [
          "**Complete Database:** A fully searchable compendium of all 232 Royal Personas.",
          "**Smart Tracking:** Filter by Arcana and track your collection percentage directly from the new Registry view.",
          "**Integrated Intel:** Includes data for Special Fusions, DLC content, and Treasure Demons."
        ]
      },
      {
        title: "🔄 Metaverse Sync",
        items: [
          "**Cross-Tracking:** Catching a Persona in a Palace guide automatically marks it as 'Registered' in your Compendium.",
          "**Unified Progress:** Your collection status is shared globally across the app."
        ]
      },
      {
        title: "📱 Mobile Polish",
        items: [
          "**Sticky Controls:** The Registry features a new sticky-header layout for effortless browsing on mobile.",
          "**Fluid Scrolling:** Optimized the list view to feel native and responsive on touchscreens."
        ]
      }
    ]
  },
  {
    version: "2.2.5",
    date: "2026-01-15",
    title: "The Navigation Overhaul",
    description: "Unified the Metaverse view and introduced the System Menu to streamline your tactical experience.",
    sections: [
      {
        title: "⚔️ Unified Metaverse",
        items: [
          "**Consolidated View:** Palaces and Mementos are now found under a single **Metaverse** tab.",
          "**Toggle Switch:** Easily switch between Palace intel and Mementos requests with the new top-bar toggle.",
          "**Backlog Sync:** Mementos history and Palace progress still auto-manage based on your anchored month."
        ]
      },
      {
        title: "📂 The 'More' Menu",
        items: [
          "**System Hub:** Created a dedicated 'More' menu to house utility features and future expansion content.",
          "**Registry Placeholder:** Added a new **Persona Registry** section (under construction) to eventually track your Compendium progress.",
          "**Reference Hub:** Moved external links and calculators into the System Hub for a cleaner primary navigation.",
          "**UX Polish:** Redesigned the System Hub to be extremely mobile-friendly with a compact list-style layout."
        ]
      },
      {
        title: "🛠️ System Improvements",
        items: [
          "**Browser Navigation:** Implemented hash-based routing (#calendar, #metaverse), enabling the use of browser Back/Forward buttons.",
          "**State Migration:** Existing users will be automatically redirected to the correct new views if they had legacy tabs saved.",
          "**Header Cleanup:** Restored the Sync Terminal to its original position for easier access while maintaining a clean UI."
        ]
      }
    ]
  },
  {
    version: "2.2.4",
    date: "2026-01-13",
    title: "The Intelligence Update",
    description: "Refined the data hierarchy and implemented sequential crossword tracking.",
    sections: [
      {
        title: "🧩 Crossword Mastery",
        items: [
          "**Sequential Tracking:** Crosswords are now tracked by their sequence (Q1-Q38) rather than just dates, matching the actual game logic.",
          "**Smart Calendar:** Calendar tasks now show the *next* answer you actually need based on your progress.",
          "**How to Sync:** If your count looks wrong after this update, just go to the **Briefing** tab (formerly Guide) and check/uncheck the puzzles to match your in-game state. Your Calendar will auto-sync!"
        ]
      },
      {
        title: "📂 Navigation & Hierarchy",
        items: [
          "**Roadmap → Calendar:** Renamed for better intuition.",
          "**Guide → Briefing:** Consolidated all core in-game knowledge (Social Stats, Answers, Routines).",
          "**Library → Reference:** Dedicated space for external tools and future tracker placeholders."
        ]
      }
    ]
  },
  {
    version: "2.2.3",
    date: "2026-01-13",
    title: "The Library Update",
    description: "Introduced the Reference Library and performed a massive readability overhaul across the entire app.",
    sections: [
      {
        title: "📚 Reference Library",
        items: [
          "**Curated Intel:** Added a new Library tab featuring community-standard tools, calculators, and detailed archives.",
          "**Future Operations:** Added placeholders for upcoming P3R, Metaphor, and P4R trackers.",
          "**Mobile Optimization:** Refined the layout to ensure external tools are easy to access on any device."
        ]
      },
      {
        title: "👁️ Readability Overhaul",
        items: [
          "**Typography Upgrade:** Increased global font sizes across all tabs for better accessibility and couch-play legibility.",
          "**Visual Hierarchy:** Shifted from all-caps to sentence case for body text, making instructions and notes significantly faster to scan.",
          "**Functional Colors:** Improved contrast by reserving pure white for key data and using muted greys for descriptions, reducing eye strain."
        ]
      }
    ]
  },
  {
    version: "2.2.2",
    date: "2026-01-12",
    title: "The Phantom Signal",
    description: "Implemented new background systems to better understand how Thieves use the app.",
    sections: [
      {
        title: "📡 Signal Analysis",
        items: [
          "**Engagement Tracking:** Added secure, private metrics to help us balance future features based on real usage.",
          "**Smart Notifications:** Implemented a new non-intrusive messaging system for important updates, community alerts, and support engagement.",
          "**System Optimization:** Refined the event handling for smoother performance on long playthroughs."
        ]
      }
    ]
  },
  {
    version: "2.2.1",
    date: "2026-01-12",
    title: "The Strategic Update",
    description: "Refined the Mission Critical system and introduced a dedicated Strategy Briefing.",
    sections: [
      {
        title: "🧠 Strategic Briefing",
        items: [
          "**New Section:** Non-actionable advice (like 'Clear Palace ASAP') is now separated into a dedicated blue 'Strategic Briefing' card.",
          "**Mission Critical:** The red warning section is now strictly for deadlines and game-over conditions.",
          "**Chronological Timeline:** Tasks in the standard timeline are now automatically sorted by date."
        ]
      },
      {
        title: "📅 Calendar Refinements",
        items: [
          "**Consistent Deadlines:** Every Palace month now clearly separates the 'Deadline' (Requirement) from the 'Strategy' (Recommendation).",
          "**Temporal Accuracy:** Deadlines now only appear in the month they occur (e.g., Madarame deadline moved to June).",
          "**Visual Polish:** Enhanced visibility for strategic tips."
        ]
      }
    ]
  },
  {
    version: "2.1.0",
    date: "2026-01-10",
    title: "The Phantom Refactor",
    description: "A massive Mobile UX overhaul to reduce scrolling and improve density.",
    sections: [
      {
        title: "📱 Mobile UX Redesign",
        items: [
          "**Compact Confidants:** Replaced large cards with a sleek accordion list.",
          "**Inline Controls:** Rank Up/Down buttons are now directly in the list view.",
          "**Aggressive Density:** Reduced font sizes and padding across all tabs.",
          "**Space-Saving Header:** Smaller header and navigation on mobile."
        ]
      },
      {
        title: "🗄️ History Management",
        items: [
          "**Archived Palaces:** Completed Palaces are now hidden by default (toggleable).",
          "**Previous Mementos:** Past paths are grouped into a collapsed accordion."
        ]
      },
      {
        title: "🛠️ Fixes & Improvements",
        items: [
          "**Dynamic Versioning:** App now shows the live version number.",
          "Fixed 'Path of Da'at' history bug.",
          "Fixed auto-expansion logic for multi-month Palaces.",
          "Added 'Support' button for Ko-fi."
        ]
      }
    ]
  }
];
