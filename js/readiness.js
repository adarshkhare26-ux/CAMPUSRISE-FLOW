/* ==========================================================================
   Viksit CareerBridge — Student Readiness Dashboard + Skill Roadmap
   ========================================================================== */

function initReadinessDashboard() {
    const data = DB.getReadiness() || { overallScore:78, technicalScore:82, softSkillsScore:74, domainScore:70 };
    const user = DB.getUser();

    // Welcome banner
    const wName = document.getElementById('welcome-name');
    const wScore = document.getElementById('welcome-score');
    if (wName) wName.innerText = (user?.name?.split(' ')[0]) || 'there';
    if (wScore) wScore.innerText = data.overallScore + '%';

    // Animate gauge after short delay
    setTimeout(() => {
        const circumference = 534; // 2*PI*85
        const offset = circumference - (circumference * data.overallScore / 100);
        const bar = document.getElementById('gauge-bar');
        const num = document.getElementById('gauge-num');
        if (bar) bar.style.strokeDashoffset = offset;
        if (num) num.innerText = data.overallScore + '%';
    }, 300);

    // Animate progress bars
    setTimeout(() => {
        const bars = {
            'bar-tech':    data.technicalScore,
            'bar-soft':    data.softSkillsScore,
            'bar-domain':  data.domainScore
        };
        Object.entries(bars).forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el) el.style.width = val + '%';
            const lbl = document.getElementById(id + '-lbl');
            if (lbl) lbl.innerText = val + '%';
        });
    }, 400);

    // Render verified badges
    renderBadges(data.verifiedBadges || []);

    // Render action carousel
    renderActionCards(data);

    // Update stats row
    const interviewCount = DB.getInterviews().length;
    const appCount = DB.getApplications().length;
    setStatEl('stat-interviews', interviewCount);
    setStatEl('stat-applications', appCount);
    setStatEl('stat-badges', (data.verifiedBadges || []).length);
}

function setStatEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
}

function renderBadges(badges) {
    const el = document.getElementById('badges-container');
    if (!el) return;
    el.innerHTML = badges.map(b =>
        `<span class="badge badge-mint"><i class="fa-solid fa-check"></i>${b}</span>`
    ).join('');
}

function renderActionCards(data) {
    const el = document.getElementById('action-cards-container');
    if (!el) return;
    const cards = [
        { icon:'📊', color:'#EFF6FF', label:'Recommended Course', title:'Data Analytics Fundamentals', desc:'Free NPTEL/Swayam track — boost Domain score by +12%', action:"selectTab('roadmap')" },
        { icon:'🎙️', color:'#ECFDF5', label:'Recommended Practice', title:'AI Mock Interview Session', desc:'Junior Data Analyst role — 20 min technical focus session', action:"selectTab('mock')" },
        { icon:'🏛️', color:'#FEF3C7', label:'Government Opportunity', title:'MP State IT Internship Drive 2026', desc:'MPSEDC verified campus drive — ₹25k/month stipend', action:"selectTab('placements')" }
    ];
    el.innerHTML = cards.map(c => `
        <div class="action-card" onclick="${c.action}">
            <div class="action-card-icon" style="background:${c.color}">${c.icon}</div>
            <div>
                <div style="font-size:11px;font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.6px;margin-bottom:4px">${c.label}</div>
                <div style="font-size:15px;font-weight:700;color:var(--color-text-primary)">${c.title}</div>
                <div style="font-size:13px;color:var(--color-text-secondary);margin-top:2px">${c.desc}</div>
            </div>
            <i class="fa-solid fa-chevron-right" style="color:var(--color-text-muted);margin-left:auto;flex-shrink:0"></i>
        </div>
    `).join('');
}

/* ── Skill Gap Roadmap ──────────────────────────────── */
const ROLE_SKILLS = {
    'Junior Data Analyst': {
        acquired: ['Python Basics', 'SQL Queries', 'Data Visualization with Matplotlib', 'Statistical Fundamentals'],
        missing:  ['Advanced SQL Window Functions', 'Power BI & Tableau Dashboarding', 'Pandas Advanced Operations', 'Business Intelligence Reporting'],
        steps: [
            { phase:'Phase 1', title:'Complete Power BI Certification', desc:'Free Microsoft Learn path — 3 hrs', status:'active' },
            { phase:'Phase 2', title:'Practice Advanced SQL Queries', desc:'HackerRank SQL Intermediate track', status:'pending' },
            { phase:'Phase 3', title:'Generate AI Verified Resume Badge', desc:'Publish updated profile to placement drives', status:'pending' }
        ]
    },
    'Full Stack Web Developer': {
        acquired: ['HTML5 & CSS3', 'JavaScript ES6+', 'Git & GitHub', 'REST API Basics'],
        missing:  ['System Design & Architecture', 'Docker & Kubernetes', 'TypeScript & Next.js', 'PostgreSQL Advanced'],
        steps: [
            { phase:'Phase 1', title:'Complete System Design Course', desc:'Grokking System Design — recommended', status:'active' },
            { phase:'Phase 2', title:'Build & Deploy a Docker Project', desc:'Containerize a Node.js + React app', status:'pending' },
            { phase:'Phase 3', title:'Complete TypeScript Certification', desc:'Microsoft TypeScript path on Coursera', status:'pending' }
        ]
    },
    'AI / ML Engineer Trainee': {
        acquired: ['Python 3.x', 'NumPy & Pandas', 'Scikit-learn Basics', 'Linear Algebra'],
        missing:  ['PyTorch Deep Learning', 'LLM Fine-tuning (LoRA)', 'Vector Databases (Pinecone / Weaviate)', 'MLOps & Model Serving'],
        steps: [
            { phase:'Phase 1', title:'Complete PyTorch for Deep Learning', desc:'Fast.ai free course — highly recommended', status:'active' },
            { phase:'Phase 2', title:'Fine-tune an LLM with LoRA', desc:'HuggingFace tutorials — 4 hour workshop', status:'pending' },
            { phase:'Phase 3', title:'Deploy an ML model via API', desc:'Build & host a Gradio demo on HuggingFace Spaces', status:'pending' }
        ]
    }
};

function updateRoadmap(role) {
    const data = ROLE_SKILLS[role] || ROLE_SKILLS['Junior Data Analyst'];
    const titleEl = document.getElementById('roadmap-role-title');
    if (titleEl) titleEl.innerText = `${role} — Skill Gap Analysis`;

    const acquiredEl = document.getElementById('acquired-skills');
    if (acquiredEl) {
        acquiredEl.innerHTML = data.acquired.map(s =>
            `<span class="badge badge-mint"><i class="fa-solid fa-check"></i>${s}</span>`
        ).join('');
    }

    const missingEl = document.getElementById('missing-skills');
    if (missingEl) {
        missingEl.innerHTML = data.missing.map(s =>
            `<span class="badge badge-warning"><i class="fa-solid fa-triangle-exclamation"></i>${s}</span>`
        ).join('');
    }

    const stepsEl = document.getElementById('roadmap-steps');
    if (stepsEl) {
        stepsEl.innerHTML = data.steps.map((s, i) => `
            <div class="timeline-item">
                <div style="display:flex;flex-direction:column;align-items:center">
                    <div class="timeline-dot ${s.status}">
                        ${s.status === 'done' ? '<i class="fa-solid fa-check"></i>' : i + 1}
                    </div>
                    ${i < data.steps.length - 1 ? '<div class="timeline-line"></div>' : ''}
                </div>
                <div class="timeline-content">
                    <div style="font-size:11px;font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px">${s.phase}</div>
                    <div class="timeline-title">${s.title}</div>
                    <div class="timeline-desc">${s.desc}</div>
                </div>
            </div>
        `).join('');
    }
}
