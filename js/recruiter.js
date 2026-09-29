/* ==========================================================================
   Viksit CareerBridge — Corporate Recruiter & Placement Drive Logic
   MPOnline Idea & Innovation Hackathon 2026
   ========================================================================== */

function filterCandidates() {
    const searchVal = document.getElementById('search-candidate')?.value.toLowerCase() || '';
    const minScore = parseInt(document.getElementById('filter-min-score')?.value || '0', 10);
    const cards = document.querySelectorAll('.candidate-card-item');

    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const skills = card.dataset.skills.toLowerCase();
        const score = parseInt(card.dataset.score, 10);

        const matchesSearch = name.includes(searchVal) || skills.includes(searchVal);
        const matchesScore = score >= minScore;

        if (matchesSearch && matchesScore) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    const scoreDisplay = document.getElementById('score-range-display');
    if (scoreDisplay) scoreDisplay.innerText = minScore + '%+';
}

function showCandidateModal(name, score, aiScore, college, branch) {
    document.getElementById('modal-cand-name').innerText = name;
    document.getElementById('modal-cand-score').innerText = score + '%';
    document.getElementById('modal-cand-ai').innerText = aiScore + '/10';
    document.getElementById('modal-cand-college').innerText = college || 'RGPV Bhopal';
    document.getElementById('modal-cand-branch').innerText = branch || 'Computer Science';
    document.getElementById('candidate-modal').style.display = 'flex';
}

function closeCandidateModal() {
    document.getElementById('candidate-modal').style.display = 'none';
}

function shortlistCandidate() {
    const name = document.getElementById('modal-cand-name').innerText;
    alert(`🎉 Candidate ${name} has been shortlisted for TCS Digital Campus Drive! Shortlist invitation sent.`);
    closeCandidateModal();
}

function openPostDriveModal() {
    document.getElementById('post-drive-modal').style.display = 'flex';
}

function closePostDriveModal() {
    document.getElementById('post-drive-modal').style.display = 'none';
}

function handlePostDriveSubmit(event) {
    event.preventDefault();
    const company = document.getElementById('input-drive-company').value;
    const title = document.getElementById('input-drive-title').value;
    const score = document.getElementById('input-drive-score').value;
    const stipend = document.getElementById('input-drive-stipend').value;
    const location = document.getElementById('input-drive-location').value;

    const newDrive = {
        id: 'drive-' + Date.now(),
        companyName: company,
        jobTitle: title,
        minReadinessScore: parseInt(score, 10),
        stipend: stipend,
        location: location,
        verifiedBadge: true
    };

    let existingDrives = [];
    try {
        existingDrives = JSON.parse(localStorage.getItem(window.CareerBridge.STORAGE_KEYS.DRIVES)) || [];
    } catch(e){}

    existingDrives.unshift(newDrive);
    localStorage.setItem(window.CareerBridge.STORAGE_KEYS.DRIVES, JSON.stringify(existingDrives));

    alert(`🚀 Campus Placement Drive "${title}" by ${company} successfully published to MP Campus Talent Pool!`);
    closePostDriveModal();

    // Reload drives view if open
    if (typeof loadPlacementDrivesGrid === 'function') {
        loadPlacementDrivesGrid();
    }
}
