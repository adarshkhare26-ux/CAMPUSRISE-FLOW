import { NextResponse } from "next/server";
import { serverDb, ApplicationRecord } from "@/lib/server/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get("company") || undefined;
    const data = serverDb.getCompanyApplicants(company);
    return NextResponse.json({ success: true, ...data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { applicationId, status, notes } = await req.json();

    if (!applicationId || !status) {
      return NextResponse.json({ success: false, message: "applicationId and status are required." }, { status: 400 });
    }

    const updated = serverDb.updateApplicationStage(applicationId, status as ApplicationRecord["status"], notes);
    if (!updated) {
      return NextResponse.json({ success: false, message: "Application record not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      application: updated,
      message: `Applicant stage updated to "${status}" successfully! Candidate has been notified.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
