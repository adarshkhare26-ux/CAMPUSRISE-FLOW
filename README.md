# Viksit CareerBridge (CampusRise Flow) 🚀
> **MPOnline Idea & Innovation Hackathon 2026 Submission**  
> *AI-Driven Campus Placement & Skill Readiness Platform connecting Students, TPOs, and Corporate Recruiters.*

---

## 🌟 Overview

**Viksit CareerBridge** is a modern, end-to-end placement ecosystem designed to bridge the gap between academic learning and industry job requirements. Built for students, training & placement officers (TPOs), and corporate recruiters, the platform provides real-time placement readiness scoring, AI-powered mock interviews with voice interaction, ATS resume optimization, and seamless recruiter candidate shortlisting.

---

## 🔑 Key Features

### 🔐 1. Authentication & Role Switcher ([`auth.html`](file:///c:/Users/HP/Documents/vault/mponline/CAMPUSRISE-FLOW/auth.html))
- **Dual Role Access**: Instant toggle between **Student** and **Corporate Recruiter** portals.
- **Form Controls**: Email/password authentication with live regex validation and error state handling.
- **Password Strength Meter**: Dynamic visual progress indicator evaluating password complexity (Weak → Strong).
- **Google OAuth UI Integration**: Single sign-on setup.
- **⚡ 1-Click Demo Login**: Pre-filled credentials for instant hackathon evaluation for both Student and Recruiter roles.

### 📊 2. Student Dashboard ([`index.html`](file:///c:/Users/HP/Documents/vault/mponline/CAMPUSRISE-FLOW/index.html))
- **Placement Readiness Gauge**: Animated semi-circle SVG progress gauge showing real-time AI placement readiness score (0-100%).
- **Skill Gap Analysis**: Breakdown of Technical, Soft Skills, Aptitude, and Domain knowledge.
- **Personalized Action Plan**: Interactive task list recommending next steps (e.g. mock interviews, resume fixes).
- **Upcoming Drives Feed**: Real-time listing of active placement drives posted by corporate recruiters.

### 👤 3. Student Profile & Portfolio ([`profile.html`](file:///c:/Users/HP/Documents/vault/mponline/CAMPUSRISE-FLOW/profile.html))
- **Academic Overview**: CGPA, branch, graduation year, and college details.
- **DigiLocker Verification Badge**: Verified document vault indicator for academic transcripts & certificates.
- **Skills & Certifications**: Dynamic skill tag editor and certificate upload tracker.
- **Experience Timeline**: Project highlights, internships, and hackathon accomplishments.

### 🎙️ 4. AI Assessment & Voice Interviewer ([`assessment.html`](file:///c:/Users/HP/Documents/vault/mponline/CAMPUSRISE-FLOW/assessment.html))
- **Live Web Speech API**: Interactive voice-based AI interview experience using speech recognition (`webkitSpeechRecognition`) and text-to-speech (`SpeechSynthesis`).
- **Real-Time Speech Transcripts**: Visual speech-to-text rendering with status indicators (Listening, Speaking, Evaluating).
- **AI Scoring Engine**: Calculates ratings across 3 key competencies:
  - Technical Accuracy
  - Soft Skills & Communication
  - Problem Solving & Logic
- **Detailed Feedback Report**: Breakdown of strengths, areas for improvement, and overall readiness impact score.

### 📄 5. AI Resume Enhancer ([`resume-enhancer.html`](file:///c:/Users/HP/Documents/vault/mponline/CAMPUSRISE-FLOW/resume-enhancer.html))
- **Interactive Resume Parser**: Upload/paste resume text for instant AI diagnostics.
- **ATS Compatibility Score**: Real-time evaluation of formatting, keyword density, and section structure.
- **Smart Suggestions**: Actionable recommendations to improve formatting, action verbs, and quantify project metrics.
- **Target Role Alignment**: Matches resume against specific job descriptions (e.g. Full Stack Developer, Data Analyst).

### 💼 6. Placements & Hackathons Hub ([`placements.html`](file:///c:/Users/HP/Documents/vault/mponline/CAMPUSRISE-FLOW/placements.html))
- **Drive Listings**: Interactive cards with CTC, company profile, location, and application deadlines.
- **Dynamic Lock/Unlock System**: Lock/Unlock eligibility indicators based on the student's placement readiness score.
- **1-Click Application Tracker**: Saves application status directly to the local database and reflects immediately across portals.

### 🏢 7. Corporate Recruiter Console ([`recruiter.html`](file:///c:/Users/HP/Documents/vault/mponline/CAMPUSRISE-FLOW/recruiter.html))
- **Candidate Discovery Grid**: Filter candidate profiles by skill tags, readiness percentage, and location.
- **Real-Time Range Slider & Search**: Instant client-side filtering without page reloads.
- **Candidate Detail Modal**: Full breakdown of candidate readiness, resume score, and AI interview feedback.
- **Shortlist Manager**: Save candidates to shortlisted collection with state persistence.
- **Post New Drive**: Dedicated form allowing recruiters to publish new drives directly to the student job board.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: HTML5, Vanilla CSS3 (Glassmorphism design system, CSS variables, Flexbox/Grid), Modern JavaScript (ES6+ Modules).
- **Voice AI**: Native Browser Web Speech API (`webkitSpeechRecognition` + `SpeechSynthesisUtterance`).
- **Database Engine**: Persistent `localStorage` client DB engine (`/js/db.js`) supporting relational collections:
  - `users`: Account details & roles
  - `sessions`: Active user authentication state
  - `drives`: Active company drives and job requirements
  - `applications`: Student job application tracking
  - `resumes`: Resume analysis history & scores
  - `interview_results`: AI mock interview logs & category scores
- **Notifications**: Toast notification manager (`/js/toast.js`).

---

## 📂 Repository Structure

```text
CAMPUSRISE-FLOW/
├── auth.html              # Login, Register, Role Selection & Demo Login
├── index.html             # Student Placement Readiness Dashboard
├── profile.html           # Student Portfolio & DigiLocker Verifications
├── assessment.html        # Voice AI Assessment & Mock Interview Engine
├── resume-enhancer.html   # AI Resume Builder & ATS Scorer
├── placements.html        # Campus Placement Drives & Application Tracker
├── recruiter.html         # Corporate Recruiter Search & Job Posting Portal
├── css/
│   └── styles.css         # Core Design System, Animations & Glassmorphism UI
├── js/
│   ├── auth.js            # Authentication logic & validation rules
│   ├── db.js              # LocalStorage relational database engine
│   ├── toast.js           # Toast notification system
│   ├── voice-ai.js        # Web Speech API Voice AI Interview Handler
│   ├── resume.js          # ATS scoring & keyword analyzer
│   ├── recruiter.js       # Recruiter candidate filtering & job poster
│   └── main.js            # Common UI interactions & dashboard state
└── README.md              # Project Documentation
```

---

## 🚀 Quick Start & Local Preview

### Option A: Using Local HTTP Server (Python)
1. Clone the repository:
   ```bash
   git clone https://github.com/adarshkhare26-ux/CAMPUSRISE-FLOW.git
   cd CAMPUSRISE-FLOW
   ```
2. Start local web server:
   ```bash
   python -m http.server 8080
   ```
3. Open in browser:
   - **Auth Portal:** `http://localhost:8080/auth.html`
   - **Student Dashboard:** `http://localhost:8080/index.html`

### Option B: Direct File Preview
Simply double click [`auth.html`](file:///c:/Users/HP/Documents/vault/mponline/CAMPUSRISE-FLOW/auth.html) or open it directly in Google Chrome / Microsoft Edge.

---

## 🧪 Demo Credentials

To test the application without registration:

| Role | Email | Password | Quick Login Action |
|---|---|---|---|
| **Student** | `student@demo.com` | `Student123!` | Click **⚡ Quick Demo Student** on Auth Page |
| **Recruiter** | `recruiter@demo.com` | `Recruiter123!` | Click **⚡ Quick Demo Recruiter** on Auth Page |

---

## 📄 License

Developed for **MPOnline Idea & Innovation Hackathon 2026**.  
Created by **Adarsh Khare** (`adarshkhare26-ux` / `adarshkhare2605`).