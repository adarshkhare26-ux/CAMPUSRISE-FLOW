"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  Eye, 
  Download, 
  Lock, 
  FileText, 
  Sparkles, 
  Building2, 
  Check, 
  QrCode, 
  X, 
  Plus,
  AlertCircle,
  FileCheck2,
  BadgeCheck
} from "lucide-react";
import { DigiLockerAccount, DigiLockerDocument } from "@/lib/mockData";

interface DigiLockerSectionProps {
  initialAccount?: DigiLockerAccount;
}

export function DigiLockerSection({ initialAccount }: DigiLockerSectionProps) {
  const [account, setAccount] = useState<DigiLockerAccount>(
    initialAccount || {
      isConnected: true,
      digiLockerId: "DL-2026-RGPV-88219",
      linkedAadhaarMasked: "XXXX-XXXX-8421",
      apaarId: "APAAR-6291-0941-8812",
      fullName: "Priya Sharma",
      lastSyncedAt: "Today, 11:30 AM",
      verifiedCount: 5,
      tamperProofSealId: "DIGI-GOV-IN-7889102-RGPV",
      documents: []
    }
  );

  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DigiLockerDocument | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState("");

  // Connect / Sync Simulation
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setAccount(prev => ({
        ...prev,
        lastSyncedAt: "Just now",
        verifiedCount: prev.documents.length
      }));
      setSyncSuccessMsg("All 5 documents cryptographically re-verified via DigiLocker API.");
      setTimeout(() => setSyncSuccessMsg(""), 4000);
    }, 1200);
  };

  // Add document simulation
  const [newDocType, setNewDocType] = useState("gate");
  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: DigiLockerDocument = {
      id: `doc-${Date.now()}`,
      name: newDocType === "gate" 
        ? "GATE 2026 Scorecard (Computer Science)" 
        : newDocType === "nptel" 
        ? "NPTEL National Certification (Cloud Computing)" 
        : "State Domicile & Category Certificate",
      category: "Academic",
      issuer: newDocType === "gate" ? "IIT Roorkee / GATE Committee" : "NPTEL / AICTE",
      docType: newDocType,
      docNumber: `GOI/${newDocType.toUpperCase()}/2026/89123`,
      dateIssued: "15 Feb 2026",
      verificationStatus: "VERIFIED",
      fileSize: "1.1 MB",
      summary: "Verified Score: 742/1000 • AIR 412 • Authenticated via MeriPehchan",
      verifiedFields: {
        "Candidate Name": account.fullName,
        "Registration No": "CS26S819022",
        "Verification Protocol": "PKI-SHA256 Digital Certificate"
      },
      digitalSignature: {
        signer: "Exam Organizing Chairman",
        certSerial: "GATE-CA-2026-9902",
        timestamp: new Date().toISOString(),
        hash: "SHA256: 3d1e99f012aa44bc9123fe"
      }
    };

    setAccount(prev => ({
      ...prev,
      documents: [...prev.documents, newDoc],
      verifiedCount: prev.verifiedCount + 1
    }));
    setShowAddDocModal(false);
    setSyncSuccessMsg(`New document "${newDoc.name}" fetched and verified from DigiLocker!`);
    setTimeout(() => setSyncSuccessMsg(""), 4000);
  };

  return (
    <div className="space-y-4">
      {/* DigiLocker Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        
        {/* Top Header Bar with Government Branding */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex items-start sm:items-center gap-3.5">
              {/* DigiLocker Official Emblemed Avatar */}
              <div className="w-12 h-12 rounded-2xl bg-white text-blue-900 flex flex-col items-center justify-center font-black shadow-lg shadow-black/20 shrink-0">
                <span className="text-[10px] uppercase tracking-tighter text-blue-600 font-extrabold">Govt</span>
                <span className="text-xs font-black -mt-1 text-blue-900">DL</span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                    DigiLocker Document Verification Vault
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    MeriPehchan Connected
                  </span>
                </div>
                <p className="text-xs text-blue-200/90 mt-0.5">
                  Official National Academic Depository (NAD) &amp; Aadhaar Verified Documents for TPO Campus Drives
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleSync}
                disabled={isSyncing}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1.5 border border-white/15"
                title="Fetch latest verified documents from DigiLocker"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-blue-300 ${isSyncing ? "animate-spin" : ""}`} />
                <span>{isSyncing ? "Verifying..." : "Sync DigiLocker"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddDocModal(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-500 hover:bg-blue-600 text-white transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/30"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Pull Document</span>
              </button>
            </div>

          </div>

          {/* Account Meta Strip */}
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-300/80">DigiLocker ID</div>
              <div className="font-bold text-white tracking-wide">{account.digiLockerId}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-300/80">Linked Aadhaar</div>
              <div className="font-bold text-white tracking-wide flex items-center gap-1">
                <span>{account.linkedAadhaarMasked}</span>
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-300/80">APAAR / ABC ID</div>
              <div className="font-bold text-white tracking-wide">{account.apaarId}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-300/80">TPO Tamper Seal</div>
              <div className="font-bold text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Sealed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Success Notification */}
        {syncSuccessMsg && (
          <div className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{syncSuccessMsg}</span>
          </div>
        )}

        {/* Verified Documents List */}
        <div className="p-5 sm:p-6 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              <span>Verified Documents in DigiLocker Vault ({account.documents.length})</span>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              Synchronized with Central Placement Vault
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {account.documents.map((doc) => (
              <div 
                key={doc.id}
                className="group p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all bg-slate-50/50 hover:bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                          {doc.name}
                        </h4>
                        <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                          {doc.issuer}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 shrink-0 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </div>

                  {/* Summary & Doc Number */}
                  <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/70 my-2">
                    <div className="font-semibold">{doc.summary}</div>
                    <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>Doc Ref: <span className="font-mono text-slate-700">{doc.docNumber}</span></span>
                      <span>Issued: {doc.dateIssued}</span>
                    </div>
                  </div>
                </div>

                {/* Footer details & View Doc Button */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-blue-600" />
                    <span>SHA-256 PKI Verified</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-700 hover:text-white bg-blue-50 hover:bg-blue-600 transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View &amp; Verify</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Statutory Compliance Footer Note */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-relaxed">
              <span className="font-bold">Zero-Paperwork Verification: </span>
              Documents pulled through DigiLocker are treated as legally original electronic records under 
              <span className="font-semibold"> Rule 9A of Information Technology (Preservation and Retention of Information) Rules</span>. 
              Visiting hiring companies (TCS, Infosys, Amazon, etc.) can verify your marks directly without requesting physical paper copies.
            </div>
          </div>
        </div>

      </div>

      {/* Document View & Verify Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Certificate Preview */}
            <div className="text-center pb-4 border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>DigiLocker Legally Verified Electronic Record</span>
              </div>
              <h3 className="text-base font-black text-slate-900">
                {selectedDoc.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Issued by {selectedDoc.issuer}
              </p>
            </div>

            {/* Certificate Body */}
            <div className="my-5 p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/70">
                <span className="text-slate-500 font-semibold">Document Type:</span>
                <span className="font-bold text-slate-900">{selectedDoc.category}</span>
              </div>

              {/* Dynamic verified fields */}
              {Object.entries(selectedDoc.verifiedFields).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{key}:</span>
                  <span className="font-bold text-slate-900 font-mono">{val}</span>
                </div>
              ))}

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/70">
                <span className="text-slate-500">Document URI:</span>
                <span className="font-mono text-[10px] text-blue-700 font-bold">{selectedDoc.docNumber}</span>
              </div>

              {/* Digital Signature Block */}
              <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px]">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  <span>Digitally Signed &amp; Timestamped</span>
                </div>
                <div className="text-emerald-800 text-[10px] space-y-0.5">
                  <div>Signer: {selectedDoc.digitalSignature.signer}</div>
                  <div>Serial: {selectedDoc.digitalSignature.certSerial}</div>
                  <div className="font-mono truncate">Hash: {selectedDoc.digitalSignature.hash}</div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  alert(`Verified digital copy of "${selectedDoc.name}" downloaded with official DigiLocker QR seal.`);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sealed PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Pull / Collect New Document Modal */}
      {showAddDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowAddDocModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Pull Document from DigiLocker
                </h3>
                <p className="text-xs text-slate-500">
                  Connect to government repository to fetch authentic records
                </p>
              </div>
            </div>

            <form onSubmit={handleAddDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Document to Fetch &amp; Verify
                </label>
                <select
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                >
                  <option value="gate">GATE 2026 Scorecard (IIT / NTA)</option>
                  <option value="nptel">NPTEL Elite Certificate (AICTE / MoE)</option>
                  <option value="category">MP State Domicile &amp; Category Certificate</option>
                  <option value="migration">University Migration &amp; Character Certificate</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">Verification Protocol:</div>
                <div className="text-[11px] leading-relaxed">
                  DigiLocker will query the central repository of the issuer using your linked Aadhaar ({account.linkedAadhaarMasked}) 
                  and pull the digitally signed XML/PDF directly into your TPO dossier.
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDocModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/25 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Fetch &amp; Verify Document</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
