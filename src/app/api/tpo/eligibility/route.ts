import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const data = serverDb.getDrivesWithStatus();
    const tpoData = serverDb.getTpoDashboardData();
    return NextResponse.json({
      success: true,
      drives: data.drives,
      studentsCount: tpoData.students.length,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      driveId,
      companyName,
      role,
      ctc,
      minCgpa,
      maxBacklogs,
      allowedBranches,
      requiredSkills,
      minTenthPct,
      minTwelfthPct,
      deadline,
      notes,
    } = body;

    // If driveId is provided, update existing drive eligibility
    if (driveId) {
      const updated = serverDb.updateDriveEligibility(driveId, {
        minCgpa: minCgpa !== undefined ? Number(minCgpa) : undefined,
        maxBacklogs: maxBacklogs !== undefined ? Number(maxBacklogs) : undefined,
        allowedBranches,
        requiredSkills,
        minTenthPct: minTenthPct !== undefined ? Number(minTenthPct) : undefined,
        minTwelfthPct: minTwelfthPct !== undefined ? Number(minTwelfthPct) : undefined,
        deadline,
        ctc,
        role,
        notes,
      });

      if (!updated) {
        return NextResponse.json({ success: false, message: "Drive not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: `Eligibility criteria for ${updated.companyName} (${updated.role}) updated successfully!`,
        drive: updated,
      });
    }

    // Otherwise create a new drive with this eligibility criteria
    if (!companyName || !role) {
      return NextResponse.json({
        success: false,
        message: "Company name and role are required when defining new criteria.",
      }, { status: 400 });
    }

    const created = serverDb.createTpoDrive({
      companyName,
      role,
      ctc: ctc || "8.0 LPA",
      minCgpa: Number(minCgpa) || 6.5,
      maxBacklogs: Number(maxBacklogs) || 0,
      allowedBranches: allowedBranches && allowedBranches.length > 0 ? allowedBranches : ["CSE", "IT", "ECE"],
      deadline: deadline || "2026-11-30",
    });

    return NextResponse.json({
      success: true,
      message: `Eligibility criteria for ${companyName} posted and activated!`,
      drive: created,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  return POST(req);
}
