/* ==========================================================================
   Viksit CareerBridge — AI Resume Enhancer Module
   ========================================================================== */

function initResumeEnhancer() {
    const user = DB.getUser();
    const readiness = DB.getReadiness();

    // Populate resume fields from session
    const nameEl = document.getElementById('resume-name');
    if (nameEl) nameEl.innerText = user?.name || 'Student Name';

    const collegeEl = document.getElementById('resume-college');
    if (collegeEl) collegeEl.innerText = `${user?.branch || 'B.Tech Computer Science'} | ${user?.college || 'RGPV Bhopal'}`;

    const scoreEl = document.getElementById('resume-score-num');
    if (scoreEl) scoreEl.innerText = readiness?.resumeScore || 64;

    renderResumeBadges(readiness?.verifiedBadges || []);
    renderAiSuggestions(readiness);
    animateResumeScore(readiness?.resumeScore || 64);
}

function animateResumeScore(score) {
    const fill = document.getElementById('resume-score-fill');
    if (!fill) return;
    setTimeout(() => { fill.style.width = score + '%'; }, 300);
}

function renderResumeBadges(badges) {
    const el = document.getElementById('resume-skills-badges');
    if (!el) return;
    const skillBadges = [...badges, 'B.Tech 2026', 'CGPA 8.2/10', 'Hackathon Participant'];
    el.innerHTML = skillBadges.map(b => `<span class="badge badge-sky">${b}</span>`).join('');
}

const AI_SUGGESTIONS = [
    { type:'green', icon:'✨', boost:'+12%', title:'Add AI Career Platform Project', desc:'Include a 2-line project summary with quantified impact. e.g., "Built AI employability platform serving 500+ students in 48 hours."' },
    { type:'blue',  icon:'📊', boost:'+9%',  title:'Quantify Internship Achievements', desc:'Replace "worked on database optimization" with "Reduced query response time by 40% using PostgreSQL indexing."' },
    { type:'green', icon:'🎙️', boost:'+8%',  title:'Add AI Interview Verified Score', desc:'Your AI score (8.8/10) can be added as a verified certification block on your resume for recruiter trust.' },
    { type:'amber', icon:'🎓', boost:'+6%',  title:'Include NPTEL Course Completion', desc:'Add the NPTEL Data Analytics certification you completed to your Education section.' },
    { type:'blue',  icon:'🔗', boost:'+5%',  title:'Link GitHub Portfolio', desc:'Add your GitHub handle. Recruiters are 3x more likely to shortlist candidates with active public repositories.' }
];

function renderAiSuggestions(readiness) {
    const el = document.getElementById('ai-suggestions-list');
    if (!el) return;
    const currentScore = readiness?.resumeScore || 64;

    el.innerHTML = AI_SUGGESTIONS.map((s, i) => `
        <div class="ai-suggestion-card ${s.type}" onclick="applyResumeBoost(${i})">
            <div class="ai-suggestion-icon">${s.icon}</div>
            <div style="flex:1">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
                    <span style="font-size:14px;font-weight:700;color:var(--color-text-primary)">${s.title}</span>
                    <span class="ai-boost-badge">${s.boost}</span>
                </div>
                <p style="font-size:13px;color:var(--color-text-secondary)">${s.desc}</p>
            </div>
            <i class="fa-solid fa-circle-plus" id="boost-icon-${i}" style="color:var(--color-success);font-size:20px;flex-shrink:0"></i>
        </div>
    `).join('');
}

function applyResumeBoost(idx) {
    const suggestion = AI_SUGGESTIONS[idx];
    const readiness = DB.getReadiness();
    const boostVal = parseInt(suggestion.boost);
    const newScore = Math.min(100, (readiness.resumeScore || 64) + boostVal);
    readiness.resumeScore = newScore;
    DB.setReadiness(readiness);

    // Update UI
    const scoreEl = document.getElementById('resume-score-num');
    if (scoreEl) scoreEl.innerText = newScore;
    animateResumeScore(newScore);

    // Mark suggestion as applied
    const iconEl = document.getElementById(`boost-icon-${idx}`);
    if (iconEl) { iconEl.className = 'fa-solid fa-circle-check'; iconEl.style.color = '#10B981'; }

    showToast(`Resume score boosted to ${newScore}%! (${suggestion.boost} applied)`, 'success');
}

function generateResumePDF() {
    const user = DB.getUser();
    const readiness = DB.getReadiness();
    const name = user?.name || 'Student Name';

    // Create printable resume window
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${name} — Verified Career Resume</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  body { font-family:'Plus Jakarta Sans',sans-serif; max-width:800px; margin:40px auto; color:#0F172A; line-height:1.6; padding:0 20px; }
  h1 { font-size:28px; font-weight:800; color:#0F172A; margin-bottom:4px; }
  .subtitle { color:#475569; font-size:14px; margin-bottom:8px; }
  .contact { font-size:13px; color:#2563EB; }
  .divider { height:3px; background:linear-gradient(90deg,#2563EB,#10B981); border-radius:2px; margin:14px 0; }
  .section-title { font-size:13px; font-weight:800; color:#2563EB; text-transform:uppercase; letter-spacing:0.8px; border-left:3px solid #2563EB; padding-left:10px; margin:18px 0 10px; }
  .badge { display:inline-block; background:#D1FAE5; color:#065F46; padding:3px 10px; border-radius:20px; font-size:12px; font-weight:700; margin:3px; border:1px solid #A7F3D0; }
  .verified-badge { background:#EFF6FF; color:#1E40AF; border-color:#BAE6FD; }
  .ai-badge { background:#0F172A; color:white; border-radius:8px; padding:6px 14px; font-size:12px; font-weight:700; margin-top:4px; display:inline-block; }
  p { font-size:14px; color:#475569; margin:4px 0; }
  .score-block { background:linear-gradient(135deg,#ECFDF5,#EFF6FF); border:1px solid #A7F3D0; border-radius:12px; padding:14px 20px; margin:10px 0; display:flex; align-items:center; gap:16px; }
  .score-num { font-size:32px; font-weight:800; color:#10B981; }
  @media print { body { margin:0; } }
</style>
</head>
<body>
  <h1>${name}</h1>
  <div class="subtitle">${user?.branch || 'B.Tech Computer Science'} | ${user?.college || 'RGPV Bhopal'} | Batch 2026</div>
  <div class="contact">${user?.email || 'student@university.ac.in'} &nbsp;|&nbsp; LinkedIn: linkedin.com/in/${name.toLowerCase().replace(' ', '-')} &nbsp;|&nbsp; GitHub: github.com/${name.split(' ')[0].toLowerCase()}</div>
  <div class="divider"></div>

  <div class="score-block">
    <div>
      <div class="score-num">${readiness?.overallScore || 78}%</div>
      <div style="font-size:11px;font-weight:700;color:#059669;text-transform:uppercase;">MPGov AI Readiness Score</div>
    </div>
    <div>
      <span class="badge">Technical: ${readiness?.technicalScore || 82}%</span>
      <span class="badge">Soft Skills: ${readiness?.softSkillsScore || 74}%</span>
      <span class="badge">Domain: ${readiness?.domainScore || 70}%</span>
      <div class="ai-badge">🎙️ AI Interview Score: ${DB.getInterviews()[0]?.overallScore || 8.8}/10</div>
    </div>
  </div>

  <div class="section-title">Technical Skills & Verified Certifications</div>
  <div>${(readiness?.verifiedBadges || ['Python & SQL','Data Structures','Git & GitHub']).map(b => `<span class="badge">${b}</span>`).join('')}</div>

  <div class="section-title">Academic Projects</div>
  <p><strong>Viksit CareerBridge</strong> — Built an AI-powered career readiness platform for MP Engineering graduates. Stack: HTML5, Vanilla JS, Firebase, Gemini AI. Serves 500+ students.</p>
  <p><strong>Data Analytics Dashboard (NPTEL Project)</strong> — Designed an interactive Power BI dashboard for retail sales data, reducing reporting time by 35%.</p>

  <div class="section-title">Education</div>
  <p><strong>${user?.branch || 'B.Tech Computer Science'}</strong> — ${user?.college || 'RGPV Bhopal'}</p>
  <p>CGPA: 8.2 / 10 | Graduation: May 2026</p>

  <div class="section-title">MPGov Verified Badges & Certifications</div>
  <div>${(readiness?.verifiedBadges || []).map(b => `<span class="badge verified-badge">${b}</span>`).join('')}</div>
  
  <br><br>
  <script>window.print();<\/script>
</body></html>`);
    win.document.close();
}

function publishToPlacement() {
    showToast('Resume published to all active MP Campus Placement Drives! 3 recruiters can now view your verified profile.', 'success', 5000);
}

function verifySkillsBadge() {
    const readiness = DB.getReadiness();
    if (!readiness.verifiedBadges.includes('MPGov Portal Verified')) {
        readiness.verifiedBadges.push('MPGov Portal Verified');
        readiness.resumeScore = Math.min(100, (readiness.resumeScore || 64) + 15);
        readiness.overallScore = Math.min(100, readiness.overallScore + 3);
        DB.setReadiness(readiness);
        showToast('Skills verified via MPGov Portal! +15% resume score added.', 'success');
        initResumeEnhancer();
    } else {
        showToast('Your profile is already MPGov verified!', 'info');
    }
}
