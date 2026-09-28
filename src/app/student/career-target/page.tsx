"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Sparkles,
  Layers,
  ChevronRight
} from "lucide-react";
import { CAREER_TARGETS } from "@/lib/mockData";

export default function TargetCareerPage() {
  const [selectedRole, setSelectedRole] = useState(CAREER_TARGETS[0].id);
  const activeTarget = CAREER_TARGETS.find(r => r.id === selectedRole) || CAREER_TARGETS[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <span>Step 3 of 12</span>
            <span>•</span>
            <span>Target Role Benchmark Matcher</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Target Career Selection &amp; Industry Standards
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Choose your target placement profile. The AI engine aligns your simulation modules and skill-gap priorities to this standard.
          </p>
        </div>

        <Link
          href="/student/eligibility"
          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20 shrink-0"
        >
          <span>Drive Eligibility (Step 4)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Role Picker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAREER_TARGETS.map((career) => {
          const isSelected = career.id === selectedRole;

          return (
            <div
              key={career.id}
              onClick={() => setSelectedRole(career.id)}
              className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-white border-blue-600 shadow-lg shadow-blue-500/10 scale-[1.02]"
                  : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    career.demand === "Very High"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}>
                    {career.demand} Demand
                  </span>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 leading-snug mb-1">
                  {career.title}
                </h3>
                <div className="text-xs font-bold text-emerald-600 mb-2">
                  Avg: {career.avgSalary}
                </div>
                <p className="text-xs text-slate-500 line-clamp-3">
                  {career.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                <span className={isSelected ? "text-blue-600" : "text-slate-400"}>
                  {isSelected ? "Active Target" : "Select Role"}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? "text-blue-600" : "text-slate-400"}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Benchmark Deep-Dive Panel */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Benchmark Standard Details
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              {activeTarget.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
              Cutoff CGPA: <span className="text-blue-600 font-extrabold">{activeTarget.benchmarks.minCgpa}+</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
              Market Demand: {activeTarget.demand}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Core Competency Benchmarks (Must Have)
            </h3>
            <div className="space-y-2.5">
              {activeTarget.benchmarks.coreSkills.map((skill, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>{skill}</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Weighted 25-35%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                Industry Standard Recommended Certification
              </h3>
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
                <div className="font-extrabold text-emerald-950 mb-1">
                  {activeTarget.benchmarks.recommendedCert}
                </div>
                <p className="text-emerald-800 text-[11px]">
                  Boosts corporate shortlisting rates by 48% across visiting technical recruiters and state campus drives.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-extrabold text-blue-950">Next: Check Real Drive Cutoffs</h4>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  Verify how your credentials stand against TCS, Infosys, Cisco, and MPSeDC.
                </p>
              </div>
              <Link
                href="/student/eligibility"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm shrink-0"
              >
                Proceed &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
