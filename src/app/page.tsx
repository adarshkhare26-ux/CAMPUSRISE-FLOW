"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  ArrowRight, 
  Lock, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Compass,
  Building2,
  CheckCircle2,
  BookOpen
} from "lucide-react";
import { Navbar, ALL_PAGES } from "@/components/Navbar";

export default function StudentLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("priya.sharma@rgpv.ac.in");
  const [password, setPassword] = useState("password123");

  const handleStudentSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/student/profile");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-blue-50/30">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full">
        
        {/* Hero Header */}
        <div className="text-center max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            University Student Placement Portal
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Student <span className="text-blue-600">Login</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Sign in with your university credentials to access your verified profile, placement readiness assessments, and active corporate drives.
          </p>
        </div>

        {/* Dedicated Student Login Card */}
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 border border-slate-200/80 relative">
          
          {/* Student Badge Indicator */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-blue-950">Student Career Readiness Gateway</div>
              <div className="text-[11px] text-blue-700 font-medium">B.Tech / MCA / State Technical Campus</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleStudentSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Campus Email or University Roll No.
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-slate-50/50"
                  placeholder="rollno@domain.edu.in or 0101CS221045"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
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
              <span>Login to Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Instant Student Login Demo Button */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
            <button
              type="button"
              onClick={() => router.push("/student/profile")}
              className="w-full py-2.5 rounded-xl text-xs font-extrabold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-slate-800 border border-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Instant Demo Login as Student (Priya Sharma)</span>
            </button>

            {/* Link to TPO / Admin Login */}
            <div className="text-center pt-2">
              <Link 
                href="/tpo/login"
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>College TPO / Faculty Admin Login &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 12-Screen Navigation Roadmap */}
        <div className="mt-12 w-full max-w-5xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              Complete 12-Screen Placement Sequence
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
        CampusRise Flow • Student Career Readiness &amp; Placement Suite • MPOnline Hackathon 2026
      </footer>
    </div>
  );
}
