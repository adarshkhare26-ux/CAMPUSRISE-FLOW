import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const csvContent = serverDb.exportPlacementCsv();
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="campusrise_placement_report_2026.csv"',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
