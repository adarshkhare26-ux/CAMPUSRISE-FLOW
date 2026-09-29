/* ==========================================================================
   Viksit CareerBridge — Student Readiness & Skill Gap Matrix Logic
   MPOnline Idea & Innovation Hackathon 2026
   ========================================================================== */

function initReadinessDashboard() {
    const savedData = localStorage.getItem(window.CareerBridge.STORAGE_KEYS.READINESS);
    let data = {
        overallScore: 78,
        technicalScore: 82,
        softSkillsScore: 74,
        domainScore: 70
    };

    if (savedData) {
        try { data = JSON.parse(savedData); } catch(e){}
    }

    // Update gauge stroke-dashoffset based on score
    // Circle circumference = 2 * PI * r = 2 * 3.14159 * 90 = ~565
    const circumference = 565;
    const offset = circumference - (circumference * (data.overallScore / 100));
    
    const gaugeEl = document.getElementById('gauge-progress-bar');
    const scoreNumEl = document.getElementById('gauge-score-value');

    if (gaugeEl) gaugeEl.style.strokeDashoffset = offset;
    if (scoreNumEl) scoreNumEl.innerText = data.overallScore + '%';

    // Update progress bars
    const techBar = document.getElementById('bar-tech');
    const softBar = document.getElementById('bar-soft');
    const domainBar = document.getElementById('bar-domain');

    if (techBar) techBar.style.width = data.technicalScore + '%';
    if (softBar) softBar.style.width = data.softSkillsScore + '%';
    if (domainBar) domainBar.style.width = data.domainScore + '%';
}

function updateTargetRole(roleName) {
    const titleEl = document.getElementById('roadmap-target-title');
    const missingEl = document.getElementById('roadmap-missing-tags');

    if (titleEl) titleEl.innerText = roleName + ' Skill Matrix';

    // Dynamic skill gap badges based on selected role
    let missingSkills = [];
    if (roleName.includes('Data Analyst')) {
        missingSkills = ['Advanced SQL Window Functions', 'Power BI Dashboarding', 'Pandas & NumPy'];
    } else if (roleName.includes('Full Stack')) {
        missingSkills = ['System Design & Architecture', 'Docker & Kubernetes', 'TypeScript & Next.js'];
    } else if (roleName.includes('AI / ML')) {
        missingSkills = ['PyTorch & TensorFlow', 'LLM Fine-tuning (LoRA)', 'Vector Databases (Pinecone)'];
    } else {
        missingSkills = ['Agile Methodologies', 'Cloud Security Fundamentals', 'CI/CD Pipelines'];
    }

    if (missingEl) {
        missingEl.innerHTML = missingSkills.map(s => 
            `<span class="badge badge-warning"><i class="fa-solid fa-triangle-exclamation"></i> ${s}</span>`
        ).join('');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initReadinessDashboard();
});
