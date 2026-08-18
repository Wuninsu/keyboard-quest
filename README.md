# Keyboard Quest

Browser-based educational keyboard and typing game for youth computer classes. No build tools or dependencies — just open `index.html` in a browser.

## What It Does

Keyboard Quest teaches keyboard familiarity, typing accuracy, Windows shortcuts, and basic OS navigation through gamified missions across 5 levels plus a final boss battle.

## Features

- **Progressive Missions** — 5 levels: Explorer → Key Hunter → Typist → Shortcut Ninja → Windows Wizard
- **Boss Battle** — Timed final challenge combining all learned skills
- **Keyboard Lab** — Interactive virtual keyboard + physical key inspection with Windows shortcut hints
- **XP & Ranks** — Earn XP, unlock ranks, and collect badges
- **Streak System** — Bonus XP and encouragement for consecutive correct answers
- **Progress Tracking** — Persistent saves via LocalStorage with per-student profiles
- **Facilitator Dashboard** — View all students, export progress, reset individual accounts
- **Sound & Theme** — Synthesized sound effects via Web Audio API; light/dark mode toggle
- **PWA / Offline** — Service worker caching and web manifest for install and offline play

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell and all UI views |
| `style.css` | Dark/light theming, responsive layout, animations |
| `script.js` | Game engine, challenges, state, audio, persistence |
| `sw.js` | Service worker for PWA caching |
| `manifest.json` | Web app manifest for installability |

## How to Run

1. Open `index.html` in any modern browser (Chrome, Edge, Firefox).
2. Enter a nickname to start.
3. Select **Start Mission** and play through the levels.
4. Progress is saved automatically to the browser's LocalStorage.

To deploy or host, serve the directory with any static file server (e.g. `python -m http.server`, `npx serve`, GitHub Pages, etc.).

## Facilitator Mode

Enter facilitator mode from the top bar to:
- View all student profiles and stats in one table
- Export all student progress as JSON
- Reset individual student progress

## Tech Stack

- Vanilla HTML, CSS, JavaScript (no frameworks or build step)
- Web Audio API for synthesized sound effects
- LocalStorage for client-side persistence
- Service Worker for offline caching

## Browser Support

Designed for Chromium-based browsers. The virtual keyboard, audio synthesis, and PWA features work best in Chrome or Edge. Firefox and Safari are supported for core gameplay.

## Project Docs

See `RECOMMENDATIONS.md` for architecture notes, completed improvements, and future roadmap.
