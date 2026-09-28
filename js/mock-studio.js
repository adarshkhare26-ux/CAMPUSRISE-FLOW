/**
 * Viksit CareerBridge - AI Interactive Mock Interview Studio
 * MPOnline Idea & Innovation Hackathon 2026
 * Audio Visualizer, Speech Prompts, Real-Time Pace/Confidence, AI Scorecard
 */

import { AppState } from './firebase-config.js';
import { MOCK_DATA } from './data/mock-data.js';

export class MockStudioController {
  constructor() {
    this.duration = 10;
    this.focusArea = "Technical";
    this.currentQuestionIdx = 0;
    this.isRecording = false;
    this.isPaused = false;
    this.timerInterval = null;
    this.elapsedSeconds = 0;
    this.mockTranscriptStream = [
      "Hello! Welcome to your corporate readiness mock assessment. Let's begin.",
      "Candidate: Thank you. I am prepared to discuss software architecture and system performance.",
      "AI Interviewer: Great. Can you explain how the Event Loop handles asynchronous operations in Node.js?",
      "Candidate: In Node.js, the event loop operates on a single thread. It delegates heavy I/O operations to Libuv thread pool and processes callback queues seamlessly.",
      "AI Interviewer: Excellent precision on Libuv. Now, how do you diagnose database bottlenecks at scale?"
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Option chips for duration & focus
    document.querySelectorAll('.duration-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.duration-chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        this.duration = parseInt(e.target.dataset.duration || 10);
      });
    });

    document.querySelectorAll('.focus-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.focus-chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        this.focusArea = e.target.dataset.focus || 'Technical';
      });
    });

    // Start / Mic toggle
    const micBtn = document.getElementById('btnInterviewMic');
    if (micBtn) {
      micBtn.addEventListener('click', () => this.toggleInterviewRecording());
    }

    // Pause toggle
    const pauseBtn = document.getElementById('btnInterviewPause');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => this.togglePause());
    }

    // End & Analyze
    const endBtn = document.getElementById('btnInterviewEnd');
    if (endBtn) {
      endBtn.addEventListener('click', () => this.endAndAnalyze());
    }

    // Direct CTA on Post-Interview Card: Add Score to Corporate Resume Profile
    const addScoreBtn = document.getElementById('btnAddScoreToProfile');
    if (addScoreBtn) {
      addScoreBtn.addEventListener('click', () => this.addScoreToProfile());
    }
  }

  toggleInterviewRecording() {
    const micBtn = document.getElementById('btnInterviewMic');
    const avatar = document.getElementById('aiAvatar');
    const wave = document.getElementById('visualizerWave');
    const statusText = document.getElementById('interviewLiveStatus');

    if (!this.isRecording) {
      this.isRecording = true;
      if (micBtn) micBtn.classList.add('active-mic');
      if (avatar) avatar.classList.add('speaking');
      if (wave) wave.classList.add('active');
      if (statusText) statusText.innerHTML = '<span class="pulse-dot"></span> Live Voice Assessment in Progress...';

      this.startTimer();
      this.streamSimulatedTranscript();
    } else {
      this.isRecording = false;
      if (micBtn) micBtn.classList.remove('active-mic');
      if (avatar) avatar.classList.remove('speaking');
      if (wave) wave.classList.remove('active');
      if (statusText) statusText.textContent = 'Voice Session Paused';
      this.stopTimer();
    }
  }

  togglePause() {
    if (!this.isRecording) return;
    this.isPaused = !this.isPaused;
    const pauseBtn = document.getElementById('btnInterviewPause');
    if (pauseBtn) {
      pauseBtn.innerHTML = this.isPaused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
    }
  }

  startTimer() {
    const timerElem = document.getElementById('interviewTimerDisplay');
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.isPaused) {
        this.elapsedSeconds++;
        const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
        const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
        if (timerElem) timerElem.textContent = `${mins}:${secs}`;

        // Dynamic fluctuations in confidence and speech pace
        this.updateTelemetryGauges();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  updateTelemetryGauges() {
    const paceVal = document.getElementById('speechPaceVal');
    const paceBar = document.getElementById('speechPaceBar');
    const confVal = document.getElementById('confidenceScoreVal');
    const confBar = document.getElementById('confidenceScoreBar');

    const randomPace = Math.floor(130 + Math.random() * 15);
    const randomConf = Math.floor(84 + Math.random() * 8);

    if (paceVal) paceVal.textContent = `${randomPace} WPM (Optimal)`;
    if (paceBar) paceBar.style.width = `${Math.min(100, (randomPace / 160) * 100)}%`;

    if (confVal) confVal.textContent = `${randomConf}%`;
    if (confBar) confBar.style.width = `${randomConf}%`;
  }

  streamSimulatedTranscript() {
    const transcriptContainer = document.getElementById('transcriptStreamBox');
    if (!transcriptContainer) return;

    let index = 0;
    const interval = setInterval(() => {
      if (!this.isRecording) {
        clearInterval(interval);
        return;
      }
      if (index < this.mockTranscriptStream.length) {
        const text = this.mockTranscriptStream[index];
        const isAi = text.startsWith("AI Interviewer:") || index === 0;
        const msgDiv = document.createElement('div');
        msgDiv.className = `transcript-message ${isAi ? 'transcript-ai' : 'transcript-user'}`;
        msgDiv.innerHTML = `<strong>${isAi ? 'AI Evaluator' : 'You'}:</strong> ${text.replace(/^Candidate:\s*|^AI Interviewer:\s*/, '')}`;
        transcriptContainer.appendChild(msgDiv);
        transcriptContainer.scrollTop = transcriptContainer.scrollHeight;
        index++;
      } else {
        clearInterval(interval);
      }
    }, 3500);
  }

  endAndAnalyze() {
    this.isRecording = false;
    this.stopTimer();

    const avatar = document.getElementById('aiAvatar');
    const wave = document.getElementById('visualizerWave');
    const micBtn = document.getElementById('btnInterviewMic');
    const statusText = document.getElementById('interviewLiveStatus');
    const scorecardCard = document.getElementById('postInterviewScorecard');

    if (avatar) avatar.classList.remove('speaking');
    if (wave) wave.classList.remove('active');
    if (micBtn) micBtn.classList.remove('active-mic');
    if (statusText) statusText.textContent = 'Assessment Completed & Evaluated by Gemini AI Engine.';

    if (scorecardCard) {
      scorecardCard.style.display = 'flex';
      scorecardCard.scrollIntoView({ behavior: 'smooth' });
    }
  }

  addScoreToProfile() {
    // Boost readiness score from 78% to 84% based on 8.5/10 rating
    AppState.updateReadiness({
      overallScore: 84,
      technicalScore: 88,
      softSkillsScore: 80,
      domainScore: 78
    });

    const addScoreBtn = document.getElementById('btnAddScoreToProfile');
    if (addScoreBtn) {
      addScoreBtn.innerHTML = '<i class="fa-solid fa-check"></i> Score Verified & Added to Profile (+6% Boost!)';
      addScoreBtn.classList.remove('btn-emerald');
      addScoreBtn.classList.add('btn-subtle');
      addScoreBtn.disabled = true;
    }

    alert("🎉 Excellent! Your verified 8.5/10 AI Mock Interview score has been permanently stamped to your Corporate Profile and Firestore record!");
  }
}

export const mockStudioController = new MockStudioController();
