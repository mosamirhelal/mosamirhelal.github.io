<div align="center">

# 👋 Hello, I'm Mohammed Samir Helal

### 🦷 Dental Student · 💻 Programmer · 🎨 Graphic Designer

<p align="center">
  <img src="https://hits.sh/github.com/mosamirhelal/mosamirhelal.github.io.svg?style=flat-square&label=👁️+Visitors&color=0e75b6&labelColor=1a1a2e" alt="Visitors" />
  <img src="https://img.shields.io/github/repo-size/mosamirhelal/mosamirhelal.github.io?label=📦+Repo+Size&color=f97316&labelColor=1a1a2e&style=flat-square" alt="Repo Size" />
  <img src="https://img.shields.io/github/last-commit/mosamirhelal/mosamirhelal.github.io?color=22c55e&label=🔄+Last+Update&labelColor=1a1a2e&style=flat-square" alt="Last Update" />
</p>

> 🚀 **Mission:** Bridging the gap between medical precision and technical innovation.

</div>

---

## 👨‍💻 About Me

Hi! I'm **Mohammed Samir Helal** — a Dental Student at **Misr University for Science and Technology (MUST)**, a passionate self-taught **Programmer**, and a Creative **Graphic Designer** based in Cairo, Egypt.

I enjoy building things that actually get used — from student portals and school management systems to audio visualizers and personal tools. Everything in this repository is live in production and used by real people.

| | |
|---|---|
| 🎓 **Education** | Dental Student · Misr University for Science and Technology (MUST) |
| 📍 **Location** | Cairo, Egypt |
| 🌐 **Website** | [mosamirhelal.com](https://mosamirhelal.com) |
| 📱 **Everywhere** | [@mosamirhelal](https://mosamirhelal.com) |
| 🚀 **This Repo** | Official host for my personal website & all sub-projects |

---

## 🗂️ Projects Overview

| # | Project | Description | Core Tech | Live Demo |
|---|---------|-------------|-----------|-----------|
| 1 | **Personal Website** | Elegant placeholder with social drawer, dark/light mode & Arabic auto-detection | HTML · CSS · JS | [mosamirhelal.com](https://mosamirhelal.com) |
| 2 | **MoTasks** | Real-time study task tracker with Firebase sync | JS · Firebase | [mosamirhelal.com/motasks](https://mosamirhelal.com/motasks) |
| 3 | **AudioMonitor** | In-browser mic & system audio visualizer — no server needed | Web Audio API · JS | [mosamirhelal.com/audiomonitor](https://mosamirhelal.com/audiomonitor) |
| 4 | **Al-Khateeb Landing** | Unified gateway to the school's three portals | HTML · CSS · JS | [mosamirhelal.com/alkhateeb](https://mosamirhelal.com/alkhateeb) |
| 5 | **Al-Khateeb Results** | Student results portal with confetti & share-as-image | JS · Apps Script | [mosamirhelal.com/alkhateeb-results](https://mosamirhelal.com/alkhateeb-results) |
| 6 | **Al-Khateeb Degrees** | Teacher grade-entry portal with auth & conflict protection | JS · Apps Script | [mosamirhelal.com/alkhateeb-degrees](https://mosamirhelal.com/alkhateeb-degrees) |
| 7 | **Al-Khateeb HR** | Staff attendance & leave management system | JS · Apps Script | [mosamirhelal.com/alkhateeb-teachers](https://mosamirhelal.com/alkhateeb-teachers) |

---

## 🔬 Projects In Depth

<details>
<summary><b>🌐 1. Personal Website — mosamirhelal.com</b></summary>

<br>

The root of this repository. A carefully crafted personal placeholder page that goes far beyond a simple "coming soon" page.

**✨ Features**
- 🎨 Two distinct designs — one for **light mode**, one for **dark mode** — each with its own personality
- 🌙 Smart theme detection: reads system preference automatically, remembers user's choice in `localStorage`
- 📱 Slide-in **social drawer** with links to 20+ platforms in one place
- 🌍 **Arabic auto-detection** — if the visitor's browser language is Arabic, the page switches to Arabic content automatically
- ⚡ Zero dependencies — pure **HTML, CSS, and vanilla JavaScript**
- 📲 PWA-ready with `site.webmanifest` and all touch icons

**🛠️ Tech Used**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `localStorage API` · `prefers-color-scheme`

</details>

---

<details>
<summary><b>✅ 2. MoTasks — /motasks</b></summary>

<br>

A personal study task manager built specifically for the workflow of a dental student juggling lectures, labs, and clinics.

**✨ Features**
- 📋 Add, delete, and **edit tasks inline** directly in the table — no popups, no friction
- ☑️ Mark tasks as done with a checkbox — completed tasks are styled distinctly
- 🔥 **Real-time sync** via Firebase Firestore — changes reflect instantly across all devices
- 💾 Data persists in the cloud — no data loss on refresh or device switch
- 🎯 Clean, distraction-free UI optimized for quick task entry

**🛠️ Tech Used**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Firebase Firestore` · `Firebase SDK`

</details>

---

<details>
<summary><b>🎧 3. AudioMonitor — /audiomonitor</b></summary>

<br>

A fully client-side audio monitoring tool that runs entirely in the browser. Nothing leaves your device — ever.

**✨ Features**
- 🎙️ Monitor **microphone input** and **system audio** simultaneously in real-time
- 📊 Interactive **frequency visualizer** with 3 display modes: `Bars` · `Wave` · `Mirror`
- 🎨 **6 color schemes** to choose from
- 📉 Real-time **dB level** calculation and display
- 🌍 **Bilingual** — switch between Arabic and English instantly
- 🌙 Full **dark/light mode** support
- 💾 All preferences (mode, color scheme, language, theme) saved to `localStorage`
- 🔒 **Zero data transmission** — all audio processing is 100% local

**🛠️ Tech Used**
`Web Audio API` · `Canvas API` · `HTML5` · `CSS3` · `Vanilla JavaScript` · `localStorage API`

</details>

---

<details>
<summary><b>🏫 4. Al-Khateeb School System — /alkhateeb*</b></summary>

<br>

A full school management ecosystem built for **Al-Khateeb Official Language School** (Martyr Mahmoud Ali Al-Khateeb Official Languages School), consisting of four interconnected web applications backed by two purpose-built Google Apps Script backends.

---

### 4a. 🏠 Landing Page — `/alkhateeb`

The unified entry point for the school's digital system.

- 🔗 Aggregates all three portals in one clean interface
- 🎬 Smooth **overlay animation** on navigation between portals
- 📱 Accessible design for parents, students, and staff alike

---

### 4b. 📊 Student Results Portal — `/alkhateeb-results`

A public-facing portal for students and parents to look up exam results.

**✨ Features**
- 🔍 **Unified smart search box** — auto-detects whether the input is a student ID (numeric) or a name (text), no separate fields needed
- 🌍 **Arabic text normalization** for name search — handles hamza variations (أ إ آ → ا), taa marbouta (ة → ه), alef maqsura (ى → ي), and full diacritics stripping
- 🎉 **Confetti + emoji celebration** animation for passing students
- 📈 Results displayed with smooth **count-up animation** on all scores
- 🖼️ **Share result as PNG image** using `html2canvas` — one tap to generate and download
- 💡 Student suggestions form — feedback saved automatically to Google Sheets
- 👁️ **Live visitor counter** displayed on the page
- ⚙️ Admin can **show/hide results globally** from the settings sheet — no code changes needed
- 🏆 **Max-score sheet** controls the total out-of for each subject per class per section

**🛠️ Tech Used**
`HTML5` · `CSS3` · `JavaScript` · `Google Apps Script` · `Google Sheets` · `html2canvas` · `canvas-confetti`

---

### 4c. ✏️ Teacher Grades Portal — `/alkhateeb-degrees`

A secure portal for teachers to enter and submit student grades.

**✨ Features**
- 🔐 **Token-based authentication** — tokens expire after 8 hours automatically
- 🛡️ **Brute-force protection** — account locked for 5 minutes after 5 consecutive failed login attempts
- 🎓 **Subject-level authorization** — each teacher can only access their own assigned subjects
- 📋 Paginated student list with **live search** across all students in a section
- 🟩 Modified cells highlighted in **green** before submission — clear visual diff
- 💾 **Auto-save draft** to `localStorage` — no work lost on accidental tab close
- ⚠️ **Unsaved-changes warning** when attempting to navigate away
- ⏎ `Enter` key moves to the next student automatically; on the last student it triggers an **auto-save**
- 📢 Broadcast a single grade to **all students** in the section at once
- 🔒 **LockService** on the backend prevents concurrent write conflicts across simultaneous sessions

**🛠️ Tech Used**
`HTML5` · `CSS3` · `JavaScript` · `Google Apps Script` · `Google Sheets` · `LockService`

---

### 4d. 👔 Staff HR Portal — `/alkhateeb-teachers`

A dual-role HR management system for school administration and staff members.

**✨ Features — Admin Panel**
- 📝 Log **tardiness, absences, leaves, and permissions** per staff member with full categorization
- ⏱️ Automatic **late-minute calculation** compared to each teacher's scheduled start time
- 📅 Record **multiple days at once** using an interactive checkbox grid
- 📊 **Daily dashboard** with a real-time attendance overview
- 🗂️ Comprehensive filterable log — filter by date range and/or teacher name
- ✏️ Edit or delete individual records, or perform **bulk deletions**

**✨ Features — Teacher Panel**
- 📈 **Attendance rate** displayed as an animated circular chart
- 🏖️ **Annual leave balance** remaining — updated in real time
- ⏳ **Total late minutes** accumulated — animated circular chart
- 🕐 Timeline of **last 10 actions** registered by admin

**🛠️ Tech Used**
`HTML5` · `CSS3` · `JavaScript` · `Google Apps Script` · `Google Sheets` · `Canvas API`

</details>

---

## 🏗️ Al-Khateeb System Architecture

```
mosamirhelal.com/alkhateeb              ← Landing Page (Entry Point)
        │
        ├──► /alkhateeb-results         ← Student Results Portal  ──┐
        │                                                             │  Backend A
        ├──► /alkhateeb-degrees         ← Teacher Grades Portal   ──┘  (Grades & Results)
        │         │
        │         ▼
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
        └──► /alkhateeb-teachers        ← Staff HR Portal  ─── Backend B (HR System)
                  │
                  ▼
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
<summary><b>🔧 Backend A — Grades & Results System</b></summary>

<br>

This backend powers both the **Student Results Portal** and the **Teacher Grades Portal**. It handles everything from database initialization to grade submission with full conflict protection.

---

**📐 Database Schema — `setupDatabase()`**

On first run, the backend automatically creates the entire database structure from scratch inside Google Sheets. It provisions grade sheets for **6 academic levels** (3rd–6th Primary, 1st–2nd Preparatory), each with a unique set of subjects. Column headers are auto-generated by combining every combination of:

- **Month** × **Exam Type** × **Subject** → e.g., `تقييم مارس - عربي` (March Assessment - Arabic), `امتحان أبريل - رياضيات` (April Exam - Mathematics)

The first 3 columns of every sheet are frozen: Student Name, Student ID, and Section. It also auto-creates:
- `المستخدمين` (Users) — teacher accounts with username, password, name, status, and allowed subjects
- `سجل الحركات` (Movement Log) — full audit log of every operation with timestamp
- `إعدادات النظام` (System Settings) — a settings control panel with **dropdown validations** for month filter, exam type filter, results visibility (show/hide), max score display in reports, and completion status filter

---

**🌍 Arabic Text Normalization — `normalizeArabic()`**

Before any name-based search, the query and all stored names pass through a normalization pipeline:
- All hamza forms `أ إ آ` → unified as `ا`
- Taa marbouta `ة` → `ه`
- Alef maqsura `ى` → `ي`
- All diacritics (tashkeel / vowel marks) → stripped entirely

This means a parent searching for `محمد` (Mohamed) will correctly find `مُحَمَّد`, `محمود`, etc. — no exact spelling required.

---

**🔐 Authentication & Security — `doPost()` login flow**

1. The system checks for an active **account lock** stored in `ScriptProperties` before processing any credentials
2. If locked, it calculates remaining lock time in minutes and returns it in the error message
3. On valid credentials, a **UUID token** is generated and stored with an **8-hour expiry timestamp**
4. Every failed attempt increments a counter; at **5 failures**, the account is locked for **5 minutes** and the event is written to the audit log
5. After successful login, both the attempt counter and lock are cleared
6. Accounts with status other than `نشط` (Active) are rejected even with correct credentials

---

**🎓 Subject-Level Authorization**

Every protected API call verifies that the authenticated teacher's `allowedSubjects` field covers the requested subject. If the teacher's token contains `allowedSubjects = "عربي,رياضيات"` (Arabic, Mathematics) and they request data for `علوم` (Science), the system rejects the request with a specific error message and logs the unauthorized access attempt to the audit log with the teacher's name and the subject they tried to access.

---

**📋 Grade Fetching — `getStudents` action**

Filters the grade sheet by section, locates the exact column matching the combination of `examType + month + subject`, and returns only the students in the requested section along with their existing scores. Every fetch is logged with full context (grade level, section, column name).

---

**💾 Grade Saving — `saveGrades` action with LockService**

This is the most critical flow in the backend:

1. **Input validation** — every score is checked: must be empty, `غ` (Absent), or a number between 0 and 100
2. **LockService** — `LockService.getScriptLock()` with a 15-second wait is acquired before any write operation, preventing two teachers from writing to the same column simultaneously
3. **Change detection** — the backend reads the current column values and compares them against the incoming data, writing back only **actually changed values**
4. **Batch write** — modified values are written as a single range operation (`setValues`) rather than cell-by-cell, making it significantly faster
5. **Audit log** — the log entry includes the exact row numbers modified (e.g., `5 إلى 9، 14` — rows 5 to 9, and 14), the teacher name, subject, grade level, and section
6. The lock is **always released** in a `finally` block, even if an error occurs mid-write

---

**📊 Student Results Lookup — `doGet()` flow**

Two modes depending on the URL parameter:

**By ID (`?id=...`):**
1. Reads system settings to check if results are currently visible — `عرض النتيجة للطلاب` (Show Results for Students): `نعم` (Yes) / `لا` (No)
2. If hidden, returns the student's name/grade/section with a `resultsHidden: true` flag — the frontend handles the display gracefully
3. Searches all 6 grade sheets for the student ID
4. Reads the **Max Scores sheet** (`النهايات العظمى` — Maximum Scores) to get the out-of score for each subject per section — allowing different sections to have different maximums
5. Applies month and exam-type filters from system settings
6. Calculates total score, total maximum, and percentage — absent students count against the max but not the score
7. Returns a structured object the frontend uses to animate the count-up and trigger confetti

**By Name (`?name=...`):**
1. The query is normalized through `normalizeArabic()` first
2. Rejects queries shorter than 2 characters
3. Searches all grade sheets for partial name matches
4. Returns up to 10 results; if more than 10 match, asks the user to be more specific — preventing enumeration

---

**📈 Missing Report Generator — `generateMissingReport()`**

An admin-only Google Sheets function that generates a full report of which subjects still have missing grades. It reads filter settings from `إعدادات النظام` (System Settings), groups students by section across all grade levels, counts filled vs. missing entries per column, and outputs a formatted sheet with wrapped text, frozen headers, color coding, and optional highest-score display (rounded up to the nearest 5).

---

**🔁 Automatic Token Cleanup — `cleanExpiredTokens()`**

A time-based trigger runs this function every **6 hours** automatically. It scans all keys in `ScriptProperties` starting with `token_`, parses the stored JSON, and deletes any whose `expiry` timestamp has passed, preventing unbounded growth of the properties store.

</details>

---

<details>
<summary><b>🔧 Backend B — HR & Attendance System</b></summary>

<br>

This backend is an entirely separate Apps Script project powering the **Staff HR Portal**. It handles a dual-role system, a rich attendance logging engine, and a pre-aggregated reporting layer built on top of live Google Sheets formulas.

---

**👥 Dual-Role Authentication**

Unlike Backend A, this system has **two distinct roles** with completely different dashboards:

- **Admin** — can see all teachers, log operations, edit/delete records, and generate reports
- **Teacher** — can only view their own statistics and personal history

The token stores `role`, `code` (teacher's unique code), and `name` alongside the expiry. Token validity here is **12 hours** (vs. 8 hours in Backend A), as HR operations may span a full working day.

---

**📐 Database Schema**

The backend manages three core sheets:

**`Teachers Data` (`بيانات المعلمين`)** — set up by `setupTeachersSheet()`: teacher code, national ID, name, specialization, scheduled start time, total annual leave balance, and total working days. Start time is stored in `HH:mm` format.

**`Operations Log` (`شيت العمليات`)** — set up by `setupOperationsSheet()`: every attendance event is stored as a row with teacher code, national ID, name, operation type, and the date split into **separate day/month/year columns** (to avoid Google Sheets timezone serial-number conversion issues), plus quantity/minutes, notes, attachment reference, recording admin, and full timestamp.

**`Aggregated Reports` (`التقارير المجمعة`)** — built by `setupAggregatedReports()`: one row per teacher, populated with **live SUMIFS formulas** aggregating directly from the operations sheet. Tracks 9 operation types and computes remaining leave balance and attendance rate. This sheet is the single source of truth for the teacher dashboard charts.

---

**🗓️ Date Normalization — `forceStringDate()`**

A dedicated utility function handles the timezone problem in Google Sheets:

1. If the value is a JavaScript `Date` object, it adds **12 hours** before formatting — compensating for the UTC midnight shift that causes dates to appear one day behind in some timezones
2. If the value is a string in `dd/mm/yyyy` format (manual entry), it converts it to `yyyy-mm-dd` for consistent ISO sorting
3. All date range comparisons use ISO string comparison, which works correctly as a lexicographic sort

---

**📝 Attendance Recording — `saveAttendanceRecord` action**

Designed to handle **multiple records in a single API call** (when the admin uses the checkbox grid to select several days at once):

1. The backend receives an array of records
2. It looks up the teacher's **national ID** from the teachers sheet using the code — so the national ID is always authoritative, never sent from the frontend
3. Each record is appended with the date split into day/month/year separately
4. The recording admin's name (from the token) is stored in the row automatically — the frontend has no control over this field
5. The entire batch is logged as a single audit entry

---

**✏️ Record Editing — `editRecord` action**

Finding the right row to edit without an exposed row ID uses a **multi-field fingerprint** approach: the backend scans the operations sheet **from the bottom up** (most recent first) and matches a row by day + month + year + teacher name + operation type + amount. The first matching row is the target. On a successful match, only the **type, amount, and notes** columns are updated — the teacher code, date, and admin fields are immutable.

---

**🗑️ Record Deletion — `deleteRecord` action**

Uses the same bottom-up fingerprint matching as editing. On a successful match, `deleteRow()` removes the row entirely — no gaps, no tombstones. All rows below shift up automatically. The deletion is logged to the system audit trail.

---

**📊 Report Generation — `getReports` action (Admin only)**

The admin can filter the full operations history by date range and optional teacher code. The backend builds two outputs simultaneously in a single pass over the operations sheet: a `totals` dictionary summing amounts for each of the 9 operation types, and a reverse-chronological `history` list of individual records. Both are returned in a single response for the admin dashboard.

---

**📈 Teacher Statistics — `getTeacherStats` action**

This powers the animated circular charts on the teacher's personal dashboard:

1. The backend reads the teacher's row from `Aggregated Reports` (`التقارير المجمعة`) — an instant lookup, not a full scan
2. The attendance rate (stored as a decimal 0–1) is multiplied by 100 and rounded to 1 decimal place
3. It then scans the operations sheet for the **last 10 records** belonging to this teacher (bottom-up) and returns them as a timeline
4. If the teacher has no data yet, the backend returns a safe default state (100% attendance, 21 days remaining, 0 late minutes) instead of an error

---

**📋 Aggregated Reports Builder — `setupAggregatedReports()`**

Rather than calculating stats at query time (slow for large datasets), this function builds a **live formula sheet** once. For each teacher in `Teachers Data` (`بيانات المعلمين`), it inserts a row with static identity fields and **dynamic SUMIFS formulas** for all 9 operation types — e.g., `=SUMIFS('Operations Log'!$H:$H, 'Operations Log'!$A:$A, $A2, 'Operations Log'!$D:$D, "تأخر صباحي")` ("Morning Tardiness"). It also generates a remaining-leave formula and an attendance-rate formula that reads total working days from the teachers sheet. The result: whenever a new record is added to the operations sheet, **all aggregated numbers update instantly** through Google Sheets' native formula engine — zero backend recalculation needed.

</details>

---

## 🔒 Security Architecture

| Feature | Backend A (Grades) | Backend B (HR) |
|---|---|---|
| **Auth Method** | Token via UUID | Token via UUID |
| **Token Expiry** | 8 hours | 12 hours |
| **Brute Force Guard** | ✅ 5 attempts → 5 min lock | — |
| **Role System** | Subject-level per teacher | Admin / Teacher roles |
| **Concurrent Write Protection** | ✅ LockService (15s wait) | — |
| **Unauthorized Access Logging** | ✅ Full audit trail | ✅ Full audit trail |
| **Results Visibility Control** | ✅ Remote on/off via settings sheet | — |
| **Token Auto-Cleanup** | ✅ Every 6 hours via trigger | ✅ On every request |
| **GET Request Blocking** | Partial (public results via GET) | ✅ Full block — returns 403 |
| **Source Code Published** | ❌ Private (security) | ❌ Private (security) |

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
└── 📂 alkhateeb-teachers/               ← Staff HR portal
    ├── index.html
    ├── logo_1.webp
    ├── logo_2.webp
    └── logo_3.webp
```

> **Note:** Backend source code for the Al-Khateeb system is intentionally not included in this repository for security reasons. Both Google Apps Script backends are deployed as private web apps.

---

## 📬 Contact

<div align="center">

### `@mosamirhelal` — everywhere

<p>
<a href="https://mosamirhelal.com" target="_blank">
  <img src="https://img.shields.io/badge/🌐 Website-mosamirhelal.com-2ea44f?style=for-the-badge" />
</a>
<a href="mailto:mosamirhelal@outlook.com" target="_blank">
  <img src="https://img.shields.io/badge/📧 Email-mosamirhelal@outlook.com-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" />
</a>
</p>

> All social links are available via the drawer on [**mosamirhelal.com**](https://mosamirhelal.com) — 20+ platforms in one place.

</div>

---

## 🏆 Credits

<div align="center">

**Design & Development** — Mohammed Samir Helal

*All projects in this repository — frontend interfaces, backend architecture, database schema, security systems, and UI/UX — were designed and built entirely by Mohammed Samir Helal.*

---

<sub>© 2025 Mohammed Samir Helal · All projects are live on GitHub Pages · Built with ❤️ in Cairo, Egypt</sub>

</div>