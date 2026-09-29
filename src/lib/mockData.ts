/**
 * CampusRise Flow - Global Seed Dataset & State Store
 * Powers all 12 dedicated pages with interconnected data
 */

export interface StudentProfile {
  name: string;
  rollNo: string;
  email: string;
  college: string;
  branch: string;
  gradYear: number;
  cgpa: number;
  activeBacklogs: number;
  tenthPct: number;
  twelfthPct: number;
  skills: string[];
  projects: Array<{ title: string; tech: string; desc: string; link?: string }>;
  internships: Array<{ company: string; role: string; duration: string; impact: string }>;
  certifications: string[];
  resumeUploaded: boolean;
  resumeFileName?: string;
  digiLocker?: DigiLockerAccount;
}

export interface DigiLockerDocument {
  id: string;
  name: string;
  category: "Academic" | "Identity" | "Statutory";
  issuer: string;
  docType: string;
  docNumber: string;
  dateIssued: string;
  verificationStatus: "VERIFIED" | "PENDING" | "SYNCING";
  digitalSignature: {
    signer: string;
    certSerial: string;
    timestamp: string;
    hash: string;
  };
  fileSize: string;
  summary: string;
  verifiedFields: Record<string, string>;
}

export interface DigiLockerAccount {
  isConnected: boolean;
  digiLockerId: string;
  linkedAadhaarMasked: string;
  apaarId: string;
  fullName: string;
  lastSyncedAt: string;
  verifiedCount: number;
  tamperProofSealId: string;
  documents: DigiLockerDocument[];
}

export interface CareerTarget {
  id: string;
  title: string;
  demand: "Very High" | "High" | "Moderate";
  avgSalary: string;
  description: string;
  benchmarks: {
    coreSkills: string[];
    minCgpa: number;
    recommendedCert: string;
  };
}

export interface CompanyDrive {
  id: string;
  companyName: string;
  logo: string;
  role: string;
  ctc: string;
  minCgpa: number;
  maxBacklogs: number;
  allowedBranches: string[];
  deadline: string;
  stage?: "Applied" | "Assessment" | "Shortlisted" | "Interview" | "Offer Letter";
  offerPackage?: string;
  offerLetterUrl?: string;
}

export interface AlumniMentor {
  id: string;
  name: string;
  avatar: string;
  currentCompany: string;
  role: string;
  batch: number;
  branch: string;
  expertise: string[];
  openForReferral: boolean;
  slotsAvailable: number;
}

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: "Priya Sharma",
  rollNo: "0101CS221045",
  email: "priya.sharma@rgpv.ac.in",
  college: "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)",
  branch: "Computer Science & Engineering",
  gradYear: 2026,
  cgpa: 8.42,
  activeBacklogs: 0,
  tenthPct: 91.4,
  twelfthPct: 88.6,
  skills: ["React.js", "TypeScript", "Node.js", "PostgreSQL", "Data Structures", "Tailwind CSS"],
  projects: [
    {
      title: "CampusRise ERP & Vault",
      tech: "Next.js, Prisma, PostgreSQL",
      desc: "Architected multi-role placement ERP with real-time NIRF data compliance."
    },
    {
      title: "Distributed Task Pipeline",
      tech: "Go, Redis, Docker",
      desc: "Built high-throughput message consumer handling 5,000 tasks/min."
    }
  ],
  internships: [
    {
      company: "MP Cloud Solutions",
      role: "Backend Engineering Intern",
      duration: "May 2025 - Aug 2025",
      impact: "Reduced API latency by 34% across 8 public citizen services."
    }
  ],
  certifications: [
    "AWS Certified Cloud Practitioner (2025)",
    "NPTEL Elite Certificate in Algorithms"
  ],
  resumeUploaded: true,
  resumeFileName: "Priya_Sharma_Resume_2026_Verified.pdf",
  digiLocker: {
    isConnected: true,
    digiLockerId: "DL-2026-RGPV-88219",
    linkedAadhaarMasked: "XXXX-XXXX-8421",
    apaarId: "APAAR-6291-0941-8812",
    fullName: "Priya Sharma",
    lastSyncedAt: "Today, 11:30 AM",
    verifiedCount: 5,
    tamperProofSealId: "DIGI-GOV-IN-7889102-RGPV",
    documents: [
      {
        id: "doc-1",
        name: "Class X Secondary School Certificate & Marksheet",
        category: "Academic",
        issuer: "Central Board of Secondary Education (CBSE)",
        docType: "10th_marksheet",
        docNumber: "CBSE/X/2020/7192841",
        dateIssued: "15 Jul 2020",
        verificationStatus: "VERIFIED",
        fileSize: "1.4 MB",
        summary: "Aggregate: 91.4% • Science (94), Mathematics (95), English (89)",
        verifiedFields: {
          "Board": "CBSE (New Delhi)",
          "Roll Number": "7192841",
          "Passing Year": "2020",
          "Aggregate Score": "91.4%",
          "Result Status": "PASS / FIRST DIVISION"
        },
        digitalSignature: {
          signer: "Controller of Examinations, CBSE",
          certSerial: "CBSE-CA-2020-09881",
          timestamp: "2020-07-15T10:14:02Z",
          hash: "SHA256: 9b2d8f1e72a44c9b0e21a8d43c22b918"
        }
      },
      {
        id: "doc-2",
        name: "Class XII Senior School Certificate & Marksheet",
        category: "Academic",
        issuer: "Central Board of Secondary Education (CBSE)",
        docType: "12th_marksheet",
        docNumber: "CBSE/XII/2022/8821903",
        dateIssued: "22 Jul 2022",
        verificationStatus: "VERIFIED",
        fileSize: "1.6 MB",
        summary: "Aggregate: 88.6% • Physics (88), Chemistry (86), Mathematics (92), CS (94)",
        verifiedFields: {
          "Board": "CBSE (New Delhi)",
          "Stream": "Science (PCM + Computer Science)",
          "Roll Number": "8821903",
          "Passing Year": "2022",
          "Aggregate Score": "88.6%"
        },
        digitalSignature: {
          signer: "Controller of Examinations, CBSE",
          certSerial: "CBSE-CA-2022-77192",
          timestamp: "2022-07-22T14:32:18Z",
          hash: "SHA256: c3e192a8b7d420f18c399b1a5e88d014"
        }
      },
      {
        id: "doc-3",
        name: "B.Tech Official Transcripts & Semester Grade Sheets (Sem 1-6)",
        category: "Academic",
        issuer: "Rajiv Gandhi Proudyogiki Vishwavidyalaya (NAD)",
        docType: "degree_transcript",
        docNumber: "RGPV/E-TR/2025/0101CS221045",
        dateIssued: "18 Jan 2026",
        verificationStatus: "VERIFIED",
        fileSize: "3.2 MB",
        summary: "Cumulative CGPA: 8.42 / 10.0 • 0 Active Backlogs • 142 Credits Earned",
        verifiedFields: {
          "University": "RGPV Bhopal (State Technical University)",
          "Enrollment / Roll No": "0101CS221045",
          "Branch": "Computer Science & Engineering",
          "Current CGPA": "8.42",
          "Active Backlogs": "0 (Zero)",
          "History of Arrears": "CLEAN"
        },
        digitalSignature: {
          signer: "Registrar / Examination Controller, RGPV",
          certSerial: "RGPV-PKI-2026-44102",
          timestamp: "2026-01-18T09:45:00Z",
          hash: "SHA256: 4a9f77e20b88c4d1192e44a90881bc33"
        }
      },
      {
        id: "doc-4",
        name: "Aadhaar Identity Verification (UIDAI e-Aadhaar)",
        category: "Identity",
        issuer: "Unique Identification Authority of India (UIDAI)",
        docType: "aadhaar",
        docNumber: "UIDAI/VERIFIED/8421",
        dateIssued: "10 Feb 2026",
        verificationStatus: "VERIFIED",
        fileSize: "890 KB",
        summary: "Identity & Biometric Authentication Token Verified • KYC Complete",
        verifiedFields: {
          "Full Name": "Priya Sharma",
          "Aadhaar Number": "XXXX-XXXX-8421",
          "DOB": "14/08/2004",
          "Gender": "Female",
          "Authentication Mode": "Aadhaar OTP + MeriPehchan Token"
        },
        digitalSignature: {
          signer: "e-Mudhra Sub-CA for UIDAI Government of India",
          certSerial: "UIDAI-DS-2026-11920",
          timestamp: "2026-02-10T08:12:45Z",
          hash: "SHA256: 77a0bc4419e288fa019488bc11099ade"
        }
      },
      {
        id: "doc-5",
        name: "APAAR / Academic Bank of Credits (ABC ID Card)",
        category: "Statutory",
        issuer: "National Academic Depository (Ministry of Education, GoI)",
        docType: "apaar_abc",
        docNumber: "APAAR-6291-0941-8812",
        dateIssued: "02 Jan 2026",
        verificationStatus: "VERIFIED",
        fileSize: "650 KB",
        summary: "142 Academic Credits Verified & Deposited in Central National Ledger",
        verifiedFields: {
          "APAAR ID": "APAAR-6291-0941-8812",
          "Total Credits Deposited": "142 Credits",
          "Eligible for Placement": "Yes (NEP 2020 Compliant)",
          "Institution": "RGPV University Bhopal"
        },
        digitalSignature: {
          signer: "National Academic Depository (NAD) Signing Authority",
          certSerial: "NAD-MOE-2026-00412",
          timestamp: "2026-01-02T11:20:10Z",
          hash: "SHA256: 12f488a09bc332e184aa990177df2301"
        }
      }
    ]
  }
};

export const CAREER_TARGETS: CareerTarget[] = [
  {
    id: "sde",
    title: "Software Development Engineer (SDE)",
    demand: "Very High",
    avgSalary: "₹8.5 - ₹16 LPA",
    description: "Build robust, scalable software architectures, algorithms, backend microservices, and frontends.",
    benchmarks: {
      coreSkills: ["Data Structures & Algorithms", "System Design", "Node.js / Java", "SQL / NoSQL", "Docker"],
      minCgpa: 7.5,
      recommendedCert: "AWS Certified Developer / Meta Full Stack"
    }
  },
  {
    id: "data-analyst",
    title: "Data Analyst & Business Intelligence",
    demand: "High",
    avgSalary: "₹6.5 - ₹12 LPA",
    description: "Transform big datasets into actionable business decisions using SQL, Python, PowerBI, and statistical modeling.",
    benchmarks: {
      coreSkills: ["Advanced SQL", "Python (Pandas, NumPy)", "Power BI / Tableau", "Statistics", "Data Warehousing"],
      minCgpa: 7.0,
      recommendedCert: "Google Data Analytics Professional"
    }
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Architect",
    demand: "Very High",
    avgSalary: "₹9.0 - ₹18 LPA",
    description: "Design automated CI/CD deployment pipelines, manage container orchestration with Kubernetes, and infrastructure as code.",
    benchmarks: {
      coreSkills: ["Linux CLI", "Kubernetes", "Terraform", "CI/CD (GitHub Actions)", "Cloud (AWS / GCP)"],
      minCgpa: 7.0,
      recommendedCert: "CKA (Certified Kubernetes Administrator)"
    }
  },
  {
    id: "core-embedded",
    title: "Core Electronics & Embedded Systems",
    demand: "Moderate",
    avgSalary: "₹5.5 - ₹10 LPA",
    description: "Design low-level microcontrollers, IoT devices, VLSI chips, and hardware firmware systems.",
    benchmarks: {
      coreSkills: ["Embedded C / C++", "Microcontrollers (STM32, ESP32)", "RTOS", "PCB Design", "Digital Signal Processing"],
      minCgpa: 7.2,
      recommendedCert: "ARM Accredited Engineer"
    }
  }
];

export const COMPANY_DRIVES: CompanyDrive[] = [
  {
    id: "drive-1",
    companyName: "Tata Consultancy Services (TCS)",
    logo: "TC",
    role: "Systems Engineer (Digital & Prime)",
    ctc: "₹7.2 - ₹9.5 LPA",
    minCgpa: 7.0,
    maxBacklogs: 0,
    allowedBranches: ["CSE", "IT", "ECE", "AI_DS"],
    deadline: "2026-10-15",
    stage: "Interview"
  },
  {
    id: "drive-2",
    companyName: "Infosys Special Economic Zone",
    logo: "IN",
    role: "Specialist Programmer (Power Programmer)",
    ctc: "₹9.5 LPA",
    minCgpa: 7.5,
    maxBacklogs: 0,
    allowedBranches: ["CSE", "IT"],
    deadline: "2026-10-22",
    stage: "Shortlisted"
  },
  {
    id: "drive-3",
    companyName: "Cisco Systems India",
    logo: "CS",
    role: "Technical Consulting Engineer",
    ctc: "₹14.8 LPA",
    minCgpa: 8.0,
    maxBacklogs: 0,
    allowedBranches: ["CSE", "IT", "ECE"],
    deadline: "2026-11-05",
    stage: "Assessment"
  },
  {
    id: "drive-4",
    companyName: "MP State Electronics Dev Corp (MPSeDC)",
    logo: "MP",
    role: "GovTech Digital Trainee Fellow",
    ctc: "₹6.0 LPA",
    minCgpa: 6.5,
    maxBacklogs: 1,
    allowedBranches: ["CSE", "IT", "ECE", "ME", "CE"],
    deadline: "2026-10-10",
    stage: "Offer Letter",
    offerPackage: "₹6.0 LPA",
    offerLetterUrl: "#"
  },
  {
    id: "drive-5",
    companyName: "Persistent Systems",
    logo: "PS",
    role: "Software Engineer - Product Cloud",
    ctc: "₹8.0 LPA",
    minCgpa: 7.2,
    maxBacklogs: 0,
    allowedBranches: ["CSE", "IT"],
    deadline: "2026-11-12",
    stage: "Applied"
  }
];

export const SIMULATION_MODULES = [
  {
    step: 1,
    id: "aptitude",
    title: "Aptitude Assessment",
    questionsCount: 20,
    timeMins: 25,
    completed: true,
    score: 85,
    desc: "Quantitative ability, Permutations & Combinations, Data Interpretation, and Logical Reasoning."
  },
  {
    step: 2,
    id: "technical",
    title: "Technical MCQs",
    questionsCount: 30,
    timeMins: 30,
    completed: true,
    score: 82,
    desc: "DSA, DBMS (SQL & Indexing), OS Concepts, Computer Networks, and Object-Oriented Design."
  },
  {
    step: 3,
    id: "psychometric",
    title: "Psychometric Evaluation",
    questionsCount: 15,
    timeMins: 15,
    completed: true,
    score: 90,
    desc: "Workplace ethics, situational judgement, leadership adaptability, and team collaboration."
  },
  {
    step: 4,
    id: "scenario",
    title: "Scenario-Based Problems",
    questionsCount: 3,
    timeMins: 20,
    completed: true,
    score: 78,
    desc: "System outage recovery, API scale bottlenecks, and deadline conflict management."
  },
  {
    step: 5,
    id: "gd",
    title: "Group Discussion Prep",
    questionsCount: 1,
    timeMins: 10,
    completed: true,
    score: 75,
    desc: "Topic: 'AI Regulation vs Innovation in India's Tech Ecosystem' - Speech fluency & point formulation."
  },
  {
    step: 6,
    id: "interview",
    title: "AI Mock Interview Terminal",
    questionsCount: 5,
    timeMins: 15,
    completed: true,
    score: 88,
    desc: "Full voice-enabled simulation with audio visualizer, confidence gauge, and speech pace tracking."
  }
];

export const READINESS_BREAKDOWN = {
  overallScore: 84, // Out of 100
  gaugeLevel: "Placement Ready",
  percentile: "Top 8% of Batch 2026",
  categories: [
    {
      name: "Technical Proficiency",
      weight: 35,
      score: 86,
      contribution: 30.1,
      reasoning: "Strong command in Algorithms and Relational SQL. Docker and Cloud deployment require strengthening."
    },
    {
      name: "Quantitative & Logic Aptitude",
      weight: 20,
      score: 85,
      contribution: 17.0,
      reasoning: "Excellent speed in data sufficiency and logical puzzles; scored in 92nd percentile."
    },
    {
      name: "Communication & GD",
      weight: 20,
      score: 76,
      contribution: 15.2,
      reasoning: "Clear articulation with good pace (135 WPM). Minor pauses observed during open-ended scenario debates."
    },
    {
      name: "Project Portfolio & Breadth",
      weight: 15,
      score: 88,
      contribution: 13.2,
      reasoning: "Live deployed Next.js ERP project demonstrates real enterprise architecture and production skill."
    },
    {
      name: "Resume & ATS Optimization",
      weight: 10,
      score: 85,
      contribution: 8.5,
      reasoning: "Well-quantified impact bullets with clean single-column structure and verified academic credentials."
    }
  ]
};

export const SKILL_GAP_ANALYSIS = {
  targetRole: "Software Development Engineer (SDE)",
  matchPercentage: 78,
  acquiredSkills: [
    { name: "Data Structures & Algorithms", level: "Advanced", source: "Campus Assessment" },
    { name: "TypeScript & React.js", level: "Advanced", source: "Portfolio Projects" },
    { name: "PostgreSQL & Database Indexing", level: "Intermediate", source: "Academic Course" },
    { name: "Node.js REST APIs", level: "Intermediate", source: "Internship" },
    { name: "Git & Version Control", level: "Proficient", source: "Hackathons" }
  ],
  missingRequirements: [
    {
      name: "Docker Containerization & Kubernetes",
      priority: "Critical",
      industryDemand: "92% of visiting SDE drives require container awareness",
      action: "Complete hands-on container build and compose lab"
    },
    {
      name: "System Design & Microservice Caching",
      priority: "Critical",
      industryDemand: "High-value packages (>10 LPA) test Redis, CDN, & Load Balancing",
      action: "Review distributed architectural patterns module"
    },
    {
      name: "CI/CD Automation (GitHub Actions)",
      priority: "Recommended",
      industryDemand: "DevOps practices requested by product companies",
      action: "Configure test and deploy pipeline on GitHub"
    },
    {
      name: "Cloud Basics (AWS / GCP)",
      priority: "Good to have",
      industryDemand: "Beneficial for cloud consultant and digital roles",
      action: "Claim AWS Academy student voucher"
    }
  ]
};

export const ROADMAP_PLAYLIST = [
  {
    phase: "1. Learn (Foundation)",
    tasks: [
      { id: "t1", title: "Docker Deep-Dive for Developers", duration: "3 hrs", completed: true, tag: "Video Course" },
      { id: "t2", title: "System Design Primer: Caching & Rate Limiting", duration: "2.5 hrs", completed: true, tag: "Reading" },
      { id: "t3", title: "PostgreSQL Query Optimization & EXPLAIN ANALYZE", duration: "2 hrs", completed: false, tag: "Interactive Lab" }
    ]
  },
  {
    phase: "2. Practice (Hands-on)",
    tasks: [
      { id: "t4", title: "Dockerize CampusRise Full-Stack Application", duration: "2 hrs", completed: false, tag: "Project Task" },
      { id: "t5", title: "Solve 10 Dynamic Programming LeetCode Mediums", duration: "4 hrs", completed: true, tag: "Coding" },
      { id: "t6", title: "Implement Redis Cache in Node.js Microservice", duration: "2 hrs", completed: false, tag: "Project Task" }
    ]
  },
  {
    phase: "3. Test (Verification)",
    tasks: [
      { id: "t7", title: "Take 30-min SDE Adaptive Mock Assessment", duration: "30 mins", completed: false, tag: "Timed Exam" },
      { id: "t8", title: "Verify Cloud Credentials via Swayam / AWS Portal", duration: "15 mins", completed: true, tag: "Verification" }
    ]
  },
  {
    phase: "4. Interview (Simulation)",
    tasks: [
      { id: "t9", title: "AI Voice Mock Interview: Senior Tech Lead Panel", duration: "20 mins", completed: false, tag: "AI Studio" },
      { id: "t10", title: "Peer Group Discussion Practice Session", duration: "30 mins", completed: false, tag: "Live Room" }
    ]
  }
];

export const REASSESSMENT_HISTORY = [
  { attempt: "Initial Diagnostic (Aug 10)", score: 64, tech: 60, apt: 65, comm: 68, notes: "Baseline check before structured training" },
  { attempt: "Mid-Term Simulation (Sep 02)", score: 76, tech: 75, apt: 78, comm: 72, notes: "After completing SQL & DSA bootcamp" },
  { attempt: "Pre-Placement Final (Sep 28)", score: 87, tech: 89, apt: 86, comm: 84, notes: "After AI Mock Interview & Project Refactor" }
];

export const ALUMNI_MENTORS: AlumniMentor[] = [
  {
    id: "m1",
    name: "Aditya Khare",
    avatar: "AK",
    currentCompany: "Microsoft India",
    role: "Software Engineer II",
    batch: 2023,
    branch: "Computer Science",
    expertise: ["System Design", "Cloud Infrastructure", "Campus to Corp Transition"],
    openForReferral: true,
    slotsAvailable: 3
  },
  {
    id: "m2",
    name: "Sneha Mukherjee",
    avatar: "SM",
    currentCompany: "Amazon AWS",
    role: "Solutions Architect",
    batch: 2022,
    branch: "Information Technology",
    expertise: ["AWS Architecture", "Behavioral Leadership Principles", "Resume Polish"],
    openForReferral: true,
    slotsAvailable: 2
  },
  {
    id: "m3",
    name: "Rohan Agrawal",
    avatar: "RA",
    currentCompany: "Goldman Sachs",
    role: "Analyst - Financial Engineering",
    batch: 2024,
    branch: "Electronics & Communication",
    expertise: ["FinTech", "Quantitative Algorithms", "Aptitude Round Mastery"],
    openForReferral: false,
    slotsAvailable: 1
  }
];

export const TPO_ANALYTICS = {
  totalRegisteredStudents: 480,
  verifiedProfiles: 442,
  placedStudents: 298,
  placementPercentage: 62.1,
  highestPackage: "₹24.0 LPA",
  avgPackage: "₹7.8 LPA",
  activeDrivesCount: 14,
  branchBreakdown: [
    { branch: "Computer Science", total: 180, placed: 135, pct: 75.0, avgCgpa: 8.1 },
    { branch: "Information Technology", total: 120, placed: 84, pct: 70.0, avgCgpa: 7.9 },
    { branch: "Electronics & Comm", total: 100, placed: 52, pct: 52.0, avgCgpa: 7.6 },
    { branch: "Mechanical Engineering", total: 80, placed: 27, pct: 33.7, avgCgpa: 7.2 }
  ],
  recentStudents: [
    { roll: "0101CS221045", name: "Priya Sharma", branch: "CSE", cgpa: 8.42, backlogs: 0, readiness: 84, status: "Eligible (1 Offer)", verified: true },
    { roll: "0101CS221088", name: "Rahul Verma", branch: "CSE", cgpa: 8.89, backlogs: 0, readiness: 91, status: "Placed (TCS Digital)", verified: true },
    { roll: "0101IT221012", name: "Ananya Patel", branch: "IT", cgpa: 7.95, backlogs: 0, readiness: 82, status: "Shortlisted", verified: true },
    { roll: "0101EC221034", name: "Devendra Soni", branch: "ECE", cgpa: 6.84, backlogs: 1, readiness: 68, status: "Backlog Restriction", verified: false },
    { roll: "0101CS221102", name: "Sanya Kothari", branch: "CSE", cgpa: 9.15, backlogs: 0, readiness: 94, status: "Placed (Infosys Power)", verified: true }
  ]
};
