"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
  LayoutDashboard,
  Bell,
  LogOut,
  Sparkles,
  Check,
  Clock
} from "lucide-react";
import { AuthModal } from "@/components/AuthModal";

export const ALL_PAGES = [
  { name: "Student Login Gateway", path: "/", icon: GraduationCap, section: "Authentication Gateway" },
  { name: "Profile & DigiLocker", path: "/student/profile", icon: FileText, section: "Student Modules" },
  { name: "Target Career Selection", path: "/student/career-target", icon: Target, section: "Student Modules" },
  { name: "Campus Drive Eligibility", path: "/student/eligibility", icon: CheckCircle2, section: "Student Modules" },
  { name: "Placement Simulation Center", path: "/student/simulation", icon: PlayCircle, section: "Student Modules" },
  { name: "AI Readiness Score Breakdown", path: "/student/readiness-score", icon: BarChart3, section: "Student Modules" },
  { name: "Skill-Gap Analysis", path: "/student/skill-gap", icon: Split, section: "Student Modules" },
  { name: "Action Roadmap", path: "/student/roadmap", icon: ListOrdered, section: "Student Modules" },
  { name: "Reassessment Tracker", path: "/student/reassessment", icon: TrendingUp, section: "Student Modules" },
  { name: "Alumni Mentorship Loop", path: "/student/alumni-network", icon: Users, section: "Student Modules" },
  { name: "Placements Lifecycle", path: "/student/placements", icon: Briefcase, section: "Student Modules" },
  { name: "TPO Master Command Dashboard", path: "/tpo/dashboard", icon: LayoutDashboard, section: "TPO & Corporate ERP" },
  { name: "TPO / Admin Dedicated Login", path: "/tpo/login", icon: ShieldCheck, section: "TPO & Corporate ERP" },
  { name: "Company Recruiter Portal", path: "/company/dashboard", icon: Building2, section: "TPO & Corporate ERP" },
  { name: "Alumni Mentor Portal", path: "/alumni/dashboard", icon: Users, section: "TPO & Corporate ERP" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const isTpo = pathname.startsWith("/tpo");
  const isCompany = pathname.startsWith("/company");
  const isAlumni = pathname.startsWith("/alumni");
  const isHomePage = pathname === "/";

  // Load user from localStorage or auth state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("campusrise_user");
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch {
          // ignore
        }
      }
    }
  }, [pathname]);

  // Load notifications
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data.success && data.notifications) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch {
      // ignore
    }
  };

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "MARK_ALL_READ" }),
      });
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("campusrise_user");
    }
    setCurrentUser(null);
    router.push("/");
  };

  const getRoleBadge = () => {
    if (currentUser?.role === "TPO" || isTpo) return { label: "TPO Officer", color: "bg-blue-600 text-white" };
    if (currentUser?.role === "COMPANY" || isCompany) return { label: "Recruiter", color: "bg-purple-600 text-white" };
    if (currentUser?.role === "ALUMNI" || isAlumni) return { label: "Alumni Mentor", color: "bg-amber-600 text-white" };
    return { label: "Student", color: "bg-emerald-600 text-white" };
  };

  const roleBadge = getRoleBadge();

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

        {/* Center: Quick Flow Dropdown */}
        {!isHomePage && (
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

        {/* Right Actions: Notifications, Role Switcher & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                if (!notifOpen && unreadCount > 0) markAllRead();
              }}
              className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[10px] font-black text-white flex items-center justify-center border-2 border-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 overflow-hidden animate-in fade-in"
                onMouseLeave={() => setNotifOpen(false)}
              >
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900">CampusRise Updates</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {notifications.length}
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Mark read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-400 font-medium">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3.5 hover:bg-slate-50 transition-colors ${
                          !n.read ? "bg-blue-50/40" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-extrabold text-slate-900 text-xs leading-tight">
                            {n.title}
                          </div>
                          <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                            {n.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {n.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Switch Role / Login Quick Button */}
          <button
            onClick={() => setAuthModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all shadow-xs border border-slate-200 bg-white hover:bg-slate-100 text-slate-800"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Role:</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${roleBadge.color}`}>
              {currentUser?.name ? currentUser.role : roleBadge.label}
            </span>
          </button>

          {/* User Avatar with Sign Out Option */}
          <div className="relative group">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="w-9 h-9 rounded-full bg-slate-900 text-white border border-slate-700 flex items-center justify-center text-xs font-extrabold hover:ring-2 hover:ring-blue-600 transition-all shadow-sm"
              title={currentUser?.name || "Sign in / Switch Account"}
            >
              {currentUser?.name ? currentUser.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2) : "PS"}
            </button>
          </div>

          {currentUser && (
            <button
              onClick={handleLogout}
              className="hidden lg:flex w-8 h-8 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 items-center justify-center transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}

        </div>

      </div>

      {/* Auth Modal Mount */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => setCurrentUser(user)}
      />
    </header>
  );
}

