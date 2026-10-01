"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  GraduationCap, 
  Layers,
  ShieldCheck,
  Check
} from "lucide-react";
import { useToast } from "@/components/Toast";

interface CourseItem {
  id: string;
  title: string;
  provider: string;
  portal: "SWAYAM / NPTEL" | "Skill India Digital" | "AWS Academy" | "Google Cloud";
  credits: string;
  duration: string;
  nsqfLevel: string;
  skillsTaught: string[];
  isEnrolled: boolean;
  cost: "Free (Govt Funded)" | "Student Subsidized" | "Free Open Access";
  category: "NEP 2020 Credit Course" | "Industry Certificate" | "Govt Skill Scheme";
}

const COURSES: CourseItem[] = [
  {
    id: "nptel-dsa",
    title: "Programming, Data Structures And Algorithms Using Python / Java",
    provider: "IIT Madras / NPTEL",
    portal: "SWAYAM / NPTEL",
    credits: "3 Academic Credits (NEP 2020 Transferable)",
    duration: "8 Weeks (Self-paced)",
    nsqfLevel: "NSQF Level 6",
    skillsTaught: ["Data Structures", "Dynamic Programming", "Time Complexity", "Graph Algorithms"],
    isEnrolled: true,
    cost: "Free (Govt Funded)",
    category: "NEP 2020 Credit Course",
  },
  {
    id: "skill-india-cloud",
    title: "Cloud Infrastructure, Containerization & Docker Orchestration",
    provider: "National Skill Development Corporation (NSDC)",
    portal: "Skill India Digital",
    credits: "Skill India Digital Micro-Credential",
    duration: "4 Weeks (Hands-on Labs)",
    nsqfLevel: "NSQF Level 5",
    skillsTaught: ["Docker", "Kubernetes Basics", "Microservices", "Linux CLI"],
    isEnrolled: false,
    cost: "Free (Govt Funded)",
    category: "Govt Skill Scheme",
  },
  {
    id: "aws-cloud-arch",
    title: "AWS Cloud Solutions Architect — Student Track",
    provider: "Amazon Web Services (AWS Academy)",
    portal: "AWS Academy",
    credits: "Industry Recognized Global Certification",
    duration: "6 Weeks",
    nsqfLevel: "Industry Standard",
    skillsTaught: ["AWS EC2", "S3 Storage", "IAM Security", "Serverless Lambda"],
    isEnrolled: false,
    cost: "Student Subsidized",
    category: "Industry Certificate",
  },
  {
    id: "google-data-analytics",
    title: "Google Cloud Data Engineering & BigQuery Foundations",
    provider: "Google Cloud Career Launchpad",
    portal: "Google Cloud",
    credits: "Digital Badge + DigiLocker Linked",
    duration: "5 Weeks",
    nsqfLevel: "NSQF Level 6 Equivalent",
    skillsTaught: ["SQL Optimization", "BigQuery", "Data Pipelines", "Looker Studio"],
    isEnrolled: false,
    cost: "Free Open Access",
    category: "Industry Certificate",
  },
];

export function RecommendedCoursesSection() {
  const { toast } = useToast();
  const [coursesList, setCoursesList] = useState<CourseItem[]>(COURSES);

  const handleEnroll = (id: string, title: string) => {
    setCoursesList(prev => prev.map(c => c.id === id ? { ...c, isEnrolled: !c.isEnrolled } : c));
    toast(`Course status updated for "${title}"! Academic credit tracker updated.`, "success");
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>National Curriculum &amp; Credit Framework</span>
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Recommended Online Courses &amp; Certifications
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Curated national courses aligned with <strong>NEP 2020 Academic Credits</strong>, <strong>SWAYAM/NPTEL</strong>, and <strong>Skill India Digital</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            DigiLocker Transferable
          </span>
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coursesList.map((course) => (
          <div
            key={course.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              course.isEnrolled
                ? "bg-emerald-50/30 border-emerald-200 shadow-xs"
                : "bg-slate-50/60 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
            }`}
          >
            <div>
              {/* Badges Bar */}
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {course.portal}
                </span>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  course.cost.includes("Free")
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-purple-100 text-purple-800"
                }`}>
                  {course.cost}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                {course.title}
              </h3>
              <div className="text-xs text-slate-500 mt-1 font-medium">
                Offered by: <strong className="text-slate-700">{course.provider}</strong>
              </div>

              {/* Course Meta Info */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/60 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Duration</span>
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> {course.duration}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">National Framework</span>
                  <span className="font-semibold text-slate-700">{course.nsqfLevel}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Bridges Skill Gaps:
                </div>
                <div className="flex flex-wrap gap-1">
                  {course.skillsTaught.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500">
                {course.credits}
              </span>

              <button
                type="button"
                onClick={() => handleEnroll(course.id, course.title)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  course.isEnrolled
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                }`}
              >
                {course.isEnrolled ? <Check className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                <span>{course.isEnrolled ? "Enrolled & Tracking" : "Enroll via Portal"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* NEP 2020 Academic Bank of Credits (ABC) Footnote */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 flex items-start gap-3">
        <GraduationCap className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
        <div>
          <div className="font-extrabold text-indigo-900">National Education Policy (NEP 2020) Credit Integration</div>
          <div className="text-indigo-700 mt-0.5 text-[11px] leading-relaxed">
            Certifications completed on SWAYAM/NPTEL auto-synchronize with your <strong>Academic Bank of Credits (ABC / APAAR ID: APAAR-6291-0941-8812)</strong> and directly reflect as institutional credits on your university transcript.
          </div>
        </div>
      </div>

    </div>
  );
}
