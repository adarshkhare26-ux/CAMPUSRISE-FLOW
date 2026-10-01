import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const questions = serverDb.getReassessmentQuestions();
    return NextResponse.json({ success: true, questions });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();
    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ success: false, message: "Answers object required" }, { status: 400 });
    }

    const result = serverDb.submitReassessment(answers);
    const updatedReadiness = serverDb.getReadinessAnalysis();

    return NextResponse.json({
      success: true,
      result,
      compositeScore: updatedReadiness.compositeScore,
      message: `Assessment submitted! You scored ${result.scorePct}% (${result.correctCount}/${result.total}). ${
        result.scorePct >= 60 ? "Readiness score boosted by +3%!" : "Review explanations and re-attempt to boost your score."
      }`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
