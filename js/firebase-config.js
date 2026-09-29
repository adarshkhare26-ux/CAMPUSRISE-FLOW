/* ==========================================================================
   Viksit CareerBridge — Firebase Central Configuration & Database Helpers
   MPOnline Idea & Innovation Hackathon 2026
   ========================================================================== */

// Firebase SDK Configuration Object
const firebaseConfig = {
    apiKey: "AIzaSyDEMO_API_KEY_VIKSIT_CAREERBRIDGE_2026",
    authDomain: "viksit-careerbridge.firebaseapp.com",
    projectId: "viksit-careerbridge",
    storageBucket: "viksit-careerbridge.firebasestorage.app",
    messagingSenderId: "987654321012",
    appId: "1:987654321012:web:a1b2c3d4e5f67890",
    measurementId: "G-VIKSIT2026"
};

// Global App State Controller
window.CareerBridge = {
    config: firebaseConfig,
    currentUser: null,
    isFirebaseLive: false,
    
    // LocalStorage Keys for Offline / Prototype Persistence
    STORAGE_KEYS: {
        USER: 'careerbridge_active_user',
        READINESS: 'careerbridge_readiness_score',
        MOCK_LOGS: 'careerbridge_mock_interviews',
        DRIVES: 'careerbridge_placement_drives',
        SHORTLISTS: 'careerbridge_recruiter_shortlists'
    },

    // Initialize Active Session
    initSession() {
        const savedUser = localStorage.getItem(this.STORAGE_KEYS.USER);
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
            } catch (e) {
                console.error("Failed to parse saved user state", e);
            }
        }
        
        // If no user saved, set default demo student session
        if (!this.currentUser) {
            this.currentUser = {
                uid: 'demo-student-001',
                name: 'Priya Sharma',
                email: 'priya.sharma@rgpv.ac.in',
                role: 'student',
                college: 'RGPV Institute of Technology, Bhopal',
                branch: 'Computer Science & Engineering',
                readinessScore: 78
            };
            this.saveUserSession(this.currentUser);
        }

        this.initDefaultMockData();
    },

    saveUserSession(userObj) {
        this.currentUser = userObj;
        localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(userObj));
    },

    clearSession() {
        this.currentUser = null;
        localStorage.removeItem(this.STORAGE_KEYS.USER);
    },

    // Initialize Default Seed Mock Data for Prototype
    initDefaultMockData() {
        if (!localStorage.getItem(this.STORAGE_KEYS.READINESS)) {
            const defaultReadiness = {
                overallScore: 78,
                technicalScore: 82,
                softSkillsScore: 74,
                domainScore: 70,
                verifiedBadges: ['Python & SQL', 'Data Structures', 'Git & GitHub'],
                upgradeSkills: ['Cloud Architecture', 'System Design', 'Docker Containerization']
            };
            localStorage.setItem(this.STORAGE_KEYS.READINESS, JSON.stringify(defaultReadiness));
        }

        if (!localStorage.getItem(this.STORAGE_KEYS.DRIVES)) {
            const defaultDrives = [
                {
                    id: 'drive-101',
                    companyName: 'TCS Digital Campus Drive 2026',
                    jobTitle: 'Junior Software Engineer',
                    minReadinessScore: 75,
                    stipend: '₹7.0 - ₹9.0 LPA',
                    location: 'Indore / Bhopal IT Park',
                    skillsRequired: ['Python', 'SQL', 'Problem Solving'],
                    verifiedBadge: true
                },
                {
                    id: 'drive-102',
                    companyName: 'MPSEDC Tech Trainee Drive',
                    jobTitle: 'Data Analyst & Cloud Intern',
                    minReadinessScore: 70,
                    stipend: '₹25,000 / month',
                    location: 'Bhopal (Smart City Office)',
                    skillsRequired: ['Data Analytics', 'Power BI', 'SQL'],
                    verifiedBadge: true
                },
                {
                    id: 'drive-103',
                    companyName: 'Infosys Specialist Programmer',
                    jobTitle: 'Full Stack Java / React Developer',
                    minReadinessScore: 80,
                    stipend: '₹9.5 LPA',
                    location: 'Gwalior / Remote',
                    skillsRequired: ['ReactJS', 'Node.js', 'PostgreSQL'],
                    verifiedBadge: true
                }
            ];
            localStorage.setItem(this.STORAGE_KEYS.DRIVES, JSON.stringify(defaultDrives));
        }
    }
};

// Auto-run session init on script load
window.CareerBridge.initSession();
