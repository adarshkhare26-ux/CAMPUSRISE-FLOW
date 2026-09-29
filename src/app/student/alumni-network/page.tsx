"use client";

import { useState } from "react";
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
  Sparkles
} from "lucide-react";
import { ALUMNI_MENTORS } from "@/lib/mockData";

export default function AlumniMentorshipPage() {
  const [mentors, setMentors] = useState(ALUMNI_MENTORS);
  const [bookedSessionMentor, setBookedSessionMentor] = useState<string | null>(null);

  const handleBookSession = (mentorName: string) => {
    setBookedSessionMentor(mentorName);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <span>Step 10 of 12</span>
            <span>•</span>
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
          <span>Placement Drives (Step 11)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Booking Feedback Notification */}
      {bookedSessionMentor && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Mock Session Request sent to <strong>{bookedSessionMentor}</strong>! Calendar invite dispatched with Google Meet link.
            </span>
          </div>
          <button
            onClick={() => setBookedSessionMentor(null)}
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-950 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Alumni Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-sm flex items-center justify-center shadow-md shadow-blue-500/10">
                    {mentor.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{mentor.name}</h3>
                    <div className="text-xs font-semibold text-blue-700 flex items-center gap-1">
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
                <span className="text-emerald-600 font-extrabold">Free / Campus Mentorship</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleBookSession(mentor.name)}
                  className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1 shadow-sm shadow-emerald-500/20"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Mock</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert(`Resume review request queued for ${mentor.name}!`)}
                  className="px-3 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1 border border-slate-200"
                >
                  <FileSearch className="w-3.5 h-3.5" />
                  <span>Review CV</span>
                </button>
              </div>
            </div>

          </div>
        ))}
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
          onClick={() => alert("Registration form simulated. Credential verified via TPO placement records!")}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs transition-colors shrink-0"
        >
          Join Mentor Registry
        </button>
      </div>

    </div>
  );
}
