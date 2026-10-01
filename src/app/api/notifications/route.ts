import { NextResponse } from "next/server";
import { serverDb, Role } from "@/lib/server/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const role = (searchParams.get("role") as Role) || undefined;

    const data = serverDb.getNotifications(role);
    return NextResponse.json({ success: true, ...data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    serverDb.markNotificationsRead();
    return NextResponse.json({ success: true, message: "All notifications marked as read." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
