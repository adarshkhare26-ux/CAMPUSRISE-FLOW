"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  ArrowRight, 
  Lock, 
  Mail, 
  ShieldCheck, 
  FileSpreadsheet, 
  Sparkles,
  GraduationCap
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function TpoLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("tpo.director@rgpv.ac.in");
  const [password, setPassword] = useState("admin123");

  const handleTpoSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/tpo/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-300 bg-blue-500/20 border border-blue-400/30 mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            University TPO Administration Gateway
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            TPO &amp; Admin <span className="text-blue-400">Portal</span>
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            Secure administrative access to the Central Placement Vault, Cohort Readiness Analytics, and Statutory NIRF / NAAC Data Reporting.
          </p>
        </div>

        {/* Dedicated TPO Login Card */}
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 relative">
          
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900 text-white mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold">Training &amp; Placement Cell</div>
              <div className="text-[11px] text-slate-400 font-medium">Faculty &amp; Corporate Relations Login</div>
            </div>
          </div>

          <form onSubmit={handleTpoSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Official TPO / Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-slate-50/50"
                  placeholder="tpo@university.edu.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Master Passcode
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
              className="w-full py-3 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/25"
            >
              <span>Authenticate to TPO Master</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Instant TPO Login Button */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
            <button
              type="button"
              onClick={() => router.push("/tpo/dashboard")}
              className="w-full py-2.5 rounded-xl text-xs font-extrabold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>Instant Demo Login as TPO Director</span>
            </button>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Student Login &rarr;</span>
              </Link>
            </div>
          </div>

        </div>

      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        CampusRise • Placement ERP &amp; Statutory Compliance • RGPV Bhopal
      </footer>
    </div>
  );
}
