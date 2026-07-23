      const T = {
        en: {
          appName: "AudioMonitor",
          appSub: "Real-time Studio",
          heroTitle: "Real-time Levels",
          heroDesc:
            "Monitor your input and output audio frequencies directly in the browser. No data is uploaded or recorded.",
          micTitle: "Microphone Input",
          micLabel: "Microphone",
          micDesc:
            "Visualizes audio captured directly from your default microphone.",
          sysTitle: "System Audio",
          sysLabel: "System Audio",
          sysDesc:
            "Capture output audio by selecting 'Share tab audio' in the prompt.",
          startBtn: "Start Monitoring",
          stopBtn: "Stop",
          readyTitle: "Ready to monitor",
          readySub: "Click Start to begin capturing audio",
          sensitivity: "Sensitivity",
          smoothing: "Smoothing",
          waveform: "Waveform",
          color: "Color",
          bars: "Bars",
          wave: "Wave",
          mirror: "Mirror",
          showHide: "Show / Hide:",
          layout: "Layout:",
          layoutSide: "Side by side",
          layoutStack: "Stacked",
          madeBy: "Made by",
          authorName: "Mohammed Samir",
          langToggle: "AR",
          alertMic: "Could not access microphone:\n",
          alertSys:
            'No audio track detected.\nPlease enable "Share tab audio" in the sharing prompt.',
          alertSysErr: "Could not capture system audio:\n",
        },
        ar: {
          appName: "مؤشر الصوت",
          appSub: "استوديو مباشر",
          heroTitle: "المستويات الفورية",
          heroDesc:
            "راقب ترددات الصوت الداخلة والخارجة مباشرةً في المتصفح. لا يُرفع أي بيانات أو يُسجَّل.",
          micTitle: "إدخال الميكروفون",
          micLabel: "الميكروفون",
          micDesc: "يعرض الصوت المسجَّل مباشرةً من الميكروفون الافتراضي.",
          sysTitle: "صوت النظام",
          sysLabel: "صوت النظام",
          sysDesc:
            'التقط صوت الإخراج عن طريق اختيار "مشاركة صوت التبويب" في موجه المشاركة.',
          startBtn: "بدء المراقبة",
          stopBtn: "إيقاف",
          readyTitle: "جاهز للمراقبة",
          readySub: "اضغط ابدأ لالتقاط الصوت",
          sensitivity: "الحساسية",
          smoothing: "النعومة",
          waveform: "شكل الموجة",
          color: "اللون",
          bars: "أعمدة",
          wave: "موجة",
          mirror: "مرآة",
          showHide: "إظهار / إخفاء:",
          layout: "التخطيط:",
          layoutSide: "جنباً إلى جنب",
          layoutStack: "فوق بعض",
          madeBy: "من تصميم",
          authorName: "محمد سمير",
          langToggle: "EN",
          alertMic: "تعذّر الوصول إلى الميكروفون:\n",
          alertSys: 'لم يُكتشف مسار صوتي.\nتأكد من تفعيل "مشاركة صوت التبويب".',
          alertSysErr: "تعذّر التقاط صوت النظام:\n",
        },
      };

      let lang = "en";
      let isDark = true;
      let layoutMode = "side";
      const cardVis = { mic: true, sys: true };
      const micCfg = {
        mode: "bars",
        sensitivity: 1,
        smoothing: 0.75,
        scheme: "ocean",
      };
      const sysCfg = {
        mode: "bars",
        sensitivity: 1,
        smoothing: 0.75,
        scheme: "ocean",
      };

      function saveState() {
        try {
          const state = { lang, isDark, layoutMode, cardVis, micCfg, sysCfg };
          localStorage.setItem("audioMonitorSettings", JSON.stringify(state));
        } catch (e) {
          console.warn("Could not save settings to localStorage", e);
        }
      }

      function loadState() {
        try {
          const saved = localStorage.getItem("audioMonitorSettings");
          if (saved) {
            const state = JSON.parse(saved);
            if (state.lang) lang = state.lang;
            if (state.isDark !== undefined) isDark = state.isDark;
            if (state.layoutMode) layoutMode = state.layoutMode;
            if (state.cardVis) {
              cardVis.mic = state.cardVis.mic;
              cardVis.sys = state.cardVis.sys;
            }
            if (state.micCfg) Object.assign(micCfg, state.micCfg);
            if (state.sysCfg) Object.assign(sysCfg, state.sysCfg);
          }
        } catch (e) {
          console.warn("Could not load settings from localStorage", e);
        }
      }

      function applyLang() {
        const t = T[lang];
        const isAr = lang === "ar";
        document.documentElement.lang = lang;
        document.documentElement.dir = isAr ? "rtl" : "ltr";
        const s = (id, v) => {
          const el = document.getElementById(id);
          if (el) el.textContent = v;
        };

        s("t-appName", t.appName);
        s("t-appSub", t.appSub);
        s("t-heroTitle", t.heroTitle);
        s("t-heroDesc", t.heroDesc);
        s("t-micTitle", t.micTitle);
        s("t-micLabel", t.micLabel);
        s("t-micDesc", t.micDesc);
        s("t-sysTitle", t.sysTitle);
        s("t-sysLabel", t.sysLabel);
        s("t-sysDesc", t.sysDesc);
        s("t-showHide", t.showHide);
        s("t-layout", t.layout);
        s("t-madeBy", t.madeBy);
        s("t-authorName", t.authorName);
        s("lang-label", t.langToggle);
        s("t-sens-mic", t.sensitivity);
        s("t-smooth-mic", t.smoothing);
        s("t-wave-mic", t.waveform);
        s("t-color-mic", t.color);
        s("t-sens-sys", t.sensitivity);
        s("t-smooth-sys", t.smoothing);
        s("t-wave-sys", t.waveform);
        s("t-color-sys", t.color);

        ["mic", "sys"].forEach((id) => {
          s(`${id}-m-bars`, t.bars);
          s(`${id}-m-wave`, t.wave);
          s(`${id}-m-mirror`, t.mirror);
        });
        s("t-micIdleTitle", t.readyTitle);
        s("t-micIdleSub", t.readySub);
        s("t-sysIdleTitle", t.readyTitle);
        s("t-sysIdleSub", t.readySub);

        document.getElementById("btn-side").title = t.layoutSide;
        document.getElementById("btn-stack").title = t.layoutStack;

        updateBtn("mic", micActive);
        updateBtn("sys", sysActive);
        updateSwatchTitles();
      }

      function toggleLang() {
        lang = lang === "en" ? "ar" : "en";
        applyLang();
        saveState();
      }

      const moonSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>`;
      const sunSVG = `<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>`;

      function applyTheme() {
        document.documentElement.setAttribute(
          "data-theme",
          isDark ? "dark" : "light"
        );
        document.getElementById("theme-icon").innerHTML = isDark
          ? sunSVG
          : moonSVG;
      }

      function toggleTheme() {
        isDark = !isDark;
        clearGradCache();
        applyTheme();
        saveState();
      }

      function setLayout(m) {
        layoutMode = m;
        const wrap = document.getElementById("cards-wrap");
        wrap.classList.remove("side", "stack");
        wrap.classList.add(m);
        document
          .getElementById("btn-side")
          .classList.toggle("active", m === "side");
        document
          .getElementById("btn-stack")
          .classList.toggle("active", m === "stack");
        saveState();
      }

      const SCHEMES = [
        {
          id: "ocean",
          label_en: "Ocean",
          label_ar: "محيط",
          h1: 200,
          h2: 260,
          preview: "linear-gradient(90deg,#38bdf8,#818cf8)",
        },
        {
          id: "aurora",
          label_en: "Aurora",
          label_ar: "شفق",
          h1: 140,
          h2: 200,
          preview: "linear-gradient(90deg,#34d399,#38bdf8)",
        },
        {
          id: "sunset",
          label_en: "Sunset",
          label_ar: "غروب",
          h1: 0,
          h2: 50,
          preview: "linear-gradient(90deg,#f97316,#facc15)",
        },
        {
          id: "fire",
          label_en: "Fire",
          label_ar: "نار",
          h1: 340,
          h2: 30,
          preview: "linear-gradient(90deg,#ec4899,#f97316)",
        },
        {
          id: "violet",
          label_en: "Violet",
          label_ar: "بنفسجي",
          h1: 260,
          h2: 320,
          preview: "linear-gradient(90deg,#8b5cf6,#ec4899)",
        },
        {
          id: "mono",
          label_en: "Mono",
          label_ar: "أحادي",
          h1: 220,
          h2: 220,
          preview: "linear-gradient(90deg,#6366f1,#6366f1)",
        },
      ];

      function buildSwatches(id) {
        const el = document.getElementById(`${id}-swatches`);
        el.innerHTML = "";
        SCHEMES.forEach((sc) => {
          const b = document.createElement("div");
          b.className = "swatch";
          b.style.background = sc.preview;
          b.dataset.sid = sc.id;
          b.addEventListener("click", () => setScheme(id, sc.id));
          el.appendChild(b);
        });
      }

      function updateSwatchTitles() {
        ["mic", "sys"].forEach((id) => {
          SCHEMES.forEach((sc) => {
            const el = document.querySelector(
              `#${id}-swatches .swatch[data-sid="${sc.id}"]`
            );
            if (el) el.title = lang === "ar" ? sc.label_ar : sc.label_en;
          });
        });
      }

      function setScheme(id, sid) {
        (id === "mic" ? micCfg : sysCfg).scheme = sid;
        document.querySelectorAll(`#${id}-swatches .swatch`).forEach((s) => {
          s.classList.toggle("active", s.dataset.sid === sid);
        });
        clearGradCache(id);
        saveState();
      }

      buildSwatches("mic");
      buildSwatches("sys");

      function getScheme(sid) {
        return SCHEMES.find((s) => s.id === sid) || SCHEMES[0];
      }

      const eyeOpen = `<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>`;
      const eyeClosed = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`;

      function applyCardVis() {
        ["mic", "sys"].forEach((id) => {
          const isVis = cardVis[id];
          document
            .getElementById(`${id}-card`)
            .classList.toggle("card-hidden", !isVis);
          document
            .getElementById(`${id}-vis-tag`)
            .classList.toggle("card-hidden-tag", !isVis);
          document.getElementById(`${id}-eye`).innerHTML = isVis
            ? eyeOpen
            : eyeClosed;
        });
      }

      function toggleCardVis(id) {
        cardVis[id] = !cardVis[id];
        applyCardVis();
        saveState();
      }

      function toggleSettings(id) {
        const p = document.getElementById(`${id}-settings`);
        const b = document.getElementById(`${id}-stg-btn`);
        const open = !p.classList.contains("open");
        p.classList.toggle("open", open);
        b.classList.toggle("open", open);
      }

      function updateProp(id, prop, val) {
        const obj = id === "mic" ? micCfg : sysCfg;
        obj[prop] = +val;
        const disp =
          prop === "sensitivity"
            ? Math.round(val * 100) + "%"
            : parseFloat(val).toFixed(2);
        document.getElementById(
          `${id}-${prop === "sensitivity" ? "sens" : "smooth"}-val`
        ).textContent = disp;
        if (prop === "smoothing") {
          const analyser = id === "mic" ? micAnalyser : sysAnalyser;
          if (analyser) analyser.smoothingTimeConstant = val;
        }
        saveState();
      }

      function setMode(id, mode) {
        (id === "mic" ? micCfg : sysCfg).mode = mode;
        ["bars", "wave", "mirror"].forEach((m) => {
          document
            .getElementById(`${id}-m-${m}`)
            .classList.toggle("active", m === mode);
        });
        saveState();
      }

      const canvases = { mic: null, sys: null };
      const ctxs = { mic: null, sys: null };

      const gradCache = { mic: {}, sys: {} };
      function clearGradCache(id) {
        if (id) gradCache[id] = {};
        else {
          gradCache.mic = {};
          gradCache.sys = {};
        }
      }

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

      function getWaveGrad(ctx, W, sc, id) {
        const key = `wave-${Math.round(W)}-${sc.h1}-${sc.h2}`;
        if (!gradCache[id][key]) {
          const g = ctx.createLinearGradient(0, 0, W, 0);
          g.addColorStop(0, `hsl(${sc.h1},80%,62%)`);
          g.addColorStop(1, `hsl(${sc.h2},80%,62%)`);
          gradCache[id][key] = g;
        }
        return gradCache[id][key];
      }

      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const canvas = entry.target.querySelector("canvas");
          if (canvas) {
            canvas.width = entry.contentRect.width;
            canvas.height = entry.contentRect.height;
            clearGradCache();
          }
        }
      });

      const NUM = 56;
      const peaks = {
        mic: new Array(NUM).fill(0),
        sys: new Array(NUM).fill(0),
      };

      function drawRoundRect(ctx, x, y, w, h, r) {
        if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
        else ctx.rect(x, y, w, h);
      }

      function drawCanvas(id, freqData, timeData, cfg) {
        const c = canvases[id];
        const ctx = ctxs[id];
        const W = c.width,
          H = c.height;
        if (!W || !H) return;

        const bgColor = isDark ? "#080b14" : "#f2f5fc";
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, W, H);
        ctx.shadowBlur = 0;

        const { mode, sensitivity, scheme } = cfg;
        const sc = getScheme(scheme || "ocean");

        if (mode === "wave") {
          const data = timeData;
          ctx.beginPath();
          const sw = W / data.length;
          for (let i = 0; i < data.length; i++) {
            const v = data[i] / 128 - 1;
            const y = H / 2 + v * ((H / 2) * 0.88) * Math.min(3, sensitivity);
            i === 0 ? ctx.moveTo(i * sw, y) : ctx.lineTo(i * sw, y);
          }
          ctx.strokeStyle = getWaveGrad(ctx, W, sc, id);
          ctx.lineWidth = 2;
          ctx.shadowColor = `hsl(${sc.h1},80%,62%)`;
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
          return;
        }

        const data = freqData;
        const step = Math.floor(data.length / NUM);
        const vals = [];
        for (let i = 0; i < NUM; i++) {
          vals.push(
            Math.min(1, (data[i * step] / 255) * Math.min(3, sensitivity))
          );
        }

        const barW = Math.max(1, (W - (NUM - 1) * 2) / NUM);

        for (let i = 0; i < NUM; i++) {
          const v = vals[i];
          const decayRate = peaks[id][i] > 0.7 ? 0.008 : 0.018;
          peaks[id][i] = Math.max(peaks[id][i] - decayRate, v);

          const t = i / (NUM - 1);
          const hue = sc.h1 + (sc.h2 - sc.h1) * t;

          let bh, py, ph;
          if (mode === "mirror") {
            bh = v * ((H / 2) * 0.92);
            py = H / 2 - peaks[id][i] * ((H / 2) * 0.92) - 2;
            ph = 2;
          } else {
            bh = Math.max(2, v * (H - 10));
            py = H - Math.max(2, peaks[id][i] * (H - 10)) - 4;
            ph = 2;
          }

          const x = i * (barW + 2);
          ctx.fillStyle = getBarGrad(ctx, H, hue, id);

          if (v > 0.06) {
            ctx.shadowColor = `hsla(${hue},90%,65%,.4)`;
            ctx.shadowBlur = v * 10;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.beginPath();
          if (mode === "mirror") {
            const cy = H / 2;
            drawRoundRect(ctx, x, cy - bh, barW, bh, 2);
            ctx.fill();
            ctx.beginPath();
            drawRoundRect(ctx, x, cy, barW, bh, 2);
          } else {
            drawRoundRect(ctx, x, H - bh, barW, bh, 2);
          }
          ctx.fill();

          ctx.shadowBlur = 0;

          ctx.fillStyle = `hsla(${hue},90%,75%,0.8)`;
          ctx.beginPath();
          drawRoundRect(ctx, x, py, barW, ph, 1);
          ctx.fill();

          if (mode === "mirror") {
            const py_bottom = H / 2 + peaks[id][i] * ((H / 2) * 0.92);
            ctx.beginPath();
            drawRoundRect(ctx, x, py_bottom, barW, ph, 1);
            ctx.fill();
          }
        }
      }

      let globalAudioCtx = null;
      async function getAudioCtx() {
        if (!globalAudioCtx || globalAudioCtx.state === "closed") {
          globalAudioCtx = new AudioContext();
          micAnalyser = null;
          sysAnalyser = null;
        }
        if (globalAudioCtx.state === "suspended") {
          await globalAudioCtx.resume();
        }
        return globalAudioCtx;
      }

      let micActive = false,
        micAnalyser,
        micSrc,
        micStream;
      let sysActive = false,
        sysAnalyser,
        sysSrc,
        sysStream;
      let rafId = null;

      const freqBuf = { mic: null, sys: null };
      const timeBuf = { mic: null, sys: null };

      function animate() {
        rafId = requestAnimationFrame(animate);
        if (micActive && cardVis.mic && micAnalyser) {
          micAnalyser.getByteFrequencyData(freqBuf.mic);
          micAnalyser.getByteTimeDomainData(timeBuf.mic);
          drawCanvas("mic", freqBuf.mic, timeBuf.mic, micCfg);
          const db = calcDb(timeBuf.mic);
          document.getElementById("mic-db").textContent =
            db !== null ? db : "∞";
        }
        if (sysActive && cardVis.sys && sysAnalyser) {
          sysAnalyser.getByteFrequencyData(freqBuf.sys);
          sysAnalyser.getByteTimeDomainData(timeBuf.sys);
          drawCanvas("sys", freqBuf.sys, timeBuf.sys, sysCfg);
          const db = calcDb(timeBuf.sys);
          document.getElementById("sys-db").textContent =
            db !== null ? db : "∞";
        }
      }

      function calcDb(timeArr) {
        let s = 0;
        for (let i = 0; i < timeArr.length; i++) {
          const v = timeArr[i] / 128 - 1;
          s += v * v;
        }
        const rms = Math.sqrt(s / timeArr.length);
        return rms < 0.0001 ? null : Math.round(20 * Math.log10(rms));
      }

      const playIcon = `<svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><polygon points="2,1 11,6 2,11"/></svg>`;
      const stopIcon = `<svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="2" width="8" height="8" rx="1"/></svg>`;

      function updateBtn(id, active) {
        const btn = document.getElementById(`${id}-btn`);
        const t = T[lang];
        btn.classList.toggle("active", active);
        btn.innerHTML = active
          ? `${stopIcon}<span>${t.stopBtn}</span>`
          : `${playIcon}<span>${t.startBtn}</span>`;
      }

      async function toggleMic() {
        if (!micActive) {
          try {
            micStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false,
            });
            const actx = await getAudioCtx();
            micAnalyser = actx.createAnalyser();
            micAnalyser.fftSize = 2048;
            micAnalyser.smoothingTimeConstant = micCfg.smoothing;
            freqBuf.mic = new Uint8Array(micAnalyser.frequencyBinCount);
            timeBuf.mic = new Uint8Array(micAnalyser.fftSize);
            micSrc = actx.createMediaStreamSource(micStream);
            micSrc.connect(micAnalyser);
            micActive = true;
            document.getElementById("mic-idle").classList.add("hidden");
            updateBtn("mic", true);
            peaks.mic.fill(0);
            if (!rafId) animate();
          } catch (e) {
            alert(T[lang].alertMic + e.message);
          }
        } else {
          stopMic();
        }
      }

      function stopMic() {
        micActive = false;
        if (micSrc) {
          micSrc.disconnect();
          micSrc = null;
        }
        if (micStream) {
          micStream.getTracks().forEach((t) => t.stop());
          micStream = null;
        }
        micAnalyser = null;
        document.getElementById("mic-idle").classList.remove("hidden");
        document.getElementById("mic-db").textContent = "∞";
        updateBtn("mic", false);
        const ctx = ctxs.mic;
        ctx.fillStyle = isDark ? "#080b14" : "#f2f5fc";
        ctx.fillRect(0, 0, canvases.mic.width, canvases.mic.height);
        if (!sysActive) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }

      async function toggleSys() {
        if (!sysActive) {
          try {
            sysStream = await navigator.mediaDevices.getDisplayMedia({
              audio: true,
              video: true,
            });
            sysStream.getVideoTracks().forEach((t) => t.stop());
            if (sysStream.getAudioTracks().length === 0) {
              sysStream.getTracks().forEach((t) => t.stop());
              alert(T[lang].alertSys);
              return;
            }
            const actx = await getAudioCtx();
            sysAnalyser = actx.createAnalyser();
            sysAnalyser.fftSize = 2048;
            sysAnalyser.smoothingTimeConstant = sysCfg.smoothing;
            freqBuf.sys = new Uint8Array(sysAnalyser.frequencyBinCount);
            timeBuf.sys = new Uint8Array(sysAnalyser.fftSize);
            sysSrc = actx.createMediaStreamSource(sysStream);
            sysSrc.connect(sysAnalyser);
            sysActive = true;
            document.getElementById("sys-idle").classList.add("hidden");
            updateBtn("sys", true);
            peaks.sys.fill(0);
            sysStream.getAudioTracks()[0].addEventListener("ended", stopSys);
            if (!rafId) animate();
          } catch (e) {
            if (e.name !== "NotAllowedError")
              alert(T[lang].alertSysErr + e.message);
          }
        } else {
          stopSys();
        }
      }

      function stopSys() {
        sysActive = false;
        if (sysSrc) {
          sysSrc.disconnect();
          sysSrc = null;
        }
        if (sysStream) {
          sysStream.getTracks().forEach((t) => t.stop());
          sysStream = null;
        }
        sysAnalyser = null;
        document.getElementById("sys-idle").classList.remove("hidden");
        document.getElementById("sys-db").textContent = "∞";
        updateBtn("sys", false);
        const ctx = ctxs.sys;
        ctx.fillStyle = isDark ? "#080b14" : "#f2f5fc";
        ctx.fillRect(0, 0, canvases.sys.width, canvases.sys.height);
        if (!micActive) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }

      document.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
          return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const k = e.key.toLowerCase();
        if (k === "m") toggleMic();
        if (k === "s") toggleSys();
      });

      canvases.mic = document.getElementById("mic-canvas");
      ctxs.mic = canvases.mic.getContext("2d", { alpha: false });
      canvases.sys = document.getElementById("sys-canvas");
      ctxs.sys = canvases.sys.getContext("2d", { alpha: false });

      resizeObserver.observe(document.getElementById("mic-viz-wrap"));
      resizeObserver.observe(document.getElementById("sys-viz-wrap"));

      loadState();
      applyTheme();
      setLayout(layoutMode);
      applyLang();
      applyCardVis();

      document.getElementById("mic-sens").value = micCfg.sensitivity;
      document.getElementById("mic-sens-val").textContent =
        Math.round(micCfg.sensitivity * 100) + "%";
      document.getElementById("mic-smooth").value = micCfg.smoothing;
      document.getElementById("mic-smooth-val").textContent = parseFloat(
        micCfg.smoothing
      ).toFixed(2);

      document.getElementById("sys-sens").value = sysCfg.sensitivity;
      document.getElementById("sys-sens-val").textContent =
        Math.round(sysCfg.sensitivity * 100) + "%";
      document.getElementById("sys-smooth").value = sysCfg.smoothing;
      document.getElementById("sys-smooth-val").textContent = parseFloat(
        sysCfg.smoothing
      ).toFixed(2);

      setMode("mic", micCfg.mode);
      setMode("sys", sysCfg.mode);
      setScheme("mic", micCfg.scheme);
      setScheme("sys", sysCfg.scheme);