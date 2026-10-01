"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Building2, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  Send,
  XCircle,
  FileText,
  UserCheck,
  Award,
  Loader2
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { Navbar } from "@/components/Navbar";

export default function CompanyDashboardPage() {
  const { toast } = useToast();
  const [drives, setDrives] = useState<any[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [selectedDriveFilter, setSelectedDriveFilter] = useState("all");
  const [selectedStageFilter, setSelectedStageFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Post Drive Modal State
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [isSubmittingDrive, setIsSubmittingDrive] = useState(false);
  const [companyName, setCompanyName] = useState("Tata Consultancy Services (TCS)");
  const [roleTitle, setRoleTitle] = useState("");
  const [ctc, setCtc] = useState("9.0 LPA");
  const [minCgpa, setMinCgpa] = useState("7.0");
  const [maxBacklogs, setMaxBacklogs] = useState("0");
  const [deadline, setDeadline] = useState("2026-11-15");
  const [allowedBranches, setAllowedBranches] = useState("CSE, IT, ECE");

  const fetchApplicants = async () => {
    try {
      const res = await fetch("/api/company/applicants");
      const data = await res.json();
      if (data.success) {
        setApplicants(data.applicants || []);
        setDrives(data.drives || []);
      }
    } catch (err) {
      console.error("Failed to load company applicants", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleUpdateStatus = async (applicationId: string, newStatus: string, candidateName: string) => {
    try {
      const res = await fetch("/api/company/applicants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId,
          status: newStatus,
          notes: `Updated by Corporate Recruitment Cell on ${new Date().toLocaleDateString()}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast(`Candidate ${candidateName} stage changed to ${newStatus}!`, "success");
        setApplicants((prev) =>
          prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app))
        );
      } else {
        toast(data.message || "Failed to update stage", "error");
      }
    } catch {
      toast("Error updating candidate stage", "error");
    }
  };

  const handleCreateDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleTitle.trim()) {
      toast("Please provide a job role title.", "error");
      return;
    }

    setIsSubmittingDrive(true);
    try {
      const res = await fetch("/api/company/drives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          role: roleTitle,
          ctc,
          minCgpa: Number(minCgpa) || 7.0,
          maxBacklogs: Number(maxBacklogs) || 0,
          deadline,
          allowedBranches: allowedBranches.split(",").map((b) => b.trim()),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast(data.message || "Drive created!", "success");
        setShowDriveModal(false);
        setRoleTitle("");
        await fetchApplicants();
      } else {
        toast(data.message || "Failed to create drive", "error");
      }
    } catch {
      toast("Error creating recruitment drive", "error");
    } finally {
      setIsSubmittingDrive(false);
    }
  };

  const filteredApplicants = applicants.filter((app) => {
    const matchesDrive = selectedDriveFilter === "all" || app.driveId === selectedDriveFilter;
    const matchesStage = selectedStageFilter === "all" || app.status === selectedStageFilter;
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDrive && matchesStage && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Recruiter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-purple-950/20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/10 text-purple-200 border border-white/20 mb-2">
              <Building2 className="w-3.5 h-3.5 text-purple-300" />
              <span>Corporate Recruitment &amp; Talent Vault Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              TCS Campus Talent Pipeline
            </h1>
            <p className="text-xs text-purple-200 mt-1">
              Rajiv Gandhi Proudyogiki Vishwavidyalaya • Review verified applicants, filter by AI Readiness, and schedule interviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDriveModal(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-purple-500/25 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Drive</span>
            </button>
            <Link
              href="/tpo/dashboard"
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
            >
              TPO Desk &rarr;
            </Link>
          </div>
        </div>

        {/* Pipeline Analytics Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Applicants</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{applicants.length}</div>
            <div className="text-[11px] text-purple-600 font-bold mt-0.5">Across all campus drives</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Shortlisted for Review</div>
            <div className="text-2xl font-black text-purple-700 mt-1">
              {applicants.filter((a) => a.status === "SHORTLISTED" || a.status === "INTERVIEW_SCHEDULED").length}
            </div>
            <div className="text-[11px] text-slate-500 font-bold mt-0.5">Met academic thresholds</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Interviews Scheduled</div>
            <div className="text-2xl font-black text-blue-600 mt-1">
              {applicants.filter((a) => a.status === "INTERVIEW_SCHEDULED").length}
            </div>
            <div className="text-[11px] text-blue-600 font-bold mt-0.5">Technical &amp; HR rounds</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Offers Released</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {applicants.filter((a) => a.status === "OFFER_RELEASED").length}
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-0.5">Official letters dispatched</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name or roll..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Stage:</span>
            </div>
            <select
              value={selectedStageFilter}
              onChange={(e) => setSelectedStageFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50"
            >
              <option value="all">All Stages</option>
              <option value="APPLIED">Applied</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
              <option value="OFFER_RELEASED">Offer Released</option>
              <option value="REJECTED">Archived</option>
            </select>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              Candidate Recruitment Pipeline ({filteredApplicants.length})
            </h2>
            <span className="text-[11px] font-bold text-slate-400">
              All credentials DigiLocker verified by University TPO
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-purple-600" />
              <p className="text-xs font-bold">Loading candidate applications...</p>
            </div>
          ) : filteredApplicants.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-bold">No candidates match current filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-[10px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Candidate Details</th>
                    <th className="py-3 px-4">Target Role</th>
                    <th className="py-3 px-4">CGPA / Branch</th>
                    <th className="py-3 px-4">AI Readiness</th>
                    <th className="py-3 px-4">Current Stage</th>
                    <th className="py-3 px-4 text-right">Recruiter Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredApplicants.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-extrabold text-slate-900">{app.studentName}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{app.rollNo}</div>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-700">
                        {app.role}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-extrabold text-slate-900">{app.cgpa} CGPA</span>
                        <span className="text-[10px] text-slate-400 block">{app.branch} (0 Backlogs)</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-emerald-700 text-sm">{app.readinessScore}%</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                            Verified
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          app.status === "OFFER_RELEASED"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.status === "INTERVIEW_SCHEDULED"
                            ? "bg-blue-100 text-blue-800"
                            : app.status === "SHORTLISTED"
                            ? "bg-purple-100 text-purple-800"
                            : app.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1.5">
                        {app.status === "APPLIED" && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, "SHORTLISTED", app.studentName)}
                            className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold transition-all shadow-xs"
                          >
                            Shortlist
                          </button>
                        )}
                        {app.status === "SHORTLISTED" && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, "INTERVIEW_SCHEDULED", app.studentName)}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold transition-all shadow-xs"
                          >
                            Schedule Interview
                          </button>
                        )}
                        {app.status === "INTERVIEW_SCHEDULED" && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, "OFFER_RELEASED", app.studentName)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold transition-all shadow-xs"
                          >
                            Release Offer
                          </button>
                        )}
                        {app.status !== "REJECTED" && app.status !== "OFFER_RELEASED" && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, "REJECTED", app.studentName)}
                            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-700 text-[10px] font-bold transition-all"
                          >
                            Archive
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      {/* Post Drive Modal */}
      {showDriveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <h2 className="text-xl font-black text-slate-900 mb-1">Create Corporate Placement Drive</h2>
            <p className="text-xs text-slate-500 mb-5">
              Specify eligibility thresholds and CTC package to activate for eligible campus students.
            </p>

            <form onSubmit={handleCreateDrive} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Job Role Title</label>
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="e.g. Systems Engineer"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">CTC Package</label>
                  <input
                    type="text"
                    value={ctc}
                    onChange={(e) => setCtc(e.target.value)}
                    placeholder="e.g. 10.5 LPA"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Minimum CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    value={minCgpa}
                    onChange={(e) => setMinCgpa(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Max Active Backlogs</label>
                  <input
                    type="number"
                    value={maxBacklogs}
                    onChange={(e) => setMaxBacklogs(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Allowed Branches (Comma separated)</label>
                <input
                  type="text"
                  value={allowedBranches}
                  onChange={(e) => setAllowedBranches(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50/50"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowDriveModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingDrive}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmittingDrive ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{isSubmittingDrive ? "Publishing..." : "Publish Placement Drive"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
