import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const data = serverDb.getDrivesWithStatus();
    const profile = serverDb.getStudentProfile();

    return NextResponse.json({
      success: true,
      drives: data.drives,
      governmentOpportunities: data.governmentOpportunities,
      applications: data.applications,
      profileMetrics: {
        name: profile.name,
        rollNo: profile.rollNo,
        cgpa: profile.cgpa,
        activeBacklogs: profile.activeBacklogs,
        branch: profile.branch,
        skills: profile.skills || [],
        tenthPct: profile.tenthPct || 90.0,
        twelfthPct: profile.twelfthPct || 85.0,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { driveId } = await req.json();
    if (!driveId) {
      return NextResponse.json({ success: false, message: "Drive ID required" }, { status: 400 });
    }

    const res = serverDb.applyToDrive(driveId);
    if (!res.success) {
      return NextResponse.json({ success: false, message: res.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: res.message,
      application: res.application,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const driveId = searchParams.get("driveId");
    if (!driveId) {
      return NextResponse.json({ success: false, message: "Drive ID required" }, { status: 400 });
    }

    const res = serverDb.withdrawApplication(driveId);
    if (!res.success) {
      return NextResponse.json({ success: false, message: res.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: res.message });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
