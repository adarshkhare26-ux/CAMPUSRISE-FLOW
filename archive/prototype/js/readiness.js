/**
 * Viksit CareerBridge - Student Readiness & Skill Gap Studio
 * MPOnline Idea & Innovation Hackathon 2026
 * Calculates & Renders Animated SVG Circular Gauge, Skill Matrix & Roadmap
 */

import { AppState } from './firebase-config.js';
import { MOCK_DATA } from './data/mock-data.js';

export class ReadinessController {
  constructor() {
    this.currentRole = "Full Stack Developer";
    this.init();
  }

  init() {
    this.renderGaugeAndMetrics();
    this.renderRoadmap();
    this.setupEventListeners();

    // Listen for readiness score changes
    window.addEventListener('cb_readiness_updated', () => {
      this.renderGaugeAndMetrics();
    });
  }

  setupEventListeners() {
    const roleSelector = document.getElementById('targetRoleSelect');
    if (roleSelector) {
      roleSelector.addEventListener('change', (e) => {
        this.currentRole = e.target.value;
        AppState.activeTargetRole = this.currentRole;
        this.renderRoadmap();
      });
    }
  }

  renderGaugeAndMetrics() {
    const score = AppState.readinessScore;
    
    // Overall score text
    const scoreNum = document.getElementById('gaugeScoreNum');
    if (scoreNum) {
      scoreNum.textContent = score.overallScore;
    }

    // Header banner text
    const bannerGreeting = document.getElementById('bannerGreetingText');
    if (bannerGreeting) {
      bannerGreeting.textContent = `Welcome back, ${AppState.currentUser.name}! You are ${score.overallScore}% Corporate Ready`;
    }

    // Animated SVG Circular Gauge (Circumference ~ 565px for r=90)
    const circle = document.getElementById('gaugeProgressCircle');
    if (circle) {
      const radius = 90;
      const circumference = 2 * Math.PI * radius; // 565.48
      const offset = circumference - (score.overallScore / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    // Update Breakdown Bars
    const techBar = document.getElementById('barTechnical');
    const techVal = document.getElementById('valTechnical');
    if (techBar && techVal) {
      techBar.style.width = `${score.technicalScore}%`;
      techVal.textContent = `${score.technicalScore}%`;
    }

    const softBar = document.getElementById('barSoftSkills');
    const softVal = document.getElementById('valSoftSkills');
    if (softBar && softVal) {
      softBar.style.width = `${score.softSkillsScore}%`;
      softVal.textContent = `${score.softSkillsScore}%`;
    }

    const domainBar = document.getElementById('barDomain');
    const domainVal = document.getElementById('valDomain');
    if (domainBar && domainVal) {
      domainBar.style.width = `${score.domainScore}%`;
      domainVal.textContent = `${score.domainScore}%`;
    }
  }

  renderRoadmap() {
    const matrixData = MOCK_DATA.roleMatrix[this.currentRole] || MOCK_DATA.roleMatrix["Full Stack Developer"];
    
    // Render Acquired Skills (Mint Badges)
    const acquiredContainer = document.getElementById('acquiredSkillsContainer');
    if (acquiredContainer) {
      acquiredContainer.innerHTML = matrixData.acquiredSkills.map(skill => `
        <span class="badge-mint">
          <i class="fa-solid fa-circle-check"></i> ${skill}
        </span>
      `).join('');
    }

    // Render Missing Skills (Soft Coral/Amber Badges)
    const missingContainer = document.getElementById('missingSkillsContainer');
    if (missingContainer) {
      missingContainer.innerHTML = matrixData.missingSkills.map(skill => `
        <span class="badge-coral">
          <i class="fa-solid fa-triangle-exclamation"></i> ${skill}
        </span>
      `).join('');
    }

    // Render 3-Phase Action Timeline
    const timelineContainer = document.getElementById('roadmapTimelineContainer');
    if (timelineContainer) {
      timelineContainer.innerHTML = matrixData.phases.map((p, idx) => {
        const isCompleted = p.status === 'completed';
        const isInProgress = p.status === 'in-progress';
        
        return `
          <div class="timeline-step ${isCompleted ? 'completed' : ''}">
            <div class="step-marker">
              ${isCompleted ? '<i class="fa-solid fa-check"></i>' : (idx + 1)}
            </div>
            <div class="step-details">
              <h4>${p.title} 
                <span class="action-card-tag ${isCompleted ? 'tag-practice' : (isInProgress ? 'tag-course' : 'tag-govt')}">
                  ${p.phase} • ${p.status.toUpperCase()}
                </span>
              </h4>
              <p>${p.desc}</p>
              ${p.link ? `<a href="${p.link}" class="btn-pill btn-subtle" style="padding: 6px 14px; font-size: 12px; margin-top: 6px;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Resource
              </a>` : ''}
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

export const readinessController = new ReadinessController();
