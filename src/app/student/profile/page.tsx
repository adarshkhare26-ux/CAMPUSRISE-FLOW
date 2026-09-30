"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User, 
  BookOpen, 
  Award, 
  Briefcase, 
  FileCheck, 
  UploadCloud, 
  Plus, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ShieldAlert,
  ShieldCheck
} from "lucide-react";
import { INITIAL_STUDENT_PROFILE } from "@/lib/mockData";
import { DigiLockerSection } from "@/components/DigiLockerSection";

export default function StudentProfilePage() {
  const [profile, setProfile] = useState(INITIAL_STUDENT_PROFILE);
  const [skillInput, setSkillInput] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, skillInput.trim()]
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified Student Onboarding &amp; Credentials</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic &amp; Experiential Profile
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Data entered here synchronizes directly with the TPO Placement Vault and live company cutoff filters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Profile Stamped!
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            Save Changes
          </button>
          <Link
            href="/student/career-target"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <span>Target Career</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
 
      {/* Official DigiLocker Document Verification & Collection Center */}
      <DigiLockerSection 
        initialAccount={profile.digiLocker} 
        onSyncSuccess={(updatedAccount) => {
          setProfile(prev => ({
            ...prev,
            digiLocker: updatedAccount,
            tenthPct: 91.4,
            twelfthPct: 88.6,
            cgpa: 8.42,
            activeBacklogs: 0
          }));
          setSavedSuccess(true);
          setTimeout(() => setSavedSuccess(false), 4000);
        }}
      />

      {/* Main Grid: Academics & Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Academic Metrics & Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Academic Records Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Official Academic Records (DigiLocker &amp; TPO Verified)
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Official scores synchronized with National Academic Depository (NAD) &amp; CBSE Central Server.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Synced: {profile.digiLocker?.lastSyncedAt || "Today, 11:30 AM"}</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setProfile(prev => ({
                      ...prev,
                      tenthPct: 91.4,
                      twelfthPct: 88.6,
                      cgpa: 8.42,
                      activeBacklogs: 0
                    }));
                    setSavedSuccess(true);
                    setTimeout(() => setSavedSuccess(false), 3000);
                  }}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                  title="Reset to official DigiLocker certified marks"
                >
                  Re-fetch Verified Marks
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-600">Full Legal Name</label>
                  <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Aadhaar
                  </span>
                </div>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">University Roll Number</label>
                <input
                  type="text"
                  value={profile.rollNo}
                  disabled
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 bg-slate-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Engineering Branch</label>
                <select
                  value={profile.branch}
                  onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50"
                >
                  <option value="Computer Science & Engineering">Computer Science (CSE)</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="Electronics & Communication">Electronics (ECE)</option>
                  <option value="Mechanical Engineering">Mechanical (ME)</option>
                  <option value="Civil Engineering">Civil (CE)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-600">Cumulative CGPA (0-10)</label>
                  <span className="text-[10px] font-extrabold text-blue-700 flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-blue-600" /> RGPV NAD
                  </span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  value={profile.cgpa}
                  onChange={(e) => setProfile({ ...profile, cgpa: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs font-black text-blue-700 bg-blue-50/30"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-600">Active Backlogs Count</label>
                  <span className="text-[10px] font-extrabold text-emerald-700 flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Clear
                  </span>
                </div>
                <input
                  type="number"
                  value={profile.activeBacklogs}
                  onChange={(e) => setProfile({ ...profile, activeBacklogs: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-bold ${
                    profile.activeBacklogs === 0
                      ? "border-emerald-200 text-emerald-700 bg-emerald-50/30"
                      : "border-red-200 text-red-700 bg-red-50/30"
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Graduation Batch Year</label>
                <input
                  type="number"
                  value={profile.gradYear}
                  onChange={(e) => setProfile({ ...profile, gradYear: parseInt(e.target.value) || 2026 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-600">Class 10th Score (%)</label>
                  <span className="text-[10px] font-extrabold text-emerald-700 flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> CBSE Verified
                  </span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={profile.tenthPct}
                  onChange={(e) => setProfile({ ...profile, tenthPct: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-600">Class 12th / Diploma (%)</label>
                  <span className="text-[10px] font-extrabold text-emerald-700 flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> CBSE Verified
                  </span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={profile.twelfthPct}
                  onChange={(e) => setProfile({ ...profile, twelfthPct: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-600">Academic ABC-ID</label>
                  <span className="text-[10px] font-extrabold text-emerald-700 flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> MoE Sealed
                  </span>
                </div>
                <input
                  type="text"
                  defaultValue="APAAR-6291-0941-8812"
                  disabled
                  className="w-full px-3 py-2 rounded-xl border border-emerald-200 text-xs font-mono text-emerald-800 bg-emerald-50/40"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Skills Tagger */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Dynamic Technical &amp; Domain Skills
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Tags are analyzed in real-time by the Role-Subject Matching engine to determine drive shortlists.
            </p>

            <form onSubmit={addSkill} className="flex gap-2 mb-4">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Type a skill (e.g. Docker, Python, SQL, GraphQL)..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-sm shadow-emerald-500/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tag</span>
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 group hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-emerald-500 group-hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Projects & Internships Cards */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Verified Portfolio Projects &amp; Work Experience
            </h2>

            <div className="space-y-3">
              {profile.projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {proj.tech}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{proj.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Industrial Internships</h4>
              {profile.internships.map((intern, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-950">{intern.company} — {intern.role}</div>
                    <div className="text-[11px] text-emerald-700 mt-0.5">{intern.impact}</div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                    {intern.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Resume Upload Card & Certifications */}
        <div className="space-y-6">
          
          {/* Resume Upload Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center justify-center gap-2 mb-3">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              Verified Digital Resume
            </h2>

            <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-6 bg-emerald-50/30 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="text-xs font-extrabold text-slate-800 mb-1">
                {profile.resumeFileName}
              </div>
              <div className="text-[11px] text-slate-500 mb-4">
                ATS Score: 88/100 • Digitally Hash Stamped
              </div>
              <button
                type="button"
                onClick={() => alert("Upload dialog simulated. File encrypted and synced to TPO Placement Vault.")}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Re-upload PDF
              </button>
            </div>
          </div>

          {/* Certifications Vault */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-blue-600" />
              Verified Certifications
            </h2>
            <div className="space-y-2.5">
              {profile.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Eligibility Snapshot */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg shadow-blue-500/15">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">
              TPO Vault Pre-Check
            </div>
            <div className="text-xl font-extrabold mb-1">0 Active Backlogs</div>
            <p className="text-xs text-blue-100 mb-4">
              With 8.42 CGPA and clean disciplinary standing, you unlock 92% of tier-1 corporate drives.
            </p>
            <Link
              href="/student/eligibility"
              className="inline-flex items-center gap-2 text-xs font-extrabold bg-white text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <span>Check Eligibility Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
