# AutoPlay

A collection of simple, vanilla JS browser-based games and trackers. No frameworks, no build tools — just HTML, CSS, and JavaScript.

Installable as a Progressive Web App (PWA) and works offline.

---

## Games

### License Plate Tracker

Spot license plates from all 50 US states plus Washington D.C., and all 13 Canadian provinces and territories, on your road trip.

**How to play:**
- Click any plate button to mark it as spotted.
- Click it again to unmark it.
- Your progress is saved automatically in `localStorage` and persists across sessions.
- Use the **Reset** button in the top-right corner to clear all plates. A confirmation prompt will appear before anything is wiped.

**Features:**
- All 50 US states + Washington D.C. (51 total) and all 13 Canadian provinces and territories displayed as abbreviation buttons in a responsive grid, grouped into separate sections
- Live counter and percentage showing how many plates are spotted (`X / 64` and `XX%`), with per-section sub-counts for US (`X / 51`) and Canada (`X / 13`)
- Light and dark mode with a toggle button; respects system preference on first visit
- Persistent state via `localStorage`
- Confirmation modal on reset to prevent accidental data loss

### My Cows

A two-team score tracker for the classic road trip game where you earn points by spotting cows on your side of the road.

**How to play:**
- Tap **+** to add a point for a team, and **−** to remove one (scores can't go below 0).
- Tap a team's name to rename it; press Enter or tap away to save.
- Hold the **🪦** button for ~0.8 seconds to reset that team's score to zero.
- Scores and team names are saved automatically in `localStorage` and persist across sessions.

**Features:**
- Two teams with editable names
- Persistent state via `localStorage`

---

## Running locally

Serve the project root with any static file server:

```bash
npx serve .
# or
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

---

## Tech

- Vanilla HTML, CSS, JavaScript — no dependencies
- PWA: `manifest.json` + service worker (`sw.js`) for installability and offline support
