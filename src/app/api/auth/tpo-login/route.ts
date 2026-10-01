import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
    }

    // Default TPO demo credentials: tpo@campus.edu / admin123
    const isTpo = (email.toLowerCase().includes("tpo") || email.toLowerCase().includes("admin") || email === "tpo@rgpv.ac.in");

    if (isTpo && password.length >= 6) {
      return NextResponse.json({
        success: true,
        user: {
          name: "Dr. Alok Verma",
          designation: "Head Training & Placement Officer",
          college: "RGPV State Technical University",
          email,
          role: "TPO",
        },
        message: "Authentication successful! Redirecting to TPO Command Center...",
      });
    }

    // Fallback permissive login for testing
    if (email && password.length >= 4) {
      return NextResponse.json({
        success: true,
        user: {
          name: "Training & Placement Officer",
          designation: "TPO Officer",
          college: "State University",
          email,
          role: "TPO",
        },
        message: "Login successful!",
      });
    }

    return NextResponse.json({ success: false, message: "Invalid credentials. Password must be at least 4 characters." }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
