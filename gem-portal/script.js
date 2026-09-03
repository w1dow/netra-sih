/* ============================================================
   GeM Bid & Tender Assessment Portal — script.js
   ============================================================ */

"use strict";

/* ── Captcha Generator ── */
const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function genCaptcha() {
  let s = "";
  for (let i = 0; i < 6; i++) s += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  return s;
}

const captchaData = { gov: genCaptcha(), company: genCaptcha() };

function renderCaptchas() {
  document.getElementById("gov-captcha-text").textContent    = captchaData.gov;
  document.getElementById("company-captcha-text").textContent = captchaData.company;
}

/* ── Tab Switching ── */
function initTabs() {
  const tabs   = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".form-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected","false"); });
      panels.forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      tab.setAttribute("aria-selected","true");
      document.getElementById(tab.dataset.target).classList.add("active");
      // Clear toasts on switch
      document.querySelectorAll(".toast").forEach(t => t.classList.remove("show"));
    });
  });
}

/* ── Show/Hide Password ── */
function initPasswordToggle() {
  document.querySelectorAll(".toggle-pw").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = btn.closest(".input-wrap").querySelector("input");
      const icon  = btn.querySelector("i");
      if (input.type === "password") {
        input.type = "text";
        icon.className = "fas fa-eye-slash";
        btn.setAttribute("aria-label","Hide password");
      } else {
        input.type = "password";
        icon.className = "fas fa-eye";
        btn.setAttribute("aria-label","Show password");
      }
    });
  });
}

/* ── Captcha Refresh ── */
function initCaptchaRefresh() {
  document.querySelectorAll(".captcha-refresh").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.form;
      captchaData[key] = genCaptcha();
      renderCaptchas();
      // Animate
      btn.style.transform = "rotate(360deg)";
      btn.style.transition = "transform .4s ease";
      setTimeout(() => { btn.style.transform = ""; btn.style.transition = ""; }, 400);
      // Clear captcha input
      const inp = document.getElementById(key + "-captcha-input");
      if (inp) { inp.value = ""; inp.classList.remove("error"); }
      hideError(inp);
    });
  });
}

/* ── Validation Helpers ── */
function showError(input, msg) {
  input.classList.add("error");
  const err = input.closest(".form-group")?.querySelector(".field-error");
  if (err) { err.textContent = ""; const icon = document.createElement("i"); icon.className = "fas fa-exclamation-circle"; err.appendChild(icon); err.appendChild(document.createTextNode(" " + msg)); err.classList.add("show"); }
}
function hideError(input) {
  if (!input) return;
  input.classList.remove("error");
  const err = input.closest(".form-group")?.querySelector(".field-error");
  if (err) err.classList.remove("show");
}
function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function validateForm(formId) {
  const form   = document.getElementById(formId);
  const isGov  = formId === "gov-form";
  let valid    = true;

  // Email / ID field
  const emailInp = form.querySelector(".email-field");
  const emailVal = emailInp.value.trim();
  hideError(emailInp);
  if (!emailVal) {
    showError(emailInp, "This field is required.");
    valid = false;
  } else if (emailVal.includes("@") && !isValidEmail(emailVal)) {
    showError(emailInp, "Please enter a valid email address.");
    valid = false;
  } else if (emailVal.length < 4) {
    showError(emailInp, "Please enter a valid ID or email.");
    valid = false;
  }

  // Password field
  const pwInp = form.querySelector(".pw-field");
  const pwVal = pwInp.value;
  hideError(pwInp);
  if (!pwVal) {
    showError(pwInp, "Password is required.");
    valid = false;
  } else if (pwVal.length < 6) {
    showError(pwInp, "Password must be at least 6 characters.");
    valid = false;
  }

  // Captcha field
  const key      = isGov ? "gov" : "company";
  const capInp   = document.getElementById(key + "-captcha-input");
  const capVal   = capInp.value.trim().toUpperCase();
  hideError(capInp);
  if (!capVal) {
    showError(capInp, "Please enter the CAPTCHA code.");
    valid = false;
  } else if (capVal !== captchaData[key]) {
    showError(capInp, "Incorrect CAPTCHA. Please try again.");
    capInp.value = "";
    captchaData[key] = genCaptcha();
    renderCaptchas();
    valid = false;
  }

  return valid;
}

/* ── Show Toast ── */
function showToast(id, type, msg) {
  const toast = document.getElementById(id);
  toast.className = "toast " + type + " show";
  toast.innerHTML = `<i class="fas fa-${type==="error"?"times-circle":type==="success"?"check-circle":"info-circle"}"></i> ${msg}`;
  setTimeout(() => toast.classList.remove("show"), 5000);
}

/* ── Form Submit ── */
function initForms() {
  const forms = [
    { formId: "gov-form",     btnId: "gov-login-btn",     toastId: "gov-toast",     type: "Government Officer" },
    { formId: "company-form", btnId: "company-login-btn", toastId: "company-toast", type: "Company / Vendor" },
  ];

  forms.forEach(({ formId, btnId, toastId, type }) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (!validateForm(formId)) {
        showToast(toastId, "error", "Please correct the highlighted fields and try again.");
        return;
      }
      // Simulate login loading
      btn.classList.add("loading");
      btn.querySelector(".btn-text").textContent = "Authenticating…";
      setTimeout(() => {
        btn.classList.remove("loading");
        btn.querySelector(".btn-text").textContent = "Login Securely";
        showModal(type);
      }, 1800);
    });

    // Clear errors on input
    const form = document.getElementById(formId);
    form.querySelectorAll("input").forEach(inp => {
      inp.addEventListener("input", () => hideError(inp));
    });
  });
}

/* ── Demo Modal ── */
function showModal(loginType) {
  const overlay = document.getElementById("demo-modal");
  document.getElementById("modal-login-type").textContent = loginType;
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.getElementById("demo-modal").classList.remove("show");
  document.body.style.overflow = "";
}

/* ── Registration / Help Buttons (demo) ── */
function initDemoButtons() {
  document.querySelectorAll(".reg-card, .help-link-btn").forEach(el => {
    el.addEventListener("click", () => {
      alert("This is a frontend prototype. Registration and help features will be available in the full system.");
    });
  });

  // Close modal on overlay click
  document.getElementById("demo-modal").addEventListener("click", function(e) {
    if (e.target === this) closeModal();
  });

  // Keyboard: Escape closes modal
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // Utility bar links demo
  document.querySelectorAll(".utility-demo").forEach(el => {
    el.addEventListener("click", () => {
      alert("This feature will be available in the full portal.");
    });
  });
}

/* ── Live year in footer ── */
function setYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Accessibility: real-time validation feedback ── */
function initAccessibility() {
  document.querySelectorAll("input").forEach(inp => {
    inp.addEventListener("blur", () => {
      // Subtle blue ring removed on blur
      inp.style.boxShadow = "";
    });
  });
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", () => {
  renderCaptchas();
  initTabs();
  initPasswordToggle();
  initCaptchaRefresh();
  initForms();
  initDemoButtons();
  setYear();
  initAccessibility();
});
