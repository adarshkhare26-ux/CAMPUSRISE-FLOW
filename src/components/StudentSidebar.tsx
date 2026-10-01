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
  Sparkles
} from "lucide-react";

export interface StudentStep {
  step: number;
  title: string;
  subtitle: string;
  path: string;
  icon: any;
  tag: string;
}

// 10 Individual Sequential Steps (Alag Alag - No 4 Section Grouping)
export const STUDENT_STEPS: StudentStep[] = [
  { step: 2, title: "Profile & DigiLocker", subtitle: "Identity & Academics", path: "/student/profile", icon: FileText, tag: "DigiLocker" },
  { step: 3, title: "Target Career", subtitle: "Industry Role Weights", path: "/student/career-target", icon: Target, tag: "Role Match" },
  { step: 4, title: "Drive Eligibility", subtitle: "TPO Cutoff Verification", path: "/student/eligibility", icon: CheckCircle2, tag: "Verification" },
  { step: 5, title: "Simulation Center", subtitle: "6 Mock Evaluation Modules", path: "/student/simulation", icon: PlayCircle, tag: "6 Modules" },
  { step: 6, title: "Readiness Score", subtitle: "AI Employability Index", path: "/student/readiness-score", icon: BarChart3, tag: "84% Ready" },
  { step: 7, title: "Skill-Gap Analysis", subtitle: "Targeted Bridge Priorities", path: "/student/skill-gap", icon: Split, tag: "Priority Tags" },
  { step: 8, title: "Action Roadmap", subtitle: "Curated 3-Phase Timeline", path: "/student/roadmap", icon: ListOrdered, tag: "Curated" },
  { step: 9, title: "Reassessment Tracker", subtitle: "Velocity & Score History", path: "/student/reassessment", icon: TrendingUp, tag: "Score History" },
  { step: 10, title: "Alumni Mentorship", subtitle: "1-on-1 Guidance & Referrals", path: "/student/alumni-network", icon: Users, tag: "Referrals" },
  { step: 11, title: "Placements Lifecycle", subtitle: "Live Drives & Offer Vault", path: "/student/placements", icon: Briefcase, tag: "Live Drives" },
];

// Preserved for backward-compatibility if imported elsewhere
export const STUDENT_SECTIONS = [
  {
    id: "sec-all",
    sectionNumber: 1,
    sectionTitle: "Sequential Student Progression",
    badge: "10 Steps",
    steps: STUDENT_STEPS
  }
];

export function StudentSidebar() {
  const pathname = usePathname();

  // Find index of current step to calculate completion
  const currentStepIndex = STUDENT_STEPS.findIndex(s => s.path === pathname);
  const currentStepNum = currentStepIndex !== -1 ? STUDENT_STEPS[currentStepIndex].step : 2;

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-200/80 p-4 lg:p-5 flex flex-col justify-between">
      <div className="space-y-4">
        
        {/* Sidebar Header: Career Acceleration Suite */}
        <div className="px-1 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
            Student Career Suite
          </span>
        </div>

        {/* Individual Steps (Alag Alag - Single Flat Progression List) */}
        <nav className="space-y-1.5" aria-label="Student Career Suite">
          {STUDENT_STEPS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;
            const isCompleted = item.step < currentStepNum;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                  active
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 translate-x-1"
                    : isCompleted
                      ? "bg-slate-50/60 text-slate-800 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300"
                      : "bg-white text-slate-700 border-slate-200/70 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    active 
                      ? "bg-white/20 text-white" 
                      : isCompleted
                        ? "bg-emerald-100/80 text-emerald-700"
                        : "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="truncate flex flex-col">
                    <span className="truncate leading-tight font-bold">{item.title}</span>
                    <span className={`text-[10px] font-medium truncate mt-0.5 ${
                      active ? "text-emerald-100" : "text-slate-400 group-hover:text-slate-500"
                    }`}>
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}>
                    {item.tag}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                    active ? "text-white" : "text-slate-300 group-hover:text-slate-500"
                  }`} />
                </div>
              </Link>
            );
          })}
        </nav>

      </div>

      {/* Mini Quick Score Widget & DigiLocker Badge */}
      <div className="mt-6 pt-4 border-t border-slate-100 hidden lg:block space-y-3">
        <Link 
          href="/student/profile"
          className="block bg-gradient-to-br from-blue-50 to-indigo-50/70 rounded-2xl p-3.5 border border-blue-200/80 text-slate-800 hover:border-blue-300 transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-blue-950 mb-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Placement Passport
            </span>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200">
              Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-600 font-medium">
            10th, 12th, B.Tech &amp; Aadhaar authenticated with SHA-256 seal.
          </p>
        </Link>

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
