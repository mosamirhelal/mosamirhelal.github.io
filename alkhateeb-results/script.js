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
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("visitCount").innerText =
      data.count.toLocaleString("ar-EG");
  })
  .catch(() => {
    document.getElementById("visitCount").innerText = "-";
  });

document
  .getElementById("studentIdInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const btn = document.getElementById("searchBtn");
      addRipple(event, btn);
      getGrade();
    }
  });

function addRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  let x, y;
  if (e.clientX !== undefined && e.clientX !== 0) {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  } else if (e.touches && e.touches.length > 0) {
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  } else {
    x = rect.width / 2;
    y = rect.height / 2;
  }
  const size = Math.max(rect.width, rect.height);
  const span = document.createElement("span");
  span.className = "ripple-span";
  span.style.width = span.style.height = size + "px";
  span.style.left = x - size / 2 + "px";
  span.style.top = y - size / 2 + "px";
  btn.appendChild(span);
  setTimeout(() => span.remove(), 600);
}

function countUp(el, target, duration, suffix, decimals = 0) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = eased * target;
    el.innerText =
      (decimals > 0 ? val.toFixed(decimals) : Math.round(val)) + (suffix || "");
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function showEmojis(isSuccess) {
  const happyEmojis = ["🥳", "😄", "👏", "🏆", "🎉", "😘"];
  const sadEmojis = ["😥", "😭", "☹️", "😣", "😓"];
  const emojisToUse = isSuccess ? happyEmojis : sadEmojis;
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const emoji = document.createElement("div");
      emoji.classList.add("falling-emoji");
      emoji.innerText =
        emojisToUse[Math.floor(Math.random() * emojisToUse.length)];
      emoji.style.left = Math.random() * 100 + "vw";
      emoji.style.animationDuration = Math.random() * 3 + 4 + "s";
      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), 7000);
    }, i * 150);
  }
}

function toggleFeedbackForm() {
  document.getElementById("showFeedbackBtn").style.display = "none";
  var formContainer = document.getElementById("feedbackFormContainer");
  formContainer.style.display = "block";
  formContainer.style.animation = "fadeIn 0.5s ease-out forwards";
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    document.getElementById("feedbackInput").focus();
  }, 100);
}

function resetSearch() {
  document.getElementById("result").innerHTML = "";
  document.getElementById("nameSearchResults").innerHTML = "";
  var natIdInput = document.getElementById("studentIdInput");
  natIdInput.value = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => natIdInput.focus(), 500);
}

function sendFeedback(studentName, studentId, studentGrade, studentSection) {
  var feedbackText = document.getElementById("feedbackInput").value;
  var btn = document.getElementById("submitFeedbackBtn");
  var btnText = btn.querySelector(".btn-text");
  var statusMsg = document.getElementById("feedbackStatus");
  var feedbackTitle = document.getElementById("feedbackTitle");

  if (!feedbackText.trim()) {
    statusMsg.innerHTML =
      "<span style='color: red;'>الرجاء كتابة رأيك أولاً.</span>";
    return;
  }

  btn.disabled = true;
  btnText.innerText = "⏳ جاري الإرسال...";
  statusMsg.innerHTML = "";

  var url =
    "https://script.google.com/macros/s/AKfycbx8JBu5aQKAf3cKN9kEss8RiFHoW9DiqbgSlLO3JiIRxtXEzsJh3MU1sgIU2cVPP-rNkw/exec";

  var payload = {
    action: "submitFeedback",
    studentName: studentName,
    studentId: studentId,
    studentGrade: studentGrade,
    studentSection: studentSection,
    feedbackText: feedbackText,
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        btnText.innerText = "✅ تم الإرسال بنجاح!";
        statusMsg.innerHTML =
          "<span style='color: green;'>شكراً لك! تم إرسال رسالتك للإدارة.</span>";
        setTimeout(() => {
          btn.style.display = "none";
          feedbackTitle.style.display = "none";
          document.getElementById("feedbackInput").style.display = "none";
          statusMsg.innerHTML =
            "<span style='color: green; display: block; margin-bottom: 15px;'>شكراً لك! تم إرسال رسالتك للإدارة.</span>" +
            "<button class='form-control' style='background-color: #890620; color: white;' onclick='addRipple(event,this); resetSearch()'><span class='btn-text'>🔄 للبحث عن نتيجة طالب آخر</span></button>";
        }, 1500);
      } else {
        throw new Error("فشل الحفظ");
      }
    })
    .catch(() => {
      btn.disabled = false;
      btnText.innerText = "📨 إرسال الاقتراح";
      statusMsg.innerHTML =
        "<span style='color: red;'>حدث خطأ، يرجى المحاولة لاحقاً.</span>";
    });
}

async function shareResult(studentName) {
  var captureDiv = document.getElementById("capture-area");
  var shareBtn = document.getElementById("shareBtn");
  var btnText = shareBtn.querySelector(".btn-text");
  var originalText = btnText.innerText;

  btnText.innerText = "⏳ جاري تحضير الصورة...";
  shareBtn.disabled = true;

  try {
    const canvas = await html2canvas(captureDiv, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY,
      onclone: function (clonedDoc) {
        var noAnimStyle = clonedDoc.createElement("style");
        noAnimStyle.innerHTML =
          "* { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }";
        clonedDoc.head.appendChild(noAnimStyle);
        var clonedArea = clonedDoc.getElementById("capture-area");
        clonedArea.style.width = "800px";
        clonedArea.style.maxWidth = "none";
        clonedArea.style.padding = "40px";
        clonedArea.style.margin = "0 auto";
        clonedArea.style.overflow = "visible";
        clonedDoc.getElementById("export-header").style.display = "block";
        clonedDoc.getElementById("export-footer").style.display = "block";
      },
    });

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );
    let count = parseInt(localStorage.getItem("shareCount") || "0") + 1;
    localStorage.setItem("shareCount", count);
    const fileName = `نتيجة_${studentName}_${count}.png`;
    const file = new File([blob], fileName, { type: "image/png" });
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (
      isMobile &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      try {
        await navigator.share({
          title: `نتيجة ${studentName}`,
          text: `نتيجة الطالب ${studentName} - مدرسة الشهيد محمود علي الخطيب`,
          files: [file],
        });
      } catch (err) {}
      btnText.innerText = originalText;
      shareBtn.disabled = false;
    } else {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      shareBtn.style.backgroundColor = "#28a745";
      btnText.innerText = "✅ تم مشاركة الصورة بنجاح!";
      setTimeout(() => {
        shareBtn.style.backgroundColor = "";
        btnText.innerText = originalText;
        shareBtn.disabled = false;
      }, 5000);
    }
  } catch (error) {
    btnText.innerText = originalText;
    shareBtn.disabled = false;
    alert("حدث خطأ أثناء تحضير الصورة");
  }
}

function selectStudentAndSearch(studentId) {
  var idInput = document.getElementById("studentIdInput");
  idInput.value = studentId;
  getGrade();
}

function searchByName(nameQuery) {
  var idInput = document.getElementById("studentIdInput");
  var resultDiv = document.getElementById("result");
  var nameSearchResultsDiv = document.getElementById("nameSearchResults");
  var loader = document.getElementById("loader");
  var searchBtn = document.getElementById("searchBtn");
  var searchBtnText = searchBtn.querySelector(".btn-text");

  resultDiv.innerHTML = "";
  nameSearchResultsDiv.innerHTML = "";

  idInput.blur();
  loader.style.display = "block";
  searchBtn.disabled = true;
  idInput.disabled = true;
  searchBtn.classList.remove("pulse-button");
  searchBtnText.innerText = "⏳ جاري البحث...";

  var url =
    "https://script.google.com/macros/s/AKfycbx8JBu5aQKAf3cKN9kEss8RiFHoW9DiqbgSlLO3JiIRxtXEzsJh3MU1sgIU2cVPP-rNkw/exec?name=" +
    encodeURIComponent(nameQuery);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        var html = "";
        data.results.forEach((student, index) => {
          var delay = 0.08 * (index + 1);
          var safeName = escapeHTML(student.name);
          var safeGrade = escapeHTML(student.grade);
          var safeSection = escapeHTML(student.section);
          var safeId = escapeHTML(student.id);

          html += `
                  <div class="name-card" style="animation-delay: ${delay}s">
                    <p class="name-card-title">${safeName}</p>
                    <p class="name-card-subtitle">الصف: ${safeGrade} | الفصل: ${safeSection}</p>
                    <p class="name-card-id">رقمك هو: ${safeId}</p>
                    <button class="form-control name-card-btn" onclick="addRipple(event,this); selectStudentAndSearch('${safeId}')">
                      <span class="btn-text">📊 عرض النتيجة</span>
                    </button>
                  </div>
                `;
        });
        nameSearchResultsDiv.innerHTML = html;
      } else {
        nameSearchResultsDiv.innerHTML = `<div style='color:red; margin-top:15px; font-weight:bold;' class='student-info-appear'>${escapeHTML(
          data.message,
        )}</div>`;
      }
      setTimeout(() => {
        window.scrollTo({
          top: nameSearchResultsDiv.offsetTop - 20,
          behavior: "smooth",
        });
      }, 200);
    })
    .catch(() => {
      nameSearchResultsDiv.innerHTML =
        "<div style='color:red; margin-top:15px;' class='student-info-appear'>حدث خطأ في الاتصال بقاعدة البيانات. تأكد من اتصالك بالإنترنت.</div>";
    })
    .finally(() => {
      loader.style.display = "none";
      searchBtn.disabled = false;
      idInput.disabled = false;
      searchBtn.classList.add("pulse-button");
      searchBtnText.innerText = "🔎 بحث";
    });
}

function getGrade() {
  var idInput = document.getElementById("studentIdInput");
  var id = idInput.value;
  var resultDiv = document.getElementById("result");
  var nameSearchResultsDiv = document.getElementById("nameSearchResults");
  var loader = document.getElementById("loader");
  var searchBtn = document.getElementById("searchBtn");
  var searchBtnText = searchBtn.querySelector(".btn-text");

  resultDiv.innerHTML = "";
  nameSearchResultsDiv.innerHTML = "";

  if (!id) {
    resultDiv.innerHTML =
      "<div style='color:red; margin-top:15px;' class='student-info-appear'>الرجاء إدخال رقم الطالب أو الاسم أولاً</div>";
    return;
  }

  const isNumeric = /^\d+$/.test(id.trim());
  if (!isNumeric) {
    searchByName(id.trim());
    return;
  }

  idInput.blur();

  loader.style.display = "block";
  searchBtn.disabled = true;
  idInput.disabled = true;
  searchBtn.classList.remove("pulse-button");
  searchBtnText.innerText = "⏳ جاري البحث...";

  var url =
    "https://script.google.com/macros/s/AKfycbx8JBu5aQKAf3cKN9kEss8RiFHoW9DiqbgSlLO3JiIRxtXEzsJh3MU1sgIU2cVPP-rNkw/exec?id=" +
    encodeURIComponent(id);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";
      searchBtn.disabled = false;
      idInput.disabled = false;
      searchBtn.classList.add("pulse-button");
      searchBtnText.innerText = "🔎 بحث";

      if (data.status === "success") {
        if (data.resultsHidden === true) {
          resultDiv.innerHTML = `
                  <div class="student-info-appear">
                    <div id="capture-area">
                      <h3 class="student-name">الاسم: ${escapeHTML(
                        data.name,
                      )}</h3>
                      <h4 style="color: #0056b3; margin-top: 0;">الصف: ${escapeHTML(
                        data.grade,
                      )}</h4>
                      <div class="status-message fail-message" style="margin-top: 20px;">
                        ⏳ ${escapeHTML(data.message)}
                      </div>
                    </div>
                  </div>`;
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }, 200);
          return;
        }

        var numericPerc = parseFloat(data.percentage);
        var totalDisplay = !isNaN(parseFloat(data.total))
          ? `<span id="totalNum">0</span>`
          : escapeHTML(data.total);

        let barColor = "#0056b3";
        if (!isNaN(numericPerc)) {
          barColor = numericPerc >= 50 ? "#008000" : "#b23a48";
        }

        var statusMessageHtml = "";
        if (!isNaN(numericPerc)) {
          if (numericPerc >= 50) {
            statusMessageHtml = `<div class="status-message congrats-message">تتقدم إدارة مدرسة الشهيد محمود علي الخطيب بخالص التهاني بالنجاح والتفوق 🏆</div>`;
          } else {
            statusMessageHtml = `<div class="status-message fail-message">حظ أوفر، نتمنى منك أن تجتهد أكثر في المرة القادمة</div>`;
          }
        }

        var safeStudentName = escapeHTML(data.name);
        var safeStudentGrade = escapeHTML(data.grade);
        var safeStudentSection = escapeHTML(data.section);
        var safeTotalMax = escapeHTML(data.total_max);

        var subjectsHtml = data.subjects
          .map(function (sub, index) {
            var animDelay = 0.06 * (index + 1);
            return `<tr class="row-anim" style="animation-delay: ${animDelay}s">
                          <td>${escapeHTML(sub.name)}</td>
                          <td>${escapeHTML(sub.max)}</td>
                          <td>${escapeHTML(sub.score)}</td>
                        </tr>`;
          })
          .join("");

        var totalAnimDelay = 0.06 * (data.subjects.length + 1);

        const percBlock = `<div class="perc-block">
                    <div class="perc-label">النسبة المئوية</div>
                    <div class="perc-num" style="color:${barColor};"><span id="percNumVal">0</span><span class="perc-sym">%</span></div>
                  </div>`;

        var html = `
                <div class="student-info-appear">
                  <div id="capture-area">
                    <div id="export-header" style="display: none;">
                      <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 25px; width: 100%; gap: 30px;">
                        <img src="images/logo_2.webp" crossorigin="anonymous" style="height: 140px; width: auto; object-fit: contain;" />
                        <img src="images/logo_1.webp" crossorigin="anonymous" style="height: 140px; width: auto; object-fit: contain;" />
                      </div>
                      <h4 style="color: #4a4e69; margin-top: 0; margin-bottom: 25px; border-bottom: 2px dashed #eee; padding-bottom: 15px; font-size: 22px;">مدرسة الشهيد محمود علي الخطيب الرسمية للغات</h4>
                    </div>
                    <h3 class="student-name">الاسم: ${safeStudentName}</h3>
                    <h4 style="color: #0056b3; margin-top: 0; margin-bottom: 4px;">الصف: ${safeStudentGrade}</h4>
                    <p style="color: #4a4e69; font-size: 14px; font-weight: 600; margin: 0 0 10px 0; padding: 6px 12px; background: #f4f6fa; border-radius: 8px; display: inline-block;">
                      الفصل: ${safeStudentSection} &nbsp;|&nbsp; رقم الطالب: ${escapeHTML(
                        id,
                      )}
                    </p>
                    <table>
                      <thead><tr><th>المادة</th><th>الدرجة النهائية</th><th>درجة الطالب</th></tr></thead>
                      <tbody>
                        ${subjectsHtml}
                        <tr class="row-anim total-row" style="animation-delay: ${totalAnimDelay}s">
                          <td>المجموع الكلي</td><td>${safeTotalMax}</td><td>${totalDisplay}</td>
                        </tr>
                      </tbody>
                    </table>
                    ${percBlock}
                    ${statusMessageHtml}
                    <div id="export-footer" style="display: none; margin-top: 30px; font-size: 16px; color: #4a4e69; text-align: center; font-weight: bold; border-top: 2px solid #eee; padding-top: 15px;">تصميم وتنفيذ : سمير هلال</div>
                  </div>
                  <button id="shareBtn" class="form-control btn-share" onclick="addRipple(event,this); shareResult('${safeStudentName}')"><span class="btn-text">📸 مشاركة النتيجة كصورة</span></button>
                  <div class="feedback-section">
                    <button id="showFeedbackBtn" class="form-control pulse-button" onclick="addRipple(event,this); toggleFeedbackForm()"><span class="btn-text">💬 تواصل مع إدارة المدرسة</span></button>
                    <div id="feedbackFormContainer" style="display: none; text-align: center;">
                      <h4 id="feedbackTitle" style="color: #333; margin-bottom: 15px; font-size: 18px;">سجل مقترحك أو شكواك:</h4>
                      <textarea id="feedbackInput" rows="3" placeholder="اكتب رسالتك هنا..." lang="ar" dir="rtl"></textarea>
                      <button id="submitFeedbackBtn" class="form-control btn-success" onclick="addRipple(event,this); sendFeedback('${safeStudentName}', '${id}', '${safeStudentGrade}', '${safeStudentSection}')"><span class="btn-text">📨 إرسال الاقتراح</span></button>
                      <div id="feedbackStatus" style="margin-top: 10px; font-weight: bold; text-align: center;"></div>
                    </div>
                  </div>
                </div>`;

        resultDiv.innerHTML = html;

        setTimeout(() => {
          const percNumVal = document.getElementById("percNumVal");
          const totalNum = document.getElementById("totalNum");
          if (percNumVal && !isNaN(numericPerc))
            countUp(percNumVal, numericPerc, 1200, "", 2);
          if (totalNum && !isNaN(parseFloat(data.total))) {
            const tVal = parseFloat(data.total);
            countUp(totalNum, tVal, 1000, "", tVal % 1 !== 0 ? 2 : 0);
          }
        }, 100);

        if (!isNaN(numericPerc)) {
          if (numericPerc >= 50) {
            setTimeout(() => {
              confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                zIndex: 9999,
              });
              showEmojis(true);
            }, 400);
          } else {
            setTimeout(() => showEmojis(false), 400);
          }
        }
      } else {
        resultDiv.innerHTML = `<div style='color:red; margin-top:15px;' class='student-info-appear'>${escapeHTML(
          data.message,
        )}</div>`;
      }
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 200);
    })
    .catch(() => {
      loader.style.display = "none";
      searchBtn.disabled = false;
      idInput.disabled = false;
      searchBtn.classList.add("pulse-button");
      searchBtnText.innerText = "🔎 بحث";
      resultDiv.innerHTML =
        "<div style='color:red; margin-top:15px;' class='student-info-appear'>حدث خطأ في الاتصال بقاعدة البيانات. تأكد من اتصالك بالإنترنت.</div>";
    });
}
