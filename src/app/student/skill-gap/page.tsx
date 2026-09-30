"use client";

import Link from "next/link";
import { 
  Split, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Flame, 
  Target, 
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { SKILL_GAP_ANALYSIS } from "@/lib/mockData";

export default function SkillGapPage() {
  const gap = SKILL_GAP_ANALYSIS;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Competency Disparity Matrix</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Skill-Gap Analysis &amp; Industry Alignment
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Direct benchmark comparison of your verified credentials against <strong>{gap.targetRole}</strong> recruitment specs.
          </p>
        </div>

        <Link
          href="/student/roadmap"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 shrink-0"
        >
          <span>Curated Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Target Match Metric Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-black text-xl shadow-sm">
            {gap.matchPercentage}%
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall JD Alignment</div>
            <h3 className="text-base font-extrabold text-slate-900">
              {gap.targetRole} Compatibility
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Bridging the 2 Critical priority items below unlocks 94%+ compatibility.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">5 Acquired</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-bold text-red-600">4 Missing Requirements</span>
        </div>
      </div>

      {/* Side-by-Side: Acquired vs Missing Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Acquired Skills Column */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Acquired Skills &amp; Credentials
            </h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Verified Stamped
            </span>
          </div>

          <div className="space-y-3">
            {gap.acquiredSkills.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{item.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Verified via: {item.source}</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Requirements with Priority Tags */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Missing Industry Requirements
            </h2>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
              Action Required
            </span>
          </div>

          <div className="space-y-3">
            {gap.missingRequirements.map((item, idx) => {
              const isCritical = item.priority === "Critical";
              const isRec = item.priority === "Recommended";

              return (
                <div 
                  key={idx} 
                  className={`p-4 rounded-xl border space-y-2 ${
                    isCritical 
                      ? "bg-red-50/40 border-red-200" 
                      : isRec 
                      ? "bg-amber-50/40 border-amber-200" 
                      : "bg-blue-50/40 border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold text-slate-900">{item.name}</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isCritical
                        ? "bg-red-100 text-red-800 border border-red-300"
                        : isRec
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-blue-100 text-blue-800 border border-blue-300"
                    }`}>
                      {item.priority}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600">
                    <strong>Recruiter Impact:</strong> {item.industryDemand}
                  </p>

                  <div className="text-[11px] font-semibold text-slate-700 pt-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Recommended Remedy: <strong>{item.action}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
