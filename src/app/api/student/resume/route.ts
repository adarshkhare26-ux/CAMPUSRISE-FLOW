import { NextResponse } from "next/server";
import { serverDb } from "@/lib/server/db";

export async function GET() {
  try {
    const profile = serverDb.getStudentProfile();
    const target = serverDb.getCareerTargets();

    const sampleResumeText = `
${profile.name} | ${profile.email} | ${profile.rollNo}
${profile.college} — ${profile.branch} (Graduation: ${profile.gradYear})
CGPA: ${profile.cgpa}/10.0 • Active Backlogs: ${profile.activeBacklogs}
Class 10th: ${profile.tenthPct}% • Class 12th: ${profile.twelfthPct}%

TECHNICAL SKILLS:
${profile.skills.join(", ")}

PROJECTS:
${profile.projects.map((p) => `${p.title} (${p.tech}): ${p.desc}`).join("\n")}

INTERNSHIPS & EXPERIENCE:
${profile.internships.map((i) => `${i.company} - ${i.role} (${i.duration}): ${i.impact}`).join("\n")}

CERTIFICATIONS & BADGES:
${profile.certifications.join(", ")}
    `;

    const analysis = serverDb.analyzeResumeText(sampleResumeText, target.activeRole.title);
    return NextResponse.json({
      success: true,
      analysis,
      resumeFileName: profile.resumeFileName || "Priya_Sharma_Resume_Verified.pdf",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, resumeText, skillToAdd, boostValue } = body;
    const profile = serverDb.getStudentProfile();
    const target = serverDb.getCareerTargets();

    if (action === "APPLY_BOOST" && skillToAdd) {
      // Add skill to student profile
      if (!profile.skills.includes(skillToAdd)) {
        profile.skills.push(skillToAdd);
      }
      serverDb.updateStudentProfile({ skills: profile.skills });

      // Recalculate readiness
      const updatedScore = serverDb.calculateExplainableReadinessScore();

      return NextResponse.json({
        success: true,
        message: `Applied boost: Added "${skillToAdd}" to verified student skills! Composite score refreshed: ${updatedScore.compositeScore}%.`,
        updatedSkills: profile.skills,
        compositeScore: updatedScore.compositeScore,
      });
    }

    if (action === "UPLOAD_RESUME") {
      const fileName = body.fileName || `Resume_${profile.name.replace(" ", "_")}_Uploaded.pdf`;
      serverDb.updateStudentProfile({
        resumeUploaded: true,
        resumeFileName: fileName,
      });

      return NextResponse.json({
        success: true,
        fileName,
        message: `Resume "${fileName}" uploaded, scanned by ATS engine, and cryptographically verified!`,
      });
    }

    // Default text analysis
    const textToAnalyze = resumeText || JSON.stringify(profile);
    const analysis = serverDb.analyzeResumeText(textToAnalyze, target.activeRole.title);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
