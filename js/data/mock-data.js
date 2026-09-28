/**
 * Viksit CareerBridge - Central Seed / Mock Dataset
 * MPOnline Idea & Innovation Hackathon 2026
 * Aligned with Cloud Firestore Schema
 */

export const MOCK_DATA = {
  // Current logged in demo student
  currentStudent: {
    uid: "std_priya_2026",
    name: "Priya Sharma",
    email: "priya.sharma@rgpv.ac.in",
    role: "student",
    college: "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal",
    branch: "Computer Science & Engineering",
    semester: "7th Semester",
    enrollmentNo: "0101CS221045",
    targetRole: "Full Stack Developer",
    avatar: "PS",
    createdAt: new Date().toISOString()
  },

  // Student readiness score document
  readinessScore: {
    uid: "std_priya_2026",
    overallScore: 78,
    technicalScore: 82,
    softSkillsScore: 74,
    domainScore: 70,
    verifiedBadges: [
      { name: "Python Core", verifiedBy: "NPTEL/Govt", date: "Aug 2025" },
      { name: "Database Fundamentals", verifiedBy: "MPOnline Skill India", date: "Sep 2025" },
      { name: "Git & Version Control", verifiedBy: "Campus Placement Cell", date: "Jul 2025" }
    ],
    updatedAt: new Date().toISOString()
  },

  // Target Roles & Skill Gap Matrix
  roleMatrix: {
    "Full Stack Developer": {
      acquiredSkills: [
        "JavaScript (ES6+)", "Python Core", "Database Fundamentals", "Git & GitHub", "REST APIs"
      ],
      missingSkills: [
        "Docker & Containerization", "CI/CD Pipelines", "System Design Basics", "Cloud Architecture (GCP)"
      ],
      phases: [
        {
          phase: "Phase 1",
          title: "Complete Python & SQL Advanced Certification",
          desc: "Target high-demand backend algorithms and database index optimization on Swayam/NPTEL portal.",
          status: "completed",
          link: "https://swayam.gov.in"
        },
        {
          phase: "Phase 2",
          title: "Practice AI Behavioral & System Mock Interview",
          desc: "Complete 2 voice-enabled scenario simulations in AI Mock Studio to improve your pace and clarity.",
          status: "in-progress",
          link: "#mock-studio"
        },
        {
          phase: "Phase 3",
          title: "Generate Verified Resume Badge & Placement Lock",
          desc: "Publish tamper-proof verifiable credentials directly to MPOnline Corporate Drive pool.",
          status: "pending",
          link: "#recruiter-drives"
        }
      ]
    },
    "Junior Data Analyst": {
      acquiredSkills: [
        "Python", "SQL Queries", "Excel / Sheets", "Statistical Analysis"
      ],
      missingSkills: [
        "PowerBI / Tableau", "BigQuery ETL", "A/B Testing Methodologies"
      ],
      phases: [
        {
          phase: "Phase 1",
          title: "Complete Advanced SQL & Data Viz Track",
          desc: "Swayam Data Analytics Fundamentals course module.",
          status: "completed",
          link: "https://swayam.gov.in"
        },
        {
          phase: "Phase 2",
          title: "Take Data Analyst Domain AI Mock Interview",
          desc: "Live practice on business intelligence scenarios & SQL whiteboard questions.",
          status: "pending",
          link: "#mock-studio"
        },
        {
          phase: "Phase 3",
          title: "Connect Portfolio to MP State IT Digital Drive",
          desc: "Auto-apply to state analytics and public data projects.",
          status: "pending",
          link: "#drives"
        }
      ]
    },
    "Quality Assurance Engineer": {
      acquiredSkills: [
        "Manual Testing", "Test Case Documentation", "Python Basics"
      ],
      missingSkills: [
        "Selenium / Cypress Automation", "API Testing (Postman)", "Load Testing"
      ],
      phases: [
        {
          phase: "Phase 1",
          title: "Automation Framework Fundamentals",
          desc: "End-to-end web test automation hands-on practice.",
          status: "in-progress",
          link: "https://swayam.gov.in"
        },
        {
          phase: "Phase 2",
          title: "Automated Testing Mock Assessment",
          desc: "Simulate corporate SDET technical panel questions.",
          status: "pending",
          link: "#mock-studio"
        },
        {
          phase: "Phase 3",
          title: "Apply for QA Specialist Openings",
          desc: "Apply with verified testing badges.",
          status: "pending",
          link: "#recruiter-drives"
        }
      ]
    }
  },

  // Mock interview question bank
  interviewQuestions: [
    {
      id: "q1",
      category: "Technical",
      question: "Can you explain the difference between synchronous and asynchronous execution in Node.js, and how the Event Loop handles I/O?",
      idealKeyPoints: ["Single threaded nature", "Call stack & Libuv threadpool", "Non-blocking event loop", "Promises and Microtask queue"]
    },
    {
      id: "q2",
      category: "Technical",
      question: "How do you optimize an SQL database query when a specific table contains over 2 million records?",
      idealKeyPoints: ["Indexing strategies (B-tree)", "EXPLAIN analyze execution plan", "Avoiding SELECT *", "Denormalization or partitioning"]
    },
    {
      id: "q3",
      category: "Scenario",
      question: "Tell me about a time when a project feature failed during production or final submission. How did you diagnose and remediate it?",
      idealKeyPoints: ["STAR method structure", "Clear ownership and composure", "Systematic root cause analysis", "Post-incident preventive measures"]
    }
  ],

  // Candidates for Corporate Recruiter Dashboard
  candidates: [
    {
      uid: "c1",
      name: "Priya Sharma",
      college: "RGPV Bhopal",
      branch: "Computer Science",
      location: "Bhopal, MP",
      overallScore: 78,
      techScore: 82,
      softScore: 74,
      interviewRating: 8.5,
      skills: ["React", "Node.js", "Python", "SQL"],
      avatar: "PS",
      status: "Available",
      verified: true
    },
    {
      uid: "c2",
      name: "Rahul Verma",
      college: "SGSITS Indore",
      branch: "Information Technology",
      location: "Indore, MP",
      overallScore: 86,
      techScore: 89,
      softScore: 83,
      interviewRating: 9.1,
      skills: ["Python", "Machine Learning", "FastAPI", "Docker"],
      avatar: "RV",
      status: "Shortlisted",
      verified: true
    },
    {
      uid: "c3",
      name: "Ananya Patel",
      college: "MANIT Bhopal",
      branch: "Electronics & Communication",
      location: "Bhopal, MP",
      overallScore: 83,
      techScore: 85,
      softScore: 81,
      interviewRating: 8.8,
      skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL"],
      avatar: "AP",
      status: "Available",
      verified: true
    },
    {
      uid: "c4",
      name: "Devendra Soni",
      college: "JEC Jabalpur",
      branch: "Computer Science",
      location: "Jabalpur, MP",
      overallScore: 72,
      techScore: 76,
      softScore: 68,
      interviewRating: 7.9,
      skills: ["HTML5", "CSS3", "JavaScript", "MongoDB"],
      avatar: "DS",
      status: "Available",
      verified: false
    },
    {
      uid: "c5",
      name: "Sanya Kothari",
      college: "DAVV Indore",
      branch: "Data Analytics / MCA",
      location: "Indore, MP",
      overallScore: 88,
      techScore: 91,
      softScore: 85,
      interviewRating: 9.3,
      skills: ["Data Analysis", "PowerBI", "Python", "BigQuery"],
      avatar: "SK",
      status: "Interview Scheduled",
      verified: true
    }
  ],

  // Live placement drives
  placementDrives: [
    {
      id: "drive_01",
      companyName: "Tata Consultancy Services (TCS)",
      role: "Graduate Systems Engineer",
      package: "₹4.5 - ₹7.0 LPA",
      minReadinessScore: 75,
      location: "Indore / Bhopal / Remote",
      deadline: "Oct 15, 2026",
      tags: ["Full Stack", "Problem Solving", "Cloud"]
    },
    {
      id: "drive_02",
      companyName: "MP State Electronics Development Corp (MPSeDC)",
      role: "Digital India Trainee Fellow",
      package: "₹5.2 LPA Stipend Track",
      minReadinessScore: 70,
      location: "Bhopal (Vallabh Bhawan / State IT Park)",
      deadline: "Oct 22, 2026",
      tags: ["Govt Tech", "Python", "Data Architecture"]
    },
    {
      id: "drive_03",
      companyName: "Infosys Campus Connect",
      role: "Associate Software Engineer",
      package: "₹4.2 - ₹6.5 LPA",
      minReadinessScore: 80,
      location: "Indore SEZ Campus",
      deadline: "Nov 02, 2026",
      tags: ["Java", "Spring Boot", "React"]
    }
  ]
};
