import { NextResponse } from "next/server";
import { serverDb, Role } from "@/lib/server/db";

export async function POST(req: Request) {
  try {
    const { email, password, name, role, designationOrBranch, collegeOrCompany } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ success: false, message: "Name, email, and password are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, message: "Password must be at least 6 characters long." }, { status: 400 });
    }

    const assignedRole: Role = ["STUDENT", "TPO", "COMPANY", "ALUMNI"].includes(role) ? role : "STUDENT";

    const res = serverDb.registerUser({
      name,
      email,
      password,
      role: assignedRole,
      designationOrBranch: designationOrBranch || (assignedRole === "STUDENT" ? "Computer Science" : "Member"),
      collegeOrCompany: collegeOrCompany || "University Campus",
    });

    if (!res.success) {
      return NextResponse.json({ success: false, message: res.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      user: res.user,
      message: `Account created successfully! You are now logged in as ${res.user?.name}.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
