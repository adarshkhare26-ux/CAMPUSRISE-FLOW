/* ==========================================================================
   Viksit CareerBridge — Central State Management & localStorage Database
   MPOnline Idea & Innovation Hackathon 2026
   ========================================================================== */

const DB = {
    KEYS: {
        USER: 'cb_user',
        READINESS: 'cb_readiness',
        INTERVIEWS: 'cb_interviews',
        DRIVES: 'cb_drives',
        APPLICATIONS: 'cb_applications',
        SHORTLISTS: 'cb_shortlists',
        CANDIDATES: 'cb_candidates'
    },

    /* ── Getters ──────────────────────────────────────── */
    getUser()         { return JSON.parse(localStorage.getItem(this.KEYS.USER) || 'null'); },
    getReadiness()    { return JSON.parse(localStorage.getItem(this.KEYS.READINESS) || 'null'); },
    getInterviews()   { return JSON.parse(localStorage.getItem(this.KEYS.INTERVIEWS) || '[]'); },
    getDrives()       { return JSON.parse(localStorage.getItem(this.KEYS.DRIVES) || '[]'); },
    getApplications() { return JSON.parse(localStorage.getItem(this.KEYS.APPLICATIONS) || '[]'); },
    getShortlists()   { return JSON.parse(localStorage.getItem(this.KEYS.SHORTLISTS) || '[]'); },
    getCandidates()   { return JSON.parse(localStorage.getItem(this.KEYS.CANDIDATES) || '[]'); },

    /* ── Setters ──────────────────────────────────────── */
    setUser(u)      { localStorage.setItem(this.KEYS.USER, JSON.stringify(u)); },
    setReadiness(r) { localStorage.setItem(this.KEYS.READINESS, JSON.stringify(r)); },
    saveInterview(iv) {
        const list = this.getInterviews();
        list.unshift(iv);
        localStorage.setItem(this.KEYS.INTERVIEWS, JSON.stringify(list));
    },
    applyToDrive(driveId, driveTitle, companyName) {
        const apps = this.getApplications();
        if (!apps.find(a => a.driveId === driveId)) {
            apps.push({ driveId, driveTitle, companyName, appliedAt: new Date().toISOString(), status: 'Applied' });
            localStorage.setItem(this.KEYS.APPLICATIONS, JSON.stringify(apps));
        }
    },
    saveDrive(drive) {
        const drives = this.getDrives();
        drives.unshift(drive);
        localStorage.setItem(this.KEYS.DRIVES, JSON.stringify(drives));
    },
    shortlistCandidate(candidate) {
        const list = this.getShortlists();
        if (!list.find(c => c.uid === candidate.uid)) {
            list.push({ ...candidate, shortlistedAt: new Date().toISOString() });
            localStorage.setItem(this.KEYS.SHORTLISTS, JSON.stringify(list));
        }
    },

    /* ── Seed Default Data (first run) ───────────────── */
    seedDefaults() {
        if (!this.getReadiness()) {
            this.setReadiness({
                overallScore: 78,
                technicalScore: 82,
                softSkillsScore: 74,
                domainScore: 70,
                verifiedBadges: ['Python & SQL', 'Data Structures', 'Git & GitHub', 'NPTEL Swayam Track'],
                upgradeSkills: ['Cloud Architecture', 'System Design', 'Docker & CI/CD'],
                resumeScore: 64
            });
        }
        if (!this.getDrives().length) {
            localStorage.setItem(this.KEYS.DRIVES, JSON.stringify([
                { id:'d1', companyName:'TCS Digital', jobTitle:'Junior Software Engineer', minScore:75, stipend:'₹7.0–9.0 LPA', location:'Indore IT Park', skills:['Python','SQL','DSA'], verified:true, deadline:'2026-10-20' },
                { id:'d2', companyName:'MPSEDC (State Govt)', jobTitle:'Cloud & Data Analyst Intern', minScore:70, stipend:'₹25,000/month', location:'Bhopal Smart City', skills:['Data Analytics','Power BI','SQL'], verified:true, deadline:'2026-10-15' },
                { id:'d3', companyName:'Infosys Ltd.', jobTitle:'Specialist Programmer (Full Stack)', minScore:82, stipend:'₹9.5 LPA', location:'Indore / Remote', skills:['ReactJS','Node.js','PostgreSQL'], verified:true, deadline:'2026-11-01' },
                { id:'d4', companyName:'Wipro Technologies', jobTitle:'Junior ML & AI Engineer', minScore:78, stipend:'₹8.0 LPA', location:'Bhopal', skills:['Python','ML Basics','NumPy'], verified:true, deadline:'2026-10-25' }
            ]));
        }
        if (!this.getCandidates().length) {
            localStorage.setItem(this.KEYS.CANDIDATES, JSON.stringify([
                { uid:'c1', name:'Priya Sharma', initials:'PS', college:'RGPV Bhopal', branch:'CSE', score:78, aiScore:8.8, skills:['Python','SQL','Data Analytics'], interviews:3, verified:true },
                { uid:'c2', name:'Rahul Kumar', initials:'RK', college:'MANIT Bhopal', branch:'IT', score:84, aiScore:9.2, skills:['ReactJS','Node.js','PostgreSQL'], interviews:2, verified:true },
                { uid:'c3', name:'Ananya Singh', initials:'AS', college:'SGSITS Indore', branch:'CS', score:91, aiScore:9.6, skills:['AI/ML','Python','TensorFlow'], interviews:4, verified:true },
                { uid:'c4', name:'Arjun Patel', initials:'AP', college:'LNCT Bhopal', branch:'CSE', score:72, aiScore:7.9, skills:['Java','Spring Boot','MySQL'], interviews:1, verified:true },
                { uid:'c5', name:'Sneha Gupta', initials:'SG', college:'UIT RGPV', branch:'IT', score:88, aiScore:9.0, skills:['DevOps','Docker','AWS'], interviews:2, verified:true },
                { uid:'c6', name:'Vikram Rao', initials:'VR', college:'NIT Bhopal', branch:'CSE', score:95, aiScore:9.8, skills:['System Design','Go','Kubernetes'], interviews:5, verified:true }
            ]));
        }
    }
};

/* ── Session helpers ────────────────────────────────── */
function getUser()  { return DB.getUser(); }
function isStudent(){ const u = getUser(); return u && u.role === 'student'; }
function isRecruiter(){ const u = getUser(); return u && u.role === 'corporate_recruiter'; }
function logout()   { localStorage.removeItem(DB.KEYS.USER); window.location.href = 'auth.html'; }

/* ── Toast Notification System ─────────────────────── */
function showToast(msg, type = 'info', duration = 3200) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const icons = { success: 'fa-circle-check', error: 'fa-circle-exclamation', info: 'fa-circle-info' };
    const colors = { success: '#10B981', error: '#EF4444', info: '#2563EB' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fa-solid ${icons[type]}" style="color:${colors[type]};font-size:20px"></i><span style="font-size:14px;font-weight:600">${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 320);
    }, duration);
}

/* ── Bootstrap ──────────────────────────────────────── */
DB.seedDefaults();
