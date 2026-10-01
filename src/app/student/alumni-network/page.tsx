"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Building2, 
  Calendar, 
  FileSearch, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  MessageSquare,
  Sparkles,
  Loader2
} from "lucide-react";
import { ALUMNI_MENTORS } from "@/lib/mockData";
import { useToast } from "@/components/Toast";

export default function AlumniMentorshipPage() {
  const { toast } = useToast();
  const [mentors, setMentors] = useState(ALUMNI_MENTORS);
  const [bookedSessions, setBookedSessions] = useState<string[]>([]);
  const [referralRequested, setReferralRequested] = useState<string[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await fetch("/api/student/alumni");
      const data = await res.json();
      if (data.success && data.mentors) {
        setMentors(data.mentors);
      }
    } catch {
      // fallback to mockData
    }
  };

  const handleBookSession = async (mentorId: string, mentorName: string) => {
    setLoadingAction(`book-${mentorId}`);
    try {
      const res = await fetch("/api/student/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "MENTORSHIP",
          alumniId: mentorId,
          topic: "Technical Mock Interview & Resume Deep-Dive",
          date: "Upcoming Weekend 5:00 PM",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBookedSessions((prev) => [...prev, mentorId]);
        toast(`1:1 Mentorship booked with ${mentorName}! Calendar invite dispatched.`, "success");
      } else {
        toast(data.message || "Failed to book session", "error");
      }
    } catch {
      toast("Error booking mentorship", "error");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRequestReferral = async (mentorId: string, mentorName: string, company: string) => {
    setLoadingAction(`ref-${mentorId}`);
    try {
      const res = await fetch("/api/student/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REFERRAL",
          alumniId: mentorId,
          note: `Applying for 2026 early-career software engineering openings at ${company}.`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReferralRequested((prev) => [...prev, mentorId]);
        toast(`Referral request sent to ${mentorName} at ${company}!`, "success");
      } else {
        toast(data.message || "Failed to submit referral", "error");
      }
    } catch {
      toast("Error submitting referral request", "error");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Corporate Alumni Pay-It-Forward Network</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Alumni Mentorship Loop &amp; Referrals
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Connect directly with verified placed alumni at Tier-1 companies for 1-on-1 mock interviews, resume critiques, and referrals.
          </p>
        </div>

        <Link
          href="/student/placements"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 shrink-0"
        >
          <span>Placement Drives</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Alumni Mentors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((mentor) => {
          const isBooked = bookedSessions.includes(mentor.id);
          const isReferred = referralRequested.includes(mentor.id);

          return (
            <div key={mentor.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                      {mentor.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{mentor.name}</h3>
                      <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        <span>{mentor.currentCompany}</span>
                      </div>
                    </div>
                  </div>

                  {mentor.openForReferral && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Referrals Open
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 mt-3">
                  <strong>{mentor.role}</strong> • Batch of {mentor.batch} ({mentor.branch})
                </div>

                {/* Expertise Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {mentor.expertise.map((exp, i) => (
                    <span key={i} className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/60">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span>Slots: <strong className="text-slate-800">{mentor.slotsAvailable} this week</strong></span>
                  <span className="text-emerald-600 font-extrabold">Free Campus Mentorship</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleBookSession(mentor.id, mentor.name)}
                    disabled={isBooked || loadingAction === `book-${mentor.id}`}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm ${
                      isBooked
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                        : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20"
                    }`}
                  >
                    {loadingAction === `book-${mentor.id}` ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : isBooked ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Calendar className="w-3.5 h-3.5" />
                    )}
                    <span>{isBooked ? "Confirmed" : "Book Mock"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRequestReferral(mentor.id, mentor.name, mentor.currentCompany)}
                    disabled={isReferred || loadingAction === `ref-${mentor.id}`}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border ${
                      isReferred
                        ? "bg-blue-50 text-blue-700 border-blue-200 cursor-default"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200"
                    }`}
                  >
                    {loadingAction === `ref-${mentor.id}` ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : isReferred ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <FileSearch className="w-3.5 h-3.5" />
                    )}
                    <span>{isReferred ? "Requested" : "Referral"}</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Give Back Section Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-extrabold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Placed Student? Register as an Alumni Mentor
          </h4>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Give back to your department juniors by offering 20-minute mock feedback sessions and employee referral slots.
          </p>
        </div>

        <button
          onClick={() => toast("Alumni mentor registration submitted! TPO verification pending.", "info")}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs transition-colors shrink-0"
        >
          Join Mentor Registry
        </button>
      </div>

    </div>
  );
}
