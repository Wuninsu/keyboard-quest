# Keyboard Quest — Project Analysis & Future Recommendations

## 1. Project Overview

**Keyboard Quest** is a browser-based educational typing game built with vanilla HTML, CSS, and JavaScript. It targets youth center computer classes and teaches keyboard familiarity, typing accuracy, Windows shortcuts, and basic OS navigation through gamified missions across 5 levels plus a final boss battle.

| Attribute | Detail |
|-----------|--------|
| Files | `index.html` (350 lines), `script.js` (1,502 lines), `style.css` (952 lines), `sw.js` (55 lines), `manifest.json` (22 lines) |
| Stack | Vanilla JS, Web Audio API, LocalStorage, Service Worker (PWA) |
| Views | Main Menu, Missions Arena, Boss Battle, Keyboard Lab, Achievements, Progress, How-to-Play |
| Challenge Types | key-finder, typing, shortcut, shortcut-info, simulated-os |
| Accessibility | ARIA live regions, focus trapping, screen reader announcements, prefers-reduced-motion |
| Theme Support | Light/dark mode toggle with persistence |

---

## 2. Current Architecture Strengths

- **Zero dependencies** — runs standalone without build tools or CDNs.
- **Single-file delivery** — easy to deploy locally or host statically.
- **Web Audio API** — sound effects synthesized client-side with no audio assets required.
- **LocalStorage persistence** — progress survives page reloads without a backend.
- **Virtual + physical keyboard** — supports both click and real keypress input.
- **PWA ready** — service worker caching and web manifest for offline/install support.

---

## 2.5 Completed Improvements (2026-08-18)

### Security & Robustness
- **Duplicate CSS removed**: `.key.correct-glow` deduplicated in `style.css`.
- **innerHTML reduced**: Replaced dynamic `innerHTML` with safe DOM APIs in `renderBadges`, `setupTypingChallenge`, `setupShortcutListener`, and `setupSimulatedOSWorkspace`. Remaining usages are safe container clears.
- **Lazy AudioContext**: `audioCtx` is no longer created at parse time; `getAudioContext()` initializes on first interaction.
- **Challenge validation**: `validateChallenges()` runs at startup and removes invalid/malformed challenge entries with warnings instead of crashing.
- **LocalStorage versioning**: `SAVE_VERSION` added with migration log; payload size capped at 1MB.
- **Defensive DOM checks**: `loadChallenge` validates required elements exist before rendering and wraps challenge setup in try/catch.

### Code Quality
- **Named constants**: Extracted `BOSS_CONFIG`, `TIMING`, `STREAK_XP_MULTIPLIERS`, `NO_HINT_BONUS_XP`, `BOSS_XP_REWARD`, `TYPING_ACCURACY_*_BONUS`.
- **Centralized key normalization**: `normalizeKey(e)` replaces duplicated Space/Ctrl/Win mapping.
- **Event listener cleanup**: Added `cleanupLabListeners()` and `labKeyDownHandler`/`labKeyUpHandler` references; called in `navigateTo`.
- **Accessibility**: Added `role="dialog"`, `aria-modal`, `aria-live` regions, `trapFocus`/`releaseFocusTrap`, and `announceToScreenReader` for dynamic updates.
- **Responsive**: Added `480px` breakpoint for small mobile screens.
- **Global motion preference**: Added `prefers-reduced-motion` media query disabling animations.
- **Facilitator export**: Added JSON export button in facilitator modal.
- **Theme toggle**: Added light/dark mode toggle with `data-theme` attribute and persistence.
- **Progressive hints**: Wrong answers now reveal a contextual hint after 2 failed attempts.
- **Challenge randomization**: `shuffleArray()` randomizes challenge order per level run.
- **Level 5 expansion**: Increased from 4 to 10 simulated-OS challenges.
- **Boss battle expansion**: Increased from 3 to 20 randomized tasks; 6 are selected per run.

---

## 3. Critical Issues

### 3.1 Monolithic Script (`script.js` — 1,121 lines)
All game logic, state, audio, rendering, and event handling lives in one file. This makes the codebase hard to test, debug, and extend.

**Recommendation:** Split into modules:
```
src/
  state.js          # gameState, load/save, XP, ranks, badges
  audio.js          # Web Audio synth, playSound
  challenges/       # challenge data and loaders per type
  views/            # render/navigate per view
  ui/               # HUD, toasts, overlays, modals
  engine.js         # main loop, routing, event binding
```

### 3.2 Global Mutable State
`gameState` and ~10 module-level `let` variables (`currentChallengeIndex`, `challengeCompleted`, `activeShortcutHandler`, etc.) are mutated freely from many functions.

**Recommendation:** Encapsulate state in a single store with explicit getters/setters or a lightweight reactive state manager. Remove scattered flags in favor of a `gameState.status` enum (e.g., `IDLE`, `CHALLENGE_ACTIVE`, `COUNTDOWN`, `OVERLAY`).

### 3.3 Event Listener Leaks
`setupShortcutListener` attaches a `keydown` handler to `window`. `cleanupShortcutListener` removes only **one** handler reference, but:
- The lab view attaches its own `keydown`/`keyup` listeners without cleanup on navigation.
- Physical key finder, shortcut, and lab handlers can stack if navigation is rapid.

**Recommendation:** Use a central event registry or delegation pattern. Always remove listeners in `navigateTo` or a view-specific `destroy`/`unmount` hook.

### 3.4 `innerHTML` Injection
`setupSimulatedOSWorkspace`, `showToast`, `renderBadges`, and several other functions build HTML via template literals and `innerHTML`. If any user-controlled data (e.g., player name) is injected without escaping, this is an XSS vector.

**Recommendation:** Replace `innerHTML` with `textContent` or `createElement`/`appendChild`. If `innerHTML` is unavoidable, sanitize dynamic strings.

### 3.5 Duplicate CSS
`.key.correct-glow` is defined twice in `style.css` (lines 515–519 and 901–907) with different values. The second definition wins, but the duplication indicates drift.

**Recommendation:** Audit and deduplicate CSS. Consider CSS custom properties for repeated values (e.g., glow colors, border radii).

### 3.6 Magic Numbers & Hardcoded Strings
- Boss HP: `100`, damage: `35`, timer: `60` seconds.
- XP multipliers: `1.2`, `1.5`, `2.0`.
- Auto-advance delay: `1200` ms, level complete delay: `2800` ms.
- Key name mappings duplicated across `setupPhysicalKeyFinder`, `setupKeyboardLab`, and `inspectKey`.

**Recommendation:** Extract to named constants/config objects:
```js
const BOSS_CONFIG = { hp: 100, damagePerHit: 35, timeLimit: 60 };
const TIMING = { successAdvance: 1200, levelCompleteDisplay: 2800 };
```

---

## 4. Code Quality & Maintainability

### 4.1 No Error Boundaries
`playSound` catches audio errors, but most game logic lacks try/catch. A single malformed challenge or missing DOM element can crash the session silently.

**Recommendation:** Add defensive checks in `loadChallenge`, `navigateTo`, and `completeChallenge`. Log errors to a dedicated console namespace and show a user-friendly fallback.

### 4.2 Inconsistent Naming & Mixed Concerns
- `recordAttempt` mutates `gameState` and is called from both success and failure paths.
- `completeChallenge` handles business logic, UI updates, sound, navigation timers, and localStorage saves simultaneously.
- `setupSimulatedOSWorkspace` mixes DOM construction with event binding and game completion logic.

**Recommendation:** Separate concerns into pure functions (calculate XP, determine rank) and side-effect functions (render, save, play sound). Use clear naming: `calculateEarnedXP(challenge, hintUsed, streak)` vs `applyXP(amount)`.

### 4.3 No Type Safety or Validation
Challenge data is trusted implicitly. A typo in `LEVEL_CHALLENGES` (e.g., missing `answer` or invalid `type`) would break `loadChallenge` with no validation.

**Recommendation:** Add a simple schema validator that runs at startup:
```js
LEVEL_CHALLENGES.forEach(c => {
  if (!c.id || !c.type || !c.answer) throw new Error(`Invalid challenge: ${c.id}`);
});
```

### 4.4 Repetitive Key Mapping Logic
The `Space` / `Ctrl` / `Win` normalization appears in `setupPhysicalKeyFinder`, `setupKeyboardLab`, and `inspectKey`.

**Recommendation:** Centralize in a `normalizeKey(e)` utility.

---

## 5. Game Design & Content

### 5.1 Limited Replayability
- Challenges are static and in fixed order.
- No randomization or adaptive difficulty.
- Boss battle has only 3 tasks; once memorized, it becomes trivial.

**Recommendation:**
- Shuffle challenge order per session.
- Introduce difficulty tiers (easy/medium/hard) within each level.
- Expand boss battle with randomized task pools and scaling HP.

### 5.2 Level 5 Underpopulated
Level 5 (Windows Wizard) has only 4 challenges, while Level 2 has 30+.

**Recommendation:** Add more simulated-OS tasks: renaming files, moving items between folders, using search, selecting multiple items, etc.

### 5.3 No Adaptive Feedback
Wrong answers trigger a shake animation and reset the streak, but provide no contextual guidance beyond the optional hint.

**Recommendation:** Add progressive hints (general → specific) and track common mistake patterns to surface targeted practice.

### 5.4 No Accessibility
- No `aria-label` on most interactive elements.
- No focus management for modals/overlays.
- No screen-reader announcements for XP, rank-ups, or errors.
- `prefers-reduced-motion` is partially handled for confetti but not for all animations.

**Recommendation:**
- Add ARIA live regions for dynamic announcements.
- Trap focus within modals.
- Honor `prefers-reduced-motion` globally.

---

## 6. UI/UX Improvements

### 6.1 Responsive Gaps
Only two breakpoints (`1366px`, `768px`). The virtual keyboard and challenge card may overflow on tablets or landscape phones.

**Recommendation:** Add a `480px` breakpoint. Use container queries or fluid typography (`clamp()`) more consistently.

### 6.2 No Loading / Skeleton States
`runCountdown` masks loading, but challenge transitions are abrupt. If `loadChallenge` fails, the user sees a blank workspace.

**Recommendation:** Add loading skeletons and error states for all dynamic workspaces.

### 6.3 Facilitator Mode Is Underutilized
The facilitator modal shows static stats but offers no class management, progress export, or reset controls beyond a single button.

**Recommendation:**
- Export progress as CSV/JSON.
- Add a class roster view.
- Allow facilitators to lock/unlock levels per student.

---

## 7. Performance & Security

### 7.1 AudioContext Created at Parse Time
`const audioCtx = new (window.AudioContext || window.webkitAudioContext)()` runs immediately. Some browsers block AudioContext until a user gesture.

**Recommendation:** Lazy-initialize the audio context on first user interaction.

### 7.2 No Input Debounce
The typing challenge `input` event fires on every keystroke with live accuracy calculation. For long texts, this is fine, but `simulated-os` and other future inputs may need debouncing.

**Recommendation:** Use `requestAnimationFrame` or a small debounce for non-critical UI updates.

### 7.3 No CSP or Subresource Integrity
If deployed online, the app has no Content Security Policy. `innerHTML` usage makes it vulnerable if any content is ever sourced externally.

**Recommendation:** Add a strict CSP header. Eliminate `innerHTML` for any dynamic content.

### 7.4 LocalStorage Unbounded
Progress data grows with `completedChallenges` array. No size check or migration logic exists.

**Recommendation:** Add storage quota checks and a migration/versioning scheme for `keyboard_quest_save`.

---

## 8. Testing & DevOps

### 8.1 Zero Tests
No unit, integration, or E2E tests exist.

**Recommendation:**
- Add Vitest or Jest for unit tests on pure logic (`calculateXP`, `getCurrentRankObj`, `normalizeKey`).
- Add Playwright or Cypress for E2E flows (complete a level, unlock badge, reset progress).

### 8.2 No Build or Lint Pipeline
No `package.json`, no linter, no formatter, no CI.

**Recommendation:**
- Add ESLint + Prettier.
- Add a `package.json` with scripts: `dev`, `build`, `lint`, `test`.
- Set up GitHub Actions for lint/test on push.

---

## 9. Feature Roadmap (Prioritized)

| Priority | Feature | Rationale |
|----------|---------|-----------|
| **P0** | Modularize `script.js` | Reduces technical debt; enables testing |
| **P0** | ~~Fix event listener leaks~~ | ✅ Completed |
| **P0** | ~~Replace `innerHTML` with safe DOM APIs~~ | ✅ Completed |
| **P1** | Add unit tests for core logic | Prevent regressions during refactor |
| **P1** | ~~Expand Level 5 challenges~~ | ✅ Completed (4 → 10) |
| **P1** | ~~Adaptive difficulty / randomization~~ | ✅ Completed (shuffleArray) |
| **P2** | ~~Facilitator analytics export~~ | ✅ Completed |
| **P2** | ~~Accessibility audit (ARIA, focus, SR)~~ | ✅ Completed |
| **P2** | ~~Boss battle content expansion~~ | ✅ Completed (3 → 20 tasks) |
| **P2** | Add responsive 480px breakpoint | ✅ Completed |
| **P2** | Add light/dark theme toggle | ✅ Completed |
| **P2** | Add PWA / offline support | ✅ Completed |
| **P3** | Multi-user / class roster | Facilitator workflows |
| **P3** | Theming / customization | Engagement |

---

## 10. Completed & Remaining Work

### ✅ Completed
1. **Deduplicate CSS** — removed duplicate `.key.correct-glow` block.
2. **Lazy-init AudioContext** — moved audio creation to first click/interaction.
3. **Startup validation** — verify challenge data and DOM element presence on load.
4. **Named constants** — extracted magic numbers into `BOSS_CONFIG`, `TIMING`, etc.
5. **Event listener leaks** — added `cleanupLabListeners()` and fixed navigation cleanup.
6. **Accessibility** — ARIA live regions, focus trapping, screen reader announcements.
7. **Responsive** — added `480px` breakpoint.
8. **PWA support** — added `manifest.json` and `sw.js` for offline/install.
9. **Theme toggle** — light/dark mode with persistence.
10. **Facilitator export** — JSON progress export.
11. **Progressive hints** — contextual hints after wrong attempts.
12. **Content expansion** — Level 5 (4→10), Boss (3→20 tasks).
13. **Save versioning** — migration-ready localStorage with quota check.

### 🔄 Remaining
1. **Modularize `script.js`** — split into modules for testability.
2. **Add unit tests** — write tests for pure logic (`getCurrentRankObj`, `normalizeKey`, `addXP`).
3. **Add ESLint + Prettier** — lint/format pipeline.
4. **Multi-user / class roster** — facilitator workflow enhancements.
5. **Adaptive difficulty tiers** — easy/medium/hard within levels.
