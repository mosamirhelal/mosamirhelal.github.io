# Technical Implementation Notes

Deep-dive implementation details for each project. Linked from the [main README](../README.md).

---

## 1. Personal Website — mosamirhelal.com

### Arabic Auto-Detection

The first script in `<head>` reads `navigator.language` synchronously before any content renders. If it starts with `"ar"`, the page title, `lang`, `dir`, `og:title`, `og:description`, `twitter:title`, `twitter:description`, and meta description are all rewritten before the browser paints a single pixel. Arabic visitors never see an English flash.

### Theme System — Three-Layer Priority

1. `localStorage` key `"theme"` — if set, always wins.
2. `window.matchMedia("(prefers-color-scheme: dark)").matches` — read at load time if no saved preference.
3. A `change` listener on `prefers-color-scheme` — updates the theme live, but only if the user has not made an explicit choice.

`applyTheme()` toggles a `dark-mode` class on `<body>`, swaps the toggle button emoji, updates `aria-label`, and writes the `theme-color` meta tag dynamically.

### Dual Hero Images

Two `<img>` elements (`light.webp` / `dark.webp`) are both in the DOM. Both are `<link rel="preload">`-d in `<head>` with `media` attributes so the correct image is in cache before JS runs. Visibility is controlled entirely in CSS via `body:not(.dark-mode)` and `body.dark-mode` selectors — no `src` swapping in JS.

### Social Drawer Animation

Uses a `max-height: 0 → 600px` transition with `overflow: hidden` during close and `overflow: visible` during open (via a delayed `overflow 0s linear 0.5s` transition so tooltips aren't clipped). The cubic-bezier easing produces a slight bounce on open. JS only toggles `.active` and `aria-expanded`.

### Brand Color System

All 21 platform colors are CSS custom properties in `:root`. Each button's hover style is a dedicated CSS rule. GitHub gets a special dark-mode inversion so its black icon doesn't disappear on dark backgrounds.

### Visitor Counter

Fires on every page load via `counterapi.dev`. The count is shown only when the URL contains `?stats`.

### Performance & SEO

- `<link rel="preconnect">` for FontAwesome and GTM
- FontAwesome loaded with `defer`
- `<h1 class="sr-only">` holds both English and Arabic page titles for screen readers and crawlers
- Schema.org JSON-LD `Person` with `sameAs` to 7 platforms
- Full Open Graph + Twitter Cards + `<link rel="canonical">`
- PWA: `site.webmanifest`, `apple-touch-icon`, multiple favicon formats

**Tech:** `HTML5` · `CSS3` · `Vanilla JavaScript` · `localStorage API` · `prefers-color-scheme` · `Schema.org JSON-LD`

---

## 2. MoTasks — /motasks

### Sync Architecture

Uses Firestore `onSnapshot` instead of a one-time `getDoc`. Every change on any device is pushed to all open tabs without polling. An active-element guard (`document.activeElement.tagName !== "TD"`) prevents remote updates from overwriting text the local user is currently typing.

### Debounced Save

Each `oninput` on a `contenteditable` cell resets a 1-second debounce timer. The Firestore write only fires when the user stops typing — keeps write costs low and avoids rate limits.

### Checkbox Serialization

`innerHTML` serialization only captures the `checked` HTML attribute, not the `.checked` JS property. Before saving, `saveToFirebase()` manually syncs every checkbox's attribute to match its runtime state.

### Event Re-attachment

The sync mechanism replaces `tableBody.innerHTML` on every remote update, destroying all event listeners. `reattachEvents()` re-wires `oninput` (debounced save), `onchange` (immediate save for checkboxes), and `onclick` (delete with confirm) after every rebuild.

### Status Badge

Four states: `Connecting...` (initial) → `⏳ Saving...` (before write) → `✅ Saved / Synced` (success, resets after 3 s) → `❌ Connection Error` (on failure).

**Tech:** `HTML5` · `CSS3` · `Vanilla JavaScript` · `Firebase Firestore` · `Firebase SDK v11`

---

## 3. AudioMonitor — /audiomonitor

### Bilingual Engine

All UI text lives in a `T` object with `en` and `ar` keys. `applyLang()` updates all text nodes by ID, sets `document.documentElement.lang` and `dir`, and triggers a CSS-driven font switch between Inter (Latin) and Tajawal (Arabic) via `html[lang="ar"] body` selector.

### State Persistence

All preferences are serialized as one JSON object in `localStorage`: language, theme, layout, per-channel card visibility, mode, sensitivity, smoothing, and color scheme. `loadState()` restores everything before first render.

### Cached Gradient Engine

Color schemes are defined as hue pairs (`h1`, `h2`). Gradients are computed via `createLinearGradient` and cached in `gradCache` by a key of `hue-height`. The cache is cleared on theme change or canvas resize. Bar hue is interpolated linearly: `hue = h1 + (h2 - h1) * (i / NUM)`.

### Canvas Sizing

A `ResizeObserver` watches each visualizer container and updates `canvas.width`/`canvas.height` to exact pixel dimensions on every viewport change, then clears the gradient cache.

### Visualization Modes

- **Bars:** 56 FFT bins, peak-hold with two decay rates (faster for low-energy bars), glow above a minimum amplitude threshold.
- **Wave:** Time-domain data drawn as a continuous stroke with a horizontal hue gradient and shadowBlur.
- **Mirror:** Same as Bars but bars extend both up and down from the vertical center.

### Audio Capture

Microphone via `getUserMedia`. System audio via `getDisplayMedia` (video tracks immediately stopped). Both share a singleton `AudioContext`. The audio track's `ended` event auto-cleans up when the user stops screen sharing.

### dB Meter

RMS of the time-domain buffer converted to dB: `20 * log10(rms)`. Returns `null` on silence, displayed as `∞`.

**Tech:** `Web Audio API` · `Canvas API` · `ResizeObserver` · `getDisplayMedia` · `localStorage API` · `Inter` · `Tajawal`

---

## 4. Al-Khateeb Landing — /alkhateeb

### Ripple Effect

`addRipple()` calculates the exact click coordinate relative to the button's bounding box. Handles mouse, touch, and keyboard (falls back to center). A sized `<span>` is appended, animated via `@keyframes ripple` (scale 0 → 3.5, opacity 1 → 0), and removed after 450 ms.

### Navigation Overlay

`navigateWithRipple()` fires the ripple, waits 150 ms, shows a full-screen overlay with spinner and pulsing dots, then navigates. A `pageshow` listener on every destination page removes any leftover overlay — necessary because the bfcache may restore the page with the overlay still visible.

**Tech:** `HTML5` · `CSS3` · `Vanilla JavaScript`

---

## 5. Al-Khateeb HR — /alkhateeb-hr

### Authentication

Uses `sessionStorage` (not `localStorage`) — session ends when the tab is closed. The teacher list is cached in `sessionStorage` after first fetch to avoid redundant requests. The backend response includes a `role` field; the frontend routes to `adminContainer` or `teacherContainer` based on it. All privileged actions are re-validated server-side.

### Live Autocomplete

Results are filtered in real time from the cached teacher list. The dropdown supports Arrow Up / Down / Enter keyboard navigation. A `document` click listener closes the dropdown on outside clicks. If exactly one result remains after typing, Enter auto-selects it.

### Chips Multi-Select

Selected teachers appear as dismissible chips below the search input. A single batch API call accepts the full array, so one operation can be applied to multiple teachers at once.

### Delay Calculation

`calculateDelay()` takes the selected time and the teacher's scheduled start time (stored in a hidden field), computes the difference in minutes. A "Now" button fills the time picker with the current system time and triggers recalculation.

### Multi-Day Grid

`generateCheckboxes()` builds a labeled checkbox for each day in the selected range (max 60 days). A master "Select All" checkbox syncs bidirectionally with individual checkboxes.

### SVG Circular Charts

Three progress circles animate via `stroke-dasharray`. JavaScript sets the value; CSS `transition` handles the animation. Charts show attendance rate (%), remaining leave (days), and total late minutes.

### Bulk Delete

A sequential `async/await` loop calls one delete API per selected row. Row identity data is stored in each checkbox's `value` attribute as URL-encoded JSON — no separate client-side store needed.

### CSV Export & Print

The history table exports as a `.csv` (opens directly in Excel/Sheets). Print mode strips UI chrome and renders only the data table, formatted for A4.

**Tech:** `HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `Google Sheets`

---

## 6. Al-Khateeb Students — /alkhateeb-students

### Search

Numeric input → direct ID lookup. Non-numeric → name search returning all matches as staggered-animated cards. The backend can globally suppress data via a settings flag — when hidden, the portal shows the student's name but replaces the committee table with a "not available yet" message.

### Share as Image

`html2canvas` captures the result card at 2× scale. The `onclone` callback: (1) injects a style that disables all animations and forces `opacity: 1`; (2) sets a fixed 800 px capture width; (3) reveals hidden `export-header` and `export-footer` elements containing school logos and a designer credit. On mobile with Web Share API support, the image is shared as a `File`. On desktop, it falls back to a download link.

**Tech:** `HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `html2canvas`

---

## 7. Al-Khateeb Results — /alkhateeb-results

### Search

Same dual-mode as Students (ID vs. name). Name results render as animated cards with a "Show Result" button that feeds the selected ID back into the main search flow.

### Count-Up Animation

Scores animate from 0 using `requestAnimationFrame` with cubic ease-out (`1 - (1-p)³`). Total and percentage run independent animations with different durations for a layered reveal.

### Confetti & Emoji

Passing students (≥50%) trigger `canvas-confetti` with 150 particles. Both outcomes trigger `showEmojis()` — 15 falling emoji elements from random horizontal positions with staggered delays.

### Share as Image

Same `html2canvas` approach as Students. `shareCount` in `localStorage` keeps exported filenames unique.

### Inline Feedback

A feedback form appears in-page after viewing results. Submissions include the student's name, ID, grade, and section for context. On success, the form is replaced with a "Search another student" button.

### Results Visibility Flag

When `resultsHidden: true` is returned from the backend, scores are replaced with a "not available yet" message.

**Tech:** `HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `html2canvas` · `canvas-confetti`

---

## 8. Al-Khateeb Degrees — /alkhateeb-degrees

### Authentication & Draft

Login stores a token and teacher name in `localStorage`. `checkAuth()` reads this on every load and routes to login or main view. On every state change (grade selected, score changed, page turned), `saveStateLocally()` writes a full snapshot — grade, section, subject, evaluation, full student array with original scores, current page, rows-per-page, and timestamp. Drafts older than a working day are discarded automatically.

### Arabic Numeral Input

`convertToEnglishNumbers()` maps Arabic-Indic digits (`٠١٢٣٤٥٦٧٨٩`) to ASCII equivalents on every keystroke in score inputs, then strips non-numeric characters. Teachers can type from Arabic keyboards without any conversion step.

### Modified Cell Highlighting

When a score differs from `originalScore` (the value returned from the server), the input gets a green border via `checkModifiedState()`. A `suppressGreen` flag prevents bulk-fill results from triggering per-cell highlighting.

### Enter Key Navigation

`handleEnter()` moves focus to the next available non-disabled input. At the end of a page, it advances to the next pagination page and focuses the first available input there. On the last student of the last page, it triggers `saveData()`.

### Save — Validation, Diff, Batch

1. Scans for empty scores. If found, clears the search filter, navigates to the student's page, scrolls to the input, and highlights it red.
2. Diffs: only students with `score !== originalScore` are sent.
3. The save button label uses correct Arabic pluralization.

### Dynamic Subject List

`subjectsConfig` maps each grade level to its subject array. Selecting a grade rebuilds the subject dropdown from this map — no backend round-trip needed.

### Bulk Score

Applies one score to all non-absent students. Absent students (`غ` / `غائب`) are excluded. All destructive bulk operations (apply, clear, mark all absent/present) go through a custom modal instead of the native `confirm()`.

### Pagination

Configurable rows-per-page (10 / 20 / 30 / 40 / 50 / all). Enter key navigation crosses page boundaries.

### Unsaved Changes Warning

`beforeunload` checks for any student where `score !== originalScore`. If found, triggers the browser's leave-page dialog. The logout button does the same check using the custom modal.

**Tech:** `HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `Google Sheets` · `LockService`

---

## 9. Al-Khateeb Stars — /alkhateeb-stars

### 3D Card Hover

Each card uses CSS `perspective`. A `mousemove` listener computes the cursor's offset from the card center and applies a matching `rotateX`/`rotateY` transform. Cards reset to flat on `mouseleave`.

### Staggered Reveal

Cards enter with a `popIn` keyframe (scale 0.85 → 1 with overshoot at 70%) combined with a `rowIn` slide from -12 px. Animation delay is calculated from rank index.

### Rank Themes

Rank 1, 2, 3 cards have distinct gold/silver/bronze gradient backgrounds with an animated `goldShimmer` sweep. Decorative laurel SVG elements frame the top-3 cards.

### Tabs

The backend returns data for all grade levels in one response. Tab switching is purely client-side — no additional requests.

**Tech:** `HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script`
