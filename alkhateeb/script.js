window.addEventListener("pageshow", function (event) {
  const overlays = document.querySelectorAll(".redirect-overlay");
  overlays.forEach((overlay) => overlay.remove());
});

function addRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  let x, y;
  if (e.clientX) {
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
  span.style.cssText = `width:${size}px;height:${size}px;left:${
    x - size / 2
  }px;top:${y - size / 2}px`;
  btn.appendChild(span);
  setTimeout(() => span.remove(), 450);
}

function showRedirectOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "redirect-overlay";
  overlay.innerHTML = `
          <div class="redirect-card">
            <div class="spinner"></div>
            <div class="redirect-text">جارٍ تحويلك...</div>
            <div class="redirect-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        `;
  document.body.appendChild(overlay);
}

function navigateWithRipple(event, element, url) {
  event.preventDefault();
  addRipple(event, element);

  setTimeout(() => {
    showRedirectOverlay();
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }, 150);
}
