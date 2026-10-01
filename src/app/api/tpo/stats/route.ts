import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const data = serverDb.getTpoDashboardData();
    return NextResponse.json({ success: true, ...data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
