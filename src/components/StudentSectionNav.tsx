"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Milestone
} from "lucide-react";
import { STUDENT_STEPS } from "@/components/StudentSidebar";

export function StudentSectionNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Find active step index (0 to 9)
  const activeIndex = STUDENT_STEPS.findIndex(step => step.path === pathname);
  const currentIndex = activeIndex !== -1 ? activeIndex : 0;
  const currentStep = STUDENT_STEPS[currentIndex];

  // Calculate progression percentage (from Step 2 to Step 11 = 10 steps total)
  const progressPercent = Math.round(((currentIndex + 1) / STUDENT_STEPS.length) * 100);

  const prevStep = currentIndex > 0 ? STUDENT_STEPS[currentIndex - 1] : null;
  const nextStep = currentIndex < STUDENT_STEPS.length - 1 ? STUDENT_STEPS[currentIndex + 1] : null;

  return (
    <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Milestone className="w-3 h-3 text-emerald-600" />
              Student Flow Progression
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-bold text-slate-800">
              {currentStep.title}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {currentStep.subtitle} • Continuous student journey for verified institutional placement clearance.
          </p>
        </div>

        {/* Previous / Next Stepper Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {prevStep ? (
            <Link
              href={prevStep.path}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              title={`Go to ${prevStep.title}`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </Link>
          ) : (
            <span className="px-3 py-1.5 rounded-xl border border-slate-100 text-xs font-bold text-slate-300 cursor-not-allowed">
              Previous
            </span>
          )}

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] font-extrabold text-slate-700">
            <span className="text-emerald-700">{progressPercent}% Completed</span>
          </div>

          {nextStep ? (
            <Link
              href={nextStep.path}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-500/20"
              title={`Go to ${nextStep.title}`}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed">
              Completed
            </span>
          )}
        </div>
      </div>

      {/* Sequential Step Progress Tracker Strip (Individual Steps - Alag Alag) */}
      <div className="mt-3.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {STUDENT_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            const isCompleted = idx < currentIndex;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all border ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                    : isCompleted
                      ? "bg-emerald-50/70 text-emerald-900 border-emerald-200/80 hover:bg-emerald-100"
                      : "bg-slate-50/80 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
                }`}
                title={item.title}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : isCompleted
                      ? "bg-emerald-200 text-emerald-900"
                      : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                  ) : (
                    <Icon className="w-3 h-3" />
                  )}
                </div>

                <span className="truncate max-w-[120px] sm:max-w-none">{item.title}</span>

                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
