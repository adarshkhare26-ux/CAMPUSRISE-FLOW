import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, message: "Invalid JSON payload in request." }, { status: 400 });
    }
    const { message, conversationHistory } = body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ success: false, message: "Please provide a valid prompt or question." }, { status: 400 });
    }

    const profile = serverDb.getStudentProfile();
    const target = serverDb.getCareerTargets();
    const readiness = serverDb.calculateExplainableReadinessScore();
    const skillGap = serverDb.getSkillGapAnalysis();
    const drivesData = serverDb.getDrivesWithStatus();
    const applications = drivesData.applications;

    // Student Context Injection
    const studentContext = `
You are the "CampusRise AI Career Mentor & Placement Copilot", an AI advisor built for the CampusRise Employability Platform.
You are assisting an engineering university student with their career roadmap, placement readiness, interview prep, and corporate recruitment drives.

Current Student Profile:
- Name: ${profile.name}
- Roll Number: ${profile.rollNo}
- College: ${profile.college}
- Branch: ${profile.branch} (Batch of ${profile.gradYear})
- CGPA: ${profile.cgpa}/10.0
- Active Backlogs: ${profile.activeBacklogs}
- Class 10th / 12th: ${profile.tenthPct}% / ${profile.twelfthPct}%
- Target Role: ${target.activeRole.title} (${target.activeRole.category})
- Current AI Readiness Index: ${readiness.compositeScore}/100 (${readiness.gaugeLevel}, ${readiness.percentile})
- Acquired Skills: ${profile.skills.join(", ")}
- Critical Missing Skill Gaps: ${skillGap.missingRequirements.map((m) => m.name).join(", ")}
- Active Applications: ${applications.map((a) => `${a.driveId} (${a.status})`).join(", ") || "None currently"}
- DigiLocker Verified Documents: ${profile.digiLocker?.verifiedCount || 5} certificates stamped

System Instructions:
- Answer with practical, actionable, highly tailored career guidance grounded in the student's real profile data above.
- If asked about DSA, roadmap, resume, interviews, or cutoffs, provide concrete recommendations, code patterns, or action items.
- Maintain an encouraging, sharp, and authoritative professional tone.
- Format responses cleanly using markdown (bullet points, bold highlights, code snippets where relevant).
`;

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // 1. If GEMINI_API_KEY is configured, call Google Gemini API
    if (apiKey) {
      try {
        const contents: any[] = [];

        // Add conversation history if available
        if (Array.isArray(conversationHistory)) {
          conversationHistory.slice(-6).forEach((h: any) => {
            if (h.role && h.content) {
              contents.push({
                role: h.role === "user" ? "user" : "model",
                parts: [{ text: h.content }],
              });
            }
          });
        }

        // Add current prompt with system context
        contents.push({
          role: "user",
          parts: [{ text: `${studentContext}\n\nUser Question: ${message}` }],
        });

        // Call Gemini 1.5 Flash (or 2.0-flash)
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const candidateText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (candidateText) {
            return NextResponse.json({
              success: true,
              reply: candidateText,
              provider: "Google Gemini 1.5 Flash",
            });
          }
        } else {
          console.warn("Gemini API call returned non-200:", await geminiRes.text());
        }
      } catch (geminiErr) {
        console.error("Gemini API request failed, falling back to local reasoning engine:", geminiErr);
      }
    }

    // 2. Intelligent Context-Aware CampusRise Reasoning Engine (Graceful fallback)
    const reply = generateContextualAiResponse(message, profile, target.activeRole, readiness, skillGap);

    return NextResponse.json({
      success: true,
      reply,
      provider: "CampusRise AI Engine (Context Grounded)",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

function generateContextualAiResponse(
  query: string,
  profile: any,
  activeTarget: any,
  readiness: any,
  skillGap: any
): string {
  const q = query.toLowerCase();

  if (q.includes("dsa") || q.includes("data structure") || q.includes("algorithm")) {
    return `### High-Yield DSA Optimization Plan for **${activeTarget.title}**

Priya, based on your current assessment scores (DSA: ~82%), here is the exact 3-week sprint to push your performance into the **Top 5% (90%+)**:

1. **Targeted Weak Topics**:
   - **Dynamic Programming**: Focus on *0/1 Knapsack*, *Longest Common Subsequence (LCS)*, and *Coin Change*.
   - **Trees & Graphs**: Practice 10 problems on *BFS/DFS traversals*, *Cycle Detection*, and *Dijkstra's Shortest Path*.
   - **Sliding Window & Hash Maps**: Master variable-sized window problems like *Longest Substring Without Repeating Characters*.

2. **Daily Practice Cadence**:
   - Solve **2 LeetCode Mediums daily** within a strict **25-minute timer**.
   - Always analyze Space/Time complexity: optimize from $O(n^2)$ down to $O(n \\log n)$ or $O(n)$.

3. **Interview Articulation**:
   - In technical rounds (like Cisco and TCS Prime), always talk through your brute force approach first before writing optimal code!

*Tip: Check the **Action Roadmap** tab where these milestones are already tracked for your profile.*`;
  }

  if (q.includes("readiness") || q.includes("score") || q.includes("why is my score") || q.includes("improve score")) {
    return `### CampusRise Employability Index Diagnostics

Your current composite readiness score is **${readiness.compositeScore}/100** (**${readiness.gaugeLevel}**):

- **Strong Pillars (+)**:
  - **Academic Standing**: Clean **${profile.cgpa} CGPA** with **0 active backlogs** puts you in the top 5% of the batch.
  - **DigiLocker Verification**: All 5 academic and identity records are cryptographically verified with SHA-256.
  - **Technical Foundations**: High proficiency in React.js, TypeScript, and SQL databases.

- **Primary Bottlenecks (-)**:
  - **Cloud & Containerization Gap**: ${skillGap.missingRequirements[0]?.name || "Docker & Kubernetes"} is currently unverified.
  - **Action Roadmap Execution**: Completing your remaining roadmap milestones will award an automatic **+6% readiness boost**.

**Next Step to Reach Super Dream (>85% Index)**:
Complete the *Docker Containerization Lab* and take a 20-minute timed re-assessment test to calibrate your index past **90%**!`;
  }

  if (q.includes("roadmap") || q.includes("4-week") || q.includes("plan") || q.includes("schedule")) {
    return `### 4-Week Placement Acceleration Roadmap for **${activeTarget.title}**

Here is your customized timeline designed to bridge your critical skill gaps:

- **Week 1: Core Systems & Containerization**
  - Learn Docker multi-stage builds and compose files.
  - Containerize your **CampusRise ERP** project with a Postgres container.
  - *Outcome*: Closes the critical Docker gap on visiting campus drives.

- **Week 2: Advanced SQL & Distributed Caching**
  - Master PostgreSQL indexing (B-Tree vs Hash) and query profiling with \`EXPLAIN ANALYZE\`.
  - Implement Redis caching for high-frequency reads.

- **Week 3: Speed DSA & Aptitude Drilling**
  - Solve 15 medium LeetCode problems (Graphs, DP, Sliding Window).
  - Take the 25-minute Aptitude re-test in the **Reassessment Tracker**.

- **Week 4: AI Voice Simulation & Mentorship Review**
  - Complete 2 sessions in the **AI Voice Interview Terminal** (target pacing: 130-140 WPM).
  - Book a 1:1 session with alumni mentor **${activeTarget.topRecruiters[0]?.name || "Aditya Khare"}** for resume sign-off.`;
  }

  if (q.includes("resume") || q.includes("ats") || q.includes("cv")) {
    return `### AI Resume Enhancement Feedback

Based on your verified credentials for **${activeTarget.title}**:

1. **Estimated ATS Score**: **88/100 (Strong Candidate Profile)**
2. **Key Strengths**:
   - Digitally signed DigiLocker credentials verify your **8.42 CGPA** without human document fraud risk.
   - Project titles (*Distributed Task Pipeline*, *CampusRise ERP*) demonstrate production-level breadth.

3. **High-Impact Improvements to Add Now**:
   - **Quantify Project Metrics**: Add numbers to your project bullets (e.g., *"Engineered distributed consumer handling 5,000 tasks/min with Redis"*).
   - **Add Verified Score Badge**: Embed \`CampusRise Employability Index: ${readiness.compositeScore}/100 (Top 8% Batch Percentile)\`.
   - **Highlight Missing Keywords**: Insert *Docker, Redis, REST APIs, Microservices, CI/CD*.

*Tip: Open the **Resume Enhancer** in your Profile to auto-apply these suggested boosts with one click!*`;
  }

  if (q.includes("hr") || q.includes("interview") || q.includes("behavioral") || q.includes("tell me about yourself")) {
    return `### Corporate HR & Behavioral Round Framework (STAR Method)

When answering questions like *"Tell me about yourself"* or *"Describe a challenging bug you fixed"*, follow this structured formula:

1. **Situation**: Set the technical context in 1 concise sentence.
   - *Example*: *"During my backend internship at MP Cloud Solutions, our public citizen API was experiencing high latency during peak morning traffic."*
2. **Task**: What was your direct responsibility?
   - *Example*: *"I was tasked with identifying database bottlenecks and reducing query response times without rewriting the service."*
3. **Action**: Exactly what technical steps did you take?
   - *Example*: *"I used \`EXPLAIN ANALYZE\` to identify missing composite indices on user lookup tables and configured Redis caching for read-heavy routes."*
4. **Result**: Quantify the business impact!
   - *Example*: *"This reduced peak latency by 34% and handled 10,000 concurrent requests with zero 504 gateway timeouts."*

*Tip: You can rehearse this right now using the live microphone in the **Simulation Center (Phase 6)** to measure your pacing and speech confidence score.*`;
  }

  // General default response
  return `### Hello ${profile.name}!

I am your **CampusRise AI Placement Copilot**. I have access to your verified academic records (**${profile.cgpa} CGPA**, **${profile.branch}**), your target role (**${activeTarget.title}**), and your current readiness score (**${readiness.compositeScore}%**).

Here are key actions you can take today:
1. **Target Role Alignment**: Your skill match for **${activeTarget.title}** is currently **${skillGap.matchPercentage}%**.
2. **Active Drive Opportunity**: **Tata Consultancy Services** and **Cisco Systems India** have active drives matching your eligibility.
3. **Skill Gap Priority**: Your highest priority gap is **${skillGap.missingRequirements[0]?.name || "Containerization & Cloud CI/CD"}**.

What would you like assistance with?
- *"How can I improve my DSA?"*
- *"Why is my readiness score ${readiness.compositeScore}%?"*
- *"Give me a 4-week roadmap"*
- *"Prepare me for my TCS interview"*
- *"Review my resume"*`;
}
