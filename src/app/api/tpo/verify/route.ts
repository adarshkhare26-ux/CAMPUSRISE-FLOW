import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function POST(req: Request) {
  try {
    const { verificationId, status } = await req.json();
    if (!verificationId) {
      return NextResponse.json({ success: false, message: "Verification ID required" }, { status: 400 });
    }

    const updated = serverDb.verifyStudentDocumentByTpo(verificationId, status || "VERIFIED");
    return NextResponse.json({
      success: true,
      verification: updated,
      message: `Document status updated to ${status || "VERIFIED"} by Training & Placement Officer!`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
