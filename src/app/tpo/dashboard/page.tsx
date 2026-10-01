"use client";

import { useState, useEffect } from "react";
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
  Briefcase,
  Loader2,
  SlidersHorizontal,
  Edit3,
  Calendar,
  Layers,
  Check,
  AlertCircle
} from "lucide-react";
import { TPO_ANALYTICS, COMPANY_DRIVES } from "@/lib/mockData";
import { useToast } from "@/components/Toast";

const AVAILABLE_BRANCHES = ["CSE", "IT", "ECE", "AI_DS", "ME", "CE", "EE"];

export default function TpoMasterDashboardPage() {
  const { toast } = useToast();
  const [data, setData] = useState(TPO_ANALYTICS);
  const [drivesList, setDrivesList] = useState<any[]>(COMPANY_DRIVES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [isCreatingDrive, setIsCreatingDrive] = useState(false);

  // New Drive Form state
  const [newCompany, setNewCompany] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newCtc, setNewCtc] = useState("");
  const [newCutoff, setNewCutoff] = useState("7.0");
  const [newMaxBacklogs, setNewMaxBacklogs] = useState("0");
  const [newBranches, setNewBranches] = useState<string[]>(["CSE", "IT", "ECE"]);

  // Eligibility Manager Modal state
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [isSavingEligibility, setIsSavingEligibility] = useState(false);
  const [eligibilityDriveId, setEligibilityDriveId] = useState<string>("NEW");
  const [eligibilityCompany, setEligibilityCompany] = useState("");
  const [eligibilityRole, setEligibilityRole] = useState("");
  const [eligibilityCtc, setEligibilityCtc] = useState("8.5 LPA");
  const [eligibilityMinCgpa, setEligibilityMinCgpa] = useState<number>(7.0);
  const [eligibilityMaxBacklogs, setEligibilityMaxBacklogs] = useState<number>(0);
  const [eligibilityBranches, setEligibilityBranches] = useState<string[]>(["CSE", "IT", "ECE"]);
  const [eligibilitySkills, setEligibilitySkills] = useState("React.js, Node.js, DSA, SQL");
  const [eligibilityMinTenth, setEligibilityMinTenth] = useState<number>(60);
  const [eligibilityMinTwelfth, setEligibilityMinTwelfth] = useState<number>(60);
  const [eligibilityDeadline, setEligibilityDeadline] = useState("2026-11-30");
  const [eligibilityNotes, setEligibilityNotes] = useState("Standard campus placement criteria and verification required.");

  const fetchTpoStats = async () => {
    try {
      const res = await fetch("/api/tpo/students");
      const resData = await res.json();
      if (resData.success) {
        setData((prev) => ({
          ...prev,
          recentStudents: resData.students || prev.recentStudents,
          totalRegisteredStudents: resData.stats?.totalStudents ?? prev.totalRegisteredStudents,
          placedStudents: resData.stats?.placedCount ?? prev.placedStudents,
          activeDrivesCount: resData.stats?.activeDrivesCount ?? prev.activeDrivesCount,
          placementPercentage: resData.stats?.placementPct ?? prev.placementPercentage,
        }));
      }

      // Fetch dynamic drives & eligibility
      const drivesRes = await fetch("/api/tpo/eligibility");
      const drivesData = await drivesRes.json();
      if (drivesData.success && drivesData.drives) {
        setDrivesList(drivesData.drives);
      }
    } catch (err) {
      console.error("Failed to load TPO stats", err);
    }
  };

  useEffect(() => {
    fetchTpoStats();
  }, []);

  const filteredStudents = data.recentStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.roll.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === "all" || s.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  // Calculate live cohort match for chosen eligibility criteria
  const matchingStudentsCount = data.recentStudents.filter((s) => {
    const cgpaOk = s.cgpa >= eligibilityMinCgpa;
    const backlogsOk = s.backlogs <= eligibilityMaxBacklogs;
    const branchOk = eligibilityBranches.includes("ALL") || eligibilityBranches.some((b) => s.branch.includes(b));
    return cgpaOk && backlogsOk && branchOk;
  }).length;

  const openEligibilityModal = (drive?: any) => {
    if (drive) {
      setEligibilityDriveId(drive.id);
      setEligibilityCompany(drive.companyName);
      setEligibilityRole(drive.role);
      setEligibilityCtc(drive.ctc || "8.0 LPA");
      setEligibilityMinCgpa(drive.minCgpa ?? 7.0);
      setEligibilityMaxBacklogs(drive.maxBacklogs ?? 0);
      setEligibilityBranches(drive.allowedBranches && drive.allowedBranches.length > 0 ? drive.allowedBranches : ["CSE", "IT"]);
      setEligibilitySkills(drive.requiredSkills?.join(", ") || "DSA, Problem Solving, Core CS, DBMS");
      setEligibilityMinTenth(drive.minTenthPct || 60);
      setEligibilityMinTwelfth(drive.minTwelfthPct || 60);
      setEligibilityDeadline(drive.deadline || "2026-11-30");
      setEligibilityNotes(drive.notes || "Minimum verification status required from TPO Vault.");
    } else {
      setEligibilityDriveId("NEW");
      setEligibilityCompany("");
      setEligibilityRole("");
      setEligibilityCtc("8.5 LPA");
      setEligibilityMinCgpa(7.0);
      setEligibilityMaxBacklogs(0);
      setEligibilityBranches(["CSE", "IT", "ECE"]);
      setEligibilitySkills("Full Stack Development, DSA, SQL");
      setEligibilityMinTenth(60);
      setEligibilityMinTwelfth(60);
      setEligibilityDeadline("2026-11-30");
      setEligibilityNotes("Active placement drive criteria for 2026 graduating batch.");
    }
    setShowEligibilityModal(true);
  };

  const handleSelectDriveInModal = (driveId: string) => {
    if (driveId === "NEW") {
      openEligibilityModal();
      return;
    }
    const found = drivesList.find((d) => d.id === driveId);
    if (found) {
      openEligibilityModal(found);
    }
  };

  const toggleBranchSelection = (branch: string) => {
    setEligibilityBranches((prev) => 
      prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]
    );
  };

  const handleSaveEligibility = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eligibilityCompany.trim() || !eligibilityRole.trim()) {
      toast("Please provide company name and job role.", "error");
      return;
    }
    if (eligibilityBranches.length === 0) {
      toast("Please select at least one eligible branch.", "error");
      return;
    }

    setIsSavingEligibility(true);
    try {
      const payload: any = {
        companyName: eligibilityCompany,
        role: eligibilityRole,
        ctc: eligibilityCtc,
        minCgpa: Number(eligibilityMinCgpa),
        maxBacklogs: Number(eligibilityMaxBacklogs),
        allowedBranches: eligibilityBranches,
        requiredSkills: eligibilitySkills.split(",").map((s) => s.trim()).filter(Boolean),
        minTenthPct: Number(eligibilityMinTenth),
        minTwelfthPct: Number(eligibilityMinTwelfth),
        deadline: eligibilityDeadline,
        notes: eligibilityNotes,
      };

      if (eligibilityDriveId !== "NEW") {
        payload.driveId = eligibilityDriveId;
      }

      const res = await fetch("/api/tpo/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const resData = await res.json();
      if (resData.success) {
        toast(`Eligibility criteria for ${eligibilityCompany} saved and broadcasted to students!`, "success");
        setShowEligibilityModal(false);
        await fetchTpoStats();
      } else {
        toast(resData.message || "Failed to update eligibility", "error");
      }
    } catch {
      toast("Error communicating with server", "error");
    } finally {
      setIsSavingEligibility(false);
    }
  };

  const handleCreateDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) {
      toast("Please provide company name and job role.", "error");
      return;
    }

    setIsCreatingDrive(true);
    try {
      const res = await fetch("/api/tpo/drives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: newCompany,
          role: newRole,
          ctc: newCtc || "8.0 LPA",
          minCgpa: Number(newCutoff) || 6.5,
          maxBacklogs: Number(newMaxBacklogs) || 0,
          allowedBranches: newBranches,
        }),
      });
      const resData = await res.json();
      if (resData.success) {
        toast(`Placement drive for ${newCompany} posted successfully! It is now live on the Student Portal.`, "success");
        setShowDriveModal(false);
        setNewCompany("");
        setNewRole("");
        setNewCtc("");
        await fetchTpoStats();
      } else {
        toast(resData.message || "Failed to create drive", "error");
      }
    } catch {
      toast("Error creating drive on server", "error");
    } finally {
      setIsCreatingDrive(false);
    }
  };

  const handleVerifyStudent = async (roll: string) => {
    try {
      await fetch("/api/tpo/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationId: roll, status: "VERIFIED" }),
      });
      const updated = data.recentStudents.map(s => {
        if (s.roll === roll) return { ...s, verified: !s.verified };
        return s;
      });
      setData({ ...data, recentStudents: updated });
      toast(`Verification status updated for Roll No ${roll}!`, "success");
    } catch {
      toast("Failed to verify student record", "error");
    }
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

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="/api/tpo/export"
            download="campusrise_placement_report_2026.csv"
            className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5 border border-white/15"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export NIRF Data</span>
          </a>

          {/* DEDICATED ELIGIBILITY CRITERIA BUTTON */}
          <button
            onClick={() => openEligibilityModal()}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/30"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Set Eligibility Criteria</span>
          </button>

          <button
            onClick={() => setShowDriveModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/30"
          >
            <Plus className="w-4 h-4" />
            <span>Create Drive</span>
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
          <div className="text-xl font-black text-purple-600 mt-1">{drivesList.length}</div>
          <span className="text-[10px] text-purple-600 font-bold">Configured Criteria</span>
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
              Drive Eligibility Engine
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              Active Criteria &amp; Cutoffs
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Set CGPA minimums, allowed backlogs, and approved engineering branches for recruiters.
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
            onClick={() => openEligibilityModal()}
            className="w-full mt-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Set / Modify Eligibility Info</span>
          </button>
        </div>

      </div>

      {/* DEDICATED SECTION: Corporate Placement Drives & Live Eligibility Rules */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              Active Placement Drives &amp; Configured Eligibility Cutoffs
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and adjust CGPA, backlog thresholds, and branches for each visiting company.
            </p>
          </div>

          <button
            onClick={() => openEligibilityModal()}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Criteria</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drivesList.map((drive) => {
            const minCgpa = drive.eligibility?.minCgpa ?? drive.minCgpa ?? 7.0;
            const maxBacklogs = drive.eligibility?.maxBacklogs ?? drive.maxBacklogs ?? 0;
            const branches = drive.eligibility?.branches ?? drive.allowedBranches ?? ["CSE", "IT"];

            return (
              <div 
                key={drive.id}
                className="p-4 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between bg-slate-50/40"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center shrink-0">
                        {drive.logo || "🏢"}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 leading-snug">{drive.companyName}</h4>
                        <span className="text-[11px] font-bold text-slate-500">{drive.role}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 shrink-0">
                      {drive.ctc}
                    </span>
                  </div>

                  {/* Cutoff Badges */}
                  <div className="mt-3.5 space-y-1.5 bg-white p-3 rounded-xl border border-slate-200/80 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Min CGPA Cutoff:</span>
                      <strong className="text-slate-900 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-black border border-emerald-200">
                        {minCgpa} CGPA
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Max Backlogs:</span>
                      <strong className={`px-2 py-0.5 rounded font-black ${
                        maxBacklogs === 0 ? "bg-slate-100 text-slate-800" : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}>
                        {maxBacklogs === 0 ? "0 (Zero Allowed)" : `Up to ${maxBacklogs}`}
                      </strong>
                    </div>
                    <div className="pt-1 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Allowed Branches:</span>
                      <span className="font-extrabold text-slate-800">{branches.join(", ")}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Deadline:</span>
                      <span>{drive.deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Enforced by Vault
                  </span>
                  <button
                    onClick={() => openEligibilityModal(drive)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Eligibility</span>
                  </button>
                </div>
              </div>
            );
          })}
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
              Verify credentials, inspect digital resumes, and audit student eligibility records.
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

      {/* MODAL 1: TPO ELIGIBILITY CRITERIA MANAGER */}
      {showEligibilityModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Placement Eligibility Criteria Manager
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Input &amp; configure academic cutoffs, allowed branches, and prerequisite skills.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEligibilityModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEligibility} className="space-y-4 text-xs">
              
              {/* Drive Selection Dropdown */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Drive to Configure</label>
                <select
                  value={eligibilityDriveId}
                  onChange={(e) => handleSelectDriveInModal(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:bg-white"
                >
                  <option value="NEW">+ Configure New Company Criteria</option>
                  {drivesList.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.companyName} • {d.role} (Current: {d.minCgpa} CGPA)
                    </option>
                  ))}
                </select>
              </div>

              {/* Company & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={eligibilityCompany}
                    onChange={(e) => setEligibilityCompany(e.target.value)}
                    placeholder="e.g. Google India"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role / Designation</label>
                  <input
                    type="text"
                    required
                    value={eligibilityRole}
                    onChange={(e) => setEligibilityRole(e.target.value)}
                    placeholder="e.g. Associate Software Engineer"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Package & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offered Package (CTC)</label>
                  <input
                    type="text"
                    required
                    value={eligibilityCtc}
                    onChange={(e) => setEligibilityCtc(e.target.value)}
                    placeholder="e.g. ₹10.5 LPA"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    required
                    value={eligibilityDeadline}
                    onChange={(e) => setEligibilityDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* ACADEMIC CUTOFFS SECTION */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Academic Eligibility Cutoffs
                  </span>
                  <span className="text-[10px] text-blue-700 font-bold bg-blue-100/60 px-2 py-0.5 rounded">
                    Strict Cutoff
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Minimum CGPA Cutoff: <span className="text-emerald-700 font-black">{eligibilityMinCgpa}</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="5.0"
                      max="10.0"
                      required
                      value={eligibilityMinCgpa}
                      onChange={(e) => setEligibilityMinCgpa(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-black text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Max Backlogs Allowed: <span className="text-slate-900 font-black">{eligibilityMaxBacklogs}</span>
                    </label>
                    <select
                      value={eligibilityMaxBacklogs}
                      onChange={(e) => setEligibilityMaxBacklogs(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white"
                    >
                      <option value="0">0 (Zero Active Backlogs)</option>
                      <option value="1">Up to 1 Backlog</option>
                      <option value="2">Up to 2 Backlogs</option>
                      <option value="3">Up to 3 Backlogs</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block font-bold text-slate-600 text-[11px] mb-1">10th Std Min Percentage (%)</label>
                    <input
                      type="number"
                      value={eligibilityMinTenth}
                      onChange={(e) => setEligibilityMinTenth(parseFloat(e.target.value) || 0)}
                      placeholder="60"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-600 text-[11px] mb-1">12th / Diploma Min %</label>
                    <input
                      type="number"
                      value={eligibilityMinTwelfth}
                      onChange={(e) => setEligibilityMinTwelfth(parseFloat(e.target.value) || 0)}
                      placeholder="60"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* BRANCH SELECTION */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Allowed Engineering Branches ({eligibilityBranches.length} selected)
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_BRANCHES.map((branch) => {
                    const isSelected = eligibilityBranches.includes(branch);
                    return (
                      <button
                        type="button"
                        key={branch}
                        onClick={() => toggleBranchSelection(branch)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{branch}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* REQUIRED SKILLS */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Prerequisite Technical Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={eligibilitySkills}
                  onChange={(e) => setEligibilitySkills(e.target.value)}
                  placeholder="e.g. React.js, Python, PostgreSQL, System Design"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              {/* SELECTION NOTES */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Selection Guidelines &amp; Criteria Note
                </label>
                <textarea
                  rows={2}
                  value={eligibilityNotes}
                  onChange={(e) => setEligibilityNotes(e.target.value)}
                  placeholder="e.g. Online Assessment followed by 2 Technical rounds and HR discussion."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium resize-none"
                />
              </div>

              {/* LIVE COHORT MATCH STATS BOX */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="text-[11px]">
                    <strong>Live Cohort Match:</strong> ~{matchingStudentsCount} candidates meet this cutoff ({eligibilityMinCgpa}+ CGPA, max {eligibilityMaxBacklogs} backlogs).
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-900">
                  Instant Simulation
                </span>
              </div>

              {/* Form Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEligibilityModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEligibility}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-md shadow-emerald-500/25 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSavingEligibility ? <Loader2 className="w-4 h-4 animate-spin" /> : <SaveIcon className="w-4 h-4" />}
                  <span>Save &amp; Broadcast Eligibility</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Create Placement Drive */}
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Backlogs Allowed</label>
                  <select
                    value={newMaxBacklogs}
                    onChange={(e) => setNewMaxBacklogs(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    <option value="0">0 Backlogs</option>
                    <option value="1">1 Backlog</option>
                    <option value="2">2 Backlogs</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Allowed Branches</label>
                  <div className="text-[11px] text-slate-500 pt-1.5 font-bold">
                    CSE, IT, ECE (Default)
                  </div>
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
                  disabled={isCreatingDrive}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-sm flex items-center gap-1.5"
                >
                  {isCreatingDrive && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Launch Drive</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function SaveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}
