/* ==========================================================================
   Viksit CareerBridge — Placement Drives + Recruiter Console
   ========================================================================== */

/* ── STUDENT: Placement Drives ──────────────────────── */
function initPlacementDrives() {
    renderDrivesGrid();
    updateApplicationStats();
}

function renderDrivesGrid(filter = '') {
    const drives = DB.getDrives();
    const applications = DB.getApplications();
    const readiness = DB.getReadiness();
    const userScore = readiness?.overallScore || 78;
    const grid = document.getElementById('drives-grid');
    if (!grid) return;

    const filtered = drives.filter(d => {
        if (!filter) return true;
        return d.companyName.toLowerCase().includes(filter) ||
               d.jobTitle.toLowerCase().includes(filter) ||
               d.location.toLowerCase().includes(filter);
    });

    if (!filtered.length) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--color-text-muted)">
            <i class="fa-solid fa-briefcase" style="font-size:40px;margin-bottom:14px;display:block;opacity:0.3"></i>
            <p>No drives match your search.</p></div>`;
        return;
    }

    grid.innerHTML = filtered.map(d => {
        const applied = applications.find(a => a.driveId === d.id);
        const eligible = userScore >= d.minScore;
        const deadline = d.deadline ? `Deadline: ${new Date(d.deadline).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}` : '';

        return `
        <div class="drive-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
                <div>
                    ${d.verified ? '<span class="badge badge-mint" style="margin-bottom:8px"><i class="fa-solid fa-shield-check"></i>MPGov Verified</span>' : ''}
                    <div class="drive-company-name">${d.companyName}</div>
                    <div class="drive-role">${d.jobTitle}</div>
                </div>
                <div style="background:${eligible ? 'var(--color-mint-light)' : 'var(--color-warning-light)'};border:1px solid ${eligible ? 'var(--color-mint-border)' : '#FDE68A'};border-radius:10px;padding:8px 12px;text-align:center;flex-shrink:0">
                    <div style="font-size:10px;font-weight:700;color:${eligible ? '#065F46' : '#92400E'}">MIN SCORE</div>
                    <div style="font-size:18px;font-weight:800;color:${eligible ? 'var(--color-success)' : 'var(--color-warning)'}">${d.minScore}%</div>
                </div>
            </div>
            <div class="drive-meta">
                <span><i class="fa-solid fa-indian-rupee-sign" style="color:var(--color-success)"></i>${d.stipend}</span>
                <span><i class="fa-solid fa-location-dot" style="color:var(--color-primary)"></i>${d.location}</span>
                ${deadline ? `<span><i class="fa-solid fa-calendar" style="color:var(--color-warning)"></i>${deadline}</span>` : ''}
            </div>
            <div class="badge-group" style="margin-bottom:16px">
                ${(d.skills||[]).map(s=>`<span class="badge badge-sky">${s}</span>`).join('')}
            </div>
            ${applied
                ? `<div class="applied-badge btn-full" style="justify-content:center"><i class="fa-solid fa-circle-check"></i>Applied — ${new Date(applied.appliedAt).toLocaleDateString('en-IN')}</div>`
                : eligible
                    ? `<button class="btn btn-primary btn-full" onclick="applyToDrive('${d.id}','${d.jobTitle}','${d.companyName}')"><i class="fa-solid fa-paper-plane"></i>Apply with 1-Click</button>`
                    : `<div style="font-size:13px;color:var(--color-warning);text-align:center;padding:8px;background:var(--color-warning-light);border-radius:10px"><i class="fa-solid fa-lock"></i> Boost your readiness score to ${d.minScore}% to unlock this drive</div>`
            }
        </div>`;
    }).join('');
}

function applyToDrive(driveId, title, company) {
    DB.applyToDrive(driveId, title, company);
    showToast(`Application submitted to ${company}! Your verified readiness score was included.`, 'success', 4000);
    renderDrivesGrid();
    updateApplicationStats();
}

function updateApplicationStats() {
    const apps = DB.getApplications();
    const el = document.getElementById('applied-count');
    if (el) el.innerText = apps.length;
}

function searchDrives(val) {
    renderDrivesGrid(val.toLowerCase());
}

/* ── RECRUITER: Console ─────────────────────────────── */
function initRecruiterConsole() {
    const user = DB.getUser();
    const compEl = document.getElementById('recruiter-company');
    if (compEl) compEl.innerText = user?.company || 'TCS Digital';

    renderCandidates();
    renderShortlistPanel();
    renderRecruiterDrives();
}

function renderCandidates(nameFilter = '', minScore = 0, skillFilter = '') {
    const candidates = DB.getCandidates();
    const shortlists = DB.getShortlists();
    const grid = document.getElementById('candidates-grid');
    if (!grid) return;

    const filtered = candidates.filter(c => {
        const matchName  = !nameFilter  || c.name.toLowerCase().includes(nameFilter);
        const matchScore = c.score >= minScore;
        const matchSkill = !skillFilter || c.skills.some(s => s.toLowerCase().includes(skillFilter));
        return matchName && matchScore && matchSkill;
    });

    if (!filtered.length) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--color-text-muted)">
            <i class="fa-solid fa-users-slash" style="font-size:40px;display:block;margin-bottom:14px;opacity:0.3"></i><p>No candidates match filters.</p></div>`;
        return;
    }

    grid.innerHTML = filtered.map(c => {
        const alreadyShortlisted = !!shortlists.find(s => s.uid === c.uid);
        const scoreColor = c.score >= 85 ? '#10B981' : c.score >= 75 ? '#2563EB' : '#F59E0B';

        return `
        <div class="candidate-card">
            <div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:14px">
                <div class="candidate-avatar-lg">${c.initials}</div>
                <div style="flex:1">
                    <div style="font-weight:800;font-size:16px;color:var(--color-text-primary)">${c.name}</div>
                    <div style="font-size:13px;color:var(--color-text-secondary)">${c.college} | ${c.branch}</div>
                    <div style="margin-top:6px;display:flex;align-items:center;gap:10px">
                        <span style="font-family:var(--font-heading);font-size:20px;font-weight:800;color:${scoreColor}">${c.score}%</span>
                        <span style="font-size:12px;color:var(--color-text-muted)">Readiness</span>
                        <span class="badge badge-mint" style="font-size:11px"><i class="fa-solid fa-microphone"></i>${c.aiScore}/10</span>
                    </div>
                </div>
                ${c.verified ? '<span class="badge badge-sky" style="flex-shrink:0"><i class="fa-solid fa-shield-check"></i>Verified</span>' : ''}
            </div>
            <div class="badge-group" style="margin-bottom:14px">
                ${c.skills.map(s=>`<span class="badge badge-sky">${s}</span>`).join('')}
            </div>
            <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:14px">
                <i class="fa-solid fa-video" style="color:var(--color-primary)"></i> ${c.interviews} AI Interview${c.interviews !== 1 ? 's' : ''} completed
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button class="btn btn-outline btn-sm" onclick="viewCandidateDetail('${c.uid}')">
                    <i class="fa-solid fa-eye"></i> View Profile
                </button>
                ${alreadyShortlisted
                    ? `<span class="applied-badge" style="font-size:13px;padding:7px 14px"><i class="fa-solid fa-check"></i>Shortlisted</span>`
                    : `<button class="btn btn-primary btn-sm" onclick="shortlistCandidateAction('${c.uid}')"><i class="fa-solid fa-star"></i> Shortlist</button>`
                }
            </div>
        </div>`;
    }).join('');

    const countEl = document.getElementById('candidate-count');
    if (countEl) countEl.innerText = filtered.length;
}

function viewCandidateDetail(uid) {
    const candidates = DB.getCandidates();
    const c = candidates.find(c => c.uid === uid);
    if (!c) return;

    document.getElementById('cand-modal-name').innerText    = c.name;
    document.getElementById('cand-modal-college').innerText = `${c.branch} | ${c.college}`;
    document.getElementById('cand-modal-score').innerText   = c.score + '%';
    document.getElementById('cand-modal-ai').innerText      = c.aiScore + '/10';
    document.getElementById('cand-modal-interviews').innerText = c.interviews;
    document.getElementById('cand-modal-skills').innerHTML  = c.skills.map(s=>`<span class="badge badge-sky">${s}</span>`).join('');
    document.getElementById('cand-modal-uid').value = uid;

    document.getElementById('candidate-modal').classList.remove('hidden');
}

function closeCandidateModal() {
    document.getElementById('candidate-modal').classList.add('hidden');
}

function shortlistFromModal() {
    const uid = document.getElementById('cand-modal-uid').value;
    shortlistCandidateAction(uid);
    closeCandidateModal();
}

function shortlistCandidateAction(uid) {
    const candidates = DB.getCandidates();
    const c = candidates.find(c => c.uid === uid);
    if (!c) return;
    DB.shortlistCandidate(c);
    showToast(`${c.name} shortlisted for campus drive! Invitation sent.`, 'success');
    renderCandidates(
        document.getElementById('search-candidate')?.value.toLowerCase() || '',
        parseInt(document.getElementById('filter-score')?.value || '0'),
        document.getElementById('filter-skill')?.value.toLowerCase() || ''
    );
    renderShortlistPanel();
}

function filterCandidates() {
    const name  = document.getElementById('search-candidate')?.value.toLowerCase() || '';
    const score = parseInt(document.getElementById('filter-score')?.value || '0', 10);
    const skill = document.getElementById('filter-skill')?.value.toLowerCase() || '';
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) scoreDisplay.innerText = score + '%+';
    renderCandidates(name, score, skill);
}

function renderShortlistPanel() {
    const shortlists = DB.getShortlists();
    const el = document.getElementById('shortlist-panel');
    if (!el) return;

    if (!shortlists.length) {
        el.innerHTML = `<p style="font-size:13px;color:var(--color-text-muted);text-align:center;padding:16px">No candidates shortlisted yet.</p>`;
        return;
    }

    el.innerHTML = shortlists.map(c => `
        <div class="shortlist-item">
            <div class="user-avatar" style="width:36px;height:36px;font-size:12px">${c.initials}</div>
            <div style="flex:1">
                <div style="font-size:14px;font-weight:700">${c.name}</div>
                <div style="font-size:12px;color:var(--color-text-secondary)">${c.branch} | ${c.score}% Ready</div>
            </div>
            <span class="badge badge-mint" style="font-size:11px">${c.aiScore}/10</span>
        </div>
    `).join('');
}

function renderRecruiterDrives() {
    const drives = DB.getDrives().slice(0, 3);
    const el = document.getElementById('recruiter-drives-list');
    if (!el) return;

    el.innerHTML = drives.map(d => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--color-surface);border-radius:12px;border:1px solid var(--color-border);margin-bottom:10px">
            <div>
                <div style="font-size:14px;font-weight:700">${d.companyName}</div>
                <div style="font-size:12px;color:var(--color-text-secondary)">${d.jobTitle} | ${d.location}</div>
            </div>
            <span class="badge badge-mint">Min ${d.minScore}%</span>
        </div>
    `).join('');
}

/* ── Post Drive Modal ────────────────────────────────── */
function openPostDriveModal() {
    document.getElementById('post-drive-modal').classList.remove('hidden');
}
function closePostDriveModal() {
    document.getElementById('post-drive-modal').classList.add('hidden');
}

function handlePostDrive(e) {
    e.preventDefault();
    const company  = document.getElementById('d-company').value;
    const title    = document.getElementById('d-title').value;
    const score    = parseInt(document.getElementById('d-score').value, 10);
    const stipend  = document.getElementById('d-stipend').value;
    const location = document.getElementById('d-location').value;
    const skills   = document.getElementById('d-skills').value.split(',').map(s => s.trim()).filter(Boolean);
    const deadline = document.getElementById('d-deadline').value;

    const drive = { id:'d'+Date.now(), companyName:company, jobTitle:title, minScore:score, stipend, location, skills, deadline, verified:true };
    DB.saveDrive(drive);

    showToast(`Drive "${title}" by ${company} published to MP Campus Talent Pool!`, 'success', 5000);
    closePostDriveModal();
    e.target.reset();
    renderRecruiterDrives();
}
