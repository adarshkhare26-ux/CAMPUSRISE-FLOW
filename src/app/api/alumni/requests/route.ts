import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const data = serverDb.getAlumniData();
    return NextResponse.json({ success: true, ...data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { type, id, status, notes } = await req.json();

    if (!type || !id || !status) {
      return NextResponse.json({ success: false, message: "Type, ID, and Status are required." }, { status: 400 });
    }

    if (type === "MENTORSHIP") {
      const ok = serverDb.updateMentorshipStatus(id, status);
      if (!ok) return NextResponse.json({ success: false, message: "Mentorship booking not found." }, { status: 404 });
      return NextResponse.json({ success: true, message: `Mentorship request status updated to ${status}.` });
    }

    if (type === "REFERRAL") {
      const ok = serverDb.updateReferralStatus(id, status);
      if (!ok) return NextResponse.json({ success: false, message: "Referral request not found." }, { status: 404 });
      return NextResponse.json({ success: true, message: `Referral status updated to ${status}.` });
    }

    return NextResponse.json({ success: false, message: "Invalid request type." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
