export const RELEASE_NOTES = [
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
          "Fixed 'Path of Da\'at' history bug.",
          "Fixed auto-expansion logic for multi-month Palaces.",
          "Added 'Support' button for Ko-fi."
        ]
      }
    ]
  }
];
