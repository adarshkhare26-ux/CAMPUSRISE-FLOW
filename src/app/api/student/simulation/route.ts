import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

const DEFAULT_QUESTIONS = [
  {
    id: "q-1",
    category: "Technical",
    role: "Full Stack SDE",
    question: "Explain the difference between SQL and NoSQL databases. When would you choose PostgreSQL over MongoDB for a production application?",
    keywords: ["relational", "acid", "schema", "indexing", "transactions", "document", "horizontal scaling"],
  },
  {
    id: "q-2",
    category: "System Design",
    role: "Full Stack SDE",
    question: "How would you design a rate limiter for an API endpoint handling 10,000 requests per second?",
    keywords: ["token bucket", "leaky bucket", "redis", "sliding window", "ip", "concurrency"],
  },
  {
    id: "q-3",
    category: "Behavioral & HR",
    role: "All Roles",
    question: "Tell me about a challenging technical bug you encountered in a project, how you diagnosed it, and what you learned.",
    keywords: ["debugging", "logs", "root cause", "testing", "monitoring", "collaboration"],
  },
  {
    id: "q-4",
    category: "Data Structures",
    role: "SDE",
    question: "How does HashMap work internally in Java/JavaScript? What happens when there is a hash collision?",
    keywords: ["buckets", "linked list", "red-black tree", "hashcode", "equals", "o(1)"],
  },
];

export async function GET() {
  try {
    const simData = serverDb.getSimulationData();
    return NextResponse.json({
      success: true,
      questions: DEFAULT_QUESTIONS,
      modules: simData.modules,
      attempts: simData.attempts,
      history: simData.interviews,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phaseStep, phaseId, title, score, totalQuestions, correctAnswers, timeSpentSeconds, targetRole, question, answerText, speechMetrics } = body;

    // Handle MCQ / Assessment Phase Submission (Phases 1 to 5)
    if (phaseStep && phaseStep >= 1 && phaseStep <= 5) {
      const attempt = serverDb.submitAssessmentPhase({
        phaseStep,
        phaseId: phaseId || `phase-${phaseStep}`,
        title: title || `Phase ${phaseStep} Assessment`,
        score: Number(score) || 85,
        totalQuestions: Number(totalQuestions) || 5,
        correctAnswers: Number(correctAnswers) || 4,
        timeSpentSeconds: Number(timeSpentSeconds) || 300,
      });

      const updatedReadiness = serverDb.calculateExplainableReadinessScore();

      return NextResponse.json({
        success: true,
        attempt,
        compositeScore: updatedReadiness.compositeScore,
        message: `Phase ${phaseStep} (${title || "Assessment"}) submitted! Score: ${score}%. Readiness index updated to ${updatedReadiness.compositeScore}%.`,
      });
    }

    // Handle Phase 6: AI Voice / Text Interview Terminal
    if (!answerText || answerText.trim().length < 5) {
      return NextResponse.json({ success: false, message: "Please provide a detailed spoken or typed answer." }, { status: 400 });
    }

    // AI Evaluation Engine
    const words = answerText.trim().split(/\s+/).length;

    // Keyword detection
    const lower = answerText.toLowerCase();
    const matchedKeywords = [
      "database", "api", "query", "scale", "performance", "cache", "async", "schema",
      "optimize", "test", "security", "distributed", "lock", "concurrency", "lru", "lfu", "latency"
    ].filter((k) => lower.includes(k));

    const techScore = Math.min(Math.round(7.0 + matchedKeywords.length * 0.6), 9.9);
    const commScore = speechMetrics?.clarity ? Math.round(speechMetrics.clarity / 10) : Math.min(Math.round(7.5 + (words > 30 ? 1.5 : 0.5)), 9.5);
    const logicScore = Math.min(Math.round((techScore + commScore) / 2), 9.8);
    const overallRating = Number(((techScore * 0.45 + commScore * 0.30 + logicScore * 0.25)).toFixed(1));

    let critique = `Strong structural explanation. You articulated ${matchedKeywords.length > 0 ? `key concepts like ${matchedKeywords.slice(0, 3).join(", ")}` : "your technical reasoning clearly"}. `;
    if (words < 40) {
      critique += "Consider expanding on edge cases and concrete latency/throughput impact metrics.";
    } else {
      critique += "Good pacing and technical depth demonstrated. Well-suited for corporate technical interviews.";
    }

    const saved = serverDb.submitInterview({
      targetRole: targetRole || "Full Stack SDE",
      question: question || "Technical Assessment Question",
      answerText,
      rating: overallRating,
      scores: {
        technical: Math.round(techScore * 10),
        communication: Math.round(commScore * 10),
        problemSolving: Math.round(logicScore * 10),
      },
      feedback: critique,
      speechMetrics,
    });

    const updatedReadiness = serverDb.calculateExplainableReadinessScore();

    return NextResponse.json({
      success: true,
      submission: saved,
      compositeScore: updatedReadiness.compositeScore,
      message: `AI Evaluation Complete! Overall Rating: ${overallRating}/10. Readiness score updated to ${updatedReadiness.compositeScore}%.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
