"use client";

import { useState } from "react";
import { 
  X, 
  Building2, 
  ShieldCheck, 
  Download, 
  Printer, 
  CheckCircle2, 
  Calendar, 
  Award, 
  FileCheck, 
  QrCode,
  Sparkles,
  Share2
} from "lucide-react";
import { useToast } from "@/components/Toast";

interface OfferLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: {
    company: string;
    role: string;
    ctc: string;
    date: string;
    location: string;
    referenceNo: string;
    candidateName: string;
    rollNo: string;
    breakdown: {
      base: string;
      hra: string;
      specialAllowance: string;
      retirals: string;
      joiningBonus: string;
    };
  };
}

export function OfferLetterModal({ isOpen, onClose, offer }: OfferLetterModalProps) {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    setIsExporting(true);
    toast("Preparing official high-res offer letter certificate...", "info");
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-4">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white">Official Verified Placement Offer Letter</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-slate-950">
                  DIGILOCKER SEALED
                </span>
              </div>
              <p className="text-xs text-slate-400">Ref No: <span className="font-mono text-slate-200">{offer.referenceNo}</span> • MPOnline Placement Stream</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Letter Body (Simulating Real Institutional Corporate Letterhead) */}
        <div className="p-8 overflow-y-auto space-y-6 bg-slate-50/50">
          
          {/* Letterhead Container */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-md space-y-6 relative text-slate-800 font-sans">
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <Building2 className="w-96 h-96 text-slate-900" />
            </div>

            {/* Letterhead Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-6 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
                  {offer.company[0]}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{offer.company}</h2>
                  <p className="text-xs text-slate-500 font-medium">Global Enterprise Talent Acquisition • Campus Recruitment Directorate</p>
                  <p className="text-[11px] text-slate-400">Date of Issuance: {offer.date} • Location: {offer.location}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>OFFER ACCEPTED</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">Ref: {offer.referenceNo}</div>
              </div>
            </div>

            {/* Candidate & Formal Greeting */}
            <div className="space-y-3">
              <div className="text-xs text-slate-600">
                <strong>To:</strong> <span className="font-extrabold text-slate-900 text-sm">{offer.candidateName}</span><br />
                <strong>Roll Number:</strong> <span className="font-mono text-slate-700">{offer.rollNo}</span><br />
                <strong>Institution:</strong> Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), MP
              </div>

              <p className="text-xs leading-relaxed text-slate-700">
                Dear <strong>{offer.candidateName}</strong>,
              </p>
              <p className="text-xs leading-relaxed text-slate-700">
                Following your performance in the CampusRise National Employability Assessments, technical interview rounds, and verified DigiLocker academic review, we are delighted to offer you the position of <strong className="text-slate-900">{offer.role}</strong> at <strong className="text-slate-900">{offer.company}</strong>.
              </p>
            </div>

            {/* CTC & Compensation Matrix */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-blue-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">Annual Compensation Package</div>
                  <div className="text-2xl font-black text-slate-900 mt-0.5">{offer.ctc}</div>
                </div>
                <span className="px-3 py-1 rounded-xl text-xs font-black bg-blue-600 text-white shadow-xs">
                  Fixed + Guaranteed Component
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t border-blue-100">
                <div className="bg-white p-2.5 rounded-xl border border-blue-100/80">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Basic Salary</div>
                  <div className="font-extrabold text-slate-800">{offer.breakdown.base}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-blue-100/80">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">HRA / Housing</div>
                  <div className="font-extrabold text-slate-800">{offer.breakdown.hra}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-blue-100/80">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Special Allowances</div>
                  <div className="font-extrabold text-slate-800">{offer.breakdown.specialAllowance}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-blue-100/80">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Joining Bonus</div>
                  <div className="font-extrabold text-emerald-700">{offer.breakdown.joiningBonus}</div>
                </div>
              </div>
            </div>

            {/* Verification Signatures & DigiLocker SHA-256 Seal */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-900">
                  <QrCode className="w-12 h-12" />
                </div>
                <div className="text-[11px] text-slate-500 leading-tight">
                  <div className="font-extrabold text-slate-800">DigiLocker Authentic Signature</div>
                  <div className="font-mono text-[9px] text-slate-400 mt-0.5">SHA256: 4a91b2c8f0e3...199b</div>
                  <div className="text-emerald-700 font-bold text-[10px] mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Tamper-Proof Cryptographic Vault
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="font-serif italic text-base font-bold text-slate-800 tracking-wide">
                  Anurag Singhal
                </div>
                <div className="text-xs font-bold text-slate-700">Vice President — University Recruiting</div>
                <div className="text-[10px] text-slate-400">{offer.company} Worldwide</div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-medium hidden sm:block">
            Offer Status: <strong>Formally Stamped &amp; Validated with TPO Office</strong>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              disabled={isExporting}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isExporting ? "Generating..." : "Print / Save PDF Letter"}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
