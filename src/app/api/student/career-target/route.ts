import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const data = serverDb.getCareerTargets();
    return NextResponse.json({ success: true, ...data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { roleId } = await req.json();
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID required" }, { status: 400 });
    }

    const res = serverDb.setActiveCareerTarget(roleId);
    if (!res.success) {
      return NextResponse.json({ success: false, message: "Role not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      activeRole: res.activeRole,
      message: `Active career target set to ${res.activeRole?.title}!`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
