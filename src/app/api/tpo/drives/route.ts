import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const data = serverDb.getDrivesWithApplications();
    return NextResponse.json({ success: true, drives: data.drives });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, role, title, ctc, location, minCgpa, maxBacklogs, deadline } = body;

    if (!companyName || !role) {
      return NextResponse.json({ success: false, message: "Company name and role are required" }, { status: 400 });
    }

    const created = serverDb.createTpoDrive({
      companyName,
      logo: "🏢",
      role,
      title: title || `${role} - 2026 Batch`,
      ctc: ctc || "8.5 LPA",
      location: location || "Pan India / Hybrid",
      deadline: deadline || "Oct 30, 2026",
      minCgpa: Number(minCgpa) || 6.5,
      maxBacklogs: Number(maxBacklogs) || 0,
      allowedBranches: ["CSE", "IT", "ECE"],
      status: "Active",
      eligibility: {
        minCgpa: Number(minCgpa) || 6.5,
        maxBacklogs: Number(maxBacklogs) || 0,
        branches: ["CSE", "IT", "ECE"],
      },
      tags: ["On-Campus", "Full-time", "TPO Approved"],
    });

    return NextResponse.json({
      success: true,
      drive: created,
      message: `Placement drive for ${companyName} posted successfully! It is now live on the Student Portal.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { driveId, minCgpa, maxBacklogs, allowedBranches, deadline, ctc, role } = body;

    if (!driveId) {
      return NextResponse.json({ success: false, message: "Drive ID required" }, { status: 400 });
    }

    const updated = serverDb.updateDriveEligibility(driveId, {
      minCgpa: minCgpa !== undefined ? Number(minCgpa) : undefined,
      maxBacklogs: maxBacklogs !== undefined ? Number(maxBacklogs) : undefined,
      allowedBranches,
      deadline,
      ctc,
      role,
    });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Drive not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Eligibility updated for ${updated.companyName}!`,
      drive: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

