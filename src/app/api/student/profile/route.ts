import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const profile = serverDb.getStudentProfile();
    return NextResponse.json({ success: true, profile });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updated = serverDb.updateStudentProfile(body);
    return NextResponse.json({ success: true, profile: updated, message: "Profile updated successfully!" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
