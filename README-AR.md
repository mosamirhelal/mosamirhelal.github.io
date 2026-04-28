<div align="center">

# 👋 مرحباً، أنا محمد سمير هلال

### 🦷 طالب طب أسنان · 💻 مبرمج · 🎨 مصمم جرافيك

<p align="center">
  <img src="https://hits.sh/github.com/mosamirhelal/mosamirhelal.github.io.svg?style=flat-square&label=%F0%9F%91%81%EF%B8%8F+Visitors&color=0e75b6&labelColor=1a1a2e" />
  
  <img src="https://img.shields.io/github/repo-size/mosamirhelal/mosamirhelal.github.io?style=flat-square&label=%F0%9F%93%A6+Repo+Size&color=f97316&labelColor=1a1a2e" />
  
  <img src="https://img.shields.io/github/last-commit/mosamirhelal/mosamirhelal.github.io?style=flat-square&label=%F0%9F%94%84+Last+Update&color=22c55e&labelColor=1a1a2e" />
</p>
</div>

<div align="center">

> **English version available:** [Read in English](README.md)

</div>

---

## 👨‍💻 عن نفسي

أهلاً! أنا **محمد سمير هلال** — طالب طب أسنان في **جامعة مصر للعلوم والتكنولوجيا (MUST)**، ومبرمج otodidact شغوف بالبرمجة، ومصمم جرافيك مبدع، مقيم في القاهرة، مصر.

أحب بناء أشياء تُستخدم فعلاً — من بوابات الطلاب وأنظمة إدارة المدارس إلى مرئيات الصوت والأدوات الشخصية. كل ما في هذا الـ repository هو في production الآن ويستخدمه أناس حقيقيون.

| | |
|---|---|
| 🎓 **التعليم** | طالب طب أسنان · جامعة مصر للعلوم والتكنولوجيا (MUST) |
| 📍 **الموقع** | القاهرة، مصر |
| 🌐 **الموقع الإلكتروني** | [mosamirhelal.com](https://mosamirhelal.com) |
| 📱 **في كل مكان** | [@mosamirhelal](https://mosamirhelal.com) |
| 🚀 **هذا الـ Repo** | المضيف الرسمي لموقعي الشخصي وجميع المشاريع الفرعية |

<div align="center">
  <blockquote>🚀 <strong>الرسالة:</strong> سد الفجوة بين الدقة الطبية والابتكار التقني.</blockquote>
</div>

---

## 🗂️ نظرة عامة على المشاريع

| # | المشروع | الوصف | التقنيات الأساسية | رابط مباشر |
|---|---------|-------|-------------------|-----------|
| 1 | **الموقع الشخصي** | صفحة شخصية أنيقة مع drawer للسوشيال ميديا، dark/light mode، وكشف تلقائي للغة العربية | HTML · CSS · JS | [mosamirhelal.com](https://mosamirhelal.com) |
| 2 | **MoTasks** | متتبع مهام دراسية بالوقت الفعلي مع مزامنة Firebase | JS · Firebase | [mosamirhelal.com/motasks](https://mosamirhelal.com/motasks) |
| 3 | **AudioMonitor** | مرئي صوتي للميكروفون وصوت النظام داخل المتصفح — بدون server | Web Audio API · JS | [mosamirhelal.com/audiomonitor](https://mosamirhelal.com/audiomonitor) |
| 4 | **الخطيب - الصفحة الرئيسية** | بوابة موحدة لأنظمة المدرسة الثلاثة | HTML · CSS · JS | [mosamirhelal.com/alkhateeb](https://mosamirhelal.com/alkhateeb) |
| 5 | **الخطيب - النتائج** | بوابة نتائج الطلاب مع confetti وخاصية المشاركة كصورة | JS · Apps Script | [mosamirhelal.com/alkhateeb-results](https://mosamirhelal.com/alkhateeb-results) |
| 6 | **الخطيب - الدرجات** | بوابة إدخال درجات المعلمين مع المصادقة وحماية التعارض | JS · Apps Script | [mosamirhelal.com/alkhateeb-degrees](https://mosamirhelal.com/alkhateeb-degrees) |
| 7 | **الخطيب - الموارد البشرية** | نظام إدارة حضور وإجازات الموظفين | JS · Apps Script | [mosamirhelal.com/alkhateeb-teachers](https://mosamirhelal.com/alkhateeb-teachers) |

---

## 🔬 تفصيل المشاريع

<details>
<summary><b>🌐 1. الموقع الشخصي — mosamirhelal.com</b></summary>

<br>

صفحة شخصية مُصممة بعناية تفوق فكرة الـ "coming soon" البسيطة بمراحل. كل تفصيلة بصرية وكل hint للأداء وكل سلوك تفاعلي مدروس ومكتوب يدوياً بـ HTML وCSS وJavaScript خالص — بدون أي dependencies.

---

### 🌍 الكشف التلقائي للعربية — Pre-render Language Switch

أول script في الـ `<head>` — قبل أن يُرندر أي محتوى — يقرأ `navigator.language` ويتحقق إذا كانت تبدأ بـ `"ar"`. لو نعم، يعيد كتابة الصفحة فوراً قبل أن يرسم المتصفح أي بكسل:

```js
const userLang = navigator.language || navigator.userLanguage;
const isArabic = userLang.startsWith("ar");
if (isArabic) {
  document.title = arabicTitle;
  document.documentElement.lang = "ar";
  document.documentElement.dir = "rtl";
  // يُحدّث أيضاً: og:title, og:description, twitter:title, twitter:description, meta description
}
```

يعني الزوار العرب لن يروا أي "وميض" إنجليزي. التبديل يحدث بشكل synchronous أثناء الـ parse، وليس بعد `DOMContentLoaded`. كلا الـ `lang` و`dir` على الـ `<html>` يُحدَّثان، مما يؤثر على rendering الخطوط واتجاه النص بشكل كامل.

---

### 🌙 نظام الـ Theme — أولوية ثلاثية الطبقات

محرك الـ theme يحدد أي theme يظهر عبر نظام أولوية من ثلاث طبقات:

1. **اختيار المستخدم الصريح** — محفوظ في `localStorage` تحت المفتاح `"theme"`. لو موجود، هو دايماً الأولى.
2. **تفضيل النظام** — يُقرأ `window.matchMedia("(prefers-color-scheme: dark)").matches` عند التحميل لو مفيش تفضيل محفوظ.
3. **تغييرات النظام اللحظية** — `change` event listener على `prefers-color-scheme` media query يحدّث الـ theme في الوقت الفعلي *بس لو* المستخدم ما اختارش صراحةً.

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

دالة `applyTheme()` تبدّل class اسمه `dark-mode` على الـ `<body>`، تغيّر emoji الزرار (🌙 / ☀️)، تحدّث الـ `aria-label`، وتكتب ديناميكياً الـ `theme-color` meta tag (`#000000` أو `#ffffff`) — اللي بيتحكم في لون الـ browser chrome على الموبايل.

---

### 🖼️ صورتان للـ Hero — تبديل مُدار بالـ CSS

في الـ DOM عنصرا `<img>` منفصلان — `light.webp` و`dark.webp`. الاتنين متحملين مسبقاً في الـ `<head>` باستخدام `<link rel="preload">` مع attributes للـ `media` تتطابق مع theme الـ OS، عشان الصورة الصح تكون في الذاكرة قبل ما يشتغل الـ JS:

```html
<link rel="preload" as="image" href="light.webp" media="(prefers-color-scheme: light)" />
<link rel="preload" as="image" href="dark.webp" media="(prefers-color-scheme: dark)" />
```

الإظهار والإخفاء بالـ CSS بالكامل — مفيش `src` بيتغير في الـ JS:

```css
body:not(.dark-mode) #light-image { display: block; }
body.dark-mode       #dark-image  { display: block; }
```

الصورتان تحملان `fetchpriority="high"` وأبعاد `width`/`height` صريحة لمنع الـ layout shift. الـ transitions بتتم عبر `opacity` على عناصر الـ `img` و`background-color` على الـ `body`.

---

### 🎪 Social Drawer — حركة بالـ CSS خالص

الـ drawer يستخدم حيلة `max-height` animation لتحقيق slide-in سلس بدون أن يقيس الـ JavaScript ارتفاع العناصر. الـ container يتحول من `max-height: 0` إلى `max-height: 600px`، مع `overflow: hidden` في حالة الإغلاق و`overflow: visible` في حالة الفتح (عشان الـ tooltips تقدر تخرج من الـ container):

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
  /* overflow تبقى visible بعد انتهاء الـ transition مش أثناءه */
  transition: ..., overflow 0s linear 0.5s;
}
```

الـ `cubic-bezier(0.68, -0.55, 0.27, 1.55)` بيعمل "bounce" خفيف عند الفتح وsnap سريع عند الإغلاق — easing مختارة بعناية تخلّي الـ drawer يحس بأنه ماديّ. الـ JavaScript بس بيبدّل الـ `.active` class ويحدّث الـ `aria-expanded`.

---

### 🎨 أيقونات 21 منصة — نظام ألوان الـ Brand

كل ألوان المنصات الـ 21 معرّفة كـ CSS custom properties في الـ `:root`، وده بيخلي طبقة الـ JavaScript مستقلة تماماً عن الألوان. كل `.social-btn` بياخد style الـ hover من خلال rule CSS مخصصة:

```css
:root {
  --whatsapp: #25d366;
  --instagram: /* gradient */;
  --tiktok: #000;
  /* ... 18 منصة تانية */
}
.social-btn.tiktok:hover {
  box-shadow: 2px 2px 0 #25f4ee, -2px -2px 0 #fe2c55; /* تأثير شعار TikTok ذو اللونين */
}
.social-btn.instagram:hover {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}
```

GitHub عنده rule خاص للـ dark mode — خلفية بيضا مع أيقونة سودا — لأن الأسود الاعتيادي بيختفي على الخلفيات الداكنة.

---

### 💬 Tooltips — بالـ CSS فقط عبر `aria-label`

كل زرار سوشيال وزرار الـ theme بيعرضوا tooltips عند الـ hover باستخدام `::before` pseudo-elements بتقرأ من الـ `aria-label` attribute عبر `content: attr(aria-label)`. بدون JavaScript، بدون HTML إضافي:

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

ده بيخلّي الـ HTML نظيف ويضمن إن الـ tooltips دايماً متزامنة مع الـ accessible label.

---

### 🔢 عداد الزيارات — Hidden Stats Mode

عداد زيارات بيشتغل بصمت عند كل تحميل للصفحة عبر `counterapi.dev`. العدد بيظهر بس لو الـ URL فيه `?stats` — Easter egg مقصودة للوصول الإداري بدون إظهار العداد للزوار العاديين:

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

### ⚡ معمارية الأداء والـ SEO

- `<link rel="preconnect">` لـ domains الـ FontAwesome وGoogle Tag Manager — يقلل زمن الـ DNS وTLS handshake
- FontAwesome بيتحمل بـ `defer` — مبيوقفش الـ render أبداً
- `<h1 class="sr-only">` فيه النسختين الإنجليزية والعربية لعنوان الصفحة للشاشات الصوتية ومحركات البحث، من غير ما تكون مرئية
- بيانات `Schema.org` JSON-LD كاملة للشخص `Person` مع روابط `sameAs` لـ 7 منصات
- Meta tags كاملة لـ Open Graph وTwitter Card
- `<link rel="canonical">` للتعامل مع النسخ المكررة
- جاهز للـ PWA: `site.webmanifest`، `apple-touch-icon`، صيغ متعددة للـ favicon

**🛠️ التقنيات المستخدمة**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `localStorage API` · `prefers-color-scheme` · `Schema.org JSON-LD`

</details>

---

<details>
<summary><b>✅ 2. MoTasks — /motasks</b></summary>

<br>

مدير مهام دراسية بالوقت الفعلي مبني على Firebase Firestore. حالة التطبيق كلها محفوظة في document واحد على Firestore، مُسلسَل كـ `innerHTML` خام — تصميم عملي يُلغي طبقة الـ schema بالكامل لأداة شخصية.

---

### 🔥 المزامنة الفورية — معمارية `onSnapshot`

التطبيق يستخدم `onSnapshot` listener من Firestore بدل استدعاء `getDoc` لمرة واحدة. يعني كل تغيير على أي جهاز بيتبعت لكل التابات المفتوحة فوراً، بدون polling:

```js
onSnapshot(scheduleDocRef, (docSnap) => {
  if (docSnap.exists() && docSnap.data().htmlContent) {
    // Guard: حدّث بس لو المستخدم مش بيعدل في خلية حالياً
    if (document.activeElement.tagName !== "TD") {
      tableBody.innerHTML = docSnap.data().htmlContent;
      reattachEvents();
    }
  }
});
```

الـ active element guard (`document.activeElement.tagName !== "TD"`) بيمنع update قادم من جهاز تاني من إنه يمسح نص المستخدم اللي بيكتبه في نفس الوقت — آلية بسيطة وفعّالة لمنع تعارض الكتابة في أداة من مستخدم واحد.

---

### 💾 الحفظ المؤجل — 1 ثانية تأخير للكتابة

كل `oninput` event على خلية `contenteditable` بيصفّر timer الـ debounce المدته ثانية واحدة. الحفظ بيحصل بس لما المستخدم يوقف الكتابة:

```js
cell.oninput = () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveToFirebase, 1000);
};
```

ده بيمنع كتابة Firestore عند كل ضغطة، يحافظ على التكلفة منخفضة ويتجنب write-rate limits.

---

### ☑️ تسلسل حالة الـ Checkbox

الـ checkboxes في HTML عندها quirk: الـ property الـ `.checked` بتعكس الحالة في وقت التشغيل، لكن تسلسل الـ `innerHTML` بيلتقط بس الـ `checked` HTML *attribute*. عشان نحفظ الـ checkboxes صح، `saveToFirebase()` بيتزامن الـ attribute يدوياً قبل التسلسل:

```js
checkboxes.forEach(cb => {
  if (cb.checked) cb.setAttribute("checked", "true");
  else            cb.removeAttribute("checked");
});
await setDoc(scheduleDocRef, { htmlContent: tableBody.innerHTML });
```

بدون هذه الخطوة، كل الـ checkboxes هتبان غير محددة بعد كل reload.

---

### 🔁 إعادة ربط الـ Events بعد إعادة بناء الـ DOM

لأن آلية المزامنة بتستبدل `tableBody.innerHTML` بالكامل، كل الـ event listeners بتتدمر عند كل تحديث. `reattachEvents()` بتربط من جديد الأنواع الثلاثة بعد كل إعادة بناء للـ DOM:

```js
function reattachEvents() {
  // 1. حفظ مؤجل عند كتابة contenteditable
  tableBody.querySelectorAll("[contenteditable]").forEach(cell => {
    cell.oninput = () => { clearTimeout(saveTimeout); saveTimeout = setTimeout(saveToFirebase, 1000); };
  });
  // 2. حفظ فوري عند تغيير checkbox
  tableBody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.onchange = saveToFirebase;
  });
  // 3. زرار الحذف مع dialog للتأكيد
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

### ➕ صف جديد — مع تاريخ تلقائي

`addNewRow()` بتُضيف صف جاهز فيه تاريخ اليوم بصيغة `dd/mm/yyyy` باستخدام `toLocaleDateString("en-GB")`. بعد الإضافة، بتستدعي `reattachEvents()` على الصف الجديد وبتشغّل حفظ فوري.

---

### 📡 شارة الحالة — ثلاث حالات وصفية

شارة الحالة في الـ header بتدور على أربع حالات مع reset تلقائي:

| الحالة | المُشغّل | Reset تلقائي |
|--------|---------|-------------|
| `Connecting...` | تحميل الصفحة لأول مرة | لا |
| `⏳ Saving...` | قبل الكتابة على Firestore | لا |
| `✅ Saved / Synced` | بعد كتابة/snapshot ناجح | بعد 3 ثواني |
| `❌ Connection Error` | خطأ Firestore | لا |

**🛠️ التقنيات المستخدمة**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Firebase Firestore` · `Firebase SDK v11`

</details>

---

<details>
<summary><b>🎧 3. AudioMonitor — /audiomonitor</b></summary>

<br>

أداة مراقبة صوت client-side كاملة بدون أي رفع للبيانات. كل معالجة الإشارة بتحصل داخل الـ Web Audio API في المتصفح — لا يغادر أي صوت الجهاز أبداً. التطبيق يدعم مراقبة الميكروفون وصوت النظام في نفس الوقت مع مرئيات وإعدادات وألوان مستقلة لكل منهما.

---

### 🌍 محرك ثنائي اللغة الكامل — الـ `T` Object

كل نصوص الواجهة محفوظة في object اسمه `T` بمفتاحي `en` و`ar`، بما فيها نصوص رسائل الخطأ. `applyLang()` بتتكرر على كل العناصر بالـ ID، وتحدّث `document.documentElement.lang` وقيمة `dir`، وتبدّل الـ font family في الـ CSS بين `Inter` (لاتيني) و`Tajawal` (عربي):

```js
// الـ CSS بيتعامل مع تبديل الخط:
html[lang="ar"] body { font-family: "Tajawal", system-ui, sans-serif; }
html[lang="en"] body { font-family: "Inter",   system-ui, sans-serif; }
```

كل نصوص الأزرار بما فيها الحالات الديناميكية ("Start Monitoring" / "Stop") بتمر عبر `T[lang]` — مفيش نص إنجليزي hard-coded في أي مكان في طبقة الـ JavaScript.

---

### 💾 التفضيلات الدائمة — `localStorage` State Object

كل تفضيلات المستخدم بتتسلسل كـ JSON object واحد وبتتحفظ في `localStorage` عند كل تغيير. `loadState()` بتستعيدها قبل أول render:

```js
// شكل الـ State:
{ lang, isDark, layoutMode, cardVis: { mic, sys }, micCfg: { mode, sensitivity, smoothing, scheme }, sysCfg: { ... } }
```

يعني كل color scheme وwaveform mode ومستوى sensitivity وتفضيل الـ layout وكل card مخفية بتتذكّر عبر sessions المتصفح.

---

### 🎨 نظام 6 Color Schemes — Cached Gradient Engine

الـ six color schemes معرّفة كأزواج hue (`h1`، `h2`)، مش كألوان ثابتة. الـ gradient الفعلي بيتحسب وقت الرسم باستخدام الـ `createLinearGradient` API للـ canvas. Object اسمه `gradCache` بيكاش كل gradient بمفتاح بيجمع الـ hue مع الارتفاع/العرض، عشان كل gradient فريدة تتحسب مرة واحدة بس:

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

الـ cache بيتمسح (`clearGradCache()`) كل ما يتغير الـ theme (dark/light بيأثر على لون الخلفية) أو لما يتغير حجم الـ canvas. الـ hue لكل bar بيتعمله interpolation خطي على المدى الترددي: `hue = h1 + (h2 - h1) * (i / NUM)` — بينتج تدرج hue سلس عبر الـ 56 bar.

---

### 📐 Auto-Resize للـ Canvas — `ResizeObserver`

بدلاً من حجم canvas ثابت، `ResizeObserver` بيراقب عنصر الـ container ويحدّث `canvas.width` و`canvas.height` عشان يتطابقوا مع أبعاد البكسل الدقيقة كل ما يتغير الـ viewport:

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const canvas = entry.target.querySelector("canvas");
    canvas.width  = entry.contentRect.width;
    canvas.height = entry.contentRect.height;
    clearGradCache(); // الـ gradients المكاشة أصبح حجمها غلط
  }
});
resizeObserver.observe(document.getElementById("mic-viz-wrap"));
resizeObserver.observe(document.getElementById("sys-viz-wrap"));
```

ده بيضمن إن المرئي دايماً يملأ الـ container بالضبط — على الموبايل والتابلت والديسكتوب — بدون أي حسابات media queries.

---

### 📊 ثلاثة أوضاع مرئية

**Bars Mode** — الوضع الافتراضي. 56 frequency bin بتتحدد من مصفوفة الـ FFT. ارتفاع كل bar هو `freqData[i * step] / 255 * sensitivity`. نظام peak-hold بيحافظ على أعلى قيمة حديثة لكل bin. الـ peaks بتتآكل بمعدلين مختلفين: تآكل سريع للـ bars المنخفضة الطاقة، وبطيء للمرتفعة:

```js
const decayRate = peaks[id][i] > 0.7 ? 0.008 : 0.018;
peaks[id][i] = Math.max(peaks[id][i] - decayRate, v);
```

glow صغير (`shadowBlur`) بيتضاف يتناسب مع ارتفاع الـ bar للـ bars اللي بتتجاوز 6% amplitude.

**Wave Mode** — بيستخدم بيانات المجال الزمني (`getByteTimeDomainData`) بدلاً من بيانات التردد. بيرسم مسار مستمر عبر عرض الـ canvas كله. الـ amplitude بيتحجم بقيمة الـ sensitivity. gradient أفقي (من اليسار لليمين عبر مدى الـ hue) بيتطبق على الـ stroke، مع glow `shadowBlur` يتطابق مع الـ hue عند الحافة اليسرى.

**Mirror Mode** — نفس منطق الـ Bars، بس الـ bars بتنمو للأعلى وللأسفل من المنتصف الرأسي. نقاط الـ peak بتظهر فوق الـ bars العلوية وتحت السفلية بشكل متماثل.

---

### 🎤 التقاط الميكروفون — `getUserMedia`

```js
micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
const actx  = await getAudioCtx();
micAnalyser = actx.createAnalyser();
micAnalyser.fftSize = 2048; // → 1024 frequency bin
micAnalyser.smoothingTimeConstant = micCfg.smoothing;
micSrc = actx.createMediaStreamSource(micStream);
micSrc.connect(micAnalyser);
```

الـ `AudioContext` هو singleton (`globalAudioCtx`) مشترك بين الميكروفون وصوت النظام. لو موجود بس `"suspended"` (بسبب سياسة المتصفح)، بيتعمله `resume()` قبل الاستخدام. لو `"closed"`، بيتنشأ جديد ويتعمل reset للـ analysers الاتنين.

---

### 🔊 التقاط صوت النظام — `getDisplayMedia`

```js
sysStream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
sysStream.getVideoTracks().forEach(t => t.stop()); // إلغاء الفيديو فوراً — محتاجين الصوت بس
if (sysStream.getAudioTracks().length === 0) {
  // المستخدم ما فعّلش "Share tab audio" — تنبيه وإلغاء
}
```

الـ video tracks بيتطلبهم المتصفح (عشان تظهر نافذة المشاركة) لكن بتتوقف فوراً. التطبيق كمان بيستمع لـ `ended` event على الـ audio track — اللي بيتطلق لما المستخدم يضغط "Stop sharing" في المتصفح — عشان ينظف تلقائياً:

```js
sysStream.getAudioTracks()[0].addEventListener("ended", stopSys);
```

---

### 📉 حساب مستوى الـ dB

عداد الـ dB بيستخدم RMS (Root Mean Square) لـ buffer المجال الزمني، محوّل لـ dB:

```js
function calcDb(timeArr) {
  let s = 0;
  for (let i = 0; i < timeArr.length; i++) {
    const v = timeArr[i] / 128 - 1; // normalize من [0,255] إلى [-1,1]
    s += v * v;
  }
  const rms = Math.sqrt(s / timeArr.length);
  return rms < 0.0001 ? null : Math.round(20 * Math.log10(rms));
}
```

الـ `null` return (صمت) بيظهر كـ `∞` في الواجهة بدلاً من رقم سالب كبير وغير مفيد.

---

### ⌨️ اختصارات لوحة المفاتيح

`M` ← تبدّل الميكروفون. `S` ← تبدّل صوت النظام. الـ handler بيتجاهل لو الـ focus على `INPUT` أو `TEXTAREA`، وبيتجاهل المفاتيح المعدّلة (`Ctrl`، `Meta`، `Alt`).

**🛠️ التقنيات المستخدمة**
`Web Audio API` · `Canvas API` · `ResizeObserver` · `getDisplayMedia` · `localStorage API` · `Inter` · `Tajawal`

</details>

---

<details>
<summary><b>🏠 4. الخطيب - الصفحة الرئيسية — /alkhateeb</b></summary>

<br>

نقطة الدخول الموحدة للنظام الرقمي للمدرسة. كل تفصيلة — من النقاط المحيطية العائمة لحتى تأثير موجة الضغط على الأزرار — مُنفّذة من الصفر.

---

### 🟣 النقاط المحيطية العائمة

خمسة عناصر `<div class="dot">` موضوعة بشكل absolute عبر الصفحة باستخدام inline styles. لكل منها حجم وموقع و`animation-duration` / `animation-delay` مختلف. بتتحرك بـ `floatDot` — loop بسيط لـ translateY — وعندها `pointer-events: none` عشان ما تأثرش على الضغطات:

```css
@keyframes floatDot {
  0%, 100% { transform: translateY(0) scale(1);    }
  50%       { transform: translateY(-15px) scale(1.02); }
}
```

---

### 💧 تأثير الموجة — دقة إحداثيات الضغطة

دالة الموجة بتحسب موقع الضغطة بالضبط نسبةً لـ bounding box الزرار، وبتنشئ `<span>` بحجم يغطي الزرار كله، وتضيفه. بتتعامل مع ثلاثة أنواع input — ضغطة الماوس، اللمس، ولوحة المفاتيح (بترجع للمنتصف):

```js
function addRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  let x = e.clientX ? e.clientX - rect.left
        : e.touches?.length ? e.touches[0].clientX - rect.left
        : rect.width / 2;
  // span بيتنشأ عند (x - size/2, y - size/2)، بحجم يغطي الزرار
  // بيتحرك عبر @keyframes ripple: scale(0) → scale(3.5)، opacity 1 → 0
}
```

الـ ripple span بيتشال من الـ DOM بعد 450ms.

---

### 🔄 Navigation Overlay — آمن مع الـ Back Navigation

لما زرار بوابة يتضغط، `navigateWithRipple()` بيشغّل الموجة، ينتظر 150ms، بعدين يعرض overlay ملء الشاشة مع spinner ونقاط نابضة قبل التنقل. في *الصفحة الوجهة*، `pageshow` event listener بيشيل أي overlay باقي — وده ضروري لأن المتصفحات ممكن تستعيد الـ overlay من الـ bfcache لما المستخدم يضغط Back:

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
<summary><b>📊 5. الخطيب - النتائج — /alkhateeb-results</b></summary>

<br>

بوابة عامة للطلاب وأولياء الأمور للاطلاع على نتائج الامتحانات عبر رقم الطالب أو الاسم.

---

### 🔍 بحث ذكي موحد — كشف تلقائي للوضع

حقل إدخال واحد يخدم الوضعين. `getGrade()` بتتحقق لو الإدخال أرقام فقط:

```js
const isNumeric = /^\d+$/.test(id.trim());
if (!isNumeric) {
  searchByName(id.trim()); // بحث بالاسم
  return;
}
// وإلا: بحث بالرقم → fetch ?id=...
```

مفيش أزرار أو حقول منفصلة. وضع البحث غير مرئي للمستخدم.

---

### 🃏 نتائج البحث بالاسم — Staggered Card Animation

لما بحث الاسم يرجع أكتر من طالب، كل نتيجة بتتعرض كـ card مع CSS animation delay بيتحسب من الـ index:

```js
data.results.forEach((student, index) => {
  const delay = 0.08 * (index + 1);
  html += `<div class="name-card" style="animation-delay: ${delay}s">...`;
});
```

كل card بيعرض اسم الطالب والصف والفصل ورقم الطالب، مع زرار "عرض النتيجة" بيستدعي `selectStudentAndSearch(id)` — بيُدخل الرقم في تدفق البحث الرئيسي.

---

### 🔢 Count-Up Animation — Cubic Easing

كل أرقام الدرجات بتتحرك من 0 لقيمتها النهائية باستخدام loop `requestAnimationFrame` مع cubic ease-out (`1 - (1-p)^3`):

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

المجموع والنسبة المئوية كل منهم بيشتغل count-up مستقل بمدد مختلفة (1000ms و1200ms) لتأثير كشف متدرج.

---

### 🎉 نظام الـ Confetti والـ Emoji المتساقطة

الطلاب الناجحون (≥50%) بيشغّلوا `confetti()` من مكتبة `canvas-confetti` بـ 150 جسيم. الناجح والراسب كلاهما بيشغّل `showEmojis()` — اللي بتنزّل 15 emoji من مواقع أفقية عشوائية بتأخيرات متدرجة:

```js
function showEmojis(isSuccess) {
  const happyEmojis = ["🥳", "😄", "👏", "🏆", "🎉", "😘"];
  const sadEmojis   = ["😥", "😭", "☹️", "😣", "😓"];
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const emoji = document.createElement("div");
      emoji.style.left             = Math.random() * 100 + "vw";
      emoji.style.animationDuration = Math.random() * 3 + 4 + "s";
      // بتتحرك عبر @keyframes floatDown: translateY(0) → translateY(105vh)
    }, i * 150);
  }
}
```

---

### 📸 المشاركة كصورة — `html2canvas` مع Clone Callback

`shareResult()` بتستخدم `html2canvas` لتحويل الـ result card لصورة بضعف الدقة (2×). الـ `onclone` callback — اللي بيشتغل على DOM مستنسخ قبل الالتقاط — بيعمل أشياء حرجة كتير:

```js
onclone: function(clonedDoc) {
  // 1. يُضيف style يوقف كل الـ animations ويجبر opacity:1 على كل شيء
  //    (يمنع العناصر نص المتحركة من الظهور في منتصف حركتها في الصورة)
  noAnimStyle.innerHTML = "* { animation: none !important; opacity: 1 !important; ... }";

  // 2. يضبط عرض ثابت 800px على منطقة الالتقاط (يمنع screenshots بعرض الموبايل)
  clonedArea.style.width = "800px";

  // 3. يظهر export-header وexport-footer المخفيين
  //    (شعارات المدرسة وتصميم المصمم — بتظهر بس في الصورة المُصدّرة)
  clonedDoc.getElementById("export-header").style.display = "block";
  clonedDoc.getElementById("export-footer").style.display = "block";
}
```

على الموبايل اللي يدعم الـ Web Share API، الصورة بتتشارك كـ `File` object عبر `navigator.share({ files: [file] })`. على الديسكتوب (أو المتصفحات الغير داعمة)، بيرجع لرابط تحميل. `shareCount` integer في `localStorage` بيضمن أن كل ملف مُصدَّر له اسم فريد.

---

### 💬 نظام الملاحظات المُدمج

بعد عرض النتيجة، الطلاب يقدروا يبعتوا ملاحظات. الـ form بيظهر في نفس الصفحة (بدون تنقل) ويبعت اسم الطالب والرقم والصف والفصل مع نص الملاحظة للـ backend — بيعطي إدارة المدرسة كل السياق عن المُرسِل. بعد الإرسال الناجح، الـ form بيتستبدل بزرار "ابحث عن طالب آخر".

---

### 👁️ علامة إظهار النتائج

الـ backend يقدر يخفي النتائج بشكل شامل عبر settings sheet. لما `resultsHidden: true` يُرجع، البوابة بتعرض اسم الطالب والصف بس وتستبدل جدول الدرجات برسالة "النتائج غير متاحة بعد" — بدون كشف أي درجات فعلية.

**🛠️ التقنيات المستخدمة**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `html2canvas` · `canvas-confetti`

</details>

---

<details>
<summary><b>✏️ 6. الخطيب - الدرجات — /alkhateeb-degrees</b></summary>

<br>

بوابة إدخال درجات متعددة الخطوات وآمنة للمعلمين. كل تفاعل من تسجيل الدخول للحفظ مُصمَّم لمنع فقدان البيانات والتعامل مع الوصول المتزامن.

---

### 🔐 المصادقة — `localStorage` Token Storage

بعد تسجيل الدخول، السيرفر بيرجع token واسم المعلم. بيتحفظوا في `localStorage` كـ JSON object. في كل تحميل للصفحة، `checkAuth()` بتقرأ هذا الـ object وتقرر أي container تعرض:

```js
function checkAuth() {
  const authData = localStorage.getItem("alkhateeb_auth");
  if (authData) {
    const auth = JSON.parse(authData);
    // عرض الـ main container، وإظهار اسم المعلم، واستعادة المسودة
  } else {
    // عرض الـ login container
  }
}
```

---

### 📝 الحفظ التلقائي للمسودة — `localStorage` Snapshot بصلاحية محدودة

كل ما يغيّر المعلم درجة أو يتنقل بين الصفحات، `saveStateLocally()` بتكتب حالة التطبيق الكاملة في `localStorage`:

```js
const state = {
  grade, section, subject, evaluation,
  students: allStudents, // مصفوفة كاملة مع originalScore والدرجة الحالية
  currentPage, rowsPerPage,
  timestamp: Date.now()
};
localStorage.setItem("alkhateeb_grades_draft", JSON.stringify(state));
```

`restoreStateLocally()` بتقراها عند التحميل وتستعيد الواجهة الكاملة — الـ dropdowns والجدول وكل الدرجات غير المحفوظة. لو الـ `timestamp` المحفوظ أقدم من 8 ساعات، المسودة بتتحذف:

```js
const expirationTime = 8 * 60 * 60 * 1000;
if (!state.timestamp || now - state.timestamp > expirationTime) {
  localStorage.removeItem("alkhateeb_grades_draft");
  return;
}
```

يعني معلم أغلق المتصفح في منتصف الجلسة يقدر يفتحه ويكمل من نفس اللحظة — طالما رجع خلال نفس يوم العمل.

---

### 🔢 تحويل الأرقام العربية

المعلمون ممكن يكتبوا أرقاماً عربية هندية (٠١٢٣٤٥٦٧٨٩) من لوحات المفاتيح العربية. `convertToEnglishNumbers()` بتعوّض كل رقم عربي بمقابله ASCII، بعدين بتشيل أي حروف غير رقمية:

```js
function convertToEnglishNumbers(str) {
  const arabicNumbers = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
  return String(str)
    .replace(/[٠-٩]/g, w => arabicNumbers.indexOf(w))
    .replace(/[^0-9.]/g, "");
}
```

هذا التحويل بيشتغل عند كل ضغطة في `handleScoreInput()`، مما يجعل الـ input لا يهتم بصيغة الكتابة.

---

### 🟩 تمييز الخلايا المُعدَّلة

لما درجة تختلف عن `originalScore` (القيمة الراجعة من السيرفر)، الـ input بياخد border وخلفية خضرا عبر `checkModifiedState()`. لما الدرجة ترجع للقيمة الأصلية، الـ styling الأخضر بيتشال. الـ `suppressGreen` flag بيمنع نتائج العمليات الجماعية (زي "ضع كل الدرجات 90") من إنها تتلون خضرا فردياً، لأنها تغييرات bulk مش بتحتاج تأكيد بصري لكل خلية.

---

### ⌨️ التنقل بـ Enter

`handleEnter()` بتعترض مفتاح Enter على inputs الدرجات. بتلاقي index الـ input الحالي في الـ `.student-score` NodeList، بتتجاوز الـ inputs المعطّلة (الغائبون)، وتنتقل للـ input التالي المتاح. في آخر الصفحة الحالية، بتنتقل تلقائياً للصفحة التالية وتعمل focus على أول input متاح فيها:

```js
if (nextIndex < inputs.length) {
  inputs[nextIndex].focus();
  inputs[nextIndex].select();
} else if (currentPage < totalPages) {
  changePage(1);
  setTimeout(() => { /* focus على أول مُفعَّل في الصفحة الجديدة */ }, 50);
} else {
  saveData(); // آخر طالب في آخر صفحة → حفظ تلقائي
}
```

---

### 💾 الحفظ الذكي — Validation وScroll وDiff

`saveData()` بتشتغل بثلاث مراحل قبل أي طلب للشبكة:

1. **Validation** — بتمسح `allStudents` بحثاً عن أي درجة فاضية. لو لقت، بتمسح فلتر البحث المباشر، وتلاقي صفحة الطالب، وتـscroll للـ input المشكلة، وتلوّنه أحمر.
2. **Diff** — بتفلتر `allStudents` للطلاب اللي `score !== originalScore` بس. بس الـ subset ده بيتبعت للسيرفر.
3. **Label ديناميكي لزرار الحفظ** — نص الزرار بيستخدم صياغة عربية صحيحة للجمع: "طالب واحد"، "طالبان"، "طلاب"، "N طالب".

بعد الحفظ الناجح، الرد من الـ backend فيه ملخص (الصف والفصل والمادة والتقييم والعدد المحفوظ) بيتعرض كرسالة HTML مُنسَّقة.

---

### 📊 قائمة مواد ديناميكية حسب الصف

`subjectsConfig` بيعمل mapping لكل صف من الـ 6 مراحل لـ array من objects للمواد. لما المعلم يختار صف، `populateSubjects()` بتُعيد بناء الـ dropdown كلياً من هذا الـ map. يعني الـ frontend بيطبّق هيكل المنهج الصح بدون round-trip للـ backend.

---

### 🔢 بث الدرجة الجماعية

ميزة الدرجة الجماعية بتسمح بإدخال درجة واحدة وتطبيقها على *الحاضرين* كلهم في عملية واحدة. الطلاب المميّزون بـ غائب (`غ` / `غائب`) بيُستثنوا صراحةً من الإدخال الجماعي:

```js
for (let i = 0; i < allStudents.length; i++) {
  if (allStudents[i].score !== "غ" && allStudents[i].score !== "غائب") {
    allStudents[i].score = cleanedStr;
  }
}
```

كل العمليات الجماعية (تطبيق، مسح الكل، غياب الكل، حضور الكل) بتمر عبر modal التأكيد المخصص قبل التنفيذ.

---

### ⚠️ تحذير التغييرات غير المحفوظة

`beforeunload` event listener بيتحقق لو أي طالب عنده `score !== originalScore`. لو نعم، dialog المتصفح الأصلي "هتغادر الصفحة؟" بيتشغّل:

```js
window.addEventListener("beforeunload", function(e) {
  const hasChanges = allStudents.some(s => s.score !== s.originalScore);
  if (hasChanges) { e.preventDefault(); e.returnValue = ""; }
});
```

زرار تسجيل الخروج برضو بيتحقق من التغييرات غير المحفوظة ويعرض modal التأكيد المخصص لو فيه أي منها.

**🛠️ التقنيات المستخدمة**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `Google Sheets` · `LockService`

</details>

---

<details>
<summary><b>👔 7. الخطيب - الموارد البشرية — /alkhateeb-teachers</b></summary>

<br>

نظام إدارة موارد بشرية بدورين — قيد التطوير النشط حالياً — مع لوحة Admin لتسجيل ومراجعة عمليات الموظفين، ولوحة معلم للإحصائيات الشخصية.

---

### 🔐 المصادقة — `sessionStorage` (مش `localStorage`)

بخلاف بوابة الدرجات، هذا النظام بيستخدم `sessionStorage`. يعني الجلسة بتنتهي تلقائياً لما التاب يُغلق — وده أنسب لبيانات الموارد البشرية. قائمة المعلمين برضو بتتكاش في `sessionStorage` لتجنب إعادة الجلب عند كل تنقل:

```js
sessionStorage.setItem("alkhateeb_hr_auth", JSON.stringify({ token, name, role }));
sessionStorage.setItem("alkhateeb_teachers", JSON.stringify(allTeachers));
```

---

### 👥 لوحة تحكم بدورين

بعد تسجيل الدخول، رد الـ backend فيه حقل `role`. الـ frontend بيعرض container مختلف تماماً بناءً على هذه القيمة — `adminContainer` أو `teacherContainer`. مفيش منطق role على الـ client side غير هذا الـ routing؛ كل العمليات ذات الامتياز بتتحقق منها الـ server باستخدام الـ token.

---

### 🔎 بحث Autocomplete مباشر مع التنقل بلوحة المفاتيح

حقل بحث المعلمين بيستخدم تنفيذ autocomplete مخصص. النتائج بتتفلتر في الوقت الفعلي من قائمة المعلمين المكاشة محلياً. الـ dropdown يدعم التنقل الكامل بلوحة المفاتيح:

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

`document.addEventListener("click")` بيغلق الـ dropdown لما يضغط في أي مكان خارج حقل الإدخال.

---

### ⏱️ حساب التأخير التلقائي

للعمليات المرتبطة بالوقت (التأخير الصباحي والانصراف المبكر وغيره)، الـ form بيعرض time picker. لما يتغير الوقت، `calculateDelay()` بتحلل كلاً من الوقت المختار ووقت بداية عمل المعلم المحدد (محفوظ في `selectedTeacherStart` المخفي) وتحسب الفرق بالدقائق:

```js
let [eh, em] = expectedTime.split(':').map(Number);
let [ah, am] = actualTime.split(':').map(Number);
let diff = (ah * 60 + am) - (eh * 60 + em);
```

زرار "الآن" بيملأ الـ time picker بالوقت الحالي للنظام ويشغّل الحساب فوراً.

---

### 📅 شبكة Checkbox متعددة الأيام

للعمليات الغير مرتبطة بالوقت (الغيابات والإجازات)، الـ admin يقدر يتحول لوضع "أيام متعددة". `generateCheckboxes()` بتبني شبكة checkboxes لكل يوم في النطاق المحدد (أقصاه 60 يوم):

```js
for (let i = 0; i <= diffDays; i++) {
  let currentDate = new Date(startDate);
  currentDate.setDate(startDate.getDate() + i);
  // بينشئ checkbox مُسمّى: "الإثنين (12/5)"
}
```

checkbox "تحديد الكل" الرئيسي بيتزامن مع الـ checkboxes الفردية ويتحدّث لما أي checkbox فردي يتغير.

---

### 📊 حركات رسوم دائرية — SVG `stroke-dasharray`

لوحة المعلم بتستخدم ثلاث رسوم دائرية للتقدم عبر SVG. الحركة بتتحقق بضبط `stroke-dasharray` من `"0, 100"` إلى `"${percentage}, 100"` عبر JavaScript — الـ CSS `transition` على عنصر `circle` بيحرّك التغيير:

```js
function animateCircle(circleId, textId, value, maxVal, suffix) {
  let percentage = Math.min(100, (value / maxVal) * 100);
  setTimeout(() => {
    circle.setAttribute("stroke-dasharray", `${percentage}, 100`);
    text.innerHTML = value + suffix;
  }, 300);
}
```

ثلاث رسوم بتعرض: معدل الحضور (%)، الإجازة السنوية المتبقية (أيام)، وإجمالي دقائق التأخر.

---

### 🗑️ التعديل والحذف الجماعي

جدول السجل يدعم تحديد الصفوف عبر checkboxes. لما صفوف تتحدد، شريط actions جماعي بيظهر مع العدد. الحذف الجماعي بيشتغل في loop `async/await` متسلسل، بينفّذ API call واحد لكل سجل ويجمع الأخطاء:

```js
for (let i = 0; i < boxes.length; i++) {
  const item = JSON.parse(decodeURIComponent(boxes[i].value));
  let res  = await fetch(APPS_SCRIPT_URL, { ... action: "deleteRecord" ... });
  let data = await res.json();
  if (data.status !== "success") hasError = true;
}
```

metadata الصف (التاريخ والاسم والنوع والمقدار) بتتضغط بـ `JSON.stringify` و`encodeURIComponent` في الـ `value` attribute لكل checkbox — بيُلغي الحاجة لـ data store منفصل.

---

### 🔒 Dialog تأكيد مخصص

الـ `window.confirm()` الأصلي بيتستبدل كلياً بـ `customConfirm(msg, callback)` — modal بيقبل callback function بتشتغل بس لما المستخدم يضغط "تأكيد." ده بيوفر styling موحد ويمنع ظهور dialog المتصفح الافتراضي.

**🛠️ التقنيات المستخدمة**
`HTML5` · `CSS3` · `Vanilla JavaScript` · `Google Apps Script` · `Google Sheets`

</details>

---

## 🏗️ معمارية نظام الخطيب

```
mosamirhelal.com/alkhateeb              ← الصفحة الرئيسية (نقطة الدخول)
        │
        ├──► /alkhateeb-results         ← بوابة نتائج الطلاب  ──┐
        │                                                          │  Backend A
        ├──► /alkhateeb-degrees         ← بوابة درجات المعلمين ──┘  (الدرجات والنتائج)
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
        └──► /alkhateeb-teachers        ← بوابة الموارد البشرية  ─── Backend B (نظام HR)
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

## ⚙️ تعمق في الـ Backend

> كلا الـ backends **غير منشورين في هذا الـ repository** لأسباب أمنية. ما يلي تفصيل تقني لما يفعله كل نظام داخلياً.

---

<details>
<summary><b>🔧 Backend A — نظام الدرجات والنتائج</b></summary>

<br>

هذا الـ backend يشغّل كلاً من **بوابة نتائج الطلاب** و**بوابة درجات المعلمين**. بيتعامل مع كل شيء من تهيئة قاعدة البيانات لحتى حفظ الدرجات مع حماية كاملة من التعارض.

---

**📐 مخطط قاعدة البيانات — `setupDatabase()`**

في أول تشغيل، الـ backend بيُنشئ هيكل قاعدة البيانات كاملاً من الصفر داخل Google Sheets. بيُعدّ sheets للدرجات لـ **6 مراحل دراسية** (الثالثة والرابعة والخامسة والسادسة ابتدائي، والأولى والثانية إعدادي)، كل منها بمجموعة مواد فريدة. رؤوس الأعمدة بتتولّد تلقائياً بجمع كل تركيبة من:

- **الشهر** × **نوع الامتحان** × **المادة** → مثلاً `تقييم مارس - عربي`، `امتحان أبريل - رياضيات`

أول 3 أعمدة في كل sheet مُجمّدة: اسم الطالب ورقم الطالب والفصل. كما بينشئ تلقائياً:
- `المستخدمين` — حسابات المعلمين مع اسم المستخدم وكلمة المرور والاسم والحالة والمواد المسموحة
- `سجل الحركات` — سجل audit كامل لكل عملية مع timestamp
- `إعدادات النظام` — لوحة تحكم بـ **dropdown validations** لفلتر الشهر وفلتر نوع الامتحان ومرئية النتائج (إظهار/إخفاء) وعرض الدرجة القصوى في التقارير وفلتر حالة الاكتمال

---

**🌍 تطبيع النص العربي — `normalizeArabic()`**

قبل أي بحث قائم على الاسم، الـ query وكل الأسماء المحفوظة بتمر عبر pipeline للتطبيع:
- كل أشكال الهمزة `أ إ آ` → موحَّدة كـ `ا`
- التاء المربوطة `ة` → `ه`
- الألف المقصورة `ى` → `ي`
- كل التشكيل (علامات التنوين) → تُحذف كلياً

يعني ولي الأمر اللي يبحث عن `محمد` هيلاقي `مُحَمَّد` صح — مش محتاج إملاء دقيق.

---

**🔐 المصادقة والأمان — تدفق `doPost()` لتسجيل الدخول**

1. النظام بيتحقق من أي **قفل نشط للحساب** محفوظ في `ScriptProperties` قبل معالجة أي credentials
2. لو مقفول، بيحسب وقت القفل المتبقي بالدقائق ويُعيده في رسالة الخطأ
3. عند credentials صحيحة، بيُولَّد UUID token ويُحفظ مع **timestamp انتهاء صلاحية 8 ساعات**
4. كل محاولة فاشلة بتزيد عداد؛ عند **5 فشل**، الحساب يتقفل لـ **5 دقائق** والحدث يتكتب في سجل الـ audit
5. بعد تسجيل الدخول الناجح، عداد المحاولات والقفل يتمسحوا
6. الحسابات بحالة غير `نشط` بيتُرفض حتى مع credentials صحيحة

---

**🎓 التفويض على مستوى المادة**

كل API call محمي بيتحقق إن `allowedSubjects` للمعلم المُصادق عليه يغطي المادة المطلوبة. محاولات الوصول غير المصرح به بتتسجّل في سجل الـ audit مع اسم المعلم والمادة اللي حاول الوصول إليها.

---

**💾 حفظ الدرجات — `saveGrades` action مع LockService**

1. **Input validation** — كل درجة بتتفحص: لازم تكون فاضية أو `غ` (غائب) أو رقم بين 0 و100
2. **LockService** — `LockService.getScriptLock()` بانتظار 15 ثانية بيتأمَّن قبل أي كتابة، بيمنع تعارض الكتابة المتزامنة
3. **كشف التغيير** — الـ backend بيقرأ العمود الحالي ويكتب فقط **القيم اللي اتغيرت فعلاً**
4. **كتابة Batch** — القيم المُعدَّلة بتتكتب كعملية range واحدة (`setValues`) مش خلية خلية
5. القفل **بيتحرر دايماً** في `finally` block

---

**📊 بحث نتائج الطلاب — تدفق `doGet()`**

وضعان بناءً على الـ URL parameter:

**بالرقم (`?id=...`):**
- بيتحقق لو النتائج مرئية بشكل شامل عبر إعدادات النظام
- بيقرأ **Max Scores sheet** لمعرفة الدرجات القصوى لكل مادة لكل فصل
- بيطبّق فلترات الشهر ونوع الامتحان من إعدادات النظام
- بيحسب المجموع والدرجة القصوى والنسبة — الغائب درجته بتحسب من القصوى

**بالاسم (`?name=...`):**
- الـ query بيتطبّع عبر `normalizeArabic()` أولاً
- بيرجع أقصاه 10 نتائج؛ أكتر من 10 بيطلب إدخال أدق (بيمنع الـ enumeration)

---

**🔁 تنظيف التوكن التلقائي — `cleanExpiredTokens()`**

trigger زمني بيشتغل كل **6 ساعات**، بيمسح كل مفاتيح `ScriptProperties` اللي بتبدأ بـ `token_` وصلاحيتها انتهت — بيمنع نمو store الـ properties بشكل غير محدود.

</details>

---

<details>
<summary><b>🔧 Backend B — نظام الموارد البشرية والحضور</b></summary>

<br>

هذا الـ backend يشغّل **بوابة الموارد البشرية** بنظام بدورين، ومحرك حضور غني، وطبقة تقارير مُجمَّعة مسبقاً مبنية على formulas حية في Google Sheets.

---

**👥 مصادقة بدورين**

دورين مختلفان بلوحتي تحكم مختلفتان كلياً:
- **Admin** — يقدر يشوف كل المعلمين ويسجّل العمليات ويحرّر/يحذف السجلات ويولّد التقارير
- **معلم** — يقدر يشوف إحصائياته الشخصية وسجله الشخصي بس

صلاحية الـ token هنا **12 ساعة** (مقابل 8 ساعات في Backend A)، لأن عمليات الموارد البشرية ممكن تمتد ليوم عمل كامل.

---

**🗓️ تطبيع التاريخ — `forceStringDate()`**

بيتعامل مع مشكلة timezone في Google Sheets:
- JavaScript `Date` objects بياخدوا **+12 ساعة** قبل الصياغة — تعويضاً للـ UTC midnight shift
- تواريخ بصيغة string `dd/mm/yyyy` بتتحوّل لـ `yyyy-mm-dd` لترتيب ISO متسق

---

**📝 تسجيل الحضور — Batch API**

بتقبل **مصفوفة سجلات** في استدعاء واحد (لما الـ admin يستخدم شبكة الـ checkbox متعددة الأيام). الرقم القومي بيتجلب من السيرفر عبر كود المعلم — مش بيتبعت من الـ frontend أبداً.

---

**✏️ تعديل السجل — Bottom-Up Fingerprint Matching**

إيجاد الصف الصح بدون كشف رقم الصف بيستخدم **multi-field fingerprint**: الـ backend بيمسح operations sheet **من أسفل لفوق** ويطابق صف بيوم + شهر + سنة + اسم المعلم + نوع العملية + المقدار. بس `type` و`amount` و`notes` بيتحدثوا — التاريخ وحقول الـ admin غير قابلة للتغيير.

---

**📈 بناء التقارير المُجمَّعة — `setupAggregatedReports()`**

بدلاً من حساب الإحصائيات وقت الاستعلام، هذه الدالة بتبني **sheet formulas حية** لمرة واحدة. لكل معلم، بتضيف صفوف بـ **SUMIFS formulas ديناميكية** لكل 9 أنواع عمليات. كل ما يتضاف سجل جديد لـ operations sheet، كل الأرقام المُجمَّعة بتتحدث فوراً عبر محرك formulas الأصلي في Google Sheets — بدون أي إعادة حساب من الـ backend.

</details>

---

## 🔒 معمارية الأمان

| الميزة | Backend A (الدرجات) | Backend B (الموارد البشرية) |
|--------|--------------------|-----------------------------|
| **طريقة المصادقة** | Token عبر UUID | Token عبر UUID |
| **انتهاء صلاحية الـ Token** | 8 ساعات | 12 ساعة |
| **التخزين على الـ Client** | `localStorage` | `sessionStorage` |
| **حماية من Brute Force** | ✅ 5 محاولات → قفل 5 دقائق | — |
| **نظام الصلاحيات** | على مستوى المادة لكل معلم | دور Admin / معلم |
| **حماية الكتابة المتزامنة** | ✅ LockService (انتظار 15 ثانية) | — |
| **تسجيل الوصول غير المصرح** | ✅ سجل audit كامل | ✅ سجل audit كامل |
| **التحكم في مرئية النتائج** | ✅ تشغيل/إيقاف عن بُعد عبر settings sheet | — |
| **تنظيف الـ Token التلقائي** | ✅ كل 6 ساعات عبر trigger | ✅ عند كل طلب |
| **حجب طلبات GET** | جزئي (النتائج العامة عبر GET) | ✅ حجب كامل — يُعيد 403 |
| **منع XSS** | ✅ `escapeHTML()` على كل محتوى المستخدم | ✅ `escapeHTML()` على كل محتوى المستخدم |
| **كود المصدر منشور** | ❌ خاص (لأسباب أمنية) | ❌ خاص (لأسباب أمنية) |

---

## 🤖 الـ Tech Stack والأدوات

<div align="center">

**أدوات الذكاء الاصطناعي**

<img src="https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white" />
<img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white" />
<img src="https://img.shields.io/badge/Claude-D9795C?style=for-the-badge&logo=anthropic&logoColor=white" />

**Frontend**

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />

**APIs والمتصفح**

<img src="https://img.shields.io/badge/Web_Audio_API-FF6B6B?style=for-the-badge&logo=googlechrome&logoColor=white" />
<img src="https://img.shields.io/badge/Canvas_API-9B59B6?style=for-the-badge&logo=googlechrome&logoColor=white" />
<img src="https://img.shields.io/badge/html2canvas-E67E22?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/canvas--confetti-F1C40F?style=for-the-badge&logo=javascript&logoColor=black" />

**الـ Backend والبيانات**

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Google_Apps_Script-4285F4?style=for-the-badge&logo=google&logoColor=white" />
<img src="https://img.shields.io/badge/Google_Sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white" />

**الاستضافة**

<img src="https://img.shields.io/badge/GitHub_Pages-181717?style=for-the-badge&logo=github&logoColor=white" />

</div>

---

## 📁 هيكل الـ Repository

```
mosamirhelal.github.io/
│
├── 📄 index.html                        ← الموقع الشخصي (mosamirhelal.com)
├── 🌐 CNAME                             ← إعداد الدومين المخصص
├── 📱 site.webmanifest                  ← PWA manifest
├── 🖼️ favicon.ico / .svg                ← Favicons
├── 🖼️ favicon-96x96.png                 ← Favicon (96px)
├── 🖼️ apple-touch-icon.png              ← أيقونة لمس iOS
├── 🖼️ web-app-manifest-192x192.png      ← PWA icon (192px)
├── 🖼️ web-app-manifest-512x512.png      ← PWA icon (512px)
├── 🌙 dark.webp                         ← صورة الـ hero في الوضع الداكن
├── ☀️ light.webp                        ← صورة الـ hero في الوضع الفاتح
├── 👤 profile.webp                      ← صورة الملف الشخصي
│
├── 📂 motasks/                          ← متتبع المهام الدراسية
│   └── index.html
│
├── 📂 audiomonitor/                     ← مراقب الصوت داخل المتصفح
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
├── 📂 alkhateeb-degrees/                ← بوابة درجات المعلمين
│   ├── index.html
│   ├── logo_1.webp
│   ├── logo_2.webp
│   └── logo_3.webp
│
└── 📂 alkhateeb-teachers/               ← بوابة الموارد البشرية
    ├── index.html
    ├── logo_1.webp
    ├── logo_2.webp
    └── logo_3.webp
```

> **ملاحظة:** كود المصدر للـ backend الخاص بنظام الخطيب غير مُدرَج في هذا الـ repository عمداً لأسباب أمنية. كلا الـ Google Apps Script backends منشوران كـ web apps خاصة.

---

## 📬 التواصل

<div align="center">

### `@mosamirhelal` — في كل مكان

<p>
<a href="https://mosamirhelal.com" target="_blank">
  <img src="https://img.shields.io/badge/🌐 الموقع-mosamirhelal.com-2ea44f?style=for-the-badge" />
</a>
<a href="mailto:mosamirhelal@outlook.com" target="_blank">
  <img src="https://img.shields.io/badge/📧 البريد-mosamirhelal@outlook.com-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" />
</a>
</p>

> جميع روابط السوشيال متاحة عبر الـ drawer في [**mosamirhelal.com**](https://mosamirhelal.com) — أكثر من 20 منصة في مكان واحد.

</div>

---

## 🏆 الفضل والتقدير

<div align="center">

**التصميم والتطوير** — محمد سمير هلال

*كل المشاريع في هذا الـ repository — الواجهات الأمامية ومعمارية الـ backend ومخطط قاعدة البيانات وأنظمة الأمان وتجربة المستخدم — صمّمها وبناها محمد سمير هلال بالكامل.*

---

<sub>© 2026 محمد سمير هلال · جميع المشاريع تعمل على GitHub Pages · صُنع بـ ❤️ في القاهرة، مصر</sub>

</div>