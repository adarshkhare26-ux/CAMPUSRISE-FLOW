"use client";

import Link from "next/link";
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  Download, 
  Building2, 
  Calendar, 
  Award,
  Sparkles
} from "lucide-react";
import { COMPANY_DRIVES } from "@/lib/mockData";

const STAGES = ["Applied", "Assessment", "Shortlisted", "Interview", "Offer Letter"];

export default function PlacementLifecyclePage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <span>Step 11 of 12</span>
            <span>•</span>
            <span>Recruitment Pipeline Tracker</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Drive Matching &amp; Placement Lifecycle
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time status updates across all 5 recruitment stages from application submission to official offer letter generation.
          </p>
        </div>

        <Link
          href="/tpo/dashboard"
          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20 shrink-0"
        >
          <span>TPO Master (Step 12)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Verified Placement Offer Alert (Vault Output) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-600/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white/20 text-white border border-white/30 uppercase tracking-wider mb-1">
              Official Offer Letter Verified
            </div>
            <h3 className="text-lg font-black leading-tight">
              MP State Electronics Dev Corp (MPSeDC) — ₹6.0 LPA
            </h3>
            <p className="text-xs text-emerald-100 mt-0.5">
              Verified by Campus Placement Cell (TPO Vault ID: MP-2026-OFFER-0881).
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Downloading tamper-proof verified offer letter PDF with TPO digital signature stamp.")}
          className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-extrabold text-xs hover:bg-emerald-50 transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-700" />
          <span>Download Verified Offer PDF</span>
        </button>
      </div>

      {/* Active Recruitment Drives Pipeline */}
      <div className="space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-blue-600" />
          Active Application Progress Across 5 Stages
        </h2>

        {COMPANY_DRIVES.map((drive) => {
          const currentStageIndex = STAGES.indexOf(drive.stage || "Applied");

          return (
            <div key={drive.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-xs">
                    {drive.logo}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{drive.companyName}</h3>
                    <div className="text-xs text-slate-500">{drive.role} • <strong>{drive.ctc}</strong></div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">Current Phase:</span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                    drive.stage === "Offer Letter"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}>
                    {drive.stage}
                  </span>
                </div>
              </div>

              {/* 5-Stage Stepper Bar */}
              <div className="grid grid-cols-5 gap-2 pt-1">
                {STAGES.map((stageName, sIdx) => {
                  const isDone = sIdx < currentStageIndex;
                  const isCurrent = sIdx === currentStageIndex;

                  return (
                    <div key={stageName} className="flex flex-col items-center text-center">
                      <div className={`w-full h-1.5 rounded-full mb-2 ${
                        isDone || isCurrent ? "bg-blue-600" : "bg-slate-200"
                      }`} />
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black mb-1 ${
                        isDone
                          ? "bg-emerald-600 text-white"
                          : isCurrent
                          ? "bg-blue-600 text-white ring-4 ring-blue-100"
                          : "bg-slate-100 text-slate-400"
                      }`}>
                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : (sIdx + 1)}
                      </div>
                      <span className={`text-[10px] font-bold ${
                        isCurrent ? "text-blue-700 font-black" : isDone ? "text-slate-700" : "text-slate-400"
                      }`}>
                        {stageName}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
