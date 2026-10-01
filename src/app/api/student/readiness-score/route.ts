import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const analysis = serverDb.getReadinessAnalysis();
    return NextResponse.json({ success: true, analysis });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const updated = serverDb.recalculateReadiness();
    return NextResponse.json({
      success: true,
      analysis: updated,
      message: `Readiness score re-computed based on latest marks and credentials: ${updated.compositeScore}%!`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
