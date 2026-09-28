"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  SlidersHorizontal, 
  Building2, 
  GraduationCap, 
  Briefcase,
  Sparkles
} from "lucide-react";
import { COMPANY_DRIVES, INITIAL_STUDENT_PROFILE } from "@/lib/mockData";

export default function DriveEligibilityPage() {
  const [testCgpa, setTestCgpa] = useState(INITIAL_STUDENT_PROFILE.cgpa);
  const [testBacklogs, setTestBacklogs] = useState(INITIAL_STUDENT_PROFILE.activeBacklogs);
  const [selectedBranch, setSelectedBranch] = useState("CSE");

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <span>Step 4 of 12</span>
            <span>•</span>
            <span>Automated TPO Vault Compliance</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Campus Drive Eligibility Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time evaluation of your verified academic standing against visiting corporate placement cutoffs.
          </p>
        </div>

        <Link
          href="/student/simulation"
          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20 shrink-0"
        >
          <span>Start Simulation (Step 5)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Interactive Simulator Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-5 rounded-2xl shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Live Interactive Criteria Simulator
              </div>
              <div className="text-xs text-slate-300">
                Adjust metrics below to see instant eligibility recalculations across all active drives.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
              <span className="text-xs font-semibold text-slate-300">CGPA:</span>
              <input
                type="number"
                step="0.1"
                min="5"
                max="10"
                value={testCgpa}
                onChange={(e) => setTestCgpa(parseFloat(e.target.value) || 0)}
                className="w-16 bg-white text-slate-900 px-2 py-0.5 rounded text-xs font-black"
              />
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
              <span className="text-xs font-semibold text-slate-300">Backlogs:</span>
              <input
                type="number"
                min="0"
                max="5"
                value={testBacklogs}
                onChange={(e) => setTestBacklogs(parseInt(e.target.value) || 0)}
                className="w-14 bg-white text-slate-900 px-2 py-0.5 rounded text-xs font-black"
              />
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
              <span className="text-xs font-semibold text-slate-300">Branch:</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-white text-slate-900 px-2 py-0.5 rounded text-xs font-bold"
              >
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
              </select>
            </div>

            <button
              onClick={() => {
                setTestCgpa(INITIAL_STUDENT_PROFILE.cgpa);
                setTestBacklogs(INITIAL_STUDENT_PROFILE.activeBacklogs);
                setSelectedBranch("CSE");
              }}
              className="text-xs text-blue-300 hover:text-white underline font-semibold ml-2"
            >
              Reset to Actual
            </button>
          </div>
        </div>
      </div>

      {/* Drives Evaluation Table / Cards */}
      <div className="space-y-4">
        {COMPANY_DRIVES.map((drive) => {
          // Check conditions
          const cgpaEligible = testCgpa >= drive.minCgpa;
          const backlogEligible = testBacklogs <= drive.maxBacklogs;
          const branchEligible = drive.allowedBranches.includes(selectedBranch);
          const isEligible = cgpaEligible && backlogEligible && branchEligible;

          const failReasons: string[] = [];
          if (!cgpaEligible) failReasons.push(`CGPA is ${testCgpa} (Minimum required: ${drive.minCgpa})`);
          if (!backlogEligible) failReasons.push(`Active backlogs: ${testBacklogs} (Allowed: max ${drive.maxBacklogs})`);
          if (!branchEligible) failReasons.push(`Branch '${selectedBranch}' is not in allowed list [${drive.allowedBranches.join(", ")}]`);

          return (
            <div
              key={drive.id}
              className={`p-6 rounded-2xl border-2 bg-white transition-all shadow-sm ${
                isEligible ? "border-emerald-300 shadow-emerald-500/5" : "border-red-200 bg-red-50/10"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Left Info */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm ${
                    isEligible ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                  }`}>
                    {drive.logo}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">{drive.companyName}</h3>
                      <span className="text-xs font-bold text-slate-500">• {drive.role}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600">
                      <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        Package: {drive.ctc}
                      </span>
                      <span>Cutoff: <strong>{drive.minCgpa} CGPA</strong></span>
                      <span>Max Backlogs: <strong>{drive.maxBacklogs}</strong></span>
                      <span>Branches: <strong>{drive.allowedBranches.join(", ")}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right Status Badge */}
                <div className="flex flex-col md:items-end gap-2 shrink-0">
                  {isEligible ? (
                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-extrabold shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>100% Eligible</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs font-extrabold shadow-sm">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span>Not Eligible</span>
                    </div>
                  )}

                  <span className="text-[11px] text-slate-400">
                    Registration Deadline: {drive.deadline}
                  </span>
                </div>

              </div>

              {/* Reasons if Not Eligible */}
              {!isEligible && (
                <div className="mt-4 pt-3 border-t border-red-100 flex items-start gap-2 text-xs text-red-700 bg-red-50 p-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <strong className="block mb-0.5">Eligibility Restrictions Detected:</strong>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      {failReasons.map((reason, i) => (
                        <li key={i}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
