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
  Sparkles
} from "lucide-react";

export const STUDENT_STEPS = [
  { step: 2, title: "Profile Onboarding", path: "/student/profile", icon: FileText, tag: "Essential" },
  { step: 3, title: "Target Career", path: "/student/career-target", icon: Target, tag: "Role Match" },
  { step: 4, title: "Drive Eligibility", path: "/student/eligibility", icon: CheckCircle2, tag: "Verification" },
  { step: 5, title: "Simulation Center", path: "/student/simulation", icon: PlayCircle, tag: "6 Modules" },
  { step: 6, title: "Readiness Score", path: "/student/readiness-score", icon: BarChart3, tag: "84% Ready" },
  { step: 7, title: "Skill-Gap Analysis", path: "/student/skill-gap", icon: Split, tag: "Priority Tags" },
  { step: 8, title: "Action Roadmap", path: "/student/roadmap", icon: ListOrdered, tag: "Curated" },
  { step: 9, title: "Reassessment Tracker", path: "/student/reassessment", icon: TrendingUp, tag: "Score History" },
  { step: 10, title: "Alumni Mentorship", path: "/student/alumni-network", icon: Users, tag: "Referrals" },
  { step: 11, title: "Placements Lifecycle", path: "/student/placements", icon: Briefcase, tag: "Live Drives" },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-200/80 p-4 lg:p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Student Flow Progression
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            <Sparkles className="w-3 h-3 text-blue-600" />
            10 Stages
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {STUDENT_STEPS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 translate-x-1"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${
                    active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}>
                    {item.step}
                  </div>
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-700"}`} />
                  <span className="truncate">{item.title}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}>
                    {item.tag}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${active ? "text-white" : "text-slate-400"}`} />
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mini Quick Score Widget */}
      <div className="mt-6 pt-4 border-t border-slate-100 hidden lg:block">
        <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-4 border border-blue-100/60 text-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Overall Readiness</span>
            <span className="text-emerald-600 font-extrabold text-sm">84%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" style={{ width: "84%" }}></div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            Candidate matches 4 active campus drives with 0 backlogs.
          </p>
        </div>
      </div>
    </aside>
  );
}
