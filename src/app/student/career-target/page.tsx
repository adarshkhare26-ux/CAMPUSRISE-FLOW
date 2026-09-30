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
  ChevronRight,
  Building2,
  Code2,
  BookOpen,
  Clock,
  Briefcase,
  BarChart3,
  Check,
  AlertCircle,
  FileText,
  BadgeCheck
} from "lucide-react";
import { CAREER_TARGETS } from "@/lib/mockData";

export default function TargetCareerPage() {
  const [selectedRole, setSelectedRole] = useState(CAREER_TARGETS[0].id);
  const [activeTab, setActiveTab] = useState<"curriculum" | "fit" | "recruiters" | "rounds" | "capstone">("curriculum");

  const activeTarget = CAREER_TARGETS.find(r => r.id === selectedRole) || CAREER_TARGETS[0];

  return (
    <div className="space-y-6">
      
      {/* Header without Step numbers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Target Role Benchmark &amp; Curriculum Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Target Career Benchmarks &amp; Industry Standards
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Explore 4 in-depth industrial career specializations with exact syllabus weightages, visiting campus recruiters, evaluation rounds, and candidate fit diagnostics.
          </p>
        </div>

        <Link
          href="/student/eligibility"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 shrink-0"
        >
          <span>Drive Eligibility</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Detailed Role Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAREER_TARGETS.map((career) => {
          const isSelected = career.id === selectedRole;
          const fitPct = career.candidateFitAnalysis.matchPct;

          return (
            <div
              key={career.id}
              onClick={() => setSelectedRole(career.id)}
              className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-white border-blue-600 shadow-xl shadow-blue-500/10 scale-[1.02] ring-2 ring-blue-600/20"
                  : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-md"
              }`}
            >
              <div>
                {/* Badges strip */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    career.demand === "Very High"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}>
                    {career.demand} Demand
                  </span>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    fitPct >= 80 
                      ? "bg-emerald-100 text-emerald-800" 
                      : fitPct >= 70 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {fitPct}% Fit
                  </span>
                </div>

                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {career.category}
                </div>

                <h3 className="text-sm font-black text-slate-900 leading-snug mt-0.5 mb-1.5">
                  {career.title}
                </h3>

                <div className="text-xs font-black text-emerald-600 mb-2 flex items-center justify-between">
                  <span>{career.avgSalary}</span>
                  <span className="text-[10px] font-semibold text-slate-400">Avg CTC</span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {career.description}
                </p>
              </div>

              {/* Card Footer: Top Recruiter & Select Trigger */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-[10px] text-slate-500 truncate max-w-[130px]">
                    Top: {career.topRecruiters[0].name}
                  </span>
                  <span className={`flex items-center gap-0.5 ${isSelected ? "text-blue-600 font-extrabold" : "text-slate-400"}`}>
                    <span>{isSelected ? "Active Target" : "Inspect"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Benchmark Deep-Dive Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        
        {/* Banner with Salary Breakdown */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  {activeTarget.category}
                </span>
                <span className="text-blue-400">•</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/10 text-emerald-300 px-2.5 py-0.5 rounded-full border border-white/10">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  {activeTarget.demand} Hiring Demand in Central India &amp; National IT Hubs
                </span>
              </div>

              <h2 className="text-2xl font-black text-white flex items-center gap-2.5 tracking-tight">
                <Target className="w-6 h-6 text-blue-400 shrink-0" />
                {activeTarget.title}
              </h2>

              <p className="text-xs text-blue-200/90 mt-2 max-w-3xl leading-relaxed">
                {activeTarget.description}
              </p>
            </div>

            {/* Compensation Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shrink-0 min-w-[260px] space-y-2">
              <div className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">
                Target Compensation Range
              </div>
              <div className="text-xl font-black text-emerald-300">
                {activeTarget.avgSalary}
              </div>
              <div className="text-[11px] text-blue-100/80 space-y-0.5 pt-1 border-t border-white/10 font-medium">
                <div>Base: <span className="font-bold text-white">{activeTarget.salaryBreakdown.base}</span></div>
                <div>Variable: <span className="font-bold text-white">{activeTarget.salaryBreakdown.variable}</span></div>
                <div>Tier-1 Top: <span className="font-bold text-amber-300">{activeTarget.salaryBreakdown.tier1Max}</span></div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-300/80">Academic Cutoff</div>
              <div className="font-bold text-white mt-0.5">CGPA &ge; {activeTarget.benchmarks.minCgpa} (0 Backlogs)</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-300/80">Candidate Match</div>
              <div className="font-extrabold text-emerald-300 mt-0.5 flex items-center gap-1">
                <span>{activeTarget.candidateFitAnalysis.matchPct}% Match</span>
                <span className="text-[10px] text-emerald-200">({activeTarget.candidateFitAnalysis.fitStatus})</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-300/80">Top Visiting Recruiter</div>
              <div className="font-bold text-white mt-0.5">{activeTarget.topRecruiters[0].name} ({activeTarget.topRecruiters[0].package})</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-300/80">Recommended Cert</div>
              <div className="font-bold text-blue-200 truncate mt-0.5">{activeTarget.benchmarks.recommendedCert}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/80 px-4 sm:px-6">
          <button
            onClick={() => setActiveTab("curriculum")}
            className={`px-4 py-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === "curriculum"
                ? "border-blue-600 text-blue-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Subject Weights &amp; Syllabus (100%)</span>
          </button>

          <button
            onClick={() => setActiveTab("fit")}
            className={`px-4 py-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === "fit"
                ? "border-blue-600 text-blue-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <BadgeCheck className="w-4 h-4" />
            <span>Candidate Fit Diagnostics ({activeTarget.candidateFitAnalysis.matchPct}%)</span>
          </button>

          <button
            onClick={() => setActiveTab("recruiters")}
            className={`px-4 py-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === "recruiters"
                ? "border-blue-600 text-blue-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Visiting Recruiters ({activeTarget.topRecruiters.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("rounds")}
            className={`px-4 py-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === "rounds"
                ? "border-blue-600 text-blue-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Interview Blueprint (4 Rounds)</span>
          </button>

          <button
            onClick={() => setActiveTab("capstone")}
            className={`px-4 py-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === "capstone"
                ? "border-blue-600 text-blue-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certs &amp; Capstone Projects</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 sm:p-8">
          
          {/* TAB 1: SUBJECT WEIGHTAGE */}
          {activeTab === "curriculum" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    Technical Curriculum Distribution &amp; Question Weightages
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Evaluated by AI Simulation Engine during Mock Coding &amp; Technical Interviews.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                  Total Weight: 100%
                </span>
              </div>

              <div className="space-y-4">
                {activeTarget.subjectWeights.map((sub, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">{sub.subject}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          sub.importance === "Critical"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : sub.importance === "High"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {sub.importance} Priority
                        </span>
                      </div>

                      <div className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                        {sub.weight}% Weightage
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden mb-3">
                      <div 
                        className={`h-full rounded-full ${
                          sub.weight >= 30 
                            ? "bg-blue-600" 
                            : sub.weight >= 20 
                            ? "bg-indigo-600" 
                            : "bg-emerald-600"
                        }`}
                        style={{ width: `${sub.weight * 2.5}%` }}
                      ></div>
                    </div>

                    {/* Key Topics Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                        Syllabus Focus:
                      </span>
                      {sub.topics.map((topic, tIdx) => (
                        <span key={tIdx} className="text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-md">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CANDIDATE FIT DIAGNOSTICS */}
          {activeTab === "fit" && (
            <div className="space-y-6">
              {/* Match Header Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex flex-col items-center justify-center font-black shadow-lg shadow-emerald-600/20 shrink-0">
                    <span className="text-xl leading-none">{activeTarget.candidateFitAnalysis.matchPct}%</span>
                    <span className="text-[9px] uppercase font-bold text-emerald-200 mt-1">Match</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Candidate Profile Compatibility Analysis
                    </div>
                    <h3 className="text-base font-black text-emerald-950 mt-0.5">
                      Priya Sharma &bull; {activeTarget.candidateFitAnalysis.fitStatus}
                    </h3>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Analyzed against DigiLocker authenticated academic credentials &amp; portfolio projects.
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-800">Eligible Drives Shortlist</div>
                  <div className="text-lg font-black text-emerald-950">4 of 5 Companies</div>
                </div>
              </div>

              {/* Strengths & Gap Priorities 2-Col Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Verified Strengths */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Candidate Verified Strengths</span>
                  </h4>
                  <div className="space-y-2">
                    {activeTarget.candidateFitAnalysis.strengths.map((st, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs font-semibold text-emerald-950 flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gap Priorities */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Bridge Priorities Before Drive Date</span>
                  </h4>
                  <div className="space-y-2">
                    {activeTarget.candidateFitAnalysis.gapPriorities.map((gap, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-xs font-semibold text-amber-950 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
                        <span>{gap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Advisor Note */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 leading-relaxed flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">AI Placement Readiness Recommendation: </span>
                  {activeTarget.candidateFitAnalysis.readinessTip}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VISITING RECRUITERS */}
          {activeTab === "recruiters" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    Corporate Partners Actively Hiring for {activeTarget.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live campus placement drives with confirmed criteria for Rajiv Gandhi Proudyogiki Vishwavidyalaya.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeTarget.topRecruiters.map((rec, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          rec.hiringType === "Super Dream"
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : rec.hiringType === "Dream"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {rec.hiringType} Tier
                        </span>
                        <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {rec.package}
                        </span>
                      </div>

                      <h4 className="text-xs font-black text-slate-900">{rec.name}</h4>
                      <p className="text-[11px] font-bold text-blue-700 mt-0.5">{rec.roleName}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/70 text-[10px] text-slate-500 flex items-center justify-between">
                      <span>Location: {rec.location}</span>
                      <span className="text-emerald-700 font-bold">Cutoff CGPA: 7.0+</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: 4 INTERVIEW ROUNDS BLUEPRINT */}
          {activeTab === "rounds" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Standard 4-Stage Interview &amp; Evaluation Blueprint
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Understand the pass rates, duration, and evaluation metrics used by corporate panels.
                </p>
              </div>

              <div className="space-y-3.5">
                {activeTarget.interviewRounds.map((rnd) => (
                  <div key={rnd.roundNumber} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                          R{rnd.roundNumber}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">{rnd.roundName}</h4>
                          <span className="text-[10px] font-bold text-slate-500">Duration: {rnd.duration}</span>
                        </div>
                      </div>

                      <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        {rnd.passRate}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/70 my-2">
                      <span className="font-bold text-slate-800">Round Scope: </span>
                      <span>{rnd.focus}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                        Evaluation Rubric:
                      </span>
                      {rnd.evaluationCriteria.map((crit, cIdx) => (
                        <span key={cIdx} className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                          &bull; {crit}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CERTS & CAPSTONE */}
          {activeTab === "capstone" && (
            <div className="space-y-6">
              {/* Recommended Certification Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                      Industry Recognized Credential Standard
                    </span>
                    <h4 className="text-sm font-black text-blue-950 mt-0.5">
                      {activeTarget.benchmarks.recommendedCert}
                    </h4>
                    <p className="text-xs text-blue-700 font-semibold mt-0.5">
                      Issued by: {activeTarget.benchmarks.certIssuer}
                    </p>
                    <p className="text-xs text-blue-900 mt-2 leading-relaxed">
                      {activeTarget.benchmarks.certImpact}
                    </p>
                  </div>
                  <Award className="w-10 h-10 text-blue-600 shrink-0" />
                </div>
              </div>

              {/* Capstone Projects Section */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  Recommended High-Impact Capstone Projects for Resume
                </h4>
                <div className="space-y-3">
                  {activeTarget.capstoneProjects.map((cap, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between mb-1.5">
                        <h5 className="text-xs font-black text-slate-900">{cap.title}</h5>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {cap.techStack}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <span className="font-bold text-slate-700">Demonstrated Impact: </span>
                        {cap.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer CTA */}
        <div className="p-6 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-black text-slate-900">
              Selected Target: {activeTarget.title} ({activeTarget.avgSalary})
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              The platform will customize your mock interview questions and gap recommendations for this role.
            </p>
          </div>

          <Link
            href="/student/eligibility"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20 flex items-center gap-1.5 shrink-0"
          >
            <span>Proceed to Drive Eligibility</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
