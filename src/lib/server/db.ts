import fs from "fs";
import path from "path";
import {
  INITIAL_STUDENT_PROFILE,
  CAREER_TARGETS,
  COMPANY_DRIVES,
  SIMULATION_MODULES,
  READINESS_BREAKDOWN,
  SKILL_GAP_ANALYSIS,
  ROADMAP_PLAYLIST,
  REASSESSMENT_HISTORY,
  ALUMNI_MENTORS,
  TPO_ANALYTICS,
  StudentProfile,
  DigiLockerAccount,
  CareerTarget,
  CompanyDrive,
  AlumniMentor,
} from "../mockData";
import { checkBranchMatch } from "../eligibility";

// ----------------------------------------------------
// MODELS & INTERFACES
// ----------------------------------------------------

export type Role = "STUDENT" | "TPO" | "COMPANY" | "ALUMNI";

export interface UserAccount {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  designationOrBranch: string;
  collegeOrCompany: string;
  avatar: string;
  createdAt: string;
}

export interface ApplicationRecord {
  id: string;
  driveId: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  appliedAt: string;
  status: "APPLIED" | "SHORTLISTED" | "INTERVIEW" | "SELECTED" | "REJECTED";
  matchScore: number;
  notes?: string;
}

export interface InterviewSubmission {
  id: string;
  targetRole: string;
  question: string;
  answerText: string;
  rating: number; // 0 - 10
  scores: {
    technical: number;
    communication: number;
    problemSolving: number;
  };
  feedback: string;
  speechMetrics?: {
    wpm: number;
    confidence: number;
    clarity: number;
  };
  submittedAt: string;
}

export interface AssessmentAttempt {
  id: string;
  phaseStep: number;
  phaseId: string;
  title: string;
  score: number; // 0 - 100
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  completedAt: string;
  details?: Record<string, any>;
}

export interface MentorshipBooking {
  id: string;
  alumniId: string;
  alumniName: string;
  studentName: string;
  studentRoll: string;
  date: string;
  topic: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "REJECTED";
  createdAt: string;
  notes?: string;
}

export interface ReferralRequest {
  id: string;
  alumniId: string;
  alumniName: string;
  companyName: string;
  studentName: string;
  studentRoll: string;
  note: string;
  status: "REQUESTED" | "REVIEWED" | "REFERRED" | "REJECTED";
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  category: "DSA" | "DBMS" | "Aptitude" | "System Design" | "Psychometric" | "Networks";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PlatformNotification {
  id: string;
  recipientRole: Role | "ALL";
  title: string;
  message: string;
  category: "DRIVE" | "ASSESSMENT" | "MENTORSHIP" | "VERIFICATION" | "OFFER" | "SYSTEM";
  read: boolean;
  link?: string;
  timestamp: string;
}

export interface GovernmentOpportunity {
  id: string;
  organization: string;
  title: string;
  cadre: string;
  vacancies: number;
  minCgpa: number;
  allowedBranches: string[];
  ageLimit: string;
  examPattern: string;
  syllabus: string;
  deadline: string;
  officialNotificationUrl: string;
  applicationMode: "Direct Online Portal" | "GATE Score Based" | "UPSC CSE/ESE" | "State Exam";
}

export interface StudentListItem {
  roll: string;
  name: string;
  branch: string;
  cgpa: number;
  backlogs: number;
  readiness: number;
  status: string;
  verified: boolean;
  email: string;
  targetRole: string;
}

export interface DatabaseState {
  users: UserAccount[];
  activeStudentProfile: StudentProfile;
  activeCareerTargetId: string;
  studentsList: StudentListItem[];
  drives: CompanyDrive[];
  governmentOpportunities: GovernmentOpportunity[];
  applications: ApplicationRecord[];
  assessments: AssessmentAttempt[];
  simulationModules: typeof SIMULATION_MODULES;
  interviews: InterviewSubmission[];
  mentorships: MentorshipBooking[];
  referrals: ReferralRequest[];
  alumniMentors: AlumniMentor[];
  reassessmentQuestions: QuizQuestion[];
  reassessmentHistory: typeof REASSESSMENT_HISTORY;
  tpoVerifications: Array<{
    id: string;
    studentName: string;
    rollNo: string;
    docType: string;
    status: "VERIFIED" | "PENDING" | "REJECTED";
    updatedAt: string;
  }>;
  notifications: PlatformNotification[];
  roadmapPlaylists: Record<string, typeof ROADMAP_PLAYLIST>;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "campusrise_db.json");

// ----------------------------------------------------
// DEFAULT SEED DATA GENERATORS
// ----------------------------------------------------

const DEFAULT_USERS: UserAccount[] = [
  {
    id: "usr-student-1",
    email: "priya.sharma@rgpv.ac.in",
    password: "student123",
    name: "Priya Sharma",
    role: "STUDENT",
    designationOrBranch: "Computer Science & Engineering",
    collegeOrCompany: "RGPV State Technical University",
    avatar: "PS",
    createdAt: new Date("2026-01-10").toISOString(),
  },
  {
    id: "usr-tpo-1",
    email: "tpo.director@rgpv.ac.in",
    password: "admin123",
    name: "Dr. Alok Verma",
    role: "TPO",
    designationOrBranch: "Head Training & Placement Officer",
    collegeOrCompany: "RGPV University Campus",
    avatar: "AV",
    createdAt: new Date("2025-11-01").toISOString(),
  },
  {
    id: "usr-company-1",
    email: "recruiter@tcs.com",
    password: "company123",
    name: "Vikram Malhotra",
    role: "COMPANY",
    designationOrBranch: "Lead Campus Recruiter",
    collegeOrCompany: "Tata Consultancy Services",
    avatar: "VM",
    createdAt: new Date("2025-12-05").toISOString(),
  },
  {
    id: "usr-alumni-1",
    email: "aman.gupta@google.com",
    password: "alumni123",
    name: "Aditya Khare",
    role: "ALUMNI",
    designationOrBranch: "Software Engineer II",
    collegeOrCompany: "Microsoft India (2023 Batch)",
    avatar: "AK",
    createdAt: new Date("2026-01-02").toISOString(),
  },
];

const DEFAULT_STUDENTS_LIST: StudentListItem[] = [
  { roll: "0101CS221045", name: "Priya Sharma", branch: "CSE", cgpa: 8.42, backlogs: 0, readiness: 84, status: "Eligible (1 Offer)", verified: true, email: "priya.sharma@rgpv.ac.in", targetRole: "Software Development Engineer (SDE)" },
  { roll: "0101CS221088", name: "Rahul Verma", branch: "CSE", cgpa: 8.89, backlogs: 0, readiness: 91, status: "Placed (TCS Digital)", verified: true, email: "rahul.v@rgpv.ac.in", targetRole: "Software Development Engineer (SDE)" },
  { roll: "0101IT221012", name: "Ananya Patel", branch: "IT", cgpa: 7.95, backlogs: 0, readiness: 82, status: "Shortlisted (Infosys)", verified: true, email: "ananya.p@rgpv.ac.in", targetRole: "Data Analyst & Business Intelligence" },
  { roll: "0101EC221034", name: "Devendra Soni", branch: "ECE", cgpa: 6.84, backlogs: 1, readiness: 68, status: "Backlog Restriction (Intervention Needed)", verified: false, email: "devendra.s@rgpv.ac.in", targetRole: "Cyber Security & Embedded Systems" },
  { roll: "0101CS221102", name: "Sanya Kothari", branch: "CSE", cgpa: 9.15, backlogs: 0, readiness: 94, status: "Placed (Infosys Power)", verified: true, email: "sanya.k@rgpv.ac.in", targetRole: "Software Development Engineer (SDE)" },
  { roll: "0101IT221067", name: "Manish Tiwari", branch: "IT", cgpa: 7.45, backlogs: 0, readiness: 76, status: "Assessment Cleared", verified: true, email: "manish.t@rgpv.ac.in", targetRole: "Cloud & DevOps Architect (SRE)" },
  { roll: "0101ME221019", name: "Rajesh Kumar", branch: "ME", cgpa: 7.20, backlogs: 0, readiness: 65, status: "Seeking Core IT Bridge", verified: true, email: "rajesh.k@rgpv.ac.in", targetRole: "Software Development Engineer (SDE)" },
  { roll: "0101EC221078", name: "Megha Chouhan", branch: "ECE", cgpa: 8.35, backlogs: 0, readiness: 85, status: "Shortlisted (Cisco Systems)", verified: true, email: "megha.c@rgpv.ac.in", targetRole: "Cyber Security & Embedded Systems" },
  { roll: "0101CS221015", name: "Arjun Nambiar", branch: "CSE", cgpa: 8.62, backlogs: 0, readiness: 89, status: "Interview Scheduled (Persistent)", verified: true, email: "arjun.n@rgpv.ac.in", targetRole: "Cloud & DevOps Architect (SRE)" },
  { roll: "0101CE221008", name: "Vikram Bundela", branch: "CE", cgpa: 6.40, backlogs: 2, readiness: 54, status: "Intervention Needed (Aptitude & Backlog)", verified: false, email: "vikram.b@rgpv.ac.in", targetRole: "Government & Public Sector Engineering" },
  { roll: "0101CS221130", name: "Ritika Sen", branch: "CSE", cgpa: 8.78, backlogs: 0, readiness: 90, status: "Placed (MPSeDC)", verified: true, email: "ritika.s@rgpv.ac.in", targetRole: "Data Analyst & Business Intelligence" },
  { roll: "0101IT221095", name: "Mohit Jain", branch: "IT", cgpa: 7.82, backlogs: 0, readiness: 79, status: "In Drive Pipeline", verified: true, email: "mohit.j@rgpv.ac.in", targetRole: "Software Development Engineer (SDE)" },
  { roll: "0101EC221041", name: "Pooja Trivedi", branch: "ECE", cgpa: 7.60, backlogs: 0, readiness: 77, status: "Eligible for Dream", verified: true, email: "pooja.t@rgpv.ac.in", targetRole: "Cyber Security & Embedded Systems" },
  { roll: "0101ME221055", name: "Sunil Rathore", branch: "ME", cgpa: 6.90, backlogs: 1, readiness: 61, status: "Intervention Needed (Skill Gap)", verified: false, email: "sunil.r@rgpv.ac.in", targetRole: "Government & Public Sector Engineering" },
  { roll: "0101CS221060", name: "Kunal Bansal", branch: "CSE", cgpa: 8.92, backlogs: 0, readiness: 92, status: "Placed (Cisco Systems)", verified: true, email: "kunal.b@rgpv.ac.in", targetRole: "Software Development Engineer (SDE)" },
];

const DEFAULT_GOVERNMENT_OPPORTUNITIES: GovernmentOpportunity[] = [
  {
    id: "govt-isro-2026",
    organization: "Indian Space Research Organisation (ISRO)",
    title: "Scientist/Engineer 'SC' Recruitment 2026",
    cadre: "Group 'A' Gazetted / Level 10 Pay Matrix",
    vacancies: 68,
    minCgpa: 6.84, // 65% or 6.84 CGPA minimum
    allowedBranches: ["CSE", "ECE", "ME"],
    ageLimit: "Max 28 Years (Relaxable for OBC/SC/ST)",
    examPattern: "80 Multiple Choice Technical Questions (75 mins) + Comprehensive Interview",
    syllabus: "Core Engineering Fundamentals, Discrete Mathematics, Data Structures, Computer Architecture, Digital Logic",
    deadline: "2026-11-18",
    officialNotificationUrl: "https://www.isro.gov.in/careers",
    applicationMode: "Direct Online Portal",
  },
  {
    id: "govt-nic-2026",
    organization: "National Informatics Centre (NIC)",
    title: "Scientist-B / Scientific Officer (Cyber & Cloud)",
    cadre: "Ministry of Electronics and Information Technology (MeitY)",
    vacancies: 142,
    minCgpa: 6.5,
    allowedBranches: ["CSE", "IT", "ECE"],
    ageLimit: "Max 30 Years",
    examPattern: "Written Exam (65% Tech + 35% Generic Aptitude) followed by Technical Interview",
    syllabus: "Algorithms, Database Systems, Computer Networks, Operating Systems, Web Technologies, Cyber Security",
    deadline: "2026-10-30",
    officialNotificationUrl: "https://recruitment.nic.in",
    applicationMode: "Direct Online Portal",
  },
  {
    id: "govt-gate-psu-2026",
    organization: "Public Sector Undertakings (ONGC / BHEL / IOCL / NTPC)",
    title: "Executive Trainee / Graduate Engineer Trainee via GATE",
    cadre: "Maharatna & Navratna Public Enterprise",
    vacancies: 350,
    minCgpa: 6.5,
    allowedBranches: ["CSE", "IT", "ECE", "ME", "CE"],
    ageLimit: "Max 26-28 Years",
    examPattern: "Valid GATE Score (85% weightage) + Group Discussion / Personal Interview (15%)",
    syllabus: "Official National GATE Syllabus for CS / EC / ME / CE",
    deadline: "2026-12-05",
    officialNotificationUrl: "https://gate2026.iit.ac.in",
    applicationMode: "GATE Score Based",
  },
  {
    id: "govt-upsc-ese-2026",
    organization: "Union Public Service Commission (UPSC)",
    title: "Indian Engineering Services (IES / ESE Examination)",
    cadre: "Central Engineering Services (Railways, Defense, Telecom)",
    vacancies: 220,
    minCgpa: 6.0,
    allowedBranches: ["ECE", "ME", "CE"],
    ageLimit: "21 to 30 Years",
    examPattern: "Preliminary (Objective) + Mains (Conventional Technical) + Personality Test",
    syllabus: "General Studies & Engineering Aptitude + Branch-Specific Deep Technical Papers",
    deadline: "2026-10-25",
    officialNotificationUrl: "https://upsc.gov.in",
    applicationMode: "UPSC CSE/ESE",
  },
  {
    id: "govt-barc-2026",
    organization: "Bhabha Atomic Research Centre (BARC)",
    title: "Scientific Officer (OCES / DGFS Training Scheme)",
    cadre: "Department of Atomic Energy (DAE)",
    vacancies: 95,
    minCgpa: 6.0,
    allowedBranches: ["CSE", "ECE", "ME"],
    ageLimit: "Max 26 Years",
    examPattern: "Online Screening Test or GATE score cutoff + Rigorous 60-minute Technical Board Interview",
    syllabus: "Core Discipline In-Depth Knowledge, Analytical Derivations & First-Principle Reasoning",
    deadline: "2026-11-10",
    officialNotificationUrl: "https://barcoces.gov.in",
    applicationMode: "Direct Online Portal",
  },
  {
    id: "govt-mpsedc-2026",
    organization: "MPSeDC (Govt of Madhya Pradesh)",
    title: "State IT Innovation & AI Fellowship 2026",
    cadre: "State e-Governance / Dept of Science & Technology",
    vacancies: 25,
    minCgpa: 7.0,
    allowedBranches: ["CSE", "IT", "ECE"],
    ageLimit: "Max 27 Years",
    examPattern: "Technical Aptitude & Hackathon Problem Solution Evaluation + Interview",
    syllabus: "Cloud Architecture, Full Stack Web Development, API Security, AI Citizen Delivery Systems",
    deadline: "2026-11-25",
    officialNotificationUrl: "https://mpsedc.mp.gov.in/careers",
    applicationMode: "State Exam",
  },
  {
    id: "govt-dic-2026",
    organization: "Digital India Corporation (DIC / MeitY)",
    title: "AI Mission Graduate Technical Associate",
    cadre: "Ministry of Electronics & Information Technology",
    vacancies: 40,
    minCgpa: 7.2,
    allowedBranches: ["CSE", "IT", "ECE"],
    ageLimit: "Max 28 Years",
    examPattern: "National Online Coding Challenge + AI Engineering Panel Interview",
    syllabus: "Machine Learning, Python/Node Stack, Microservices, Open Government Data Standards",
    deadline: "2026-12-15",
    officialNotificationUrl: "https://dic.gov.in/vacancies",
    applicationMode: "Direct Online Portal",
  },
];

const DEFAULT_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    category: "DSA",
    question: "What is the worst-case time complexity of QuickSort with standard median-of-three pivot selection?",
    options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
    correctIndex: 1,
    explanation: "QuickSort worst-case remains O(n^2) when sub-arrays are consistently partitioned into size 0 and n-1, though its average performance is O(n log n).",
  },
  {
    id: "q2",
    category: "DBMS",
    question: "Which isolation level in ACID transactions eliminates Phantom Reads completely?",
    options: ["Read Committed", "Repeatable Read", "Serializable", "Read Uncommitted"],
    correctIndex: 2,
    explanation: "Serializable is the highest isolation level and uses range locks (or serialization graph checking) to eliminate phantom reads.",
  },
  {
    id: "q3",
    category: "System Design",
    question: "Which database type is best suited for social network relationship traversal and recommendation engines?",
    options: ["Document DB (MongoDB)", "Graph DB (Neo4j)", "Key-Value Store (Redis)", "Columnar DB (Cassandra)"],
    correctIndex: 1,
    explanation: "Graph databases excel at navigating multi-hop entity relationships with constant time edge traversals.",
  },
  {
    id: "q4",
    category: "Aptitude",
    question: "A train running at 54 km/hr crosses a platform in 20 seconds. If the length of the train is 120m, what is the length of the platform?",
    options: ["180m", "150m", "200m", "220m"],
    correctIndex: 0,
    explanation: "Speed in m/s = 54 * (5/18) = 15 m/s. Total distance in 20s = 15 * 20 = 300m. Platform length = 300 - 120 = 180m.",
  },
  {
    id: "q5",
    category: "DSA",
    question: "Which data structure operates on the LIFO (Last In First Out) principle and manages nested function execution frames?",
    options: ["Queue", "Stack", "Binary Heap", "Circular Buffer"],
    correctIndex: 1,
    explanation: "Call stacks operate on LIFO ordering, pushing stack frames on invocation and popping on return.",
  },
  {
    id: "q6",
    category: "Networks",
    question: "In the TCP 3-way handshake, what flags are set in the second packet transmitted by the server?",
    options: ["SYN only", "SYN-ACK", "ACK only", "FIN-ACK"],
    correctIndex: 1,
    explanation: "The server responds to the client's SYN packet with a SYN-ACK packet to synchronize sequence numbers and acknowledge client's SYN.",
  },
  {
    id: "q7",
    category: "Psychometric",
    question: "You discover a high-severity bug in production 3 hours before an executive demo. What is the most professional initial response?",
    options: [
      "Hide the bug and proceed hoping the stakeholder won't trigger that path",
      "Immediately alert engineering lead with bug reproduction, risk impact, and a draft hotfix PR",
      "Publicly assign blame to the junior teammate who committed the code",
      "Cancel the demo without consulting the product team"
    ],
    correctIndex: 1,
    explanation: "Proactive communication paired with an actionable solution exhibits high accountability and calm crisis management.",
  },
];

const DEFAULT_NOTIFICATIONS: PlatformNotification[] = [
  {
    id: "notif-1",
    recipientRole: "ALL",
    title: "New Placement Drive Announced: Cisco Systems",
    message: "Cisco Systems India has opened applications for Technical Consulting Engineer (₹14.8 LPA). Cutoff: 8.0 CGPA.",
    category: "DRIVE",
    read: false,
    link: "/student/placements",
    timestamp: "10 mins ago",
  },
  {
    id: "notif-2",
    recipientRole: "STUDENT",
    title: "DigiLocker Verification Sealed",
    message: "Your Class X, Class XII, and B.Tech Grade Sheets are cryptographically stamped with SHA-256.",
    category: "VERIFICATION",
    read: false,
    link: "/student/profile",
    timestamp: "2 hours ago",
  },
  {
    id: "notif-3",
    recipientRole: "STUDENT",
    title: "TCS Application Shortlisted",
    message: "Congratulations! Your profile has been advanced to Technical Interview Round for Systems Engineer.",
    category: "OFFER",
    read: true,
    link: "/student/placements",
    timestamp: "1 day ago",
  },
  {
    id: "notif-4",
    recipientRole: "TPO",
    title: "Statutory NIRF Export Ready",
    message: "2026 Batch placement percentage has surpassed 62.1%. Statutory CSV export is available.",
    category: "SYSTEM",
    read: false,
    link: "/tpo/dashboard",
    timestamp: "3 hours ago",
  },
];

function getInitialState(): DatabaseState {
  return {
    users: DEFAULT_USERS,
    activeStudentProfile: INITIAL_STUDENT_PROFILE,
    activeCareerTargetId: "sde",
    studentsList: DEFAULT_STUDENTS_LIST,
    drives: COMPANY_DRIVES,
    governmentOpportunities: DEFAULT_GOVERNMENT_OPPORTUNITIES,
    applications: [
      {
        id: "app-1",
        driveId: "drive-1",
        studentId: "0101CS221045",
        studentName: "Priya Sharma",
        rollNo: "0101CS221045",
        appliedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
        status: "INTERVIEW",
        matchScore: 88,
        notes: "Technical Interview Round Scheduled for Friday",
      },
      {
        id: "app-2",
        driveId: "drive-2",
        studentId: "0101CS221045",
        studentName: "Priya Sharma",
        rollNo: "0101CS221045",
        appliedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: "SHORTLISTED",
        matchScore: 92,
        notes: "Online Coding Test Cleared with 95% Score",
      },
    ],
    assessments: [
      {
        id: "asm-1",
        phaseStep: 1,
        phaseId: "aptitude",
        title: "Aptitude Assessment",
        score: 85,
        totalQuestions: 20,
        correctAnswers: 17,
        timeSpentSeconds: 1240,
        completedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      {
        id: "asm-2",
        phaseStep: 2,
        phaseId: "technical",
        title: "Technical Core MCQs",
        score: 82,
        totalQuestions: 30,
        correctAnswers: 25,
        timeSpentSeconds: 1680,
        completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: "asm-3",
        phaseStep: 6,
        phaseId: "interview",
        title: "AI Voice Interview Terminal",
        score: 88,
        totalQuestions: 5,
        correctAnswers: 5,
        timeSpentSeconds: 900,
        completedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    ],
    simulationModules: SIMULATION_MODULES,
    interviews: [
      {
        id: "iv-seed-1",
        targetRole: "Full Stack SDE",
        question: "Explain how you would design a cache eviction policy in an in-memory datastore under heavy write workloads. When would you choose LFU over LRU?",
        answerText: "In write-heavy distributed systems, LRU uses a doubly-linked list with hash map, which can encounter lock contention under concurrent writes. LFU tracks access frequencies across historical windows, which makes it ideal for caching long-tail assets.",
        rating: 8.8,
        scores: { technical: 90, communication: 86, problemSolving: 88 },
        feedback: "Exceptional structural clarity. Demonstrated solid understanding of concurrency bottlenecks and cache eviction trade-offs.",
        speechMetrics: { wpm: 135, confidence: 88, clarity: 85 },
        submittedAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
    mentorships: [
      {
        id: "ment-1",
        alumniId: "m1",
        alumniName: "Aditya Khare",
        studentName: "Priya Sharma",
        studentRoll: "0101CS221045",
        date: "Saturday, 5:00 PM IST",
        topic: "Technical Mock Interview & Microsoft Campus Hiring Strategy",
        status: "CONFIRMED",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        notes: "Focus on Graph algorithms and Distributed Systems design.",
      },
    ],
    referrals: [
      {
        id: "ref-1",
        alumniId: "m2",
        alumniName: "Sneha Mukherjee",
        companyName: "Amazon AWS",
        studentName: "Priya Sharma",
        studentRoll: "0101CS221045",
        note: "Applying for 2026 Cloud Solutions Associate roles.",
        status: "REVIEWED",
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ],
    alumniMentors: ALUMNI_MENTORS,
    reassessmentQuestions: DEFAULT_QUIZ_QUESTIONS,
    reassessmentHistory: REASSESSMENT_HISTORY,
    tpoVerifications: [
      {
        id: "ver-1",
        studentName: "Priya Sharma",
        rollNo: "0101CS221045",
        docType: "B.Tech Marksheet Sem-6 (8.42 CGPA)",
        status: "VERIFIED",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "ver-2",
        studentName: "Priya Sharma",
        rollNo: "0101CS221045",
        docType: "AWS Cloud Practitioner Certificate",
        status: "VERIFIED",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "ver-3",
        studentName: "Devendra Soni",
        rollNo: "0101EC221034",
        docType: "Medical Arrears Exemption Application",
        status: "PENDING",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "ver-4",
        studentName: "Vikram Bundela",
        rollNo: "0101CE221008",
        docType: "Sem-5 Re-evaluation Marksheet",
        status: "PENDING",
        updatedAt: new Date().toISOString(),
      },
    ],
    notifications: DEFAULT_NOTIFICATIONS,
    roadmapPlaylists: {
      sde: ROADMAP_PLAYLIST,
    },
  };
}

let memoryDb: DatabaseState | null = null;

function loadDb(): DatabaseState {
  if (memoryDb) return memoryDb;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      memoryDb = JSON.parse(content);
      if (!memoryDb?.governmentOpportunities || memoryDb.governmentOpportunities.length === 0) {
        memoryDb!.governmentOpportunities = DEFAULT_GOVERNMENT_OPPORTUNITIES;
        saveDb(memoryDb!);
      }
      return memoryDb!;
    }
  } catch (err) {
    console.error("Error reading campusrise_db.json, using fallback initial state:", err);
  }

  memoryDb = getInitialState();
  saveDb(memoryDb);
  return memoryDb;
}

function saveDb(data: DatabaseState): void {
  memoryDb = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write campusrise_db.json:", err);
  }
}

// ----------------------------------------------------
// EXPORTED DATA ACCESS METHODS
// ----------------------------------------------------

export const serverDb = {
  // Authentication & Session
  authenticateUser(email: string, password: string): UserAccount | null {
    const db = loadDb();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );
    return user || null;
  },

  registerUser(data: Omit<UserAccount, "id" | "createdAt" | "avatar">): { success: boolean; user?: UserAccount; message?: string } {
    const db = loadDb();
    const existing = db.users.find((u) => u.email.toLowerCase() === data.email.toLowerCase().trim());
    if (existing) {
      return { success: false, message: "A user with this email address already exists." };
    }

    const initials = data.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const newUser: UserAccount = {
      ...data,
      id: `usr-${Date.now()}`,
      avatar: initials || "CR",
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);

    // If new student, also register in student table
    if (newUser.role === "STUDENT") {
      db.studentsList.unshift({
        roll: `0101CS22${Math.floor(1000 + Math.random() * 9000)}`,
        name: newUser.name,
        branch: newUser.designationOrBranch || "CSE",
        cgpa: 8.0,
        backlogs: 0,
        readiness: 75,
        status: "Newly Registered",
        verified: false,
        email: newUser.email,
        targetRole: "Software Development Engineer (SDE)",
      });
    }

    saveDb(db);
    return { success: true, user: newUser };
  },

  getUserByEmail(email: string): UserAccount | null {
    const db = loadDb();
    return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  },

  // Student Profile
  getStudentProfile(): StudentProfile {
    const db = loadDb();
    return db.activeStudentProfile;
  },

  updateStudentProfile(updates: Partial<StudentProfile>): StudentProfile {
    const db = loadDb();
    db.activeStudentProfile = {
      ...db.activeStudentProfile,
      ...updates,
    };

    // Update in studentsList too
    const item = db.studentsList.find((s) => s.email === db.activeStudentProfile.email || s.roll === db.activeStudentProfile.rollNo);
    if (item) {
      if (updates.name) item.name = updates.name;
      if (updates.cgpa !== undefined) item.cgpa = updates.cgpa;
      if (updates.activeBacklogs !== undefined) item.backlogs = updates.activeBacklogs;
      if (updates.branch) item.branch = updates.branch;
    }

    saveDb(db);
    return db.activeStudentProfile;
  },

  // DigiLocker
  getDigiLocker(): DigiLockerAccount {
    const db = loadDb();
    return db.activeStudentProfile.digiLocker || (getInitialState().activeStudentProfile.digiLocker as DigiLockerAccount);
  },

  verifyDigiLockerDocument(docId: string): { success: boolean; document?: any } {
    const db = loadDb();
    const digi = db.activeStudentProfile.digiLocker;
    if (!digi) return { success: false };

    const doc = digi.documents.find((d) => d.id === docId);
    if (!doc) return { success: false };

    doc.verificationStatus = "VERIFIED";
    doc.digitalSignature.timestamp = new Date().toISOString();
    digi.verifiedCount = digi.documents.filter((d) => d.verificationStatus === "VERIFIED").length;
    digi.lastSyncedAt = "Just now";

    saveDb(db);
    return { success: true, document: doc };
  },

  syncAllDigiLocker(): DigiLockerAccount {
    const db = loadDb();
    const digi = db.activeStudentProfile.digiLocker;
    if (digi) {
      digi.documents.forEach((d) => {
        d.verificationStatus = "VERIFIED";
      });
      digi.isConnected = true;
      digi.verifiedCount = digi.documents.length;
      digi.lastSyncedAt = "Just now";
    }
    saveDb(db);
    return db.activeStudentProfile.digiLocker!;
  },

  // Career Targets
  getCareerTargets(): { roles: CareerTarget[]; activeId: string; activeRole: CareerTarget } {
    const db = loadDb();
    const activeRole = CAREER_TARGETS.find((r) => r.id === db.activeCareerTargetId) || CAREER_TARGETS[0];
    return {
      roles: CAREER_TARGETS,
      activeId: db.activeCareerTargetId,
      activeRole,
    };
  },

  setActiveCareerTarget(roleId: string): { success: boolean; activeRole?: CareerTarget } {
    const db = loadDb();
    const target = CAREER_TARGETS.find((r) => r.id === roleId);
    if (!target) return { success: false };

    db.activeCareerTargetId = roleId;

    // Trigger notification
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      recipientRole: "STUDENT",
      title: `Target Role Updated: ${target.title}`,
      message: `Your Skill-Gap Matrix, Assessment Syllabus, and Curated Roadmap have been calibrated to ${target.title}.`,
      category: "ASSESSMENT",
      read: false,
      link: "/student/skill-gap",
      timestamp: "Just now",
    });

    saveDb(db);
    return { success: true, activeRole: target };
  },

  // Dynamic Skill Gap Analysis
  getSkillGapAnalysis() {
    const db = loadDb();
    const target = CAREER_TARGETS.find((r) => r.id === db.activeCareerTargetId) || CAREER_TARGETS[0];
    const profile = db.activeStudentProfile;

    const studentSkillsLower = profile.skills.map((s) => s.toLowerCase());

    // Compare profile skills against target core skills
    const acquiredSkills: Array<{ name: string; level: string; source: string }> = [];
    const missingRequirements: Array<{ name: string; priority: "Critical" | "High" | "Recommended" | "Good to have"; industryDemand: string; action: string }> = [];

    target.benchmarks.coreSkills.forEach((skill) => {
      const match = studentSkillsLower.some((s) => s.includes(skill.toLowerCase()) || skill.toLowerCase().includes(s));
      if (match) {
        acquiredSkills.push({
          name: skill,
          level: "Proficient",
          source: "Verified Project / Assessment",
        });
      } else {
        missingRequirements.push({
          name: skill,
          priority: "Critical",
          industryDemand: `Required by 90%+ of campus drives hiring for ${target.title}`,
          action: `Complete hands-on module and project task in Roadmap`,
        });
      }
    });

    // Add extra student skills that complement
    profile.skills.forEach((s) => {
      if (!acquiredSkills.some((a) => a.name.toLowerCase() === s.toLowerCase())) {
        acquiredSkills.push({
          name: s,
          level: "Advanced",
          source: "Student Portfolio",
        });
      }
    });

    const totalCore = target.benchmarks.coreSkills.length;
    const matchCount = totalCore - missingRequirements.length;
    const matchPercentage = Math.min(Math.max(Math.round((matchCount / Math.max(totalCore, 1)) * 100), 55), 98);

    return {
      targetRoleId: target.id,
      targetRole: target.title,
      matchPercentage,
      acquiredSkills,
      missingRequirements,
      readinessTip: target.candidateFitAnalysis.readinessTip,
      strengths: target.candidateFitAnalysis.strengths,
    };
  },

  // Dynamic Roadmap
  getRoadmap(): typeof ROADMAP_PLAYLIST {
    const db = loadDb();
    const activeTargetId = db.activeCareerTargetId;

    if (!db.roadmapPlaylists[activeTargetId]) {
      const target = CAREER_TARGETS.find((r) => r.id === activeTargetId) || CAREER_TARGETS[0];
      // Generate customized playlist for this target role
      const customPlaylist = [
        {
          phase: "1. Learn (Foundations)",
          tasks: [
            { id: `${activeTargetId}-t1`, title: `${target.subjectWeights[0]?.subject || "Core Concepts"} Mastery`, duration: "3 hrs", completed: true, tag: "Video Course" },
            { id: `${activeTargetId}-t2`, title: `${target.subjectWeights[1]?.subject || "Specialization"} Deep-Dive`, duration: "2.5 hrs", completed: false, tag: "Reading" },
            { id: `${activeTargetId}-t3`, title: "Industrial Standard Query & Architecture Lab", duration: "2 hrs", completed: false, tag: "Interactive Lab" },
          ],
        },
        {
          phase: "2. Practice (Hands-on Coding & Projects)",
          tasks: [
            { id: `${activeTargetId}-t4`, title: target.capstoneProjects[0]?.title || "Capstone Project Implementation", duration: "4 hrs", completed: false, tag: "Project Task" },
            { id: `${activeTargetId}-t5`, title: "Solve 15 Targeted Industry Problems on Platform", duration: "3.5 hrs", completed: false, tag: "Coding" },
          ],
        },
        {
          phase: "3. Test (Verification & Mock Assessment)",
          tasks: [
            { id: `${activeTargetId}-t6`, title: `Take 30-min ${target.title} Timed Diagnostic`, duration: "30 mins", completed: false, tag: "Timed Exam" },
            { id: `${activeTargetId}-t7`, title: `Verify Credentials: ${target.benchmarks.recommendedCert}`, duration: "15 mins", completed: true, tag: "Verification" },
          ],
        },
        {
          phase: "4. Interview (AI Simulation & Mentorship)",
          tasks: [
            { id: `${activeTargetId}-t8`, title: `AI Voice Mock Interview: ${target.topRecruiters[0]?.name || "Tier-1"} Panel`, duration: "20 mins", completed: false, tag: "AI Studio" },
            { id: `${activeTargetId}-t9`, title: "1-on-1 Alumni Mock Review & Feedback", duration: "30 mins", completed: false, tag: "Live Room" },
          ],
        },
      ];
      db.roadmapPlaylists[activeTargetId] = customPlaylist;
      saveDb(db);
    }

    return db.roadmapPlaylists[activeTargetId];
  },

  toggleRoadmapTask(taskId: string, isCompleted: boolean): typeof ROADMAP_PLAYLIST {
    const db = loadDb();
    const activeTargetId = db.activeCareerTargetId;
    const playlist = db.roadmapPlaylists[activeTargetId] || ROADMAP_PLAYLIST;

    playlist.forEach((phase) => {
      phase.tasks.forEach((task) => {
        if (task.id === taskId) {
          task.completed = isCompleted;
        }
      });
    });

    db.roadmapPlaylists[activeTargetId] = playlist;

    // Recalculate readiness score automatically
    serverDb.calculateExplainableReadinessScore();

    saveDb(db);
    return playlist;
  },

  // AI Readiness Score Engine with Full Explainability
  calculateExplainableReadinessScore() {
    const db = loadDb();
    const profile = db.activeStudentProfile;
    const target = CAREER_TARGETS.find((r) => r.id === db.activeCareerTargetId) || CAREER_TARGETS[0];

    // 1. Academic Pillar (Weight: 20%)
    const cgpaPoints = Math.min(Math.max((profile.cgpa / 10) * 100, 40), 100);
    const backlogPenalty = profile.activeBacklogs * 15;
    const academicScore = Math.max(Math.round(cgpaPoints - backlogPenalty), 30);

    // 2. Technical & Coding Proficiency (Weight: 30%)
    const techAssessment = db.assessments.find((a) => a.phaseId === "technical");
    const techScore = techAssessment ? techAssessment.score : 82;

    // 3. Cognitive & Aptitude (Weight: 20%)
    const aptAssessment = db.assessments.find((a) => a.phaseId === "aptitude");
    const aptScore = aptAssessment ? aptAssessment.score : 85;

    // 4. Communication & Mock Interview (Weight: 15%)
    const interviewCount = db.interviews.length;
    const avgInterviewRating = interviewCount > 0 ? (db.interviews.reduce((acc, iv) => acc + iv.rating, 0) / interviewCount) * 10 : 84;
    const commScore = Math.min(Math.round(avgInterviewRating), 100);

    // 5. Credentials, DigiLocker & Roadmap Execution (Weight: 15%)
    const digiVerified = profile.digiLocker?.verifiedCount || 0;
    const digiBonus = Math.min(digiVerified * 15, 60);
    const activePlaylist = db.roadmapPlaylists[db.activeCareerTargetId] || ROADMAP_PLAYLIST;
    const totalTasks = activePlaylist.reduce((acc, p) => acc + p.tasks.length, 0);
    const completedTasks = activePlaylist.reduce((acc, p) => acc + p.tasks.filter((t) => t.completed).length, 0);
    const roadmapBonus = Math.round((completedTasks / Math.max(totalTasks, 1)) * 40);
    const credentialScore = Math.min(digiBonus + roadmapBonus, 100);

    // Composite Calculation
    const overallScore = Math.round(
      academicScore * 0.20 +
      techScore * 0.30 +
      aptScore * 0.20 +
      commScore * 0.15 +
      credentialScore * 0.15
    );

    // Determine Gauge Tier
    let gaugeLevel = "Foundation Building";
    let percentile = "Batch 50th Percentile";
    if (overallScore >= 85) {
      gaugeLevel = "Super Dream Ready";
      percentile = "Top 5% of Batch 2026";
    } else if (overallScore >= 75) {
      gaugeLevel = "Dream Corporate Ready";
      percentile = "Top 15% of Batch 2026";
    } else if (overallScore >= 65) {
      gaugeLevel = "Placement Ready";
      percentile = "Top 35% of Batch 2026";
    }

    const categories = [
      {
        name: "Technical & Coding Proficiency",
        weight: 30,
        score: techScore,
        contribution: Number(((techScore * 0.30)).toFixed(1)),
        reasoning: techScore >= 80 ? "Demonstrated high competence in Data Structures, SQL, and core CS fundamentals." : "Needs targeted practice in system design and data structures.",
      },
      {
        name: "Quantitative & Logic Aptitude",
        weight: 20,
        score: aptScore,
        contribution: Number(((aptScore * 0.20)).toFixed(1)),
        reasoning: aptScore >= 80 ? "High calculation speed and logical reasoning accuracy in diagnostic tests." : "Brush up on permutations, combinations, and data interpretation speed.",
      },
      {
        name: "Official Academic Compliance",
        weight: 20,
        score: academicScore,
        contribution: Number(((academicScore * 0.20)).toFixed(1)),
        reasoning: profile.activeBacklogs === 0 ? `Clean record with ${profile.cgpa} CGPA qualifies for 92% of corporate cutoffs.` : `Active backlog count (${profile.activeBacklogs}) triggers automated filtering in Tier-1 drives.`,
      },
      {
        name: "Interview Communication & Voice",
        weight: 15,
        score: commScore,
        contribution: Number(((commScore * 0.15)).toFixed(1)),
        reasoning: `AI Voice simulator measured clear speech delivery at ~135 WPM with solid problem structuring.`,
      },
      {
        name: "Verified Credentials & Execution",
        weight: 15,
        score: credentialScore,
        contribution: Number(((credentialScore * 0.15)).toFixed(1)),
        reasoning: `${digiVerified} DigiLocker authenticated certificates + ${completedTasks}/${totalTasks} roadmap milestones completed.`,
      },
    ];

    const result = {
      overallScore,
      compositeScore: overallScore,
      gaugeLevel,
      percentile,
      targetRole: target.title,
      categories,
      subMetrics: categories.map((c) => ({ name: c.name, score: c.score, weight: c.weight })),
      factors: {
        strengths: [
          `Verified CGPA (${profile.cgpa}) exceeds Tier-1 baseline requirements`,
          `Zero active disciplinary flags and complete DigiLocker verification`,
          `AI Mock Interview rating of ${((commScore / 10)).toFixed(1)}/10 in technical articulation`,
        ],
        weaknesses: [
          completedTasks < totalTasks ? `Only ${completedTasks} of ${totalTasks} roadmap milestones completed` : `Complete 1 additional advanced capstone project to unlock 95%+`,
        ],
        recommendation: `Complete remaining ${totalTasks - completedTasks} items in your Action Roadmap to boost your index to ${Math.min(overallScore + 8, 98)}%.`,
      },
    };

    return result;
  },

  // Placement Drives & Applications
  getDrivesWithStatus() {
    const db = loadDb();
    const profile = db.activeStudentProfile;

    const drivesWithStatus = db.drives.map((drive) => {
      const existingApp = db.applications.find((a) => a.driveId === drive.id && a.rollNo === profile.rollNo);
      const meetsCgpa = profile.cgpa >= drive.minCgpa;
      const meetsBacklogs = profile.activeBacklogs <= drive.maxBacklogs;
      const meetsBranch = checkBranchMatch(profile.branch, drive.allowedBranches);
      const isEligible = meetsCgpa && meetsBacklogs && meetsBranch;

      return {
        ...drive,
        title: drive.role,
        isEligible,
        hasApplied: !!existingApp,
        application: existingApp || null,
        eligibility: {
          minCgpa: drive.minCgpa,
          maxBacklogs: drive.maxBacklogs,
          branches: drive.allowedBranches,
        },
        tags: [drive.ctc, ...(drive.allowedBranches || [])],
        eligibilityReasons: {
          meetsCgpa,
          meetsBacklogs,
          meetsBranch,
          requiredCgpa: drive.minCgpa,
          studentCgpa: profile.cgpa,
          allowedBacklogs: drive.maxBacklogs,
          studentBacklogs: profile.activeBacklogs,
        },
      };
    });

    const rawGov = (db.governmentOpportunities && db.governmentOpportunities.length > 0)
      ? db.governmentOpportunities
      : DEFAULT_GOVERNMENT_OPPORTUNITIES;

    const govOppsFormatted = rawGov.map((gov) => ({
      ...gov,
      category: gov.applicationMode || "Govt Opportunity",
      payScale: gov.cadre || "Official Cadre",
      description: `${gov.cadre || "Govt"} • ${gov.vacancies || 0} Vacancies • ${gov.applicationMode || "Direct"}`,
      eligibility: {
        minCgpa: gov.minCgpa,
        minPct: Math.round((gov.minCgpa || 6.5) * 9.5),
        maxAge: gov.ageLimit,
        branches: gov.allowedBranches,
      },
      selectionProcess: gov.examPattern,
      preparationFocus: gov.syllabus,
      applyUrl: gov.officialNotificationUrl,
    }));

    return {
      drives: drivesWithStatus,
      governmentOpportunities: govOppsFormatted,
      applications: db.applications,
    };
  },

  applyToDrive(driveId: string): { success: boolean; message: string; application?: ApplicationRecord } {
    const db = loadDb();
    const profile = db.activeStudentProfile;
    const drive = db.drives.find((d) => d.id === driveId);

    if (!drive) return { success: false, message: "Drive not found" };

    const existing = db.applications.find((a) => a.driveId === driveId && a.rollNo === profile.rollNo);
    if (existing) return { success: false, message: "You have already applied to this drive." };

    if (profile.cgpa < drive.minCgpa) {
      return {
        success: false,
        message: `Eligibility cutoff failed: Minimum CGPA required is ${drive.minCgpa}, but your verified CGPA is ${profile.cgpa}.`,
      };
    }

    if (profile.activeBacklogs > drive.maxBacklogs) {
      return {
        success: false,
        message: `Eligibility cutoff failed: Maximum allowed backlogs is ${drive.maxBacklogs}, but you currently have ${profile.activeBacklogs}.`,
      };
    }

    if (!checkBranchMatch(profile.branch, drive.allowedBranches)) {
      return {
        success: false,
        message: `Eligibility cutoff failed: Allowed branches are [${drive.allowedBranches.join(", ")}], but your registered branch is ${profile.branch}.`,
      };
    }

    const newApp: ApplicationRecord = {
      id: `app-${Date.now()}`,
      driveId,
      studentId: profile.rollNo,
      studentName: profile.name,
      rollNo: profile.rollNo,
      appliedAt: new Date().toISOString(),
      status: "APPLIED",
      matchScore: Math.min(Math.round(78 + Math.random() * 15), 96),
      notes: "Application dispatched to recruiter screening portal with verified DigiLocker stamp.",
    };

    db.applications.unshift(newApp);

    // Add Notification
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      recipientRole: "STUDENT",
      title: `Applied to ${drive.companyName}`,
      message: `Your application for ${drive.role} (${drive.ctc}) has been submitted successfully with verified ABC ID.`,
      category: "DRIVE",
      read: false,
      link: "/student/placements",
      timestamp: "Just now",
    });

    saveDb(db);
    return { success: true, message: `Application submitted to ${drive.companyName}!`, application: newApp };
  },

  withdrawApplication(driveId: string): { success: boolean; message: string } {
    const db = loadDb();
    const profile = db.activeStudentProfile;
    const idx = db.applications.findIndex((a) => a.driveId === driveId && a.rollNo === profile.rollNo);
    if (idx === -1) return { success: false, message: "Application record not found." };

    db.applications.splice(idx, 1);
    saveDb(db);
    return { success: true, message: "Application withdrawn successfully." };
  },

  // Simulation & Assessment Submissions
  submitAssessmentPhase(data: {
    phaseStep: number;
    phaseId: string;
    title: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeSpentSeconds: number;
    details?: any;
  }): AssessmentAttempt {
    const db = loadDb();
    const attempt: AssessmentAttempt = {
      ...data,
      id: `asm-${Date.now()}`,
      completedAt: new Date().toISOString(),
    };

    // Update or insert into assessments
    const existingIdx = db.assessments.findIndex((a) => a.phaseStep === data.phaseStep);
    if (existingIdx !== -1) {
      db.assessments[existingIdx] = attempt;
    } else {
      db.assessments.push(attempt);
    }

    // Update corresponding module in simulationModules
    const mod = db.simulationModules.find((m) => m.step === data.phaseStep);
    if (mod) {
      mod.completed = true;
      mod.score = data.score;
    }

    // Re-compute Composite Score
    serverDb.calculateExplainableReadinessScore();

    // Notification
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      recipientRole: "STUDENT",
      title: `Assessment Completed: ${data.title}`,
      message: `Score recorded: ${data.score}%. Your verified employability index has been recalibrated.`,
      category: "ASSESSMENT",
      read: false,
      link: "/student/simulation",
      timestamp: "Just now",
    });

    saveDb(db);
    return attempt;
  },

  getSimulationData() {
    const db = loadDb();
    return {
      modules: db.simulationModules,
      attempts: db.assessments,
      interviews: db.interviews,
    };
  },

  // AI Interview Terminal
  submitInterview(data: Omit<InterviewSubmission, "id" | "submittedAt">): InterviewSubmission {
    const db = loadDb();
    const submission: InterviewSubmission = {
      ...data,
      id: `iv-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    db.interviews.unshift(submission);

    // Update Phase 6 assessment
    serverDb.submitAssessmentPhase({
      phaseStep: 6,
      phaseId: "interview",
      title: "AI Voice Interview Terminal",
      score: Math.round(data.rating * 10),
      totalQuestions: 1,
      correctAnswers: 1,
      timeSpentSeconds: 180,
    });

    saveDb(db);
    return submission;
  },

  getInterviewHistory(): InterviewSubmission[] {
    const db = loadDb();
    return db.interviews;
  },

  // Reassessment Quiz
  getReassessmentQuestions(): QuizQuestion[] {
    const db = loadDb();
    return db.reassessmentQuestions;
  },

  getReassessmentHistory(): typeof REASSESSMENT_HISTORY {
    const db = loadDb();
    return db.reassessmentHistory;
  },

  submitReassessment(answers: Record<string, number>): {
    scorePct: number;
    correctCount: number;
    total: number;
    explanationMap: Record<string, { correct: boolean; explanation: string }>;
  } {
    const db = loadDb();
    const questions = db.reassessmentQuestions;
    let correct = 0;
    const explanationMap: Record<string, { correct: boolean; explanation: string }> = {};

    questions.forEach((q) => {
      const isCorrect = answers[q.id] === q.correctIndex;
      if (isCorrect) correct++;
      explanationMap[q.id] = {
        correct: isCorrect,
        explanation: q.explanation,
      };
    });

    const scorePct = Math.round((correct / questions.length) * 100);

    // Add to history
    db.reassessmentHistory.push({
      attempt: `Diagnostic Re-Test #${db.reassessmentHistory.length + 1} (${scorePct}%)`,
      score: Math.min(99, Math.round(75 + scorePct * 0.22)),
      tech: Math.min(98, Math.round(70 + scorePct * 0.26)),
      apt: Math.min(95, Math.round(72 + scorePct * 0.20)),
      comm: 84,
      notes: `Answered ${correct}/${questions.length} questions correctly. Score committed to TPO placement record.`,
    });

    saveDb(db);
    return {
      scorePct,
      correctCount: correct,
      total: questions.length,
      explanationMap,
    };
  },

  // Alumni Mentorship & Referrals
  getAlumniData() {
    const db = loadDb();
    return {
      mentors: db.alumniMentors,
      mentorships: db.mentorships,
      referrals: db.referrals,
    };
  },

  bookMentorship(
    arg1: { alumniId: string; date: string; topic: string } | string,
    argDate?: string,
    argTopic?: string
  ): MentorshipBooking {
    const db = loadDb();
    const profile = db.activeStudentProfile;
    const alumniId = typeof arg1 === "string" ? arg1 : arg1.alumniId;
    const date = typeof arg1 === "string" ? (argDate || "Upcoming Weekend") : arg1.date;
    const topic = typeof arg1 === "string" ? (argTopic || "Mock Interview & Guidance") : arg1.topic;
    const mentor = db.alumniMentors.find((m) => m.id === alumniId);

    const booking: MentorshipBooking = {
      id: `ment-${Date.now()}`,
      alumniId,
      alumniName: mentor?.name || "Alumni Mentor",
      studentName: profile.name,
      studentRoll: profile.rollNo,
      date,
      topic,
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
      notes: "Calendar invite and Google Meet link dispatched.",
    };

    db.mentorships.unshift(booking);

    // Notification
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      recipientRole: "STUDENT",
      title: `1:1 Mentorship Confirmed with ${booking.alumniName}`,
      message: `Session booked for "${booking.topic}" on ${booking.date}.`,
      category: "MENTORSHIP",
      read: false,
      link: "/student/alumni-network",
      timestamp: "Just now",
    });

    saveDb(db);
    return booking;
  },

  requestReferral(alumniId: string, note: string): ReferralRequest {
    const db = loadDb();
    const profile = db.activeStudentProfile;
    const mentor = db.alumniMentors.find((m) => m.id === alumniId);

    const req: ReferralRequest = {
      id: `ref-${Date.now()}`,
      alumniId,
      alumniName: mentor?.name || "Alumni",
      companyName: mentor?.currentCompany || "Target Company",
      studentName: profile.name,
      studentRoll: profile.rollNo,
      note,
      status: "REQUESTED",
      createdAt: new Date().toISOString(),
    };

    db.referrals.unshift(req);

    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      recipientRole: "STUDENT",
      title: `Referral Requested at ${req.companyName}`,
      message: `Your referral application was delivered to ${req.alumniName}.`,
      category: "MENTORSHIP",
      read: false,
      link: "/student/alumni-network",
      timestamp: "Just now",
    });

    saveDb(db);
    return req;
  },

  updateMentorshipStatus(id: string, status: MentorshipBooking["status"]): boolean {
    const db = loadDb();
    const item = db.mentorships.find((m) => m.id === id);
    if (!item) return false;
    item.status = status;
    saveDb(db);
    return true;
  },

  updateReferralStatus(id: string, status: ReferralRequest["status"]): boolean {
    const db = loadDb();
    const item = db.referrals.find((r) => r.id === id);
    if (!item) return false;
    item.status = status;
    saveDb(db);
    return true;
  },

  // TPO Administration & Cohort Analytics
  getTpoDashboardData() {
    const db = loadDb();
    const totalStudents = db.studentsList.length;
    const placedStudents = db.studentsList.filter((s) => s.status.includes("Placed")).length;
    const verifiedStudents = db.studentsList.filter((s) => s.verified).length;
    const avgCgpa = Number(((db.studentsList.reduce((acc, s) => acc + s.cgpa, 0) / Math.max(totalStudents, 1))).toFixed(2));
    const avgReadiness = Math.round(db.studentsList.reduce((acc, s) => acc + s.readiness, 0) / Math.max(totalStudents, 1));
    const pendingVerifications = db.tpoVerifications.filter((v) => v.status === "PENDING").length;

    // Branch breakdown
    const branches = ["CSE", "IT", "ECE", "ME", "CE"];
    const branchBreakdown = branches.map((b) => {
      const list = db.studentsList.filter((s) => s.branch === b);
      const placed = list.filter((s) => s.status.includes("Placed")).length;
      return {
        branch: b,
        total: list.length,
        placed,
        pct: list.length > 0 ? Math.round((placed / list.length) * 100) : 0,
        avgCgpa: list.length > 0 ? Number(((list.reduce((acc, s) => acc + s.cgpa, 0) / list.length)).toFixed(2)) : 0,
      };
    });

    return {
      stats: {
        totalStudents,
        placedCount: placedStudents,
        placementPct: Math.round((placedStudents / Math.max(totalStudents, 1)) * 100),
        verifiedCount: verifiedStudents,
        activeDrivesCount: db.drives.length,
        pendingVerifications,
        avgCgpa,
        avgReadiness,
      },
      branchBreakdown,
      students: db.studentsList,
      drives: db.drives,
      applications: db.applications,
      verifications: db.tpoVerifications,
    };
  },

  createTpoDrive(newDrive: {
    companyName: string;
    role: string;
    ctc: string;
    minCgpa: number;
    maxBacklogs: number;
    allowedBranches?: string[];
    deadline?: string;
    logo?: string;
    title?: string;
    location?: string;
    status?: string;
    eligibility?: any;
    tags?: string[];
  }): CompanyDrive {
    const db = loadDb();
    const logoInitials = newDrive.companyName
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const drive: CompanyDrive = {
      id: `drive-${Date.now()}`,
      companyName: newDrive.companyName,
      logo: logoInitials || "CO",
      role: newDrive.role,
      ctc: newDrive.ctc,
      minCgpa: newDrive.minCgpa,
      maxBacklogs: newDrive.maxBacklogs,
      allowedBranches: newDrive.allowedBranches || ["CSE", "IT", "ECE", "AI_DS"],
      deadline: newDrive.deadline || new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0],
      stage: "Applied",
    };

    db.drives.unshift(drive);

    // Global Notification
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      recipientRole: "ALL",
      title: `Campus Drive Created: ${drive.companyName}`,
      message: `TPO Cell has activated recruitment drive for ${drive.role} (${drive.ctc}). Deadline: ${drive.deadline}.`,
      category: "DRIVE",
      read: false,
      link: "/student/placements",
      timestamp: "Just now",
    });

    saveDb(db);
    return drive;
  },

  updateDriveEligibility(driveId: string, updates: {
    minCgpa?: number;
    maxBacklogs?: number;
    allowedBranches?: string[];
    deadline?: string;
    ctc?: string;
    role?: string;
    requiredSkills?: string[];
    minTenthPct?: number;
    minTwelfthPct?: number;
    notes?: string;
  }): CompanyDrive | null {
    const db = loadDb();
    const drive = db.drives.find((d) => d.id === driveId);
    if (!drive) return null;

    if (updates.minCgpa !== undefined && updates.minCgpa !== null) drive.minCgpa = Number(updates.minCgpa);
    if (updates.maxBacklogs !== undefined && updates.maxBacklogs !== null) drive.maxBacklogs = Number(updates.maxBacklogs);
    if (updates.allowedBranches && updates.allowedBranches.length > 0) drive.allowedBranches = updates.allowedBranches;
    if (updates.deadline) drive.deadline = updates.deadline;
    if (updates.ctc) drive.ctc = updates.ctc;
    if (updates.role) drive.role = updates.role;

    // Send notification to students about updated eligibility
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      recipientRole: "STUDENT",
      title: `Eligibility Updated: ${drive.companyName}`,
      message: `TPO Cell updated eligibility for ${drive.role}: Min CGPA: ${drive.minCgpa}, Max Backlogs: ${drive.maxBacklogs}, Branches: ${drive.allowedBranches.join(", ")}.`,
      category: "DRIVE",
      read: false,
      link: "/student/placements",
      timestamp: "Just now",
    });

    saveDb(db);
    return drive;
  },

  verifyTpoDocument(verificationId: string, status: "VERIFIED" | "REJECTED") {
    const db = loadDb();
    const item = db.tpoVerifications.find((v) => v.id === verificationId);
    if (item) {
      item.status = status;
      item.updatedAt = new Date().toISOString();

      // If verified, mark corresponding student as verified
      if (status === "VERIFIED") {
        const student = db.studentsList.find((s) => s.roll === item.rollNo);
        if (student) student.verified = true;
      }

      saveDb(db);
    }
    return item;
  },

  exportTpoPlacementCsv(): string {
    const db = loadDb();
    const headers = "Student Name,Roll Number,Branch,CGPA,Active Backlogs,Readiness Index,Verification Status,Placement Status,Target Role\n";
    const rows = db.studentsList
      .map((s) => `"${s.name}","${s.roll}","${s.branch}",${s.cgpa},${s.backlogs},"${s.readiness}%","${s.verified ? "VERIFIED" : "PENDING"}","${s.status}","${s.targetRole}"`)
      .join("\n");
    return headers + rows;
  },

  // Company Recruiter Portal
  getCompanyApplicants(companyName?: string) {
    const db = loadDb();
    const drives = companyName ? db.drives.filter((d) => d.companyName.toLowerCase().includes(companyName.toLowerCase())) : db.drives;
    const driveIds = drives.map((d) => d.id);
    const applicants = db.applications.filter((a) => driveIds.includes(a.driveId));

    return {
      drives,
      applicants,
    };
  },

  updateApplicationStage(appId: string, status: ApplicationRecord["status"], notes?: string): ApplicationRecord | null {
    const db = loadDb();
    const app = db.applications.find((a) => a.id === appId);
    if (!app) return null;

    app.status = status;
    if (notes) app.notes = notes;

    // Notify student
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      recipientRole: "STUDENT",
      title: `Application Status Updated: ${status}`,
      message: `Your application status for drive #${app.driveId} has been updated to "${status}". Notes: ${notes || "No extra notes"}`,
      category: "OFFER",
      read: false,
      link: "/student/placements",
      timestamp: "Just now",
    });

    saveDb(db);
    return app;
  },

  // Notifications
  getNotifications(role?: Role) {
    const db = loadDb();
    const notifs = db.notifications.filter(
      (n) => n.recipientRole === "ALL" || !role || n.recipientRole === role
    );
    const unreadCount = notifs.filter((n) => !n.read).length;
    return {
      notifications: notifs,
      unreadCount,
    };
  },

  markNotificationsRead() {
    const db = loadDb();
    db.notifications.forEach((n) => (n.read = true));
    saveDb(db);
    return true;
  },

  // AI Resume Analyzer
  analyzeResumeText(resumeText: string, targetRole: string) {
    const db = loadDb();
    const textLower = resumeText.toLowerCase();

    // Check for essential sections
    const hasEducation = textLower.includes("education") || textLower.includes("b.tech") || textLower.includes("cgpa") || textLower.includes("degree");
    const hasSkills = textLower.includes("skills") || textLower.includes("technologies") || textLower.includes("languages");
    const hasProjects = textLower.includes("projects") || textLower.includes("built") || textLower.includes("engineered");
    const hasExperience = textLower.includes("experience") || textLower.includes("internship") || textLower.includes("work");
    const hasMetrics = /\b\d+%\b|\b\d+k\b|\b\d+x\b|\breduced\b|\bincreased\b|\boptimized\b/.test(textLower);

    // Detect technical keywords
    const candidateKeywords = [
      "react", "next.js", "typescript", "javascript", "python", "node.js", "sql", "postgresql",
      "mongodb", "docker", "kubernetes", "aws", "git", "ci/cd", "rest api", "graphql", "redis",
      "data structures", "algorithms", "linux", "c++", "java", "system design"
    ];
    const detectedSkills = candidateKeywords.filter((k) => textLower.includes(k));

    // Calculate ATS Score
    let atsScore = 50;
    if (hasEducation) atsScore += 10;
    if (hasSkills) atsScore += 10;
    if (hasProjects) atsScore += 12;
    if (hasExperience) atsScore += 8;
    if (hasMetrics) atsScore += 10;
    atsScore = Math.min(Math.max(atsScore, 45), 96);

    const suggestions = [
      {
        id: "sug-1",
        title: "Quantify Project & Internship Outcomes",
        desc: "Transform bullets like 'worked on database queries' into 'Reduced PostgreSQL query execution latency by 35% through B-Tree indexing'.",
        boost: "+8%",
        skillToAdd: "PostgreSQL Indexing",
      },
      {
        id: "sug-2",
        title: "Add Containerization & Cloud Badges",
        desc: "Add verified Docker and AWS Cloud Practitioner credentials to bypass automated ATS filters.",
        boost: "+10%",
        skillToAdd: "Docker & AWS",
      },
      {
        id: "sug-3",
        title: "Embed Verified CampusRise Readiness Score",
        desc: "Add a Verified Credential section: 'CampusRise Employability Index: 84/100 (Top 8% Batch Percentile)'.",
        boost: "+6%",
        skillToAdd: "CampusRise Employability Index",
      },
      {
        id: "sug-4",
        title: "Target Keyword Alignment for " + targetRole,
        desc: `Include high-frequency keywords: System Design, Distributed Caching, Redis, Microservices, and REST APIs.`,
        boost: "+7%",
        skillToAdd: "System Design",
      },
    ];

    return {
      atsScore,
      targetRole,
      detectedSkills,
      missingSections: [
        !hasMetrics ? "Quantifiable Business/Metric Outcomes" : null,
        !hasExperience ? "Formal Internship Experience" : null,
      ].filter(Boolean),
      suggestions,
      verifiedStamp: "SHA-256 Digitally Signed via DigiLocker",
    };
  },

  // Backward compatibility aliases
  getAlumni() {
    return serverDb.getAlumniData();
  },
  getDrivesWithApplications() {
    return serverDb.getDrivesWithStatus();
  },
  getReadinessAnalysis() {
    return serverDb.calculateExplainableReadinessScore();
  },
  recalculateReadiness() {
    return serverDb.calculateExplainableReadinessScore();
  },
  toggleRoadmapMilestone(id: string, isCompleted: boolean) {
    return serverDb.toggleRoadmapTask(id, isCompleted);
  },
  exportPlacementCsv() {
    return serverDb.exportTpoPlacementCsv();
  },
  verifyStudentDocumentByTpo(verificationId: string, status: "VERIFIED" | "REJECTED") {
    return serverDb.verifyTpoDocument(verificationId, status);
  },
};
