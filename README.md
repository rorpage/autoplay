# AutoPlay

A collection of simple, vanilla JS browser-based games and trackers. No frameworks, no build tools — just HTML, CSS, and JavaScript.

Installable as a Progressive Web App (PWA) and works offline.

---

## Games

### 50 States Tracker

Track which of the 50 US states you've visited (or know, or have been to — whatever your goal).

**How to play:**
- Click any state button to toggle it on.
- Click it again to toggle it off.
- Your progress is saved automatically in `localStorage` and persists across sessions.
- Use the **Reset** button in the top-right corner to clear all states. A confirmation prompt will appear before anything is wiped.

**Features:**
- All 50 states displayed in a responsive grid
- Live counter showing how many states are toggled (`X / 50`)
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
