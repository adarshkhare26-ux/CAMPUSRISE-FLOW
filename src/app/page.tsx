"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  CheckCircle, 
  Lock, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Compass,
  Briefcase,
  TrendingUp,
  Award
} from "lucide-react";
import { Navbar, ALL_PAGES } from "@/components/Navbar";

export default function AuthGatewayPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"student" | "tpo">("student");
  const [email, setEmail] = useState("priya.sharma@rgpv.ac.in");
  const [password, setPassword] = useState("password123");

  const handleRoleChange = (role: "student" | "tpo") => {
    setActiveTab(role);
    if (role === "student") {
      setEmail("priya.sharma@rgpv.ac.in");
    } else {
      setEmail("tpo.director@rgpv.ac.in");
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "student") {
      router.push("/student/profile");
    } else {
      router.push("/tpo/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-blue-50/30">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            AI-Powered Career Readiness &amp; Placement ERP Suite
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            CampusRise <span className="text-blue-600">Flow</span> Gateway
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            A unified 12-stage platform bridging university academic performance, real-time readiness scoring, and corporate recruitment drives.
          </p>
        </div>

        {/* Auth Gateway Card */}
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 border border-slate-200/80 relative">
          
          {/* Role Switcher Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => handleRoleChange("student")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "student"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Login</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("tpo")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "tpo"
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>TPO / Admin Login</span>
            </button>
          </div>

          {/* Quick Notice Tag */}
          <div className={`p-3 rounded-xl text-xs font-semibold mb-5 flex items-center gap-2 ${
            activeTab === "student"
              ? "bg-blue-50 text-blue-800 border border-blue-100"
              : "bg-emerald-50 text-emerald-800 border border-emerald-100"
          }`}>
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              {activeTab === "student"
                ? "Access Profile, 6-Step Simulation, AI Readiness Score & Drives."
                : "Access Placement Vault, Cohort Analytics & Drive Management."}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Official Campus Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-slate-50/50"
                  placeholder="name@domain.edu.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-slate-50/50"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md ${
                activeTab === "student"
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25"
                  : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/25"
              }`}
            >
              <span>Authenticate &amp; Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Instant Switch Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              Fast Demo Evaluator Switches
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => router.push("/student/profile")}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Instant Student</span>
              </button>
              <button
                type="button"
                onClick={() => router.push("/tpo/dashboard")}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Instant TPO</span>
              </button>
            </div>
          </div>
        </div>

        {/* 12-Page Quick Flow Overview Section */}
        <div className="mt-12 w-full max-w-5xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              12 Sequential Modules in this Platform
            </h3>
            <span className="text-xs text-blue-600 font-bold">All Routes Live</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {ALL_PAGES.map((page, index) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.path}
                  href={page.path}
                  className="bg-white hover:bg-blue-50/50 p-3.5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">Step {index + 1}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700 line-clamp-1">
                    {page.name.split(": ")[1]}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                    {page.path}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        CampusRise Flow • MPOnline Hackathon 2026 Aligned • NEP 2020 &amp; Viksit Bharat 2047
      </footer>
    </div>
  );
}
