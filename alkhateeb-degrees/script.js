const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx8JBu5aQKAf3cKN9kEss8RiFHoW9DiqbgSlLO3JiIRxtXEzsJh3MU1sgIU2cVPP-rNkw/exec";

let allStudents = [];
let filteredStudents = [];
let currentPage = 1;
let rowsPerPage = 50;
let currentModalAction = "";
let highlightErrors = false;

const subjectsConfig = {
  "ثالث ابتدائي": [
    { name: "اللغة العربية", val: "عربي" },
    { name: "الرياضيات", val: "رياضيات" },
    { name: "التربية الدينية", val: "دين" },
    { name: "اللغة الإنجليزية", val: "انجليزي" },
    { name: "مستوى رفيع", val: "رفيع" },
  ],
  "رابع ابتدائي": [
    { name: "اللغة العربية", val: "عربي" },
    { name: "اللغة الإنجليزية", val: "انجليزي" },
    { name: "التربية الدينية", val: "دين" },
    { name: "الرياضيات", val: "رياضيات" },
    { name: "العلوم", val: "علوم" },
    { name: "الدراسات الاجتماعية", val: "دراسات" },
    { name: "مستوى رفيع", val: "رفيع" },
  ],
  "خامس ابتدائي": [
    { name: "اللغة العربية", val: "عربي" },
    { name: "اللغة الإنجليزية", val: "انجليزي" },
    { name: "التربية الدينية", val: "دين" },
    { name: "الرياضيات", val: "رياضيات" },
    { name: "العلوم", val: "علوم" },
    { name: "الدراسات الاجتماعية", val: "دراسات" },
    { name: "مستوى رفيع", val: "رفيع" },
  ],
  "سادس ابتدائي": [
    { name: "اللغة العربية", val: "عربي" },
    { name: "اللغة الإنجليزية", val: "انجليزي" },
    { name: "التربية الدينية", val: "دين" },
    { name: "الرياضيات", val: "رياضيات" },
    { name: "العلوم", val: "علوم" },
    { name: "الدراسات الاجتماعية", val: "دراسات" },
    { name: "مستوى رفيع", val: "رفيع" },
  ],
  "أول اعدادي": [
    { name: "اللغة العربية", val: "عربي" },
    { name: "مستوى رفيع (لغة ثانية)", val: "رفيع 2" },
    { name: "اللغة الإنجليزية", val: "انجليزي" },
    { name: "الحاسب الآلي", val: "حاسب" },
    { name: "الدراسات الاجتماعية", val: "دراسات" },
    { name: "التربية الفنية", val: "رسم" },
    { name: "الرياضيات", val: "رياضيات" },
    { name: "التربية الدينية", val: "دين" },
    { name: "العلوم", val: "علوم" },
    { name: "مستوى رفيع (لغة أولى)", val: "رفيع 1" },
  ],
  "ثاني اعدادي": [
    { name: "اللغة العربية", val: "عربي" },
    { name: "مستوى رفيع (لغة ثانية)", val: "رفيع 2" },
    { name: "اللغة الإنجليزية", val: "انجليزي" },
    { name: "الحاسب الآلي", val: "حاسب" },
    { name: "الدراسات الاجتماعية", val: "دراسات" },
    { name: "التربية الفنية", val: "رسم" },
    { name: "الرياضيات", val: "رياضيات" },
    { name: "التربية الدينية", val: "دين" },
    { name: "العلوم", val: "علوم" },
    { name: "مستوى رفيع (لغة أولى)", val: "رفيع 1" },
  ],
};

window.addEventListener("beforeunload", function (e) {
  const hasChanges = allStudents.some((s) => s.score !== s.originalScore);
  if (hasChanges) {
    e.preventDefault();
    e.returnValue = "";
  }
});

window.onload = function () {
  checkAuth();
};

function checkAuth() {
  const authData = localStorage.getItem("alkhateeb_auth");
  if (authData) {
    const auth = JSON.parse(authData);
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContainer").style.display = "block";
    document.getElementById("teacherNameDisplay").innerText =
      "أهلاً بك: " + auth.name;
    restoreStateLocally();
  } else {
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("mainContainer").style.display = "none";
  }
}

function handleSessionExpired() {
  localStorage.removeItem("alkhateeb_auth");
  document.getElementById("mainContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
  const msgDiv = document.getElementById("loginMessage");
  msgDiv.innerText =
    "⏳ انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجدداً لاستكمال عملك.";
  msgDiv.className = "status-message error-msg";
  msgDiv.style.display = "block";
}

function doLogin() {
  const userInput = document.getElementById("usernameInput");
  const passInput = document.getElementById("passwordInput");
  const user = userInput.value.trim();
  const pass = passInput.value.trim();
  const msgDiv = document.getElementById("loginMessage");
  const btn = document.getElementById("loginBtn");
  const loader = document.getElementById("loginLoader");

  if (!user || !pass) {
    msgDiv.innerText = "يرجى إدخال اسم المستخدم وكلمة المرور.";
    msgDiv.className = "status-message error-msg";
    msgDiv.style.display = "block";
    return;
  }
  msgDiv.style.display = "none";
  btn.disabled = true;
  userInput.disabled = true;
  passInput.disabled = true;
  btn.classList.remove("pulse-button");
  btn.querySelector(".btn-text").innerText = "جاري التحقق...";
  loader.style.display = "block";

  const payload = { action: "login", username: user, password: pass };
  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";
      btn.disabled = false;
      btn.classList.add("pulse-button");
      btn.querySelector(".btn-text").innerText = "دخول المنصة";
      if (data.status === "success") {
        localStorage.setItem(
          "alkhateeb_auth",
          JSON.stringify({ token: data.token, name: data.teacherName }),
        );
        userInput.disabled = false;
        passInput.disabled = false;
        userInput.value = "";
        passInput.value = "";
        checkAuth();
      } else {
        userInput.disabled = false;
        passInput.disabled = false;
        msgDiv.innerText = data.message;
        msgDiv.className = "status-message error-msg";
        msgDiv.style.display = "block";
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      btn.disabled = false;
      userInput.disabled = false;
      passInput.disabled = false;
      btn.classList.add("pulse-button");
      btn.querySelector(".btn-text").innerText = "دخول المنصة";
      msgDiv.innerText = "حدث خطأ في الاتصال، يرجى المحاولة مرة أخرى.";
      msgDiv.className = "status-message error-msg";
      msgDiv.style.display = "block";
    });
}

function executeLogout() {
  const authData = localStorage.getItem("alkhateeb_auth");
  if (authData) {
    const auth = JSON.parse(authData);
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "logout", token: auth.token }),
    }).catch((e) => console.log(e));
  }
  allStudents = [];
  localStorage.removeItem("alkhateeb_auth");
  localStorage.removeItem("alkhateeb_grades_draft");
  location.reload();
}

function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str).replace(/[&<>'"]/g, function (tag) {
    const chars = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return chars[tag] || tag;
  });
}

function updateRowsPerPage() {
  rowsPerPage = parseInt(document.getElementById("rowsPerPageSelect").value);
  currentPage = 1;
  saveStateLocally();
  renderTable();
}

function saveStateLocally() {
  if (allStudents.length === 0) return;
  const state = {
    grade: document.getElementById("gradeSelect").value,
    section: document.getElementById("sectionSelect").value,
    subject: document.getElementById("subjectSelect").value,
    evaluation: document.getElementById("evaluationSelect").value,
    students: allStudents,
    currentPage: currentPage,
    rowsPerPage: rowsPerPage,
    timestamp: Date.now(),
  };
  localStorage.setItem("alkhateeb_grades_draft", JSON.stringify(state));
}

function restoreStateLocally() {
  const draft = localStorage.getItem("alkhateeb_grades_draft");
  if (draft) {
    try {
      const state = JSON.parse(draft);
      const now = Date.now();
      const expirationTime = 8 * 60 * 60 * 1000;
      if (!state.timestamp || now - state.timestamp > expirationTime) {
        localStorage.removeItem("alkhateeb_grades_draft");
        return;
      }
      if (state.students && state.students.length > 0) {
        allStudents = state.students;
        filteredStudents = [...allStudents];
        currentPage = state.currentPage || 1;
        if (state.rowsPerPage) {
          rowsPerPage = state.rowsPerPage;
          document.getElementById("rowsPerPageSelect").value = rowsPerPage;
        } else {
          document.getElementById("rowsPerPageSelect").value = 50;
        }

        const gradeSelect = document.getElementById("gradeSelect");
        const sectionSelect = document.getElementById("sectionSelect");
        const subjectSelect = document.getElementById("subjectSelect");
        const evaluationSelect = document.getElementById("evaluationSelect");

        gradeSelect.value = state.grade;
        sectionSelect.style.display = "block";
        sectionSelect.value = state.section;

        populateSubjects(state.grade);
        subjectSelect.style.display = "block";
        subjectSelect.value = state.subject;

        evaluationSelect.style.display = "block";
        evaluationSelect.value = state.evaluation;

        document.getElementById("searchBtn").style.display = "block";
        document.getElementById("bulkScoreDiv").style.display = "flex";
        document.getElementById("searchContainer").style.display = "block";
        document.getElementById("tableControls").style.display = "flex";

        const saveBtn = document.getElementById("saveBtn");
        saveBtn.disabled = false;
        saveBtn.style.display = "block";
        saveBtn.onclick = function (event) {
          addRipple(event, this);
          saveData();
        };
        saveBtn.className = "form-control btn-success pulse-success";

        renderTable();
        document.getElementById("studentsTable").style.display = "table";
      }
    } catch (e) {
      localStorage.removeItem("alkhateeb_grades_draft");
    }
  }
}

function addRipple(e, btn) {
  if (btn.disabled) return;
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

function convertToEnglishNumbers(str) {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  let englishStr = String(str).replace(/[٠-٩]/g, function (w) {
    return arabicNumbers.indexOf(w);
  });
  return englishStr.replace(/[^0-9.]/g, "");
}

function filterTable() {
  const term = document.getElementById("liveSearchInput").value.toLowerCase();
  filteredStudents = allStudents.filter(
    (s) =>
      String(s.name).toLowerCase().includes(term) ||
      String(s.id).includes(term),
  );
  currentPage = 1;
  renderTable();
}

function handleScoreInput(studentId, inputEl) {
  inputEl.classList.remove("error-border");
  let cleanedStr = convertToEnglishNumbers(inputEl.value);
  if (cleanedStr !== "") {
    let num = parseFloat(cleanedStr);
    if (num > 100) cleanedStr = "";
  }
  inputEl.value = cleanedStr;
  updateStudentScore(studentId, cleanedStr);
  checkModifiedState(studentId, inputEl);
}

function toggleAbsence(studentId, isChecked) {
  const inputEl = document.getElementById("score_" + studentId);
  inputEl.classList.remove("error-border");
  if (isChecked) {
    inputEl.value = "غائب";
    inputEl.disabled = true;
    updateStudentScore(studentId, "غائب");
  } else {
    inputEl.value = "";
    inputEl.disabled = false;
    updateStudentScore(studentId, "");
    inputEl.focus();
  }
  checkModifiedState(studentId, inputEl);
}

function checkModifiedState(studentId, inputEl) {
  const student = allStudents.find((s) => String(s.id) === String(studentId));
  if (student) {
    if (student.score !== student.originalScore && !student.suppressGreen) {
      inputEl.classList.add("modified-input");
    } else {
      inputEl.classList.remove("modified-input");
    }
  }
  updateSaveButton();
}

function updateSaveButton() {
  const saveBtn = document.getElementById("saveBtn");
  const saveBtnText = document.querySelector("#saveBtn .btn-text");
  if (!saveBtnText) return;
  const modifiedCount = allStudents.filter(
    (s) => s.score !== s.originalScore,
  ).length;
  if (modifiedCount === 0) {
    saveBtnText.innerText = "💾 حفظ الدرجات";
    saveBtn.classList.remove("pulse-success");
  } else {
    saveBtn.classList.add("pulse-success");
    if (modifiedCount === 1) saveBtnText.innerText = "💾 حفظ درجة طالب واحد";
    else if (modifiedCount === 2) saveBtnText.innerText = "💾 حفظ درجات طالبين";
    else if (modifiedCount >= 3 && modifiedCount <= 10)
      saveBtnText.innerText = "💾 حفظ درجات " + modifiedCount + " طلاب";
    else saveBtnText.innerText = "💾 حفظ درجات " + modifiedCount + " طالب";
  }
}

function hideTableAndMessages() {
  document.getElementById("inlineMessage").style.display = "none";
  document.getElementById("saveMessage").style.display = "none";
  document.getElementById("studentsTable").style.display = "none";
  document.getElementById("tableControls").style.display = "none";
  document.getElementById("searchContainer").style.display = "none";
  document.getElementById("paginationDiv").style.display = "none";
  document.getElementById("saveBtn").style.display = "none";
  document.getElementById("bulkScoreDiv").style.display = "none";
}

function populateSubjects(grade) {
  const subjectSelect = document.getElementById("subjectSelect");
  subjectSelect.innerHTML = '<option value="">-- اختر المادة --</option>';
  if (subjectsConfig[grade]) {
    subjectsConfig[grade].forEach((subj) => {
      let option = document.createElement("option");
      option.value = subj.val;
      option.text = subj.name;
      subjectSelect.appendChild(option);
    });
  }
}

function showSections() {
  hideTableAndMessages();
  const grade = document.getElementById("gradeSelect").value;
  const sectionSelect = document.getElementById("sectionSelect");
  const subjectSelect = document.getElementById("subjectSelect");
  const evaluationSelect = document.getElementById("evaluationSelect");
  const searchBtn = document.getElementById("searchBtn");

  sectionSelect.value = "";
  subjectSelect.value = "";
  evaluationSelect.value = "";
  subjectSelect.style.display = "none";
  evaluationSelect.style.display = "none";
  searchBtn.style.display = "none";

  if (grade !== "") {
    populateSubjects(grade);
    sectionSelect.style.display = "block";
    sectionSelect.style.animation = "slideInUp 0.3s ease-out";
  } else {
    sectionSelect.style.display = "none";
  }
}

function showSubjects() {
  hideTableAndMessages();
  const section = document.getElementById("sectionSelect").value;
  const subjectSelect = document.getElementById("subjectSelect");
  const evaluationSelect = document.getElementById("evaluationSelect");
  const searchBtn = document.getElementById("searchBtn");

  subjectSelect.value = "";
  evaluationSelect.value = "";
  evaluationSelect.style.display = "none";
  searchBtn.style.display = "none";

  if (section !== "") {
    subjectSelect.style.display = "block";
    subjectSelect.style.animation = "slideInUp 0.3s ease-out";
  } else {
    subjectSelect.style.display = "none";
  }
}

function showEvaluations() {
  hideTableAndMessages();
  const subject = document.getElementById("subjectSelect").value;
  const evaluationSelect = document.getElementById("evaluationSelect");
  const searchBtn = document.getElementById("searchBtn");

  evaluationSelect.value = "";
  searchBtn.style.display = "none";

  if (subject !== "") {
    evaluationSelect.style.display = "block";
    evaluationSelect.style.animation = "slideInUp 0.3s ease-out";
  } else {
    evaluationSelect.style.display = "none";
  }
}

function showSearchBtn() {
  hideTableAndMessages();
  const evaluation = document.getElementById("evaluationSelect").value;
  const searchBtn = document.getElementById("searchBtn");
  if (evaluation !== "") {
    searchBtn.style.display = "block";
    searchBtn.style.animation = "slideInUp 0.3s ease-out";
    setTimeout(function () {
      searchBtn.style.animation = "";
    }, 300);
  } else {
    searchBtn.style.display = "none";
  }
}

function showMessage(text, isError = false) {
  const msgDiv = document.getElementById("inlineMessage");
  msgDiv.innerText = text;
  msgDiv.className = isError
    ? "status-message error-msg"
    : "status-message success-msg";
  msgDiv.style.display = "block";
}

function showSaveMessage(content, isError = false) {
  const msgDiv = document.getElementById("saveMessage");
  msgDiv.innerHTML = content;
  msgDiv.className = isError
    ? "status-message error-msg"
    : "status-message success-msg";
  msgDiv.style.display = "block";
}

function showBulkConfirm() {
  const inputEl = document.getElementById("bulkScoreInput");
  let cleanedStr = convertToEnglishNumbers(inputEl.value);
  if (cleanedStr !== "") {
    let num = parseFloat(cleanedStr);
    if (num > 100) {
      inputEl.value = "";
      showMessage("الدرجة لا يمكن أن تتجاوز 100", true);
      return;
    }
    currentModalAction = "bulkScore";
    document.getElementById("modalTitleText").innerText =
      "هل تريد بالتأكيد تعميم هذه الدرجة على جميع الطلاب الحاضرين؟";
    document.getElementById("customModal").style.display = "flex";
  } else {
    showMessage("⚠️ يرجى إدخال درجة صالحة أولاً.", true);
  }
}

function showAbsentConfirm() {
  currentModalAction = "bulkAbsent";
  document.getElementById("modalTitleText").innerText =
    "هل تريد بالتأكيد تسجيل غياب لجميع الطلاب؟";
  document.getElementById("customModal").style.display = "flex";
}

function showPresentConfirm() {
  currentModalAction = "allPresent";
  document.getElementById("modalTitleText").innerText =
    "هل تريد بالتأكيد إلغاء الغياب لجميع الطلاب ليصبحوا حاضرين؟";
  document.getElementById("customModal").style.display = "flex";
}

function showClearConfirm() {
  currentModalAction = "clearAll";
  document.getElementById("modalTitleText").innerText =
    "هل تريد بالتأكيد مسح جميع الدرجات وتفريغ الحقول بالكامل؟";
  document.getElementById("customModal").style.display = "flex";
}

function showLogoutConfirm() {
  const hasChanges = allStudents.some((s) => s.score !== s.originalScore);
  if (hasChanges) {
    currentModalAction = "logout";
    document.getElementById("modalTitleText").innerText =
      "⚠️ لديك درجات لم يتم حفظها! هل أنت متأكد أنك تريد تسجيل الخروج وإلغاء تعديلاتك؟";
    document.getElementById("customModal").style.display = "flex";
  } else {
    executeLogout();
  }
}

function executeModalAction() {
  if (currentModalAction === "bulkScore") confirmBulkScore();
  else if (currentModalAction === "bulkAbsent") confirmBulkAbsent();
  else if (currentModalAction === "allPresent") confirmAllPresent();
  else if (currentModalAction === "clearAll") confirmClearAll();
  else if (currentModalAction === "logout") executeLogout();
}

function confirmBulkAbsent() {
  for (let i = 0; i < allStudents.length; i++) {
    allStudents[i].score = "غائب";
    allStudents[i].suppressGreen = true;
  }
  filteredStudents = [...allStudents];
  closeBulkModal();
  renderTable();
  saveStateLocally();
  showMessage("✅ تم تسجيل غياب جميع الطلاب بنجاح.", false);
}

function confirmAllPresent() {
  for (let i = 0; i < allStudents.length; i++) {
    if (allStudents[i].score === "غ" || allStudents[i].score === "غائب") {
      allStudents[i].score = "";
      allStudents[i].suppressGreen = true;
    }
  }
  filteredStudents = [...allStudents];
  closeBulkModal();
  renderTable();
  saveStateLocally();
  showMessage("✅ تم إلغاء الغياب وتحويل الطلاب إلى حاضرين بنجاح.", false);
}

function confirmClearAll() {
  for (let i = 0; i < allStudents.length; i++) {
    if (allStudents[i].score !== "غ" && allStudents[i].score !== "غائب") {
      allStudents[i].score = "";
      allStudents[i].suppressGreen = true;
    }
  }
  filteredStudents = [...allStudents];
  highlightErrors = false;
  closeBulkModal();
  renderTable();
  saveStateLocally();
  showMessage("✅ تم تفريغ الحقول بنجاح.", false);
}

function confirmBulkScore() {
  const inputEl = document.getElementById("bulkScoreInput");
  let cleanedStr = convertToEnglishNumbers(inputEl.value);
  for (let i = 0; i < allStudents.length; i++) {
    if (allStudents[i].score !== "غ" && allStudents[i].score !== "غائب") {
      allStudents[i].score = cleanedStr;
      allStudents[i].suppressGreen = false;
    }
  }
  filteredStudents = [...allStudents];
  inputEl.value = "";
  closeBulkModal();
  renderTable();
  saveStateLocally();
  showMessage("✅ تم تعميم الدرجة بنجاح على جميع الطلاب الحاضرين.", false);
}

function closeBulkModal() {
  document.getElementById("customModal").style.display = "none";
  currentModalAction = "";
}

function fetchStudents() {
  const authData = localStorage.getItem("alkhateeb_auth");
  if (!authData) {
    checkAuth();
    return;
  }
  const auth = JSON.parse(authData);

  const gradeSelect = document.getElementById("gradeSelect");
  const sectionSelect = document.getElementById("sectionSelect");
  const subjectSelect = document.getElementById("subjectSelect");
  const evaluationSelect = document.getElementById("evaluationSelect");
  const searchBtn = document.getElementById("searchBtn");
  const loader = document.getElementById("mainLoader");
  const searchBtnText = searchBtn.querySelector(".btn-text");

  const grade = gradeSelect.value;
  const section = sectionSelect.value;
  const subject = subjectSelect.value;

  const evalValue = evaluationSelect.value;
  const [examType, month] = evalValue.split("_");

  hideTableAndMessages();
  loader.style.display = "block";
  searchBtn.disabled = true;
  searchBtn.classList.remove("pulse-button");
  searchBtnText.innerText = "⏳ جاري البحث...";

  gradeSelect.disabled = true;
  sectionSelect.disabled = true;
  subjectSelect.disabled = true;
  evaluationSelect.disabled = true;

  const payload = {
    action: "getStudents",
    token: auth.token,
    grade: grade,
    section: section,
    subject: subject,
    month: month,
    examType: examType,
  };

  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";
      searchBtn.disabled = false;
      searchBtn.classList.add("pulse-button");
      searchBtnText.innerText = "🔎 عرض كشف الطلاب";

      gradeSelect.disabled = false;
      sectionSelect.disabled = false;
      subjectSelect.disabled = false;
      evaluationSelect.disabled = false;

      if (data.status === "error") {
        if (data.message.includes("موقوف")) {
          executeLogout();
          return;
        }
        if (
          data.message.includes("منتهية") ||
          data.message.includes("غير صالحة")
        ) {
          handleSessionExpired();
          return;
        }
        showMessage(data.message, true);
        return;
      }
      if (data.students.length === 0) {
        showMessage("لا يوجد طلاب مسجلين طبقًا للخيارات السابقة.", true);
        return;
      }

      allStudents = data.students.map((s) => ({
        ...s,
        originalScore: String(s.score).trim(),
        score: String(s.score).trim(),
        suppressGreen: false,
      }));
      document.getElementById("liveSearchInput").value = "";
      filteredStudents = [...allStudents];
      currentPage = 1;
      highlightErrors = false;

      const saveBtn = document.getElementById("saveBtn");
      saveBtn.disabled = false;
      saveBtn.onclick = function (event) {
        addRipple(event, this);
        saveData();
      };
      saveBtn.className = "form-control btn-success pulse-success";

      document.getElementById("bulkScoreInput").value = "";
      document.getElementById("bulkScoreDiv").style.display = "flex";
      document.getElementById("searchContainer").style.display = "block";
      document.getElementById("tableControls").style.display = "flex";

      renderTable();
      saveStateLocally();
      document.getElementById("studentsTable").style.display = "table";
      saveBtn.style.display = "block";

      setTimeout(() => {
        const firstInput = document.querySelector(
          ".student-score:not(:disabled)",
        );
        if (firstInput) {
          firstInput.focus();
          firstInput.select();
        }
      }, 100);
    })
    .catch((error) => {
      loader.style.display = "none";
      searchBtn.disabled = false;
      searchBtn.classList.add("pulse-button");
      searchBtnText.innerText = "🔎 عرض كشف الطلاب";
      gradeSelect.disabled = false;
      sectionSelect.disabled = false;
      subjectSelect.disabled = false;
      evaluationSelect.disabled = false;
      showMessage("حدث خطأ في الاتصال بقاعدة البيانات.", true);
    });
}

function renderTable() {
  const tbody = document.getElementById("studentsBody");
  tbody.innerHTML = "";
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  document.getElementById("currentPageNum").innerText = currentPage;
  document.getElementById("totalPagesNum").innerText =
    totalPages > 0 ? totalPages : 1;
  const pagination = document.getElementById("paginationDiv");

  if (totalPages > 1) {
    pagination.style.display = "flex";
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;
  } else {
    pagination.style.display = "none";
  }

  const start = (currentPage - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, filteredStudents.length);
  const pageStudents = filteredStudents.slice(start, end);

  document.getElementById("studentCountInfo").innerText =
    `إجمالي الطلاب: ${allStudents.length} | الظاهر بالصفحة: ${pageStudents.length}`;

  pageStudents.forEach((student, index) => {
    const isAbsent = student.score === "غ" || student.score === "غائب";

    let displayScore = student.score;
    if (isAbsent) displayScore = "غائب";

    const isEmpty =
      student.score === "" ||
      student.score === null ||
      student.score === undefined;
    const isErrorClass =
      highlightErrors && !isAbsent && isEmpty ? "error-border" : "";
    const isModifiedClass =
      student.score !== student.originalScore && !student.suppressGreen
        ? "modified-input"
        : "";
    const isDisabled = isAbsent ? "disabled" : "";

    const row = document.createElement("tr");
    row.id = "row_" + student.id;
    row.className = "row-anim";
    row.style.animationDelay = `${Math.min(index * 0.02, 0.4)}s`;

    row.innerHTML = `
            <td style='font-weight:bold; color:#6c757d; width: 50px;'>${
              start + index + 1
            }</td>
            <td style='font-weight:600; color:#0056b3; vertical-align: middle;'>${escapeHTML(
              student.name,
            )}</td>
            <td>
              <div class="checkbox-wrapper">
                <input type='text' inputmode='numeric' class='score-input student-score ${isErrorClass} ${isModifiedClass}' placeholder='الدرجة' value='${escapeHTML(
                  displayScore,
                )}' 
                       id='score_${escapeHTML(
                         student.id,
                       )}' ${isDisabled} onfocus='this.select()' oninput='handleScoreInput("${escapeHTML(
                         student.id,
                       )}", this)' onkeydown='handleEnter(event, this)'>
                <label class="absent-label"><input type='checkbox' class='absent-checkbox' ${
                  isAbsent ? "checked" : ""
                } onchange='toggleAbsence("${escapeHTML(
                  student.id,
                )}", this.checked)'> غائب</label>
              </div>
            </td>
          `;
    tbody.appendChild(row);
  });
  updateSaveButton();
}

function changePage(direction) {
  currentPage += direction;
  saveStateLocally();
  renderTable();
}

function updateStudentScore(studentId, value) {
  const student = allStudents.find((s) => String(s.id) === String(studentId));
  if (student) {
    student.score = value;
    student.suppressGreen = false;
    saveStateLocally();
  }
}

function handleEnter(event, currentInput) {
  if (event.key === "Enter") {
    event.preventDefault();
    const inputs = Array.from(document.getElementsByClassName("student-score"));
    const currentIndex = inputs.indexOf(currentInput);
    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
    let nextIndex = currentIndex + 1;
    while (nextIndex < inputs.length && inputs[nextIndex].disabled) {
      nextIndex++;
    }
    if (nextIndex < inputs.length) {
      inputs[nextIndex].focus();
      inputs[nextIndex].select();
    } else {
      if (currentPage < totalPages) {
        changePage(1);
        setTimeout(() => {
          const newInputs = Array.from(
            document.getElementsByClassName("student-score"),
          );
          let firstEnabledIndex = 0;
          while (
            firstEnabledIndex < newInputs.length &&
            newInputs[firstEnabledIndex].disabled
          ) {
            firstEnabledIndex++;
          }
          if (firstEnabledIndex < newInputs.length) {
            newInputs[firstEnabledIndex].focus();
            newInputs[firstEnabledIndex].select();
          }
        }, 50);
      } else {
        saveData();
      }
    }
  }
}

function saveData() {
  const authData = localStorage.getItem("alkhateeb_auth");
  if (!authData) {
    checkAuth();
    return;
  }
  const auth = JSON.parse(authData);
  const saveBtn = document.getElementById("saveBtn");
  const saveBtnText = saveBtn.querySelector(".btn-text");
  if (saveBtn.disabled) return;

  let emptyStudentId = null;
  for (let i = 0; i < allStudents.length; i++) {
    if (
      allStudents[i].score === "" ||
      allStudents[i].score === null ||
      allStudents[i].score === undefined
    ) {
      emptyStudentId = allStudents[i].id;
      break;
    }
  }

  if (emptyStudentId !== null) {
    document.getElementById("liveSearchInput").value = "";
    filterTable();
    const indexInFiltered = filteredStudents.findIndex(
      (s) => String(s.id) === String(emptyStudentId),
    );
    highlightErrors = true;
    if (indexInFiltered !== -1) {
      const targetPage = Math.floor(indexInFiltered / rowsPerPage) + 1;
      if (currentPage !== targetPage) {
        currentPage = targetPage;
      }
    }
    renderTable();
    showSaveMessage("⚠️ يرجى إدخال جميع الدرجات، توجد حقول فارغة!", true);
    setTimeout(() => {
      const emptyInput = document.getElementById("score_" + emptyStudentId);
      if (emptyInput && !emptyInput.disabled) {
        emptyInput.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        emptyInput.focus({ preventScroll: true });
      }
    }, 100);
    return;
  }

  const modifiedStudents = allStudents.filter(
    (s) => s.score !== s.originalScore,
  );

  if (modifiedStudents.length === 0) {
    showSaveMessage("لا توجد تغييرات لحفظها.", false);
    saveBtn.disabled = false;
    saveBtn.classList.add("pulse-success");
    saveBtnText.innerText = "💾 حفظ الدرجات";
    return;
  }

  highlightErrors = false;
  document.getElementById("inlineMessage").style.display = "none";
  document.getElementById("saveMessage").style.display = "none";
  saveBtn.disabled = true;
  saveBtn.classList.remove("pulse-success");
  saveBtnText.innerText = "⏳ جاري الحفظ...";

  const evalValue = document.getElementById("evaluationSelect").value;
  const [examType, month] = evalValue.split("_");

  const payload = {
    action: "saveGrades",
    token: auth.token,
    grade: document.getElementById("gradeSelect").value,
    section: document.getElementById("sectionSelect").value,
    subject: document.getElementById("subjectSelect").value,
    month: month,
    examType: examType,
    gradesData: modifiedStudents,
  };

  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        allStudents.forEach((s) => {
          s.originalScore = s.score;
          s.suppressGreen = false;
        });
        localStorage.removeItem("alkhateeb_grades_draft");

        const gradeSel = document.getElementById("gradeSelect");
        const subjSel = document.getElementById("subjectSelect");
        const evalSel = document.getElementById("evaluationSelect");

        const gradeText = gradeSel.options[gradeSel.selectedIndex].text;
        const sectionText = document.getElementById("sectionSelect").value;
        const subjectText = subjSel.options[subjSel.selectedIndex].text;
        const evalText = evalSel.options[evalSel.selectedIndex].text;
        const savedCount = modifiedStudents.length;

        const summaryHTML = `
                ✅ تم حفظ درجات <strong>${savedCount}</strong> طالب بنجاح!<br>
                <span style="font-size: 14px; font-weight: normal; margin-top: 8px; display: inline-block; color: #d4edda;">
                  📑 ${gradeText} - فصل ${sectionText} | 📚 ${subjectText} | 📅 ${evalText}
                </span>
              `;

        document.getElementById("studentsTable").style.display = "none";
        document.getElementById("tableControls").style.display = "none";
        document.getElementById("searchContainer").style.display = "none";
        document.getElementById("paginationDiv").style.display = "none";
        document.getElementById("saveBtn").style.display = "none";
        document.getElementById("bulkScoreDiv").style.display = "none";

        document.getElementById("sectionSelect").style.display = "none";
        document.getElementById("subjectSelect").style.display = "none";
        document.getElementById("evaluationSelect").style.display = "none";
        document.getElementById("searchBtn").style.display = "none";

        document.getElementById("gradeSelect").value = "";
        document.getElementById("sectionSelect").value = "";
        document.getElementById("subjectSelect").value = "";
        document.getElementById("evaluationSelect").value = "";

        showSaveMessage(summaryHTML);
      } else {
        saveBtn.disabled = false;
        saveBtn.classList.add("pulse-success");
        updateSaveButton();
        if (data.message.includes("موقوف")) {
          executeLogout();
          return;
        }
        if (
          data.message.includes("منتهية") ||
          data.message.includes("غير صالحة")
        ) {
          handleSessionExpired();
          return;
        }
        showSaveMessage("❌ حدث خطأ: " + escapeHTML(data.message), true);
      }
    })
    .catch((error) => {
      saveBtn.disabled = false;
      saveBtn.classList.add("pulse-success");
      updateSaveButton();
      showSaveMessage("حدث مشكلة في الإرسال، تأكد من الاتصال بالإنترنت.", true);
    });
}
