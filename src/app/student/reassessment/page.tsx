"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  LineChart, 
  Award,
  Zap
} from "lucide-react";
import { REASSESSMENT_HISTORY } from "@/lib/mockData";

export default function ReassessmentTrackerPage() {
  const [history, setHistory] = useState(REASSESSMENT_HISTORY);
  const [isRecalibrating, setIsRecalibrating] = useState(false);

  const handleRetakeSimulation = () => {
    setIsRecalibrating(true);
    setTimeout(() => {
      const newScore = Math.min(95, history[history.length - 1].score + 4);
      const newAttempt = {
        attempt: `Retake Recalibration #${history.length + 1}`,
        score: newScore,
        tech: Math.min(98, history[history.length - 1].tech + 3),
        apt: Math.min(95, history[history.length - 1].apt + 2),
        comm: Math.min(92, history[history.length - 1].comm + 4),
        notes: "Post-Roadmap test recalibration submitted to TPO Vault."
      };
      setHistory([...history, newAttempt]);
      setIsRecalibrating(false);
    }, 1200);
  };

  const latest = history[history.length - 1];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <span>Step 9 of 12</span>
            <span>•</span>
            <span>Iterative Competency Trajectory</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Reassessment &amp; Progress Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track multi-attempt readiness trajectory. Retake simulations to automatically improve your corporate drive ranking.
          </p>
        </div>

        <Link
          href="/student/alumni-network"
          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20 shrink-0"
        >
          <span>Alumni Mentors (Step 10)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Visual Progress Trajectory Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Historical Growth Progression
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Score Evolution: {history.map(h => h.score).join(" → ")}
            </h2>
          </div>

          <button
            onClick={handleRetakeSimulation}
            disabled={isRecalibrating}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-md shadow-emerald-500/20 disabled:opacity-60"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRecalibrating ? "animate-spin" : ""}`} />
            <span>{isRecalibrating ? "Evaluating Recalibration..." : "Retake Simulation & Recalibrate"}</span>
          </button>
        </div>

        {/* Visual Bar Graph */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          {history.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-black">
                    #{idx + 1}
                  </span>
                  <span>{item.attempt}</span>
                </span>
                <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
                  {item.score} / 100
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-700"
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Technical: <strong>{item.tech}%</strong> • Aptitude: <strong>{item.apt}%</strong> • Communication: <strong>{item.comm}%</strong></span>
                <span className="italic">{item.notes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trajectory Insights Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Improvement</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            +{latest.score - history[0].score}% Growth
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Progressed from baseline diagnostic to elite corporate candidate band.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Placement Vault Sync</div>
          <div className="text-2xl font-black text-blue-600 mt-1">
            Instant Timestamp
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Recruiter dashboard automatically sorts candidates by their highest verified score.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Step Recommendation</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            Alumni Mock Prep
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Schedule a 1-on-1 session with placed alumni at Microsoft or Amazon.
          </p>
        </div>
      </div>

    </div>
  );
}
