async function testAll() {
  const BASE = "http://localhost:3000";
  console.log("Starting End-to-End API Integration Suite on " + BASE);

  const tests = [
    {
      name: "Auth: /api/auth/me",
      run: async () => {
        const res = await fetch(`${BASE}/api/auth/me`);
        const json = await res.json();
        if (!json.success || !json.user) throw new Error("Auth me failed: " + JSON.stringify(json));
      }
    },
    {
      name: "Auth: /api/auth/login (Student)",
      run: async () => {
        const res = await fetch(`${BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "priya.sharma@rgpv.ac.in", password: "student123", role: "STUDENT" })
        });
        const json = await res.json();
        if (!json.success || json.user.role !== "STUDENT") throw new Error("Student login failed: " + JSON.stringify(json));
      }
    },
    {
      name: "Auth: /api/auth/login (TPO Admin)",
      run: async () => {
        const res = await fetch(`${BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "tpo.director@rgpv.ac.in", password: "admin123", role: "TPO" })
        });
        const json = await res.json();
        if (!json.success || json.user.role !== "TPO") throw new Error("TPO login failed: " + JSON.stringify(json));
      }
    },
    {
      name: "Student: /api/student/profile (GET & PUT)",
      run: async () => {
        const res = await fetch(`${BASE}/api/student/profile`);
        const json = await res.json();
        if (!json.success || !json.profile.skills) throw new Error("Profile GET failed: " + JSON.stringify(json));
      }
    },
    {
      name: "Student: /api/student/career-target (GET & POST)",
      run: async () => {
        const res = await fetch(`${BASE}/api/student/career-target`);
        const json = await res.json();
        if (!json.success || !json.activeId) throw new Error("Career target GET failed: " + JSON.stringify(json));
      }
    },
    {
      name: "Student: /api/student/skill-gap (GET)",
      run: async () => {
        const res = await fetch(`${BASE}/api/student/skill-gap`);
        const json = await res.json();
        if (!json.success || typeof json.analysis.matchPercentage !== "number") throw new Error("Skill gap failed: " + JSON.stringify(json));
      }
    },
    {
      name: "Student: /api/student/readiness-score (GET & POST)",
      run: async () => {
        const res = await fetch(`${BASE}/api/student/readiness-score`, { method: "POST" });
        const json = await res.json();
        if (!json.success || !json.analysis.overallScore) throw new Error("Readiness score failed: " + JSON.stringify(json));
      }
    },
    {
      name: "Student: /api/student/resume (GET & POST Boost)",
      run: async () => {
        const res = await fetch(`${BASE}/api/student/resume`);
        const json = await res.json();
        if (!json.success || !json.analysis.atsScore) throw new Error("Resume GET failed: " + JSON.stringify(json));

        const boostRes = await fetch(`${BASE}/api/student/resume`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "APPLY_BOOST", skillToAdd: "Docker" })
        });
        const boostJson = await boostRes.json();
        if (!boostJson.success) throw new Error("Resume Boost failed: " + JSON.stringify(boostJson));
      }
    },
    {
      name: "Student: /api/student/simulation (POST MCQ & Voice Interview)",
      run: async () => {
        const mcqRes = await fetch(`${BASE}/api/student/simulation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phaseStep: 1,
            title: "Aptitude Assessment",
            score: 95,
            totalQuestions: 5,
            correctAnswers: 5,
            timeSpentSeconds: 150
          })
        });
        const mcqJson = await mcqRes.json();
        if (!mcqJson.success) throw new Error("Simulation MCQ failed: " + JSON.stringify(mcqJson));

        const voiceRes = await fetch(`${BASE}/api/student/simulation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            targetRole: "Full Stack SDE",
            question: "Explain LRU Cache eviction",
            answerText: "LRU cache maintains access order using a hash map and a doubly linked list to achieve O(1) get and put operations.",
            speechMetrics: { wpm: 140, clarity: 90, confidence: 92 }
          })
        });
        const voiceJson = await voiceRes.json();
        if (!voiceJson.success || !voiceJson.submission.rating) throw new Error("Simulation Voice failed: " + JSON.stringify(voiceJson));
      }
    },
    {
      name: "Student: /api/student/roadmap (POST Milestone Toggle)",
      run: async () => {
        const res = await fetch(`${BASE}/api/student/roadmap`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ milestoneId: "p1-t1", isCompleted: true })
        });
        const json = await res.json();
        if (!json.success) throw new Error("Roadmap toggle failed: " + JSON.stringify(json));
      }
    },
    {
      name: "Student: /api/student/placements (GET, Apply, Withdraw)",
      run: async () => {
        const res = await fetch(`${BASE}/api/student/placements`);
        const json = await res.json();
        if (!json.success || !json.drives || !json.governmentOpportunities) throw new Error("Placements GET failed: " + JSON.stringify(json));

        // Find an unapplied drive or withdraw and reapply
        const unappliedDrive = json.drives.find(d => !d.hasApplied) || json.drives[0];
        if (unappliedDrive.hasApplied) {
          await fetch(`${BASE}/api/student/placements?driveId=${unappliedDrive.id}`, { method: "DELETE" });
        }

        const applyRes = await fetch(`${BASE}/api/student/placements`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ driveId: unappliedDrive.id })
        });
        const applyJson = await applyRes.json();
        if (!applyJson.success) throw new Error("Apply failed: " + JSON.stringify(applyJson));
      }
    },
    {
      name: "Notifications: /api/notifications (GET & POST)",
      run: async () => {
        const res = await fetch(`${BASE}/api/notifications`);
        const json = await res.json();
        if (!json.success || !Array.isArray(json.notifications)) throw new Error("Notifications GET failed: " + JSON.stringify(json));
      }
    },
    {
      name: "TPO ERP: /api/tpo/students & /api/tpo/stats",
      run: async () => {
        const res = await fetch(`${BASE}/api/tpo/students`);
        const json = await res.json();
        if (!json.success || !json.students.length) throw new Error("TPO students GET failed: " + JSON.stringify(json));
      }
    },
    {
      name: "Company Recruiter: /api/company/applicants",
      run: async () => {
        const res = await fetch(`${BASE}/api/company/applicants`);
        const json = await res.json();
        if (!json.success || !Array.isArray(json.applicants)) throw new Error("Company applicants GET failed: " + JSON.stringify(json));
      }
    },
    {
      name: "Alumni Mentor: /api/alumni/requests",
      run: async () => {
        const res = await fetch(`${BASE}/api/alumni/requests`);
        const json = await res.json();
        if (!json.success || !Array.isArray(json.mentors)) throw new Error("Alumni requests GET failed: " + JSON.stringify(json));
      }
    },
    {
      name: "AI Assistant: /api/ai/chat (Context Grounded Prompt)",
      run: async () => {
        const res = await fetch(`${BASE}/api/ai/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "What skills should I focus on for my target role?" })
        });
        const json = await res.json();
        if (!json.success || !json.reply) throw new Error("AI chat failed: " + JSON.stringify(json));
      }
    }
  ];

  let passed = 0;
  for (const t of tests) {
    try {
      await t.run();
      console.log(`[PASS] ${t.name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${t.name}:`, err.message);
    }
  }

  console.log(`\nResults: ${passed} of ${tests.length} tests passed successfully.`);
}

testAll();
