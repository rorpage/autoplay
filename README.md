# AutoPlay

A collection of simple, vanilla JS browser-based games and trackers. No frameworks, no build tools — just HTML, CSS, and JavaScript.

Installable as a Progressive Web App (PWA) and works offline.

---

## Games

### License Plate Tracker

Spot license plates from all 50 US states plus Washington D.C. on your road trip.

**How to play:**
- Click any plate button to mark it as spotted.
- Click it again to unmark it.
- Your progress is saved automatically in `localStorage` and persists across sessions.
- Use the **Reset** button in the top-right corner to clear all plates. A confirmation prompt will appear before anything is wiped.

**Features:**
- All 50 states + Washington D.C. (51 total) displayed as abbreviation buttons in a responsive grid
- Live counter and percentage showing how many plates are spotted (`X / 51` and `XX%`)
- Light and dark mode with a toggle button; respects system preference on first visit
- Persistent state via `localStorage`
- Confirmation modal on reset to prevent accidental data loss

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
