import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const milestones = serverDb.getRoadmap();
    return NextResponse.json({ success: true, milestones, playlist: milestones });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { milestoneId, isCompleted } = await req.json();
    if (!milestoneId) {
      return NextResponse.json({ success: false, message: "Milestone ID required" }, { status: 400 });
    }

    const updated = serverDb.toggleRoadmapMilestone(milestoneId, isCompleted);
    const readiness = serverDb.calculateExplainableReadinessScore();

    return NextResponse.json({
      success: true,
      milestones: updated,
      playlist: updated,
      compositeScore: readiness.compositeScore,
      message: `Milestone marked as ${isCompleted ? "completed" : "pending"}! Readiness score: ${readiness.compositeScore}%.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
