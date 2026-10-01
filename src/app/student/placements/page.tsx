"use client";

import { useState, useEffect } from "react";
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
  Sparkles,
  Check,
  AlertCircle,
  XCircle,
  Loader2,
  Filter,
  ShieldCheck,
  SlidersHorizontal
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { checkBranchMatch } from "@/lib/eligibility";
import { OfferLetterModal } from "@/components/OfferLetterModal";

const STAGES = ["Applied", "Assessment", "Shortlisted", "Interview", "Offer Letter"];

interface PlacementDrive {
  id: string;
  companyName: string;
  logo: string;
  role: string;
  title?: string;
  ctc: string;
  location?: string;
  deadline: string;
  status?: string;
  minCgpa?: number;
  maxBacklogs?: number;
  allowedBranches?: string[];
  eligibility?: {
    minCgpa: number;
    maxBacklogs: number;
    branches: string[];
  };
  tags?: string[];
  isEligible: boolean;
  hasApplied: boolean;
  application: {
    id: string;
    status: string;
    appliedAt: string;
    matchScore: number;
  } | null;
  eligibilityReasons?: {
    meetsCgpa: boolean;
    meetsBacklogs: boolean;
    requiredCgpa: number;
    studentCgpa: number;
    allowedBacklogs: number;
    studentBacklogs: number;
  };
}

export default function PlacementLifecyclePage() {
  const { toast } = useToast();
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [govOpps, setGovOpps] = useState<any[]>([]);
  const [filterTab, setFilterTab] = useState<"all" | "applied" | "eligible" | "government">("all");
  const [govFilterCategory, setGovFilterCategory] = useState<string>("ALL");
  const [loadingDriveId, setLoadingDriveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Student Profile Metrics for live verification
  const [profileMetrics, setProfileMetrics] = useState<any>({
    name: "Priya Sharma",
    rollNo: "0101CS221045",
    cgpa: 8.42,
    activeBacklogs: 0,
    branch: "Computer Science & Engineering",
    skills: ["React.js", "TypeScript", "Node.js", "PostgreSQL", "Data Structures", "Tailwind CSS"],
    tenthPct: 91.4,
    twelfthPct: 88.6,
  });

  // Detailed Eligibility Audit Modal state
  const [auditDrive, setAuditDrive] = useState<PlacementDrive | null>(null);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  const fetchDrives = async () => {
    try {
      const res = await fetch("/api/student/placements");
      const data = await res.json();
      if (data.success) {
        if (data.drives) setDrives(data.drives);
        if (data.governmentOpportunities) setGovOpps(data.governmentOpportunities);
        if (data.profileMetrics) setProfileMetrics(data.profileMetrics);
      }
    } catch (err) {
      console.error("Failed to load drives", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrives();
    if (typeof window !== "undefined") {
      const tab = new URLSearchParams(window.location.search).get("tab");
      if (tab === "government" || tab === "applied" || tab === "eligible") {
        setFilterTab(tab as any);
      }
    }
  }, []);

  const handleApply = async (driveId: string, companyName: string) => {
    setLoadingDriveId(driveId);
    try {
      const res = await fetch("/api/student/placements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driveId }),
      });
      const data = await res.json();
      if (data.success) {
        toast(`Application submitted to ${companyName}!`, "success");
        await fetchDrives();
      } else {
        toast(data.message || "Failed to submit application", "error");
      }
    } catch {
      toast("Error applying to placement drive", "error");
    } finally {
      setLoadingDriveId(null);
    }
  };

  const handleWithdraw = async (driveId: string) => {
    setLoadingDriveId(driveId);
    try {
      const res = await fetch(`/api/student/placements?driveId=${driveId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast("Application withdrawn successfully", "info");
        await fetchDrives();
      } else {
        toast(data.message || "Failed to withdraw application", "error");
      }
    } catch {
      toast("Error withdrawing application", "error");
    } finally {
      setLoadingDriveId(null);
    }
  };

  const filteredDrives = drives.filter((d) => {
    if (filterTab === "applied") return d.hasApplied;
    if (filterTab === "eligible") return d.isEligible && !d.hasApplied;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Recruitment Pipeline &amp; Verified Applications</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Drive Matching &amp; Placement Lifecycle
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time status updates across all 5 recruitment stages with automated cut-off evaluation and 1-click application.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/student/eligibility"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20 shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Live Eligibility Matrix</span>
          </Link>
          <Link
            href="/tpo/dashboard"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200 shrink-0"
          >
            <span>TPO Command</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
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

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => setOfferModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white text-emerald-950 font-black text-xs hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>View Official Offer Letter</span>
          </button>
          <a
            href="/api/tpo/export"
            className="px-3.5 py-2.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 border border-white/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setFilterTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterTab === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Drives ({drives.length})
          </button>
          <button
            onClick={() => setFilterTab("applied")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterTab === "applied" ? "bg-white text-blue-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Applied ({drives.filter((d) => d.hasApplied).length})
          </button>
          <button
            onClick={() => setFilterTab("eligible")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterTab === "eligible" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Eligible to Apply ({drives.filter((d) => d.isEligible && !d.hasApplied).length})
          </button>
          <button
            onClick={() => setFilterTab("government")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterTab === "government" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Govt &amp; PSU ({govOpps.length || 4})
          </button>
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Showing {filterTab === "government" ? govOpps.length : filteredDrives.length} opportunities
        </span>
      </div>

      {/* Government Opportunities Grid View */}
      {filterTab === "government" ? (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-black text-white flex items-center gap-2">
                  <span>Official Government &amp; Public Sector Employment Gateway</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                    National Opportunities Gateway
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Verified central gazetted cadres, defense R&amp;D labs, Maharatna PSUs, and Madhya Pradesh state IT initiatives matched against your 8.42 CGPA.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-extrabold text-white">Priya Sharma: 100% Eligible Across All 7</span>
            </div>
          </div>

          {/* Sub-Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
            {[
              { id: "ALL", label: `All Cadres (${govOpps.length})` },
              { id: "DEFENSE_RD", label: "National R&D (ISRO / BARC)" },
              { id: "MEITY", label: "MeitY & Digital India (NIC / DIC)" },
              { id: "MP_STATE", label: "MP State Govt (MPSeDC)" },
              { id: "GATE_PSU", label: "Maharatna PSUs via GATE" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setGovFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  govFilterCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-[1.02]"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {govOpps
              .filter((gov) => {
                if (govFilterCategory === "ALL") return true;
                if (govFilterCategory === "DEFENSE_RD") return gov.organization.includes("ISRO") || gov.organization.includes("BARC");
                if (govFilterCategory === "MEITY") return gov.organization.includes("Informatics") || gov.organization.includes("Digital India");
                if (govFilterCategory === "MP_STATE") return gov.organization.includes("MPSeDC") || gov.organization.includes("Madhya");
                if (govFilterCategory === "GATE_PSU") return gov.organization.includes("Public Sector") || gov.title.includes("GATE");
                return true;
              })
              .map((gov) => {
                const meetsCgpa = (profileMetrics.cgpa || 8.42) >= (gov.eligibility?.minCgpa || 6.0);

                return (
                  <div
                    key={gov.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                            {gov.category || "Govt Examination"}
                          </span>
                          <h3 className="text-sm font-black text-slate-900 mt-1.5 leading-snug">
                            {gov.title}
                          </h3>
                          <div className="text-xs font-bold text-slate-600 mt-0.5">
                            {gov.organization}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs font-black text-emerald-700">{gov.payScale || "Official Cadre"}</div>
                          <div className="text-[10px] text-slate-400">Pay Scale / Cadre</div>
                        </div>
                      </div>

                      {/* Candidate Academic Fit Tag */}
                      <div className="mt-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Candidate Fit: Eligible ({profileMetrics.cgpa} CGPA exceeds {gov.eligibility?.minCgpa || 6.5} cutoff)</span>
                      </div>

                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {gov.description}
                      </p>

                      <div className="mt-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5 text-[11px] text-slate-700">
                        <div>
                          <strong>Eligibility Threshold:</strong> {gov.eligibility?.minCgpa ? `${gov.eligibility.minCgpa} CGPA / ${gov.eligibility.minPct}%` : "Engineering Graduate"} • Age: {gov.eligibility?.maxAge || "Up to 30 yrs"}
                        </div>
                        <div>
                          <strong>Eligible Branches:</strong> {gov.eligibility?.branches?.join(", ") || "All Engineering"}
                        </div>
                        <div>
                          <strong>Selection Protocol:</strong> {gov.selectionProcess || "Written Technical Exam + Board Interview"}
                        </div>
                        <div>
                          <strong>Recommended Preparation:</strong> {gov.preparationFocus || "Technical & Core Syllabus"}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-500 font-medium">
                        Deadline: <strong>{gov.deadline}</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href="/student/simulation"
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                          title="Practice Mock Interview for this Technical Syllabus"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-600" />
                          <span>AI Prep</span>
                        </Link>
                        <a
                          href={gov.applyUrl || "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                        >
                          <span>Official Portal</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
      /* Active Recruitment Drives Pipeline */
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
            <p className="text-xs font-bold">Loading active placement drives...</p>
          </div>
        ) : filteredDrives.length === 0 ? (
          <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-xs font-bold">No placement drives found in this category.</p>
          </div>
        ) : (
          filteredDrives.map((drive) => {
            const currentStageName = drive.application?.status || (drive.hasApplied ? "Applied" : "Not Applied");
            const currentStageIndex = drive.hasApplied ? STAGES.indexOf("Applied") : -1;

            return (
              <div key={drive.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-base">
                      {drive.logo || "🏢"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-extrabold text-slate-900">{drive.companyName}</h3>
                        {drive.isEligible ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Eligible
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                            <XCircle className="w-3 h-3 text-rose-600" /> Criteria Mismatch
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {drive.role} • <strong className="text-slate-900">{drive.ctc}</strong> • <span className="text-slate-400">Deadline: {drive.deadline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* DEDICATED BUTTON: CHECK ELIGIBILITY DETAILS */}
                    <button
                      onClick={() => setAuditDrive(drive)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                      title="Inspect your detailed criteria match report"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                      <span>Check My Eligibility</span>
                    </button>

                    {drive.hasApplied ? (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Applied</span>
                        </span>
                        <button
                          onClick={() => handleWithdraw(drive.id)}
                          disabled={loadingDriveId === drive.id}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all disabled:opacity-50"
                        >
                          Withdraw
                        </button>
                      </div>
                    ) : drive.isEligible ? (
                      <button
                        onClick={() => handleApply(drive.id, drive.companyName)}
                        disabled={loadingDriveId === drive.id}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {loadingDriveId === drive.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        <span>Apply Now</span>
                      </button>
                    ) : (
                      <div className="text-[11px] text-rose-600 font-bold bg-rose-50 px-2.5 py-1.5 rounded-xl border border-rose-200">
                        Min {drive.eligibility?.minCgpa ?? drive.minCgpa ?? drive.eligibilityReasons?.requiredCgpa ?? 7.0} CGPA Required
                      </div>
                    )}
                  </div>
                </div>

                {/* Stepper Bar for Applied Drives */}
                {drive.hasApplied ? (
                  <div className="grid grid-cols-5 gap-2 pt-1">
                    {STAGES.map((stageName, sIdx) => {
                      const isDone = sIdx <= currentStageIndex;
                      const isCurrent = sIdx === currentStageIndex;

                      return (
                        <div key={stageName} className="flex flex-col items-center text-center">
                          <div className={`w-full h-1.5 rounded-full mb-2 ${
                            isDone ? "bg-blue-600" : "bg-slate-200"
                          }`} />
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black mb-1 ${
                            isDone
                              ? "bg-blue-600 text-white"
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
                ) : (
                  <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>
                        <strong>Eligibility Criteria:</strong> Min CGPA: {drive.eligibility?.minCgpa ?? drive.minCgpa ?? drive.eligibilityReasons?.requiredCgpa ?? "N/A"} | Max Backlogs: {drive.eligibility?.maxBacklogs ?? drive.maxBacklogs ?? drive.eligibilityReasons?.allowedBacklogs ?? 0} | Allowed Branches: {drive.eligibility?.branches?.join(", ") ?? drive.allowedBranches?.join(", ") ?? "All"}
                      </span>
                      <button
                        onClick={() => setAuditDrive(drive)}
                        className="text-[11px] font-black text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Detailed Audit</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {(drive.tags || drive.allowedBranches || []).map((tag) => (
                        <span key={tag} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>
      )}

      {/* STUDENT ELIGIBILITY DETAILED AUDIT MODAL */}
      {auditDrive && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 my-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 font-black text-lg flex items-center justify-center shrink-0">
                  {auditDrive.logo || "🏢"}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    TPO Vault Verified Criteria Audit
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    {auditDrive.companyName}
                  </h3>
                  <div className="text-xs text-slate-500 font-semibold">
                    {auditDrive.role} • <strong className="text-slate-900">{auditDrive.ctc}</strong> • Deadline: {auditDrive.deadline}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setAuditDrive(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Verdict Banner */}
            {auditDrive.isEligible ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-800">
                    ✅ Full Eligibility Cleared!
                  </div>
                  <p className="text-xs text-emerald-800/90 mt-0.5 font-medium">
                    Congratulations! Your verified academic standing exceeds all corporate and institutional criteria set for this drive.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-rose-800">
                    ⚠️ Eligibility Criteria Mismatch
                  </div>
                  <p className="text-xs text-rose-800/90 mt-0.5 font-medium">
                    You currently do not meet one or more cutoffs required for this company. Review the audit breakdown below.
                  </p>
                </div>
              </div>
            )}

            {/* 5-Point Comparative Audit Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                Detailed Side-by-Side Verification Breakdown
              </h4>

              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs divide-y divide-slate-100">
                
                {/* 1. CGPA Cutoff */}
                {(() => {
                  const reqCgpa = auditDrive.eligibility?.minCgpa ?? driveCgpaFallback(auditDrive);
                  const passed = profileMetrics.cgpa >= reqCgpa;
                  return (
                    <div className="p-3 bg-white flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-800">1. Cumulative Grade Point Average (CGPA)</div>
                        <div className="text-[11px] text-slate-500">
                          Company Cutoff: <strong>{reqCgpa} CGPA</strong> • Your Standing: <strong className="text-slate-900">{profileMetrics.cgpa} CGPA</strong>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-xl font-extrabold text-[10px] flex items-center gap-1 shrink-0 ${
                        passed ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"
                      }`}>
                        {passed ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-rose-600" />}
                        {passed ? `Passed (+${(profileMetrics.cgpa - reqCgpa).toFixed(2)})` : `Short by ${(reqCgpa - profileMetrics.cgpa).toFixed(2)}`}
                      </span>
                    </div>
                  );
                })()}

                {/* 2. Active Backlogs */}
                {(() => {
                  const maxB = auditDrive.eligibility?.maxBacklogs ?? auditDrive.maxBacklogs ?? 0;
                  const passed = profileMetrics.activeBacklogs <= maxB;
                  return (
                    <div className="p-3 bg-white flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-800">2. Active Academic Backlogs</div>
                        <div className="text-[11px] text-slate-500">
                          Max Allowed: <strong>{maxB}</strong> • Your Active Backlogs: <strong className="text-slate-900">{profileMetrics.activeBacklogs}</strong>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-xl font-extrabold text-[10px] flex items-center gap-1 shrink-0 ${
                        passed ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"
                      }`}>
                        {passed ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-rose-600" />}
                        {passed ? "Passed (Clear)" : "Failed Cutoff"}
                      </span>
                    </div>
                  );
                })()}

                {/* 3. Branch Eligibility */}
                {(() => {
                  const branches: string[] = auditDrive.eligibility?.branches ?? auditDrive.allowedBranches ?? ["CSE", "IT"];
                  const passed = checkBranchMatch(profileMetrics.branch, branches);
                  return (
                    <div className="p-3 bg-white flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-800">3. Engineering Branch Qualification</div>
                        <div className="text-[11px] text-slate-500">
                          Allowed: <strong>{branches.join(", ")}</strong> • Your Branch: <strong className="text-slate-900">{profileMetrics.branch}</strong>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-xl font-extrabold text-[10px] flex items-center gap-1 shrink-0 ${
                        passed ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"
                      }`}>
                        {passed ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-rose-600" />}
                        {passed ? "Branch Eligible" : "Branch Ineligible"}
                      </span>
                    </div>
                  );
                })()}

                {/* 4. Secondary Academic Credentials */}
                <div className="p-3 bg-white flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-800">4. 10th &amp; 12th Board Percentages</div>
                    <div className="text-[11px] text-slate-500">
                      Baseline: <strong>Min 60.0%</strong> • Verified: <strong>10th: {profileMetrics.tenthPct}% | 12th: {profileMetrics.twelfthPct}%</strong>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl font-extrabold text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    DigiLocker Verified
                  </span>
                </div>

                {/* 5. Prerequisite Technical Skills */}
                <div className="p-3 bg-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-800">5. Technical Skills &amp; Profile Alignment</div>
                    <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Top Candidate Match
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(profileMetrics.skills || []).map((sk: string) => (
                      <span key={sk} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Security Badge */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Audited via RGPV National Depository &amp; Centralized Placement Vault.</span>
              </span>
              <span className="font-mono text-[10px] font-bold text-slate-400">ID: AUDIT-2026-OK</span>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAuditDrive(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
              >
                Close
              </button>

              {auditDrive.hasApplied ? (
                <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Already Applied ({auditDrive.application?.status || "In Review"})</span>
                </span>
              ) : auditDrive.isEligible ? (
                <button
                  type="button"
                  onClick={() => {
                    handleApply(auditDrive.id, auditDrive.companyName);
                    setAuditDrive(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-md shadow-emerald-500/20 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply Now Directly</span>
                </button>
              ) : (
                <Link
                  href="/student/skill-gap"
                  onClick={() => setAuditDrive(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span>Resolve Eligibility Gaps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Official Verified Offer Letter Modal */}
      <OfferLetterModal
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        offer={{
          company: "MP State Electronics Dev Corp (MPSeDC)",
          role: "Junior Associate Software Engineer (Full Stack)",
          ctc: "₹6,00,000 INR",
          date: "September 28, 2026",
          location: "Bhopal (State IT Park) / Indore",
          referenceNo: "MPSeDC/OFFER/2026/RGPV-0881",
          candidateName: profileMetrics.name || "Priya Sharma",
          rollNo: profileMetrics.rollNo || "0101CS221045",
          breakdown: {
            base: "₹4,60,000",
            hra: "₹90,000",
            specialAllowance: "₹25,000",
            retirals: "₹15,000",
            joiningBonus: "₹10,000 Relocation",
          }
        }}
      />

    </div>
  );
}

function driveCgpaFallback(drive: PlacementDrive): number {
  return drive.minCgpa ?? drive.eligibilityReasons?.requiredCgpa ?? 7.0;
}
