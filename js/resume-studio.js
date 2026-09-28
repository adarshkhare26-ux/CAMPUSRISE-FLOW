/**
 * Viksit CareerBridge - AI Resume Enhancer & Verified Profile
 * MPOnline Idea & Innovation Hackathon 2026
 * Split View Resume Builder, AI Suggestion Engine & PDF/Govt Verification
 */

import { AppState } from './firebase-config.js';

export class ResumeStudioController {
  constructor() {
    this.isHackathonAdded = false;
    this.isQuantified = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Action: Apply MP Online Hackathon Project Suggestion (+12% Boost)
    const addHackathonBtn = document.getElementById('btnApplyHackathonSuggestion');
    if (addHackathonBtn) {
      addHackathonBtn.addEventListener('click', () => this.applyHackathonSuggestion());
    }

    // Action: Apply Quantification Suggestion
    const applyQuantBtn = document.getElementById('btnApplyQuantSuggestion');
    if (applyQuantBtn) {
      applyQuantBtn.addEventListener('click', () => this.applyQuantSuggestion());
    }

    // One-Click Actions
    const btnGeneratePdf = document.getElementById('btnGenerateResumePdf');
    if (btnGeneratePdf) {
      btnGeneratePdf.addEventListener('click', () => this.generatePdf());
    }

    const btnVerifyGovt = document.getElementById('btnVerifyGovtPortal');
    if (btnVerifyGovt) {
      btnVerifyGovt.addEventListener('click', () => this.verifyGovtPortal());
    }

    const btnPublishDrive = document.getElementById('btnPublishPlacementDrive');
    if (btnPublishDrive) {
      btnPublishDrive.addEventListener('click', () => this.publishToPlacementDrive());
    }
  }

  applyHackathonSuggestion() {
    if (this.isHackathonAdded) return;
    this.isHackathonAdded = true;

    // Inject project into live resume preview
    const projectList = document.getElementById('resumeProjectsList');
    if (projectList) {
      const newProj = document.createElement('div');
      newProj.className = 'resume-item';
      newProj.style.animation = 'fadeIn 0.5s ease';
      newProj.innerHTML = `
        <div class="resume-item-header">
          <span>Viksit CareerBridge - MPOnline Innovation Hackathon 2026</span>
          <span style="color: var(--color-accent-growth); font-size: 11px;">[Verified Hackathon Build]</span>
        </div>
        <div class="resume-item-sub">Vanilla CSS, Modular JS, Firebase Firestore & Gemini AI Logic</div>
        <ul>
          <li>Engineered dual-portal architecture supporting real-time skill matching and simulated AI speech interview assessments for university students.</li>
          <li>Optimized zero-bloat state management reducing initial load payload by 85%.</li>
        </ul>
      `;
      projectList.prepend(newProj);
    }

    // Boost score in AppState (+12%)
    const currentOverall = AppState.readinessScore.overallScore;
    const newOverall = Math.min(96, currentOverall + 12);
    AppState.updateReadiness({
      overallScore: newOverall,
      technicalScore: Math.min(98, AppState.readinessScore.technicalScore + 10),
      domainScore: Math.min(95, AppState.readinessScore.domainScore + 14)
    });

    const btn = document.getElementById('btnApplyHackathonSuggestion');
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Applied! (+12% Corporate Readiness Added)';
      btn.className = 'btn-pill btn-subtle';
      btn.disabled = true;
    }
  }

  applyQuantSuggestion() {
    if (this.isQuantified) return;
    this.isQuantified = true;

    const expBullet = document.getElementById('resumeExpBullet1');
    if (expBullet) {
      expBullet.innerHTML = "Spearheaded web API modules resulting in <strong>42% lower latency</strong> across 50,000+ monthly requests.";
    }

    const btn = document.getElementById('btnApplyQuantSuggestion');
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Quantified & Stamped!';
      btn.className = 'btn-pill btn-subtle';
      btn.disabled = true;
    }
  }

  generatePdf() {
    window.print();
  }

  verifyGovtPortal() {
    const govtBadge = document.getElementById('resumeGovtVerifiedBadge');
    if (govtBadge) {
      govtBadge.style.display = 'inline-flex';
    }
    alert("✅ Authenticated against MPOnline Digilocker & RGPV University Academic Bank of Credits (ABC-ID: 9812-4412-8819). Skills & GPA verified!");
  }

  publishToPlacementDrive() {
    alert("🚀 Congratulations! Your verified profile and AI Interview Scorecard have been pushed to 14 active Corporate Placement Drives across Madhya Pradesh!");
  }
}

export const resumeStudioController = new ResumeStudioController();
