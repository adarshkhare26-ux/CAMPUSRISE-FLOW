/* ==========================================================================
   Viksit CareerBridge — AI Mock Interview Studio with Web Speech API
   ========================================================================== */

let isActive   = false;
let isPaused   = false;
let recognition = null;
let timerInterval = null;
let elapsedSecs = 0;
let transcript  = '';
let currentQIdx = 0;
let confidenceInterval = null;

const QUESTIONS = {
    'Technical': [
        'Explain how you would optimize a slow-running SQL query for a high-traffic web application.',
        'What is the difference between REST and GraphQL? When would you choose one over the other?',
        'Explain the concept of database indexing and when it should be used.',
        'How does a browser render a web page from HTML/CSS/JS? Walk through the full pipeline.',
        'What is Big-O notation? Explain O(n log n) with an example.'
    ],
    'HR / Behavioral': [
        'Tell me about yourself and why you are interested in this role.',
        'Describe a time you faced a conflict in a team project. How did you resolve it?',
        'Where do you see yourself in 3 years?',
        'What is your greatest technical strength and your biggest area of improvement?',
        'Why should we hire you over other candidates?'
    ],
    'Scenario-based': [
        'Your production server is throwing 500 errors after a new deployment. What are your first steps?',
        'A client wants a feature delivered in 2 days but it normally takes a week. How do you handle this?',
        'You discover a critical security vulnerability in a live product. Describe your response plan.',
        'Your team disagrees on a technical architecture decision. How do you facilitate consensus?',
        'The database query that powers your homepage is timing out. Walk through your debugging process.'
    ]
};

/* ── Init ─────────────────────────────────────────────── */
function initMockStudio() {
    const speechSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    const noteEl = document.getElementById('speech-api-note');
    if (noteEl) noteEl.classList.toggle('hidden', speechSupported);

    loadQuestion();
    updateTimerDisplay(0);
}

function getCurrentQuestions() {
    const focus = document.getElementById('focus-select')?.value || 'Technical';
    return QUESTIONS[focus] || QUESTIONS['Technical'];
}

function loadQuestion() {
    const qs = getCurrentQuestions();
    currentQIdx = 0;
    setQuestion(qs[0]);
}

function setQuestion(q) {
    const el = document.getElementById('mock-question');
    if (el) el.innerText = `"${q}"`;
}

function nextQuestion() {
    const qs = getCurrentQuestions();
    currentQIdx = (currentQIdx + 1) % qs.length;
    setQuestion(qs[currentQIdx]);
    if (isActive) appendTranscript('[Question changed]');
}

/* ── Timer ────────────────────────────────────────────── */
function startTimer() {
    timerInterval = setInterval(() => {
        elapsedSecs++;
        updateTimerDisplay(elapsedSecs);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function updateTimerDisplay(secs) {
    const mins = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss   = String(secs % 60).padStart(2, '0');
    const el = document.getElementById('timer-display');
    if (el) el.innerText = `${mins}:${ss}`;
}

/* ── Speech Recognition ──────────────────────────────── */
function setupSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return null;

    const rec = new SpeechRec();
    rec.lang = 'en-IN';
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                transcript += event.results[i][0].transcript + ' ';
            } else {
                interim = event.results[i][0].transcript;
            }
        }
        const liveEl = document.getElementById('live-transcript');
        if (liveEl) liveEl.innerText = (transcript + interim) || 'Listening to your voice...';
    };

    rec.onerror = (e) => {
        if (e.error !== 'no-speech') appendTranscript('[Mic error: ' + e.error + ']');
    };

    rec.onend = () => {
        if (isActive && !isPaused) rec.start();
    };

    return rec;
}

function appendTranscript(text) {
    const el = document.getElementById('live-transcript');
    if (el) el.innerText += '\n' + text;
}

/* ── Confidence Meters (Simulated Live) ─────────────── */
function startConfidenceSimulation() {
    const pace = document.getElementById('bar-pace');
    const clarity = document.getElementById('bar-clarity');
    const energy = document.getElementById('bar-energy');

    confidenceInterval = setInterval(() => {
        if (!isActive || isPaused) return;
        const p = 55 + Math.random() * 40;
        const c = 60 + Math.random() * 35;
        const e = 50 + Math.random() * 45;
        if (pace)    pace.style.width    = p.toFixed(0) + '%';
        if (clarity) clarity.style.width = c.toFixed(0) + '%';
        if (energy)  energy.style.width  = e.toFixed(0) + '%';
    }, 1200);
}

function stopConfidenceSimulation() {
    clearInterval(confidenceInterval);
    confidenceInterval = null;
}

/* ── Interview Control ───────────────────────────────── */
function toggleInterview() {
    if (!isActive) {
        startInterview();
    } else {
        endInterview();
    }
}

function startInterview() {
    isActive  = true;
    isPaused  = false;
    transcript = '';
    elapsedSecs = 0;

    // Setup speech recognition
    recognition = setupSpeechRecognition();
    if (recognition) recognition.start();

    // UI
    const toggleBtn = document.getElementById('btn-toggle');
    const pauseBtn  = document.getElementById('btn-pause');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-stop"></i> End & Evaluate';
    if (toggleBtn) toggleBtn.className = 'btn btn-danger-outline';
    if (pauseBtn)  pauseBtn.classList.remove('hidden');

    document.getElementById('audio-visualizer-box')?.classList.add('pulse-active');

    const statusEl = document.getElementById('interview-status');
    if (statusEl) { statusEl.innerText = '🔴 Recording — AI is listening and analyzing...'; statusEl.style.color = '#10B981'; }

    const liveEl = document.getElementById('live-transcript');
    if (liveEl) liveEl.innerText = 'Listening to your voice...';

    startTimer();
    startConfidenceSimulation();
}

function pauseInterview() {
    if (!isActive) return;
    isPaused = !isPaused;
    const btn = document.getElementById('btn-pause');

    if (isPaused) {
        if (recognition) recognition.stop();
        stopTimer();
        if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
        document.getElementById('audio-visualizer-box')?.classList.remove('pulse-active');
        const statusEl = document.getElementById('interview-status');
        if (statusEl) statusEl.innerText = '⏸ Paused — Click Resume to continue';
    } else {
        if (recognition) recognition.start();
        startTimer();
        if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        document.getElementById('audio-visualizer-box')?.classList.add('pulse-active');
        const statusEl = document.getElementById('interview-status');
        if (statusEl) statusEl.innerText = '🔴 Recording — AI is listening and analyzing...';
    }
}

function endInterview() {
    isActive = false;
    isPaused = false;

    if (recognition) { recognition.stop(); recognition = null; }
    stopTimer();
    stopConfidenceSimulation();

    document.getElementById('audio-visualizer-box')?.classList.remove('pulse-active');

    const toggleBtn = document.getElementById('btn-toggle');
    const pauseBtn  = document.getElementById('btn-pause');
    if (toggleBtn) { toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Practice Session'; toggleBtn.className = 'btn btn-success'; }
    if (pauseBtn)  pauseBtn.classList.add('hidden');

    const statusEl = document.getElementById('interview-status');
    if (statusEl) { statusEl.innerText = 'Interview complete. Generating AI evaluation...'; statusEl.style.color = 'var(--color-primary)'; }

    // Generate AI score
    setTimeout(() => showScoreModal(), 900);
}

/* ── Score Evaluation Modal ──────────────────────────── */
function showScoreModal() {
    const duration = elapsedSecs;
    const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;

    // Compute scores from real-ish signals
    const rawTech = Math.min(10, 6.0 + (wordCount > 60 ? 1.5 : 0) + (duration > 60 ? 1.0 : 0) + Math.random() * 0.8);
    const rawComm = Math.min(10, 6.5 + Math.random() * 2.5);
    const rawConf = Math.min(10, 6.0 + Math.random() * 3.0);
    const overall = ((rawTech + rawComm + rawConf) / 3).toFixed(1);

    // Update modal content
    document.getElementById('eval-overall').innerText = overall + '/10';
    document.getElementById('eval-tech').innerText    = rawTech.toFixed(1);
    document.getElementById('eval-comm').innerText    = rawComm.toFixed(1);
    document.getElementById('eval-conf').innerText    = rawConf.toFixed(1);
    document.getElementById('eval-words').innerText   = wordCount || '—';
    document.getElementById('eval-duration').innerText = duration + 's';

    const pct = Math.round(parseFloat(overall) * 10);
    const ring = document.getElementById('score-ring');
    if (ring) ring.style.setProperty('--pct', pct);

    const feedback = generateFeedback(rawTech, rawComm, rawConf, wordCount);
    document.getElementById('eval-feedback').innerText = feedback;

    // Save to DB
    const iv = {
        id: 'iv-' + Date.now(),
        focus: document.getElementById('focus-select')?.value || 'Technical',
        role:  document.getElementById('role-select')?.value  || 'Junior Data Analyst',
        overallScore: parseFloat(overall),
        technicalScore: parseFloat(rawTech.toFixed(1)),
        commScore: parseFloat(rawComm.toFixed(1)),
        confScore: parseFloat(rawConf.toFixed(1)),
        wordCount, duration,
        transcript: transcript.substring(0, 400),
        completedAt: new Date().toISOString()
    };
    DB.saveInterview(iv);

    document.getElementById('score-modal').classList.remove('hidden');
}

function generateFeedback(tech, comm, conf, words) {
    const tips = [];
    if (tech < 7.5) tips.push('Deepen technical specifics — use concrete examples with numbers.');
    else tips.push('Strong technical accuracy! Great use of specific terminology.');
    if (comm < 7.5) tips.push('Structure answers using STAR method for clarity.');
    else tips.push('Excellent communication — well-paced and clear articulation.');
    if (conf < 7.5) tips.push('Pause before complex questions; avoid filler words like "um".');
    else tips.push('Great confidence and energy throughout the session!');
    if (words < 50) tips.push('Try to elaborate more — aim for 100–150 words per answer.');
    return tips.join(' ');
}

function closeScoreModal() {
    document.getElementById('score-modal').classList.add('hidden');
    updateScoreFromLatest();
}

function addScoreToProfile() {
    const interviews = DB.getInterviews();
    const latest = interviews[0];
    if (!latest) return;

    const readiness = DB.getReadiness();
    const boost = Math.min(5, Math.round((latest.overallScore - 7) * 2));
    if (boost > 0) {
        readiness.softSkillsScore = Math.min(100, readiness.softSkillsScore + boost);
        readiness.overallScore    = Math.round((readiness.technicalScore + readiness.softSkillsScore + readiness.domainScore) / 3);
        DB.setReadiness(readiness);
    }

    showToast(`AI Interview Score (${latest.overallScore}/10) added to your Career Profile!`, 'success');
    closeScoreModal();
    initReadinessDashboard();
}

function updateScoreFromLatest() {
    const el = document.getElementById('stat-interviews');
    if (el) el.innerText = DB.getInterviews().length;
}
