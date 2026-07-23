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

I'm **Mohammed Samir Helal** — dental student at MUST, self-taught programmer, and graphic designer based in Cairo. I build things that actually get used: school portals, management systems, audio tools. Everything here is live in production.

|                  |                                                                    |
| ---------------- | ------------------------------------------------------------------ |
| 🎓 **Education** | Dental Student · Misr University for Science and Technology (MUST) |
| 📍 **Location**  | Cairo, Egypt                                                       |
| 🌐 **Website**   | [mosamirhelal.com](https://mosamirhelal.com)                       |
| 🚀 **This Repo** | Personal website & all sub-projects, hosted on GitHub Pages        |

---

## 🗂️ Projects Overview

| #   | Project                 | Description                                                                  | Core Tech          | Live Demo                                                                          |
| --- | ----------------------- | ---------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| 1   | **Personal Website**    | Personal page with social drawer, dark/light mode & Arabic auto-detection    | HTML · CSS · JS    | [mosamirhelal.com](https://mosamirhelal.com)                                       |
| 2   | **MoTasks**             | Real-time study task tracker with Firebase sync                              | JS · Firebase      | [mosamirhelal.com/motasks](https://mosamirhelal.com/motasks)                       |
| 3   | **AudioMonitor**        | In-browser mic & system audio visualizer — no server needed                  | Web Audio API · JS | [mosamirhelal.com/audiomonitor](https://mosamirhelal.com/audiomonitor)             |
| 4   | **Al-Khateeb Landing**  | Unified gateway to the school's portals                                      | HTML · CSS · JS    | [mosamirhelal.com/alkhateeb](https://mosamirhelal.com/alkhateeb)                   |
| 5   | **Al-Khateeb HR**       | Full staff HR system: attendance, leaves, registration & employee management | JS · Apps Script   | [mosamirhelal.com/alkhateeb-hr](https://mosamirhelal.com/alkhateeb-hr)             |
| 6   | **Al-Khateeb Students** | Student exam committee data & seat number lookup with share-as-image         | JS · Apps Script   | [mosamirhelal.com/alkhateeb-students](https://mosamirhelal.com/alkhateeb-students) |
| 7   | **Al-Khateeb Results**  | Student results portal with confetti & share-as-image                        | JS · Apps Script   | [mosamirhelal.com/alkhateeb-results](https://mosamirhelal.com/alkhateeb-results)   |
| 8   | **Al-Khateeb Degrees**  | Teacher grade-entry portal with auth, draft save & conflict protection       | JS · Apps Script   | [mosamirhelal.com/alkhateeb-degrees](https://mosamirhelal.com/alkhateeb-degrees)   |
| 9   | **Al-Khateeb Stars**    | Animated top-10 students leaderboard with 3D rank cards & shimmer effects    | JS · Apps Script   | [mosamirhelal.com/alkhateeb-stars](https://mosamirhelal.com/alkhateeb-stars)       |

---

## 🔬 Projects

<details>
<summary><b>🌐 1. Personal Website — mosamirhelal.com</b></summary>

<br>

Built from scratch in pure HTML, CSS, and vanilla JavaScript — no dependencies. Detects Arabic-language browsers at parse time and switches the page language, direction, and meta tags before the first paint. Theme resolves from saved preference → OS setting → live OS changes. A social drawer expands to 21 platform links with CSS-only animations and CSS-only tooltips via `content: attr(aria-label)`. Full SEO: Schema.org JSON-LD, Open Graph, Twitter Cards, PWA manifest.

`HTML5` · `CSS3` · `Vanilla JavaScript` · `localStorage API` · `Schema.org JSON-LD`

[Implementation details →](docs/architecture.md#1-personal-website--mosamirhelalcom)

</details>

---

<details>
<summary><b>✅ 2. MoTasks — /motasks</b></summary>

<br>

A personal study task manager built on Firebase Firestore. The entire app state is stored as serialized `innerHTML` in one Firestore document — no schema layer. Uses `onSnapshot` for real-time sync across tabs, with a 1-second debounce on writes. An active-element guard prevents remote updates from overwriting text the user is currently editing. Checkbox state is manually synced to DOM attributes before each save.

`HTML5` · `CSS3` · `Vanilla JavaScript` · `Firebase Firestore` · `Firebase SDK v11`

[Implementation details →](docs/architecture.md#2-motasks--motasks)

</details>

---

<details>
<summary><b>🎧 3. AudioMonitor — /audiomonitor</b></summary>

<br>

Fully client-side audio monitoring — no data leaves the device. Supports simultaneous microphone and system audio with independent visualizers. Three visualization modes (Bars, Wave, Mirror), six color schemes with a cached gradient engine, RMS-based dB meter, full bilingual UI (English/Arabic with font switching), and all preferences persisted to `localStorage`. System audio uses `getDisplayMedia` with video tracks immediately discarded.

`Web Audio API` · `Canvas API` · `ResizeObserver` · `getDisplayMedia` · `localStorage API`

[Implementation details →](docs/architecture.md#3-audiomonitor--audiomonitor)

</details>

---

<details>
<summary><b>🏠 4. Al-Khateeb Landing — /alkhateeb</b></summary>

<br>

The entry point for the school's digital system. A single page routing visitors to all portals. Ripple effect on every button click (mouse, touch, and keyboard supported). Shows a full-screen overlay while navigating and cleans it up on `pageshow` to handle bfcache restores on back-navigation.

`HTML5` · `CSS3` · `Vanilla JavaScript`

[Implementation details →](docs/architecture.md#4-al-khateeb-landing--alkhateeb)

</details>

---

<details>
<summary><b>👔 5. Al-Khateeb HR — /alkhateeb-hr</b></summary>

<br>

The largest project in this repository. A full HR management system serving school administrators and teachers through a dual-role architecture.

**Administrators can:** log attendance events (absences, tardiness, early departures, leaves) for any staff member; apply operations to multiple teachers at once via a chips-based multi-select; apply one operation across multiple days via a day-by-day checkbox grid; view, edit, and delete records from the full history table; export records as `.csv` or print as A4; register new employees through an approval workflow; reset teacher passwords; and monitor a live counter of working days in the current month.

**Teachers can:** view personal attendance charts (attendance rate, remaining leave, late minutes); browse their own operation history.

Session uses `sessionStorage` — ends when the tab is closed. All privilege checks are validated server-side.

`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `Google Sheets`

[Implementation details →](docs/architecture.md#5-al-khateeb-hr--alkhateeb-hr)

</details>

---

<details>
<summary><b>📚 6. Al-Khateeb Students — /alkhateeb-students</b></summary>

<br>

Public portal for students and parents to look up exam committee assignments and seat numbers. A single input handles both ID lookup (numeric) and name search (non-numeric) with automatic mode detection. Results appear as staggered-animated cards. Students can share their data card as a PNG — via Web Share API on mobile, download link on desktop. School logos appear only in the exported image, not on the page. A backend flag can globally hide data without code changes.

`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `html2canvas`

[Implementation details →](docs/architecture.md#6-al-khateeb-students--alkhateeb-students)

</details>

---

<details>
<summary><b>📊 7. Al-Khateeb Results — /alkhateeb-results</b></summary>

<br>

Public portal for students and parents to look up exam results. Same dual-mode search as Students. Score numbers animate from 0 using `requestAnimationFrame` with cubic ease-out. Passing students (≥50%) get a confetti burst and falling emoji. Results can be shared as a PNG image. An inline feedback form lets students message school administration directly from the results page. A backend flag can globally hide scores without code changes.

`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `html2canvas` · `canvas-confetti`

[Implementation details →](docs/architecture.md#7-al-khateeb-results--alkhateeb-results)

</details>

---

<details>
<summary><b>✏️ 8. Al-Khateeb Degrees — /alkhateeb-degrees</b></summary>

<br>

Secure grade entry portal for teachers. Token-based login with session stored in `localStorage`. Full UI state (grade, section, subject, evaluation, all scores) is auto-saved as a draft after every change and restored on reload; drafts older than a working day are discarded. Multi-step selection (grade → section → subject → evaluation). Absent students are flagged and excluded from validation. Enter key moves focus across inputs and page boundaries. Save sends only changed records, not the full list. Warns before leaving if there are unsaved changes. Arabic-Indic numerals are converted transparently on each keystroke.

`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `Google Sheets` · `LockService`

[Implementation details →](docs/architecture.md#8-al-khateeb-degrees--alkhateeb-degrees)

</details>

---

<details>
<summary><b>⭐ 9. Al-Khateeb Stars — /alkhateeb-stars</b></summary>

<br>

Public top-10 leaderboard per grade level. Cards have a 3D tilt effect driven by mouse position. Rank 1–3 cards carry gold/silver/bronze gradient themes with an animated shimmer sweep and laurel SVG overlays. Cards reveal with a staggered `popIn` animation. Grade tabs switch between levels client-side — all data arrives in one backend response. A disclaimer below the leaderboard notes that results are preliminary.

`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script`

[Implementation details →](docs/architecture.md#9-al-khateeb-stars--alkhateeb-stars)

</details>

---

## 🏗️ Al-Khateeb System Architecture

```
mosamirhelal.com/alkhateeb              ← Landing Page (Entry Point)
        │
        ├──► /alkhateeb-students       ← Student Committee Data Portal ─┐
        │                                                               │  Backend A
        ├──► /alkhateeb-results        ← Student Results Portal     ────┤  (Grades & Results)
        │                                                               │
        ├──► /alkhateeb-degrees        ← Teacher Grades Portal      ────┘
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
        ├──► /alkhateeb-stars          ← Top-10 Leaderboard (no backend auth)
        │
        └──► /alkhateeb-hr             ← Staff HR Portal ── Backend B (HR System)
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

Backend source code is not published in this repository. [Full backend documentation →](docs/backend-architecture.md)

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

> All social links are available via the drawer on [**mosamirhelal.com**](https://mosamirhelal.com) — 20+ platforms in one place.

</div>

---

## 🏆 Credits

<div align="center">

**Design & Development** — **Mohammed Samir Helal**

All projects in this repository — frontend interfaces, backend architecture, database schema, security systems, and UI/UX — were designed and built entirely by **Mohammed Samir Helal**.

---

**Al-Khateeb System — Samir Helal, Principal of Al-Khateeb School**

The school management system exists because of **Samir Helal** — principal of the school and the person who originally envisioned it. He defined what each portal should do, proposed every major feature, tested releases with real users, and kept pushing the system forward. This is his idea, built by his son. Thank you, Dad.

</div>

> _This school management system is solely owned and developed by me as an independent developer (**Mohammed Samir Helal**). The name "Al-Khateeb" is used currently because the system is deployed at the school managed by my father, but its branding and name are subject to change._

<div align="center">

---

<sub>© 2026 Mohammed Samir Helal · Built with ❤️ in Cairo, Egypt</sub>

</div>
