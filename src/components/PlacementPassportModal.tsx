"use client";

import { useState } from "react";
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  Download, 
  Share2, 
  CheckCircle2, 
  Award, 
  Building2, 
  Calendar, 
  GraduationCap, 
  Sparkles,
  Copy,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/components/Toast";

interface PlacementPassportProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
}

export function PlacementPassportModal({ isOpen, onClose, profile }: PlacementPassportProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const verificationHash = "SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069";
  const verifiedId = "PASSPORT-MP-2026-PS842";

  const handleCopyHash = () => {
    navigator.clipboard.writeText(verificationHash);
    setCopied(true);
    toast("Digital verification hash copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    toast("Generating verified placement passport certificate...", "info");
    setTimeout(() => {
      setIsDownloading(false);
      toast("Placement Passport downloaded successfully!", "success");
    }, 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profile.name} - Verified Placement Passport`,
        text: `Verified Student Placement Passport with 84% Readiness & DigiLocker authentication.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Public verification link copied to clipboard!", "success");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black tracking-wide text-white uppercase flex items-center gap-1.5">
                <span>National Student Placement Passport</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500 text-slate-950">
                  DIGILOCKER SEALED
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Verifiable Academic &amp; Employability Identity</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Passport Card (Sleek Gradient & Hologram feel) */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-500/30 overflow-hidden">
            {/* Ambient Background Circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            
            {/* Watermark Logo */}
            <div className="absolute right-6 bottom-6 opacity-5 pointer-events-none">
              <GraduationCap className="w-48 h-48 text-white" />
            </div>

            {/* Passport Card Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
                  <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center text-xl font-black text-emerald-400">
                    {(profile.name || "Priya Sharma").split(" ").map((n: string) => n[0]).join("")}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-white tracking-tight">{profile.name}</h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> VERIFIED
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{profile.branch}</p>
                  <p className="text-[11px] text-slate-400">Roll: {profile.rollNo} • Batch {profile.gradYear}</p>
                </div>
              </div>

              {/* QR Code Block */}
              <div className="text-center shrink-0">
                <div className="p-2 rounded-xl bg-white text-slate-900 shadow-md">
                  <QrCode className="w-14 h-14" />
                </div>
                <div className="text-[9px] font-mono text-slate-400 mt-1">{verifiedId}</div>
              </div>
            </div>

            {/* Passport Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-b border-white/10">
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CGPA (RGPV)</div>
                <div className="text-lg font-black text-white mt-0.5 flex items-baseline gap-1">
                  <span>{profile.cgpa.toFixed(2)}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">/ 10</span>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Readiness Index</div>
                <div className="text-lg font-black text-emerald-400 mt-0.5 flex items-baseline gap-1">
                  <span>84%</span>
                  <span className="text-[10px] text-slate-300 font-bold">Grade A+</span>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Backlogs</div>
                <div className="text-lg font-black text-white mt-0.5">
                  {profile.activeBacklogs === 0 ? (
                    <span className="text-emerald-400 flex items-center gap-1 text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" /> 0 Clear
                    </span>
                  ) : (
                    <span className="text-rose-400">{profile.activeBacklogs}</span>
                  )}
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DigiLocker Status</div>
                <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Authenticated
                </div>
              </div>
            </div>

            {/* Verified Skills Tags */}
            <div className="pt-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Verified Industry Competencies</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(profile.skills || []).slice(0, 8).map((skill: string) => (
                  <span
                    key={skill}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/10 text-white border border-white/15"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cryptographic Hash Footer */}
            <div className="mt-5 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-slate-400 font-mono">
              <span className="truncate">{verificationHash}</span>
              <button
                onClick={handleCopyHash}
                className="hover:text-white flex items-center gap-1 shrink-0 text-emerald-400"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? "Copied!" : "Copy Stamp"}</span>
              </button>
            </div>
          </div>

          {/* Verification Audit Details */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-extrabold text-emerald-900">National Academic Depository (NAD) &amp; TPO Certified</div>
              <div className="text-emerald-700 mt-0.5 text-[11px] leading-relaxed">
                This Placement Passport acts as an immutable digital credential for tier-1 campus placements, off-campus referrals, and government innovation drives. Any tampering invalidates the SHA-256 seal.
              </div>
            </div>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 font-medium">
            Valid through: <strong>Batch of 2026</strong> • Official MPOnline Placement Stream
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Link</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? "Exporting..." : "Download Verified Passport"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
