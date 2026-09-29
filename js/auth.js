/* ==========================================================================
   Viksit CareerBridge — Authentication Logic & Session Management
   MPOnline Idea & Innovation Hackathon 2026
   ========================================================================== */

let currentAuthRole = 'student'; // 'student' or 'corporate_recruiter'
let currentAuthMode = 'login';   // 'login' or 'register'

function setAuthRole(role) {
    currentAuthRole = role;
    const studentBtn = document.getElementById('role-btn-student');
    const corporateBtn = document.getElementById('role-btn-corporate');
    const mainTitle = document.getElementById('auth-main-title');
    const mainSubtitle = document.getElementById('auth-main-subtitle');
    const studentFields = document.getElementById('student-extra-fields');
    const corporateFields = document.getElementById('corporate-extra-fields');

    if (role === 'student') {
        studentBtn.className = 'role-switch-btn active-student';
        corporateBtn.className = 'role-switch-btn';
        mainTitle.innerText = 'Student Portal Access';
        mainSubtitle.innerText = 'Bridge your campus learning to top corporate placements';
        studentFields.classList.remove('hidden');
        corporateFields.classList.add('hidden');
    } else {
        corporateBtn.className = 'role-switch-btn active-corporate';
        studentBtn.className = 'role-switch-btn';
        mainTitle.innerText = 'Corporate Recruiter Access';
        mainSubtitle.innerText = 'Source & hire verified campus talent across Madhya Pradesh';
        corporateFields.classList.remove('hidden');
        studentFields.classList.add('hidden');
    }
}

function setAuthMode(mode) {
    currentAuthMode = mode;
    const loginTab = document.getElementById('tab-login');
    const registerTab = document.getElementById('tab-register');
    const registerFields = document.getElementById('register-fields');
    const submitBtn = document.getElementById('btn-auth-submit');

    if (mode === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        registerFields.classList.add('hidden');
        submitBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Sign In to Portal';
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerFields.classList.remove('hidden');
        submitBtn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create Account';
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('input-email').value;
    const password = document.getElementById('input-password').value;
    const fullname = document.getElementById('input-fullname')?.value || (currentAuthRole === 'student' ? 'Priya Sharma' : 'Rajesh Verma');
    const college = document.getElementById('input-college')?.value || 'RGPV Institute of Technology';
    const branch = document.getElementById('input-branch')?.value || 'Computer Science & Engineering';
    const company = document.getElementById('input-company')?.value || 'TCS Digital';

    const userObj = {
        uid: 'user-' + Date.now(),
        name: fullname,
        email: email,
        role: currentAuthRole,
        college: currentAuthRole === 'student' ? college : company,
        branch: currentAuthRole === 'student' ? branch : 'HR / Recruitment',
        readinessScore: currentAuthRole === 'student' ? 78 : null
    };

    window.CareerBridge.saveUserSession(userObj);
    
    // Redirect to Main Portal
    window.location.href = 'index.html';
}

function handleGoogleAuth() {
    const userObj = {
        uid: 'google-user-' + Date.now(),
        name: currentAuthRole === 'student' ? 'Priya Sharma (Google)' : 'Rajesh Verma (Google)',
        email: currentAuthRole === 'student' ? 'priya.sharma@rgpv.ac.in' : 'rajesh.verma@tcs.com',
        role: currentAuthRole,
        college: currentAuthRole === 'student' ? 'RGPV Bhopal' : 'TCS Digital Campus Drive',
        branch: currentAuthRole === 'student' ? 'Computer Science & Engineering' : 'Corporate HR',
        readinessScore: 78
    };

    window.CareerBridge.saveUserSession(userObj);
    window.location.href = 'index.html';
}

function loginDemo(role) {
    if (role === 'student') {
        const studentObj = {
            uid: 'demo-student-001',
            name: 'Priya Sharma',
            email: 'priya.sharma@rgpv.ac.in',
            role: 'student',
            college: 'RGPV Institute of Technology, Bhopal',
            branch: 'Computer Science & Engineering',
            readinessScore: 78
        };
        window.CareerBridge.saveUserSession(studentObj);
    } else {
        const recruiterObj = {
            uid: 'demo-recruiter-001',
            name: 'Rajesh Verma',
            email: 'rajesh.verma@tcs.com',
            role: 'corporate_recruiter',
            college: 'TCS Digital Campus Hiring Team',
            branch: 'Senior Talent Acquisition Lead',
            company: 'TCS Digital'
        };
        window.CareerBridge.saveUserSession(recruiterObj);
    }

    window.location.href = 'index.html';
}
