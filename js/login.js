// ─────────────────────────────────────────
//  login.js  —  JA Construction
//  Handles: role selection, validation,
//           password toggle, form submit
// ─────────────────────────────────────────

const LOGIN = (() => {

  // ── State ──
  let selectedRole = 'employee';
  let isLoading    = false;

  // ── DOM refs ──
  const form        = document.getElementById('login-form');
  const emailInput  = document.getElementById('email');
  const passInput   = document.getElementById('password');
  const passToggle  = document.getElementById('password-toggle');
  const emailError  = document.getElementById('email-error');
  const errorBanner = document.getElementById('error-banner');
  const errorMsg    = document.getElementById('error-msg');
  const submitBtn   = document.getElementById('submit-btn');
  const btnText     = document.getElementById('btn-text');
  const rolePills   = document.querySelectorAll('.role-pill');

  // ── Role selection ──
  function initRolePills() {
    rolePills.forEach(pill => {
      pill.addEventListener('click', () => {
        selectedRole = pill.dataset.role;
        rolePills.forEach(p => p.classList.remove('role-pill--active'));
        pill.classList.add('role-pill--active');
        updateButtonText();
      });
    });
  }

  function updateButtonText() {
    const label = selectedRole === 'admin' ? 'Administrator' : 'Employee';
    btnText.textContent = `Sign in as ${label}`;
  }

  // ── Password toggle ──
  function initPasswordToggle() {
    passToggle.addEventListener('click', () => {
      const isHidden = passInput.type === 'password';
      passInput.type = isHidden ? 'text' : 'password';
      passToggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
      passToggle.innerHTML = isHidden ? ICONS.eyeOff : ICONS.eye;
    });
  }

  // ── Validation ──
  function validate() {
    let valid = true;

    // email
    const emailVal = emailInput.value.trim();
    if (!emailVal || !emailVal.includes('@')) {
      showFieldError(emailInput, emailError, 'Enter a valid email address.');
      valid = false;
    } else {
      clearFieldError(emailInput, emailError);
    }

    // password
    if (!passInput.value) {
      showError('Please enter your password.');
      valid = false;
    }

    return valid;
  }

  function showFieldError(input, errorEl, msg) {
    input.classList.add('field__input--error');
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  function clearFieldError(input, errorEl) {
    input.classList.remove('field__input--error');
    errorEl.hidden = true;
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorBanner.hidden = false;
  }

  function clearError() {
    errorBanner.hidden = true;
  }

  // ── Loading state ──
  function setLoading(loading) {
    isLoading = loading;
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('btn-login--loading', loading);
  }

  // ── Submit ──
  function initForm() {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isLoading) return;

      clearError();
      if (!validate()) return;

      setLoading(true);

      try {
        await attemptLogin(emailInput.value.trim(), passInput.value, selectedRole);
        // ✅ On success: redirect based on role
        // Will be replaced with real auth later
        window.location.href = selectedRole === 'admin'
          ? 'pages/admin/dashboard.html'
          : 'pages/employee/inventory.html';

      } catch (err) {
        showError(err.message || 'Invalid email or password. Please try again.');
      } finally {
        setLoading(false);
      }
    });
  }

  // ── Auth call (mock for now — swap for Firebase/Supabase later) ──
  async function attemptLogin(email, password, role) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // TODO: replace this block with real backend call
    // e.g. firebase.auth().signInWithEmailAndPassword(email, password)

    // Mock: any email/password works — just demo the flow
    if (!email || !password) {
      throw new Error('Please fill in all fields.');
    }

    // Store session (mock)
    sessionStorage.setItem('ja_user', JSON.stringify({ email, role }));
  }

  // ── Init ──
  function init() {
    initRolePills();
    initPasswordToggle();
    initForm();
    updateButtonText();

    // Clear errors on input
    emailInput.addEventListener('input', () => clearFieldError(emailInput, emailError));
    passInput.addEventListener('input',  () => clearError());
  }

  return { init };

})();

// ── SVG Icons ──
const ICONS = {
  eye: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`,
  eyeOff: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`,
};

// ── Boot ──
document.addEventListener('DOMContentLoaded', LOGIN.init);