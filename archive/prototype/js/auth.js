/**
 * Viksit CareerBridge - Authentication & Role Management
 * MPOnline Idea & Innovation Hackathon 2026
 * Handles Role-Based Access Control (RBAC) & Session Handling
 */

import { AppState } from './firebase-config.js';
import { MOCK_DATA } from './data/mock-data.js';

export class AuthController {
  constructor() {
    this.currentRoleMode = 'student'; // 'student' | 'corporate_recruiter'
    this.initEventListeners();
  }

  initEventListeners() {
    // Watch for portal switch buttons in navbar or auth forms
    const studentTab = document.getElementById('tabStudentPortal');
    const recruiterTab = document.getElementById('tabRecruiterPortal');

    if (studentTab && recruiterTab) {
      studentTab.addEventListener('click', () => this.switchPortalRole('student'));
      recruiterTab.addEventListener('click', () => this.switchPortalRole('corporate_recruiter'));
    }

    // Role switcher on auth modal if present
    const authStudentToggle = document.getElementById('authToggleStudent');
    const authRecruiterToggle = document.getElementById('authToggleRecruiter');

    if (authStudentToggle && authRecruiterToggle) {
      authStudentToggle.addEventListener('click', () => this.setAuthFormRole('student'));
      authRecruiterToggle.addEventListener('click', () => this.setAuthFormRole('corporate_recruiter'));
    }

    // Handle Auth form submissions
    const authForm = document.getElementById('mainAuthForm');
    if (authForm) {
      authForm.addEventListener('submit', (e) => this.handleAuthSubmit(e));
    }

    // Handle Google Login
    const googleBtn = document.getElementById('googleSignInBtn');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => this.handleGoogleLogin());
    }

    // Quick demo switchers
    const quickStudentBtn = document.getElementById('quickStudentLogin');
    if (quickStudentBtn) {
      quickStudentBtn.addEventListener('click', () => {
        this.loginAsDemo('student');
      });
    }

    const quickRecruiterBtn = document.getElementById('quickRecruiterLogin');
    if (quickRecruiterBtn) {
      quickRecruiterBtn.addEventListener('click', () => {
        this.loginAsDemo('corporate_recruiter');
      });
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }
  }

  setAuthFormRole(role) {
    this.currentRoleMode = role;
    const authStudentToggle = document.getElementById('authToggleStudent');
    const authRecruiterToggle = document.getElementById('authToggleRecruiter');
    const roleNotice = document.getElementById('authRoleNotice');

    if (authStudentToggle && authRecruiterToggle) {
      if (role === 'student') {
        authStudentToggle.classList.add('active');
        authRecruiterToggle.classList.remove('active');
        if (roleNotice) {
          roleNotice.textContent = "Accessing Student Readiness Command Center, AI Mock Studio & Skill Roadmap.";
        }
      } else {
        authRecruiterToggle.classList.add('active');
        authStudentToggle.classList.remove('active');
        if (roleNotice) {
          roleNotice.textContent = "Accessing Corporate Recruiter Console, Candidate Sourcing & Verified Drives.";
        }
      }
    }
  }

  switchPortalRole(role) {
    AppState.setUser(
      role === 'student' ? MOCK_DATA.currentStudent : {
        uid: "recruiter_tcs_01",
        name: "Vikram Malhotra",
        company: "Tata Consultancy Services (TCS) Campus Hiring",
        email: "v.malhotra@tcs.com",
        role: "corporate_recruiter"
      },
      role
    );

    this.updateUIPortal(role);
  }

  updateUIPortal(role) {
    const studentTab = document.getElementById('tabStudentPortal');
    const recruiterTab = document.getElementById('tabRecruiterPortal');
    const studentView = document.getElementById('studentPortalView');
    const recruiterView = document.getElementById('recruiterPortalView');
    const userDisplayName = document.getElementById('userDisplayName');
    const userRoleBadge = document.getElementById('userRoleBadge');

    if (studentTab && recruiterTab) {
      if (role === 'student') {
        studentTab.classList.add('active');
        studentTab.classList.remove('recruiter-active');
        recruiterTab.classList.remove('active');
        if (studentView) studentView.style.display = 'block';
        if (recruiterView) recruiterView.style.display = 'none';

        if (userDisplayName) userDisplayName.textContent = "Priya Sharma";
        if (userRoleBadge) {
          userRoleBadge.textContent = "Student (78% Ready)";
          userRoleBadge.className = "gov-badge";
        }
      } else {
        recruiterTab.classList.add('active', 'recruiter-active');
        studentTab.classList.remove('active');
        if (studentView) studentView.style.display = 'none';
        if (recruiterView) recruiterView.style.display = 'block';

        if (userDisplayName) userDisplayName.textContent = "TCS Corporate Hiring";
        if (userRoleBadge) {
          userRoleBadge.textContent = "Verified Recruiter";
          userRoleBadge.className = "badge-blue";
        }
      }
    }
  }

  handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail')?.value || 'student@rgpv.ac.in';
    const name = email.split('@')[0];

    const newUser = {
      uid: "usr_" + Date.now(),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email,
      role: this.currentRoleMode,
      college: "MP State Affiliated Technical Institute",
      createdAt: new Date().toISOString()
    };

    AppState.setUser(newUser, this.currentRoleMode);
    this.closeAuthModal();
    this.updateUIPortal(this.currentRoleMode);
  }

  handleGoogleLogin() {
    const demoGoogleUser = {
      uid: "google_std_" + Date.now(),
      name: "Priya Sharma",
      email: "priya.sharma@rgpv.ac.in",
      role: this.currentRoleMode,
      college: "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)",
      createdAt: new Date().toISOString()
    };

    AppState.setUser(demoGoogleUser, this.currentRoleMode);
    this.closeAuthModal();
    this.updateUIPortal(this.currentRoleMode);
  }

  loginAsDemo(role) {
    this.switchPortalRole(role);
    this.closeAuthModal();
  }

  openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('active');
  }

  closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('active');
  }

  logout() {
    localStorage.removeItem('cb_user');
    localStorage.removeItem('cb_role');
    window.location.reload();
  }
}

// Instantiate and expose globally
export const authController = new AuthController();
