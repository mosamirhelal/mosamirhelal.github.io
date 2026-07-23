const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyKm4X7PVe4hHNZs6PyO3X0FTHSJTpN-JCAG9z0hRBW1KSJZUYa3qqAnIEFiqxIArFBmw/exec";
let activeGrade = "";
let isLoading = false;
let confettiFired = false;
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    if (document.querySelector('script[src="' + src + '"]')) {
      resolve();
      return;
    }
    var s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str).replace(/[&<>'"]/g, function (tag) {
    const charsToReplace = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return charsToReplace[tag] || tag;
  });
}
fetch("https://api.counterapi.dev/v1/alkhateeb_school/visits/up")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    document.getElementById("visitCount").innerText =
      data.count.toLocaleString("ar-EG");
  })
  .catch(function () {
    document.querySelector(".visit-counter").style.display = "none";
  });
function countUp(el, target, duration, decimals) {
  if (decimals === undefined) decimals = 0;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = eased * target;
    el.innerText = val.toFixed(decimals);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
function showEmojis() {
  const emojisToUse = ["🥇", "🏆", "⭐", "🎉", "👏", "🌟", "🎓"];
  for (let i = 0; i < 15; i++) {
    setTimeout(function () {
      const emoji = document.createElement("div");
      emoji.classList.add("falling-emoji");
      emoji.innerText =
        emojisToUse[Math.floor(Math.random() * emojisToUse.length)];
      emoji.style.left = Math.random() * 100 + "vw";
      emoji.style.animationDuration = Math.random() * 3 + 4 + "s";
      document.body.appendChild(emoji);
      emoji.addEventListener("animationend", function () {
        emoji.remove();
      });
    }, i * 150);
  }
}
function addRipple(e, btn) {
  var rect = btn.getBoundingClientRect();
  var clientX =
    e.clientX !== undefined
      ? e.clientX
      : e.touches && e.touches[0]
        ? e.touches[0].clientX
        : rect.left + rect.width / 2;
  var clientY =
    e.clientY !== undefined
      ? e.clientY
      : e.touches && e.touches[0]
        ? e.touches[0].clientY
        : rect.top + rect.height / 2;
  var x = clientX - rect.left;
  var y = clientY - rect.top;
  var size = Math.max(rect.width, rect.height) * 1.6;
  var span = document.createElement("span");
  span.className = "ripple-span";
  span.style.width = span.style.height = size + "px";
  span.style.left = x - size / 2 + "px";
  span.style.top = y - size / 2 + "px";
  btn.appendChild(span);
  setTimeout(function () {
    if (span.parentNode) span.remove();
  }, 700);
}
document.getElementById("gradeSelect").addEventListener("change", function () {
  activeGrade = this.value;
  document.getElementById("showTopBtn").disabled = !activeGrade;
  document.getElementById("top10Result").innerHTML = "";
  confettiFired = false;
});
document.getElementById("showTopBtn").addEventListener("click", function (e) {
  addRipple(e, this);
});
function toggleInputs(disabled) {
  document.getElementById("gradeSelect").disabled = disabled;
  document.getElementById("showTopBtn").disabled = disabled;
}
function fetchTop10() {
  activeGrade = document.getElementById("gradeSelect").value;
  if (!activeGrade) return;
  if (isLoading) return;
  isLoading = true;
  const resultDiv = document.getElementById("top10Result");
  const loader = document.getElementById("loader");
  const showBtn = document.getElementById("showTopBtn");
  const btnText = showBtn.querySelector(".btn-text");
  resultDiv.innerHTML = "";
  loader.style.display = "block";
  toggleInputs(true);
  showBtn.classList.remove("pulse-button");
  btnText.innerText = "⏳ جاري البحث...";
  fetch(SCRIPT_URL + "?grade=" + encodeURIComponent(activeGrade))
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      isLoading = false;
      loader.style.display = "none";
      toggleInputs(false);
      showBtn.classList.add("pulse-button");
      btnText.innerText = "🏅 عرض العشرة الأوائل";
      if (data.status !== "success") {
        resultDiv.innerHTML =
          "<div class='error-msg'>" + escapeHTML(data.message) + "</div>";
      } else {
        renderTop10Cards(data.students, activeGrade);
      }
    })
    .catch(function () {
      isLoading = false;
      loader.style.display = "none";
      toggleInputs(false);
      showBtn.classList.add("pulse-button");
      btnText.innerText = "🏅 عرض العشرة الأوائل";
      resultDiv.innerHTML =
        "<div class='error-msg'>حدث خطأ في الاتصال. تأكد من اتصالك بالإنترنت.</div>";
    });
}
function renderTop10Cards(students, gradeName) {
  const resultDiv = document.getElementById("top10Result");
  if (!students || students.length === 0) {
    resultDiv.innerHTML =
      "<div class='error-msg'>لا توجد بيانات كافية لعرض الأوائل</div>";
    return;
  }
  const dateStr = new Date().toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const shareLabel = "تحميل الصورة";
  let html =
    "<div id='capture-area' style='animation: slideInUp 0.5s ease-out forwards;'>" +
    "<div id='export-header' style='display: none;'>" +
    "<div style='display: flex; justify-content: center; align-items: center; margin-bottom: 25px; width: 100%; gap: 30px;'>" +
    "<img src='images/logo_2.webp' style='height: 140px; width: auto; object-fit: contain;' />" +
    "<img src='images/logo_1.webp' style='height: 140px; width: auto; object-fit: contain;' />" +
    "</div>" +
    "<h4 style='color: #4a4e69; margin-top: 0; margin-bottom: 25px; border-bottom: 2px dashed #eee; padding-bottom: 15px; font-size: 22px;'>مدرسة الشهيد محمود علي الخطيب الرسمية للغات</h4>" +
    "</div>" +
    "<h3 style='color:#0056b3; font-size:22px; font-weight:800; margin-top:10px; margin-bottom:5px;'>🏆 العشرة الأوائل - " +
    escapeHTML(gradeName) +
    "</h3>" +
    "<p style='color:#4a4e69; font-size:14px; margin-top:0; margin-bottom:20px;'>" +
    escapeHTML(dateStr) +
    "</p>" +
    "<div id='cards-container'>";
  students.forEach(function (student, index) {
    var rank = parseInt(student.rank);
    var rankClass = rank >= 1 && rank <= 10 ? "rank-" + rank : "rank-10";
    var badgeContent = String(rank);
    if (rank === 1) {
      badgeContent =
        "<div style='font-size:20px;line-height:1.1;'>👑</div><div>" +
        rank +
        "</div>";
    } else if (rank === 2) {
      badgeContent =
        "<div style='font-size:17px;line-height:1.1;'>🥈</div><div>" +
        rank +
        "</div>";
    } else if (rank === 3) {
      badgeContent =
        "<div style='font-size:17px;line-height:1.1;'>🥉</div><div>" +
        rank +
        "</div>";
    }
    const safeName = escapeHTML(student.name);
    const safeId = escapeHTML(student.id);
    const delay = 0.08 * index;
    const glowDelay = index * 0.15;
    let scoreDetailHtml = "";
    if (
      student.totalScore &&
      student.totalMax &&
      student.totalScore !== "" &&
      student.totalMax !== ""
    ) {
      scoreDetailHtml =
        "<div class='rank-score-detail'>" +
        "<span class='rank-score-detail-num'>" +
        escapeHTML(student.totalScore) +
        "</span>" +
        "<span class='rank-score-detail-sep'> / </span>" +
        "<span class='rank-score-detail-max'>" +
        escapeHTML(student.totalMax) +
        "</span>" +
        "<div class='rank-score-detail-label'>الدرجة الكلية</div>" +
        "</div>";
    }
    html +=
      "<div class='rank-card-wrapper'>" +
      "<div class='rank-card " +
      rankClass +
      "' style='--anim-delay: " +
      delay +
      "s; animation-delay: " +
      delay +
      "s, " +
      glowDelay +
      "s;'>" +
      "<div class='laurel-r'></div><div class='laurel-l'></div>" +
      "<div class='glass-shimmer'></div>" +
      "<div class='rank-badge'>" +
      badgeContent +
      "</div>" +
      "<div class='rank-info'>" +
      "<p class='rank-name-text'>" +
      safeName +
      "</p>" +
      (student.id
        ? "<p class='rank-id-text'>رقم الطالب: " + safeId + "</p>"
        : "") +
      "</div>" +
      "<div class='rank-score-block'>" +
      "<div class='rank-score-num'><span class='anim-perc' data-val='" +
      student.percentage +
      "'>0</span><span class='rank-score-sym'>%</span></div>" +
      "<div class='rank-score-label'>النسبة المئوية</div>" +
      scoreDetailHtml +
      "</div>" +
      "</div>" +
      "</div>";
  });
  html +=
    "</div>" +
    "<div id='export-footer' style='display: none; margin-top: 30px; font-size: 16px; color: #4a4e69; text-align: center; font-weight: bold; border-top: 2px solid #eee; padding-top: 15px;'>تصميم وتنفيذ : سمير هلال</div>" +
    "</div>" +
    "<button id='shareBtn' class='share-btn' style='margin-top:15px; animation: slideInUp 0.8s ease-out;' onclick='shareResult(\"" +
    escapeHTML(gradeName) +
    "\")'>" +
    "<span class='btn-text'>" +
    shareLabel +
    "</span>" +
    "</button>" +
    "<button id='resetBtn' class='reset-btn' style='margin-top:12px; animation: slideInUp 0.8s ease-out;' onclick='resetPage()'>" +
    "<span class='btn-text'>🔄 اختيار صف آخر</span>" +
    "</button>";
  resultDiv.innerHTML = html;
  var shareBtn = document.getElementById("shareBtn");
  var resetBtn = document.getElementById("resetBtn");
  if (shareBtn)
    shareBtn.addEventListener("click", function (e) {
      addRipple(e, this);
    });
  if (resetBtn)
    resetBtn.addEventListener("click", function (e) {
      addRipple(e, this);
    });
  setTimeout(function () {
    var animElements = document.querySelectorAll(".anim-perc");
    animElements.forEach(function (el, i) {
      var val = parseFloat(el.getAttribute("data-val"));
      setTimeout(function () {
        if (el && document.body.contains(el)) {
          countUp(el, val, 1200, val % 1 !== 0 ? 2 : 0);
        }
      }, i * 80);
    });
  }, 200);
  setTimeout(async function () {
    if (!confettiFired) {
      try {
        await loadScript(
          "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js",
        );
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.5 },
          zIndex: 9999,
        });
        showEmojis();
        confettiFired = true;
      } catch (e) {}
    }
  }, 400);
  setTimeout(function () {
    window.scrollTo({
      top: document.getElementById("top10Result").offsetTop - 20,
      behavior: "smooth",
    });
  }, 200);
}
async function shareResult(gradeName) {
  var captureDiv = document.getElementById("capture-area");
  var shareBtn = document.getElementById("shareBtn");
  var btnText = shareBtn.querySelector(".btn-text");
  var targetLabel = "تحميل الصورة";
  btnText.innerText = "جاري تحضير الصورة...";
  shareBtn.disabled = true;
  try {
    await document.fonts.ready;
    await loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
    );
    const canvas = await html2canvas(captureDiv, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      windowWidth: 900,
      onclone: function (clonedDoc) {
        var freezeStyle = clonedDoc.createElement("style");
        freezeStyle.innerHTML =
          "* { animation: none !important; transition: none !important; } .rank-card { opacity: 1 !important; transform: none !important; transform-style: flat !important; } .rank-card-wrapper { perspective: none !important; transform-style: flat !important; overflow: visible !important; } .rank-badge { transform: none !important; } .rank-name-text { opacity: 1 !important; transform: none !important; letter-spacing: normal !important; } #capture-area { opacity: 1 !important; } .glass-shimmer { display: none !important; }";
        clonedDoc.head.appendChild(freezeStyle);
        var clonedArea = clonedDoc.getElementById("capture-area");
        clonedArea.style.width = "800px";
        clonedArea.style.maxWidth = "none";
        clonedArea.style.padding = "40px";
        clonedArea.style.margin = "0 auto";
        clonedArea.style.overflow = "visible";
        clonedDoc.getElementById("export-header").style.display = "block";
        clonedDoc.getElementById("export-footer").style.display = "block";
        clonedDoc.querySelectorAll(".rank-card-wrapper").forEach(function (w) {
          w.style.overflow = "visible";
          w.style.borderRadius = "14px";
        });
        var textFixStyle = clonedDoc.createElement("style");
        textFixStyle.innerHTML =
          ".rank-name-text { background: none !important; -webkit-background-clip: unset !important; background-clip: unset !important; -webkit-text-fill-color: initial !important; } .rank-1 .rank-name-text { color: #78350f !important; } .rank-2 .rank-name-text { color: #0f172a !important; } .rank-3 .rank-name-text { color: #7c2d12 !important; } .rank-4 .rank-name-text { color: #1e1b4b !important; } .rank-5 .rank-name-text { color: #1e3a8a !important; } .rank-6 .rank-name-text { color: #164e63 !important; } .rank-7 .rank-name-text { color: #064e3b !important; } .rank-8 .rank-name-text { color: #2e1065 !important; } .rank-9 .rank-name-text { color: #881337 !important; } .rank-10 .rank-name-text { color: #334155 !important; }";
        clonedDoc.head.appendChild(textFixStyle);
        clonedDoc.querySelectorAll(".anim-perc").forEach(function (el) {
          el.innerText = el.getAttribute("data-val");
        });
      },
    });
    const blob = await new Promise(function (resolve) {
      canvas.toBlob(resolve, "image/png");
    });
    const fileName = "أوائل_" + gradeName + ".png";
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    btnText.innerText = "تم التحميل بنجاح";
    setTimeout(function () {
      btnText.innerText = targetLabel;
      shareBtn.disabled = false;
    }, 5000);
  } catch (error) {
    btnText.innerText = targetLabel;
    shareBtn.disabled = false;
    alert("حدث خطأ أثناء تحضير الصورة");
  }
}
function resetPage() {
  document.getElementById("top10Result").innerHTML = "";
  document.getElementById("gradeSelect").value = "";
  document.getElementById("gradeSelect").disabled = false;
  document.getElementById("showTopBtn").disabled = true;
  activeGrade = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.getElementById("showTopBtn").classList.add("pulse-button");
}
