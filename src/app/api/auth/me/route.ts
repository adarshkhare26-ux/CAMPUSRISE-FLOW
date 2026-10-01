import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
      const user = serverDb.getUserByEmail(email);
      if (user) {
        return NextResponse.json({ success: true, user });
      }
    }

    // Default active student session
    const student = serverDb.getStudentProfile();
    return NextResponse.json({
      success: true,
      user: {
        id: "usr-student-1",
        email: student.email,
        name: student.name,
        role: "STUDENT",
        designationOrBranch: student.branch,
        collegeOrCompany: student.college,
        avatar: "PS",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
