"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  Eye, 
  Download, 
  Lock, 
  FileText, 
  Sparkles, 
  Check, 
  QrCode, 
  X, 
  Plus,
  AlertCircle,
  FileCheck2,
  BadgeCheck,
  Building2,
  Loader2
} from "lucide-react";
import { DigiLockerAccount, DigiLockerDocument, INITIAL_STUDENT_PROFILE } from "@/lib/mockData";

interface DigiLockerSectionProps {
  initialAccount?: DigiLockerAccount;
  onSyncSuccess?: (updatedAccount: DigiLockerAccount) => void;
}

export function DigiLockerSection({ initialAccount, onSyncSuccess }: DigiLockerSectionProps) {
  const [account, setAccount] = useState<DigiLockerAccount>(
    initialAccount || INITIAL_STUDENT_PROFILE.digiLocker || {
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
  const [syncStage, setSyncStage] = useState(0);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DigiLockerDocument | null>(null);
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState("");

  const syncStages = [
    { title: "Initiating MeriPehchan Gateway Handshake", detail: "Querying api.digitallocker.gov.in/v2 via OAuth2 token" },
    { title: "Validating Aadhaar & APAAR/ABC Identity", detail: "UIDAI e-KYC match for Aadhaar XXXX-XXXX-8421 & APAAR-6291-0941-8812" },
    { title: "Fetching CBSE & RGPV Academic Records", detail: "Pulling Class X (91.4%), Class XII (88.6%) & B.Tech Sem 1-6 Transcripts (8.42 CGPA)" },
    { title: "Cryptographic SHA-256 PKI Verification", detail: "Validating digital signatures of Examination Controllers & issuing Tamper Seal" },
    { title: "Live Synchronization Complete!", detail: "Updated records securely committed to Central TPO Placement Vault" },
  ];

  // Working Interactive Sync Handler
  const handleSync = () => {
    setShowSyncModal(true);
    setIsSyncing(true);
    setSyncStage(0);

    // Progression sequence
    setTimeout(() => setSyncStage(1), 500);
    setTimeout(() => setSyncStage(2), 1100);
    setTimeout(() => setSyncStage(3), 1700);
    setTimeout(() => {
      setSyncStage(4);
      setIsSyncing(false);

      const now = new Date();
      const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      
      const updated: DigiLockerAccount = {
        ...account,
        lastSyncedAt: timeStr,
        verifiedCount: account.documents.length,
        tamperProofSealId: `DIGI-GOV-IN-${Math.floor(1000000 + Math.random() * 9000000)}-RGPV`
      };

      setAccount(updated);
      onSyncSuccess?.(updated);
      setSyncSuccessMsg(`DigiLocker Re-Sync Complete at ${timeStr}! All 5 documents cryptographically verified.`);
      setTimeout(() => setSyncSuccessMsg(""), 5000);
    }, 2400);
  };

  // Add document simulation
  const [newDocType, setNewDocType] = useState("gate");
  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: DigiLockerDocument = {
      id: `doc-${Date.now()}`,
      name: newDocType === "gate" 
        ? "GATE 2026 Scorecard (Computer Science & IT)" 
        : newDocType === "nptel" 
        ? "NPTEL National Certification (Cloud Computing & Distributed Systems)" 
        : "Madhya Pradesh State Domicile & Category Certificate",
      category: "Academic",
      issuer: newDocType === "gate" ? "IIT Roorkee / GATE Committee" : newDocType === "nptel" ? "NPTEL / AICTE (MoE)" : "Revenue Dept, Govt of MP",
      docType: newDocType,
      docNumber: `GOI/${newDocType.toUpperCase()}/2026/${Math.floor(10000 + Math.random() * 90000)}`,
      dateIssued: "20 Feb 2026",
      verificationStatus: "VERIFIED",
      fileSize: "1.2 MB",
      summary: newDocType === "gate" 
        ? "Score: 742/1000 • AIR 412 • Authenticated via MeriPehchan"
        : newDocType === "nptel"
        ? "Elite + Gold Medal (Top 2%) • Verified by IIT Madras"
        : "Domicile Verified • Resident of Madhya Pradesh",
      verifiedFields: {
        "Candidate Legal Name": account.fullName,
        "Registration / Ref": `REF-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        "Verification Protocol": "PKI-SHA256 Digital Certificate",
        "National Register ID": `NAD-GOI-${Math.floor(100000 + Math.random() * 900000)}`
      },
      digitalSignature: {
        signer: newDocType === "gate" ? "Organizing Chairman, GATE 2026" : "Principal Authority, Govt of MP",
        certSerial: `CA-IN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        hash: `SHA256: ${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`
      }
    };

    const updated: DigiLockerAccount = {
      ...account,
      documents: [...account.documents, newDoc],
      verifiedCount: account.documents.length + 1
    };

    setAccount(updated);
    onSyncSuccess?.(updated);
    setShowAddDocModal(false);
    setSyncSuccessMsg(`Document "${newDoc.name}" fetched and sealed in DigiLocker vault!`);
    setTimeout(() => setSyncSuccessMsg(""), 5000);
  };

  return (
    <div className="space-y-4">
      {/* DigiLocker Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        
        {/* Top Header Bar with Official Government Branding */}
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
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    MeriPehchan Live Synced
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
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1.5 border border-white/15 shadow-sm active:scale-95"
                title="Fetch latest verified documents from DigiLocker"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-blue-300 ${isSyncing ? "animate-spin" : ""}`} />
                <span>{isSyncing ? "Verifying Vault..." : "Sync DigiLocker"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddDocModal(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-500 hover:bg-blue-600 text-white transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/30 active:scale-95"
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
              <div className="text-[10px] uppercase font-bold text-blue-300/80">Last Synchronized</div>
              <div className="font-bold text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{account.lastSyncedAt}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Success Notification Toast */}
        {syncSuccessMsg && (
          <div className="px-5 py-3 bg-emerald-50 border-b border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{syncSuccessMsg}</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 font-bold">
              Seal ID: {account.tamperProofSealId}
            </span>
          </div>
        )}

        {/* Verified Documents Grid */}
        <div className="p-5 sm:p-6 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              <span>Verified Documents in DigiLocker Vault ({account.documents.length})</span>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              Synchronized with Central TPO Placement Vault
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
                      <span>Doc Ref: <span className="font-mono text-slate-700 font-bold">{doc.docNumber}</span></span>
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
              Visiting hiring companies (TCS, Infosys, Amazon, Cisco, etc.) can verify candidate marks directly from the digital seal without requesting physical paper copies.
            </div>
          </div>
        </div>

      </div>

      {/* WORKING SYNC SEQUENCE MODAL */}
      {showSyncModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            
            <div className="text-center pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
                {isSyncing ? (
                  <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                ) : (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                )}
              </div>
              <h3 className="text-base font-black text-slate-900">
                {isSyncing ? "Synchronizing DigiLocker Vault" : "DigiLocker Re-Sync Complete"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Authenticating via MeriPehchan National Single Sign-On Gateway
              </p>
            </div>

            {/* Stepper list */}
            <div className="my-5 space-y-3">
              {syncStages.map((st, idx) => {
                const isDone = syncStage > idx || (!isSyncing && syncStage === 4);
                const isCurrent = isSyncing && syncStage === idx;

                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isDone ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Loader2 className="w-3 h-3 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isDone ? "text-slate-900" : isCurrent ? "text-blue-700 font-extrabold" : "text-slate-400"}`}>
                        {st.title}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {st.detail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={isSyncing}
                onClick={() => setShowSyncModal(false)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSyncing
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/20"
                }`}
              >
                {isSyncing ? "Verifying..." : "Done & Close"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Document View & Verify Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            
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
            <div className="my-5 p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/70">
                <span className="text-slate-500 font-semibold">Document Category:</span>
                <span className="font-bold text-slate-900">{selectedDoc.category}</span>
              </div>

              {/* Dynamic verified fields */}
              {Object.entries(selectedDoc.verifiedFields).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-xs py-0.5">
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
                  <span>Digitally Signed &amp; Timestamped (SHA-256 PKI)</span>
                </div>
                <div className="text-emerald-800 text-[10px] space-y-0.5">
                  <div>Signer: <span className="font-bold">{selectedDoc.digitalSignature.signer}</span></div>
                  <div>Serial: <span className="font-mono">{selectedDoc.digitalSignature.certSerial}</span></div>
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
