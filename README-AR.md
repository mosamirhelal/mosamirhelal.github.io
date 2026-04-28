<div align="center">

# 👋 أهلاً، أنا محمد سمير هلال

### 🦷 طالب أسنان · 💻 مبرمج · 🎨 مصمم جرافيك

<p align="center">
  <img src="https://hits.sh/github.com/mosamirhelal/mosamirhelal.github.io.svg?style=flat-square&label=👁️+Visitors&color=0e75b6&labelColor=1a1a2e" alt="Visitors" />
  <img src="https://img.shields.io/github/repo-size/mosamirhelal/mosamirhelal.github.io?label=📦+Repo+Size&color=f97316&labelColor=1a1a2e&style=flat-square" alt="Repo Size" />
  <img src="https://img.shields.io/github/last-commit/mosamirhelal/mosamirhelal.github.io?color=22c55e&label=🔄+Last+Update&labelColor=1a1a2e&style=flat-square" />
</p>

> 🚀 **الهدف:** ربط الدقة الطبية بالابتكار التقني.

</div>

---

## 👨‍💻 عن نفسي

أهلاً! أنا **محمد سمير هلال** — طالب أسنان في **جامعة مصر للعلوم والتكنولوجيا (MUST)**، ومبرمج self-taught، ومصمم جرافيك من القاهرة.

بحب أبني حاجات بتتستخدم فعلاً — من بوابات الطلاب وأنظمة إدارة المدارس لحد audio visualizers وأدوات شخصية. كل حاجة في الـ repository دي شغالة على production وبيستخدمها ناس حقيقيين.

| | |
|---|---|
| 🎓 **التعليم** | طالب أسنان · جامعة مصر للعلوم والتكنولوجيا (MUST) |
| 📍 **الموقع** | القاهرة، مصر |
| 🌐 **الموقع الإلكتروني** | [mosamirhelal.com](https://mosamirhelal.com) |
| 📱 **في كل حتة** | [@mosamirhelal](https://mosamirhelal.com) |
| 🚀 **الـ Repo ده** | الـ host الرسمي لموقعي الشخصي وكل المشاريع الفرعية |

---

## 🗂️ نظرة عامة على المشاريع

| # | المشروع | الوصف | التقنية الأساسية | تجربة مباشرة |
|---|---------|-------------|-----------|-----------|
| 1 | **الموقع الشخصي** | صفحة شخصية أنيقة بـ social drawer ودارك مود وكشف تلقائي للعربية | HTML · CSS · JS | [mosamirhelal.com](https://mosamirhelal.com) |
| 2 | **MoTasks** | متابع مهام دراسية real-time بـ Firebase sync | JS · Firebase | [mosamirhelal.com/motasks](https://mosamirhelal.com/motasks) |
| 3 | **AudioMonitor** | visualizer للميكروفون وصوت الجهاز جوه البراوزر مباشرةً — من غير سيرفر | Web Audio API · JS | [mosamirhelal.com/audiomonitor](https://mosamirhelal.com/audiomonitor) |
| 4 | **الخطيب — الرئيسية** | البوابة الموحدة للدخول لأنظمة المدرسة الثلاثة | HTML · CSS · JS | [mosamirhelal.com/alkhateeb](https://mosamirhelal.com/alkhateeb) |
| 5 | **الخطيب — النتائج** | بوابة نتايج الطلاب مع confetti وإمكانية مشاركة النتيجة كصورة | JS · Apps Script | [mosamirhelal.com/alkhateeb-results](https://mosamirhelal.com/alkhateeb-results) |
| 6 | **الخطيب — الدرجات** | بوابة إدخال درجات المدرسين مع authentication وحماية من التعارض | JS · Apps Script | [mosamirhelal.com/alkhateeb-degrees](https://mosamirhelal.com/alkhateeb-degrees) |
| 7 | **الخطيب — شؤون العاملين** | نظام حضور وإجازات الموظفين | JS · Apps Script | [mosamirhelal.com/alkhateeb-teachers](https://mosamirhelal.com/alkhateeb-teachers) |

---

## 🔬 تفاصيل المشاريع

<details>
<summary><b>🌐 ١. الموقع الشخصي — mosamirhelal.com</b></summary>

<br>

صفحة شخصية متقنة التفاصيل بتتعدى فكرة "coming soon" العادية بكتير. كل تفصيلة بصرية وكل interaction متصممة بشكل مقصود ومكتوبة بـ HTML وCSS وJavaScript خالص — من غير أي dependencies.

---

### 🌍 الكشف التلقائي للعربية — قبل ما الصفحة تتحمل

أول script في الـ `<head>` — قبل ما أي محتوى يتعرض — بيقرأ `navigator.language` ويتحقق إذا كانت اللغة عربية. لو آه، بيعيد كتابة الصفحة قبل ما البراوزر يرسم أي pixel:

```js
const userLang = navigator.language || navigator.userLanguage;
const isArabic = userLang.startsWith("ar");
if (isArabic) {
  document.title = arabicTitle;
  document.documentElement.lang = "ar";
  document.documentElement.dir = "rtl";
  // بيعدّل كمان: og:title, og:description, twitter:title, twitter:description, meta description
}
```

يعني زوار العربية مش بيشوفوا إنجليزي ولو لثانية. التبديل بيحصل synchronously وقت الـ parse، مش بعد `DOMContentLoaded`. الـ `lang` والـ `dir` على الـ `<html>` بيتأثروا، وده بيأثر على الـ font rendering واتجاه النص في كل الصفحة.

---

### 🌙 نظام الثيم — ثلاث طبقات أولوية

الـ theme engine بيحدد الثيم اللي هيتعرض عن طريق نظام أولويات من ثلاث طبقات:

1. **اختيار المستخدم الصريح** — محفوظ في `localStorage` تحت مفتاح `"theme"`. لو موجود، دايماً بياخد الأولوية.
2. **إعداد الجهاز** — `window.matchMedia("(prefers-color-scheme: dark)").matches` بيتقرأ عند التحميل لو ماعندكش حاجة محفوظة.
3. **التغييرات اللحظية** — listener على الـ `prefers-color-scheme` بيحدّث الثيم على طول *بس لو* المستخدم ماختارش ثيم بنفسه.

```js
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme : prefersDark ? "dark" : "light");

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    applyTheme(e.matches ? "dark" : "light");
  }
});
```

الدالة `applyTheme()` بتبدّل class الـ `dark-mode` على الـ `<body>`، وتغير الـ emoji (🌙 / ☀️)، وتحدّث الـ `aria-label`، وتكتب الـ `theme-color` meta tag ديناميكياً — اللي بيتحكم في لون الـ browser chrome على الموبايل.

---

### 🖼️ صورتان للـ Hero — تبديل بـ CSS بحت

في عنصرين `<img>` منفصلين في الـ DOM — `light.webp` و`dark.webp`. الاتنين بيتعملهم preload في الـ `<head>` بـ `<link rel="preload">` مع `media` attributes مطابقة لثيم الجهاز، يعني الصورة الصح بتكون في الذاكرة قبل ما الـ JS يشتغل:

```html
<link rel="preload" as="image" href="light.webp" media="(prefers-color-scheme: light)" />
<link rel="preload" as="image" href="dark.webp" media="(prefers-color-scheme: dark)" />
```

الظهور والإخفاء بيتحكم فيه CSS خالص — من غير تبديل الـ `src` في الـ JS:

```css
body:not(.dark-mode) #light-image { display: block; }
body.dark-mode       #dark-image  { display: block; }
```

الصورتين عندهم `fetchpriority="high"` وأبعاد `width`/`height` صريحة عشان منحصلش layout shift. الـ transitions بتتعمل عن طريق `opacity` على عناصر الـ `img` و`background-color` على الـ `body`.

---

### 🎪 الـ Social Drawer — animation بـ CSS خالص

الـ drawer بيستخدم حيلة الـ `max-height` عشان يعمل slide-in سلس من غير ما الـ JavaScript يقيس ارتفاع العناصر. الـ container بيعمل transition من `max-height: 0` لـ `max-height: 600px`، مع `overflow: hidden` وقت الإغلاق و`overflow: visible` وقت الفتح (عشان الـ tooltips تطلع من الـ container):

```css
.social-icons-container {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55), ...;
}
.contact-wrapper.active .social-icons-container {
  max-height: 600px;
  opacity: 1;
  overflow: visible;
  /* overflow بتبقى visible بعد ما الـ transition يخلص، مش أثناءه */
  transition: ..., overflow 0s linear 0.5s;
}
```

الـ `cubic-bezier(0.68, -0.55, 0.27, 1.55)` بيعمل overshoot خفيف ("bounce") عند الفتح وإغلاق سريع — easing مختارة بعناية عشان الـ drawer يحس إنه فيزيائي. دور الـ JavaScript الوحيد هو toggle الـ class `.active` وتحديث الـ `aria-expanded`.

---

### 🎨 أيقونات ٢١ منصة — نظام ألوان الـ Brand

كل ألوان الـ ٢١ منصة معرّفة كـ CSS custom properties في `:root`، عشان طبقة الـ JavaScript تفضل منفصلة تماماً عن الألوان. كل `.social-btn` بيجب الـ hover style بتاعه من CSS rule مخصوصة:

```css
:root {
  --whatsapp: #25d366;
  --instagram: /* gradient */;
  --tiktok: #000;
  /* ... ١٨ تانيين */
}
.social-btn.tiktok:hover {
  box-shadow: 2px 2px 0 #25f4ee, -2px -2px 0 #fe2c55; /* تأثير الـ dual-color logo بتاع TikTok */
}
.social-btn.instagram:hover {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}
```

الـ GitHub عنده rule خاصة للـ dark mode — خلفية بيضاء مع أيقونة سوداء — لأن الـ GitHub الأسود بيختفي على الخلفيات الداكنة.

---

### 💬 الـ Tooltips — CSS خالص عن طريق `aria-label`

كل زرار social والـ theme toggle بيعرضوا tooltip عند hover باستخدام `::before` pseudo-elements بتقرأ من الـ `aria-label` attribute بـ `content: attr(aria-label)`. من غير JavaScript، من غير HTML إضافي:

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

ده بيخلي الـ HTML نضيف ويضمن إن الـ tooltips دايماً متزامنة مع الـ accessible label.

---

### 🔢 عداد الزيارات — Hidden Stats Mode

عداد الزيارات بيشتغل بهدوء مع كل تحميل للصفحة عن طريق `counterapi.dev`. العدد مش بيتعرض غير لو الـ URL فيه `?stats` — Easter egg مقصود للوصول الإداري من غير ما يظهر العداد للزوار العاديين:

```js
fetch("https://api.counterapi.dev/v1/mosamirhelal/visits/up")
  .then(res => res.json())
  .then(data => {
    if (window.location.search === "?stats") {
      alert(`عدد زيارات الموقع : ${data.count.toLocaleString()}`);
    }
  })
  .catch(() => {});
```

---

### ⚡ الـ Performance والـ SEO

- `<link rel="preconnect">` لـ FontAwesome وGoogle Tag Manager — بيقلل زمن الـ DNS وTLS handshake
- FontAwesome بيتحمل بـ `defer` — مش بيبطّئ الـ render
- `<h1 class="sr-only">` فيه إصداري العنوان العربي والإنجليزي لـ screen readers ومحركات البحث من غير ما يظهر
- Full `Schema.org` JSON-LD `Person` structured data مع `sameAs` لـ ٧ منصات
- Open Graph وTwitter Card meta tags كاملة
- `<link rel="canonical">` لتجنب التكرار
- PWA-ready: `site.webmanifest`، `apple-touch-icon`، صيغ favicon متعددة

**🛠️ التقنيات المستخدمة**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `localStorage API` · `prefers-color-scheme` · `Schema.org JSON-LD`

</details>

---

<details>
<summary><b>✅ ٢. MoTasks — /motasks</b></summary>

<br>

متابع مهام دراسية real-time مبني على Firebase Firestore. الـ state بتاع التطبيق كله موجود في document Firestore واحد، متسلسل كـ `innerHTML` خام — تصميم عملي بيلغي طبقة الـ schema خالص لأداة شخصية.

---

### 🔥 الـ Real-Time Sync — معمارية الـ `onSnapshot`

التطبيق بيستخدم الـ `onSnapshot` listener بدل `getDoc` العادي. يعني أي تغيير على أي جهاز بيتدفع لكل الـ tabs المفتوحة على طول، من غير polling:

```js
onSnapshot(scheduleDocRef, (docSnap) => {
  if (docSnap.exists() && docSnap.data().htmlContent) {
    // Guard: بنحدّث بس لو المستخدم مش بيكتب في خلية
    if (document.activeElement.tagName !== "TD") {
      tableBody.innerHTML = docSnap.data().htmlContent;
      reattachEvents();
    }
  }
});
```

الـ active element guard (`document.activeElement.tagName !== "TD"`) بيمنع update جاي من جهاز تاني يمسح نص المستخدم اللي بيكتب دلوقتي — حل بسيط وفعّال لمنع التعارض في أداة لمستخدم واحد.

---

### 💾 الـ Debounced Saving — تأخير الكتابة ثانية واحدة

كل event من `oninput` على خلية `contenteditable` بيعيد ضبط timer تأخير مدته ثانية. الـ save مش بيحصل غير لما المستخدم يوقف الكتابة:

```js
cell.oninput = () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveToFirebase, 1000);
};
```

ده بيمنع Firestore write مع كل ضغطة كيبورد، وبيوفر في التكلفة ويتجنب حدود الـ write rate.

---

### ☑️ حفظ حالة الـ Checkboxes

الـ HTML checkboxes العادية فيها مشكلة: الـ property `.checked` في JavaScript بتعكس الحالة الـ runtime، لكن الـ `innerHTML` serialization مش بتحفظ غير الـ `checked` HTML attribute. عشان الـ checkboxes تتحفظ صح، `saveToFirebase()` بتعمل sync يدوي للـ attribute قبل الـ serialization:

```js
checkboxes.forEach(cb => {
  if (cb.checked) cb.setAttribute("checked", "true");
  else            cb.removeAttribute("checked");
});
await setDoc(scheduleDocRef, { htmlContent: tableBody.innerHTML });
```

من غير الخطوة دي، كل الـ checkboxes كانت هتبان غير معلّمة بعد كل reload.

---

### 🔁 إعادة ربط الـ Events بعد إعادة بناء الـ DOM

لأن آلية الـ sync بتستبدل `tableBody.innerHTML` بالكامل، كل الـ event listeners بتتمسح مع كل update. `reattachEvents()` بتعيد ربط ثلاثة أنواع events بعد كل إعادة بناء للـ DOM:

```js
function reattachEvents() {
  // ١. حفظ debounced عند الكتابة في خلية contenteditable
  tableBody.querySelectorAll("[contenteditable]").forEach(cell => {
    cell.oninput = () => { clearTimeout(saveTimeout); saveTimeout = setTimeout(saveToFirebase, 1000); };
  });
  // ٢. حفظ فوري عند تغيير الـ checkbox
  tableBody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.onchange = saveToFirebase;
  });
  // ٣. زرار الحذف مع dialog تأكيد
  tableBody.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = function() {
      if (confirm("Delete this task?")) {
        this.closest("tr").remove();
        saveToFirebase();
      }
    };
  });
}
```

---

### ➕ صف جديد — تاريخ تلقائي

`addNewRow()` بتضيف صف جاهز بتاريخ النهارده بصيغة `dd/mm/yyyy` باستخدام `toLocaleDateString("en-GB")`، وبعد ما يتضاف بتعيد ربط الـ events وبتعمل save فوراً.

---

### 📡 الـ Status Badge — ثلاث حالات

الـ status badge في الـ header بيدور في أربع حالات مع reset تلقائي:

| الحالة | المُحفِّز | Reset تلقائي |
|---|---|---|
| `Connecting...` | أول تحميل للصفحة | لا |
| `⏳ Saving...` | قبل الكتابة في Firestore | لا |
| `✅ Saved / Synced` | نجاح الكتابة أو الـ snapshot | بعد ٣ ثواني |
| `❌ Connection Error` | خطأ في Firestore | لا |

**🛠️ التقنيات المستخدمة**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Firebase Firestore` · `Firebase SDK v11`

</details>

---

<details>
<summary><b>🎧 ٣. AudioMonitor — /audiomonitor</b></summary>

<br>

أداة مراقبة صوت client-side بالكامل، من غير أي رفع للسيرفر. كل الـ signal processing بيحصل جوه الـ Web Audio API في البراوزر — مش بيطلع أي صوت من الجهاز. التطبيق بيدعم مراقبة الميكروفون وصوت الجهاز في نفس الوقت مع visualizers وإعدادات وألوان مستقلة لكل واحد.

---

### 🌍 محرك ثنائي اللغة الكامل — Object الـ `T`

كل نصوص الـ UI موجودة في object واحد اسمه `T` بمفتاحين `en` و`ar`، حتى الـ error alerts. `applyLang()` بتمشي على كل الـ text nodes بالـ ID، وتحدّث `document.documentElement.lang` و`dir`، وتبدّل الـ CSS font family بين `Inter` (للإنجليزية) و`Tajawal` (للعربية):

```js
// الـ CSS هو اللي بيتحكم في تبديل الـ font:
html[lang="ar"] body { font-family: "Tajawal", system-ui, sans-serif; }
html[lang="en"] body { font-family: "Inter",   system-ui, sans-serif; }
```

كل نص في الأزرار حتى الحالات الديناميكية ("ابدأ المراقبة" / "وقّف") بيمشي عن طريق `T[lang]` — مفيش أي نص إنجليزي hardcoded في طبقة الـ JavaScript.

---

### 💾 تذكّر التفضيلات — State Object في `localStorage`

كل تفضيلات المستخدم بتتحفظ كـ JSON object واحد في `localStorage` مع كل تغيير. `loadState()` بتستعيدهم قبل أول render:

```js
// شكل الـ state:
{ lang, isDark, layoutMode, cardVis: { mic, sys }, micCfg: { mode, sensitivity, smoothing, scheme }, sysCfg: { ... } }
```

يعني كل color scheme ووضع الـ waveform ومستوى الـ sensitivity وتفضيلات الـ layout والكروت المخفية بتتذكر بين sessions البراوزر.

---

### 🎨 نظام ٦ ألوان — Gradient Engine بـ Cache

الـ ٦ color schemes معرّفة كأزواج hue (`h1`، `h2`)، مش كألوان ثابتة. الـ gradient الفعلي بيتحسب وقت الرسم باستخدام `createLinearGradient` API في الـ canvas. Object اسمه `gradCache` بيحفظ كل gradient بمفتاح من الـ hue وارتفاع/عرض الـ canvas، يعني كل gradient فريد بيتحسب مرة واحدة بس:

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

الـ cache بيتمسح (`clearGradCache()`) لما الثيم يتغير أو الـ canvas يتغيّر حجمه. الـ hue بتاع كل bar بيتحسب بشكل خطي عبر نطاق التردد: `hue = h1 + (h2 - h1) * (i / NUM)` — بيعمل gradient سلس على ٥٦ bar.

---

### 📐 تغيير حجم الـ Canvas تلقائياً — `ResizeObserver`

بدل حجم canvas ثابت، `ResizeObserver` بيراقب عنصر الـ container ويحدّث `canvas.width` و`canvas.height` عشان يطابق أبعاده الـ pixel الفعلية لما الـ viewport يتغير:

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const canvas = entry.target.querySelector("canvas");
    canvas.width  = entry.contentRect.width;
    canvas.height = entry.contentRect.height;
    clearGradCache(); // الـ gradients المحفوظة بقت حجمها غلط
  }
});
resizeObserver.observe(document.getElementById("mic-viz-wrap"));
resizeObserver.observe(document.getElementById("sys-viz-wrap"));
```

ده بيخلي الـ visualizer يملي الـ container بالظبط على الموبايل والتابلت والديسكتوب من غير أي حسابات media query.

---

### 📊 ثلاثة أوضاع للـ Visualization

**وضع الـ Bars** — الافتراضي. ٥٦ frequency bin بتتقسم من الـ FFT array. ارتفاع كل bar هو `freqData[i * step] / 255 * sensitivity`. نظام peak-hold بيحفظ أعلى قيمة حديثة لكل bin. الـ peaks بتتلاشى بسرعتين مختلفتين: لاشي سريع للـ bars منخفضة الطاقة، ولاشي بطيء للـ bars عالية الطاقة:

```js
const decayRate = peaks[id][i] > 0.7 ? 0.008 : 0.018;
peaks[id][i] = Math.max(peaks[id][i] - decayRate, v);
```

إضاءة خفيفة (`shadowBlur`) بتتضاف بنسبة من ارتفاع الـ bar للـ bars اللي amplitude بتاعتها أكتر من ٦٪.

**وضع الـ Wave** — بيستخدم بيانات الـ time-domain (`getByteTimeDomainData`) بدل بيانات التردد. بيرسم path متواصل على كامل عرض الـ canvas. الـ amplitude بتتحجم بقيمة الـ sensitivity. gradient أفقي (من اليسار لليمين عبر نطاق الـ hue) بيتطبق على الـ stroke، مع `shadowBlur` glow بلون الـ hue اليساري.

**وضع الـ Mirror** — نفس منطق الـ Bars، لكن الـ bars بتكبر للأعلى وللأسفل من المنتصف الرأسي. نقاط الـ peak بتظهر فوق الـ bars العلوية وتحت السفلية بشكل متناظر.

---

### 🎤 التقاط الميكروفون — `getUserMedia`

```js
micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
const actx  = await getAudioCtx();
micAnalyser = actx.createAnalyser();
micAnalyser.fftSize = 2048; // → ١٠٢٤ frequency bin
micAnalyser.smoothingTimeConstant = micCfg.smoothing;
micSrc = actx.createMediaStreamSource(micStream);
micSrc.connect(micAnalyser);
```

الـ `AudioContext` singleton (`globalAudioCtx`) مشترك بين الميكروفون وصوت الجهاز. لو موجود بس `"suspended"` (سياسة البراوزر)، `resume()` بتتستدعى قبل الاستخدام. لو `"closed"`، بيتعمل واحد جديد والـ analysers بيتعملوا reset.

---

### 🔊 التقاط صوت الجهاز — `getDisplayMedia`

```js
sysStream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
sysStream.getVideoTracks().forEach(t => t.stop()); // بنوقف الفيديو فوراً — محتاجين الصوت بس
if (sysStream.getAudioTracks().length === 0) {
  // المستخدم ماشغلش "Share tab audio" — alert ووقف
}
```

الـ video tracks بتتطلب (لازمة لـ APIs البراوزر عشان تشغّل نافذة الاختيار) لكن بتتوقف فوراً. التطبيق كمان بيسمع على الـ `ended` event للـ audio track — اللي بيحصل لما المستخدم يضغط "Stop sharing" في واجهة البراوزر — عشان يعمل cleanup تلقائي:

```js
sysStream.getAudioTracks()[0].addEventListener("ended", stopSys);
```

---

### 📉 حساب مستوى الـ dB

مقياس الـ dB بيستخدم RMS (Root Mean Square) من بفر الـ time-domain، محوّل لـ dB:

```js
function calcDb(timeArr) {
  let s = 0;
  for (let i = 0; i < timeArr.length; i++) {
    const v = timeArr[i] / 128 - 1; // نطبّع من [0,255] لـ [-1,1]
    s += v * v;
  }
  const rms = Math.sqrt(s / timeArr.length);
  return rms < 0.0001 ? null : Math.round(20 * Math.log10(rms));
}
```

القيمة `null` (صمت) بتظهر كـ `∞` في الـ UI بدل رقم سالب كبير ومش مفيد.

---

### ⌨️ اختصارات الكيبورد

`M` ← toggle الميكروفون. `S` ← toggle صوت الجهاز. الـ handler بيتجاهل الضغطة لو الفوكس على `INPUT` أو `TEXTAREA`، وبيتجاهل المفاتيح المعدّلة (`Ctrl`، `Meta`، `Alt`).

**🛠️ التقنيات المستخدمة**
`Web Audio API` · `Canvas API` · `ResizeObserver` · `getDisplayMedia` · `localStorage API` · `Inter` · `Tajawal`

</details>

---

<details>
<summary><b>🏠 ٤. الخطيب — الرئيسية / alkhateeb</b></summary>

<br>

نقطة الدخول الموحدة لنظام المدرسة الرقمي. كل تفصيلة — من النقاط العائمة المحيطية لتأثير الـ ripple على الأزرار — متنفّذة من الصفر.

---

### 🟣 النقاط العائمة المحيطية

خمس عناصر `<div class="dot">` متوضّعة بشكل absolute في أنحاء الصفحة بـ inline styles. كل واحدة ليها حجم وموضع و`animation-duration` / `animation-delay` مختلف. بتتحرك بـ `floatDot` — loop بسيطة translateY — وعندهم `pointer-events: none` عشان ما يأثروش على الكليكات:

```css
@keyframes floatDot {
  0%, 100% { transform: translateY(0) scale(1);    }
  50%       { transform: translateY(-15px) scale(1.02); }
}
```

---

### 💧 تأثير الـ Ripple — دقة إحداثيات الكليك

دالة الـ ripple بتحسب موضع الكليك الدقيق بالنسبة للـ bounding box بتاع الزرار، وتعمل `<span>` بحجم يغطي الزرار بالكامل وتضيفه. بتعالج ثلاثة أنواع مدخلات — كليك ماوس، لمس، وكيبورد (بترجع للمنتصف كـ fallback):

```js
function addRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  let x = e.clientX ? e.clientX - rect.left
        : e.touches?.length ? e.touches[0].clientX - rect.left
        : rect.width / 2;
  // بيتعمل span عند (x - size/2, y - size/2)، بحجم يغطي الزرار
  // بيتحرك بـ @keyframes ripple: scale(0) → scale(3.5), opacity 1 → 0
}
```

الـ ripple span بيتشال من الـ DOM بعد ٤٥٠ms.

---

### 🔄 الـ Navigation Overlay — آمن مع زرار الرجوع

لما أي زرار portal يتضغط، `navigateWithRipple()` بتشغّل الـ ripple، وتستنى ١٥٠ms، وتعرض overlay على كامل الشاشة مع spinner ونقاط نابضة قبل الانتقال. في الصفحة الـ destination، `pageshow` event listener بيشيل أي overlay متبقي — وده ضروري لأن البراوزرات ممكن تستعيد الـ overlay من الـ bfcache لما المستخدم يضغط رجوع:

```js
window.addEventListener("pageshow", function(event) {
  document.querySelectorAll(".redirect-overlay").forEach(o => o.remove());
});
```

**🛠️ التقنيات المستخدمة**
`HTML5` · `CSS3` · `Vanilla JavaScript`

</details>

---

<details>
<summary><b>📊 ٥. الخطيب — النتائج / alkhateeb-results</b></summary>

<br>

بوابة عامة للطلاب وأولياء الأمور للاستعلام عن نتائج الامتحانات بالرقم القومي أو الاسم.

---

### 🔍 البحث الموحد الذكي — كشف تلقائي للوضع

حقل إدخال واحد بيخدم وضعين للبحث. `getGrade()` بتتحقق لو المدخل أرقام بحتة:

```js
const isNumeric = /^\d+$/.test(id.trim());
if (!isNumeric) {
  searchByName(id.trim()); // بحث بالاسم
  return;
}
// وإلا: بحث بالـ ID → fetch ?id=...
```

مفيش أزرار أو حقول منفصلة. وضع البحث مش ظاهر للمستخدم خالص.

---

### 🃏 نتائج البحث بالاسم — Card Animation متتابعة

لما البحث بالاسم يرجع طلاب متعددين، كل نتيجة بتتعرض كـ card مع تأخير CSS animation محسوب من الـ index:

```js
data.results.forEach((student, index) => {
  const delay = 0.08 * (index + 1);
  html += `<div class="name-card" style="animation-delay: ${delay}s">...`;
});
```

كل card بيعرض اسم الطالب والصف والشعبة والرقم، مع زرار "عرض النتيجة" بيستدعي `selectStudentAndSearch(id)` — بيرجع الـ ID للـ search flow الرئيسي.

---

### 🔢 Animation العد — Cubic Easing

كل أرقام الدرجات بتتحرك من ٠ للقيمة الأخيرة باستخدام loop من `requestAnimationFrame` مع cubic ease-out (`1 - (1-p)^3`):

```js
function countUp(el, target, duration, suffix, decimals = 0) {
  const start = performance.now();
  function tick(now) {
    const p    = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.innerText = (decimals > 0 ? (eased * target).toFixed(decimals) : Math.round(eased * target)) + (suffix || "");
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
```

المجموع والنسبة المئوية كل واحد عنده count-up مستقل بمدد مختلفة (١٠٠٠ms و١٢٠٠ms) لتأثير ظهور متدرج.

---

### 🎉 الـ Confetti والـ Emojis المتساقطة

الطلاب الناجحين (٥٠٪ وأكتر) بيشغّلوا `confetti()` من مكتبة `canvas-confetti` بـ ١٥٠ particle. الناجحين والراسبين كمان بيشغّلوا `showEmojis()` — اللي بتنزّل ١٥ emoji من مواقع أفقية عشوائية بتأخيرات متتابعة:

```js
function showEmojis(isSuccess) {
  const happyEmojis = ["🥳", "😄", "👏", "🏆", "🎉", "😘"];
  const sadEmojis   = ["😥", "😭", "☹️", "😣", "😓"];
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const emoji = document.createElement("div");
      emoji.style.left             = Math.random() * 100 + "vw";
      emoji.style.animationDuration = Math.random() * 3 + 4 + "s";
      // بتتحرك بـ @keyframes floatDown: translateY(0) → translateY(105vh)
    }, i * 150);
  }
}
```

---

### 📸 مشاركة كصورة — `html2canvas` مع Clone Callback

`shareResult()` بتستخدم `html2canvas` عشان تحوّل الـ result card لصورة بمقياس ٢×. الـ `onclone` callback — اللي بيشتغل على نسخة من الـ DOM قبل التصوير — بيعمل حاجات مهمة:

```js
onclone: function(clonedDoc) {
  // ١. بيحقن style بيوقف كل الـ animations ويجبر opacity:1 على كل حاجة
  //    (بيمنع العناصر المتحركة من الظهور في منتصف حركتها في الـ screenshot)
  noAnimStyle.innerHTML = "* { animation: none !important; opacity: 1 !important; ... }";

  // ٢. بيحط عرض ثابت ٨٠٠px على منطقة التصوير (بيمنع screenshots بعرض الموبايل)
  clonedArea.style.width = "800px";

  // ٣. بيعرض export-header وexport-footer المخفيين
  //    (شعارات المدرسة وكريدت المصمم اللي بتظهر بس في الصورة المصدّرة)
  clonedDoc.getElementById("export-header").style.display = "block";
  clonedDoc.getElementById("export-footer").style.display = "block";
}
```

على الموبايل اللي فيه Web Share API، الصورة بتتشارك كـ `File` object عن طريق `navigator.share({ files: [file] })`. على الديسكتوب (أو البراوزرات اللي ما بتدعمهاش)، بيوقع على download link. `shareCount` integer في `localStorage` بيضمن إن كل ملف مُصدَّر عنده اسم مميز.

---

### 💬 نظام الـ Feedback المضمّن

بعد ما يشوف النتيجة، الطالب يقدر يبعت feedback. الفورم بيظهر في نفس الصفحة من غير انتقال، وبيبعت اسم الطالب والرقم والصف والشعبة مع نص الـ feedback للـ backend — بيدي إدارة المدرسة سياق كامل عن مين بعت إيه. بعد الإرسال الناجح، الفورم بيتبدّل بزرار "ابحث عن طالب تاني".

---

### 👁️ علم إظهار النتائج

الـ backend يقدر يخفي النتائج بشكل عام عن طريق settings sheet. لما `resultsHidden: true` يتبعت، البوابة بتعرض اسم الطالب والصف وبتستبدل جدول الدرجات برسالة "النتائج مش متاحة لسه" — من غير ما تكشف أي درجات.

**🛠️ التقنيات المستخدمة**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `html2canvas` · `canvas-confetti`

</details>

---

<details>
<summary><b>✏️ ٦. الخطيب — الدرجات / alkhateeb-degrees</b></summary>

<br>

بوابة إدخال درجات متعددة الخطوات وآمنة للمدرسين. كل interaction من تسجيل الدخول للحفظ متصمم عشان يمنع فقدان البيانات ويتعامل مع الوصول المتزامن.

---

### 🔐 الـ Authentication — حفظ الـ Token في `localStorage`

بعد تسجيل الدخول، السيرفر بيرجع token واسم المدرّس. بيتحفظوا في `localStorage` كـ JSON object. مع كل تحميل للصفحة، `checkAuth()` بتقرأ الـ object وتقرر أي container تعرض:

```js
function checkAuth() {
  const authData = localStorage.getItem("alkhateeb_auth");
  if (authData) {
    const auth = JSON.parse(authData);
    // بتعرض الـ container الرئيسي، بتعرض اسم المدرس، بتستعيد الـ draft
  } else {
    // بتعرض container تسجيل الدخول
  }
}
```

---

### 📝 الحفظ التلقائي للـ Draft — Snapshot في `localStorage` بصلاحية محدودة

في كل مرة المدرس يغير درجة أو يتنقل بين الصفحات، `saveStateLocally()` بتكتب الـ state الكامل بتاع التطبيق في `localStorage`:

```js
const state = {
  grade, section, subject, evaluation,
  students: allStudents, // المصفوفة كاملة مع originalScore والدرجة الحالية
  currentPage, rowsPerPage,
  timestamp: Date.now()
};
localStorage.setItem("alkhateeb_grades_draft", JSON.stringify(state));
```

`restoreStateLocally()` بتقرأه عند التحميل وبتستعيد الـ UI بالكامل — الـ dropdowns والجدول وكل الدرجات غير المحفوظة. لو الـ `timestamp` أقدم من ٨ ساعات، الـ draft بيتمسح:

```js
const expirationTime = 8 * 60 * 60 * 1000;
if (!state.timestamp || now - state.timestamp > expirationTime) {
  localStorage.removeItem("alkhateeb_grades_draft");
  return;
}
```

يعني مدرس أقفل البراوزر في الوسط يقدر يفتحه ويكمل من نفس المكان — طالما رجع في نفس يوم العمل.

---

### 🔢 تحويل الأرقام العربية

المدرسين ممكن يكتبوا أرقام عربية هندية (٠١٢٣٤٥٦٧٨٩) من الكيبوردات العربية. `convertToEnglishNumbers()` بتحوّل كل رقم عربي لمقابله ASCII وبعدين بتشيل أي حروف مش رقمية:

```js
function convertToEnglishNumbers(str) {
  const arabicNumbers = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
  return String(str)
    .replace(/[٠-٩]/g, w => arabicNumbers.indexOf(w))
    .replace(/[^0-9.]/g, "");
}
```

التحويل ده بيشتغل مع كل ضغطة كيبورد في `handleScoreInput()`، بيخلي تنسيق الإدخال غير مهم.

---

### 🟩 تمييز الخلايا المعدّلة

لما الدرجة تختلف عن `originalScore` (القيمة اللي رجعت من السيرفر)، الـ input بياخد border وخلفية خضراء عن طريق `checkModifiedState()`. لما الدرجة بترجع للقيمة الأصلية، التمييز الأخضر بيتشال. العلم `suppressGreen` بيمنع نتائج العمليات الجماعية (زي "اجعل الكل ٩٠") من التمييز الأخضر على كل خلية، لأنها تغييرات bulk مش محتاجة تأكيد بصري لكل خلية.

---

### ⌨️ تنقل بمفتاح الـ Enter

`handleEnter()` بتعترض مفتاح Enter على inputs الدرجات. بتلاقي index الـ input الحالي في NodeList الـ `.student-score`، وبتتخطى الـ inputs المعطلة (الطلاب الغيابيين)، وبتركّز على الـ input التالي المتاح. في نهاية الصفحة الحالية، بتنتقل تلقائياً للصفحة التالية في الـ pagination وبتركّز على أول input متاح:

```js
if (nextIndex < inputs.length) {
  inputs[nextIndex].focus();
  inputs[nextIndex].select();
} else if (currentPage < totalPages) {
  changePage(1);
  setTimeout(() => { /* ركّز على أول حاجة enabled في الصفحة الجديدة */ }, 50);
} else {
  saveData(); // آخر طالب في آخر صفحة → حفظ تلقائي
}
```

---

### 💾 الحفظ الذكي — Validation والـ Scroll والـ Diff

`saveData()` بتشتغل في ثلاث مراحل قبل أي request للسيرفر:

1. **التحقق** — بتفحص `allStudents` لأي درجة فاضية. لو لقت، بتمسح فلتر البحث الحي، وبتلاقي صفحة الطالب، وبتسكرول للـ input المشكلة وبتعلّمه باللون الأحمر.
2. **الـ Diff** — بتفلتر `allStudents` للطلاب اللي `score !== originalScore` بس. البيانات دي بس اللي بتتبعت للسيرفر.
3. **نص الزرار الديناميكي** — نص زرار الحفظ بيستخدم تجمّع عربي صحيح: "طالب واحد"، "طالبان"، "٣–١٠ طلاب"، "ن طالباً".

بعد الحفظ الناجح، رد السيرفر بيتضمن ملخص (الصف والشعبة والمادة والتقييم وعدد المحفوظين) بيتعرض كرسالة HTML منسّقة.

---

### 📊 قائمة مواد ديناميكية لكل صف

`subjectsConfig` بتعمل map كل صف من ٦ مستويات لمصفوفة من object المواد. لما المدرس يختار صف، `populateSubjects()` بتعيد بناء الـ dropdown بالكامل من الـ map ده. يعني الـ frontend بينفّذ بنية المناهج الصحيحة من غير الرجوع للـ backend.

---

### 🔢 تعميم الدرجة الجماعي

خاصية الدرجة الجماعية بتسمح بإدخال درجة واحدة وتطبيقها على كل الطلاب *الحاضرين* في عملية واحدة. الطلاب المُعلَّمين كغيابيين (`غ` / `غائب`) مستثنيين صراحةً:

```js
for (let i = 0; i < allStudents.length; i++) {
  if (allStudents[i].score !== "غ" && allStudents[i].score !== "غائب") {
    allStudents[i].score = cleanedStr;
  }
}
```

كل العمليات الجماعية (تطبيق، مسح الكل، غياب الكل، حضور الكل) بتعدي على modal تأكيد مخصوص قبل التنفيذ.

---

### ⚠️ تحذير التغييرات غير المحفوظة

`beforeunload` event listener بيتحقق لو أي طالب عنده `score !== originalScore`. لو آه، حوار "مغادرة الصفحة؟" الأصلي للبراوزر بيتشغّل:

```js
window.addEventListener("beforeunload", function(e) {
  const hasChanges = allStudents.some(s => s.score !== s.originalScore);
  if (hasChanges) { e.preventDefault(); e.returnValue = ""; }
});
```

زرار تسجيل الخروج كمان بيتحقق من التغييرات غير المحفوظة وبيعرض modal التأكيد المخصوص لو في حاجة.

**🛠️ التقنيات المستخدمة**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `Google Sheets` · `LockService`

</details>

---

<details>
<summary><b>👔 ٧. الخطيب — شؤون العاملين / alkhateeb-teachers</b></summary>

<br>

نظام HR ثنائي الأدوار — لسه في طور التطوير النشط — مع لوحة Admin لتسجيل ومراجعة عمليات الموظفين، ولوحة للمدرس لإحصائياته الشخصية.

---

### 🔐 الـ Authentication — `sessionStorage` (مش `localStorage`)

خلافاً لبوابة الدرجات، النظام ده بيستخدم `sessionStorage`. يعني الـ session بتنتهي تلقائياً لما تاب البراوزر يتقفل — وده أنسب لبيانات الـ HR. قائمة المدرسين كمان بتتحفظ في `sessionStorage` عشان نتجنب إعادة جلبها مع كل انتقال:

```js
sessionStorage.setItem("alkhateeb_hr_auth", JSON.stringify({ token, name, role }));
sessionStorage.setItem("alkhateeb_teachers", JSON.stringify(allTeachers));
```

---

### 👥 لوحة التحكم ثنائية الأدوار

بعد تسجيل الدخول، رد الـ backend بيتضمن حقل `role`. الـ frontend بيعرض container مختلف تماماً بناءً على القيمة دي — `adminContainer` أو `teacherContainer`. مفيش منطق أدوار على الـ client غير الـ routing ده؛ كل العمليات ذات الصلاحية بتتحقق منها السيرفر باستخدام الـ token.

---

### 🔎 بحث Autocomplete حي مع تنقل بالكيبورد

حقل بحث المدرسين بيستخدم تنفيذ autocomplete مخصوص. النتائج بتتفلتر real-time من قائمة المدرسين المحفوظة محلياً. الـ dropdown بيدعم التنقل الكامل بالكيبورد:

```js
document.getElementById("adminSearchInput").addEventListener("keydown", function(e) {
  if (e.key === "ArrowDown") { currentSearchFocus++; addActiveSearchItem(items); }
  if (e.key === "ArrowUp")   { currentSearchFocus--; addActiveSearchItem(items); }
  if (e.key === "Enter") {
    if (currentSearchFocus > -1) items[currentSearchFocus].click();
    else if (items.length === 1)  items[0].click(); // اختيار تلقائي لو نتيجة واحدة بس
  }
});
```

`document.addEventListener("click")` بيقفل الـ dropdown لما الضغط يكون برّه الحقل.

---

### ⏱️ حساب التأخير التلقائي

للعمليات بالوقت (تأخير صباحي، انصراف مبكر، إلخ)، الفورم بيعرض time picker. لما الوقت يتغير، `calculateDelay()` بتحلل الوقت المختار ووقت بداية دوام المدرس (المحفوظ في حقل `selectedTeacherStart` المخفي) وبتحسب الفرق بالدقائق:

```js
let [eh, em] = expectedTime.split(':').map(Number);
let [ah, am] = actualTime.split(':').map(Number);
let diff = (ah * 60 + am) - (eh * 60 + em);
```

زرار "الآن" بيملي الـ time picker بالوقت الحالي للجهاز وبيشغّل الحساب فوراً.

---

### 📅 شبكة Checkboxes لأيام متعددة

للعمليات غير الزمنية (غيابات، إجازات)، الـ admin يقدر يبدّل لوضع "أيام متعددة". `generateCheckboxes()` بتبني شبكة checkboxes لكل يوم في النطاق المحدد (حد أقصى ٦٠ يوم):

```js
for (let i = 0; i <= diffDays; i++) {
  let currentDate = new Date(startDate);
  currentDate.setDate(startDate.getDate() + i);
  // بيعمل checkbox معنونة: "الإثنين (12/5)"
}
```

checkbox رئيسية "تحديد الكل" بتتزامن مع الـ checkboxes الفردية وبتتحدث لما أي checkbox فردية تتغير.

---

### 📊 Animations الرسوم الدائرية — SVG `stroke-dasharray`

لوحة المدرس بتستخدم ثلاث رسوم بيانية دائرية SVG للتقدم. الـ animation بيتعمل بضبط `stroke-dasharray` من `"0, 100"` لـ `"${percentage}, 100"` عن طريق JavaScript — الـ CSS `transition` على عنصر الـ `circle` بيحرّك التغيير:

```js
function animateCircle(circleId, textId, value, maxVal, suffix) {
  let percentage = Math.min(100, (value / maxVal) * 100);
  setTimeout(() => {
    circle.setAttribute("stroke-dasharray", `${percentage}, 100`);
    text.innerHTML = value + suffix;
  }, 300);
}
```

ثلاثة رسوم بتعرض: نسبة الحضور (٪)، أيام الإجازة السنوية المتبقية، وإجمالي دقائق التأخير.

---

### 🗑️ تعديل وحذف جماعي

جدول السجلات بيدعم تحديد الصفوف بالـ checkboxes. لما صفوف تتحدد، شريط عمليات جماعية بيظهر مع العدد. الحذف الجماعي بيشتغل كـ loop `async/await` متتابعة، بينفّذ API call واحدة لكل سجل وبيجمع الأخطاء:

```js
for (let i = 0; i < boxes.length; i++) {
  const item = JSON.parse(decodeURIComponent(boxes[i].value));
  let res  = await fetch(APPS_SCRIPT_URL, { ... action: "deleteRecord" ... });
  let data = await res.json();
  if (data.status !== "success") hasError = true;
}
```

metadata الصف (تاريخ، اسم، نوع، مقدار) بيتحفظ بـ `JSON.stringify` و`encodeURIComponent` في `value` attribute بتاع كل checkbox — بيلغي الحاجة لـ data store منفصل.

---

### 🔒 Dialog تأكيد مخصوص

`window.confirm()` الأصلي اتستبدل بالكامل بـ `customConfirm(msg, callback)` — modal بيقبل callback function بتشتغل بس لما المستخدم يضغط "تأكيد". ده بيدي styling موحد ويمنع ظهور الـ dialog الافتراضي للبراوزر.

**🛠️ التقنيات المستخدمة**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `Google Sheets`

</details>

---

## 🏗️ معمارية نظام الخطيب

```
mosamirhelal.com/alkhateeb              ← الصفحة الرئيسية (نقطة الدخول)
        │
        ├──► /alkhateeb-results         ← بوابة نتائج الطلاب     ──┐
        │                                                             │  Backend A
        ├──► /alkhateeb-degrees         ← بوابة درجات المدرسين   ──┘  (الدرجات والنتائج)
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
        │    │   Google Sheets (قاعدة الدرجات) │
        │    │  درجات · طلاب · إعدادات         │
        │    │  درجات قصوى · سجل اقتراحات      │
        │    │  مستخدمون · سجل حركات           │
        │    └─────────────────────────────────┘
        │
        └──► /alkhateeb-teachers   ← بوابة شؤون العاملين  ─── Backend B (نظام HR)
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
        │   Google Sheets (قاعدة HR)      │
        │  عمليات · بيانات مدرسين         │
        │  تقارير مجمّعة · مستخدمون       │
        │  سجل مراجعة النظام              │
        └─────────────────────────────────┘
```

---

## ⚙️ تفاصيل الـ Backend

> كلا الـ backends **غير منشورين في الـ repository** لأسباب أمنية. فيما يلي شرح تقني لما كل نظام بيعمله من الداخل.

---

<details>
<summary><b>🔧 Backend A — نظام الدرجات والنتائج</b></summary>

<br>

الـ backend ده بيشغّل **بوابة نتائج الطلاب** و**بوابة درجات المدرسين**. بيتحكم في كل حاجة من تهيئة قاعدة البيانات لحد تسليم الدرجات مع حماية كاملة من التعارض.

---

**📐 Schema قاعدة البيانات — `setupDatabase()`**

عند أول تشغيل، الـ backend بيعمل هيكل قاعدة البيانات بالكامل من الصفر جوه Google Sheets. بيحضّر sheets للدرجات لـ **٦ مستويات دراسية** (الابتدائية من الثالث للسادس، والإعدادية الأول والثاني)، كل منها بمجموعة مواد فريدة. عناوين الأعمدة بتتولد تلقائياً بدمج كل تركيبة من:

- **الشهر** × **نوع الامتحان** × **المادة** → مثلاً: `تقييم مارس - عربي`، `امتحان أبريل - رياضيات`

أول ٣ أعمدة في كل sheet مجمّدة: اسم الطالب، الرقم، والشعبة. كمان بيعمل تلقائياً:
- `المستخدمين` — حسابات المدرسين مع اسم المستخدم والباسورد والاسم والحالة والمواد المسموح بها
- `سجل الحركات` — سجل تدقيق كامل لكل عملية مع الوقت
- `إعدادات النظام` — لوحة تحكم بـ dropdown validations لفلتر الشهر ونوع الامتحان وإظهار/إخفاء النتائج وإظهار الدرجة القصوى في التقارير وفلتر حالة الإكمال

---

**🌍 تطبيع النص العربي — `normalizeArabic()`**

قبل أي بحث بالاسم، الاستعلام وكل الأسماء المحفوظة بتعدي من pipeline تطبيع:
- كل أشكال الهمزة `أ إ آ` → توحيد كـ `ا`
- التاء المربوطة `ة` → `ه`
- الألف المقصورة `ى` → `ي`
- كل التشكيل / علامات الحركة → حذف كامل

يعني ولي الأمر اللي بيدور على `محمد` هيلاقي `مُحَمَّد` — من غير ما يحتاج يكتب بالظبط.

---

**🔐 الـ Authentication والأمان — flow تسجيل الدخول في `doPost()`**

1. النظام بيتحقق من **قفل الحساب** النشط المحفوظ في `ScriptProperties` قبل معالجة أي بيانات
2. لو مقفول، بيحسب وقت القفل المتبقي بالدقائق وبيرجعه في رسالة الخطأ
3. عند البيانات الصحيحة، بيتولد **UUID token** ومحفوظ مع **timestamp صلاحية ٨ ساعات**
4. كل محاولة فاشلة بتزيد counter؛ عند **٥ فشل**، الحساب بيتقفل **٥ دقايق** والحدث بيتسجل في سجل التدقيق
5. بعد تسجيل الدخول الناجح، counter المحاولات والقفل بيتمسحوا
6. الحسابات بحالة غير `نشط` بتترفض حتى لو البيانات صح

---

**🎓 تفويض على مستوى المادة**

كل API call محمية بتتحقق إن `allowedSubjects` بتاع المدرس المسجّل بيغطي المادة المطلوبة. محاولات الوصول غير المصرح به بتتسجل في سجل التدقيق باسم المدرس والمادة اللي حاول يوصل ليها.

---

**💾 حفظ الدرجات — action الـ `saveGrades` مع LockService**

1. **التحقق من المدخلات** — كل درجة بتتفحص: لازم تكون فاضية أو `غ` (غياب) أو رقم من ٠ لـ ١٠٠
2. **LockService** — `LockService.getScriptLock()` مع انتظار ١٥ ثانية بيتحصل عليه قبل أي كتابة، بيمنع تعارضات الكتابة المتزامنة
3. **كشف التغييرات** — الـ backend بيقرأ العمود الحالي ومش بيكتب غير **القيم اللي اتغيرت فعلاً**
4. **كتابة batch** — القيم المعدّلة بتتكتب كعملية range واحدة (`setValues`) مش خلية خلية
5. الـ lock بيتحرر **دايماً** في block الـ `finally`

---

**📊 البحث عن نتائج الطلاب — flow الـ `doGet()`**

وضعان بناءً على باراميتر الـ URL:

**بالـ ID (`?id=...`):**
- بيتحقق لو النتائج ظاهرة بشكل عام عن طريق إعدادات النظام
- بيقرأ **sheet الدرجات القصوى** عشان يجيب الدرجات القصوى لكل مادة لكل شعبة
- بيطبق فلاتر الشهر ونوع الامتحان من إعدادات النظام
- بيحسب المجموع والحد الأقصى والنسبة — الطلاب الغيابيين بتحسب عليهم الدرجة القصوى

**بالاسم (`?name=...`):**
- الاستعلام بيعدي على `normalizeArabic()` الأول
- بيرجع لحد ١٠ نتائج؛ أكتر من ١٠ بيطلب إدخال أدق (بيمنع enumeration)

---

**🔁 تنظيف الـ Tokens التلقائي — `cleanExpiredTokens()`**

trigger زمني بيشتغل كل **٦ ساعات**، بيفحص كل مفاتيح `ScriptProperties` اللي بتبدأ بـ `token_` وبيمسح المنتهية الصلاحية — بيمنع النمو غير المحدود لمخزن الـ properties.

</details>

---

<details>
<summary><b>🔧 Backend B — نظام شؤون العاملين والحضور</b></summary>

<br>

الـ backend ده بيشغّل **بوابة شؤون العاملين** بنظام ثنائي الأدوار، ومحرك تسجيل حضور غني، وطبقة تقارير مجمّعة مبنية على formulas حية في Google Sheets.

---

**👥 الـ Authentication ثنائي الأدوار**

دورين مختلفين تماماً:
- **Admin** — يقدر يشوف كل المدرسين، ويسجل العمليات، ويعدل/يمسح السجلات، ويعمل تقارير
- **مدرس** — يقدر يشوف إحصائياته وسجله الشخصي بس

صلاحية الـ token هنا **١٢ ساعة** (مقارنةً بـ ٨ ساعات في Backend A)، لأن عمليات الـ HR ممكن تمتد ليوم عمل كامل.

---

**🗓️ تطبيع التاريخ — `forceStringDate()`**

بيتعامل مع مشكلة الـ timezone في Google Sheets:
- الـ `Date` objects في JavaScript بياخدوا **+١٢ ساعة** قبل الـ formatting — تعويضاً لإزاحة منتصف الليل UTC
- التواريخ النصية بصيغة `dd/mm/yyyy` بتتحوّل لـ `yyyy-mm-dd` للـ ISO sorting الموحّد

---

**📝 تسجيل الحضور — Batch API**

بتقبل **مصفوفة من السجلات** في call واحدة (لما الـ admin يستخدم شبكة الـ checkboxes متعددة الأيام). الرقم القومي بيتجاب من السيرفر باستخدام كود المدرس — مش بيتبعت من الـ frontend.

---

**✏️ تعديل السجل — Bottom-Up Fingerprint Matching**

للإيجاد الصف الصح من غير كشف row ID، النظام بيستخدم **بصمة متعددة الحقول**: الـ backend بيفحص sheet العمليات **من الأسفل للأعلى** وبيطابق صف بيوم + شهر + سنة + اسم المدرس + نوع العملية + المقدار. `type` و`amount` و`notes` بس اللي بيتحدثوا — حقول التاريخ والـ admin ثابتة.

---

**📈 Aggregated Reports Builder — `setupAggregatedReports()`**

بدل حساب الإحصائيات وقت الـ query، الدالة دي بتبني **sheet formulas حية** مرة واحدة. لكل مدرس، بتضيف صفوف بـ **formulas SUMIFS ديناميكية** لكل ٩ أنواع عمليات. في كل مرة سجل جديد يتضاف لـ sheet العمليات، كل الأرقام المجمّعة بتتحدث فوراً عن طريق محرك الـ formulas الأصلي في Google Sheets — من غير أي حسابات في الـ backend.

</details>

---

## 🔒 معمارية الأمان

| الخاصية | Backend A (الدرجات) | Backend B (شؤون العاملين) |
|---|---|---|
| **طريقة الـ Auth** | Token بـ UUID | Token بـ UUID |
| **انتهاء الـ Token** | ٨ ساعات | ١٢ ساعة |
| **التخزين على الـ Client** | `localStorage` | `sessionStorage` |
| **حماية Brute Force** | ✅ ٥ محاولات → قفل ٥ دقايق | — |
| **نظام الأدوار** | على مستوى المادة لكل مدرس | Admin / مدرس |
| **حماية الكتابة المتزامنة** | ✅ LockService (انتظار ١٥ ثانية) | — |
| **تسجيل الوصول غير المصرح** | ✅ سجل تدقيق كامل | ✅ سجل تدقيق كامل |
| **التحكم في ظهور النتائج** | ✅ Remote تشغيل/إيقاف عن طريق settings | — |
| **تنظيف الـ Token التلقائي** | ✅ كل ٦ ساعات بـ trigger | ✅ مع كل request |
| **حجب طلبات GET** | جزئي (النتائج العامة عبر GET) | ✅ حجب كامل — بيرجع 403 |
| **منع XSS** | ✅ `escapeHTML()` على كل محتوى المستخدم | ✅ `escapeHTML()` على كل محتوى المستخدم |
| **الكود المنشور** | ❌ خاص (لأسباب أمنية) | ❌ خاص (لأسباب أمنية) |

---

## 🤖 الـ Tech Stack والأدوات

<div align="center">

**أدوات الذكاء الاصطناعي**

<img src="https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white" />
<img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white" />
<img src="https://img.shields.io/badge/Claude-D9795C?style=for-the-badge&logo=anthropic&logoColor=white" />

**الـ Frontend**

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />

**الـ APIs والبراوزر**

<img src="https://img.shields.io/badge/Web_Audio_API-FF6B6B?style=for-the-badge&logo=googlechrome&logoColor=white" />
<img src="https://img.shields.io/badge/Canvas_API-9B59B6?style=for-the-badge&logo=googlechrome&logoColor=white" />
<img src="https://img.shields.io/badge/html2canvas-E67E22?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/canvas--confetti-F1C40F?style=for-the-badge&logo=javascript&logoColor=black" />

**الـ Backend والبيانات**

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Google_Apps_Script-4285F4?style=for-the-badge&logo=google&logoColor=white" />
<img src="https://img.shields.io/badge/Google_Sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white" />

**الـ Hosting**

<img src="https://img.shields.io/badge/GitHub_Pages-181717?style=for-the-badge&logo=github&logoColor=white" />

</div>

---

## 📁 هيكل الـ Repository

```
mosamirhelal.github.io/
│
├── 📄 index.html                        ← الموقع الشخصي (mosamirhelal.com)
├── 🌐 CNAME                             ← إعداد الدومين المخصوص
├── 📱 site.webmanifest                  ← PWA manifest
├── 🖼️ favicon.ico / .svg                ← Favicons
├── 🖼️ favicon-96x96.png                 ← Favicon (96px)
├── 🖼️ apple-touch-icon.png              ← أيقونة iOS
├── 🖼️ web-app-manifest-192x192.png      ← أيقونة PWA (192px)
├── 🖼️ web-app-manifest-512x512.png      ← أيقونة PWA (512px)
├── 🌙 dark.webp                         ← صورة الـ hero للدارك مود
├── ☀️ light.webp                        ← صورة الـ hero للمود الفاتح
├── 👤 profile.webp                      ← صورة البروفايل
│
├── 📂 motasks/                          ← متابع المهام الدراسية
│   └── index.html
│
├── 📂 audiomonitor/                     ← مراقب الصوت في البراوزر
│   └── index.html
│
├── 📂 alkhateeb/                        ← الصفحة الرئيسية لنظام المدرسة
│   ├── index.html
│   ├── logo_1.webp
│   ├── logo_2.webp
│   └── logo_3.webp
│
├── 📂 alkhateeb-results/                ← بوابة نتائج الطلاب
│   ├── index.html
│   ├── logo_1.webp
│   ├── logo_2.webp
│   └── logo_3.webp
│
├── 📂 alkhateeb-degrees/                ← بوابة درجات المدرسين
│   ├── index.html
│   ├── logo_1.webp
│   ├── logo_2.webp
│   └── logo_3.webp
│
└── 📂 alkhateeb-teachers/               ← بوابة شؤون العاملين
    ├── index.html
    ├── logo_1.webp
    ├── logo_2.webp
    └── logo_3.webp
```

> **ملاحظة:** الكود المصدري للـ backend بتاع نظام الخطيب مش موجود في الـ repository عن قصد لأسباب أمنية. كلا الـ Google Apps Script backends متنشورين كـ web apps خاصة.

---

## 📬 للتواصل

<div align="center">

### `@mosamirhelal` — في كل حتة

<p>
<a href="https://mosamirhelal.com" target="_blank">
  <img src="https://img.shields.io/badge/🌐 Website-mosamirhelal.com-2ea44f?style=for-the-badge" />
</a>
<a href="mailto:mosamirhelal@outlook.com" target="_blank">
  <img src="https://img.shields.io/badge/📧 Email-mosamirhelal@outlook.com-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" />
</a>
</p>

> كل لينكات التواصل الاجتماعي متاحة عن طريق الـ drawer في [**mosamirhelal.com**](https://mosamirhelal.com) — أكتر من ٢٠ منصة في مكان واحد.

</div>

---

## 🏆 كريدت

<div align="center">

**التصميم والتطوير** — محمد سمير هلال

*كل المشاريع في الـ repository دي — الـ frontend interfaces ومعمارية الـ backend وهيكل قاعدة البيانات وأنظمة الأمان والـ UI/UX — تصميم وتنفيذ محمد سمير هلال بالكامل.*

---

<sub>© ٢٠٢٦ محمد سمير هلال · كل المشاريع شغالة على GitHub Pages · مصنوع بـ ❤️ من القاهرة، مصر</sub>

</div>