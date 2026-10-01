import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const digiLocker = serverDb.getDigiLocker();
    return NextResponse.json({ success: true, digiLocker });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { docId, action } = await req.json();

    if (action === "SYNC_ALL") {
      const digiLocker = serverDb.syncAllDigiLocker();
      return NextResponse.json({
        success: true,
        digiLocker,
        message: "All academic credentials verified with National Academic Depository & DigiLocker!",
      });
    }

    if (!docId) {
      return NextResponse.json({ success: false, message: "Missing docId" }, { status: 400 });
    }

    const res = serverDb.verifyDigiLockerDocument(docId);
    if (!res.success) {
      return NextResponse.json({ success: false, message: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      document: res.document,
      message: "Document digitally verified with SHA-256 cryptographic seal!",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
