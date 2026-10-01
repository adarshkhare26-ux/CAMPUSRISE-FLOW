"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Info, 
  Sparkles, 
  PieChart, 
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Building2,
  Download,
  Layers,
  Cpu,
  MessageSquare,
  FileCode,
  Zap,
  Clock,
  Briefcase,
  ChevronRight,
  Code2,
  Check,
  Printer,
  RotateCw,
  Loader2
} from "lucide-react";
import { READINESS_BREAKDOWN, SIMULATION_MODULES } from "@/lib/mockData";
import { useToast } from "@/components/Toast";

export default function ReadinessScorePage() {
  const { toast } = useToast();
  const [overallScore, setOverallScore] = useState(READINESS_BREAKDOWN.overallScore);
  const [analysisData, setAnalysisData] = useState<any>(READINESS_BREAKDOWN);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const modules = SIMULATION_MODULES;
  const [activeTab, setActiveTab] = useState<"formula" | "modules" | "tiers" | "diagnostics" | "simulator">("formula");
  const [downloadNotice, setDownloadNotice] = useState(false);

  // Interactive What-If Simulator States
  const [simCoding, setSimCoding] = useState(90);
  const [simAptitude, setSimAptitude] = useState(85);
  const [simInterview, setSimInterview] = useState(84);
  const [simCoreCs, setSimCoreCs] = useState(76);
  const [simResume, setSimResume] = useState(88);
  const simulatedComposite = Math.round(
    simCoding * 0.35 + simAptitude * 0.20 + simInterview * 0.25 + simCoreCs * 0.10 + simResume * 0.10
  );

  const data = {
    ...analysisData,
    overallScore,
  };

  useEffect(() => {
    async function loadScore() {
      try {
        const res = await fetch("/api/student/readiness-score");
        const resData = await res.json();
        if (resData.success && resData.analysis) {
          setOverallScore(resData.analysis.overallScore || resData.analysis.compositeScore);
          setAnalysisData(resData.analysis);
        }
      } catch (err) {
        console.error("Failed to load readiness score", err);
      }
    }
    loadScore();
  }, []);

  const handleRecalculate = async () => {
    setIsRecalculating(true);
    try {
      const res = await fetch("/api/student/readiness-score", { method: "POST" });
      const resData = await res.json();
      if (resData.success && resData.analysis) {
        setOverallScore(resData.analysis.overallScore || resData.analysis.compositeScore);
        setAnalysisData(resData.analysis);
        toast(`Readiness score recalculated! Current score: ${resData.analysis.overallScore || resData.analysis.compositeScore}%`, "success");
      } else {
        toast("Recalculation complete", "info");
      }
    } catch {
      toast("Error recalculating score", "error");
    } finally {
      setIsRecalculating(false);
    }
  };

  const handleDownload = () => {
    setDownloadNotice(true);
    setTimeout(() => {
      window.print();
      setDownloadNotice(false);
    }, 400);
  };

  // Detailed sub-competency dimensions for deep analysis
  const SUB_COMPETENCIES = [
    { name: "Data Structures & Algorithms", category: "Technical", score: 90, status: "Mastery", benchmark: "82% Batch Avg" },
    { name: "Database Engineering & SQL", category: "Technical", score: 88, status: "Mastery", benchmark: "75% Batch Avg" },
    { name: "Full-Stack Project Breadth (Next.js/PostgreSQL)", category: "Architecture", score: 88, status: "Proficient", benchmark: "70% Batch Avg" },
    { name: "Quantitative Aptitude & Logic", category: "Cognitive", score: 85, status: "Proficient", benchmark: "78% Batch Avg" },
    { name: "ATS Resume Parsing & Formatting", category: "Credential", score: 85, status: "Proficient", benchmark: "80% Batch Avg" },
    { name: "Mock Interview Voice & Confidence", category: "Behavioral", score: 84, status: "Proficient", benchmark: "71% Batch Avg" },
    { name: "Core OS & Computer Networks", category: "Technical", score: 76, status: "Developing", benchmark: "72% Batch Avg" },
    { name: "Group Discussion & Rebuttal Dynamics", category: "Communication", score: 75, status: "Developing", benchmark: "68% Batch Avg" },
    { name: "Containerization & Cloud CI/CD (Docker/K8s)", category: "DevOps", score: 62, status: "Critical Gap", benchmark: "65% Batch Avg" },
  ];

  // Placement Cutoff Tiers
  const RECRUITMENT_TIERS = [
    {
      tier: "Super Dream Tier",
      package: "> ₹12.0 LPA",
      minScore: 85,
      candidateScore: data.overallScore,
      eligible: data.overallScore >= 85,
      gap: 85 - data.overallScore,
      companies: ["Cisco Systems", "Amazon", "Microsoft", "Directi"],
      focus: "Requires closing Docker/DevOps gap (+1% boost unlocks this tier)"
    },
    {
      tier: "Dream Corporate Tier",
      package: "₹7.5 - ₹12.0 LPA",
      minScore: 75,
      candidateScore: data.overallScore,
      eligible: data.overallScore >= 75,
      gap: 0,
      companies: ["Infosys (Specialist Programmer)", "Persistent Systems", "TCS Digital"],
      focus: "Fully Pre-Qualified • Priority Interview Clearance Active"
    },
    {
      tier: "Core & Govt IT Fellows",
      package: "₹5.0 - ₹7.5 LPA",
      minScore: 68,
      candidateScore: data.overallScore,
      eligible: data.overallScore >= 68,
      gap: 0,
      companies: ["MPSeDC GovTech", "Tata Consultancy Services (Ninja)", "Wipro Turbo"],
      focus: "Fully Pre-Qualified • Verified ABC DigiLocker Exemption"
    },
    {
      tier: "Institutional Base Pool",
      package: "₹3.5 - ₹5.0 LPA",
      minScore: 60,
      candidateScore: data.overallScore,
      eligible: data.overallScore >= 60,
      gap: 0,
      companies: ["State Campus Drives", "State IT Park Startups", "NIC MP Support"],
      focus: "Automatic Placement Lock Secured"
    },
  ];

  // Score Evolution Over 8 Weeks
  const SCORE_TIMELINE = [
    { week: "Week 1", milestone: "Diagnostic Baseline", score: 68, delta: "+0%" },
    { week: "Week 3", milestone: "Post-Aptitude & Academics", score: 74, delta: "+6%" },
    { week: "Week 6", milestone: "Coding Sandbox & Live Labs", score: 80, delta: "+6%" },
    { week: "Week 8 (Today)", milestone: "AI Mock Interview & Speech Calibration", score: 84, delta: "+4%" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI Calibration Metric</span>
            <span>•</span>
            <span>Continuous Employability Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            AI Career Readiness Score Breakdown
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Synthesized across verified academics, 6 simulation modules, behavioral metrics, and audited project code.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={handleRecalculate}
            disabled={isRecalculating}
            className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-60"
            title="Recalculate score based on completed modules and verified credentials"
          >
            {isRecalculating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCw className="w-3.5 h-3.5" />}
            <span>{isRecalculating ? "Recalculating..." : "Recalculate AI Score"}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200 shadow-xs"
            title="Download official verified AI Readiness Certificate with SHA-256 seal"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print / PDF Scorecard</span>
          </button>

          <Link
            href="/student/skill-gap"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <span>Skill-Gap Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Generating institutional verified score certificate for print &amp; PDF export...</span>
        </div>
      )}

      {/* Top Banner: Gauge Meter & Multidimensional Summary */}
      <div className="bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/40 rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
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
                  strokeDashoffset={502.65 - (overallScore / 100) * 502.65}
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
                  {overallScore}
                </span>
                <span className="text-[11px] font-extrabold text-slate-400 mt-1 uppercase tracking-wider">
                  Out of 100
                </span>
              </div>
            </div>

            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {data.gaugeLevel}
              </span>
              <div className="text-[11px] font-semibold text-slate-500 mt-1">
                {data.percentile} • RGPV CSE Cohort
              </div>
            </div>
          </div>

          {/* Context & Stat Badges */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900">
                Placement Calibration Summary
              </h2>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Target Role: Full Stack SDE
              </span>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Your overall readiness index of <strong>{data.overallScore}/100</strong> places you comfortably within 
              the <strong>Top 8% percentile</strong> across Madhya Pradesh state technical campuses. You qualify 
              for <strong>Dream &amp; Corporate Placement Tiers</strong> (up to ₹12 LPA) with verified 0 active backlogs 
              and authenticated DigiLocker credential backing.
            </p>

            {/* 4 Multi-Metric Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
                <span className="text-slate-400 font-bold block text-[10px]">VERIFIED CGPA</span>
                <strong className="text-sm text-slate-900 font-black">8.42 CGPA</strong>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Top 5% Batch</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
                <span className="text-slate-400 font-bold block text-[10px]">ACTIVE DRIVES</span>
                <strong className="text-sm text-emerald-600 font-black">4 Eligible</strong>
                <span className="text-[10px] text-slate-500 font-medium block mt-0.5">₹6.0 - ₹9.5 LPA</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
                <span className="text-slate-400 font-bold block text-[10px]">DIGILOCKER SEAL</span>
                <strong className="text-sm text-blue-600 font-black">5 Verified</strong>
                <span className="text-[10px] text-slate-500 font-medium block mt-0.5">APAAR / CBSE Stamp</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
                <span className="text-slate-400 font-bold block text-[10px]">SCORE VELOCITY</span>
                <strong className="text-sm text-teal-700 font-black">+16 pts</strong>
                <span className="text-[10px] text-teal-600 font-medium block mt-0.5">Over 8 Weeks</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Sub-Tabs to Deep Dive into Specific Dimensions */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab("formula")}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "formula"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <PieChart className="w-3.5 h-3.5" />
          <span>Weighted Formula &amp; Categories (5)</span>
        </button>

        <button
          onClick={() => setActiveTab("modules")}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "modules"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>6 Simulation Modules Audit</span>
        </button>

        <button
          onClick={() => setActiveTab("tiers")}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "tiers"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Placement Tier Cutoffs &amp; Eligibility</span>
        </button>

        <button
          onClick={() => setActiveTab("diagnostics")}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "diagnostics"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>AI Diagnostics &amp; Sub-Competency Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab("simulator")}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "simulator"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 font-black"
              : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>⚡ What-If Score Simulator &amp; Radar Benchmark</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: WEIGHTED CATEGORICAL FORMULA
          ======================================================== */}
      {activeTab === "formula" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-blue-600" />
                Institutional Weighted Score Formulation
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Formula: &Sigma; (Category Score &times; Weight %) = 84.0 Composite Employability Points
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full w-fit">
              Sum of Institutional Weights = 100%
            </span>
          </div>

          <div className="space-y-4">
            {data.categories.map((cat: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2.5 transition-all hover:bg-slate-50 hover:border-slate-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </div>
                    <span className="text-sm font-extrabold text-slate-900">{cat.name}</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Weight: {cat.weight}%
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                    <span>Performance: <strong className="text-emerald-700 text-sm">{cat.score}%</strong></span>
                    <span className="text-slate-300">&rarr;</span>
                    <span>Contribution: <strong className="text-emerald-700 text-sm">{cat.contribution} pts</strong></span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 rounded-full bg-slate-200/80 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700"
                    style={{ width: `${cat.score}%` }}
                  ></div>
                </div>

                {/* Explanatory reasoning */}
                <p className="text-xs text-slate-600 italic flex items-center gap-1.5 mt-1">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 not-italic" />
                  <span>{cat.reasoning}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Mathematical Total Calculation Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                  Total Institutional Calibration Result
                </div>
                <div className="text-[11px] text-emerald-800">
                  (30.1 + 17.0 + 15.2 + 13.2 + 8.5) = <strong>84.0 / 100.0</strong> Net Composite Readiness
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-700">84%</span>
              <span className="text-[10px] block font-bold text-emerald-900">VERIFIED PLACEMENT ELIGIBLE</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: 6 SIMULATION MODULES AUDIT TRAIL
          ======================================================== */}
      {activeTab === "modules" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                6-Phase AI Mock Simulation Audit Trail
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every score component is traceable to empirical test logs, code execution sandboxes, and speech transcripts.
              </p>
            </div>
            <Link
              href="/student/simulation"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Retake Simulation Modules</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((m) => (
              <div key={m.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center justify-center">
                      M{m.step}
                    </span>
                    <h3 className="text-xs font-extrabold text-slate-900">{m.title}</h3>
                  </div>
                  <div className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {m.score}% Score
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {m.desc}
                </p>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Time: {m.timeMins} mins
                  </span>
                  <span>Questions: {m.questionsCount} items</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Evaluated
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: PLACEMENT TIER CUTOFFS & RECRUITMENT MATCHES
          ======================================================== */}
      {activeTab === "tiers" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Institutional Placement Cutoff Tiers
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Dynamic matching against college visiting companies and hiring package tiers based on current 84% score.
              </p>
            </div>
            <Link
              href="/student/placements"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View Live Drives Pool</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {RECRUITMENT_TIERS.map((tier, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  tier.eligible 
                    ? "bg-emerald-50/40 border-emerald-200 hover:border-emerald-300"
                    : "bg-slate-50/60 border-slate-200/90 hover:border-amber-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-extrabold text-slate-900">{tier.tier}</span>
                    <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                      {tier.package}
                    </span>
                    <span className="text-[10px] text-slate-500">Cutoff: {tier.minScore}%</span>
                  </div>

                  <div>
                    {tier.eligible ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-emerald-100/90 px-3 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        Qualified (Score: 84%)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-800 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        Cutoff Gap: -{tier.gap}% pts
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium mb-2.5">
                  {tier.focus}
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hiring Partners:</span>
                  {tier.companies.map((comp, cIdx) => (
                    <span key={cIdx} className="text-[11px] font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: SUB-COMPETENCY MATRIX & AI DIAGNOSTICS
          ======================================================== */}
      {activeTab === "diagnostics" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Granular Sub-Competency Assessment Matrix
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Benchmark evaluation against 4,200 state university engineering candidates.
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              9 Calibrated Dimensions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUB_COMPETENCIES.map((sub, idx) => {
              const isCritical = sub.status === "Critical Gap";
              const isMastery = sub.status === "Mastery";

              return (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                        {sub.category}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{sub.name}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-black ${
                        isCritical ? "text-amber-600" : isMastery ? "text-emerald-700" : "text-blue-700"
                      }`}>
                        {sub.score}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        isCritical ? "bg-amber-500" : isMastery ? "bg-emerald-500" : "bg-blue-600"
                      }`}
                      style={{ width: `${sub.score}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                    <span className={`font-bold px-1.5 py-0.2 rounded ${
                      isCritical ? "bg-amber-100 text-amber-800" : isMastery ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {sub.status}
                    </span>
                    <span>State Benchmark: {sub.benchmark}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gemini AI Synthesis Note */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 space-y-1.5">
            <div className="font-extrabold flex items-center gap-1.5 text-blue-950">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Gemini AI Strategic Remediation Advice:
            </div>
            <p className="text-[11.5px] text-blue-800 leading-relaxed">
              &quot;Candidate Priya Sharma demonstrates upper-decile core algorithmic aptitude and clean system design principles. 
              The singular bottleneck preventing qualification for Tier 1 (&gt; ₹12 LPA) packages is hands-on container orchestration 
              (Docker &amp; K8s). Allocating 4 hours in the Next.js/Docker sandbox in Skill-Gap Analysis will push composite score past 85%, 
              unlocking Cisco and Amazon campus drive shortlists.&quot;
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: WHAT-IF SCORE SIMULATOR & RADAR BENCHMARK
          ======================================================== */}
      {activeTab === "simulator" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Interactive Predictive Calibration Engine</span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                What-If Employability Simulator &amp; Tier-1 Radar Matrix
              </h2>
              <p className="text-xs text-slate-500">
                Adjust module scores below to simulate your real-time composite score change and unlock corporate placement drives.
              </p>
            </div>

            <button
              onClick={() => {
                setSimCoding(90);
                setSimAptitude(85);
                setSimInterview(84);
                setSimCoreCs(76);
                setSimResume(88);
                toast("Reset simulator to verified actual test scores!", "info");
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors flex items-center gap-1.5 w-fit"
            >
              <RotateCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset to Verified Actuals</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left: Interactive Sliders */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                Calibrate Dimension Scores
              </h3>

              {/* Slider 1: Coding & DSA */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-blue-600" />
                    <span>Coding Assessment &amp; DSA (35% Weight)</span>
                  </label>
                  <span className="text-sm font-black text-blue-700">{simCoding}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={simCoding}
                  onChange={(e) => setSimCoding(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>40% (Fail Threshold)</span>
                  <span>Verified Actual: 90%</span>
                  <span>100% (Perfect)</span>
                </div>
              </div>

              {/* Slider 2: Quantitative & Aptitude */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <PieChart className="w-4 h-4 text-emerald-600" />
                    <span>Quantitative &amp; Cognitive Aptitude (20% Weight)</span>
                  </label>
                  <span className="text-sm font-black text-emerald-700">{simAptitude}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={simAptitude}
                  onChange={(e) => setSimAptitude(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>40% (Base)</span>
                  <span>Verified Actual: 85%</span>
                  <span>100% (Perfect)</span>
                </div>
              </div>

              {/* Slider 3: AI Mock Interview & Speech */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                    <span>Voice Mock Interview &amp; Logic (25% Weight)</span>
                  </label>
                  <span className="text-sm font-black text-purple-700">{simInterview}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={simInterview}
                  onChange={(e) => setSimInterview(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>40% (Needs Polish)</span>
                  <span>Verified Actual: 84%</span>
                  <span>100% (Executive Clarity)</span>
                </div>
              </div>

              {/* Slider 4: Core CS & System Design */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-amber-600" />
                    <span>Core OS, Networks &amp; System Design (10% Weight)</span>
                  </label>
                  <span className="text-sm font-black text-amber-700">{simCoreCs}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={simCoreCs}
                  onChange={(e) => setSimCoreCs(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>40% (Basic)</span>
                  <span>Verified Actual: 76%</span>
                  <span>100% (High Scalability)</span>
                </div>
              </div>

              {/* Slider 5: ATS Resume Keyword Density */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-teal-600" />
                    <span>ATS Resume Keyword Density (10% Weight)</span>
                  </label>
                  <span className="text-sm font-black text-teal-700">{simResume}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={simResume}
                  onChange={(e) => setSimResume(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>40% (Generic)</span>
                  <span>Verified Actual: 88%</span>
                  <span>100% (Role Aligned)</span>
                </div>
              </div>
            </div>

            {/* Right: Real-Time Projected Score & Drive Unlocks */}
            <div className="space-y-5">
              
              {/* Projected Score Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-500/20 text-center relative overflow-hidden">
                <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest">
                  Simulated Predictive Placement Score
                </div>
                <div className="text-5xl font-black text-white mt-2 flex items-center justify-center gap-2">
                  <span>{simulatedComposite}</span>
                  <span className="text-sm font-bold text-emerald-400">/ 100</span>
                </div>

                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className={`text-xs font-black px-3 py-0.5 rounded-full ${
                    simulatedComposite >= 84 
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  }`}>
                    {simulatedComposite >= 84 ? "Tier-1 Super Dream Eligible" : "Tier-2 Core Standard"}
                  </span>
                  <span className="text-xs text-slate-400">
                    Delta: {simulatedComposite >= 84 ? `+${simulatedComposite - 84}%` : `${simulatedComposite - 84}%`} vs Baseline
                  </span>
                </div>
              </div>

              {/* Dynamic Company Drive Unlocks */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                    Live Drive Eligibility Under Current Simulation
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Dynamic Matching
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Company 1 */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">TCS Digital • Full Stack Trainee</div>
                      <div className="text-[10px] text-slate-400">Cutoff: 75% Score • CTC: ₹7.5 LPA</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 100% Unlocked
                    </span>
                  </div>

                  {/* Company 2 */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Cisco • Network Software Engineer</div>
                      <div className="text-[10px] text-slate-400">Cutoff: 82% Score • CTC: ₹12.0 LPA</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 ${
                      simulatedComposite >= 82
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {simulatedComposite >= 82 ? <CheckCircle2 className="w-3 h-3" /> : null}
                      {simulatedComposite >= 82 ? "Unlocked" : `Needs ${82 - simulatedComposite}% more`}
                    </span>
                  </div>

                  {/* Company 3 */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Microsoft • Cloud Solution Architect</div>
                      <div className="text-[10px] text-slate-400">Cutoff: 88% Score • CTC: ₹18.5 LPA</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 ${
                      simulatedComposite >= 88
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {simulatedComposite >= 88 ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertTriangle className="w-3 h-3" />}
                      {simulatedComposite >= 88 ? "Unlocked 🎉" : `Needs ${88 - simulatedComposite}% more`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Spider / Radar Comparison Chart SVG */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                    Candidate vs Tier-1 Industry Benchmark Radar
                  </h4>
                  <div className="flex items-center gap-3 text-[10px] font-bold">
                    <span className="flex items-center gap-1 text-blue-600">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span> Candidate
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Tier-1 Cutoff
                    </span>
                  </div>
                </div>

                {/* Radar SVG Visualizer */}
                <div className="flex justify-center py-2">
                  <svg className="w-64 h-64" viewBox="0 0 240 240">
                    {/* Background Concentric Pentagons */}
                    {[1, 0.75, 0.5, 0.25].map((scale, i) => (
                      <polygon
                        key={i}
                        points="120,30 205,92 173,190 67,190 35,92"
                        transform={`scale(${scale}) translate(${120 * (1 - scale)}, ${120 * (1 - scale)})`}
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Radial Axis Lines */}
                    <line x1="120" y1="120" x2="120" y2="30" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="120" y1="120" x2="205" y2="92" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="120" y1="120" x2="173" y2="190" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="120" y1="120" x2="67" y2="190" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="120" y1="120" x2="35" y2="92" stroke="#CBD5E1" strokeWidth="1" />

                    {/* Benchmark Polygon (Green, 80% cutoff) */}
                    <polygon
                      points="120,48 188,97 162,176 78,176 52,97"
                      fill="rgba(16, 185, 129, 0.12)"
                      stroke="#10B981"
                      strokeWidth="2"
                    />

                    {/* Candidate Simulated Polygon (Blue, dynamic) */}
                    <polygon
                      points={`120,${120 - (simCoding / 100) * 90} ${120 + (simAptitude / 100) * 85},${120 - (simAptitude / 100) * 28} ${120 + (simInterview / 100) * 53},${120 + (simInterview / 100) * 70} ${120 - (simCoreCs / 100) * 53},${120 + (simCoreCs / 100) * 70} ${120 - (simResume / 100) * 85},${120 - (simResume / 100) * 28}`}
                      fill="rgba(59, 130, 246, 0.25)"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                    />

                    {/* Axis Labels */}
                    <text x="120" y="20" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1E293B">Coding ({simCoding}%)</text>
                    <text x="212" y="95" textAnchor="start" fontSize="9" fontWeight="bold" fill="#1E293B">Aptitude ({simAptitude}%)</text>
                    <text x="180" y="205" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1E293B">Interview ({simInterview}%)</text>
                    <text x="60" y="205" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1E293B">Core CS ({simCoreCs}%)</text>
                    <text x="25" y="95" textAnchor="end" fontSize="9" fontWeight="bold" fill="#1E293B">ATS ({simResume}%)</text>
                  </svg>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Historical Score Progression & Velocity */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              Readiness Score Evolution &amp; Growth Trajectory
            </h3>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            +16% Net Trajectory Gain
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SCORE_TIMELINE.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>{item.week}</span>
                <span className="text-emerald-600 font-extrabold">{item.delta}</span>
              </div>
              <div className="text-xl font-black text-slate-900">{item.score}%</div>
              <p className="text-[10px] text-slate-500 font-medium truncate">{item.milestone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Institutional Compliance & DigiLocker APAAR Stamp */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900 flex items-center gap-2">
              <span>RGPV State Institutional Placement Lock &amp; NIRF Audit Seal</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                VERIFIED
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              APAAR ID: <span className="font-mono text-slate-700 font-bold">APAAR-6291-0941-8812</span> • DigiLocker Hash: <span className="font-mono text-slate-700 font-bold">SHA256:7f9a88...c41e</span>
            </div>
          </div>
        </div>

        <Link
          href="/student/skill-gap"
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0"
        >
          <span>Proceed to Skill-Gap Analysis &rarr;</span>
        </Link>
      </div>

    </div>
  );
}
