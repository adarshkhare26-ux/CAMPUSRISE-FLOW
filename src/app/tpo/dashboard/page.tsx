"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  FileSpreadsheet, 
  TrendingUp, 
  Award, 
  Search, 
  Filter, 
  Download, 
  Sparkles,
  BarChart2,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { TPO_ANALYTICS, COMPANY_DRIVES } from "@/lib/mockData";

export default function TpoMasterDashboardPage() {
  const [data, setData] = useState(TPO_ANALYTICS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [showDriveModal, setShowDriveModal] = useState(false);

  // New Drive Form state
  const [newCompany, setNewCompany] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newCtc, setNewCtc] = useState("");
  const [newCutoff, setNewCutoff] = useState("7.0");

  const filteredStudents = data.recentStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.roll.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === "all" || s.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  const handleCreateDrive = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Placement Drive for "${newCompany} - ${newRole} (${newCtc})" launched across university portal with ${newCutoff} CGPA cutoff!`);
    setShowDriveModal(false);
    setNewCompany("");
    setNewRole("");
    setNewCtc("");
  };

  const handleVerifyStudent = (roll: string) => {
    const updated = data.recentStudents.map(s => {
      if (s.roll === roll) return { ...s, verified: !s.verified };
      return s;
    });
    setData({ ...data, recentStudents: updated });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl shadow-xl shadow-slate-900/10">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-blue-400" />
            TPO Master Command Center &amp; Placement Vault
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Rajiv Gandhi Proudyogiki Vishwavidyalaya • Centralized Corporate Placement &amp; Statutory NIRF Compliance Portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Official NIRF 2026 Placement Excel Data Export Generated (Students, CTC, Verified Offer IDs).")}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-2 border border-white/15"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export NIRF / NAAC Data</span>
          </button>

          <button
            onClick={() => setShowDriveModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/30"
          >
            <Plus className="w-4 h-4" />
            <span>Create Placement Drive</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Cohort</span>
          <div className="text-xl font-black text-slate-900 mt-1">{data.totalRegisteredStudents}</div>
          <span className="text-[10px] text-slate-500">2026 Final Year</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Verified Vault Profiles</span>
          <div className="text-xl font-black text-blue-600 mt-1">{data.verifiedProfiles}</div>
          <span className="text-[10px] text-blue-600 font-bold">92.0% Audited</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Placed Students</span>
          <div className="text-xl font-black text-emerald-600 mt-1">{data.placedStudents}</div>
          <span className="text-[10px] text-emerald-600 font-bold">{data.placementPercentage}% Placement Rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Highest Package</span>
          <div className="text-xl font-black text-slate-900 mt-1">{data.highestPackage}</div>
          <span className="text-[10px] text-slate-500">Product SDE</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Average CTC</span>
          <div className="text-xl font-black text-slate-900 mt-1">{data.avgPackage}</div>
          <span className="text-[10px] text-slate-500">+18% vs Last Year</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active Drives</span>
          <div className="text-xl font-black text-purple-600 mt-1">{data.activeDrivesCount}</div>
          <span className="text-[10px] text-purple-600 font-bold">14 Companies Visiting</span>
        </div>
      </div>

      {/* Cohort Heatmap & Branch Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Branch Placement Analytics */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              Branch Placement Percentages &amp; Skill Heatmap
            </h2>
            <span className="text-xs text-slate-400 font-semibold">Live TPO Sync</span>
          </div>

          <div className="space-y-4">
            {data.branchBreakdown.map((b) => (
              <div key={b.branch} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900">{b.branch} ({b.placed}/{b.total} Placed)</span>
                  <span className="text-emerald-700">{b.pct}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"
                    style={{ width: `${b.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Drive Scheduler Mini-Widget */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-700 mb-2">
              <Sparkles className="w-4 h-4" />
              Drive Matching Engine
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              Auto-Match Candidates
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Query students whose course marks and AI Readiness scores match live JD parameters.
            </p>
          </div>

          <div className="space-y-2.5 pt-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-800">TCS Digital Prime (7.0+ CGPA)</div>
              <div className="text-[11px] text-emerald-600 font-semibold">242 Students Match Criteria</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-800">Cisco Consulting (8.0+ CGPA)</div>
              <div className="text-[11px] text-emerald-600 font-semibold">98 Students Match Criteria</div>
            </div>
          </div>

          <button
            onClick={() => setShowDriveModal(true)}
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            Configure Custom Drive Criteria
          </button>
        </div>

      </div>

      {/* Student Directory & Verification Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Student Placement Directory &amp; TPO Vault Verification
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verify credentials, inspect digital resumes, and toggle active drive eligibility.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search roll or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              />
            </div>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
            >
              <option value="all">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
            </select>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Roll Number</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Branch</th>
                <th className="py-3 px-3">CGPA</th>
                <th className="py-3 px-3">Backlogs</th>
                <th className="py-3 px-3">Readiness</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">TPO Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredStudents.map((s) => (
                <tr key={s.roll} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{s.roll}</td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{s.name}</span>
                      {s.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200" title="DigiLocker NAD & Aadhaar Authenticated">
                          DL Verified
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3">{s.branch}</td>
                  <td className="py-3 px-3 font-black text-blue-700">{s.cgpa}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.backlogs === 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                    }`}>
                      {s.backlogs}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-extrabold text-emerald-600">{s.readiness}%</span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-600">{s.status}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleVerifyStudent(s.roll)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                        s.verified
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      }`}
                    >
                      {s.verified ? "Verified ✓" : "Pending Audit"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Placement Drive */}
      {showDriveModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Create New Campus Placement Drive
              </h3>
              <button
                onClick={() => setShowDriveModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDrive} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Visiting Company Name</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Goldman Sachs India"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Designation / Role Title</label>
                <input
                  type="text"
                  required
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="e.g. Associate Software Engineer"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offered CTC Package</label>
                  <input
                    type="text"
                    required
                    value={newCtc}
                    onChange={(e) => setNewCtc(e.target.value)}
                    placeholder="e.g. ₹12.5 LPA"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Minimum CGPA Cutoff</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newCutoff}
                    onChange={(e) => setNewCutoff(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDriveModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-sm"
                >
                  Launch Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
