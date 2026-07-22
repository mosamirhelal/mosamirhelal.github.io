<div align="center">

# 👋 Hello, I'm Mohammed Samir Helal

### 🦷 Dental Student · 💻 Programmer · 🎨 Graphic Designer

<p align="center">
  <img src="https://hits.sh/github.com/mosamirhelal/mosamirhelal.github.io.svg?style=flat-square&label=%F0%9F%91%81%EF%B8%8F+Visitors&color=0e75b6&labelColor=1a1a2e" />
  
  <img src="https://img.shields.io/github/repo-size/mosamirhelal/mosamirhelal.github.io?style=flat-square&label=%F0%9F%93%A6+Repo+Size&color=f97316&labelColor=1a1a2e" />
  
  <img src="https://img.shields.io/github/last-commit/mosamirhelal/mosamirhelal.github.io?style=flat-square&label=%F0%9F%94%84+Last+Update&color=22c55e&labelColor=1a1a2e" />
</p>
</div>

<div align="center">

> **العربية متاحة:** [اقرأ بالعربي](README-AR.md)

</div>

---

## 👨‍💻 About Me

Hi! I'm **Mohammed Samir Helal** a Dental Student at **Misr University for Science and Technology (MUST)**, a passionate self-taught **Programmer**, and a Creative **Graphic Designer** based in Cairo, Egypt.

I enjoy building things that actually get used from student portals and school management systems to audio visualizers and personal tools. Everything in this repository is live in production and used by real people.

|                   |                                                                    |
| ----------------- | ------------------------------------------------------------------ |
| 🎓 **Education**  | Dental Student · Misr University for Science and Technology (MUST) |
| 📍 **Location**   | Cairo, Egypt                                                       |
| 🌐 **Website**    | [mosamirhelal.com](https://mosamirhelal.com)                       |
| 📱 **Everywhere** | [@mosamirhelal](https://mosamirhelal.com)                          |
| 🚀 **This Repo**  | Official host for my personal website & all sub-projects           |

<div align="center">
  <blockquote>🚀 <strong>Mission:</strong> Bridging the gap between medical precision and technical innovation.</blockquote>
</div>

---

## 🗂️ Projects Overview

| #   | Project                 | Description                                                                     | Core Tech          | Live Demo                                                                          |
| --- | ----------------------- | ------------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| 1   | **Personal Website**    | Elegant placeholder with social drawer, dark/light mode & Arabic auto-detection | HTML · CSS · JS    | [mosamirhelal.com](https://mosamirhelal.com)                                       |
| 2   | **MoTasks**             | Real-time study task tracker with Firebase sync                                 | JS · Firebase      | [mosamirhelal.com/motasks](https://mosamirhelal.com/motasks)                       |
| 3   | **AudioMonitor**        | In-browser mic & system audio visualizer no server needed                       | Web Audio API · JS | [mosamirhelal.com/audiomonitor](https://mosamirhelal.com/audiomonitor)             |
| 4   | **Al-Khateeb Landing**  | Unified gateway to the school's five portals                                    | HTML · CSS · JS    | [mosamirhelal.com/alkhateeb](https://mosamirhelal.com/alkhateeb)                   |
| 5   | **Al-Khateeb HR**       | Full staff HR system: attendance, leaves, registration & employee management    | JS · Apps Script   | [mosamirhelal.com/alkhateeb-hr](https://mosamirhelal.com/alkhateeb-hr)             |
| 6   | **Al-Khateeb Students** | Student exam committee data & seat number lookup with share-as-image            | JS · Apps Script   | [mosamirhelal.com/alkhateeb-students](https://mosamirhelal.com/alkhateeb-students) |
| 7   | **Al-Khateeb Results**  | Student results portal with confetti & share-as-image                           | JS · Apps Script   | [mosamirhelal.com/alkhateeb-results](https://mosamirhelal.com/alkhateeb-results)   |
| 8   | **Al-Khateeb Degrees**  | Teacher grade-entry portal with auth & conflict protection                      | JS · Apps Script   | [mosamirhelal.com/alkhateeb-degrees](https://mosamirhelal.com/alkhateeb-degrees)   |
| 9   | **Al-Khateeb Stars**    | Animated top-10 students leaderboard with rank cards & shimmer effects          | JS · Apps Script   | [mosamirhelal.com/alkhateeb-stars](https://mosamirhelal.com/alkhateeb-stars)       |

---

## 🔬 Projects In Depth

<details>
<summary><b>🌐 1. Personal Website mosamirhelal.com</b></summary>

<br>

A personal placeholder page built entirely from scratch in pure HTML, CSS, and vanilla JavaScript. It handles Arabic visitors, dark/light theme preferences, social links, and performance hints with zero external dependencies.

**Key Features:**

- Auto-detects Arabic browsers and switches the page language, direction, and meta tags before the first paint
- Three-layer theme system: saved preference → OS preference → live OS changes
- Social drawer that expands to 21 platform links with CSS-only animations
- CSS-only tooltips on every icon via `content: attr(aria-label)`
- Visitor counter with a hidden `?stats` mode visible only to the admin
- Full SEO: Schema.org JSON-LD, Open Graph, Twitter Cards, canonical URL, PWA manifest

---

### 🌍 Arabic Auto-Detection Pre-render Language Switch

The first script in `<head>` before any content renders reads `navigator.language` and checks if it starts with `"ar"`. If true, it immediately rewrites the page before the browser paints a single pixel:

```js
const userLang = navigator.language || navigator.userLanguage;
const isArabic = userLang.startsWith("ar");
if (isArabic) {
  document.title = arabicTitle;
  document.documentElement.lang = "ar";
  document.documentElement.dir = "rtl";
  // Also rewrites: og:title, og:description, twitter:title, twitter:description, meta description
}
```

This means Arabic visitors never see an English flash. The switch happens synchronously at parse time, not after `DOMContentLoaded`. Both `lang` and `dir` attributes on `<html>` are updated, which also affects font rendering and text direction globally.

---

### 🌙 Theme System Three-Layer Priority

The theme engine resolves which theme to show using a three-layer priority system:

1. **User's explicit choice** stored in `localStorage` under the key `"theme"`. If present, it always wins.
2. **System preference** `window.matchMedia("(prefers-color-scheme: dark)").matches` is read at load time if no saved preference exists.
3. **Live system changes** a `change` event listener on the `prefers-color-scheme` media query updates the theme in real time _only if_ the user has not made an explicit choice.

```js
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme : prefersDark ? "dark" : "light");

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
```

The `applyTheme()` function toggles a `dark-mode` class on `<body>`, swaps the button emoji (🌙 / ☀️), updates the `aria-label`, and dynamically writes the `theme-color` meta tag (`#000000` or `#ffffff`) which controls the browser chrome color on mobile devices.

---

### 🖼️ Dual Hero Images CSS-Driven Swap

There are two separate `<img>` elements in the DOM `light.webp` and `dark.webp`. Both are preloaded in `<head>` using `<link rel="preload">` with `media` attributes matching the OS theme, so the correct image is already in memory before JS runs:

```html
<link
  rel="preload"
  as="image"
  href="light.webp"
  media="(prefers-color-scheme: light)"
/>
<link
  rel="preload"
  as="image"
  href="dark.webp"
  media="(prefers-color-scheme: dark)"
/>
```

Visibility is handled entirely in CSS no `src` swapping in JS:

```css
body:not(.dark-mode) #light-image {
  display: block;
}
body.dark-mode #dark-image {
  display: block;
}
```

Both images carry `fetchpriority="high"` and explicit `width`/`height` attributes to prevent layout shift. Transitions are managed via `opacity` on the `img` elements and `background-color` on `body`.

---

### 🎪 Social Drawer Pure CSS Animation

The drawer uses a `max-height` animation trick to achieve a smooth slide-in without JavaScript measuring element heights. The container transitions from `max-height: 0` to `max-height: 600px`, with `overflow: hidden` during the closed phase and `overflow: visible` during the open phase (to allow tooltips to escape the container):

```css
.social-icons-container {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    ...;
}
.contact-wrapper.active .social-icons-container {
  max-height: 600px;
  opacity: 1;
  overflow: visible;
  transition:
    ...,
    overflow 0s linear 0.5s;
}
```

The `cubic-bezier(0.68, -0.55, 0.27, 1.55)` produces a slight overshoot ("bounce") on open and a fast snap on close a carefully chosen easing that makes the drawer feel physical. JavaScript's only role is toggling the `.active` class and updating `aria-expanded`.

---

### 🎨 21-Platform Social Icons Brand Color System

All 21 platform colors are defined as CSS custom properties in `:root`, keeping the JavaScript layer completely color-agnostic. Each `.social-btn` gets its hover style through a dedicated CSS rule:

```css
:root {
  --whatsapp: #25d366;
  --instagram: /* gradient */;
  --tiktok: #000;
  /* ... 18 more */
}
.social-btn.tiktok:hover {
  box-shadow:
    2px 2px 0 #25f4ee,
    -2px -2px 0 #fe2c55; /* TikTok's dual-color logo effect */
}
.social-btn.instagram:hover {
  background: linear-gradient(
    45deg,
    #f09433,
    #e6683c,
    #dc2743,
    #cc2366,
    #bc1888
  );
}
```

GitHub has a special dark-mode inversion rule white background with black icon because the standard GitHub black disappears on dark backgrounds.

---

### 💬 Tooltips CSS-Only via `aria-label`

Every social button and the theme toggle show tooltips on hover using `::before` pseudo-elements that read from the `aria-label` attribute via `content: attr(aria-label)`. No JavaScript, no extra HTML:

```css
.social-btn::before {
  content: attr(aria-label);
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
  transition: all 0.2s ease;
}
.social-btn:hover::before {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
```

This keeps the HTML clean and ensures tooltips are always in sync with the accessible label.

---

### 🔢 Visitor Counter Hidden Stats Mode

A visitor counter fires silently on every page load via `counterapi.dev`. The count is only displayed if the URL contains `?stats` an intentional Easter egg for admin access without exposing the counter to regular visitors:

```js
fetch("https://api.counterapi.dev/v1/mosamirhelal/visits/up")
  .then((res) => res.json())
  .then((data) => {
    if (window.location.search === "?stats") {
      alert(`عدد زيارات الموقع : ${data.count.toLocaleString()}`);
    }
  })
  .catch(() => {});
```

---

### ⚡ Performance & SEO Architecture

- `<link rel="preconnect">` for FontAwesome and Google Tag Manager domains reduces DNS + TLS handshake latency
- FontAwesome loaded with `defer` never blocks render
- `<h1 class="sr-only">` contains both English and Arabic versions of the page title for screen readers and search engines, without being visible
- Full `Schema.org` JSON-LD `Person` structured data including `sameAs` links to 7 platforms
- Complete Open Graph and Twitter Card meta tags
- `<link rel="canonical">` for deduplication
- PWA-ready: `site.webmanifest`, `apple-touch-icon`, multiple favicon formats

**🛠️ Tech Used**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `localStorage API` · `prefers-color-scheme` · `Schema.org JSON-LD`

</details>

---

<details>
<summary><b>✅ 2. MoTasks /motasks</b></summary>

<br>

A real-time study task manager built on Firebase Firestore. The entire application state lives in a single Firestore document, serialized as raw `innerHTML` a pragmatic design that eliminates a schema layer entirely for a personal tool.

**Key Features:**

- Real-time sync across all open tabs via Firestore `onSnapshot`
- Debounced auto-save: writes to Firestore only after the user pauses typing for 1 second
- `contenteditable` table cells with correct checkbox persistence across reloads
- Auto-dated new rows using `toLocaleDateString("en-GB")`
- Four-state status badge: Connecting / Saving / Saved / Error

---

### 🔥 Real-Time Sync `onSnapshot` Architecture

The app uses Firestore's `onSnapshot` listener instead of a one-time `getDoc` call. This means every change made on any device is pushed to all open tabs instantly, without polling:

```js
onSnapshot(scheduleDocRef, (docSnap) => {
  if (docSnap.exists() && docSnap.data().htmlContent) {
    // Guard: only update if the user is not currently editing a cell
    if (document.activeElement.tagName !== "TD") {
      tableBody.innerHTML = docSnap.data().htmlContent;
      reattachEvents();
    }
  }
});
```

The active element guard (`document.activeElement.tagName !== "TD"`) prevents a remote update from overwriting text the local user is currently typing a simple but effective conflict prevention mechanism for a single-user tool.

---

### 💾 Debounced Saving 1-Second Write Delay

Every `oninput` event on a `contenteditable` cell resets a 1-second debounce timer. The save only fires when the user pauses typing:

```js
cell.oninput = () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveToFirebase, 1000);
};
```

This prevents a Firestore write on every keystroke, keeping costs low and avoiding write-rate limits.

---

### ☑️ Checkbox State Serialization

Standard HTML checkboxes have a quirk: the `.checked` JavaScript property reflects runtime state, but `innerHTML` serialization only captures the `checked` HTML _attribute_. To persist checkboxes correctly, `saveToFirebase()` manually syncs the attribute before serializing:

```js
checkboxes.forEach((cb) => {
  if (cb.checked) cb.setAttribute("checked", "true");
  else cb.removeAttribute("checked");
});
await setDoc(scheduleDocRef, { htmlContent: tableBody.innerHTML });
```

Without this step, all checkboxes would appear unchecked after every reload.

---

### 🔁 Event Re-attachment After DOM Rebuild

Because the sync mechanism replaces `tableBody.innerHTML` entirely, all event listeners are destroyed on every remote update. `reattachEvents()` re-wires all three event types after every DOM rebuild:

```js
function reattachEvents() {
  // 1. Debounced save on contenteditable input
  tableBody.querySelectorAll("[contenteditable]").forEach((cell) => {
    cell.oninput = () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(saveToFirebase, 1000);
    };
  });
  // 2. Immediate save on checkbox change
  tableBody.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.onchange = saveToFirebase;
  });
  // 3. Delete button with confirm dialog
  tableBody.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = function () {
      if (confirm("Delete this task?")) {
        this.closest("tr").remove();
        saveToFirebase();
      }
    };
  });
}
```

---

### ➕ New Row Auto-Dated

`addNewRow()` inserts a pre-filled row with today's date in `dd/mm/yyyy` format using `toLocaleDateString("en-GB")`. After inserting, it calls `reattachEvents()` on the new row and immediately triggers a save.

---

### 📡 Status Badge Three-State Feedback

The status badge in the header cycles through four states with auto-reset:

| State                 | Trigger                   | Auto-Reset      |
| --------------------- | ------------------------- | --------------- |
| `Connecting...`       | Initial page load         | No              |
| `⏳ Saving...`        | Before Firestore write    | No              |
| `✅ Saved / Synced`   | Successful write/snapshot | After 3 seconds |
| `❌ Connection Error` | Firestore error           | No              |

**🛠️ Tech Used**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Firebase Firestore` · `Firebase SDK v11`

</details>

---

<details>
<summary><b>🎧 3. AudioMonitor /audiomonitor</b></summary>

<br>

A fully client-side audio monitoring tool. All signal processing happens inside the browser's Web Audio API with no audio data leaving the device. The app supports simultaneous microphone and system audio monitoring with independent visualizers, settings, and color schemes.

**Key Features:**

- Monitor microphone and system audio simultaneously in real time
- Three visualization modes: Bars, Waveform, Mirror
- Six color schemes with a dynamic gradient engine per scheme
- dB level meter calculated from RMS of the time-domain buffer
- Full bilingual interface (English / Arabic) with font switching
- All preferences (theme, layout, sensitivity, scheme) saved to `localStorage`
- Keyboard shortcuts: `M` (microphone) and `S` (system audio)

---

### 🌍 Full Bilingual Engine `T` Object

All UI text lives in a single `T` object with `en` and `ar` keys, including error alert strings. `applyLang()` iterates over all text nodes by ID, updates `document.documentElement.lang` and `dir`, and switches the CSS font family between `Inter` (Latin) and `Tajawal` (Arabic):

```js
// CSS handles the font switch:
html[lang="ar"] body { font-family: "Tajawal", system-ui, sans-serif; }
html[lang="en"] body { font-family: "Inter",   system-ui, sans-serif; }
```

Every button text including dynamic states ("Start Monitoring" / "Stop") goes through `T[lang]` there is no hardcoded English text anywhere in the JavaScript layer.

---

### 💾 Persistent Preferences `localStorage` State Object

All user preferences are serialized as a single JSON object and saved to `localStorage` on every change. `loadState()` restores them before first render:

```js
// State shape:
{ lang, isDark, layoutMode, cardVis: { mic, sys }, micCfg: { mode, sensitivity, smoothing, scheme }, sysCfg: { ... } }
```

This means every color scheme, waveform mode, sensitivity level, layout preference, and hidden card is remembered across browser sessions.

---

### 🎨 6-Color Scheme System Cached Gradient Engine

Six color schemes are defined as hue pairs (`h1`, `h2`), not as fixed colors. The actual gradient is computed at draw time using the canvas `createLinearGradient` API. A `gradCache` object caches every gradient by a key combining hue and canvas height/width, so each unique gradient is only computed once:

```js
function getBarGrad(ctx, H, hue, id) {
  const key = `${Math.round(hue)}-${H}`;
  if (!gradCache[id][key]) {
    const g = ctx.createLinearGradient(0, H, 0, 0);
    g.addColorStop(0, `hsla(${hue},85%,45%,.9)`);
    g.addColorStop(1, `hsla(${hue},90%,72%,1)`);
    gradCache[id][key] = g;
  }
  return gradCache[id][key];
}
```

The cache is invalidated (`clearGradCache()`) whenever the theme changes (dark/light affects background color) or the canvas is resized. Each bar's hue is interpolated linearly across the frequency range: `hue = h1 + (h2 - h1) * (i / NUM)` producing a smooth gradient sweep across all 56 bars.

---

### 📐 Canvas Auto-Resize `ResizeObserver`

Instead of a fixed canvas size, a `ResizeObserver` watches the container element and updates `canvas.width` and `canvas.height` to match its exact pixel dimensions whenever the viewport changes:

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const canvas = entry.target.querySelector("canvas");
    canvas.width = entry.contentRect.width;
    canvas.height = entry.contentRect.height;
    clearGradCache(); // cached gradients are now the wrong size
  }
});
resizeObserver.observe(document.getElementById("mic-viz-wrap"));
resizeObserver.observe(document.getElementById("sys-viz-wrap"));
```

This ensures the visualizer always fills its container exactly on mobile, tablet, and desktop without any media query math.

---

### 📊 Three Visualization Modes

**Bars Mode** The default. 56 frequency bins are mapped from the FFT array. Each bar's height is `freqData[i * step] / 255 * sensitivity`. A peak-hold system maintains the highest recent value for each bin. Peaks decay at two different rates: fast decay for low-energy bars, slow decay for high-energy bars:

```js
const decayRate = peaks[id][i] > 0.7 ? 0.008 : 0.018;
peaks[id][i] = Math.max(peaks[id][i] - decayRate, v);
```

A small glow (`shadowBlur`) is added proportional to bar height for bars exceeding 6% amplitude.

**Wave Mode** Uses the time-domain data (`getByteTimeDomainData`) instead of frequency data. Draws a continuous path across the full canvas width. The amplitude is scaled by the sensitivity value. A horizontal gradient (left-to-right across the scheme's hue range) is applied to the stroke, and a `shadowBlur` glow is added matching the left-edge hue.

**Mirror Mode** Same bar logic as Bars, but bars grow both upward and downward from the vertical center. Peak dots appear both above the top bars and below the bottom bars symmetrically.

---

### 🎤 Microphone Capture `getUserMedia`

```js
micStream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false,
});
const actx = await getAudioCtx();
micAnalyser = actx.createAnalyser();
micAnalyser.fftSize = 2048; // → 1024 frequency bins
micAnalyser.smoothingTimeConstant = micCfg.smoothing;
micSrc = actx.createMediaStreamSource(micStream);
micSrc.connect(micAnalyser);
```

The `AudioContext` is a singleton (`globalAudioCtx`) shared between mic and system audio. If it exists but is `"suspended"` (browser policy), `resume()` is called before use. If it's `"closed"`, a new one is created and both analysers are reset.

---

### 🔊 System Audio Capture `getDisplayMedia`

```js
sysStream = await navigator.mediaDevices.getDisplayMedia({
  audio: true,
  video: true,
});
sysStream.getVideoTracks().forEach((t) => t.stop()); // immediately discard video we only need audio
if (sysStream.getAudioTracks().length === 0) {
  // User did not enable "Share tab audio" alert and abort
}
```

Video tracks are requested (required by browser APIs to trigger the sharing prompt) but immediately stopped. The app also listens for the audio track's `ended` event which fires when the user clicks "Stop sharing" in the browser UI to automatically clean up:

```js
sysStream.getAudioTracks()[0].addEventListener("ended", stopSys);
```

---

### 📉 dB Level Calculation

The dB meter uses RMS (Root Mean Square) of the time-domain buffer, converted to dB:

```js
function calcDb(timeArr) {
  let s = 0;
  for (let i = 0; i < timeArr.length; i++) {
    const v = timeArr[i] / 128 - 1; // normalize from [0,255] to [-1,1]
    s += v * v;
  }
  const rms = Math.sqrt(s / timeArr.length);
  return rms < 0.0001 ? null : Math.round(20 * Math.log10(rms));
}
```

A `null` return (silence) displays as `∞` in the UI rather than a meaningless large negative number.

---

### ⌨️ Keyboard Shortcuts

`M` → toggles microphone. `S` → toggles system audio. The handler skips if the focus is on an `INPUT` or `TEXTAREA`, and ignores modified keys (`Ctrl`, `Meta`, `Alt`).

**🛠️ Tech Used**
`Web Audio API` · `Canvas API` · `ResizeObserver` · `getDisplayMedia` · `localStorage API` · `Inter` · `Tajawal`

</details>

---

<details>
<summary><b>🏠 4. Al-Khateeb Landing /alkhateeb</b></summary>

<br>

The unified entry point for the school's digital system. Routes visitors to five separate portals through a clean, animated interface.

**Key Features:**

- Single page listing all school portals with descriptive buttons
- Ripple effect on every button click, supporting mouse, touch, and keyboard
- Full-screen redirect overlay with a spinner and pulsing dots while navigating
- Floating ambient background dots for visual depth
- Safe back-navigation: overlay is removed on `pageshow` to handle browser cache restore

---

### 🟣 Floating Ambient Dots

Five `<div class="dot">` elements are positioned absolutely across the page using inline styles. Each has a unique size, position, and `animation-duration` / `animation-delay`. They animate with `floatDot` a simple translateY loop and have `pointer-events: none` so they never interfere with clicks:

```css
@keyframes floatDot {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.02);
  }
}
```

---

### 💧 Ripple Effect Click Coordinate Precision

The ripple function calculates the exact click position relative to the button's bounding box, creates a `<span>` sized to cover the full button, and appends it. It handles three input types mouse click, touch, and keyboard (falls back to center):

```js
function addRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  let x = e.clientX
    ? e.clientX - rect.left
    : e.touches?.length
      ? e.touches[0].clientX - rect.left
      : rect.width / 2;
  // a span is created at (x - size/2, y - size/2), sized to cover the button
  // animates via @keyframes ripple: scale(0) → scale(3.5), opacity 1 → 0
}
```

The ripple span is removed from the DOM after 450ms.

---

### 🔄 Navigation Overlay Back-Navigation Safe

When a portal button is clicked, `navigateWithRipple()` fires the ripple, waits 150ms, then shows a full-screen overlay with a spinner and pulsing dots before navigating. On the _destination_ page, a `pageshow` event listener removes any leftover overlay which is necessary because browsers may restore the overlay from the bfcache when the user presses Back:

```js
window.addEventListener("pageshow", function (event) {
  document.querySelectorAll(".redirect-overlay").forEach((o) => o.remove());
});
```

**🛠️ Tech Used**
`HTML5` · `CSS3` · `Vanilla JavaScript`

</details>

---

<details>
<summary><b>👔 5. Al-Khateeb HR /alkhateeb-hr</b></summary>

<br>

The most comprehensive project in this repository. A full-featured staff HR management system with a dual-role architecture serving both administrators and teachers. Started as a basic attendance logger and grew into a complete operations platform.

**What it does for administrators:**

- Log attendance events for any staff member: absences, tardiness, early departures, and leave
- Apply operations to multiple staff members simultaneously via a chips-based multi-select
- Apply one operation across multiple days at once using a day-by-day checkbox grid
- View and edit or delete any logged record from the full history table
- Export all records as a `.csv` file ready for Excel or Sheets
- Print the history table formatted for A4 paper
- Register new employees through a built-in approval workflow
- Reset passwords for any teacher account
- Monitor a live counter of working days elapsed in the current month

**What it does for teachers:**

- View personal attendance summary with animated circular progress charts
- Browse their full operation history with filters
- See remaining annual leave and total late minutes at a glance

---

### 🔐 Authentication `sessionStorage`

Unlike the Grades portal which uses `localStorage`, this system uses `sessionStorage`. The session is automatically invalidated when the browser tab is closed, which is appropriate for HR data. The teacher list is cached in `sessionStorage` to avoid re-fetching on every navigation:

```js
sessionStorage.setItem(
  "alkhateeb_hr_auth",
  JSON.stringify({ token, name, role }),
);
sessionStorage.setItem("alkhateeb_teachers", JSON.stringify(allTeachers));
```

---

### 👥 Dual-Role Dashboard

After login, the backend's response includes a `role` field. The frontend shows a completely different container based on this value `adminContainer` or `teacherContainer`. There is no client-side role logic beyond this routing; all privileged actions are validated server-side using the token.

---

### 🔎 Live Autocomplete Search with Keyboard Navigation

The teacher search input uses a custom autocomplete implementation. Results are filtered in real time from the locally cached teacher list. The dropdown supports full keyboard navigation:

```js
document
  .getElementById("adminSearchInput")
  .addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      currentSearchFocus++;
      addActiveSearchItem(items);
    }
    if (e.key === "ArrowUp") {
      currentSearchFocus--;
      addActiveSearchItem(items);
    }
    if (e.key === "Enter") {
      if (currentSearchFocus > -1) items[currentSearchFocus].click();
      else if (items.length === 1) items[0].click(); // auto-select if only one result
    }
  });
```

A `document.addEventListener("click")` closes the dropdown when clicking anywhere outside the input.

---

### 👥 Multi-Teacher Selection with Chips UI

The admin can select multiple staff members simultaneously via a chips-based selector. Selected names appear as dismissible chips below the search input. All selected teachers can have the same operation applied in a single batch API call, which accepts an array of records rather than a single record.

---

### ⏱️ Automatic Delay Calculation

For time-based operations (morning tardiness, early departure, etc.), the form shows a time picker. When the time changes, `calculateDelay()` parses both the selected time and the teacher's scheduled start time (stored in the hidden `selectedTeacherStart` field) and computes the difference in minutes:

```js
let [eh, em] = expectedTime.split(":").map(Number);
let [ah, am] = actualTime.split(":").map(Number);
let diff = ah * 60 + am - (eh * 60 + em);
```

A "Now" button fills the time picker with the current system time and triggers the calculation immediately.

---

### 📅 Multi-Day Checkbox Grid

For absences and leaves, the admin switches to "multiple days" mode. `generateCheckboxes()` builds a day-by-day grid for the selected date range (max 60 days). A master "Select All" checkbox syncs bidirectionally with individual checkboxes.

---

### 📊 Circular Chart Animations SVG `stroke-dasharray`

The teacher dashboard uses three SVG circular progress charts. Animation is achieved by setting `stroke-dasharray` from `"0, 100"` to `"${percentage}, 100"` via JavaScript the CSS `transition` on the `circle` element animates the change:

```js
function animateCircle(circleId, textId, value, maxVal, suffix) {
  let percentage = Math.min(100, (value / maxVal) * 100);
  setTimeout(() => {
    circle.setAttribute("stroke-dasharray", `${percentage}, 100`);
    text.innerHTML = value + suffix;
  }, 300);
}
```

Three charts display: attendance rate (%), remaining annual leave (days), and total late minutes.

---

### 🗑️ Bulk Edit & Delete

The history table supports row selection with checkboxes. When rows are selected, a bulk actions bar appears showing the count. Bulk delete runs as a sequential `async/await` loop, executing one API call per record and collecting errors:

```js
for (let i = 0; i < boxes.length; i++) {
  const item = JSON.parse(decodeURIComponent(boxes[i].value));
  let res  = await fetch(APPS_SCRIPT_URL, { ... action: "deleteRecord" ... });
  let data = await res.json();
  if (data.status !== "success") hasError = true;
}
```

Row metadata (date, name, type, amount) is `JSON.stringify`-d and `encodeURIComponent`-d into each checkbox's `value` attribute eliminating the need for a separate data store.

---

### 📝 Public Employee Self-Registration

Staff can submit a registration request through a full-page public form without needing admin credentials. The submitted data enters a review queue visible to admins. The admin review modal exposes all submitted fields as editable inputs, allowing corrections before approval. Approved entries are written directly to the employees sheet.

---

### 📊 CSV Export & Print Support

The history table can be exported as a `.csv` file that opens directly in Excel or Google Sheets. A separate print mode strips the UI chrome and renders only the data table, formatted for A4 paper.

---

### ⏱️ Live Workdays Counter

The admin dashboard shows a real-time counter of working days elapsed in the current month, excluding weekends. The counter updates without requiring a full page reload.

---

### 🔒 Reset Password

Admins can issue a password reset for any teacher account. The reset flow validates the new password server-side and regenerates the token to invalidate all existing sessions for that user.

---

### 🔒 Custom Confirm Dialog

The native `window.confirm()` is replaced entirely with `customConfirm(msg, callback)` a modal that accepts a callback function executed only when the user clicks "Confirm." This provides consistent styling and prevents the browser-default dialog from appearing.

**🛠️ Tech Used**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `Google Sheets`

</details>

---

<details>
<summary><b>📚 6. Al-Khateeb Students /alkhateeb-students</b></summary>

<br>

A public portal for students and parents to look up exam committee assignments and seat numbers by student name or ID.

**Key Features:**

- Search by student ID (numeric) or by name same input field, automatic mode detection
- Results displayed as styled cards with staggered slide-in animations
- Share the student data card as a PNG image, with mobile Web Share API support
- School logos are added only to the exported image via hidden elements, not shown on the page
- The backend can globally hide data without code changes, via a settings flag

---

### 🔍 Smart Search with Dual Mode

A single input field handles both ID and name searches. If the input is numeric, it performs a direct ID lookup; otherwise it runs a name search returning all matching students. Results render as styled cards with staggered slide-in animations.

---

### 📸 Share as Image

Uses `html2canvas` at 2x scale to capture the student's data card as a PNG. On mobile with Web Share API support the image is shared as a `File` via `navigator.share()`. On desktop it falls back to a download link. School logos and a designer credit appear only in the exported image via hidden `export-header` and `export-footer` elements revealed in the `onclone` callback.

---

### 📰 Results Visibility Control

The backend can globally suppress data via a settings flag. When the data is hidden the portal shows the student's name but replaces the committee table with a "data not available yet" message.

**🛠️ Tech Used**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `html2canvas`

</details>

---

<details>
<summary><b>📊 7. Al-Khateeb Results /alkhateeb-results</b></summary>

<br>

A public-facing portal for students and parents to look up student data and exam results by student ID or name. A single unified interface covers both data retrieval and score display.

**Key Features:**

- Search by student ID or name from a single input mode is detected automatically
- Name search returns multiple matching students as animated cards, each with a "Show Result" button
- Total score and percentage animate from 0 to their final values on display
- Passing students (≥50%) trigger a confetti burst and falling emoji celebration
- Share the full results card as a PNG image, optimized for mobile sharing
- Inline feedback form for students to send messages to school administration
- The backend can globally hide results without code changes, via a settings flag

---

### 🔍 Unified Smart Search Auto-Mode Detection

A single input field serves both search modes. `getGrade()` checks if the input is purely numeric:

```js
const isNumeric = /^\d+$/.test(id.trim());
if (!isNumeric) {
  searchByName(id.trim()); // name search
  return;
}
// else: ID search → fetch ?id=...
```

No separate buttons or fields. The search mode is invisible to the user.

---

### 🃏 Name Search Results Staggered Card Animation

When a name search returns multiple students, each result renders as a card with a CSS animation delay calculated from its index:

```js
data.results.forEach((student, index) => {
  const delay = 0.08 * (index + 1);
  html += `<div class="name-card" style="animation-delay: ${delay}s">...`;
});
```

Each card shows the student's name, grade, section, and ID number, with a "Show Result" button that calls `selectStudentAndSearch(id)` feeding the ID back into the main search flow.

---

### 🔢 Count-Up Animation Cubic Easing

All score numbers animate from 0 to their final value using a `requestAnimationFrame` loop with cubic ease-out (`1 - (1-p)^3`):

```js
function countUp(el, target, duration, suffix, decimals = 0) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.innerText =
      (decimals > 0
        ? (eased * target).toFixed(decimals)
        : Math.round(eased * target)) + (suffix || "");
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
```

The total score and percentage each run independent count-ups with different durations (1000ms and 1200ms) for a layered reveal effect.

---

### 🎉 Confetti & Falling Emoji System

Passing students (≥50%) trigger `confetti()` from the `canvas-confetti` library with 150 particles. Both passing and failing trigger `showEmojis()` which drops 15 falling emoji characters from random horizontal positions with staggered delays:

```js
function showEmojis(isSuccess) {
  const happyEmojis = ["🥳", "😄", "👏", "🏆", "🎉", "😘"];
  const sadEmojis = ["😥", "😭", "☹️", "😣", "😓"];
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const emoji = document.createElement("div");
      emoji.style.left = Math.random() * 100 + "vw";
      emoji.style.animationDuration = Math.random() * 3 + 4 + "s";
      // animated via @keyframes floatDown: translateY(0) → translateY(105vh)
    }, i * 150);
  }
}
```

---

### 📸 Share as Image `html2canvas` with Clone Callback

`shareResult()` uses `html2canvas` to rasterize the result card at 2× scale. The `onclone` callback which runs on a cloned DOM before capture does several critical things:

```js
onclone: function(clonedDoc) {
  // 1. Inject a style that disables ALL animations and forces opacity:1 on everything
  //    (prevents partially-animated elements from appearing mid-animation in the screenshot)
  noAnimStyle.innerHTML = "* { animation: none !important; opacity: 1 !important; ... }";

  // 2. Set a fixed 800px width on the capture area (prevents mobile-width screenshots)
  clonedArea.style.width = "800px";

  // 3. Show hidden export-header and export-footer divs
  //    (school logos + designer credit that only appear in the exported image)
  clonedDoc.getElementById("export-header").style.display = "block";
  clonedDoc.getElementById("export-footer").style.display = "block";
}
```

On mobile with Web Share API support, the image is shared as a `File` object via `navigator.share({ files: [file] })`. On desktop (or unsupported browsers), it falls back to a download link. A `shareCount` integer in `localStorage` ensures each exported file has a unique filename.

---

### 💬 Inline Feedback System

After viewing results, students can submit feedback. The form appears in-page (no navigation) and sends the student's name, ID, grade, and section alongside the feedback text to the backend giving the school administration full context on who submitted what. After a successful send, the form is replaced with a "Search another student" button.

---

### 👁️ Results Visibility Flag

The backend can globally hide results via a settings sheet. When `resultsHidden: true` is returned, the portal shows the student's name and grade but replaces the score table with a "results not available yet" message without revealing any actual scores.

**🛠️ Tech Used**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `html2canvas` · `canvas-confetti`

</details>

---

<details>
<summary><b>✏️ 8. Al-Khateeb Degrees /alkhateeb-degrees</b></summary>

<br>

A secure grade entry portal for teachers. Handles login, session management, draft saving, and conflict-safe writes to the grade database.

**Key Features:**

- Login system with token-based auth stored in `localStorage` (8-hour session)
- Full UI state is auto-saved as a draft to `localStorage` after every change and restored on reload
- Multi-step selection: grade level → section → subject → evaluation type
- Absent students are flagged with a checkbox and excluded from grade validation
- Enter key moves focus to the next available input, crossing page boundaries automatically
- Bulk score feature applies one value to all present students at once
- Paginated table with configurable rows per page (10 to all)
- Save sends only changed records (diff), not the full list
- After a successful save, the interface resets and shows a summary of what was saved
- Warns before leaving the page if there are unsaved changes

---

### 🔐 Authentication `localStorage` Token Storage

After login, the server returns a token and the teacher's name. These are stored in `localStorage` as a JSON object. On every page load, `checkAuth()` reads this object and decides which container to show:

```js
function checkAuth() {
  const authData = localStorage.getItem("alkhateeb_auth");
  if (authData) {
    const auth = JSON.parse(authData);
    // Show main container, display teacher name, restore draft
  } else {
    // Show login container
  }
}
```

---

### 📝 Draft Auto-Save Expiring `localStorage` Snapshot

Every time the teacher changes a grade or navigates between pages, `saveStateLocally()` writes the complete application state to `localStorage`:

```js
const state = {
  grade,
  section,
  subject,
  evaluation,
  students: allStudents, // full array with originalScore and current score
  currentPage,
  rowsPerPage,
  timestamp: Date.now(),
};
localStorage.setItem("alkhateeb_grades_draft", JSON.stringify(state));
```

`restoreStateLocally()` reads this on load and restores the full UI dropdowns, table, and all unsaved scores. If the stored `timestamp` is older than 8 hours, the draft is discarded:

```js
const expirationTime = 8 * 60 * 60 * 1000;
if (!state.timestamp || now - state.timestamp > expirationTime) {
  localStorage.removeItem("alkhateeb_grades_draft");
  return;
}
```

This means a teacher who closes the browser mid-session can reopen it and continue exactly where they left off as long as they return within the same working day.

---

### 🔢 Arabic Numeral Conversion

Teachers may type Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩) from Arabic keyboards. `convertToEnglishNumbers()` maps each Arabic digit to its ASCII equivalent, then strips any remaining non-numeric characters:

```js
function convertToEnglishNumbers(str) {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(str)
    .replace(/[٠-٩]/g, (w) => arabicNumbers.indexOf(w))
    .replace(/[^0-9.]/g, "");
}
```

This conversion runs on every keystroke in `handleScoreInput()`, making the input format-agnostic.

---

### 🟩 Modified Cell Highlighting

When a score differs from `originalScore` (the value returned from the server), the input gets a green border and background via `checkModifiedState()`. When the score is reverted to the original value, the green styling is removed. The `suppressGreen` flag prevents bulk-action results (like "set all to 90") from being individually green-highlighted, since those are bulk changes not requiring per-cell visual emphasis.

---

### ⌨️ Enter Key Navigation

`handleEnter()` intercepts the Enter key on score inputs. It finds the current input's index in the `.student-score` NodeList, skips disabled inputs (absent students), and focuses the next available input. At the end of the current page, it automatically advances to the next pagination page and focuses the first available input there:

```js
if (nextIndex < inputs.length) {
  inputs[nextIndex].focus();
  inputs[nextIndex].select();
} else if (currentPage < totalPages) {
  changePage(1);
  setTimeout(() => {
    /* focus first enabled on new page */
  }, 50);
} else {
  saveData(); // Last student on last page → auto-save
}
```

---

### 💾 Smart Save Validation, Scroll, and Diff

`saveData()` runs three phases before any network request:

1. **Validation** scans `allStudents` for any empty score. If found, clears the live search filter, finds the student's page, scrolls to the problematic input, and highlights it red.
2. **Diff** filters `allStudents` to only the students whose `score !== originalScore`. Only this subset is sent to the server.
3. **Dynamic button label** the save button text uses proper Arabic pluralization: "1 student", "2 students", "3–10 students", "N students".

After a successful save, the backend response includes a summary (grade, section, subject, evaluation, count saved) which is displayed as a formatted HTML message.

---

### 📊 Dynamic Subject List per Grade

`subjectsConfig` maps each of 6 grade levels to an array of subject objects. When the teacher selects a grade, `populateSubjects()` rebuilds the subject dropdown entirely from this map. This means the frontend enforces the correct curriculum structure without a backend round-trip.

---

### 🔢 Bulk Score Broadcast

The bulk score feature allows entering one score and applying it to all present students in a single action. Students marked as absent (`غ` / `غائب`) are explicitly excluded from the bulk fill. A custom confirmation modal handles all destructive bulk operations replacing the native browser `confirm()` dialog for consistent styling.

---

### 📊 Pagination with Rows Per Page Control

The students table supports pagination with a configurable rows-per-page selector (10 / 20 / 30 / 40 / 50 / all). `renderTable()` slices `filteredStudents` by the current page and `rowsPerPage`. The Enter key navigation is pagination-aware: reaching the last input on a page automatically advances to the next page and focuses the first available input there.

---

### ⚠️ Unsaved Changes Warning

A `beforeunload` event listener checks if any student has `score !== originalScore`. If so, the browser's native "Leave page?" dialog is triggered:

```js
window.addEventListener("beforeunload", function (e) {
  const hasChanges = allStudents.some((s) => s.score !== s.originalScore);
  if (hasChanges) {
    e.preventDefault();
    e.returnValue = "";
  }
});
```

The logout button also checks for unsaved changes and shows the custom confirmation modal if any exist.

**🛠️ Tech Used**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `Google Sheets` · `LockService`

</details>

---

<details>
<summary><b>⭐ 9. Al-Khateeb Stars /alkhateeb-stars</b></summary>

<br>

A public leaderboard displaying the top-10 students per grade level. Built for visual impact with 3D card effects, shimmer animations, and grade-level tabs.

**Key Features:**

- Top-10 students displayed per grade level with distinct gold, silver, and bronze rank themes
- 3D tilt effect on each card using CSS `perspective` and JavaScript mouse-tracking
- Staggered card reveal animation on page load (cascading by rank index)
- Grade-level tab bar: switch between grades without a page reload, all data loaded in one request
- Animated gold shimmer sweep on top-3 cards with decorative laurel SVG overlays
- Persistent disclaimer informing visitors that results are preliminary and subject to review

---

### 🏆 Animated Rank Cards

Each student card uses CSS `perspective` and JavaScript mouse-tracking to produce a 3D tilt effect on hover. Cards for ranks 1, 2, and 3 carry distinct gold, silver, and bronze gradient themes with animated `goldShimmer` background sweeps. Decorative laurel SVG overlays frame the top-3 cards.

---

### ✨ Staggered Reveal Animations

Cards load with a `popIn` keyframe (scale 0.85 → 1 with a slight overshoot at 70%) and a `rowIn` slide (translateX from -12px). Each card's delay is calculated from its rank index, creating a cascading reveal when the page loads.

---

### 🏦 Grade-Level Tabs

A tab bar lets the user switch between grade levels without a page reload. The active tab updates the visible card grid while preserving scroll position. The backend returns all grades in one response; tab switching is purely client-side.

---

### 📰 Appeals Disclaimer

A persistent notice below the leaderboard informs students and parents that results shown are preliminary and subject to official appeals review.

**🛠️ Tech Used**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script`

## </details>

## 🏗️ Al-Khateeb System Architecture

```
mosamirhelal.com/alkhateeb              ← Landing Page (Entry Point)
        │
        ├──► /alkhateeb-students       ← Student Committee Data Portal ─┐
        │                                                               │  Backend A
        ├──► /alkhateeb-results         ← Student Results Portal  ────┤  (Grades & Results)
        │                                                               │
        ├──► /alkhateeb-degrees         ← Teacher Grades Portal   ────┘
        │         │
        │         ↓
        │    ┌─────────────────────────────────┐
        │    │     Google Apps Script (A)      │
        │    │  Token Auth · LockService       │
        │    │  Brute Force Guard              │
        │    │  Subject Authorization          │
        │    │  Arabic NLP · Grade Reports     │
        │    └──────────────┬──────────────────┘
        │                   │
        │    ┌──────────────▼──────────────────┐
        │    │   Google Sheets (Grades DB)     │
        │    │  Grades · Students · Settings   │
        │    │  Max-Scores · Suggestions Log   │
        │    │  Users · Movement Audit Log     │
        │    └─────────────────────────────────┘
        │
        ├──► /alkhateeb-stars           ← Top-10 Leaderboard (no backend auth)
        │
        └──► /alkhateeb-hr              ← Staff HR Portal  ─── Backend B (HR System)
                  │
                  ↓
        ┌─────────────────────────────────┐
        │     Google Apps Script (B)      │
        │  Dual-Role Auth (Admin/Teacher) │
        │  Attendance Engine              │
        │  SUMIFS Aggregation Layer       │
        │  Date Normalization             │
        └──────────────┬──────────────────┘
                       │
        ┌──────────────▼──────────────────┐
        │   Google Sheets (HR DB)         │
        │  Operations · Teachers Data     │
        │  Aggregated Reports · Users     │
        │  System Audit Log               │
        └─────────────────────────────────┘
```

---

## ⚙️ Backend Deep Dive

> Both backends are **not published in this repository** for security reasons. The following is a technical breakdown of what each system does internally.

---

<details>
<summary><b>🔧 Backend A Grades & Results System</b></summary>

<br>

This backend powers both the **Student Results Portal** and the **Teacher Grades Portal**. It handles everything from database initialization to grade submission with full conflict protection.

---

**📐 Database Schema `setupDatabase()`**

On first run, the backend automatically creates the entire database structure from scratch inside Google Sheets. It provisions grade sheets for **6 academic levels** (3rd–6th Primary, 1st–2nd Preparatory), each with a unique set of subjects. Column headers are auto-generated by combining every combination of:

- **Month** × **Exam Type** × **Subject** → e.g., `تقييم مارس - عربي` (March Assessment - Arabic), `امتحان أبريل - رياضيات` (April Exam - Mathematics)

The first 3 columns of every sheet are frozen: Student Name, Student ID, and Section. It also auto-creates:

- `المستخدمين` (Users) teacher accounts with username, password, name, status, and allowed subjects
- `سجل الحركات` (Movement Log) full audit log of every operation with timestamp
- `إعدادات النظام` (System Settings) a settings control panel with **dropdown validations** for month filter, exam type filter, results visibility (show/hide), max score display in reports, and completion status filter

---

**🌍 Arabic Text Normalization `normalizeArabic()`**

Before any name-based search, the query and all stored names pass through a normalization pipeline:

- All hamza forms `أ إ آ` → unified as `ا`
- Taa marbouta `ة` → `ه`
- Alef maqsura `ى` → `ي`
- All diacritics (tashkeel / vowel marks) → stripped entirely

This means a parent searching for `محمد` will correctly find `مُحَمَّد` no exact spelling required.

---

**🔐 Authentication & Security `doPost()` login flow**

1. The system checks for an active **account lock** stored in `ScriptProperties` before processing any credentials
2. If locked, it calculates remaining lock time in minutes and returns it in the error message
3. On valid credentials, a **UUID token** is generated and stored with an **8-hour expiry timestamp**
4. Every failed attempt increments a counter; at **5 failures**, the account is locked for **5 minutes** and the event is written to the audit log
5. After successful login, both the attempt counter and lock are cleared
6. Accounts with status other than `نشط` (Active) are rejected even with correct credentials

---

**🎓 Subject-Level Authorization**

Every protected API call verifies that the authenticated teacher's `allowedSubjects` field covers the requested subject. Unauthorized access attempts are logged to the audit log with the teacher's name and the subject they tried to access.

---

**💾 Grade Saving `saveGrades` action with LockService**

1. **Input validation** every score is checked: must be empty, `غ` (Absent), or a number between 0 and 100
2. **LockService** `LockService.getScriptLock()` with a 15-second wait is acquired before any write, preventing concurrent write conflicts
3. **Change detection** the backend reads the current column and writes back only **actually changed values**
4. **Batch write** modified values are written as a single range operation (`setValues`) rather than cell-by-cell
5. The lock is **always released** in a `finally` block

---

**📊 Student Results Lookup `doGet()` flow**

Two modes depending on the URL parameter:

**By ID (`?id=...`):**

- Checks if results are globally visible via system settings
- Reads **Max Scores sheet** to get per-subject maximums per section
- Applies month and exam-type filters from system settings
- Calculates total, maximum, and percentage absent students count against the max

**By Name (`?name=...`):**

- Query normalized through `normalizeArabic()` first
- Returns up to 10 results; more than 10 asks for more specific input (prevents enumeration)

---

**🔁 Automatic Token Cleanup `cleanExpiredTokens()`**

A time-based trigger runs every **6 hours**, scanning all `ScriptProperties` keys starting with `token_` and deleting expired ones preventing unbounded growth of the properties store.

</details>

---

<details>
<summary><b>🔧 Backend B HR & Attendance System</b></summary>

<br>

This backend powers the **Staff HR Portal** with a dual-role system, a rich attendance and leave logging engine, public employee registration, employee management, and a pre-aggregated reporting layer built on live Google Sheets formulas.

---

**👥 Dual-Role Authentication**

Two distinct roles with completely different dashboards:

- **Admin** can see all teachers, log operations, edit/delete records, and generate reports
- **Teacher** can only view their own statistics and personal history

Token validity here is **12 hours** (vs. 8 hours in Backend A), as HR operations may span a full working day.

---

**🗓️ Date Normalization `forceStringDate()`**

Handles the timezone problem in Google Sheets:

- JavaScript `Date` objects get **+12 hours** before formatting compensating for the UTC midnight shift
- String dates in `dd/mm/yyyy` format are converted to `yyyy-mm-dd` for consistent ISO sorting

---

**📝 Attendance Recording Batch API**

Accepts an **array of records** in a single call (when the admin uses the multi-day checkbox grid). The national ID is looked up server-side from the teacher code never sent from the frontend.

---

**✏️ Record Editing Bottom-Up Fingerprint Matching**

Finding the right row without an exposed row ID uses a **multi-field fingerprint**: the backend scans the operations sheet **from the bottom up** and matches a row by day + month + year + teacher name + operation type + amount. Only `type`, `amount`, and `notes` are updated date and admin fields are immutable.

---

**📈 Aggregated Reports Builder `setupAggregatedReports()`**

Rather than calculating stats at query time, this function builds a **live formula sheet** once. For each teacher, it inserts rows with **dynamic SUMIFS formulas** for all 9 operation types. Whenever a new record is added to the operations sheet, all aggregated numbers update instantly through Google Sheets' native formula engine zero backend recalculation needed.

</details>

---

## 🔒 Security Architecture

| Feature                         | Backend A (Grades)                    | Backend B (HR)                        |
| ------------------------------- | ------------------------------------- | ------------------------------------- |
| **Auth Method**                 | Token via UUID                        | Token via UUID                        |
| **Token Expiry**                | 8 hours                               | 12 hours                              |
| **Client Storage**              | `localStorage`                        | `sessionStorage`                      |
| **Brute Force Guard**           | ✅ 5 attempts → 5 min lock            |                                       |
| **Role System**                 | Subject-level per teacher             | Admin / Teacher roles                 |
| **Concurrent Write Protection** | ✅ LockService (15s wait)             |                                       |
| **Unauthorized Access Logging** | ✅ Full audit trail                   | ✅ Full audit trail                   |
| **Results Visibility Control**  | ✅ Remote on/off via settings sheet   |                                       |
| **Token Auto-Cleanup**          | ✅ Every 6 hours via trigger          | ✅ On every request                   |
| **GET Request Blocking**        | Partial (public results via GET)      | ✅ Full block returns 403             |
| **XSS Prevention**              | ✅ `escapeHTML()` on all user content | ✅ `escapeHTML()` on all user content |
| **Source Code Published**       | ❌ Private (security)                 | ❌ Private (security)                 |

---

## 🤖 Tech Stack & Tools

<div align="center">

**AI Tools**

<img src="https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white" />
<img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white" />
<img src="https://img.shields.io/badge/Claude-D9795C?style=for-the-badge&logo=anthropic&logoColor=white" />

**Frontend**

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />

**APIs & Browser**

<img src="https://img.shields.io/badge/Web_Audio_API-FF6B6B?style=for-the-badge&logo=googlechrome&logoColor=white" />
<img src="https://img.shields.io/badge/Canvas_API-9B59B6?style=for-the-badge&logo=googlechrome&logoColor=white" />
<img src="https://img.shields.io/badge/html2canvas-E67E22?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/canvas--confetti-F1C40F?style=for-the-badge&logo=javascript&logoColor=black" />

**Backend & Data**

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Google_Apps_Script-4285F4?style=for-the-badge&logo=google&logoColor=white" />
<img src="https://img.shields.io/badge/Google_Sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white" />

**Hosting**

<img src="https://img.shields.io/badge/GitHub_Pages-181717?style=for-the-badge&logo=github&logoColor=white" />

</div>

---

## 📁 Repository Structure

```
mosamirhelal.github.io/
│
├── 📄 index.html                        ← Personal website (mosamirhelal.com)
├── 🌐 CNAME                             ← Custom domain configuration
├── 📱 site.webmanifest                  ← PWA manifest
├── 🖼️ favicon.ico / .svg                ← Favicons
├── 🖼️ favicon-96x96.png                 ← Favicon (96px)
├── 🖼️ apple-touch-icon.png              ← iOS touch icon
├── 🖼️ web-app-manifest-192x192.png      ← PWA icon (192px)
├── 🖼️ web-app-manifest-512x512.png      ← PWA icon (512px)
├── 🌙 dark.webp                         ← Dark mode hero image
├── ☀️ light.webp                        ← Light mode hero image
├── 👤 profile.webp                      ← Profile image
│
├── 📂 motasks/                          ← Study task tracker
│   └── index.html
│
├── 📂 audiomonitor/                     ← In-browser audio monitor
│   └── index.html
│
├── 📂 alkhateeb/                        ← School system landing page
│   ├── index.html
│   ├── logo_1.webp
│   ├── logo_2.webp
│   └── logo_3.webp
│
├── 📂 alkhateeb-students/               ← Student committee data portal
│   ├── index.html
│   ├── logo_1.webp
│   ├── logo_2.webp
│   └── logo_3.webp
│
├── 📂 alkhateeb-results/                ← Student results portal
│   ├── index.html
│   ├── logo_1.webp
│   ├── logo_2.webp
│   └── logo_3.webp
│
├── 📂 alkhateeb-degrees/                ← Teacher grades portal
│   ├── index.html
│   ├── logo_1.webp
│   ├── logo_2.webp
│   └── logo_3.webp
│
├── 📂 alkhateeb-hr/                     ← Staff HR & attendance portal
│   ├── index.html
│   ├── logo_1.webp
│   ├── logo_2.webp
│   └── logo_3.webp
│
└── 📂 alkhateeb-stars/                  ← Top-10 students leaderboard
    ├── index.html
    ├── logo_1.webp
    ├── logo_2.webp
    └── logo_3.webp
```

> **Note:** Backend source code for the Al-Khateeb system is intentionally not included in this repository for security reasons. Both Google Apps Script backends are deployed as private web apps.

---

## 📬 Contact

<div align="center">

### `@mosamirhelal` everywhere

<p>
<a href="https://mosamirhelal.com" target="_blank">
  <img src="https://img.shields.io/badge/🌐 Website-mosamirhelal.com-2ea44f?style=for-the-badge" />
</a>
<a href="mailto:contact@mosamirhelal.com" target="_blank">
  <img src="https://img.shields.io/badge/📧 Email-contact@mosamirhelal.com-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" />
</a>
</p>

> All social links are available via the drawer on [**mosamirhelal.com**](https://mosamirhelal.com) 20+ platforms in one place.

</div>

---

## 🏆 Credits

<div align="center">

**Design & Development** Mohammed Samir Helal

All projects in this repository frontend interfaces, backend architecture, database schema, security systems, and UI/UX were designed and built entirely by Mohammed Samir Helal.

---

**Al-Khateeb System Samir Helal, Principal of Al-Khateeb School**

The Al-Khateeb system exists because of **Samir Helal** principal of the school and the person who originally envisioned it. He defined what each portal should do, proposed every major feature, tested releases with real users, and kept pushing the system forward. This is his idea, built by his son. Thank you, Dad.

---

<sub>© 2026 Mohammed Samir Helal · Built with ❤️ in Cairo, Egypt</sub>

</div>
