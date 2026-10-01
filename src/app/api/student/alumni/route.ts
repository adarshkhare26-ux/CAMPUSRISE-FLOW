import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const data = serverDb.getAlumni();
    return NextResponse.json({ success: true, ...data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { action, alumniId, date, topic, note } = await req.json();

    if (!alumniId) {
      return NextResponse.json({ success: false, message: "Alumni ID required" }, { status: 400 });
    }

    if (action === "MENTORSHIP") {
      const booking = serverDb.bookMentorship(alumniId, date || "Upcoming Saturday 4:00 PM", topic || "Resume & System Design Review");
      return NextResponse.json({
        success: true,
        booking,
        message: "Mentorship session booked successfully! The alumni will receive a Google Calendar invite.",
      });
    }

    if (action === "REFERRAL") {
      const referral = serverDb.requestReferral(alumniId, note || "I am seeking a referral for early-career software roles.");
      return NextResponse.json({
        success: true,
        referral,
        message: "Referral request submitted successfully with your verified CampusRise credentials!",
      });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
