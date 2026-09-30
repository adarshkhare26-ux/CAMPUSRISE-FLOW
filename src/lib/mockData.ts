/**
 * CampusRise - Global Seed Dataset & State Store
 * Powers all dedicated pages with interconnected data
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

export interface CareerSubjectWeight {
  subject: string;
  weight: number;
  topics: string[];
  importance: "Critical" | "High" | "Medium";
}

export interface CareerRecruiter {
  name: string;
  roleName: string;
  package: string;
  hiringType: "Super Dream" | "Dream" | "Regular";
  location: string;
}

export interface CareerInterviewRound {
  roundNumber: number;
  roundName: string;
  duration: string;
  focus: string;
  passRate: string;
  evaluationCriteria: string[];
}

export interface CareerFitAnalysis {
  matchPct: number;
  fitStatus: "High Fit" | "Ready with Minor Polish" | "Requires Upskilling";
  strengths: string[];
  gapPriorities: string[];
  readinessTip: string;
}

export interface CareerCapstone {
  title: string;
  techStack: string;
  impact: string;
}

export interface CareerTarget {
  id: string;
  title: string;
  category: string;
  demand: "Very High" | "High" | "Moderate";
  avgSalary: string;
  salaryBreakdown: {
    base: string;
    variable: string;
    esops: string;
    tier1Max: string;
  };
  description: string;
  subjectWeights: CareerSubjectWeight[];
  benchmarks: {
    coreSkills: string[];
    minCgpa: number;
    maxBacklogs: number;
    recommendedCert: string;
    certIssuer: string;
    certImpact: string;
  };
  topRecruiters: CareerRecruiter[];
  interviewRounds: CareerInterviewRound[];
  candidateFitAnalysis: CareerFitAnalysis;
  capstoneProjects: CareerCapstone[];
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
    category: "Software & Core Product Engineering",
    demand: "Very High",
    avgSalary: "₹8.5 - ₹16.0 LPA",
    salaryBreakdown: {
      base: "₹7.5 - ₹13.0 LPA",
      variable: "10% - 15% Annual Bonus",
      esops: "₹2.0 - ₹4.5 Lakhs (Vested over 4 years)",
      tier1Max: "₹24.0 - ₹32.0 LPA (Tier-1 Super Dream)"
    },
    description: "Design, construct, and scale distributed backend architectures, high-performance APIs, relational/document data stores, and responsive frontends with sub-millisecond execution.",
    subjectWeights: [
      {
        subject: "Data Structures & Algorithms (DSA)",
        weight: 35,
        topics: ["Dynamic Programming", "Trees & Graphs (BFS/DFS)", "Trie & String Matching", "Hash Maps & Sliding Window", "Time/Space Asymptotics"],
        importance: "Critical"
      },
      {
        subject: "Database Management & SQL Systems",
        weight: 20,
        topics: ["B-Tree & Hash Indexing", "ACID Transactions & Isolation Levels", "Complex Joins & Window Functions", "Sharding & Read Replicas", "Normalization (3NF/BCNF)"],
        importance: "Critical"
      },
      {
        subject: "Object-Oriented Programming & Low-Level Design (LLD)",
        weight: 20,
        topics: ["SOLID Principles", "Design Patterns (Factory, Singleton, Observer)", "UML Class Diagrams", "Schema Modeling", "Clean Code & Refactoring"],
        importance: "Critical"
      },
      {
        subject: "Operating Systems & Computer Networks",
        weight: 15,
        topics: ["Process Concurrency & Mutex/Semaphores", "Memory Virtualization & Paging", "TCP 3-Way Handshake & TLS 1.3", "DNS & HTTP/2 vs HTTP/3", "Sockets & Deadlocks"],
        importance: "High"
      },
      {
        subject: "High-Level System Design & Cloud Basics",
        weight: 10,
        topics: ["Distributed Caching (Redis/Memcached)", "Message Queues (Kafka/RabbitMQ)", "Load Balancing & Rate Limiting", "CDN & CAP Theorem", "Microservices Architecture"],
        importance: "Medium"
      }
    ],
    benchmarks: {
      coreSkills: ["Data Structures & Algorithms", "System Design & LLD", "Node.js / Java / Go", "PostgreSQL & Redis", "Docker & CI/CD"],
      minCgpa: 7.5,
      maxBacklogs: 0,
      recommendedCert: "AWS Certified Developer – Associate",
      certIssuer: "Amazon Web Services (AWS)",
      certImpact: "Increases Tier-1 Super Dream shortlist rate by 52% across visiting MNCs."
    },
    topRecruiters: [
      { name: "Cisco Systems", roleName: "Software Engineer (Cloud & Security)", package: "₹17.5 LPA", hiringType: "Super Dream", location: "Bangalore / Pune" },
      { name: "Tata Consultancy Services", roleName: "Systems Engineer (Digital & Prime)", package: "₹9.2 LPA", hiringType: "Dream", location: "Indore / PAN India" },
      { name: "Infosys Limited", roleName: "Specialist Programmer (Power Programmer)", package: "₹9.5 LPA", hiringType: "Dream", location: "Indore / Bangalore" },
      { name: "Persistent Systems", roleName: "Lead Software Associate", package: "₹8.8 LPA", hiringType: "Dream", location: "Pune / Bhopal" },
      { name: "Amazon India", roleName: "Software Development Engineer - I", package: "₹24.0 LPA", hiringType: "Super Dream", location: "Hyderabad" }
    ],
    interviewRounds: [
      {
        roundNumber: 1,
        roundName: "Online Speed Coding & DSA Screening",
        duration: "90 Minutes",
        focus: "2 LeetCode Medium/Hard Problems + 20 CS Fundamental MCQs",
        passRate: "18% Candidate Shortlist Rate",
        evaluationCriteria: ["Correctness of all edge cases", "Optimal O(n log n) or O(n) complexity", "Code readability & variable naming"]
      },
      {
        roundNumber: 2,
        roundName: "Technical Deep-Dive: Code Implementation & LLD",
        duration: "60 Minutes",
        focus: "Live code refactoring, Object-Oriented design, and SQL schema modeling",
        passRate: "35% Round Clearance Rate",
        evaluationCriteria: ["SOLID design adherence", "Handling concurrent state & thread safety", "SQL query optimization & index selection"]
      },
      {
        roundNumber: 3,
        roundName: "High-Level Architecture & System Design",
        duration: "45 Minutes",
        focus: "Designing scalable real-world systems (e.g., URL Shortener, Uber Driver Matching, WhatsApp Chat)",
        passRate: "50% Round Clearance Rate",
        evaluationCriteria: ["Capacity estimation & bottleneck identification", "Database choice (SQL vs NoSQL)", "Cache invalidation & failover strategy"]
      },
      {
        roundNumber: 4,
        roundName: "Techno-Managerial & Cultural Fitment",
        duration: "30 Minutes",
        focus: "STAR format behavioral interview, project trade-offs, and crisis handling",
        passRate: "80% Final Offer Conversion",
        evaluationCriteria: ["Communication clarity", "Demonstrated ownership of production bugs", "Growth mindset & team alignment"]
      }
    ],
    candidateFitAnalysis: {
      matchPct: 86,
      fitStatus: "High Fit",
      strengths: [
        "Verified 8.42 CGPA exceeds corporate threshold (7.50+)",
        "Zero active backlogs with verified academic degree standing",
        "Strong full-stack foundations (React.js, Node.js, PostgreSQL)",
        "Proven distributed project (Task Pipeline handling 5k tasks/min)"
      ],
      gapPriorities: [
        "Dynamic Programming (0/1 Knapsack, Longest Common Subsequence)",
        "Distributed lock mechanisms with Redis / Redlock",
        "Formal AWS Developer Associate certificate integration"
      ],
      readinessTip: "Priya is in the top 10% candidate percentile for SDE roles. Complete 15 curated medium DP problems and review Redis caching patterns to lock in 90%+ clearance probability."
    },
    capstoneProjects: [
      {
        title: "High-Concurrency Ticket Booking Engine with Distributed Locks",
        techStack: "Go / Node.js, Redis (Redlock), PostgreSQL, Docker, NGINX",
        impact: "Simulates flash-sale concurrency with zero double-booking under 10,000 requests/sec load."
      },
      {
        title: "Microservices URL Analytics & Edge Redirection Gateway",
        techStack: "Java Spring Boot, Kafka, MongoDB, AWS ECS, Prometheus",
        impact: "Sub-10ms redirect latency with real-time geo-IP analytics ingestion."
      }
    ]
  },
  {
    id: "data-analyst",
    title: "Data Analyst & Business Intelligence",
    category: "Analytics & Applied AI",
    demand: "High",
    avgSalary: "₹6.5 - ₹12.0 LPA",
    salaryBreakdown: {
      base: "₹5.8 - ₹10.2 LPA",
      variable: "8% - 12% Performance Bonus",
      esops: "₹1.0 - ₹2.5 Lakhs",
      tier1Max: "₹16.0 - ₹20.0 LPA (Consulting & Fintech Lead)"
    },
    description: "Transform petabyte-scale unstructured enterprise databases into structured semantic models, KPI dashboards, customer retention forecasts, and executive board insights.",
    subjectWeights: [
      {
        subject: "Advanced SQL & Analytical Data Warehousing",
        weight: 35,
        topics: ["Window Functions (RANK, DENSE_RANK, NTILE)", "Common Table Expressions (CTEs)", "Star & Snowflake Schemas", "Incremental ETL / ELT Models", "Performance Tuning & Partitioning"],
        importance: "Critical"
      },
      {
        subject: "Python for Data Analysis & Statistical Modeling",
        weight: 25,
        topics: ["Pandas DataFrames & Vectorized Ops", "NumPy Numerical Arrays", "Data Wrangling & Imputation", "Hypothesis Testing (p-values, ANOVA)", "Scikit-Learn Regression & Clustering"],
        importance: "Critical"
      },
      {
        subject: "Business Intelligence & Executive Dashboards",
        weight: 20,
        topics: ["Power BI DAX Measures & Data Models", "Tableau Calculated Fields & LODs", "UX Principles for Executive Summaries", "Real-Time KPI Alerts", "Drill-Down Matrix Reports"],
        importance: "Critical"
      },
      {
        subject: "Probability, Statistics & Metric Engineering",
        weight: 15,
        topics: ["A/B Testing Frameworks", "Normal & Poisson Distributions", "Customer Lifetime Value (CLV)", "Churn Rate & Cohort Analysis", "Correlation vs Causation"],
        importance: "High"
      },
      {
        subject: "Modern Data Pipeline Orchestration",
        weight: 5,
        topics: ["Apache Airflow DAGs", "dbt (Data Build Tool)", "Snowflake / BigQuery Basics", "Data Governance & Lineage", "Data Quality Auditing"],
        importance: "Medium"
      }
    ],
    benchmarks: {
      coreSkills: ["Advanced SQL & CTEs", "Python (Pandas, NumPy)", "Power BI / DAX / Tableau", "Statistical Hypothesis Testing", "Data Warehousing (BigQuery/Snowflake)"],
      minCgpa: 7.0,
      maxBacklogs: 0,
      recommendedCert: "Google Data Analytics Professional Certificate",
      certIssuer: "Google Career Certificates",
      certImpact: "Demonstrates practical SQL, R/Python, and Tableau portfolio proficiency."
    },
    topRecruiters: [
      { name: "Deloitte USI", roleName: "Business Technology Analyst (Analytics)", package: "₹8.5 LPA", hiringType: "Dream", location: "Hyderabad / Gurgaon" },
      { name: "MPSeDC (MP State IT)", roleName: "Data Analytics Associate (GovTech)", package: "₹7.2 LPA", hiringType: "Regular", location: "Bhopal" },
      { name: "Mu Sigma Inc.", roleName: "Trainee Decision Scientist", package: "₹7.0 LPA", hiringType: "Regular", location: "Bangalore" },
      { name: "Fractal Analytics", roleName: "Data Engineer / Analytics Specialist", package: "₹10.5 LPA", hiringType: "Dream", location: "Mumbai / Gurgaon" },
      { name: "EXL Service", roleName: "Analytics Consultant", package: "₹8.0 LPA", hiringType: "Regular", location: "Noida / Pune" }
    ],
    interviewRounds: [
      {
        roundNumber: 1,
        roundName: "Advanced SQL & Quantitative Aptitude Test",
        duration: "75 Minutes",
        focus: "3 Complex SQL queries (multi-table joins, CTEs, running totals) + Statistics MCQs",
        passRate: "22% Candidate Shortlist Rate",
        evaluationCriteria: ["Query efficiency without subquery overhead", "Accurate handling of NULL values", "Calculation logic for business KPIs"]
      },
      {
        roundNumber: 2,
        roundName: "Data Wrangling & Jupyter Notebook Case Study",
        duration: "60 Minutes",
        focus: "Cleaning a messy 100k-row CSV dataset in Python, identifying outliers, and generating visualizations",
        passRate: "38% Round Clearance Rate",
        evaluationCriteria: ["Clean pandas code without deprecated syntax", "Appropriate chart selections (Box plot vs Scatter)", "Statistical justification of findings"]
      },
      {
        roundNumber: 3,
        roundName: "Live BI Dashboard Drilldown & Business Pitch",
        duration: "45 Minutes",
        focus: "Presenting a dynamic Power BI or Tableau dashboard to a simulated business stakeholder",
        passRate: "55% Round Clearance Rate",
        evaluationCriteria: ["Executive storytelling ability", "Speed in answering ad-hoc drilldown questions", "DAX measure efficiency"]
      },
      {
        roundNumber: 4,
        roundName: "Partner / Director Fitment & Case Interview",
        duration: "30 Minutes",
        focus: "Guesstimate problems (e.g., daily coffee consumption in Indore) and analytical trade-offs",
        passRate: "85% Final Offer Conversion",
        evaluationCriteria: ["Structured problem breakdown", "Sanity checking calculations", "Business intuition & cultural alignment"]
      }
    ],
    candidateFitAnalysis: {
      matchPct: 78,
      fitStatus: "Ready with Minor Polish",
      strengths: [
        "Solid PostgreSQL experience and query structuring skills",
        "Clean academic record (8.42 CGPA) surpasses 7.00 baseline",
        "Logical coding foundation in TypeScript translates seamlessly to Python",
        "Strong analytical mindset proven through academic projects"
      ],
      gapPriorities: [
        "Power BI DAX expressions (CALCULATE, RELATEDTABLE, FILTER)",
        "Formal Statistical A/B testing methodology and power analysis",
        "Python Scikit-Learn data modeling pipelines"
      ],
      readinessTip: "Priya can achieve 90%+ readiness within 12 days by completing a hands-on Power BI dashboard project and practicing 20 advanced SQL window-function queries."
    },
    capstoneProjects: [
      {
        title: "Omnichannel Retail Sales & Customer Churn Prediction Dashboard",
        techStack: "PostgreSQL, Python (Pandas/Seaborn), Power BI (DAX), Scikit-Learn",
        impact: "Identified high-churn customer segments with 83% precision and automated quarterly revenue projection reports."
      },
      {
        title: "Public Health Scheme Real-Time Enrollment & Fund Utilization Tracker",
        techStack: "BigQuery, Python, Apache Superset, dbt",
        impact: "Provided MP district-level insights with daily automated anomaly alerts for administrative auditors."
      }
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Architect (SRE)",
    category: "Cloud Infrastructure & Platform Reliability",
    demand: "Very High",
    avgSalary: "₹9.0 - ₹18.0 LPA",
    salaryBreakdown: {
      base: "₹8.0 - ₹14.5 LPA",
      variable: "12% - 18% Performance & On-call Bonus",
      esops: "₹2.5 - ₹5.0 Lakhs",
      tier1Max: "₹26.0 - ₹34.0 LPA (Global SRE / Cloud Specialist)"
    },
    description: "Architect self-healing cloud infrastructure, provision multi-region Kubernetes clusters with Terraform, establish automated GitOps CI/CD pipelines, and maintain 99.99% service availability.",
    subjectWeights: [
      {
        subject: "Linux Systems Administration & Shell Scripting",
        weight: 25,
        topics: ["File Permissions & ACLs", "Process Hierarchy & Systemd Services", "Networking CLI (netstat, ss, tcpdump, iptables)", "Bash Automation & Regex", "Kernel Tunables & cgroups"],
        importance: "Critical"
      },
      {
        subject: "Containerization & Kubernetes Orchestration",
        weight: 25,
        topics: ["Multi-Stage Docker Builds & Image Optimization", "Pods, Deployments, ReplicaSets, DaemonSets", "Ingress Controllers & Service Meshes (Istio)", "ConfigMaps, Secrets, & RBAC", "Helm Charts & Kustomize"],
        importance: "Critical"
      },
      {
        subject: "Cloud Providers Architecture (AWS / GCP)",
        weight: 25,
        topics: ["VPC Peering, Subnets, Internet Gateways & NAT", "IAM Roles, Policies & Least Privilege Access", "Compute (EC2, Auto Scaling Groups, Lambda)", "Storage Tiering (S3, EBS, EFS)", "Cloud Security & Compliance"],
        importance: "Critical"
      },
      {
        subject: "Infrastructure as Code (IaC) & Configuration",
        weight: 15,
        topics: ["Terraform HCL Syntax & Modules", "State Management & S3 Remote Backend", "Drift Detection & Plan Validation", "Ansible Playbooks & Idempotency", "GitOps with ArgoCD"],
        importance: "High"
      },
      {
        subject: "CI/CD Automation & Observability",
        weight: 10,
        topics: ["GitHub Actions / GitLab CI Pipelines", "Prometheus Metrics & PromQL", "Grafana Dashboard Alerting", "Centralized Logging (ELK / Loki)", "SLIs, SLOs & Error Budgets"],
        importance: "High"
      }
    ],
    benchmarks: {
      coreSkills: ["Linux CLI & Bash", "Docker & Kubernetes (K8s)", "AWS / GCP Solutions Architecture", "Terraform (IaC)", "GitHub Actions CI/CD & Prometheus"],
      minCgpa: 7.0,
      maxBacklogs: 0,
      recommendedCert: "CKA (Certified Kubernetes Administrator)",
      certIssuer: "Cloud Native Computing Foundation (CNCF / Linux Foundation)",
      certImpact: "Guarantees interview shortlisting across 95% of visiting DevOps and Platform teams."
    },
    topRecruiters: [
      { name: "Red Hat India", roleName: "Associate Software Engineer (OpenShift & Linux)", package: "₹14.0 LPA", hiringType: "Super Dream", location: "Bangalore / Pune" },
      { name: "Persistent Systems", roleName: "Cloud Infrastructure Engineer", package: "₹9.0 LPA", hiringType: "Dream", location: "Pune / Indore" },
      { name: "Amazon Web Services (AWS)", roleName: "Cloud Support Associate (DevOps)", package: "₹18.0 LPA", hiringType: "Super Dream", location: "Bangalore / Hyderabad" },
      { name: "Wipro Digital", roleName: "Platform Reliability Engineer", package: "₹8.5 LPA", hiringType: "Dream", location: "Pune / Greater Noida" },
      { name: "MP State Data Center", roleName: "Cloud Operations Specialist", package: "₹7.5 LPA", hiringType: "Regular", location: "Bhopal" }
    ],
    interviewRounds: [
      {
        roundNumber: 1,
        roundName: "Linux CLI, Networking & Python/Bash Diagnostic",
        duration: "75 Minutes",
        focus: "Debugging DNS lookup failure, writing automated log parsers, process management questions",
        passRate: "20% Candidate Shortlist Rate",
        evaluationCriteria: ["Understanding of OS kernel signals (SIGTERM, SIGKILL)", "Proficiency in piping grep, awk, and sed", "Subnetting and routing fundamentals"]
      },
      {
        roundNumber: 2,
        roundName: "Live Docker & Kubernetes Cluster Debugging",
        duration: "60 Minutes",
        focus: "Diagnosing CrashLoopBackOff in pods, writing multi-stage secure Dockerfiles, service endpoints",
        passRate: "32% Round Clearance Rate",
        evaluationCriteria: ["Identification of out-of-memory (OOMKilled) states", "Proper use of non-root Docker users", "Correct Service type selection (ClusterIP vs NodePort)"]
      },
      {
        roundNumber: 3,
        roundName: "Terraform & AWS Cloud Architecture Deep-Dive",
        duration: "60 Minutes",
        focus: "Coding a highly-available 2-tier VPC infrastructure in Terraform with auto-scaling",
        passRate: "45% Round Clearance Rate",
        evaluationCriteria: ["Modular Terraform architecture", "Secure secret handling without plaintext credentials", "Cost-effective resource provisioning"]
      },
      {
        roundNumber: 4,
        roundName: "Site Reliability Incident Simulation & Post-Mortem",
        duration: "40 Minutes",
        focus: "Simulated P1 production outage: 502 Bad Gateway under traffic spike, incident command communication",
        passRate: "75% Final Offer Conversion",
        evaluationCriteria: ["Calm structured triage methodology", "Root-cause identification without finger-pointing", "Preventative blameless post-mortem writing"]
      }
    ],
    candidateFitAnalysis: {
      matchPct: 74,
      fitStatus: "Ready with Minor Polish",
      strengths: [
        "AWS Certified Cloud Practitioner certification already on official profile",
        "Hands-on experience building distributed backend architectures with Docker",
        "Strong networking fundamentals and high CGPA (8.42)",
        "Internship experience optimizing live API latency by 34%"
      ],
      gapPriorities: [
        "Kubernetes configuration (Deployments, Ingress, PersistentVolumes)",
        "Terraform state manipulation & multi-environment setups",
        "Observability tooling (Prometheus scraping & Grafana alerts)"
      ],
      readinessTip: "Priya already possesses the AWS Cloud Practitioner credential! Deploying a 3-tier app on a local Minikube cluster and writing a Terraform script for AWS will increase readiness to 88%."
    },
    capstoneProjects: [
      {
        title: "Automated Zero-Downtime Blue/Green Kubernetes Deployment Pipeline",
        techStack: "Kubernetes, Docker, GitHub Actions, ArgoCD, Helm, AWS EKS",
        impact: "Implemented automated canary rollouts with instant rollback if Prometheus error-rate exceeds 1%."
      },
      {
        title: "Infrastructure as Code Multi-Tier AWS Cloud Architecture",
        techStack: "Terraform, AWS (VPC, ALB, ECS Fargate, RDS PostgreSQL), Checkov",
        impact: "Enforced CIS AWS Benchmark compliance with 100% automated provisioning in under 4 minutes."
      }
    ]
  },
  {
    id: "core-embedded",
    title: "Cyber Security & Embedded Systems",
    category: "Hardware, Firmware & Cyber Defense",
    demand: "Moderate",
    avgSalary: "₹7.0 - ₹14.5 LPA",
    salaryBreakdown: {
      base: "₹6.2 - ₹11.5 LPA",
      variable: "10% - 14% Annual Bonus",
      esops: "₹1.5 - ₹3.0 Lakhs",
      tier1Max: "₹20.0 - ₹28.0 LPA (Semiconductor & Defense Giants)"
    },
    description: "Engineer ultra-reliable low-level firmware for microcontrollers and IoT platforms, secure hardware cryptographic interfaces, implement RTOS task schedules, and safeguard cyber infrastructure against zero-day exploits.",
    subjectWeights: [
      {
        subject: "Embedded C / Modern C++ & Memory Optimization",
        weight: 30,
        topics: ["Pointer Arithmetic & Memory Mapped I/O", "Bitwise Operators & Register Bitmasking", "Dynamic Memory Hazards & Static Allocation", "Volatile Keyword & Concurrency Barriers", "MISRA-C Safety Guidelines"],
        importance: "Critical"
      },
      {
        subject: "Microcontroller Architecture & Hardware Interfaces",
        weight: 25,
        topics: ["ARM Cortex-M0/M4 Core Architecture", "Communication Buses (UART, SPI, I2C, CAN)", "Timers, PWM & Analog-to-Digital (ADC) Conversion", "Direct Memory Access (DMA) Controllers", "Interrupt Service Routines (ISRs) & Latency"],
        importance: "Critical"
      },
      {
        subject: "Network Security & Cryptographic Protocols",
        weight: 20,
        topics: ["Public Key Infrastructure (PKI) & X.509", "AES-256 Symmetric & RSA/ECC Asymmetric Ciphers", "TLS Handshakes & Mutual Authentication (mTLS)", "Buffer Overflows & Stack Canaries", "Penetration Testing (Wireshark, Nmap, Burp Suite)"],
        importance: "Critical"
      },
      {
        subject: "Real-Time Operating Systems (RTOS)",
        weight: 15,
        topics: ["FreeRTOS Task Scheduling & Priorities", "Semaphores, Mutexes & Priority Inversion", "Inter-Task Communication (Queues & Notifications)", "Memory Protection Units (MPU)", "Watchdog Timers & Brownout Resets"],
        importance: "High"
      },
      {
        subject: "IoT Security & Secure Boot Firmware",
        weight: 10,
        topics: ["Cryptographic Hardware Root of Trust", "Secure Boot & Firmware OTA Verification", "Side-Channel Attack Defenses", "Low-Power Modes (Sleep / Deep Sleep)", "Embedded Linux Basics (Yocto / Buildroot)"],
        importance: "Medium"
      }
    ],
    benchmarks: {
      coreSkills: ["Embedded C / C++", "ARM Cortex / STM32 / ESP32", "Hardware Protocols (I2C, SPI, UART)", "Network Cryptography & mTLS", "FreeRTOS Scheduling"],
      minCgpa: 7.2,
      maxBacklogs: 0,
      recommendedCert: "CompTIA Security+ / ARM Accredited Engineer",
      certIssuer: "CompTIA / ARM Holdings",
      certImpact: "Validates both low-level hardware safety and enterprise cyber security posture."
    },
    topRecruiters: [
      { name: "Qualcomm India", roleName: "Associate Embedded Software Engineer", package: "₹14.5 LPA", hiringType: "Super Dream", location: "Bangalore / Hyderabad" },
      { name: "Robert Bosch Engineering", roleName: "Embedded Systems Developer (Automotive)", package: "₹9.2 LPA", hiringType: "Dream", location: "Bangalore / Coimbatore" },
      { name: "Schneider Electric", roleName: "Firmware Verification Engineer", package: "₹8.0 LPA", hiringType: "Dream", location: "Bangalore / Gurgaon" },
      { name: "Tata Elxsi", roleName: "IoT & Embedded Software Associate", package: "₹7.5 LPA", hiringType: "Regular", location: "Pune / Trivandrum" },
      { name: "MP State Cyber Police Directorate", roleName: "Technical Cyber Analyst (State Forensic)", package: "₹7.0 LPA", hiringType: "Regular", location: "Bhopal / Indore" }
    ],
    interviewRounds: [
      {
        roundNumber: 1,
        roundName: "Low-Level C, Bit-Manipulation & Digital Logic Test",
        duration: "75 Minutes",
        focus: "Pointer arithmetic, writing interrupt service routines, register bitmasking, bitwise operations",
        passRate: "16% Candidate Shortlist Rate",
        evaluationCriteria: ["Understanding of memory layout (Heap vs Stack vs BSS)", "Precise handling of volatile variables", "Deterministic execution time awareness"]
      },
      {
        roundNumber: 2,
        roundName: "Hardware Interfacing & Bus Protocol Simulation",
        duration: "60 Minutes",
        focus: "Writing firmware drivers for SPI accelerometer or I2C sensor, handling DMA buffers",
        passRate: "30% Round Clearance Rate",
        evaluationCriteria: ["Correct timing and clock polarity configuration", "Robust error recovery on bus lockup", "Clean state-machine design"]
      },
      {
        roundNumber: 3,
        roundName: "Cyber Security & Vulnerability Analysis Challenge",
        duration: "45 Minutes",
        focus: "Analyzing packet captures in Wireshark, identifying insecure firmware endpoints, buffer overflow mitigations",
        passRate: "48% Round Clearance Rate",
        evaluationCriteria: ["Knowledge of cryptographic standards (AES, SHA-256)", "Secure coding practice in C", "Understanding of attack vectors"]
      },
      {
        roundNumber: 4,
        roundName: "Technical Director Round: Safety Standards & Fitment",
        duration: "30 Minutes",
        focus: "Automotive/Industrial safety (ISO 26262), real-world hardware failure triage, and ethics",
        passRate: "82% Final Offer Conversion",
        evaluationCriteria: ["Safety-first engineering mindset", "Problem diagnosis on physical hardware boards", "Ethical hacking compliance"]
      }
    ],
    candidateFitAnalysis: {
      matchPct: 64,
      fitStatus: "Requires Upskilling",
      strengths: [
        "Strong computer science fundamentals, OS concepts, and clean 8.42 CGPA",
        "Familiarity with network protocols and API security tokenization",
        "High quantitative reasoning score and 0 backlogs standing"
      ],
      gapPriorities: [
        "Hands-on Embedded C register manipulation and microcontroller programming",
        "Hardware bus protocols (UART, SPI, I2C, CAN bus frames)",
        "FreeRTOS task synchronization (Semaphores & Queues)"
      ],
      readinessTip: "Priya currently leans stronger towards Web/Cloud software (86% SDE fit). If choosing Embedded Systems, dedicated practice with an ESP32/STM32 development board and FreeRTOS for 4 weeks is advised."
    },
    capstoneProjects: [
      {
        title: "Cryptographically Secured IoT Environmental Telemetry Node",
        techStack: "Embedded C, ESP32, FreeRTOS, mTLS, MQTT, AWS IoT Core",
        impact: "Achieved tamper-proof sensor data transmission with hardware-accelerated elliptic-curve cryptography."
      },
      {
        title: "Automated CAN Bus Intrusion Detection System for Connected Vehicles",
        techStack: "C++, Raspberry Pi, SocketCAN, Wireshark, Random Forest Classifier",
        impact: "Detected denial-of-service and injection attacks on simulated vehicle bus with 96.4% accuracy under 12ms."
      }
    ]
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
