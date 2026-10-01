"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  ArrowRight,
  Award,
  ExternalLink,
  Clock,
  Briefcase,
  Loader2,
  Check,
  UserCheck
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { Navbar } from "@/components/Navbar";

export default function AlumniDashboardPage() {
  const { toast } = useToast();
  const [mentors, setMentors] = useState<any[]>([]);
  const [mentorshipRequests, setMentorshipRequests] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchAlumniData = async () => {
    try {
      const res = await fetch("/api/alumni/requests");
      const data = await res.json();
      if (data.success) {
        setMentors(data.mentors || []);
        setMentorshipRequests(data.mentorshipRequests || []);
        setReferrals(data.referrals || []);
      }
    } catch (err) {
      console.error("Failed to load alumni data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumniData();
  }, []);

  const handleUpdateMentorship = async (id: string, status: "ACCEPTED" | "REJECTED", studentName: string) => {
    setActionLoadingId(id);
    try {
      const res = await fetch("/api/alumni/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "MENTORSHIP",
          id,
          status,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast(`Mentorship session with ${studentName} marked as ${status}!`, "success");
        setMentorshipRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      } else {
        toast(data.message || "Failed to update request", "error");
      }
    } catch {
      toast("Error updating mentorship request", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleUpdateReferral = async (id: string, status: "ACCEPTED" | "REJECTED", candidateName: string) => {
    setActionLoadingId(id);
    try {
      const res = await fetch("/api/alumni/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "REFERRAL",
          id,
          status,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast(`Referral for ${candidateName} ${status === "ACCEPTED" ? "forwarded to internal HR hiring portal" : "declined"}!`, "success");
        setReferrals((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      } else {
        toast(data.message || "Failed to update referral", "error");
      }
    } catch {
      toast("Error updating referral", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Alumni Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-amber-950/20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/10 text-amber-200 border border-white/20 mb-2">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>CampusRise Alumni Mentorship &amp; Referral Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Alumni Mentor Command
            </h1>
            <p className="text-xs text-amber-200 mt-1">
              Aditya Khare (Microsoft SDE-II • 2023 Batch) • Guide junior candidates, conduct mock code reviews, and grant internal referrals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/student/alumni-network"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-amber-500/25 shrink-0"
            >
              <Users className="w-4 h-4" />
              <span>Student Mentorship View</span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Inbound 1:1 Requests</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{mentorshipRequests.length}</div>
            <div className="text-[11px] text-amber-700 font-bold mt-0.5">Mock interviews &amp; system design</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Accepted Sessions</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {mentorshipRequests.filter((m) => m.status === "ACCEPTED").length}
            </div>
            <div className="text-[11px] text-slate-500 font-bold mt-0.5">Google Meet links issued</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Referrals Requested</div>
            <div className="text-2xl font-black text-blue-600 mt-1">{referrals.length}</div>
            <div className="text-[11px] text-blue-600 font-bold mt-0.5">Microsoft, Google &amp; Amazon</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Verified Alumni Rating</div>
            <div className="text-2xl font-black text-amber-600 mt-1">4.9 / 5.0</div>
            <div className="text-[11px] text-amber-700 font-bold mt-0.5">14 junior reviews stamped</div>
          </div>
        </div>

        {/* Inbound Mentorship Booking Requests */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              Incoming 1:1 Mentorship Session Requests ({mentorshipRequests.length})
            </h2>
            <span className="text-[11px] font-bold text-slate-400">
              Auto-syncs with student calendar upon confirmation
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-600" />
              <p className="text-xs font-bold">Loading mentorship requests...</p>
            </div>
          ) : mentorshipRequests.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-bold">No pending mentorship requests.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {mentorshipRequests.map((req) => (
                <div key={req.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">{req.studentName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({req.branch})</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        req.status === "ACCEPTED"
                          ? "bg-emerald-100 text-emerald-800"
                          : req.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Requested Slot: <strong>{req.slot || "Saturday, 4:00 PM IST"}</strong></span>
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 max-w-2xl mt-1">
                      &ldquo;{req.topic || "Seeking technical guidance on DSA trees, graph traversal, and mock behavioral interview prep."}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {req.status !== "ACCEPTED" && (
                      <button
                        onClick={() => handleUpdateMentorship(req.id, "ACCEPTED", req.studentName)}
                        disabled={actionLoadingId === req.id}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept &amp; Meet</span>
                      </button>
                    )}
                    {req.status !== "REJECTED" && (
                      <button
                        onClick={() => handleUpdateMentorship(req.id, "REJECTED", req.studentName)}
                        disabled={actionLoadingId === req.id}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 text-xs font-bold transition-all border border-slate-200"
                      >
                        Decline
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Corporate Referral Inquiries */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Corporate Employee Referral Inquiries ({referrals.length})
            </h2>
            <span className="text-[11px] font-bold text-slate-400">
              Only candidates with &gt;75% AI Readiness are eligible for internal referrals
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {referrals.map((ref) => (
              <div key={ref.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{ref.studentName}</span>
                    <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Target: {ref.targetCompany || "Microsoft / Google"}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      ref.status === "ACCEPTED"
                        ? "bg-emerald-100 text-emerald-800"
                        : ref.status === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {ref.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 flex items-center gap-3">
                    <span>Verified CGPA: <strong>8.42</strong></span>
                    <span>•</span>
                    <span>ATS Resume Score: <strong>88%</strong></span>
                    <span>•</span>
                    <span>AI Readiness Index: <strong>78%</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {ref.status !== "ACCEPTED" && (
                    <button
                      onClick={() => handleUpdateReferral(ref.id, "ACCEPTED", ref.studentName)}
                      disabled={actionLoadingId === ref.id}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Grant Internal Referral</span>
                    </button>
                  )}
                  {ref.status !== "REJECTED" && (
                    <button
                      onClick={() => handleUpdateReferral(ref.id, "REJECTED", ref.studentName)}
                      disabled={actionLoadingId === ref.id}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 text-xs font-bold transition-all border border-slate-200"
                    >
                      Decline
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
