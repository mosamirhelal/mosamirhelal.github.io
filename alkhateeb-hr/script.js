let employeesStore = [];
let currentEditingEmployeeCode = null;

function toggleTeacherFields() {
  const type = document.getElementById("empEmployeeType").value;
  const area = document.getElementById("teacherFieldsArea");
  if (type === "معلم") {
    area.style.display = "block";
  } else {
    area.style.display = "none";
  }
}
function fetchAllEmployees(token, silent) {
  const loader = document.getElementById("employeesLoader");
  const wrapper = document.getElementById("employeesTableWrapper");
  const empty = document.getElementById("employeesEmpty");
  if (!silent) {
    if (loader) loader.style.display = "block";
    if (wrapper) wrapper.style.display = "none";
    if (empty) empty.style.display = "none";
  }
  apiPost({
    action: "getAllEmployees",
    token: token,
  })
    .then((data) => {
      if (loader) loader.style.display = "none";
      if (data && data.status === "success") {
        employeesStore = data.employees;
        renderEmployeesTable();
      } else {
        if (empty) {
          empty.style.display = "block";
          empty.innerText = data ? data.message : "خطأ في تحميل البيانات";
        }
      }
    })
    .catch(() => {
      if (loader) loader.style.display = "none";
      if (empty) {
        empty.style.display = "block";
        empty.innerText = "تعذر الاتصال بالخادم.";
      }
    });
}
function showEmployeesList() {
  document.getElementById("empWelcomeScreen").style.display = "none";
  document.getElementById("empListPanel").style.display = "block";
  const auth = getAuth();
  if (auth) fetchAllEmployees(auth.token);
}
function backToEmployeeWelcome() {
  document.getElementById("empListPanel").style.display = "none";
  document.getElementById("empWelcomeScreen").style.display = "block";
}
function refreshEmployees() {
  const auth = getAuth();
  if (auth) fetchAllEmployees(auth.token);
}
function renderEmployeesTable() {
  const tbody = document.querySelector("#employeesTable tbody");
  const wrapper = document.getElementById("employeesTableWrapper");
  const empty = document.getElementById("employeesEmpty");
  tbody.innerHTML = "";
  if (!employeesStore || employeesStore.length === 0) {
    if (wrapper) wrapper.style.display = "none";
    if (empty) {
      empty.style.display = "block";
      empty.innerText = "لا يوجد موظفين مسجلين حتى الآن.";
    }
    return;
  }
  if (wrapper) wrapper.style.display = "block";
  if (empty) empty.style.display = "none";
  employeesStore.forEach((emp) => {
    let tr = document.createElement("tr");
    let statusBadge = "";
    if (emp.status === "نشط") {
      statusBadge = `<span class="badge badge-success">✅ نشط</span>`;
    } else if (emp.status === "مؤرشف") {
      statusBadge = `<span class="badge" style="background-color: #6c757d; color: white;">📦 مؤرشف</span>`;
    } else {
      statusBadge = `<span class="badge badge-danger">⛔ موقوف</span>`;
    }
    let roleBadge =
      emp.role === "Admin"
        ? `<span class="badge badge-danger">مدير</span>`
        : `<span class="badge badge-info">مستخدم</span>`;
    tr.innerHTML = `
                  <td><strong>${escHtml(emp.code)}</strong></td>
                  <td style="text-align:right;">${escHtml(emp.name)}</td>
                  <td>${escHtml(emp.employeeType || "-")}</td>
                  <td>${roleBadge}</td>
                  <td>${statusBadge}</td>
                  <td style="white-space:nowrap;">
                    <button class="btn-secondary edit-emp-btn" style="padding:5px 12px; font-size:13px; margin-bottom:3px; display:inline-block;">✏️ تعديل</button>
                    <button class="btn-logout del-emp-btn" style="padding:5px 12px; font-size:13px; margin:0; display:inline-block;">🗑️ حذف</button>
                  </td>
                `;
    tr.querySelector(".edit-emp-btn").addEventListener("click", () =>
      editEmployee(emp.code),
    );
    tr.querySelector(".del-emp-btn").addEventListener("click", () =>
      deleteEmployeeAction(emp.code),
    );
    tbody.appendChild(tr);
  });
}
function openEmployeeModal() {
  currentEditingEmployeeCode = null;
  document.getElementById("employeeModalTitle").innerText = "إضافة موظف جديد";
  document.getElementById("empCode").readOnly = false;
  const resetBtn = document.getElementById("resetPasswordBtn");
  if (resetBtn) resetBtn.remove();
  window.resetPasswordRequested = false;
  document
    .getElementById("saveEmployeeBtn")
    .querySelector(".btn-text").innerText = "إضافة الموظف";
  document.getElementById("empWelcomeScreen").style.display = "none";
  document.getElementById("empListPanel").style.display = "none";
  document.getElementById("empFormPanel").style.display = "block";
  const fields = [
    "empCode",
    "empName",
    "empNid",
    "empGender",
    "empNationality",
    "empReligion",
    "empBirthDate",
    "empPhone",
    "empEmail",
    "empGov",
    "empDir",
    "empAdmin",
    "empSchool",
    "empStage",
    "empEduType",
    "empYear",
    "empJobGrade",
    "empJobLevel",
    "empJobStatus",
    "empHiringDate",
    "empStartTime",
    "empMaxCasual",
    "empTotalWorkDays",
    "empSpec",
    "empGrades",
    "empClasses",
    "empActivity",
    "empQualType",
    "empQualName",
    "empQualEntity",
    "empQualGrade",
    "empQualDate",
    "empNotes",
  ];
  fields.forEach((f) => {
    let el = document.getElementById(f);
    el.value = "";
    el.classList.remove("is-valid", "is-invalid");
  });
  document.getElementById("empRole").classList.remove("is-valid", "is-invalid");
  document
    .getElementById("empStatus")
    .classList.remove("is-valid", "is-invalid");
  document
    .getElementById("empEmployeeType")
    .classList.remove("is-valid", "is-invalid");
  document.getElementById("empRole").value = "";
  document.getElementById("empStatus").value = "";
  document.getElementById("empEmployeeType").value = "";
  document.getElementById("empCode").readOnly = false;
  toggleTeacherFields();
  window.scrollTo({
    top: document.getElementById("empFormPanel").offsetTop - 20,
    behavior: "smooth",
  });
}
function closeEmployeeModal() {
  document.getElementById("empFormPanel").style.display = "none";
  if (currentEditingEmployeeCode) {
    document.getElementById("empListPanel").style.display = "block";
  } else {
    document.getElementById("empWelcomeScreen").style.display = "block";
  }
  currentEditingEmployeeCode = null;
}
function editEmployee(code) {
  const emp = employeesStore.find((e) => String(e.code) === String(code));
  if (!emp) return;
  currentEditingEmployeeCode = code;
  document.getElementById("employeeModalTitle").innerText =
    "تعديل بيانات الموظف";
  document
    .getElementById("saveEmployeeBtn")
    .querySelector(".btn-text").innerText = "تعديل الموظف";
  document.getElementById("empCode").value = emp.code;
  document.getElementById("empCode").readOnly = true;
  if (!document.getElementById("resetPasswordBtn")) {
    const resetBtn = document.createElement("button");
    resetBtn.id = "resetPasswordBtn";
    resetBtn.type = "button";
    resetBtn.className = "btn-secondary";
    resetBtn.style.marginTop = "10px";
    resetBtn.innerHTML =
      "<span class='btn-text'>إعادة تعيين كلمة المرور</span>";
    resetBtn.addEventListener("click", () => {
      customConfirm(
        "هل أنت متأكد من إعادة تعيين كلمة المرور إلى الرقم القومي؟",
        () => {
          window.resetPasswordRequested = true;
          showMsg("سيتم إعادة التعيين عند حفظ التعديلات.", false);
        },
      );
    });
    document.getElementById("empNid").parentNode.appendChild(resetBtn);
  }
  window.resetPasswordRequested = false;
  document.getElementById("empName").value = emp.name;
  document.getElementById("empNid").value = emp.nid;
  document.getElementById("empGender").value = emp.gender || "";
  document.getElementById("empNationality").value = emp.nationality || "";
  document.getElementById("empReligion").value = emp.religion || "";
  if (emp.birthDate && emp.birthDate.length > 10) {
    document.getElementById("empBirthDate").value = emp.birthDate.split("T")[0];
  } else {
    document.getElementById("empBirthDate").value = emp.birthDate || "";
  }
  document.getElementById("empPhone").value = emp.phone || "";
  document.getElementById("empEmail").value = emp.email || "";
  document.getElementById("empGov").value = emp.governorate || "";
  document.getElementById("empDir").value = emp.educationalDirectorate || "";
  document.getElementById("empAdmin").value =
    emp.educationalAdministration || "";
  document.getElementById("empSchool").value = emp.school || "";
  document.getElementById("empStage").value = emp.educationalStage || "";
  document.getElementById("empEduType").value = emp.educationType || "";
  document.getElementById("empYear").value = emp.academicYear || "";
  document.getElementById("empJobGrade").value = emp.jobGrade || "";
  document.getElementById("empJobLevel").value = emp.jobLevel || "";
  document.getElementById("empJobStatus").value = emp.jobStatus || "";
  if (emp.hiringDate && emp.hiringDate.length > 10) {
    document.getElementById("empHiringDate").value =
      emp.hiringDate.split("T")[0];
  } else {
    document.getElementById("empHiringDate").value = emp.hiringDate || "";
  }
  document.getElementById("empStartTime").value = emp.startTime || "";
  document.getElementById("empMaxCasual").value = emp.maxCasual || "";
  document.getElementById("empTotalWorkDays").value = emp.totalWorkDays || "";
  document.getElementById("empSpec").value = emp.specialization || "";
  document.getElementById("empGrades").value = emp.teachingGrades || "";
  document.getElementById("empClasses").value = emp.teachingClasses || "";
  document.getElementById("empActivity").value = emp.assignedActivity || "";
  document.getElementById("empQualType").value = emp.qualificationType || "";
  document.getElementById("empQualName").value = emp.qualificationName || "";
  document.getElementById("empQualEntity").value =
    emp.qualificationEntity || "";
  document.getElementById("empQualGrade").value = emp.qualificationGrade || "";
  if (emp.qualificationDate && emp.qualificationDate.length > 10) {
    document.getElementById("empQualDate").value =
      emp.qualificationDate.split("T")[0];
  } else {
    document.getElementById("empQualDate").value = emp.qualificationDate || "";
  }
  document.getElementById("empNotes").value = emp.notes || "";
  document.getElementById("empRole").value = emp.role || "Teacher";
  document.getElementById("empStatus").value = emp.status || "نشط";
  document.getElementById("empEmployeeType").value = emp.employeeType || "";
  toggleTeacherFields();
  document.getElementById("empWelcomeScreen").style.display = "none";
  document.getElementById("empListPanel").style.display = "none";
  document.getElementById("empFormPanel").style.display = "block";
  window.scrollTo({
    top: document.getElementById("empFormPanel").offsetTop - 20,
    behavior: "smooth",
  });
}
function deleteEmployeeAction(code) {
  customConfirm("هل أنت متأكد من حذف هذا الموظف نهائياً؟", () => {
    const auth = getAuth();
    if (!auth) return;
    apiPost({
      action: "deleteEmployee",
      token: auth.token,
      code: code,
    })
      .then((data) => {
        if (data && data.status === "success") {
          showMsg(data.message, false);
          fetchAllEmployees(auth.token);
          fetchTeachersList(auth.token, false);
        } else {
          showMsg(data ? data.message : "خطأ", true);
        }
      })
      .catch((err) => {
        showMsg("حدث خطأ في الاتصال بالخادم.", true);
      });
  });
}

function validateEmpField(el) {
  if (!el || el.disabled) return true;
  let val = el.value.trim();
  let isValid = true;

  const basicFields = [
    "empCode",
    "empName",
    "empNid",
    "empGender",
    "empNationality",
    "empReligion",
    "empBirthDate",
    "empPhone",
    "empEmail",
    "empRole",
    "empStatus",
    "empEmployeeType",
  ];

  if (!basicFields.includes(el.id)) {
    if (val === "") {
      el.classList.remove("is-invalid", "is-valid");
      return true;
    }
    isValid = true;
  } else {
    if (el.tagName === "SELECT") {
      isValid = val !== "";
    } else if (el.id === "empNid") {
      isValid = /^\d{14}$/.test(val);
    } else if (el.id === "empPhone") {
      isValid = /^01\d{9}$/.test(val);
    } else if (el.id === "empEmail") {
      if (val === "") isValid = true;
      else isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    } else {
      isValid = val !== "";
    }
  }

  if (isValid) {
    el.classList.remove("is-invalid");
    el.classList.add("is-valid");
  } else {
    el.classList.remove("is-valid");
    el.classList.add("is-invalid");
  }
  return isValid;
}

function validateAllEmpFields() {
  const panel = document.getElementById("empFormPanel");
  const inputs = panel.querySelectorAll("input, select");
  let allValid = true;
  let firstInvalid = null;

  inputs.forEach((el) => {
    if (el.id === "empNotes" || el.id.includes("Search")) return;
    if (
      el.parentElement.style.display === "none" ||
      el.closest(".date-row")?.style.display === "none"
    )
      return;

    let isValid = validateEmpField(el);
    if (!isValid) {
      allValid = false;
      if (!firstInvalid) firstInvalid = el;
    }
  });

  if (!allValid && firstInvalid) {
    firstInvalid.focus();
    showMsg(
      "يرجى إكمال الحقول الإلزامية وتصحيح الأخطاء المحددة باللون الأحمر!",
      true,
    );
  }

  return allValid;
}

function attachEmpValidationListeners() {
  const panel = document.getElementById("empFormPanel");
  const inputs = panel.querySelectorAll("input, select");
  inputs.forEach((el) => {
    if (el.id === "empNotes" || el.id.includes("Search")) return;
    el.addEventListener("input", function () {
      validateEmpField(this);
    });
    el.addEventListener("change", function () {
      validateEmpField(this);
    });
  });
}

document.addEventListener("DOMContentLoaded", attachEmpValidationListeners);

function submitEmployeeForm() {
  const auth = getAuth();
  if (!auth) return;

  if (!validateAllEmpFields()) return;

  const code = document.getElementById("empCode").value;
  const name = document.getElementById("empName").value;
  const nid = document.getElementById("empNid").value;
  const btn = document.getElementById("saveEmployeeBtn");
  btn.disabled = true;
  btn.querySelector(".btn-text").innerText = "جاري الحفظ...";
  const empType = document.getElementById("empEmployeeType").value;
  const empData = {
    code: code,
    name: name,
    nid: nid,
    gender: document.getElementById("empGender").value,
    nationality: document.getElementById("empNationality").value,
    religion: document.getElementById("empReligion").value,
    birthDate: document.getElementById("empBirthDate").value,
    address: "",
    phone: document.getElementById("empPhone").value,
    email: document.getElementById("empEmail").value,
    role: document.getElementById("empRole").value,
    status: document.getElementById("empStatus").value,
    employeeType: document.getElementById("empEmployeeType").value,
    governorate: document.getElementById("empGov").value,
    educationalDirectorate: document.getElementById("empDir").value,
    educationalAdministration: document.getElementById("empAdmin").value,
    school: document.getElementById("empSchool").value,
    educationalStage: document.getElementById("empStage").value,
    educationType: document.getElementById("empEduType").value,
    academicYear: document.getElementById("empYear").value,
    jobGrade: document.getElementById("empJobGrade").value,
    jobLevel: document.getElementById("empJobLevel").value,
    jobStatus: document.getElementById("empJobStatus").value,
    hiringDate: document.getElementById("empHiringDate").value,
    startTime: document.getElementById("empStartTime").value,
    maxCasual: document.getElementById("empMaxCasual").value,
    totalWorkDays: document.getElementById("empTotalWorkDays").value,
    specialization: document.getElementById("empSpec").value,
    teachingGrades: document.getElementById("empGrades").value,
    teachingClasses: document.getElementById("empClasses").value,
    assignedActivity: document.getElementById("empActivity").value,
    qualificationType: document.getElementById("empQualType").value,
    qualificationName: document.getElementById("empQualName").value,
    qualificationEntity: document.getElementById("empQualEntity").value,
    qualificationGrade: document.getElementById("empQualGrade").value,
    qualificationDate: document.getElementById("empQualDate").value,
    notes: document.getElementById("empNotes").value,
  };
  const action = currentEditingEmployeeCode ? "editEmployee" : "addEmployee";
  const payload = {
    action: action,
    token: auth.token,
    emp: empData,
  };
  if (currentEditingEmployeeCode) {
    payload.oldCode = currentEditingEmployeeCode;
    payload.resetPassword = window.resetPasswordRequested || false;
  }
  apiPost(payload)
    .then((data) => {
      btn.disabled = false;
      btn.querySelector(".btn-text").innerText = currentEditingEmployeeCode
        ? "تعديل الموظف"
        : "إضافة الموظف";
      if (data && data.status === "success") {
        showMsg(data.message, false);
        closeEmployeeModal();
        fetchAllEmployees(auth.token);
        fetchTeachersList(auth.token, false);
      } else {
        showMsg(data ? data.message : "خطأ", true);
      }
    })
    .catch((err) => {
      btn.disabled = false;
      btn.querySelector(".btn-text").innerText = currentEditingEmployeeCode
        ? "تعديل الموظف"
        : "إضافة الموظف";
      showMsg("حدث خطأ في الاتصال بالخادم.", true);
    });
}
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzDfDRV_lDpdkqQS89KSVM7KbQn-Y3xKIcEbRuaPe8Sl4ke2RB8JHGOJDfZ1ZGuTKqvug/exec";
const TIME_BASED_ACTIONS = [
  "تأخر صباحي",
  "تأخر بإذن",
  "خروج بدون إذن",
  "خروج بإذن",
];
const DAY_BASED_ACTIONS = ["غياب", "غياب بعذر", "اعتيادي", "مرضي", "إذن صباحي"];
const DANGER_BADGE_TYPES = ["غياب", "خروج بدون إذن", "تأخر صباحي", "مرفوض"];
const SUCCESS_BADGE_TYPES = ["اعتيادي", "مرضي", "مقبول"];
const AppState = {
  historySelectedTeachers: [],
  msgSelectedTeachers: [],
  auth: null,
  teachers: [],
  selectedTeachers: [],
  liveSearchTimeout: null,
  confirmCallbackStack: [],
  lastTodayFetch: 0,
  lastApprovalsFetch: 0,
  historyPage: 1,
  pendingMessages: [],
  currentMessageIndex: 0,
  hiddenAt: null,
  cacheUpdateMsgTimeout: null,
  abortController: null,
  loginAttempts: 0,
  rowDataStore: new WeakMap(),
  messagePollingInterval: null,
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeEditModal();
    closeBulkEditModal();
    closeCustomConfirm();
    closeReviewModal();
    closeNewRequestModal();
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.body.classList.add("animations-paused");
    AppState.hiddenAt = Date.now();
    if (AppState.messagePollingInterval) {
      clearInterval(AppState.messagePollingInterval);
      AppState.messagePollingInterval = null;
    }
  } else {
    document.body.classList.remove("animations-paused");
    if (AppState.hiddenAt && Date.now() - AppState.hiddenAt > 15 * 60 * 1000) {
      if (sessionStorage.getItem("alkhateeb_hr_auth")) {
        silentServerLogout();
      }
    } else {
      const authData = sessionStorage.getItem("alkhateeb_hr_auth");
      if (authData) {
        const auth = JSON.parse(authData);
        if (auth.role === "Admin" && !AppState.messagePollingInterval) {
          checkPendingMessages(auth.token);
          AppState.messagePollingInterval = setInterval(
            () => checkPendingMessages(auth.token),
            300000,
          );
        }
      }
    }
    AppState.hiddenAt = null;
  }
});
function silentServerLogout() {
  const auth = getAuth();
  if (!auth) {
    executeLogoutLocal();
    return;
  }
  apiPost({ action: "logout", token: auth.token }).finally(executeLogoutLocal);
}
function escHtml(str) {
  const d = document.createElement("div");
  d.textContent = str !== null && str !== undefined ? String(str) : "";
  return d.innerHTML;
}
function createDateCheckboxes(
  startDate,
  endDate,
  className,
  onChangeAttr = "",
) {
  const daysName = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  const fragment = document.createDocumentFragment();
  if (diffDays > 60) return { fragment: null, diffDays };
  for (let i = 0; i <= diffDays; i++) {
    let currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    if (currentDate.getDay() === 5 || currentDate.getDay() === 6) continue;
    let yyyy = currentDate.getFullYear();
    let mm = String(currentDate.getMonth() + 1).padStart(2, "0");
    let dd = String(currentDate.getDate()).padStart(2, "0");
    let dateStr = `${yyyy}-${mm}-${dd}`;
    let label = `${daysName[currentDate.getDay()]} (${currentDate.getDate()}/${currentDate.getMonth() + 1})`;
    let div = document.createElement("label");
    div.className = "day-checkbox";
    let input = document.createElement("input");
    input.type = "checkbox";
    input.className = className;
    input.value = dateStr;
    input.checked = true;
    if (className === "day-check-item") {
      input.addEventListener("change", updateSelectAllStatus);
    }
    div.appendChild(input);
    div.appendChild(document.createTextNode(" " + label));
    fragment.appendChild(div);
  }
  return { fragment, diffDays };
}
function normalizeArabic(text) {
  if (!text) return "";
  return text
    .replace(/[أإآا]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ي/g, "ى")
    .replace(/[\u064B-\u065F]/g, "");
}
function formatDateString(rawDate) {
  if (!rawDate) return "";
  let s = String(rawDate).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return s.split("T")[0];
  const match = s.match(/^[a-zA-Z]{3}\s([a-zA-Z]{3})\s(\d{1,2})\s(\d{4})/);
  if (match) {
    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    let month = months[match[1]];
    let day = String(match[2]).padStart(2, "0");
    if (month) {
      return `${match[3]}-${month}-${day}`;
    }
  }
  let d = new Date(s);
  if (!isNaN(d.getTime())) {
    let yyyy = d.getFullYear();
    let mm = String(d.getMonth() + 1).padStart(2, "0");
    let dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  return s;
}
async function apiPost(payload, signal = undefined) {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      ...(signal ? { signal } : {}),
    });
    const result = await response.json();
    if (
      result &&
      result.status === "error" &&
      result.message &&
      result.message.includes("منتهية")
    ) {
      showMsg(result.message, true);
      setTimeout(() => {
        executeLogoutLocal();
      }, 1500);
    }
    return result;
  } catch (error) {
    if (error.name === "AbortError") return null;
    throw error;
  }
}
function showMsg(text, isError, timeout = 7000) {
  const reviewModal = document.getElementById("adminReviewModal");
  const reviewModalOpen = reviewModal && reviewModal.style.display === "flex";

  const msgDiv = document.createElement("div");
  msgDiv.innerText = text;
  msgDiv.className = isError
    ? "status-message error-msg"
    : "status-message success-msg";
  msgDiv.style.display = "block";

  if (reviewModalOpen) {
    const modalContent = reviewModal.querySelector(".modal-content");
    modalContent.querySelectorAll(".status-message").forEach((m) => m.remove());
    modalContent.insertBefore(msgDiv, modalContent.firstChild);
  } else {
    const containers = [
      document.getElementById("loginContainer"),
      document.getElementById("registrationContainer"),
      document.getElementById("adminContainer"),
      document.getElementById("teacherContainer"),
    ];
    let activeContainer = containers.find(
      (c) => c && c.style.display !== "none",
    );
    if (!activeContainer) activeContainer = containers[0];
    activeContainer
      .querySelectorAll(".status-message")
      .forEach((m) => m.remove());
    activeContainer.appendChild(msgDiv);
  }

  setTimeout(() => {
    if (msgDiv.parentNode) msgDiv.parentNode.removeChild(msgDiv);
  }, timeout);
}
function executeLogout() {
  customConfirm("هل أنت متأكد من تسجيل الخروج؟", () => {
    const auth = getAuth();
    if (!auth) return executeLogoutLocal();
    document.getElementById("loginLoader").style.display = "block";
    apiPost({ action: "logout", token: auth.token }).finally(() => {
      executeLogoutLocal();
    });
  });
}
function focusFirstInModal(modalId) {
  setTimeout(() => {
    const modal = document.getElementById(modalId);
    if (modal) {
      const focusable = modal.querySelector(
        "input, select, textarea, button:not(:disabled)",
      );
      if (focusable) focusable.focus();
    }
  }, 50);
}
function customConfirm(msg, callback) {
  document.getElementById("customConfirmText").innerText = msg;
  AppState.confirmCallbackStack.push(callback);
  document.getElementById("customConfirmModal").style.display = "flex";
  focusFirstInModal("customConfirmModal");
}
function closeCustomConfirm() {
  document.getElementById("customConfirmModal").style.display = "none";
}
function executeConfirmAction() {
  const callback = AppState.confirmCallbackStack.pop();
  closeCustomConfirm();
  if (callback) callback();
}
function getLocalDate() {
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}
function getAuth() {
  const authData = sessionStorage.getItem("alkhateeb_hr_auth");
  if (!authData) {
    executeLogoutLocal();
    return null;
  }
  return JSON.parse(authData);
}
function executeLogoutLocal() {
  if (AppState.messagePollingInterval) {
    clearInterval(AppState.messagePollingInterval);
    AppState.messagePollingInterval = null;
  }
  sessionStorage.removeItem("alkhateeb_hr_auth");
  AppState.auth = null;
  sessionStorage.removeItem("alkhateeb_teachers");
  location.reload();
}
function trapFocus(modalElement) {
  modalElement.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusable = modalElement.querySelectorAll(
      'a, button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
window.onload = function () {
  trapFocus(document.getElementById("bulkEditModal"));
  trapFocus(document.getElementById("editModal"));
  trapFocus(document.getElementById("reviewRequestModal"));
  trapFocus(document.getElementById("newRequestModal"));
  document
    .querySelectorAll('input[type="date"], input[type="time"]')
    .forEach(function (el) {
      el.setAttribute("lang", "en-GB");
    });
  checkAuth();
};
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
function checkAuth(skipFetch = false) {
  document
    .querySelectorAll('input[type="date"], input[type="time"]')
    .forEach(function (el) {
      el.setAttribute("lang", "en-GB");
    });
  const authData = sessionStorage.getItem("alkhateeb_hr_auth");
  if (authData) {
    const auth = JSON.parse(authData);
    document.getElementById("inputsWrapper").style.display = "none";
    if (auth.role === "Admin") {
      document.getElementById("loginContainer").style.display = "none";
      document.getElementById("adminContainer").style.display = "block";
      document.getElementById("adminNameDisplay").innerText =
        "أهلاً بك: " + auth.name;
      checkPendingMessages(auth.token);
      const cachedTeachers = sessionStorage.getItem("alkhateeb_teachers");
      if (cachedTeachers) {
        AppState.teachers = JSON.parse(cachedTeachers);
        populateDropdowns();
      }
      const today = getLocalDate();
      document.getElementById("historyStartDate").value = today;
      document.getElementById("historyEndDate").value = today;
      if (!skipFetch) fetchTeachersList(auth.token, false);
    } else {
      if (!skipFetch) {
        document.getElementById("globalLoaderText").innerText =
          "جاري تهيئة الحساب...";
        document.getElementById("globalLoader").style.display = "flex";
        fetchTeacherStats(auth.token, true);
      } else {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("teacherContainer").style.display = "block";
        checkPendingMessages(auth.token);
        document.getElementById("teacherNameDisplay").innerText =
          "أهلاً بك: " + auth.name;
      }
    }
    if (!AppState.messagePollingInterval) {
      AppState.messagePollingInterval = setInterval(
        () => checkPendingMessages(auth.token),
        300000,
      );
    }
  } else {
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("inputsWrapper").style.display = "block";
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("adminContainer").style.display = "none";
    document.getElementById("teacherContainer").style.display = "none";
  }
}
function checkPendingMessages(token) {
  apiPost({ action: "getPendingMessages", token: token })
    .then((data) => {
      if (!data) return;
      if (data.status === "success" && data.messages.length > 0) {
        AppState.pendingMessages = data.messages;
        AppState.currentMessageIndex = 0;
        showNextMessage();
      }
    })
    .catch((err) => console.error(err));
}
function showNextMessage() {
  if (AppState.currentMessageIndex >= AppState.pendingMessages.length) {
    document.getElementById("systemMessageModal").style.display = "none";
    return;
  }
  const msg = AppState.pendingMessages[AppState.currentMessageIndex];
  document.getElementById("sysMessageText").textContent = msg.messageText;
  document.getElementById("sysMessageMeta").innerText =
    "من: " + msg.senderName + " | " + msg.sendDate;
  document.getElementById("systemMessageModal").style.display = "flex";
}
function acknowledgeMessage() {
  const msg = AppState.pendingMessages[AppState.currentMessageIndex];
  const auth = getAuth();
  if (auth) {
    apiPost({
      action: "markMessageRead",
      token: auth.token,
      messageId: msg.messageId,
    });
  }
  AppState.currentMessageIndex++;
  showNextMessage();
}
function doLogin() {
  if (AppState.loginAttempts >= 5) {
    showMsg("لقد تجاوزت الحد المسموح. حاول مرة أخرى بعد 5 دقائق.", true);
    return;
  }
  const userInput = document.getElementById("usernameInput");
  const passInput = document.getElementById("passwordInput");
  const user = userInput.value.trim();
  const pass = passInput.value.trim();
  const btn = document.getElementById("loginBtn");
  const loader = document.getElementById("loginLoader");
  const inputsWrapper = document.getElementById("inputsWrapper");
  if (!user || !pass) {
    showMsg("يرجى إدخال البيانات.", true);
    return;
  }
  userInput.disabled = true;
  passInput.disabled = true;
  btn.disabled = true;
  loader.style.display = "block";
  btn.classList.remove("pulse-button");
  btn.querySelector(".btn-text").innerText = "جاري جلب البيانات...";
  apiPost({ action: "login", username: user, password: pass })
    .then((data) => {
      if (!data) return;
      if (data.status === "success") {
        AppState.loginAttempts = 0;
        inputsWrapper.style.display = "none";
        showMsg("تم التسجيل بنجاح", false);
        sessionStorage.setItem(
          "alkhateeb_hr_auth",
          JSON.stringify({
            token: data.token,
            name: data.name,
            role: data.role,
            code: data.code,
          }),
        );
        if (data.role === "Admin") {
          fetchTeachersList(data.token, true);
        } else {
          fetchTeacherStats(data.token, true);
        }
      } else {
        AppState.loginAttempts++;
        if (AppState.loginAttempts >= 5) {
          btn.disabled = true;
          loader.style.display = "none";
          showMsg("لقد تجاوزت الحد المسموح. حاول مرة أخرى بعد 5 دقائق.", true);
          setTimeout(() => {
            AppState.loginAttempts = 0;
            btn.disabled = false;
          }, 300000);
          return;
        }
        userInput.disabled = false;
        passInput.disabled = false;
        loader.style.display = "none";
        btn.disabled = false;
        btn.classList.add("pulse-button");
        btn.querySelector(".btn-text").innerText = "دخول المنصة";
        showMsg(data.message, true);
      }
    })
    .catch((err) => {
      AppState.loginAttempts++;
      if (AppState.loginAttempts >= 5) {
        btn.disabled = true;
        loader.style.display = "none";
        showMsg("لقد تجاوزت الحد المسموح. حاول مرة أخرى بعد 5 دقائق.", true);
        setTimeout(() => {
          AppState.loginAttempts = 0;
          btn.disabled = false;
        }, 300000);
        return;
      }
      userInput.disabled = false;
      passInput.disabled = false;
      loader.style.display = "none";
      btn.disabled = false;
      btn.classList.add("pulse-button");
      btn.querySelector(".btn-text").innerText = "دخول المنصة";
      showMsg("خطأ في الاتصال بالخادم.", true);
    });
}
function switchTab(tabId, btnElement) {
  document
    .querySelectorAll(".tab-content")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  btnElement.classList.add("active");
  if (tabId === "tab-today") {
    fetchTodayStatus(false);
  } else if (tabId === "tab-employees") {
    const form = document.getElementById("empFormPanel");
    if (form) form.style.display = "none";
    const welcome = document.getElementById("empWelcomeScreen");
    const list = document.getElementById("empListPanel");
    if (welcome) welcome.style.display = "block";
    if (list) list.style.display = "none";
  } else if (tabId === "tab-approvals") {
    fetchApprovalsData();
  }
}
let teachersFetchController = null;
function fetchTeachersList(token, fromLogin = false) {
  if (teachersFetchController) {
    teachersFetchController.abort();
  }
  teachersFetchController = new AbortController();
  const loader = document.getElementById("adminLoader");
  if (!fromLogin && AppState.teachers.length === 0)
    loader.style.display = "block";
  apiPost(
    { action: "getTeachersList", token: token },
    teachersFetchController.signal,
  )
    .then((data) => {
      if (!data) return;
      loader.style.display = "none";
      if (data.status === "success") {
        AppState.teachers = data.teachers;
        sessionStorage.setItem(
          "alkhateeb_teachers",
          JSON.stringify(AppState.teachers),
        );
        populateDropdowns();
        if (fromLogin) {
          document.getElementById("globalLoader").style.display = "none";
          document.getElementById("loginContainer").style.display = "none";
          const lBtn = document.getElementById("loginBtn");
          lBtn.style.display = "block";
          lBtn.disabled = false;
          lBtn.classList.add("pulse-button");
          lBtn.querySelector(".btn-text").innerText = "دخول المنصة";
          checkAuth(true);
        }
      } else if (data.message.includes("منتهية")) {
        executeLogoutLocal();
      }
    })
    .catch((err) => {
      if (err.name === "AbortError") return;
      if (fromLogin) {
        document.getElementById("loginLoader").style.display = "none";
        const lBtn = document.getElementById("loginBtn");
        lBtn.style.display = "block";
        lBtn.disabled = false;
        lBtn.classList.add("pulse-button");
        lBtn.querySelector(".btn-text").innerText = "دخول المنصة";
        document.getElementById("inputsWrapper").style.display = "block";
        showMsg(
          "فشل تحميل بيانات الموظفين. تحقق من الاتصال وحاول مجدداً.",
          true,
        );
      } else {
        loader.style.display = "none";
        showMsg("حدث خطأ في تحميل قائمة المعلمين", true);
      }
    });
}
function populateDropdowns() {
  const select1 = document.getElementById("adminTeacherSelect");
  const select2 = document.getElementById("historyTeacherSelect");
  const select3 = document.getElementById("msgTargetSelect");
  select1.innerHTML =
    '<option value="" disabled selected>-- أو اختر من القائمة --</option>';
  select2.innerHTML =
    '<option value="" disabled>-- أو اختر من القائمة --</option><option value="الكل" style="font-weight: bold; color: #0056b3;" selected>جميع المعلمين</option>';
  if (select3)
    select3.innerHTML =
      '<option value="" disabled>-- أو اختر من القائمة --</option><option value="الكل" style="font-weight: bold; color: #0056b3;" selected>جميع المعلمين</option>';
  const frag1 = document.createDocumentFragment();
  const frag2 = document.createDocumentFragment();
  const frag3 = select3 ? document.createDocumentFragment() : null;
  AppState.teachers.forEach((t) => {
    let opt1 = document.createElement("option");
    opt1.value = t.code;
    opt1.innerText = t.name + " (" + t.code + ")";
    frag1.appendChild(opt1);
    let opt2 = document.createElement("option");
    opt2.value = t.code;
    opt2.innerText = t.name + " (" + t.code + ")";
    frag2.appendChild(opt2);
    if (select3) {
      let opt3 = document.createElement("option");
      opt3.value = t.code;
      opt3.innerText = t.name + " (" + t.code + ")";
      frag3.appendChild(opt3);
    }
  });
  select1.appendChild(frag1);
  select2.appendChild(frag2);
  if (select3) select3.appendChild(frag3);
}
function setupTeacherLiveSearch(inputId, resultsId, onSelectCallback) {
  const input = document.getElementById(inputId);
  const resultsContainer = document.getElementById(resultsId);

  clearTimeout(AppState.liveSearchTimeout);
  AppState.liveSearchTimeout = setTimeout(() => {
    const term = input.value.trim().toLowerCase();
    resultsContainer.innerHTML = "";
    AppState.searchFocus = -1;

    if (term.length === 0) {
      resultsContainer.style.display = "none";
      return;
    }
    const normalizedTerm = normalizeArabic(term);
    const filtered = AppState.teachers.filter(
      (t) =>
        normalizeArabic(t.name.toLowerCase()).includes(normalizedTerm) ||
        String(t.code).includes(term),
    );
    if (filtered.length === 0) {
      resultsContainer.innerHTML =
        "<div style='padding:10px; color:#888;'>لا توجد نتائج</div>";
      resultsContainer.style.display = "block";
      return;
    }
    const fragment = document.createDocumentFragment();
    filtered.forEach((t) => {
      let item = document.createElement("div");
      let eName = escHtml(t.name);
      let eCode = escHtml(t.code);
      item.innerHTML = `<strong>${eName}</strong> <span style="color:#888; font-size:13px;">(كود: ${eCode})</span>`;
      item.onclick = function () {
        resultsContainer.style.display = "none";
        input.value = "";
        onSelectCallback(t.code);
      };
      fragment.appendChild(item);
    });
    resultsContainer.appendChild(fragment);
    resultsContainer.style.display = "block";
  }, 200);

  if (!input.dataset.listenerAdded) {
    input.addEventListener("keydown", function (e) {
      if (resultsContainer.style.display === "none") return;
      let items = resultsContainer.getElementsByTagName("div");
      if (!items || items.length === 0) return;

      if (e.key === "ArrowDown") {
        AppState.searchFocus++;
        addActiveSearchItem(items);
      } else if (e.key === "ArrowUp") {
        AppState.searchFocus--;
        addActiveSearchItem(items);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (AppState.searchFocus > -1) {
          items[AppState.searchFocus].click();
        } else if (items.length === 1) {
          items[0].click();
        }
      }
    });
    input.dataset.listenerAdded = "true";
  }
}
function debounceLiveSearch() {
  setupTeacherLiveSearch("adminSearchInput", "searchResults", function (code) {
    document.getElementById("actionCard").style.display = "block";
    selectTeacherByCode(code);
  });
  if (document.getElementById("adminSearchInput").value.trim().length === 0) {
    document.getElementById("actionCard").style.display = "none";
  }
}

document.addEventListener("click", function (e) {
  const resultsContainer = document.getElementById("searchResults");
  if (resultsContainer && e.target.id !== "adminSearchInput") {
    resultsContainer.style.display = "none";
  }
});
function selectTeacherFromDropdown() {
  const code = document.getElementById("adminTeacherSelect").value;
  if (!code) {
    document.getElementById("actionCard").style.display = "none";
    return;
  }
  selectTeacherByCode(code);
}
function selectTeacherByCode(code) {
  const teacher = AppState.teachers.find(
    (t) => String(t.code) === String(code),
  );
  if (!teacher) return;
  if (!AppState.selectedTeachers) AppState.selectedTeachers = [];
  if (
    !AppState.selectedTeachers.find(
      (t) => String(t.code) === String(teacher.code),
    )
  ) {
    AppState.selectedTeachers.push(teacher);
    AppState.selectedTeachers.sort((a, b) => Number(a.code) - Number(b.code));
  }
  renderSelectedTeachers();
  document.getElementById("adminTeacherSelect").value = "";
  document.getElementById("adminSearchInput").value = "";
  document.getElementById("actionCard").style.display = "block";
  if (AppState.selectedTeachers.length === 1) {
    document.getElementById("actionTypeSelect").value = "";
    document.getElementById("dynamicArea").style.display = "none";
    setTimeout(() => {
      document.getElementById("actionTypeSelect").focus();
    }, 50);
  }
}
function renderSelectedTeachers() {
  const container = document.getElementById("selectedTeachersContainer");
  container.innerHTML = "";
  if (!AppState.selectedTeachers || AppState.selectedTeachers.length === 0) {
    document.getElementById("actionCard").style.display = "none";
    return;
  }
  AppState.selectedTeachers.forEach((teacher) => {
    let chip = document.createElement("div");
    chip.className = "teacher-chip";
    let textSpan = document.createElement("span");
    textSpan.textContent = teacher.name + " (" + teacher.code + ")";
    let removeBtn = document.createElement("span");
    removeBtn.className = "remove-btn";
    removeBtn.innerHTML = "&times;";
    removeBtn.addEventListener("click", () =>
      removeSelectedTeacher(teacher.code),
    );
    chip.appendChild(textSpan);
    chip.appendChild(removeBtn);
    container.appendChild(chip);
  });
}
function removeSelectedTeacher(code) {
  if (!AppState.selectedTeachers) return;
  AppState.selectedTeachers = AppState.selectedTeachers.filter(
    (t) => String(t.code) !== String(code),
  );
  renderSelectedTeachers();
}
function setToday(inputId) {
  document.getElementById(inputId).value = getLocalDate();
  if (inputId === "startDateInput" || inputId === "endDateInput") {
    generateCheckboxes();
  }
}
function toggleDateMode() {
  const mode = document.querySelector('input[name="dateMode"]:checked').value;
  const today = getLocalDate();
  if (mode === "single") {
    document.getElementById("singleDayArea").style.display = "block";
    document.getElementById("multipleDaysArea").style.display = "none";
    document.getElementById("singleDateInput").value = today;
  } else {
    document.getElementById("singleDayArea").style.display = "none";
    document.getElementById("multipleDaysArea").style.display = "block";
    document.getElementById("startDateInput").value = today;
    document.getElementById("endDateInput").value = today;
    generateCheckboxes();
  }
}
function handleActionTypeChange() {
  const type = document.getElementById("actionTypeSelect").value;
  const dynamicArea = document.getElementById("dynamicArea");
  const timeArea = document.getElementById("timeCalcArea");
  const dateArea = document.getElementById("dateSelectArea");
  const delayResultArea = document.getElementById("delayResultArea");
  if (!type) {
    dynamicArea.style.display = "none";
    return;
  }
  dynamicArea.style.display = "block";
  document.getElementById("actionNotes").value = "";
  delayResultArea.style.display = "none";
  if (TIME_BASED_ACTIONS.includes(type)) {
    dateArea.style.display = "none";
    timeArea.style.display = "block";
    setToday("timeActionDateInput");
    setNowTime();
  } else {
    timeArea.style.display = "none";
    dateArea.style.display = "block";
    document.querySelector('input[name="dateMode"][value="single"]').checked =
      true;
    toggleDateMode();
  }
}
function setNowTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("actionTimeInput").value = `${h}:${m}`;
  calculateDelay();
}
function calculateDelay() {
  const type = document.getElementById("actionTypeSelect").value;
  const resultArea = document.getElementById("delayResultArea");
  const delayInput = document.getElementById("manualDelayInput");
  if (!TIME_BASED_ACTIONS.includes(type)) {
    resultArea.style.display = "none";
    return;
  }
  if (type === "خروج بدون إذن" || type === "خروج بإذن") {
    resultArea.style.display = "flex";
    delayInput.value = "";
    delayInput.placeholder = "أدخل المدة بالدقائق";
    return;
  }
  const actualTime = document.getElementById("actionTimeInput").value;
  let expectedTime = "";
  if (AppState.selectedTeachers && AppState.selectedTeachers.length === 1) {
    expectedTime = AppState.selectedTeachers[0].startTime || "";
  }

  if (!actualTime || !expectedTime) {
    resultArea.style.display = "flex";
    if (AppState.selectedTeachers && AppState.selectedTeachers.length > 1) {
      delayInput.value = "";
      delayInput.placeholder = "تلقائي لكل معلم";
    } else {
      delayInput.value = 0;
    }
    return;
  }
  try {
    if (expectedTime.includes("T")) {
      expectedTime = expectedTime.substring(11, 16);
    } else if (expectedTime.length > 5) {
      expectedTime = expectedTime.substring(0, 5);
    }
    let [eh, em] = expectedTime.split(":").map(Number);
    let [ah, am] = actualTime.split(":").map(Number);
    let diff = ah * 60 + am - (eh * 60 + em);
    resultArea.style.display = "flex";
    if (diff > 0) {
      delayInput.value = diff;
    } else {
      delayInput.value = 0;
    }
  } catch (e) {
    resultArea.style.display = "flex";
    delayInput.value = 0;
  }
}
function generateCheckboxes() {
  const startStr = document.getElementById("startDateInput").value;
  const endStr = document.getElementById("endDateInput").value;
  const container = document.getElementById("checkboxesContainer");
  const selectAllCont = document.getElementById("selectAllContainer");
  container.innerHTML = "";
  selectAllCont.style.display = "none";
  if (!startStr || !endStr) return;
  const [sy, sm, sd] = startStr.split("-").map(Number);
  const startDate = new Date(sy, sm - 1, sd);
  const [ey, em, ed] = endStr.split("-").map(Number);
  const endDate = new Date(ey, em - 1, ed);
  if (endDate < startDate) {
    document.getElementById("endDateInput").value = startStr;
    showMsg("لا يمكن أن يسبق تاريخ النهاية تاريخ البداية.", true);
    return;
  }
  const { fragment, diffDays } = createDateCheckboxes(
    startDate,
    endDate,
    "day-check-item",
    'onchange="updateSelectAllStatus()"',
  );
  if (!fragment) {
    if (diffDays > 60) {
      showMsg("الفترة المحددة طويلة جداً. أقصى حد هو 60 يوماً.", true);
    }
    return;
  }
  container.appendChild(fragment);
  if (diffDays >= 0) {
    selectAllCont.style.display = "block";
    document.getElementById("selectAllDays").checked = true;
  }
}
function toggleAllDays(isChecked) {
  const boxes = document.querySelectorAll(".day-check-item");
  boxes.forEach((box) => (box.checked = isChecked));
}
function updateSelectAllStatus() {
  const total = document.querySelectorAll(".day-check-item").length;
  const checked = document.querySelectorAll(".day-check-item:checked").length;
  document.getElementById("selectAllDays").checked =
    total === checked && total > 0;
}
function saveAttendance() {
  const auth = getAuth();
  if (!auth) return;
  const btn = document.getElementById("saveActionBtn");
  if (!AppState.selectedTeachers || AppState.selectedTeachers.length === 0) {
    showMsg("يرجى اختيار معلم واحد على الأقل", true);
    return;
  }
  const type = document.getElementById("actionTypeSelect").value;
  if (!type) {
    showMsg("يرجى اختيار نوع الإجراء أولاً", true);
    return;
  }
  const notes = document.getElementById("actionNotes").value;
  let records = [];
  let validationError = "";
  AppState.selectedTeachers.forEach((teacher) => {
    if (TIME_BASED_ACTIONS.includes(type)) {
      const time = document.getElementById("actionTimeInput").value;
      const timeActionDate = document.getElementById(
        "timeActionDateInput",
      ).value;
      if (!timeActionDate) {
        validationError = "يرجى اختيار التاريخ";
        return;
      }

      let mins = document.getElementById("manualDelayInput").value;
      if (!mins && teacher.startTime) {
        let expectedTime = teacher.startTime;
        try {
          if (expectedTime.includes("T")) {
            expectedTime = expectedTime.substring(11, 16);
          } else if (expectedTime.length > 5) {
            expectedTime = expectedTime.substring(0, 5);
          }
          let [eh, em] = expectedTime.split(":").map(Number);
          let [ah, am] = time.split(":").map(Number);
          let diff = ah * 60 + am - (eh * 60 + em);
          if (diff > 0) mins = diff;
          else mins = 0;
        } catch (e) {
          mins = 0;
        }
      }
      mins = mins || 0;

      records.push({
        code: teacher.code,
        name: teacher.name,
        type: type,
        dateStr: timeActionDate,
        timeStr: time,
        minutes: mins,
        notes: notes,
      });
    } else {
      const mode = document.querySelector(
        'input[name="dateMode"]:checked',
      ).value;
      if (mode === "single") {
        const singleDate = document.getElementById("singleDateInput").value;
        if (!singleDate) {
          validationError = "يرجى اختيار التاريخ";
          return;
        }
        records.push({
          code: teacher.code,
          name: teacher.name,
          type: type,
          dateStr: singleDate,
          timeStr: "",
          minutes: 1,
          notes: notes,
        });
      } else {
        const boxes = document.querySelectorAll(".day-check-item:checked");
        if (boxes.length === 0) {
          validationError = "اختر يوماً واحداً على الأقل";
          return;
        }
        boxes.forEach((box) => {
          records.push({
            code: teacher.code,
            name: teacher.name,
            type: type,
            dateStr: box.value,
            timeStr: "",
            minutes: 1,
            notes: notes,
          });
        });
      }
    }
  });
  if (validationError) {
    showMsg(validationError, true);
    return;
  }
  let teachersCount = AppState.selectedTeachers.length;
  let daysOrMins = records.length / teachersCount;
  let durationText = TIME_BASED_ACTIONS.includes(type)
    ? records[0].minutes + " دقيقة"
    : daysOrMins + " يوم";
  customConfirm(
    `سيتم تسجيل ${type} لعدد ${teachersCount} معلم(ين) - (${durationText} لكل معلم)، هل تأكد؟`,
    () => {
      btn.disabled = true;
      btn.classList.remove("pulse-success");
      btn.querySelector(".btn-text").innerText = "جاري الحفظ...";
      apiPost({
        action: "saveAttendanceRecord",
        token: auth.token,
        records: records,
      })
        .then((data) => {
          if (!data) return;
          btn.disabled = false;
          btn.classList.add("pulse-success");
          btn.querySelector(".btn-text").innerText = "تسجيل وحفظ";
          if (data.status === "success") {
            showMsg(data.message, false);
            document.getElementById("actionCard").style.display = "none";
            AppState.selectedTeachers = [];
            renderSelectedTeachers();
            document.getElementById("adminSearchInput").value = "";
            document.getElementById("adminTeacherSelect").value = "";
            AppState.lastTodayFetch = 0;
          } else {
            showMsg(data.message, true);
          }
        })
        .catch((err) => {
          btn.disabled = false;
          btn.classList.add("pulse-success");
          btn.querySelector(".btn-text").innerText = "تسجيل وحفظ";
          showMsg("خطأ في الاتصال", true);
        });
    },
  );
}

function printHistoryReport() {
  const start = document.getElementById("historyStartDate").value || "-";
  const end = document.getElementById("historyEndDate").value || "-";
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  document.getElementById("printReportHeader").innerHTML = `
                <h2>مدرسة الشهيد محمود علي الخطيب - تقرير السجل الشامل</h2>
                <p>الفترة من ${start} إلى ${end}</p>
                <p>تاريخ الطباعة: ${dateStr} الساعة ${timeStr}</p>
              `;
  window.print();
}

function fetchTodayStatus(isManual = false) {
  const auth = getAuth();
  if (!auth) return;
  if (!isManual && Date.now() - AppState.lastTodayFetch <= 60000) {
    const seconds = Math.floor((Date.now() - AppState.lastTodayFetch) / 1000);
    let msgBox = document.getElementById("cacheUpdateMsg");
    if (!msgBox) {
      msgBox = document.createElement("div");
      msgBox.id = "cacheUpdateMsg";
      msgBox.style.textAlign = "center";
      msgBox.style.color = "#666";
      msgBox.style.fontSize = "13px";
      msgBox.style.marginBottom = "10px";
      const todayLoader = document.getElementById("todayLoader");
      todayLoader.parentNode.insertBefore(msgBox, todayLoader.nextSibling);
    }
    msgBox.innerText = `البيانات محدّثة - آخر تحديث: قبل ${seconds} ثانية`;
    if (AppState.cacheUpdateMsgTimeout)
      clearTimeout(AppState.cacheUpdateMsgTimeout);
    msgBox.style.display = "block";
    AppState.cacheUpdateMsgTimeout = setTimeout(() => {
      msgBox.style.display = "none";
    }, 3000);
    return;
  }
  AppState.lastTodayFetch = Date.now();
  const today = getLocalDate();
  document.getElementById("todayLoader").style.display = "block";
  document.getElementById("todayDashboard").style.display = "none";
  document.getElementById("todayTableContainer").style.display = "none";
  document.getElementById("todayEmpty").style.display = "none";
  apiPost({
    action: "getReports",
    token: auth.token,
    startDate: today,
    endDate: today,
    teacherCode: "",
  })
    .then((data) => {
      if (!data) return;
      document.getElementById("todayLoader").style.display = "none";
      if (data.status === "success") {
        renderTodayDashboard(data.totals);
        renderTodayTable(data.history);
      } else {
        showMsg("خطأ: " + data.message, true);
      }
    })
    .catch((err) => {
      document.getElementById("todayLoader").style.display = "none";
      showMsg("خطأ في الاتصال", true);
    });
}
function renderTodayDashboard(totals) {
  const dashboard = document.getElementById("todayDashboard");
  dashboard.innerHTML = `
                <div class="dash-card danger"><h4>تأخر صباحي</h4><div class="dash-value">${totals["تأخر صباحي"]}</div><span style="font-size:12px; color:#666;">دقيقة</span></div>
                <div class="dash-card danger"><h4>حالات غياب</h4><div class="dash-value">${(totals["غياب"] || 0) + (totals["غياب بعذر"] || 0)}</div><span style="font-size:12px; color:#666;">حالة</span></div>
                <div class="dash-card success"><h4>إجازات اليوم</h4><div class="dash-value">${(totals["اعتيادي"] || 0) + (totals["مرضي"] || 0)}</div><span style="font-size:12px; color:#666;">إجازة</span></div>
                <div class="dash-card warning"><h4>أذونات</h4><div class="dash-value">${(totals["خروج بإذن"] || 0) + (totals["إذن صباحي"] || 0)}</div><span style="font-size:12px; color:#666;">إذن</span></div>
              `;
  dashboard.style.display = "grid";
}
function renderTodayTable(history) {
  const tbody = document.querySelector("#todayTable tbody");
  const container = document.getElementById("todayTableContainer");
  const emptyMsg = document.getElementById("todayEmpty");
  tbody.innerHTML = "";
  if (!history || history.length === 0) {
    container.style.display = "none";
    emptyMsg.style.display = "block";
    emptyMsg.innerText = "لم يتم تسجيل أي إجراءات حتى الآن اليوم.";
    return;
  }
  const fragment = document.createDocumentFragment();
  history.forEach((row) => {
    let badgeClass = getBadgeClass(row.type);
    let tr = document.createElement("tr");
    let suffix = TIME_BASED_ACTIONS.includes(row.type) ? "ق" : "يوم";
    let eName = escHtml(row.name);
    let eType = escHtml(row.type);
    let eNotes = escHtml(row.notes || "-");
    tr.innerHTML = `
                  <td><strong>${eName}</strong></td>
                  <td><span class="badge ${badgeClass}">${eType}</span></td>
                  <td style="font-weight:bold; color:#0056b3;">${row.amount} ${suffix}</td>
                  <td style="color:#666; font-size:13px;">${eNotes}</td>
                `;
    fragment.appendChild(tr);
  });
  tbody.appendChild(fragment);
  container.style.display = "block";
  emptyMsg.style.display = "none";
}
function toggleAllHistory(isChecked) {
  const boxes = document.querySelectorAll(".history-check-item");
  boxes.forEach((box) => (box.checked = isChecked));
  updateBulkActionState();
}
function updateBulkActionState() {
  const boxes = document.querySelectorAll(".history-check-item:checked");
  const bulkActions = document.getElementById("bulkActions");
  const bulkCount = document.getElementById("bulkCount");
  const selectAll = document.getElementById("selectAllHistory");
  const allBoxes = document.querySelectorAll(".history-check-item");
  if (allBoxes.length > 0) {
    if (selectAll) selectAll.checked = boxes.length === allBoxes.length;
  } else {
    if (selectAll) selectAll.checked = false;
  }
  if (boxes.length > 0) {
    bulkActions.style.display = "flex";
    bulkCount.innerText = "تم تحديد " + boxes.length + " سجل";
  } else {
    bulkActions.style.display = "none";
  }
}
async function bulkDeleteRecords() {
  customConfirm(
    "هل أنت متأكد من حذف السجلات المحددة نهائياً؟",
    async function () {
      const auth = getAuth();
      if (!auth) return;
      const loader = document.getElementById("historyLoader");
      loader.style.display = "block";
      const boxes = document.querySelectorAll(".history-check-item:checked");
      const total = boxes.length;
      const msgDiv = document.createElement("div");
      msgDiv.className = "status-message success-msg";
      msgDiv.id = "bulkProgressMsg";
      msgDiv.style.display = "block";
      const activeContainer =
        [...document.querySelectorAll(".container")].find(
          (c) => c.style.display !== "none",
        ) || document.querySelector(".container");
      activeContainer.insertBefore(msgDiv, activeContainer.firstChild);
      document.getElementById("bulkProgressMsg").innerText =
        `جاري حذف ${total} سجل...`;
      const boxArray = Array.from(boxes);
      let hasError = false;
      const rowIds = [];
      for (const box of boxArray) {
        const item = box._rowData;
        if (!item || !item.rowId) continue;
        rowIds.push(item.rowId);
      }
      if (rowIds.length === 0) {
        document.getElementById("bulkProgressMsg").remove();
        loader.style.display = "none";
        return;
      }
      try {
        const res = await apiPost({
          action: "batchDeleteRecords",
          token: auth.token,
          rowIds: rowIds,
        });
        if (!res || res.status !== "success") {
          hasError = true;
        }
      } catch (e) {
        hasError = true;
      }
      document.getElementById("bulkProgressMsg").remove();
      if (hasError) {
        showMsg("حدثت بعض الأخطاء أثناء الحذف.", true);
      } else {
        showMsg("تم حذف السجلات بنجاح.", false);
        document.getElementById("selectAllHistory").checked = false;
      }
      fetchHistoryData(true);
    },
  );
}
function openBulkEditModal() {
  document.getElementById("bulkEditModal").style.display = "flex";
  focusFirstInModal("bulkEditModal");
  document.getElementById("bulkEditNewType").value = "تأخر صباحي";
  document.getElementById("bulkEditNewAmount").value = "";
  document.getElementById("bulkEditNewNotes").value = "";
}
function closeBulkEditModal() {
  document.getElementById("bulkEditModal").style.display = "none";
  document.getElementById("bulkEditNewType").value = "تأخر صباحي";
  document.getElementById("bulkEditNewAmount").value = "";
  document.getElementById("bulkEditNewNotes").value = "";
}
async function submitBulkEditRecord() {
  const auth = getAuth();
  if (!auth) return;
  const newType = document.getElementById("bulkEditNewType").value;
  const newAmount = document.getElementById("bulkEditNewAmount").value;
  const newNotes = document.getElementById("bulkEditNewNotes").value;
  if (!newAmount) {
    showMsg("يرجى تعبئة الكمية / الدقائق", true);
    return;
  }
  document.getElementById("historyLoader").style.display = "block";
  closeBulkEditModal();
  const boxes = document.querySelectorAll(".history-check-item:checked");
  let edits = [];
  Array.from(boxes).forEach((box) => {
    const item = box._rowData;
    if (item && item.rowId) {
      edits.push({
        rowId: item.rowId,
        newType: newType,
        newAmount: newAmount,
        newNotes: newNotes,
      });
    }
  });
  if (edits.length === 0) {
    document.getElementById("historyLoader").style.display = "none";
    return;
  }
  try {
    const res = await apiPost({
      action: "batchEditRecords",
      token: auth.token,
      edits: edits,
    });
    if (!res || res.status !== "success") {
      showMsg("حدثت بعض الأخطاء أثناء التعديل.", true);
    } else {
      showMsg("تم تعديل السجلات بنجاح.", false);
      document.getElementById("selectAllHistory").checked = false;
    }
  } catch (e) {
    showMsg("خطأ في الاتصال", true);
  }
  fetchHistoryData(true);
}
function setHistoryPreset(preset) {
  const d = new Date();
  const endStr =
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0");
  let startStr = endStr;
  if (preset === "week") {
    const w = new Date(d);
    w.setDate(w.getDate() - w.getDay());
    startStr =
      w.getFullYear() +
      "-" +
      String(w.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(w.getDate()).padStart(2, "0");
  } else if (preset === "month") {
    startStr =
      d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-01";
  }
  document.getElementById("historyStartDate").value = startStr;
  document.getElementById("historyEndDate").value = endStr;
  fetchHistoryData();
}
function filterHistoryTable() {
  const query = normalizeArabic(
    document.getElementById("historyTableFilter").value.toLowerCase().trim(),
  );
  const typeFilter = document.getElementById("historyTypeFilter").value;
  const rows = document.querySelectorAll("#historyTable tbody tr");
  rows.forEach((row) => {
    const txt = normalizeArabic(row.textContent || row.innerText).toLowerCase();
    const rType = row.getAttribute("data-type");
    const matchesSearch = txt.indexOf(query) > -1;
    const matchesType = typeFilter === "all" || rType === typeFilter;
    row.style.display = matchesSearch && matchesType ? "" : "none";
  });
}
function loadMoreHistory() {
  AppState.historyPage++;
  fetchHistoryData(false, true);
}

function debounceLiveSearchHistory() {
  setupTeacherLiveSearch(
    "historySearchInput",
    "historySearchResults",
    selectHistoryTeacherByCode,
  );
}
function selectHistoryTeacherFromDropdown() {
  const code = document.getElementById("historyTeacherSelect").value;
  if (!code) return;
  selectHistoryTeacherByCode(code);
}
function selectHistoryTeacherByCode(code) {
  if (code === "الكل" || code === "") {
    AppState.historySelectedTeachers = [];
    renderHistorySelectedTeachers();
    document.getElementById("historyTeacherSelect").value = "الكل";
    return;
  }
  const teacher = AppState.teachers.find(
    (t) => String(t.code) === String(code),
  );
  if (!teacher) return;
  if (
    !AppState.historySelectedTeachers.find(
      (t) => String(t.code) === String(teacher.code),
    )
  ) {
    AppState.historySelectedTeachers.push(teacher);
    AppState.historySelectedTeachers.sort(
      (a, b) => Number(a.code) - Number(b.code),
    );
  }
  renderHistorySelectedTeachers();
  document.getElementById("historyTeacherSelect").value = "";
  document.getElementById("historySearchInput").value = "";
}
function renderHistorySelectedTeachers() {
  const container = document.getElementById("historySelectedTeachersContainer");
  container.innerHTML = "";
  if (AppState.historySelectedTeachers.length === 0) {
    container.innerHTML =
      '<span id="historyEmptyMsg" style="color: #999; font-size: 13px; margin: auto;">الجميع محدد (اختر معلم لتخصيص البحث)</span>';
    return;
  }
  AppState.historySelectedTeachers.forEach((t) => {
    let chip = document.createElement("div");
    chip.className = "teacher-chip";
    let textSpan = document.createElement("span");
    textSpan.textContent = t.name + " (" + t.code + ")";
    let removeBtn = document.createElement("span");
    removeBtn.className = "remove-btn";
    removeBtn.innerHTML = "&times;";
    removeBtn.addEventListener("click", () => removeHistoryTeacher(t.code));
    chip.appendChild(textSpan);
    chip.appendChild(removeBtn);
    container.appendChild(chip);
  });
}
function removeHistoryTeacher(code) {
  AppState.historySelectedTeachers = AppState.historySelectedTeachers.filter(
    (t) => String(t.code) !== String(code),
  );
  renderHistorySelectedTeachers();
  if (AppState.historySelectedTeachers.length === 0) {
    document.getElementById("historyTeacherSelect").value = "الكل";
  }
}

function debounceLiveSearchMsg() {
  setupTeacherLiveSearch(
    "msgSearchInput",
    "msgSearchResults",
    selectMsgTeacherByCode,
  );
}
function selectMsgTeacherFromDropdown() {
  const code = document.getElementById("msgTargetSelect").value;
  if (!code) return;
  selectMsgTeacherByCode(code);
}
function selectMsgTeacherByCode(code) {
  if (code === "الكل" || code === "") {
    AppState.msgSelectedTeachers = [];
    renderMsgSelectedTeachers();
    document.getElementById("msgTargetSelect").value = "الكل";
    return;
  }
  const teacher = AppState.teachers.find(
    (t) => String(t.code) === String(code),
  );
  if (!teacher) return;
  if (
    !AppState.msgSelectedTeachers.find(
      (t) => String(t.code) === String(teacher.code),
    )
  ) {
    AppState.msgSelectedTeachers.push(teacher);
    AppState.msgSelectedTeachers.sort(
      (a, b) => Number(a.code) - Number(b.code),
    );
  }
  renderMsgSelectedTeachers();
  document.getElementById("msgTargetSelect").value = "";
  document.getElementById("msgSearchInput").value = "";
}
function renderMsgSelectedTeachers() {
  const container = document.getElementById("msgSelectedTeachersContainer");
  container.innerHTML = "";
  if (AppState.msgSelectedTeachers.length === 0) {
    container.innerHTML =
      '<span id="msgEmptyMsg" style="color: #999; font-size: 13px; margin: auto;">إرسال للجميع (اختر معلم لتخصيص الإرسال)</span>';
    return;
  }
  AppState.msgSelectedTeachers.forEach((t) => {
    let chip = document.createElement("div");
    chip.className = "teacher-chip";
    let textSpan = document.createElement("span");
    textSpan.textContent = t.name + " (" + t.code + ")";
    let removeBtn = document.createElement("span");
    removeBtn.className = "remove-btn";
    removeBtn.innerHTML = "&times;";
    removeBtn.addEventListener("click", () => removeMsgTeacher(t.code));
    chip.appendChild(textSpan);
    chip.appendChild(removeBtn);
    container.appendChild(chip);
  });
}
function removeMsgTeacher(code) {
  AppState.msgSelectedTeachers = AppState.msgSelectedTeachers.filter(
    (t) => String(t.code) !== String(code),
  );
  renderMsgSelectedTeachers();
  if (AppState.msgSelectedTeachers.length === 0) {
    document.getElementById("msgTargetSelect").value = "الكل";
  }
}

function fetchHistoryData(isSilentUpdate = false, append = false) {
  const auth = getAuth();
  if (!auth) return;
  const start = document.getElementById("historyStartDate").value;
  const end = document.getElementById("historyEndDate").value;
  const tCodes = AppState.historySelectedTeachers.map((t) => t.code);
  const typeFilter = document.getElementById("historyTypeFilter")
    ? document.getElementById("historyTypeFilter").value
    : "all";
  const searchQuery = document.getElementById("historyTableFilter")
    ? document.getElementById("historyTableFilter").value
    : "";
  if (!start || !end) {
    showMsg("يرجى تحديد فترة البداية والنهاية.", true);
    return;
  }
  if (start > end) {
    showMsg("تاريخ البداية يجب أن يكون قبل تاريخ النهاية", true);
    return;
  }
  const loader = document.getElementById("historyLoader");
  const dashboard = document.getElementById("historyDashboard");
  const container = document.getElementById("historyTableContainer");
  const emptyMsg = document.getElementById("historyEmpty");
  const bulkActions = document.getElementById("bulkActions");
  const selectAll = document.getElementById("selectAllHistory");
  const loadMoreBtn = document.getElementById("loadMoreHistoryContainer");
  const historyFiltersRow = document.getElementById("historyFiltersRow");
  if (!append) {
    AppState.historyPage = 1;
  }
  if (!isSilentUpdate && !append) {
    loader.style.display = "block";
    dashboard.style.display = "none";
    container.style.display = "none";
    emptyMsg.style.display = "none";
    bulkActions.style.display = "none";
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    if (historyFiltersRow) historyFiltersRow.style.display = "none";
    if (selectAll) selectAll.checked = false;
  } else if (append) {
    loader.style.display = "block";
  }
  apiPost({
    action: "getReports",
    token: auth.token,
    startDate: start,
    endDate: end,
    teacherCodes: tCodes,
    page: AppState.historyPage,
    limit: 1000,
  })
    .then((data) => {
      loader.style.display = "none";
      if (!data) return;
      if (data.status === "success") {
        renderReportsDashboard(data.totals);
        renderHistoryTable(data.history, append);
        if (loadMoreBtn) {
          if (data.page < data.totalPages) {
            loadMoreBtn.style.display = "block";
          } else {
            loadMoreBtn.style.display = "none";
          }
        }
      } else {
        showMsg("حدث خطأ: " + data.message, true);
      }
    })
    .catch((err) => {
      loader.style.display = "none";
      showMsg("خطأ في الاتصال", true);
    });
}
function renderReportsDashboard(totals) {
  const dashboard = document.getElementById("historyDashboard");
  dashboard.innerHTML = `
                <div class="dash-card danger"><h4>تأخر صباحي</h4><div class="dash-value">${totals["تأخر صباحي"]}</div><span style="font-size:12px; color:#666;">دقيقة</span></div>
                <div class="dash-card warning"><h4>تأخر بإذن</h4><div class="dash-value">${totals["تأخر بإذن"]}</div><span style="font-size:12px; color:#666;">دقيقة</span></div>
                <div class="dash-card danger"><h4>غياب</h4><div class="dash-value">${totals["غياب"]}</div><span style="font-size:12px; color:#666;">أيام</span></div>
                <div class="dash-card warning"><h4>غياب بعذر</h4><div class="dash-value">${totals["غياب بعذر"]}</div><span style="font-size:12px; color:#666;">أيام</span></div>
                <div class="dash-card success"><h4>إجازة اعتيادي</h4><div class="dash-value">${totals["اعتيادي"]}</div><span style="font-size:12px; color:#666;">أيام</span></div>
                <div class="dash-card success"><h4>إجازة مرضي</h4><div class="dash-value">${totals["مرضي"]}</div><span style="font-size:12px; color:#666;">أيام</span></div>
                <div class="dash-card danger"><h4>خروج بدون إذن</h4><div class="dash-value">${totals["خروج بدون إذن"]}</div><span style="font-size:12px; color:#666;">دقيقة</span></div>
                <div class="dash-card warning"><h4>خروج بإذن</h4><div class="dash-value">${totals["خروج بإذن"]}</div><span style="font-size:12px; color:#666;">دقيقة</span></div>
                <div class="dash-card warning"><h4>إذن صباحي</h4><div class="dash-value">${totals["إذن صباحي"]}</div><span style="font-size:12px; color:#666;">أيام</span></div>
              `;
  dashboard.style.display = "grid";
}
function renderHistoryTable(history, append = false) {
  const tbody = document.querySelector("#historyTable tbody");
  const container = document.getElementById("historyTableContainer");
  const emptyMsg = document.getElementById("historyEmpty");
  const historyFiltersRow = document.getElementById("historyFiltersRow");
  if (!append) {
    AppState.historyPage = 1;
  }
  if (!append) tbody.innerHTML = "";
  if (!history || history.length === 0) {
    if (!append) {
      container.style.display = "none";
      emptyMsg.style.display = "block";
      emptyMsg.innerText = "لا توجد سجلات في هذه الفترة.";
      if (historyFiltersRow) historyFiltersRow.style.display = "none";
    }
    return;
  }
  const fragment = document.createDocumentFragment();
  history.forEach((row) => {
    let badgeClass = getBadgeClass(row.type);
    let dateOnly = escHtml(row.date.split("T")[0]);
    let suffix = TIME_BASED_ACTIONS.includes(row.type) ? "ق" : "يوم";
    let eName = escHtml(row.name);
    let eType = escHtml(row.type);
    let eAdmin = escHtml(row.admin);
    let rowData = {
      rowId: row.rowId,
      date: dateOnly,
      name: row.name,
      type: row.type,
      amount: row.amount,
      notes: row.notes,
    };
    let tr = document.createElement("tr");
    tr.setAttribute("data-type", row.type);
    AppState.rowDataStore.set(tr, rowData);
    tr.innerHTML = `
                  <td class="no-print" style="vertical-align: middle;">
                    <input type="checkbox" class="history-check-item" value="" onchange="updateBulkActionState()" style="transform:scale(1.2); accent-color:#0056b3; cursor:pointer;">
                  </td>
                  <td style="color:#555;">${dateOnly}</td>
                  <td><strong>${eName}</strong></td>
                  <td><span class="badge ${badgeClass}">${eType}</span></td>
                  <td style="font-weight:bold; color:#0056b3;">${row.amount} ${suffix}</td>
                  <td style="font-size:13px; color:#888;">${eAdmin}</td>
                  <td class="no-print" style="min-width: 140px; vertical-align: middle;">
                    <div style="display:flex; justify-content:center; gap:5px;">
                      <button class="btn-info edit-btn" style="padding:6px; font-size:12px; margin:0; flex:1; max-width:60px;">تعديل</button>
                      <button class="btn-logout delete-btn" style="padding:6px; font-size:12px; margin:0; flex:1; max-width:60px;">حذف</button>
                    </div>
                  </td>
                `;
    const checkbox = tr.querySelector(".history-check-item");
    checkbox._rowData = rowData;
    tr.querySelector(".edit-btn").addEventListener("click", () =>
      openEditModal(AppState.rowDataStore.get(tr)),
    );
    tr.querySelector(".delete-btn").addEventListener("click", () => {
      let info = AppState.rowDataStore.get(tr);
      deleteRecord(info.rowId, info.date, info.name, info.type, info.amount);
    });
    fragment.appendChild(tr);
  });
  tbody.appendChild(fragment);
  container.style.display = "block";
  emptyMsg.style.display = "none";
  if (historyFiltersRow && !append) {
    historyFiltersRow.style.display = "flex";
  }
  const selectAll = document.getElementById("selectAllHistory");
  if (selectAll) selectAll.checked = false;
  updateBulkActionState();
}
function openEditModal(obj) {
  document.getElementById("editModal").style.display = "flex";
  focusFirstInModal("editModal");
  document.getElementById("editRowId").value = obj.rowId || "";
  document.getElementById("editOldDate").value = obj.date;
  document.getElementById("editOldName").value = obj.name;
  document.getElementById("editOldType").value = obj.type;
  document.getElementById("editOldAmount").value = obj.amount;
  document.getElementById("editNewType").value = obj.type;
  document.getElementById("editNewAmount").value = obj.amount;
  document.getElementById("editNewNotes").value = obj.notes || "";
}
function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
  document.getElementById("editNewType").value = "تأخر صباحي";
  document.getElementById("editNewAmount").value = "";
  document.getElementById("editNewNotes").value = "";
}
function submitEditRecord() {
  const auth = getAuth();
  if (!auth) return;
  const rowId = document.getElementById("editRowId").value;
  const oldDate = document.getElementById("editOldDate").value;
  const oldName = document.getElementById("editOldName").value;
  const oldType = document.getElementById("editOldType").value;
  const oldAmount = document.getElementById("editOldAmount").value;
  const newType = document.getElementById("editNewType").value;
  const newAmount = document.getElementById("editNewAmount").value;
  const newNotes = document.getElementById("editNewNotes").value;
  document.getElementById("historyLoader").style.display = "block";
  closeEditModal();
  apiPost({
    action: "editRecord",
    token: auth.token,
    rowId: rowId,
    oldDate: oldDate,
    oldName: oldName,
    oldType: oldType,
    oldAmount: oldAmount,
    newType: newType,
    newAmount: newAmount,
    newNotes: newNotes,
  })
    .then((data) => {
      if (!data) return;
      if (data.status === "success") {
        showMsg("تم التعديل بنجاح", false);
        fetchHistoryData(true);
      } else {
        showMsg("خطأ: " + data.message, true);
        document.getElementById("historyLoader").style.display = "none";
      }
    })
    .catch((err) => {
      showMsg("خطأ في الاتصال", true);
      document.getElementById("historyLoader").style.display = "none";
    });
}
function deleteRecord(rowId, date, name, type, amount) {
  customConfirm(
    "هل أنت متأكد من حذف هذا السجل نهائياً؟ لا يمكن التراجع عن هذه الخطوة.",
    function () {
      const auth = getAuth();
      if (!auth) return;
      const allRows = document.querySelectorAll("#historyTable tbody tr");
      allRows.forEach((tr) => {
        const data = AppState.rowDataStore.get(tr);
        if (data && data.rowId === rowId) {
          tr.style.transition = "background 0.3s, opacity 0.5s";
          tr.style.background = "#ffcccc";
          tr.style.opacity = "0.5";
        }
      });
      document.getElementById("historyLoader").style.display = "block";
      apiPost({
        action: "deleteRecord",
        token: auth.token,
        rowId: rowId,
        date: date,
        name: name,
        type: type,
        amount: amount,
      })
        .then((data) => {
          if (!data) return;
          if (data.status === "success") {
            showMsg("تم الحذف بنجاح", false);
            fetchHistoryData(true);
          } else {
            showMsg("خطأ: " + data.message, true);
            document.getElementById("historyLoader").style.display = "none";
          }
        })
        .catch((err) => {
          showMsg("خطأ في الاتصال", true);
          document.getElementById("historyLoader").style.display = "none";
        });
    },
  );
}
function getBadgeClass(type) {
  if (DANGER_BADGE_TYPES.includes(type)) return "badge-danger";
  if (SUCCESS_BADGE_TYPES.includes(type)) return "badge-success";
  return "badge-warning";
}
function fetchTeacherStats(token, fromLogin = false) {
  const loader = document.getElementById(
    fromLogin ? "loginLoader" : "teacherLoader",
  );
  if (!fromLogin) loader.style.display = "block";
  apiPost({ action: "getTeacherStats", token: token })
    .then((data) => {
      if (!data) return;
      loader.style.display = "none";
      if (data.status === "success") {
        if (fromLogin) {
          document.getElementById("globalLoader").style.display = "none";
          document.getElementById("loginContainer").style.display = "none";
          const lBtn = document.getElementById("loginBtn");
          lBtn.style.display = "block";
          lBtn.disabled = false;
          lBtn.classList.add("pulse-button");
          lBtn.querySelector(".btn-text").innerText = "دخول المنصة";
          checkAuth(true);
        }
        animateCircle(
          "circleAttendance",
          "textAttendance",
          Math.round(data.stats.attendanceRate),
          100,
          "%",
        );
        animateCircle(
          "circleCasual",
          "textCasual",
          data.stats.remainingCasual,
          data.stats.maxCasual,
          "",
        );
        const lateMax = Math.max(data.stats.totalLateMins, 300);
        animateCircle(
          "circleLate",
          "textLate",
          data.stats.totalLateMins,
          lateMax,
          "ق",
        );
        const detailedGrid = document.getElementById("teacherDetailedStats");
        detailedGrid.innerHTML = `
                    <div class="dash-card danger"><h4>تأخر صباحي</h4><div class="dash-value">${data.stats.lateMorning}</div><span style="font-size:12px; color:#666;">دقيقة</span></div>
                    <div class="dash-card warning"><h4>تأخر بإذن</h4><div class="dash-value">${data.stats.lateExcused}</div><span style="font-size:12px; color:#666;">دقيقة</span></div>
                    <div class="dash-card danger"><h4>خروج بدون إذن</h4><div class="dash-value">${data.stats.leaveNoExcuse}</div><span style="font-size:12px; color:#666;">دقيقة</span></div>
                    <div class="dash-card warning"><h4>خروج بإذن</h4><div class="dash-value">${data.stats.leaveExcused}</div><span style="font-size:12px; color:#666;">دقيقة</span></div>
                    <div class="dash-card danger"><h4>غياب</h4><div class="dash-value">${data.stats.absent}</div><span style="font-size:12px; color:#666;">أيام</span></div>
                    <div class="dash-card warning"><h4>غياب بعذر</h4><div class="dash-value">${data.stats.absentExcused}</div><span style="font-size:12px; color:#666;">أيام</span></div>
                    <div class="dash-card warning"><h4>إذن صباحي</h4><div class="dash-value">${data.stats.permissionMorning}</div><span style="font-size:12px; color:#666;">أيام</span></div>
                    <div class="dash-card success"><h4>إجازة مرضي</h4><div class="dash-value">${data.stats.sickLeave}</div><span style="font-size:12px; color:#666;">أيام</span></div>
                    <div class="dash-card success"><h4>إجازة اعتيادي</h4><div class="dash-value">${data.stats.casualLeave}</div><span style="font-size:12px; color:#666;">أيام</span></div>
                  `;
        buildTimeline(data.history);
        fetchMyRequests(token);
      } else if (data.message && data.message.includes("منتهية")) {
        executeLogoutLocal();
      }
    })
    .catch((err) => {
      loader.style.display = "none";
      if (fromLogin) {
        document.getElementById("globalLoader").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
        const lBtn = document.getElementById("loginBtn");
        lBtn.style.display = "block";
        lBtn.disabled = false;
        lBtn.classList.add("pulse-button");
        lBtn.querySelector(".btn-text").innerText = "دخول المنصة";
        document.getElementById("inputsWrapper").style.display = "block";
        showMsg("حدث خطأ في جلب البيانات.", true);
      } else {
        showMsg("خطأ في الشبكة أو الاتصال", true);
      }
    });
}
function animateCircle(circleId, textId, value, maxVal, suffix) {
  const circle = document.getElementById(circleId);
  const text = document.getElementById(textId);
  let percentage = (value / maxVal) * 100;
  if (percentage > 100) percentage = 100;
  if (percentage < 0) percentage = 0;
  setTimeout(() => {
    circle.setAttribute("stroke-dasharray", `${percentage}, 100`);
    text.innerHTML = value + suffix;
  }, 300);
}
function buildTimeline(history) {
  const container = document.getElementById("teacherTimeline");
  container.innerHTML = "";
  if (!history || history.length === 0) {
    container.innerHTML =
      "<p style='text-align:center; color:#888;'>لا يوجد سجل إجراءات حالياً.</p>";
    return;
  }
  const fragment = document.createDocumentFragment();
  history.forEach((item) => {
    let dateStr = "";
    try {
      dateStr = item.date.split("T")[0];
    } catch (e) {
      dateStr = item.date;
    }
    const div = document.createElement("div");
    div.className = "timeline-item";
    const dateDiv = document.createElement("div");
    dateDiv.className = "timeline-date";
    dateDiv.textContent = dateStr;
    div.appendChild(dateDiv);
    const typeDiv = document.createElement("div");
    typeDiv.className = "timeline-title";
    typeDiv.textContent = item.type;
    div.appendChild(typeDiv);
    if (item.notes) {
      const notesDiv = document.createElement("div");
      notesDiv.className = "timeline-notes";
      notesDiv.textContent = item.notes;
      div.appendChild(notesDiv);
    }
    fragment.appendChild(div);
  });
  container.appendChild(fragment);
}
function fetchApprovalsData(isManual = false) {
  const auth = getAuth();
  if (!auth) return;
  if (!isManual && Date.now() - AppState.lastApprovalsFetch <= 60000) {
    return;
  }
  const loader = document.getElementById("approvalsLoader");
  const container = document.getElementById("approvalsTableContainer");
  const emptyMsg = document.getElementById("approvalsEmpty");
  loader.style.display = "block";
  container.style.display = "none";
  emptyMsg.style.display = "none";
  apiPost({ action: "getLeaveRequests", token: auth.token })
    .then((data) => {
      if (!data) return;
      loader.style.display = "none";
      if (data.status === "success") {
        AppState.lastApprovalsFetch = Date.now();
        renderApprovalsTable(data.requests);
      } else {
        showMsg(data.message, true);
      }
    })
    .catch((err) => {
      loader.style.display = "none";
      showMsg("خطأ في الاتصال", true);
    });
}
function renderApprovalsTable(requests) {
  const container = document.getElementById("approvalsTableContainer");
  const emptyMsg = document.getElementById("approvalsEmpty");
  const tbody = document.querySelector("#approvalsTable tbody");
  tbody.innerHTML = "";
  if (!requests || requests.length === 0) {
    emptyMsg.style.display = "block";
    container.style.display = "none";
    return;
  }
  requests.forEach((req) => {
    let tr = document.createElement("tr");
    let badgeClass = getBadgeClass(req.status);
    tr.innerHTML = `
                  <td><strong>${escHtml(req.name)}</strong></td>
                  <td>${escHtml(req.requestType)}</td>
                  <td style="color:#555;">${escHtml(formatDateString(req.startDate))}</td>
                  <td style="color:#555;">${escHtml(formatDateString(req.endDate))}</td>
                  <td style="font-weight:bold; color:#0056b3;">${escHtml(req.amount)} يوم</td>
                  <td style="font-size:13px; color:#666;">${escHtml(req.reason)}</td>
                  <td><span class="badge ${badgeClass}"><span aria-hidden="true" style="margin-left:4px;">${badgeClass === "badge-success" ? "✅" : badgeClass === "badge-danger" ? "❌" : badgeClass === "badge-warning" ? "⏳" : ""}</span>${escHtml(req.status)}</span></td>
                  <td class="action-cell"></td>
                `;
    const actionCell = tr.querySelector(".action-cell");
    if (req.status === "معلق" || req.status === "قيد المراجعة") {
      let btn = document.createElement("button");
      btn.className = "btn-info";
      btn.innerText = "مراجعة";
      btn.style.padding = "6px 12px";
      btn.style.fontSize = "13px";
      btn.onclick = () => openReviewModal(req);
      actionCell.appendChild(btn);
    } else {
      actionCell.innerText = "-";
    }
    tbody.appendChild(tr);
  });
  container.style.display = "block";
  emptyMsg.style.display = "none";
}
function openReviewModal(req) {
  document.getElementById("reviewRequestId").value = req.requestId;
  document.getElementById("reviewRequestCode").value = req.code;
  document.getElementById("reviewRequestName").value = req.name;
  document.getElementById("reviewRequestType").value = req.requestType;
  const cleanStart = formatDateString(req.startDate);
  const cleanEnd = formatDateString(req.endDate);
  document.getElementById("reviewRequestStart").value = cleanStart;
  document.getElementById("reviewRequestEnd").value = cleanEnd;
  document.getElementById("reviewSummary").innerHTML = `
                <div style="font-size:16px; font-weight:bold; color:#0056b3; margin-bottom:5px;">${escHtml(req.name)}</div>
                <div style="font-size:14px; color:#333; margin-bottom:5px;"><strong>نوع الطلب:</strong> ${escHtml(req.requestType)}</div>
                <div style="font-size:14px; color:#333; margin-bottom:5px;"><strong>الفترة المطلوبة:</strong> من ${escHtml(cleanStart)} إلى ${escHtml(cleanEnd)} (${escHtml(req.amount)} أيام)</div>
                <div style="font-size:14px; color:#666;"><strong>السبب:</strong> ${escHtml(req.reason)}</div>
              `;
  const container = document.getElementById("requestDaysCheckboxes");
  container.innerHTML = "";
  const [sy, sm, sd] = cleanStart.split("-").map(Number);
  const startDate = new Date(sy, sm - 1, sd);
  const [ey, em, ed] = cleanEnd.split("-").map(Number);
  const endDate = new Date(ey, em - 1, ed);
  const { fragment } = createDateCheckboxes(
    startDate,
    endDate,
    "req-day-check-item",
  );
  if (fragment) container.appendChild(fragment);
  document.querySelector(
    'input[name="approvalMode"][value="fromRequest"]',
  ).checked = true;
  document.getElementById("approvalCustomArea").style.display = "none";
  document.getElementById("approvalFromRequestArea").style.display = "block";
  document.getElementById("adminMessageInput").value = "";
  document.getElementById("customApprovalStart").value = getLocalDate();
  document.getElementById("customApprovalEnd").value = getLocalDate();
  document.getElementById("reviewRequestModal").style.display = "flex";
  focusFirstInModal("reviewRequestModal");
}
function toggleApprovalMode() {
  const mode = document.querySelector(
    'input[name="approvalMode"]:checked',
  ).value;
  if (mode === "fromRequest") {
    document.getElementById("approvalFromRequestArea").style.display = "block";
    document.getElementById("approvalCustomArea").style.display = "none";
  } else {
    document.getElementById("approvalFromRequestArea").style.display = "none";
    document.getElementById("approvalCustomArea").style.display = "block";
    if (!document.getElementById("customApprovalStart").value) {
      document.getElementById("customApprovalStart").value = getLocalDate();
    }
    if (!document.getElementById("customApprovalEnd").value) {
      document.getElementById("customApprovalEnd").value = getLocalDate();
    }
    generateApprovalCheckboxes();
  }
}
function generateApprovalCheckboxes() {
  const startStr = document.getElementById("customApprovalStart").value;
  const endStr = document.getElementById("customApprovalEnd").value;
  const container = document.getElementById("customApprovalCheckboxes");
  container.innerHTML = "";
  if (!startStr || !endStr) return;
  const [sy, sm, sd] = startStr.split("-").map(Number);
  const startDate = new Date(sy, sm - 1, sd);
  const [ey, em, ed] = endStr.split("-").map(Number);
  const endDate = new Date(ey, em - 1, ed);
  if (endDate < startDate) return;
  const { fragment } = createDateCheckboxes(
    startDate,
    endDate,
    "custom-day-check-item",
  );
  if (fragment) container.appendChild(fragment);
}
function submitApproval() {
  const auth = getAuth();
  if (!auth) return;
  const mode = document.querySelector(
    'input[name="approvalMode"]:checked',
  ).value;
  let selectedDates = [];
  if (mode === "fromRequest") {
    document
      .querySelectorAll(".req-day-check-item:checked")
      .forEach((cb) => selectedDates.push(cb.value));
  } else {
    document
      .querySelectorAll(".custom-day-check-item:checked")
      .forEach((cb) => selectedDates.push(cb.value));
  }
  if (selectedDates.length === 0) {
    showMsg("يرجى اختيار تاريخ واحد على الأقل", true);
    return;
  }
  const requestId = document.getElementById("reviewRequestId").value;
  const approvedAmount = selectedDates.length;
  const adminMessage = document.getElementById("adminMessageInput").value;
  customConfirm(
    "سيتم اعتماد الطلب وتسجيل التواريخ تلقائياً، هل أنت متأكد؟",
    () => {
      apiPost({
        action: "approveLeaveRequest",
        token: auth.token,
        requestId: requestId,
        approvedDates: selectedDates.join(","),
        approvedAmount: approvedAmount,
        adminMessage: adminMessage,
      })
        .then((data) => {
          if (!data) return;
          if (data.status === "success") {
            closeReviewModal();
            fetchApprovalsData();
            showMsg("تم الاعتماد وتسجيل الأيام بنجاح", false);
          } else {
            showMsg(data.message, true);
          }
        })
        .catch((err) => {
          showMsg("خطأ في الاتصال", true);
        });
    },
  );
}
function submitRejection() {
  const auth = getAuth();
  if (!auth) return;
  const requestId = document.getElementById("reviewRequestId").value;
  const adminMessage = document.getElementById("adminMessageInput").value;
  customConfirm("هل أنت متأكد من رفض هذا الطلب؟", () => {
    apiPost({
      action: "rejectLeaveRequest",
      token: auth.token,
      requestId: requestId,
      adminMessage: adminMessage,
    })
      .then((data) => {
        if (!data) return;
        if (data.status === "success") {
          closeReviewModal();
          fetchApprovalsData();
          showMsg("تم رفض الطلب", false);
        } else {
          showMsg(data.message, true);
        }
      })
      .catch((err) => {
        showMsg("خطأ في الاتصال", true);
      });
  });
}
function closeReviewModal() {
  document.getElementById("reviewRequestModal").style.display = "none";
  document.getElementById("reviewRequestId").value = "";
  document.getElementById("reviewRequestCode").value = "";
  document.getElementById("reviewRequestName").value = "";
  document.getElementById("reviewRequestType").value = "";
  document.getElementById("reviewRequestStart").value = "";
  document.getElementById("reviewRequestEnd").value = "";
  document.getElementById("reviewSummary").innerHTML = "";
  document.getElementById("requestDaysCheckboxes").innerHTML = "";
  document.getElementById("customApprovalStart").value = "";
  document.getElementById("customApprovalEnd").value = "";
  document.getElementById("customApprovalCheckboxes").innerHTML = "";
  document.getElementById("adminMessageInput").value = "";
}
function sendSystemMessage() {
  const auth = getAuth();
  if (!auth) return;
  const targetCodes = AppState.msgSelectedTeachers.map((t) => t.code);
  const messageText = document.getElementById("msgTextArea").value.trim();
  if (!messageText) {
    showMsg("يرجى كتابة نص الرسالة", true);
    return;
  }
  customConfirm("هل أنت متأكد من إرسال هذه الرسالة؟", () => {
    apiPost({
      action: "sendSystemMessage",
      token: auth.token,
      targetCodes: targetCodes,
      messageText: messageText,
    })
      .then((data) => {
        if (!data) return;
        if (data.status === "success") {
          document.getElementById("msgTextArea").value = "";
          showMsg("تم إرسال الرسالة بنجاح", false);
        } else {
          showMsg(data.message, true);
        }
      })
      .catch((err) => {
        showMsg("خطأ في الاتصال", true);
      });
  });
}
function getWorkingDaysCount(startStr, endStr) {
  if (!startStr || !endStr || startStr > endStr) return 0;
  const msPerDay = 24 * 60 * 60 * 1000;
  const startParts = startStr.split("-");
  const utcStart = Date.UTC(startParts[0], startParts[1] - 1, startParts[2]);
  const endParts = endStr.split("-");
  const utcEnd = Date.UTC(endParts[0], endParts[1] - 1, endParts[2]);
  let count = 0;
  for (let d = utcStart; d <= utcEnd; d += msPerDay) {
    const dayOfWeek = new Date(d).getUTCDay();
    if (dayOfWeek !== 5 && dayOfWeek !== 6) count++;
  }
  return count;
}
function updateLiveDaysCount() {
  const start = document.getElementById("reqStartDate").value;
  const end = document.getElementById("reqEndDate").value;
  const countDisplay = document.getElementById("liveDaysCount");
  const countValue = document.getElementById("liveDaysValue");
  if (start && end && start <= end) {
    countDisplay.style.display = "block";
    countValue.innerText = getWorkingDaysCount(start, end);
  } else {
    countDisplay.style.display = "none";
  }
}
document
  .getElementById("reqStartDate")
  .addEventListener("change", updateLiveDaysCount);
document
  .getElementById("reqEndDate")
  .addEventListener("change", updateLiveDaysCount);
function openNewRequestModal() {
  document.getElementById("reqStartDate").value = getLocalDate();
  document.getElementById("reqEndDate").value = getLocalDate();
  document.getElementById("newRequestModal").style.display = "flex";
  updateLiveDaysCount();
  focusFirstInModal("newRequestModal");
}
function closeNewRequestModal() {
  document.getElementById("newRequestModal").style.display = "none";
  document.getElementById("reqType").value = "إجازة اعتيادي";
  document.getElementById("reqStartDate").value = "";
  document.getElementById("reqEndDate").value = "";
  document.getElementById("reqReason").value = "";
  document.getElementById("liveDaysCount").style.display = "none";
}
function fetchMyRequests(token) {
  const loader = document.getElementById("myRequestsLoader");
  if (loader) loader.style.display = "block";
  apiPost({ action: "getMyRequests", token: token })
    .then((data) => {
      if (loader) loader.style.display = "none";
      if (data && data.status === "success") {
        renderMyRequests(data.requests);
      }
    })
    .catch((err) => {
      if (loader) loader.style.display = "none";
      showMsg("خطأ في الشبكة أو الاتصال", true);
    });
}
function submitNewRequest() {
  const auth = getAuth();
  if (!auth) return;
  const reqType = document.getElementById("reqType").value;
  const reqStartDate = document.getElementById("reqStartDate").value;
  const reqEndDate = document.getElementById("reqEndDate").value;
  const reqReason = document.getElementById("reqReason").value.trim();
  if (!reqType || !reqStartDate || !reqEndDate || !reqReason) {
    showMsg("يرجى ملء جميع الحقول", true);
    return;
  }
  if (reqStartDate > reqEndDate) {
    showMsg("تاريخ البداية يجب أن يكون قبل تاريخ النهاية", true);
    return;
  }
  const amount = getWorkingDaysCount(reqStartDate, reqEndDate);
  apiPost({
    action: "submitLeaveRequest",
    token: auth.token,
    requestType: reqType,
    startDate: reqStartDate,
    endDate: reqEndDate,
    amount: amount,
    reason: reqReason,
    code: auth.code,
    name: auth.name,
  })
    .then((data) => {
      if (!data) return;
      if (data.status === "success") {
        closeNewRequestModal();
        showMsg("تم إرسال الطلب بنجاح، في انتظار الموافقة", false);
        fetchMyRequests(auth.token);
      } else {
        showMsg(data.message, true);
      }
    })
    .catch((err) => {
      showMsg("خطأ في الاتصال", true);
    });
}
function renderMyRequests(requests) {
  const container = document.getElementById("myRequestsContainer");
  const emptyMsg = document.getElementById("myRequestsEmpty");
  const tbody = document.querySelector("#myRequestsTable tbody");
  tbody.innerHTML = "";
  if (!requests || requests.length === 0) {
    emptyMsg.style.display = "block";
    container.style.display = "none";
    return;
  }
  requests.forEach((req) => {
    let tr = document.createElement("tr");
    let badgeClass = getBadgeClass(req.status);
    tr.innerHTML = `
                  <td><strong>${escHtml(req.requestType)}</strong></td>
                  <td style="color:#555;">${escHtml(formatDateString(req.startDate))}</td>
                  <td style="color:#555;">${escHtml(formatDateString(req.endDate))}</td>
                  <td><span class="badge ${badgeClass}"><span aria-hidden="true" style="margin-left:4px;">${badgeClass === "badge-success" ? "✅" : badgeClass === "badge-danger" ? "❌" : badgeClass === "badge-warning" ? "⏳" : ""}</span>${escHtml(req.status)}</span></td>
                  <td style="font-size:13px; color:#666;">${escHtml(req.adminMessage) || "-"}</td>
                `;
    tbody.appendChild(tr);
  });
  container.style.display = "block";
  emptyMsg.style.display = "none";
}

function showGlobalLoader() {
  const loader = document.getElementById("globalLoader");
  if (loader) loader.style.display = "flex";
}
function hideGlobalLoader() {
  const loader = document.getElementById("globalLoader");
  if (loader) loader.style.display = "none";
}

function showRegistrationPage() {
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("inputsWrapper").style.display = "none";
  document.getElementById("registrationContainer").style.display = "block";
}
function hideRegistrationPage() {
  document.getElementById("registrationContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("inputsWrapper").style.display = "block";
}
function showRegistrationRequestsList() {
  document.getElementById("empWelcomeScreen").style.display = "none";
  document.getElementById("regRequestsListPanel").style.display = "block";
  fetchRegistrationRequests();
}
function hideRegistrationRequestsList() {
  document.getElementById("regRequestsListPanel").style.display = "none";
  document.getElementById("empWelcomeScreen").style.display = "block";
}

function togglePublicTeacherFields() {
  const empType = document.getElementById("pubRegEmployeeType").value;
  const isTeacher = empType === "معلم";
  document.getElementById("pubRegTeachingGradesContainer").style.display =
    isTeacher ? "block" : "none";
  document.getElementById("pubRegTeachingClassesContainer").style.display =
    isTeacher ? "block" : "none";
  document.getElementById("pubRegAssignedActivityContainer").style.display =
    isTeacher ? "none" : "block";
}

function submitPublicRegistration() {
  const payload = {
    code: document.getElementById("pubRegCode").value,
    name: document.getElementById("pubRegName").value,
    nid: document.getElementById("pubRegNid").value,
    gender: document.getElementById("pubRegGender").value,
    nationality: document.getElementById("pubRegNationality").value,
    religion: document.getElementById("pubRegReligion").value,
    birthDate: document.getElementById("pubRegBirthDate").value,
    phone: document.getElementById("pubRegPhone").value,
    email: document.getElementById("pubRegEmail").value,
    employeeType: document.getElementById("pubRegEmployeeType").value,
    specialization: document.getElementById("pubRegSpecialization").value,
    teachingGrades: document.getElementById("pubRegTeachingGrades").value,
    teachingClasses: document.getElementById("pubRegTeachingClasses").value,
    assignedActivity: document.getElementById("pubRegAssignedActivity").value,
    qualificationType: document.getElementById("pubRegQualificationType").value,
    qualificationName: document.getElementById("pubRegQualificationName").value,
    qualificationEntity: document.getElementById("pubRegQualificationEntity")
      .value,
    qualificationGrade: document.getElementById("pubRegQualificationGrade")
      .value,
    qualificationDate: document.getElementById("pubRegQualificationDate").value,
    notes: document.getElementById("pubRegNotes").value,
  };
  if (!payload.name || !payload.nid || !payload.code) {
    showMsg("الرجاء إدخال الاسم والرقم القومي وكود الموظف على الأقل.", true);
    return;
  }

  const submitBtn = document.getElementById("pubRegSubmitBtn");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = "جاري الإرسال...";
  submitBtn.disabled = true;

  apiPost({ action: "submitRegistrationRequest", emp: payload })
    .then((res) => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      if (res.status === "success") {
        hideRegistrationPage();
        showMsg(res.message);
        document.getElementById("pubRegCode").value = "";
        document.getElementById("pubRegName").value = "";
        document.getElementById("pubRegNid").value = "";
        document.getElementById("pubRegGender").value = "";
        document.getElementById("pubRegNationality").value = "";
        document.getElementById("pubRegReligion").value = "";
        document.getElementById("pubRegBirthDate").value = "";
        document.getElementById("pubRegPhone").value = "";
        document.getElementById("pubRegEmail").value = "";
        document.getElementById("pubRegEmployeeType").value = "";
        document.getElementById("pubRegSpecialization").value = "";
        document.getElementById("pubRegTeachingGrades").value = "";
        document.getElementById("pubRegTeachingClasses").value = "";
        document.getElementById("pubRegAssignedActivity").value = "";
        document.getElementById("pubRegQualificationType").value = "";
        document.getElementById("pubRegQualificationName").value = "";
        document.getElementById("pubRegQualificationEntity").value = "";
        document.getElementById("pubRegQualificationGrade").value = "";
        document.getElementById("pubRegQualificationDate").value = "";
        document.getElementById("pubRegNotes").value = "";
      } else {
        showMsg(res.message, true);
      }
    })
    .catch((err) => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showMsg("حدث خطأ في الاتصال", true);
    });
}

let currentAdminRequests = [];
function fetchRegistrationRequests() {
  const auth = getAuth();
  if (!auth || auth.role !== "Admin") {
    showMsg("صلاحيات غير كافية", true);
    return;
  }
  document.getElementById("regRequestsLoader").style.display = "block";
  document.getElementById("regRequestsTableContainer").style.display = "none";
  document.getElementById("regRequestsEmptyMsg").style.display = "none";
  apiPost({ action: "getRegistrationRequests", token: auth.token })
    .then((res) => {
      document.getElementById("regRequestsLoader").style.display = "none";
      if (res.status === "success") {
        currentAdminRequests = res.requests;
        renderRegistrationRequests();
      } else {
        showMsg(res.message, true);
      }
    })
    .catch(() => {
      document.getElementById("regRequestsLoader").style.display = "none";
      showMsg("حدث خطأ في الاتصال", true);
    });
}

function renderRegistrationRequests() {
  const tbody = document.querySelector("#registrationRequestsTable tbody");
  const container = document.getElementById("regRequestsTableContainer");
  const emptyMsg = document.getElementById("regRequestsEmptyMsg");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (!currentAdminRequests || currentAdminRequests.length === 0) {
    container.style.display = "none";
    emptyMsg.style.display = "block";
    return;
  }

  currentAdminRequests.forEach((req) => {
    let tr = document.createElement("tr");
    let badgeClass = getBadgeClass(req.status);
    let actionHtml = `<span class="badge ${badgeClass}">${escHtml(req.status)}</span>`;
    if (req.status === "قيد المراجعة") {
      actionHtml += ` <button class="btn-info" onclick="openAdminReviewModal('${req.reqId}')" style="margin-right: 10px; padding: 4px 10px; font-size: 12px;">مراجعة</button>`;
    }
    let safeDate = escHtml(
      req.submissionDate ? req.submissionDate.substring(0, 10) : "-",
    );
    tr.innerHTML = `
                  <td><strong>${escHtml(req.employeeType || "-")}</strong></td>
                  <td>${escHtml(req.name || "-")}</td>
                  <td style="color:#555;">${escHtml(req.specialization || "-")}</td>
                  <td style="color:#555;">${safeDate}</td>
                  <td>${actionHtml}</td>
                `;
    tbody.appendChild(tr);
  });
  container.style.display = "block";
  emptyMsg.style.display = "none";
}

function toggleRevEmployeeTypeFields() {
  const isTeacher =
    document.getElementById("revEditEmployeeType").value === "معلم";
  document.getElementById("revEditTeachingGradesContainer").style.display =
    isTeacher ? "block" : "none";
  document.getElementById("revEditTeachingClassesContainer").style.display =
    isTeacher ? "block" : "none";
  document.getElementById("revEditAssignedActivityContainer").style.display =
    isTeacher ? "none" : "block";
}

function openAdminReviewModal(reqId) {
  const req = currentAdminRequests.find((r) => r.reqId === reqId);
  if (!req) return;
  document.getElementById("revReqId").value = req.reqId;
  document.getElementById("revEditName").value = req.name || "";
  document.getElementById("revEditNid").value = req.nid || "";
  document.getElementById("revAssignCode").value = req.code || "";
  document.getElementById("revEditGender").value = req.gender || "";
  document.getElementById("revEditNationality").value = req.nationality || "";
  document.getElementById("revEditReligion").value = req.religion || "";
  document.getElementById("revEditBirthDate").value = req.birthDate || "";
  document.getElementById("revEditPhone").value = req.phone || "";
  document.getElementById("revEditEmail").value = req.email || "";
  document.getElementById("revAssignRole").value = req.role || "Teacher";
  document.getElementById("revEditEmployeeType").value = req.employeeType || "";
  document.getElementById("revEditSpecialization").value =
    req.specialization || "";
  document.getElementById("revEditTeachingGrades").value =
    req.teachingGrades || "";
  document.getElementById("revEditTeachingClasses").value =
    req.teachingClasses || "";
  document.getElementById("revEditAssignedActivity").value =
    req.assignedActivity || "";
  document.getElementById("revEditQualType").value =
    req.qualificationType || "";
  document.getElementById("revEditQualName").value =
    req.qualificationName || "";
  document.getElementById("revEditQualEntity").value =
    req.qualificationEntity || "";
  document.getElementById("revEditQualGrade").value =
    req.qualificationGrade || "";
  document.getElementById("revEditQualDate").value =
    req.qualificationDate || "";
  document.getElementById("revEditNotes").value = req.notes || "";
  document.getElementById("revAdminMessage").value = "";
  toggleRevEmployeeTypeFields();
  document.getElementById("adminReviewModal").style.display = "flex";
}
function closeAdminReviewModal() {
  document.getElementById("adminReviewModal").style.display = "none";
}

function approveRegistration() {
  const auth = getAuth();
  if (!auth) return;

  const reqId = document.getElementById("revReqId").value;
  const code = document.getElementById("revAssignCode").value;
  const adminMsg = document.getElementById("revAdminMessage").value;
  if (!code) {
    showMsg("يجب تخصيص كود للموظف", true);
    return;
  }
  const emp = {
    code: code,
    role: document.getElementById("revAssignRole").value,
    status: "نشط",
    name: document.getElementById("revEditName").value,
    nid: document.getElementById("revEditNid").value,
    gender: document.getElementById("revEditGender").value,
    nationality: document.getElementById("revEditNationality").value,
    religion: document.getElementById("revEditReligion").value,
    birthDate: document.getElementById("revEditBirthDate").value,
    phone: document.getElementById("revEditPhone").value,
    email: document.getElementById("revEditEmail").value,
    employeeType: document.getElementById("revEditEmployeeType").value,
    specialization: document.getElementById("revEditSpecialization").value,
    teachingGrades: document.getElementById("revEditTeachingGrades").value,
    teachingClasses: document.getElementById("revEditTeachingClasses").value,
    assignedActivity: document.getElementById("revEditAssignedActivity").value,
    qualificationType: document.getElementById("revEditQualType").value,
    qualificationName: document.getElementById("revEditQualName").value,
    qualificationEntity: document.getElementById("revEditQualEntity").value,
    qualificationGrade: document.getElementById("revEditQualGrade").value,
    qualificationDate: document.getElementById("revEditQualDate").value,
    notes: document.getElementById("revEditNotes").value,
  };
  const btnApprove = document.getElementById("btnApproveReq");
  const btnReject = document.getElementById("btnRejectReq");
  const origApproveHtml = btnApprove.innerHTML;
  btnApprove.innerHTML = "جاري التنفيذ...";
  btnApprove.disabled = true;
  btnReject.disabled = true;

  apiPost({
    action: "approveRegistrationRequest",
    token: auth.token,
    reqId: reqId,
    adminMessage: adminMsg,
    emp: emp,
  })
    .then((res) => {
      btnApprove.innerHTML = origApproveHtml;
      btnApprove.disabled = false;
      btnReject.disabled = false;
      if (res.status === "success") {
        closeAdminReviewModal();
        fetchRegistrationRequests();
        showMsg(res.message);
      } else {
        showMsg(res.message, true);
      }
    })
    .catch(() => {
      btnApprove.innerHTML = origApproveHtml;
      btnApprove.disabled = false;
      btnReject.disabled = false;
      showMsg("حدث خطأ في الاتصال", true);
    });
}

function rejectRegistration() {
  const auth = getAuth();
  if (!auth) return;

  const reqId = document.getElementById("revReqId").value;
  const adminMsg = document.getElementById("revAdminMessage").value;
  const btnApprove = document.getElementById("btnApproveReq");
  const btnReject = document.getElementById("btnRejectReq");
  const origRejectHtml = btnReject.innerHTML;
  btnReject.innerHTML = "جاري التنفيذ...";
  btnReject.disabled = true;
  btnApprove.disabled = true;

  apiPost({
    action: "rejectRegistrationRequest",
    token: auth.token,
    reqId: reqId,
    adminMessage: adminMsg,
  })
    .then((res) => {
      btnReject.innerHTML = origRejectHtml;
      btnReject.disabled = false;
      btnApprove.disabled = false;
      if (res.status === "success") {
        closeAdminReviewModal();
        fetchRegistrationRequests();
        showMsg(res.message);
      } else {
        showMsg(res.message, true);
      }
    })
    .catch(() => {
      btnReject.innerHTML = origRejectHtml;
      btnReject.disabled = false;
      btnApprove.disabled = false;
      showMsg("حدث خطأ في الاتصال", true);
    });
}
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const regContainer = document.getElementById("registrationContainer");
    if (regContainer && regContainer.style.display === "block") {
      hideRegistrationPage();
    }
    const adminRevModal = document.getElementById("adminReviewModal");
    if (adminRevModal && adminRevModal.style.display === "flex") {
      closeAdminReviewModal();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const regContainer = document.getElementById("registrationContainer");
  if (regContainer && typeof trapFocus === "function") trapFocus(regContainer);

  const adminRevModal = document.getElementById("adminReviewModal");
  if (adminRevModal && typeof trapFocus === "function")
    trapFocus(adminRevModal);
});

flatpickr('.flatpickr-date, input[type="date"]', {
  locale: "ar",
  dateFormat: "Y-m-d",
  disableMobile: true,
  allowInput: true,
});
