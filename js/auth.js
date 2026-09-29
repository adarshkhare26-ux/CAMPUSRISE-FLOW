/* ==========================================================================
   Viksit CareerBridge — Auth Page Logic (Role + Mode + Validation)
   ========================================================================== */

let currentRole = 'student';
let currentMode = 'login';

function setRole(role) {
    currentRole = role;
    const sBtnEl = document.getElementById('role-btn-student');
    const rBtnEl = document.getElementById('role-btn-recruiter');
    const titleEl = document.getElementById('auth-title');
    const subtitleEl = document.getElementById('auth-subtitle');
    const studEx = document.getElementById('student-extras');
    const corpEx = document.getElementById('recruiter-extras');

    if (role === 'student') {
        sBtnEl.className = 'role-switch-btn active-student';
        rBtnEl.className = 'role-switch-btn';
        titleEl.innerText = 'Student Portal Access';
        subtitleEl.innerText = 'Bridge campus learning to top corporate placements';
        if (studEx) studEx.classList.remove('hidden');
        if (corpEx) corpEx.classList.add('hidden');
    } else {
        rBtnEl.className = 'role-switch-btn active-corporate';
        sBtnEl.className = 'role-switch-btn';
        titleEl.innerText = 'Corporate Recruiter Access';
        subtitleEl.innerText = 'Source and hire verified talent from MP universities';
        if (corpEx) corpEx.classList.remove('hidden');
        if (studEx) studEx.classList.add('hidden');
    }
}

function setMode(mode) {
    currentMode = mode;
    const loginTab = document.getElementById('tab-login');
    const regTab   = document.getElementById('tab-register');
    const regFields = document.getElementById('register-fields');
    const submitBtn = document.getElementById('btn-submit');

    if (mode === 'login') {
        loginTab.classList.add('active'); regTab.classList.remove('active');
        regFields.classList.add('hidden');
        submitBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Sign In to Portal';
    } else {
        regTab.classList.add('active'); loginTab.classList.remove('active');
        regFields.classList.remove('hidden');
        submitBtn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create Account';
    }
}

function togglePassword(inputId, iconEl) {
    const inp = document.getElementById(inputId);
    if (inp.type === 'password') {
        inp.type = 'text';
        iconEl.className = 'fa-solid fa-eye-slash input-toggle';
    } else {
        inp.type = 'password';
        iconEl.className = 'fa-solid fa-eye input-toggle';
    }
}

function checkStrength(val) {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    const fill = document.getElementById('strength-fill');
    const label = document.getElementById('strength-label');
    if (!fill) return;
    const map = [
        { w: '0%',   bg: '#EF4444', lbl: '' },
        { w: '25%',  bg: '#EF4444', lbl: 'Weak' },
        { w: '50%',  bg: '#F59E0B', lbl: 'Fair' },
        { w: '75%',  bg: '#3B82F6', lbl: 'Good' },
        { w: '100%', bg: '#10B981', lbl: 'Strong' }
    ];
    const m = map[score];
    fill.style.width = m.w; fill.style.background = m.bg;
    if (label) { label.innerText = m.lbl; label.style.color = m.bg; }
}

function handleGoogleAuth() {
    const name = currentRole === 'student' ? 'Priya Sharma' : 'Rajesh Verma';
    const email = currentRole === 'student' ? 'priya.sharma@rgpv.ac.in' : 'rajesh.verma@tcs.com';
    const user = buildUserObj({ name, email });
    DB.setUser(user);
    showToast('Signed in with Google successfully!', 'success');
    setTimeout(() => window.location.href = 'index.html', 800);
}

function handleFormSubmit(e) {
    e.preventDefault();
    clearErrors();

    const email    = document.getElementById('input-email').value.trim();
    const password = document.getElementById('input-password').value;
    let valid = true;

    if (!email || !email.includes('@')) { showError('email-error', 'Enter a valid email address.'); valid = false; }
    if (!password || password.length < 6) { showError('pass-error', 'Password must be at least 6 characters.'); valid = false; }

    if (currentMode === 'register') {
        const name = document.getElementById('input-name')?.value.trim();
        if (!name) { showError('name-error', 'Full name is required.'); valid = false; }
    }

    if (!valid) return;

    const name = currentMode === 'register'
        ? document.getElementById('input-name').value.trim()
        : (currentRole === 'student' ? 'Priya Sharma' : 'Rajesh Verma');

    const user = buildUserObj({ name, email });
    DB.setUser(user);
    showToast(`Welcome, ${name}!`, 'success');
    setTimeout(() => window.location.href = 'index.html', 700);
}

function buildUserObj({ name, email }) {
    const base = {
        uid: 'user-' + Date.now(),
        name, email,
        role: currentRole,
        initials: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    };
    if (currentRole === 'student') {
        base.college = document.getElementById('input-college')?.value || 'RGPV Bhopal';
        base.branch  = document.getElementById('input-branch')?.value  || 'Computer Science';
    } else {
        base.company     = document.getElementById('input-company')?.value     || 'TCS Digital';
        base.designation = document.getElementById('input-designation')?.value || 'Talent Acquisition Lead';
    }
    return base;
}

function loginDemo(role) {
    const users = {
        student: { uid:'demo-s1', name:'Priya Sharma', email:'priya@rgpv.ac.in', role:'student', college:'RGPV Bhopal', branch:'Computer Science', initials:'PS' },
        corporate: { uid:'demo-r1', name:'Rajesh Verma', email:'rajesh@tcs.com', role:'corporate_recruiter', company:'TCS Digital', designation:'Campus Recruitment Head', initials:'RV' }
    };
    DB.setUser(users[role]);
    showToast(`Demo ${role === 'student' ? 'Student' : 'Recruiter'} account loaded!`, 'success');
    setTimeout(() => window.location.href = 'index.html', 700);
}

/* ── Helpers ─────────────────────────────────────────── */
function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.innerText = msg; el.style.display = 'block'; }
}
function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => { el.style.display = 'none'; el.innerText = ''; });
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
}
