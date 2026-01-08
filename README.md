# P5R Tactician

A modern, mobile-first companion app for **Persona 5 Royal**. 

This interactive tracker helps you optimize your playthrough with a "Soft-Guide" approach. Instead of a rigid day-by-day checklist, it provides monthly strategic objectives, ensuring you never miss a deadline while giving you the freedom to play your way.

## Features

### 📅 Phantom Calendar
*   **Smart Timeline:** Tracks your current position in the game.
*   **Intelligent Backlog:** Automatically carries over important tasks (Confidants, Mementos requests) if you miss them in previous months.
*   **Missable Filter:** Hides expired date-specific events (like classroom answers) to keep your dashboard clean.

### 🎭 Confidant Command Center
*   **Rank Roadmap:** Visualizes exactly what rank you need to be at for every month to stay on track for a 100% run.
*   **Interaction Guide:** Built-in cheat sheet for every Confidant. Tap to see the best dialogue choices and gifts for your current rank.
*   **Gate Awareness:** Automatically warns you if your Social Stats are too low to progress (e.g., "⚠️ Blocked: Requires Guts Lv.4").

### ⚔️ Palace & Mementos Intel
*   **Dynamic Filtering:** Automatically shows the Palace and Mementos path relevant to your current game month.
*   **Will Seed Locator:** Step-by-step guides to find every Will Seed.
*   **Boss Strategy:** Key tips and recommended Personas for every major boss.

### 🧠 Social Stat Dashboard
*   Track your Knowledge, Guts, Proficiency, Kindness, and Charm.
*   See real-time feedback on which stats are bottlenecking your relationships.

## Tech Stack

*   **Frontend:** React 19 + Vite
*   **Styling:** Tailwind CSS (Glassmorphism UI)
*   **Icons:** Lucide React
*   **Persistence:** Local Storage (Privacy-first, no server required)

## Getting Started

### Prerequisites
*   Node.js (v18 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/p5r-tactician.git
    cd p5r-tactician/p5r-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Build for production:
    ```bash
    npm run build
    npm run preview
    ```

## Project Structure

*   `src/App.jsx`: Main application logic and UI controller.
*   `src/data/gameData.js`: The "Brain" of the guide. Contains all monthly tasks, palace details, and mementos requests.
*   `src/data/confidantData.js`: Detailed interaction guides (Dialogue choices & Gifts).
*   `src/data/socialStats.js`: Stat requirements and gate logic.

## Credits

Based on the comprehensive strategic analysis of Persona 5 Royal's mechanics.
Data sourced from community experts (GameFAQs, Samurai Gamers, RPG Site) and cross-referenced for the "Royal" edition.

### Transparency
This project was built with the assistance of AI (Google Gemini) to handle architectural refactoring and data synthesis. The strategy content itself was compiled by browsing public guides and walkthroughs to curate the most "essential" optimization path for players.

## Support & Feedback

This project is currently in **Public Beta (v2.0)**. 

If you find this tracker helpful for your heist, consider supporting the maintenance and future updates:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/zucram)

Feedback, bug reports, and strategy corrections are welcome via GitHub Issues.

---
*Take your time.*
