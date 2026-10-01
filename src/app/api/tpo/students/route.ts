import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const branch = searchParams.get("branch");
    const search = searchParams.get("search");
    const interventionOnly = searchParams.get("intervention") === "true";

    const data = serverDb.getTpoDashboardData();
    let students = data.students;

    if (branch && branch !== "all") {
      students = students.filter((s) => s.branch === branch);
    }

    if (search) {
      const q = search.toLowerCase();
      students = students.filter(
        (s) => s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
      );
    }

    if (interventionOnly) {
      students = students.filter((s) => s.readiness < 70 || s.backlogs > 0);
    }

    return NextResponse.json({
      success: true,
      students,
      totalCount: students.length,
      stats: data.stats,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
