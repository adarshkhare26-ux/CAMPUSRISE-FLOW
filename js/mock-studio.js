/* ==========================================================================
   Viksit CareerBridge — AI Interactive Mock Interview Studio Controller
   MPOnline Idea & Innovation Hackathon 2026
   ========================================================================== */

let isInterviewActive = false;
let waveAnimationTimer = null;
let currentQuestionIndex = 0;

const interviewQuestions = [
    "Explain how you would optimize a slow-running SQL database query for a high-traffic web application.",
    "Describe a complex technical challenge you solved in a college project or internship and how you handled trade-offs.",
    "How do you ensure state synchronization and data integrity in modern web APIs?",
    "Explain the concept of RESTful architecture vs GraphQL in corporate application development."
];

function toggleInterviewState() {
    const btn = document.getElementById('btn-toggle-interview');
    const statusText = document.getElementById('interview-status-text');
    const visualizer = document.getElementById('audio-visualizer-box');

    if (!isInterviewActive) {
        isInterviewActive = true;
        btn.innerHTML = '<i class="fa-solid fa-square"></i> End & Evaluate AI Interview';
        btn.className = 'btn btn-primary';
        if (statusText) statusText.innerText = 'AI Listening & Analyzing Voice Audio...';
        
        // Start animated audio waveform
        if (visualizer) {
            visualizer.classList.add('pulse-active');
        }
    } else {
        isInterviewActive = false;
        btn.innerHTML = '<i class="fa-solid fa-play"></i> Start AI Practice Session';
        btn.className = 'btn btn-success';
        if (statusText) statusText.innerText = 'Interview Complete. Generating AI Feedback...';
        if (visualizer) visualizer.classList.remove('pulse-active');
        
        // Show AI Score Evaluation Modal
        showScoreModal();
    }
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % interviewQuestions.length;
    const qEl = document.getElementById('mock-question-text');
    if (qEl) {
        qEl.innerText = `"${interviewQuestions[currentQuestionIndex]}"`;
    }
}

function showScoreModal() {
    const modal = document.getElementById('score-modal');
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('score-modal');
    if (modal) modal.style.display = 'none';
}

function saveScoreToProfile() {
    alert("✨ AI Interview Score (8.8/10) successfully verified and added to your Corporate Readiness Profile!");
    closeModal();
}
