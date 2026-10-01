"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  X, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Users, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  Sparkles
} from "lucide-react";
import { useToast } from "@/components/Toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: "STUDENT" | "TPO" | "COMPANY" | "ALUMNI";
  onSuccess?: (user: any) => void;
}

const DEMO_ACCOUNTS = [
  {
    role: "STUDENT",
    title: "Student",
    name: "Priya Sharma",
    email: "priya.sharma@rgpv.ac.in",
    password: "student123",
    icon: GraduationCap,
    color: "emerald",
    desc: "B.Tech CSE • 8.42 CGPA • Verified DigiLocker",
    route: "/student/profile",
  },
  {
    role: "TPO",
    title: "TPO / Admin",
    name: "Dr. Alok Verma",
    email: "tpo.director@rgpv.ac.in",
    password: "admin123",
    icon: ShieldCheck,
    color: "blue",
    desc: "Placement Officer • Statutory NIRF Exports & Drives",
    route: "/tpo/dashboard",
  },
  {
    role: "COMPANY",
    title: "Company",
    name: "Vikram Malhotra",
    email: "recruiter@tcs.com",
    password: "company123",
    icon: Building2,
    color: "purple",
    desc: "TCS Lead Recruiter • Pipeline & Shortlists",
    route: "/company/dashboard",
  },
  {
    role: "ALUMNI",
    title: "Alumni Mentor",
    name: "Aditya Khare",
    email: "aman.gupta@google.com",
    password: "alumni123",
    icon: Users,
    color: "amber",
    desc: "Microsoft SDE-II (2023 Batch) • Mentorship & Referrals",
    route: "/alumni/dashboard",
  },
];

export function AuthModal({ isOpen, onClose, initialRole = "STUDENT", onSuccess }: AuthModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [email, setEmail] = useState("priya.sharma@rgpv.ac.in");
  const [password, setPassword] = useState("student123");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickFill = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setSelectedRole(acc.role as any);
    setEmail(acc.email);
    setPassword(acc.password);
    setName(acc.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role: selectedRole }),
        });

        const data = await res.json();
        if (data.success) {
          toast(data.message || `Welcome, ${data.user.name}!`, "success");
          if (typeof window !== "undefined") {
            localStorage.setItem("campusrise_user", JSON.stringify(data.user));
          }
          if (onSuccess) onSuccess(data.user);
          onClose();

          // Route to appropriate dashboard
          const matched = DEMO_ACCOUNTS.find((a) => a.role === data.user.role);
          if (matched) {
            router.push(matched.route);
          }
        } else {
          toast(data.message || "Invalid credentials", "error");
        }
      } else {
        // Signup
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name || email.split("@")[0],
            email,
            password,
            role: selectedRole,
          }),
        });

        const data = await res.json();
        if (data.success) {
          toast(`Account created! Welcome, ${data.user.name}.`, "success");
          if (typeof window !== "undefined") {
            localStorage.setItem("campusrise_user", JSON.stringify(data.user));
          }
          if (onSuccess) onSuccess(data.user);
          onClose();

          const matched = DEMO_ACCOUNTS.find((a) => a.role === data.user.role);
          if (matched) {
            router.push(matched.route);
          }
        } else {
          toast(data.message || "Failed to create account", "error");
        }
      }
    } catch {
      toast("Error connecting to authentication service", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>CampusRise Unified Identity Gateway</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {mode === "login" ? "Sign In & Switch Role" : "Register New Account"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access role-specific workflows for Students, TPO Admins, Corporate Recruiters, or Alumni.
          </p>
        </div>

        {/* 1-Click Demo Accounts Quick Picker */}
        <div className="mb-6">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2.5">
            Quick 1-Click Demo Profiles (Pre-Seeded)
          </div>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map((acc) => {
              const Icon = acc.icon;
              const isSelected = selectedRole === acc.role;
              return (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleQuickFill(acc)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/70 text-blue-950 font-bold shadow-xs scale-[1.01]"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-black uppercase text-blue-700">{acc.title}</span>
                    <Icon className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="text-xs font-extrabold truncate">{acc.name}</div>
                  <div className="text-[9px] text-slate-500 truncate mt-0.5">{acc.email}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Switch: Login vs Signup */}
        <div className="flex border-b border-slate-100 mb-5">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-xs font-black text-center border-b-2 transition-colors ${
              mode === "login" ? "border-blue-600 text-blue-700" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-xs font-black text-center border-b-2 transition-colors ${
              mode === "signup" ? "border-blue-600 text-blue-700" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "signup" && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Priya Sharma"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-slate-50/50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@university.edu.in"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Selected Account Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50/50"
            >
              <option value="STUDENT">Student (Career &amp; Drive Gateway)</option>
              <option value="TPO">TPO / University Placement Officer</option>
              <option value="COMPANY">Corporate Recruiter (Company)</option>
              <option value="ALUMNI">Alumni Mentor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 disabled:opacity-60"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            <span>{isLoading ? "Processing..." : mode === "login" ? `Sign In as ${selectedRole}` : "Complete Registration"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
