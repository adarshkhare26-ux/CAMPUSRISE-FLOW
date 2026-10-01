import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get("company") || undefined;
    const data = serverDb.getCompanyApplicants(company);
    return NextResponse.json({ success: true, drives: data.drives });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, role, ctc, minCgpa, maxBacklogs, deadline, allowedBranches } = body;

    if (!companyName || !role) {
      return NextResponse.json({ success: false, message: "Company name and job role are required." }, { status: 400 });
    }

    const created = serverDb.createTpoDrive({
      companyName,
      role,
      ctc: ctc || "10.0 LPA",
      minCgpa: Number(minCgpa) || 7.0,
      maxBacklogs: Number(maxBacklogs) || 0,
      deadline: deadline || "2026-11-20",
      allowedBranches: allowedBranches || ["CSE", "IT", "ECE"],
    });

    return NextResponse.json({
      success: true,
      drive: created,
      message: `Recruitment drive for "${role}" posted successfully! It is now active for eligible university candidates.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
