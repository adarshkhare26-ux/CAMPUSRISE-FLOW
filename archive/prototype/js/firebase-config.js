/**
 * Viksit CareerBridge - Centralized Firebase Initialization
 * MPOnline Idea & Innovation Hackathon 2026
 * Aligned with Firebase SDK v10+ modular standards
 */

import { MOCK_DATA } from './data/mock-data.js';

// Firebase Web SDK v10 Configuration
// Can be customized via environment or window.FIREBASE_CONFIG
export const firebaseConfig = window.FIREBASE_CONFIG || {
  apiKey: "AIzaSyDEMO-KEY-CAMPUSRISE-MPONLINE",
  authDomain: "campusrise-flow.firebaseapp.com",
  projectId: "campusrise-flow",
  storageBucket: "campusrise-flow.appspot.com",
  messagingSenderId: "1029384756",
  appId: "1:1029384756:web:8a9b0c1d2e3f"
};

// Application state holder
export const AppState = {
  currentUser: JSON.parse(localStorage.getItem('cb_user')) || MOCK_DATA.currentStudent,
  currentRole: localStorage.getItem('cb_role') || 'student', // 'student' | 'corporate_recruiter'
  readinessScore: JSON.parse(localStorage.getItem('cb_readiness')) || MOCK_DATA.readinessScore,
  candidates: JSON.parse(localStorage.getItem('cb_candidates')) || MOCK_DATA.candidates,
  placementDrives: MOCK_DATA.placementDrives,
  activeTargetRole: "Full Stack Developer",

  // State persistence helpers
  setUser(user, role) {
    this.currentUser = user;
    this.currentRole = role;
    localStorage.setItem('cb_user', JSON.stringify(user));
    localStorage.setItem('cb_role', role);
    window.dispatchEvent(new CustomEvent('cb_auth_change', { detail: { user, role } }));
  },

  updateReadiness(newScoreData) {
    this.readinessScore = { ...this.readinessScore, ...newScoreData, updatedAt: new Date().toISOString() };
    localStorage.setItem('cb_readiness', JSON.stringify(this.readinessScore));
    window.dispatchEvent(new CustomEvent('cb_readiness_updated', { detail: this.readinessScore }));
  },

  shortlistCandidate(uid) {
    const candidate = this.candidates.find(c => c.uid === uid);
    if (candidate) {
      candidate.status = candidate.status === 'Shortlisted' ? 'Available' : 'Shortlisted';
      localStorage.setItem('cb_candidates', JSON.stringify(this.candidates));
      window.dispatchEvent(new CustomEvent('cb_candidates_updated'));
    }
  }
};

console.log("🚀 Viksit CareerBridge Firebase Client Layer Initialized (Dual Role Enabled)");
