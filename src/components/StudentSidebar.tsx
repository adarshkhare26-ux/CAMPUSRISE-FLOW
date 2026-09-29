"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FileText, 
  Target, 
  CheckCircle2, 
  PlayCircle, 
  BarChart3, 
  Split, 
  ListOrdered, 
  TrendingUp, 
  Users, 
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Compass,
  GraduationCap
} from "lucide-react";

export interface StudentSectionGroup {
  id: string;
  sectionNumber: number;
  sectionTitle: string;
  badge: string;
  steps: Array<{
    step: number;
    title: string;
    path: string;
    icon: any;
    tag: string;
  }>;
}

export const STUDENT_SECTIONS: StudentSectionGroup[] = [
  {
    id: "sec-1",
    sectionNumber: 1,
    sectionTitle: "Onboarding & Eligibility",
    badge: "Steps 2 - 4",
    steps: [
      { step: 2, title: "Profile & DigiLocker", path: "/student/profile", icon: FileText, tag: "DigiLocker" },
      { step: 3, title: "Target Career", path: "/student/career-target", icon: Target, tag: "Role Match" },
      { step: 4, title: "Drive Eligibility", path: "/student/eligibility", icon: CheckCircle2, tag: "Verification" },
    ],
  },
  {
    id: "sec-2",
    sectionNumber: 2,
    sectionTitle: "Assessment & AI Readiness",
    badge: "Steps 5 - 7",
    steps: [
      { step: 5, title: "Simulation Center", path: "/student/simulation", icon: PlayCircle, tag: "6 Modules" },
      { step: 6, title: "Readiness Score", path: "/student/readiness-score", icon: BarChart3, tag: "84% Ready" },
      { step: 7, title: "Skill-Gap Analysis", path: "/student/skill-gap", icon: Split, tag: "Priority Tags" },
    ],
  },
  {
    id: "sec-3",
    sectionNumber: 3,
    sectionTitle: "Career Roadmap & Mentorship",
    badge: "Steps 8 - 10",
    steps: [
      { step: 8, title: "Action Roadmap", path: "/student/roadmap", icon: ListOrdered, tag: "Curated" },
      { step: 9, title: "Reassessment Tracker", path: "/student/reassessment", icon: TrendingUp, tag: "Score History" },
      { step: 10, title: "Alumni Mentorship", path: "/student/alumni-network", icon: Users, tag: "Referrals" },
    ],
  },
  {
    id: "sec-4",
    sectionNumber: 4,
    sectionTitle: "Corporate Placements",
    badge: "Step 11",
    steps: [
      { step: 11, title: "Placements Lifecycle", path: "/student/placements", icon: Briefcase, tag: "Live Drives" },
    ],
  },
];

export const STUDENT_STEPS = STUDENT_SECTIONS.flatMap(s => s.steps);

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-200/80 p-4 lg:p-5 flex flex-col justify-between">
      <div className="space-y-4">
        
        {/* Sidebar Header */}
        <div className="px-1 flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Student Flow Progression
          </span>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            4 Sections
          </span>
        </div>

        {/* 4 Distinct Section Containers */}
        <div className="space-y-4">
          {STUDENT_SECTIONS.map((sec) => {
            const isSectionActive = sec.steps.some(s => s.path === pathname);

            return (
              <div 
                key={sec.id}
                className={`rounded-2xl transition-all p-2 border ${
                  isSectionActive 
                    ? "bg-slate-50/90 border-slate-300/80 shadow-sm" 
                    : "bg-transparent border-slate-100 hover:border-slate-200"
                }`}
              >
                {/* Section Header */}
                <div className="flex items-center justify-between px-2 py-1.5 mb-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isSectionActive ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
                    }`}></span>
                    <span className={`text-[10px] font-black uppercase tracking-wider truncate ${
                      isSectionActive ? "text-slate-800" : "text-slate-400"
                    }`}>
                      Section {sec.sectionNumber}: {sec.sectionTitle}
                    </span>
                  </div>

                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded shrink-0 ${
                    isSectionActive 
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                      : "bg-slate-100 text-slate-400"
                  }`}>
                    {sec.badge}
                  </span>
                </div>

                {/* Steps in this Section */}
                <nav className="flex flex-col gap-1">
                  {sec.steps.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.path;

                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                          active
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 translate-x-0.5"
                            : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                            active ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-500 group-hover:bg-slate-300"
                          }`}>
                            {item.step}
                          </div>
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-700"}`} />
                          <span className="truncate">{item.title}</span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                            active
                              ? "bg-white/20 text-white"
                              : "bg-slate-200/60 text-slate-500 group-hover:bg-slate-300"
                          }`}>
                            {item.tag}
                          </span>
                          <ChevronRight className={`w-3 h-3 opacity-60 ${active ? "text-white" : "text-slate-400"}`} />
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            );
          })}
        </div>

      </div>

      {/* Mini Quick Score Widget & DigiLocker Badge */}
      <div className="mt-6 pt-4 border-t border-slate-100 hidden lg:block space-y-3">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/70 rounded-2xl p-3.5 border border-blue-200/80 text-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-blue-950 mb-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              DigiLocker Vault
            </span>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200">
              5 Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-600 font-medium">
            10th, 12th, B.Tech &amp; Aadhaar authenticated with SHA-256 signatures.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/70 rounded-2xl p-4 border border-emerald-100 text-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Overall Readiness</span>
            <span className="text-emerald-600 font-extrabold text-sm">84%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style={{ width: "84%" }}></div>
          </div>
          <p className="text-[11px] text-slate-600 mt-2 font-medium">
            Candidate matches 4 active campus drives with 0 backlogs.
          </p>
        </div>
      </div>
    </aside>
  );
}
