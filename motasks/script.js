      import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
      import {
        getFirestore,
        doc,
        setDoc,
        onSnapshot,
      } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

      const firebaseConfig = {
        apiKey: "AIza" + "SyBheVYASi7Oje3XtPVZapHqTY4h6am6xhU",
        authDomain: "dental-schedule-mosamirhelal.firebaseapp.com",
        projectId: "dental-schedule-mosamirhelal",
        storageBucket: "dental-schedule-mosamirhelal.firebasestorage.app",
        messagingSenderId: "1040445715314",
        appId: "1:1040445715314:web:82990dc4bf007d9a64a3eb",
      };

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const scheduleDocRef = doc(db, "schedules", "main_schedule_v2");

      const tableBody = document.querySelector("#scheduleTable tbody");
      const statusMsg = document.getElementById("statusMsg");
      let saveTimeout;

      function updateStatus(type, message) {
        statusMsg.className = `status-badge ${type}`;
        statusMsg.innerHTML = message;

        if (type === "success") {
          setTimeout(() => {
            statusMsg.className = "status-badge";
            statusMsg.innerHTML = "● Ready";
          }, 3000);
        }
      }

      onSnapshot(
        scheduleDocRef,
        (docSnap) => {
          if (docSnap.exists() && docSnap.data().htmlContent) {
            if (document.activeElement.tagName !== "TD") {
              tableBody.innerHTML = docSnap.data().htmlContent;
              reattachEvents();
              updateStatus("success", "✅ Synced");
            }
          } else if (!docSnap.exists()) {
            updateStatus("success", "ℹ️ New Schedule Created");

            if (tableBody.children.length === 0) addNewRow();
          }
        },
        (error) => {
          console.error("Firebase Error:", error);
          updateStatus("error", "❌ Connection Error");
        }
      );

      async function saveToFirebase() {
        updateStatus("saving", "⏳ Saving...");

        const checkboxes = tableBody.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((cb) => {
          if (cb.checked) {
            cb.setAttribute("checked", "true");
          } else {
            cb.removeAttribute("checked");
          }
        });

        try {
          await setDoc(scheduleDocRef, { htmlContent: tableBody.innerHTML });
          updateStatus("success", "✅ Saved");
        } catch (e) {
          console.error(e);
          updateStatus("error", "❌ Save Failed");
        }
      }

      function reattachEvents() {
        tableBody.querySelectorAll("[contenteditable]").forEach((cell) => {
          cell.oninput = () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveToFirebase, 1000);
          };
        });

        tableBody.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
          cb.onchange = saveToFirebase;
        });

        tableBody.querySelectorAll(".delete-btn").forEach((btn) => {
          btn.onclick = function () {
            if (confirm("Delete this task?")) {
              this.closest("tr").remove();
              saveToFirebase();
            }
          };
        });
      }

      function addNewRow() {
        const newRow = document.createElement("tr");
        const today = new Date().toLocaleDateString("en-GB");

        newRow.innerHTML = `
            <td contenteditable="true">New Task...</td>
            <td contenteditable="true">${today}</td>
            <td contenteditable="true">-</td>
            <td contenteditable="true">-</td>
            <td style="text-align: center;">
                <input type="checkbox" class="custom-checkbox">
            </td>
            <td style="text-align: center;">
                <button class="delete-btn" title="Delete">🗑️</button>
            </td>
        `;

        tableBody.appendChild(newRow);
        reattachEvents();
        saveToFirebase();
      }

      document.getElementById("addBtn").addEventListener("click", addNewRow);

      reattachEvents();
