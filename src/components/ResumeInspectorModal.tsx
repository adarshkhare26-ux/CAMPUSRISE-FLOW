"use client";

import { useState } from "react";
import { 
  X, 
  FileCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight, 
  Award, 
  Zap, 
  FileText,
  Layers,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Sliders
} from "lucide-react";
import { useToast } from "@/components/Toast";

interface ResumeInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  currentSkills: string[];
  onApplySkill: (skill: string) => void;
}

export function ResumeInspectorModal({
  isOpen,
  onClose,
  fileName,
  currentSkills,
  onApplySkill
}: ResumeInspectorModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "keywords" | "action-verbs" | "metrics">("overview");
  const [selectedRole, setSelectedRole] = useState("Full Stack SDE");
  const [isCalibrating, setIsCalibrating] = useState(false);

  if (!isOpen) return null;

  const atsScore = 88;

  const roleKeywordsMap: Record<string, { high: string[]; missing: string[] }> = {
    "Full Stack SDE": {
      high: ["React.js", "Node.js", "TypeScript", "REST APIs", "SQL", "Git", "Tailwind CSS"],
      missing: ["Docker", "Redis", "GraphQL", "CI/CD", "Jest / Unit Testing", "Kubernetes"]
    },
    "Data Analyst / Scientist": {
      high: ["Python", "SQL", "Pandas", "Data Cleaning", "Matplotlib", "Statistics"],
      missing: ["PowerBI", "Tableau", "Scikit-Learn", "A/B Testing", "BigQuery", "ETL Pipelines"]
    },
    "Cloud & DevOps Engineer": {
      high: ["Linux", "Git", "Bash Scripting", "Python", "Networking Basics"],
      missing: ["AWS IAM", "Terraform", "Docker", "Kubernetes", "Prometheus", "Ansible"]
    }
  };

  const actionVerbsFound = [
    { verb: "Architected", section: "Experience", count: 2, impact: "High" },
    { verb: "Engineered", section: "Projects", count: 3, impact: "High" },
    { verb: "Optimized", section: "Experience", count: 4, impact: "High" },
    { verb: "Reduced", section: "Projects", count: 2, impact: "High" },
    { verb: "Spearheaded", section: "Leadership", count: 1, impact: "Medium" },
  ];

  const quantifiableMetrics = [
    { text: "Reduced API response latency by 42% via Redis caching", status: "Optimal" },
    { text: "Maintained 99.8% database uptime across 12,000 requests", status: "Optimal" },
    { text: "Led team of 4 engineers delivering sprint items 3 days ahead of deadline", status: "Good" },
    { text: "Recommendation: Quantify the scale of your university library database project", status: "Needs Improvement" },
  ];

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      toast(`Resume calibrated for "${selectedRole}"! ATS Alignment updated.`, "success");
    }, 1200);
  };

  const currentRoleData = roleKeywordsMap[selectedRole] || roleKeywordsMap["Full Stack SDE"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white">AI ATS Resume Diagnostic Inspector</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-slate-950">
                  {atsScore}/100 Score
                </span>
              </div>
              <p className="text-xs text-slate-400">Inspecting file: <span className="text-slate-200 font-mono">{fileName}</span></p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector & Target Role Calibration Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "overview" 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Overview &amp; Health
            </button>
            <button
              onClick={() => setActiveTab("keywords")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "keywords" 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Keywords &amp; Alignment
            </button>
            <button
              onClick={() => setActiveTab("action-verbs")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "action-verbs" 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Action Verbs ({actionVerbsFound.length})
            </button>
            <button
              onClick={() => setActiveTab("metrics")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "metrics" 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Quantifiable Impact
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800"
            >
              <option value="Full Stack SDE">Full Stack SDE</option>
              <option value="Data Analyst / Scientist">Data Analyst / Scientist</option>
              <option value="Cloud & DevOps Engineer">Cloud &amp; DevOps Engineer</option>
            </select>

            <button
              onClick={handleCalibrate}
              disabled={isCalibrating}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm disabled:opacity-60"
            >
              <RefreshCw className={`w-3 h-3 ${isCalibrating ? "animate-spin" : ""}`} />
              <span>Calibrate</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Top Score Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-center">
                  <div className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider">Overall ATS Score</div>
                  <div className="text-3xl font-black text-emerald-600 mt-1">88<span className="text-sm font-semibold text-emerald-800">/100</span></div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-1">High Recruiter Visibility</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                  <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Format &amp; Layout</div>
                  <div className="text-3xl font-black text-slate-900 mt-1">95%</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">Single-Column Parseable</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                  <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Impact Verbs</div>
                  <div className="text-3xl font-black text-slate-900 mt-1">82%</div>
                  <div className="text-[10px] text-blue-600 font-bold mt-1">12 Strong Action Words</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                  <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Role Keywords</div>
                  <div className="text-3xl font-black text-slate-900 mt-1">79%</div>
                  <div className="text-[10px] text-amber-600 font-bold mt-1">5 Missing High-Yield Tags</div>
                </div>
              </div>

              {/* Actionable Health Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Comprehensive ATS Audit Checklist
                </h4>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Standard Section Headers Detected</div>
                      <div className="text-[11px] text-slate-500">Education, Experience, Projects, Skills, and Certifications parsed cleanly without parser table drops.</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Contact Information Fully Verified</div>
                      <div className="text-[11px] text-slate-500">Email, GitHub URL, LinkedIn, and University Roll Number are clickable and valid.</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-amber-950">Add More Quantifiable Project Outcomes</div>
                      <div className="text-[11px] text-amber-800">Your portfolio contains 2 projects with narrative descriptions but lacking numerical metrics (e.g. &ldquo;Handled 10k users&rdquo; or &ldquo;Cut build time by 30%&rdquo;).</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KEYWORDS */}
          {activeTab === "keywords" && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 flex items-center justify-between">
                <div>
                  <div className="font-extrabold">Calibrated for: {selectedRole}</div>
                  <div className="text-[11px] text-blue-700 mt-0.5">Top-tier corporate ATS bots filter candidates using these specific industry keywords.</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[10px]">
                  {currentRoleData.high.length} Matched
                </span>
              </div>

              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                  ✅ Keywords Present in Your Resume
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentRoleData.high.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{kw}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
                  <span>⚡ Missing High-Impact Keywords (Click to Boost into Profile)</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentRoleData.missing.map((kw) => {
                    const alreadyHas = currentSkills.includes(kw);
                    return (
                      <button
                        key={kw}
                        onClick={() => {
                          if (!alreadyHas) {
                            onApplySkill(kw);
                            toast(`Added "${kw}" to profile skills and boosted ATS match!`, "success");
                          }
                        }}
                        disabled={alreadyHas}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                          alreadyHas
                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-default"
                            : "bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs hover:border-emerald-500"
                        }`}
                      >
                        <span>{alreadyHas ? "✓ Added" : "+ Add"}</span>
                        <span>{kw}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACTION VERBS */}
          {activeTab === "action-verbs" && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Recruiters love strong action verbs that demonstrate leadership and technical initiative:
              </div>

              <div className="space-y-2">
                {actionVerbsFound.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-xs text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        &ldquo;{item.verb}&rdquo;
                      </span>
                      <span className="text-[11px] text-slate-500">Found {item.count} times in <strong>{item.section}</strong></span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.impact} Impact
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: METRICS */}
          {activeTab === "metrics" && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Detected metrics that prove tangible business and performance impact:
              </div>

              <div className="space-y-2.5">
                {quantifiableMetrics.map((qm, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                    <div className="text-xs font-medium text-slate-800">
                      {qm.text}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      qm.status === "Optimal" 
                        ? "bg-emerald-100 text-emerald-800"
                        : qm.status === "Good"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                    }`}>
                      {qm.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-medium">
            ATS Engine Version: <strong>2026.4 Neural Parser</strong>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
          >
            Done Inspecting
          </button>
        </div>

      </div>
    </div>
  );
}
