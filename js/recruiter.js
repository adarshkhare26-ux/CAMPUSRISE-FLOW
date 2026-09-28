/**
 * Viksit CareerBridge - Corporate Recruiter Console
 * MPOnline Idea & Innovation Hackathon 2026
 * Candidate Sourcing, Multi-Filter Engine, AI Scorecard Modal, Shortlisting
 */

import { AppState } from './firebase-config.js';

export class RecruiterController {
  constructor() {
    this.activeFilterMinScore = 0;
    this.activeFilterSkill = 'all';
    this.activeFilterBranch = 'all';
    this.activeSearchQuery = '';
    this.init();
  }

  init() {
    this.renderCandidateGrid();
    this.setupEventListeners();

    window.addEventListener('cb_candidates_updated', () => {
      this.renderCandidateGrid();
    });
  }

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('recruiterCandidateSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.activeSearchQuery = e.target.value.toLowerCase();
        this.renderCandidateGrid();
      });
    }

    // Min Score filter
    const scoreFilter = document.getElementById('filterReadinessScore');
    if (scoreFilter) {
      scoreFilter.addEventListener('change', (e) => {
        this.activeFilterMinScore = parseInt(e.target.value) || 0;
        this.renderCandidateGrid();
      });
    }

    // Skill filter
    const skillFilter = document.getElementById('filterSkillTag');
    if (skillFilter) {
      skillFilter.addEventListener('change', (e) => {
        this.activeFilterSkill = e.target.value;
        this.renderCandidateGrid();
      });
    }

    // Modal close
    const modalClose = document.getElementById('closeInterviewSummaryModal');
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        const modal = document.getElementById('interviewSummaryModal');
        if (modal) modal.classList.remove('active');
      });
    }
  }

  renderCandidateGrid() {
    const grid = document.getElementById('recruiterCandidateGrid');
    if (!grid) return;

    let list = AppState.candidates;

    // Apply Readiness score cutoff filter
    if (this.activeFilterMinScore > 0) {
      list = list.filter(c => c.overallScore >= this.activeFilterMinScore);
    }

    // Apply Skill tag filter
    if (this.activeFilterSkill !== 'all') {
      list = list.filter(c => c.skills.some(s => s.toLowerCase().includes(this.activeFilterSkill.toLowerCase())));
    }

    // Apply Search Query
    if (this.activeSearchQuery) {
      list = list.filter(c => 
        c.name.toLowerCase().includes(this.activeSearchQuery) ||
        c.college.toLowerCase().includes(this.activeSearchQuery) ||
        c.branch.toLowerCase().includes(this.activeSearchQuery) ||
        c.skills.some(s => s.toLowerCase().includes(this.activeSearchQuery))
      );
    }

    const countElem = document.getElementById('matchedCandidateCount');
    if (countElem) countElem.textContent = `${list.length} Verified Candidates Matched`;

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: var(--color-surface); border-radius: var(--radius-card);">
          <i class="fa-solid fa-user-slash" style="font-size: 36px; color: var(--color-text-muted); margin-bottom: 12px;"></i>
          <h3>No candidates match the specified filter criteria</h3>
          <p class="subtitle">Try lowering the readiness score cutoff or selecting all skills.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(c => `
      <div class="candidate-card">
        <div>
          <div class="candidate-top">
            <div class="candidate-avatar">${c.avatar}</div>
            <div class="candidate-info">
              <h4>${c.name} 
                ${c.verified ? '<i class="fa-solid fa-circle-check" style="color: var(--color-accent-growth); font-size: 13px;" title="Government / MPOnline Verified"></i>' : ''}
              </h4>
              <div class="candidate-college">${c.college} • ${c.branch}</div>
            </div>
          </div>

          <div class="candidate-scores-row">
            <div class="score-metric-sub">
              <span class="num green">${c.overallScore}%</span>
              <span class="lbl">Readiness Score</span>
            </div>
            <div class="score-metric-sub">
              <span class="num">${c.interviewRating}/10</span>
              <span class="lbl">AI Interview</span>
            </div>
            <div class="score-metric-sub">
              <span class="num">${c.techScore}%</span>
              <span class="lbl">Technical</span>
            </div>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;">
            ${c.skills.slice(0, 3).map(s => `<span class="badge-blue" style="font-size: 11px; padding: 3px 8px;">${s}</span>`).join('')}
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="btn-pill btn-subtle btn-view-summary" data-uid="${c.uid}" style="width: 100%; font-size: 12.5px; padding: 8px;">
            <i class="fa-solid fa-file-waveform"></i> View AI Interview Summary
          </button>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button class="btn-pill ${c.status === 'Shortlisted' ? 'btn-emerald' : 'btn-outline-sapphire'} btn-shortlist" data-uid="${c.uid}" style="font-size: 12px; padding: 8px;">
              <i class="fa-solid fa-star"></i> ${c.status === 'Shortlisted' ? 'Shortlisted' : 'Shortlist'}
            </button>
            <button class="btn-pill btn-sapphire btn-schedule-interview" data-name="${c.name}" style="font-size: 12px; padding: 8px;">
              <i class="fa-solid fa-calendar-check"></i> Schedule
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listeners to cards
    grid.querySelectorAll('.btn-view-summary').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const uid = e.currentTarget.dataset.uid;
        this.openInterviewSummaryModal(uid);
      });
    });

    grid.querySelectorAll('.btn-shortlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const uid = e.currentTarget.dataset.uid;
        AppState.shortlistCandidate(uid);
      });
    });

    grid.querySelectorAll('.btn-schedule-interview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = e.currentTarget.dataset.name;
        alert(`📅 Direct Campus Interview invitation sent to ${name} with official MPOnline Placement Drive token!`);
      });
    });
  }

  openInterviewSummaryModal(uid) {
    const candidate = AppState.candidates.find(c => c.uid === uid) || AppState.candidates[0];
    const modal = document.getElementById('interviewSummaryModal');
    const modalBody = document.getElementById('interviewSummaryModalBody');

    if (modal && modalBody) {
      modalBody.innerHTML = `
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--color-border-subtle);">
          <div class="candidate-avatar">${candidate.avatar}</div>
          <div>
            <h3>${candidate.name}</h3>
            <div style="color: var(--color-text-muted); font-size: 13px;">${candidate.college} • ${candidate.branch}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
          <div class="meter-card" style="text-align: center;">
            <div class="score-metric-sub">
              <span class="num green" style="font-size: 24px;">${candidate.interviewRating}/10</span>
              <span class="lbl">AI Rating</span>
            </div>
          </div>
          <div class="meter-card" style="text-align: center;">
            <div class="score-metric-sub">
              <span class="num" style="font-size: 24px;">${candidate.techScore}%</span>
              <span class="lbl">Tech Accuracy</span>
            </div>
          </div>
          <div class="meter-card" style="text-align: center;">
            <div class="score-metric-sub">
              <span class="num" style="font-size: 24px;">${candidate.softScore}%</span>
              <span class="lbl">Speech Clarity</span>
            </div>
          </div>
        </div>

        <div style="background: var(--color-sky-light); border: 1px solid var(--color-border-accent); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
          <h5 style="color: var(--color-primary); font-size: 13.5px; margin-bottom: 6px;">
            <i class="fa-solid fa-robot"></i> Gemini AI Assessment Summary:
          </h5>
          <p style="font-size: 13px; color: var(--color-text-body); line-height: 1.5;">
            "Candidate demonstrated thorough command of asynchronous Node.js architecture and database query planning. Pacing was measured at 135 WPM (Optimal). Recommended for Technical Architecture and Full Stack Engineer tracks."
          </p>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn-pill btn-subtle" onclick="document.getElementById('interviewSummaryModal').classList.remove('active')">Close</button>
          <button class="btn-pill btn-emerald" onclick="alert('Candidate confirmed for Tata Consultancy Services Super-Coders Drive!'); document.getElementById('interviewSummaryModal').classList.remove('active');">
            <i class="fa-solid fa-check-double"></i> Confirm for Campus Drive
          </button>
        </div>
      `;
      modal.classList.add('active');
    }
  }
}

export const recruiterController = new RecruiterController();
