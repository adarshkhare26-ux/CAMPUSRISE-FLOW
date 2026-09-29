"use client";

import Link from "next/link";
import { 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Info, 
  Percent, 
  Sparkles,
  PieChart,
  ShieldCheck
} from "lucide-react";
import { READINESS_BREAKDOWN } from "@/lib/mockData";

export default function ReadinessScorePage() {
  const data = READINESS_BREAKDOWN;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <span>Step 6 of 12</span>
            <span>•</span>
            <span>AI Calibration Metric</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            AI Career Readiness Score Breakdown
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Synthesized across your academics, 6 simulation modules, and verified code portfolio.
          </p>
        </div>

        <Link
          href="/student/skill-gap"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 shrink-0"
        >
          <span>Skill-Gap Analysis (Step 7)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Top Banner: Gauge Meter & Summary */}
      <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Circular SVG Gauge */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="16"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#readinessGrad)"
                  strokeWidth="16"
                  strokeDasharray="502.65"
                  strokeDashoffset={502.65 - (data.overallScore / 100) * 502.65}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="readinessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900 leading-none">
                  {data.overallScore}
                </span>
                <span className="text-xs font-bold text-slate-400 mt-1">OUT OF 100</span>
              </div>
            </div>

            <div className="mt-3">
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {data.gaugeLevel}
              </span>
              <div className="text-[11px] font-semibold text-slate-400 mt-1">
                {data.percentile}
              </div>
            </div>
          </div>

          {/* Quick Context / Explanatory Text */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">
              Evaluator Summary &amp; Placement Probability
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your overall readiness index of <strong>{data.overallScore}/100</strong> qualifies you for elite 
              corporate hiring tiers (&gt; ₹7.5 LPA). The AI model observed high marks in algorithmic problem solving 
              and architectural projects, with targeted upside remaining in container orchestration and real-time GD debates.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                <span className="text-slate-400 font-bold block text-[10px]">VERIFIED GPA</span>
                <strong className="text-sm text-slate-900 font-black">8.42 CGPA</strong>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                <span className="text-slate-400 font-bold block text-[10px]">ACTIVE DRIVES</span>
                <strong className="text-sm text-emerald-600 font-black">4 Eligible</strong>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                <span className="text-slate-400 font-bold block text-[10px]">CREDENTIAL STAMP</span>
                <strong className="text-sm text-blue-600 font-black">ABC DigiLocker</strong>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Categorical Weighted Breakdown (Spec 6) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-blue-600" />
            Weighted Categorical Score Formula
          </h2>
          <span className="text-xs text-slate-400 font-semibold">Sum of Weights = 100%</span>
        </div>

        <div className="space-y-5">
          {data.categories.map((cat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900">{cat.name}</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Weight: {cat.weight}%
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-700">
                  Performance: <strong className="text-emerald-700">{cat.score}%</strong> &rarr; Net Contribution: <strong className="text-emerald-700">{cat.contribution} pts</strong>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${cat.score}%` }}
                ></div>
              </div>

              {/* Explanatory reasoning */}
              <p className="text-[11px] text-slate-500 italic flex items-center gap-1.5 mt-1">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 not-italic" />
                <span>{cat.reasoning}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
