"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FileText, 
  PlayCircle, 
  ListOrdered, 
  Briefcase, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { STUDENT_SECTIONS } from "@/components/StudentSidebar";

export function StudentSectionNav() {
  const pathname = usePathname();

  // Find which section is active
  const activeSection = STUDENT_SECTIONS.find(sec => 
    sec.steps.some(step => step.path === pathname)
  );

  return (
    <div className="mb-6 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Student Journey Architecture
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-bold text-slate-700">
            {activeSection ? `Section ${activeSection.sectionNumber}: ${activeSection.sectionTitle}` : "Student Portal"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Statutory NIRF / Placement Flow</span>
        </div>
      </div>

      {/* 4 Distinct Section Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {STUDENT_SECTIONS.map((sec) => {
          const isActive = sec.steps.some(step => step.path === pathname);
          const firstStepPath = sec.steps[0].path;

          return (
            <Link
              key={sec.id}
              href={firstStepPath}
              className={`p-3 rounded-xl border transition-all flex flex-col justify-between group ${
                isActive
                  ? "bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-300 shadow-sm ring-1 ring-emerald-400/30"
                  : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/80 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  isActive ? "bg-emerald-600 text-white" : "bg-slate-200/70 text-slate-600 group-hover:bg-slate-300"
                }`}>
                  Section {sec.sectionNumber}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {sec.badge}
                </span>
              </div>

              <div className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                {sec.sectionTitle}
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                <span className={`font-semibold ${isActive ? "text-emerald-700" : "text-slate-500"}`}>
                  {sec.steps.length} {sec.steps.length === 1 ? "Module" : "Modules"}
                </span>
                <ChevronRight className={`w-3 h-3 ${isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"}`} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
