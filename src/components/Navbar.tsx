"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  GraduationCap, 
  Building2, 
  ChevronDown, 
  Compass, 
  FileText, 
  Target, 
  CheckCircle2, 
  PlayCircle, 
  BarChart3, 
  Split, 
  ListOrdered, 
  TrendingUp, 
  Users, 
  Briefcase, 
  ShieldCheck,
  LayoutDashboard
} from "lucide-react";

export const ALL_PAGES = [
  { name: "Page 1: Student Login Gateway", path: "/", icon: GraduationCap, section: "Authentication" },
  { name: "Page 2: Profile & DigiLocker", path: "/student/profile", icon: FileText, section: "Section 1: Onboarding & Eligibility" },
  { name: "Page 3: Target Career Selection", path: "/student/career-target", icon: Target, section: "Section 1: Onboarding & Eligibility" },
  { name: "Page 4: Campus Drive Eligibility", path: "/student/eligibility", icon: CheckCircle2, section: "Section 1: Onboarding & Eligibility" },
  { name: "Page 5: Placement Simulation Center", path: "/student/simulation", icon: PlayCircle, section: "Section 2: Assessment & AI Readiness" },
  { name: "Page 6: AI Readiness Score Breakdown", path: "/student/readiness-score", icon: BarChart3, section: "Section 2: Assessment & AI Readiness" },
  { name: "Page 7: Skill-Gap Analysis", path: "/student/skill-gap", icon: Split, section: "Section 2: Assessment & AI Readiness" },
  { name: "Page 8: Action Roadmap", path: "/student/roadmap", icon: ListOrdered, section: "Section 3: Roadmap & Mentorship" },
  { name: "Page 9: Reassessment Tracker", path: "/student/reassessment", icon: TrendingUp, section: "Section 3: Roadmap & Mentorship" },
  { name: "Page 10: Alumni Mentorship Loop", path: "/student/alumni-network", icon: Users, section: "Section 3: Roadmap & Mentorship" },
  { name: "Page 11: Placements Lifecycle", path: "/student/placements", icon: Briefcase, section: "Section 4: Corporate Placements" },
  { name: "Page 12: TPO Master Command Dashboard", path: "/tpo/dashboard", icon: LayoutDashboard, section: "TPO ERP" },
  { name: "TPO / Admin Dedicated Login", path: "/tpo/login", icon: ShieldCheck, section: "TPO ERP" },
];

export function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isTpo = pathname.startsWith("/tpo");
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Group */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                Campus<span className="text-blue-600">Rise</span>
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 tracking-wide flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Placement &amp; ERP Suite
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Quick Flow Dropdown (Hidden on 1st Page / Student Login & TPO Pages) */}
        {!isHomePage && !isTpo && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Browse Sections &amp; Modules</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-84 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 max-h-[80vh] overflow-y-auto"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  CampusRise Modular Architecture
                </div>
                {ALL_PAGES.map((page, idx) => {
                  const Icon = page.icon;
                  const active = pathname === page.path;
                  const isNewSection = idx === 0 || page.section !== ALL_PAGES[idx - 1].section;

                  return (
                    <div key={page.path}>
                      {isNewSection && (
                        <div className="px-3 pt-2 pb-1 text-[10px] font-black text-slate-400 uppercase tracking-wider border-t border-slate-100 first:border-0 mt-1 first:mt-0">
                          {page.section}
                        </div>
                      )}
                      <Link
                        href={page.path}
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                          active 
                            ? "bg-blue-50 text-blue-700 font-semibold" 
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${active ? "text-blue-600" : "text-slate-400"}`} />
                        <span className="truncate">{page.name}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Right Actions: Role Switcher & Profile */}
        <div className="flex items-center gap-3">
          <Link
            href={isTpo ? "/student/profile" : "/tpo/login"}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              isTpo
                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
            }`}
          >
            {isTpo ? (
              <>
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Switch to Student View</span>
              </>
            ) : (
              <>
                <Building2 className="w-3.5 h-3.5" />
                <span>TPO Admin Login</span>
              </>
            )}
          </Link>

          <Link
            href="/"
            className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-extrabold text-slate-700 hover:border-blue-400 transition-colors"
            title="Account & Role Switcher"
          >
            PS
          </Link>
        </div>

      </div>
    </header>
  );
}
