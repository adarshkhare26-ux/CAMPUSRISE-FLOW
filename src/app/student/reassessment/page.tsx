"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  LineChart, 
  Award,
  Zap,
  X,
  HelpCircle,
  Loader2,
  Check
} from "lucide-react";
import { REASSESSMENT_HISTORY } from "@/lib/mockData";
import { useToast } from "@/components/Toast";

interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function ReassessmentTrackerPage() {
  const { toast } = useToast();
  const [history, setHistory] = useState(REASSESSMENT_HISTORY);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  useEffect(() => {
    async function loadQuestions() {
      setIsLoadingQuestions(true);
      try {
        const res = await fetch("/api/student/reassessment");
        const data = await res.json();
        if (data.success && data.questions) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error("Failed to fetch questions", err);
      } finally {
        setIsLoadingQuestions(false);
      }
    }
    loadQuestions();
  }, []);

  const handleOpenQuiz = () => {
    setAnswers({});
    setShowQuizModal(true);
  };

  const handleSelectOption = (qId: string, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast(`Please answer all ${questions.length} questions before submitting.`, "info");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/student/reassessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();

      if (data.success) {
        const result = data.result;
        const newScore = Math.min(99, Math.round(75 + (result.scorePct * 0.22)));
        const newAttempt = {
          attempt: `Diagnostic Re-Test #${history.length + 1} (${result.scorePct}% Score)`,
          score: newScore,
          tech: Math.min(98, Math.round(newScore + 3)),
          apt: Math.min(95, Math.round(newScore - 2)),
          comm: Math.min(94, Math.round(newScore + 1)),
          notes: `Answered ${result.correctCount}/${result.total} correctly. Verified score committed to TPO Vault.`,
        };

        setHistory((prev) => [...prev, newAttempt]);
        setShowQuizModal(false);
        toast(data.message, "success");
      } else {
        toast(data.message || "Failed to submit assessment", "error");
      }
    } catch {
      toast("Error submitting assessment quiz", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const latest = history[history.length - 1];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Iterative Competency Trajectory</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Reassessment &amp; Progress Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track multi-attempt readiness trajectory. Retake simulations to automatically improve your corporate drive ranking.
          </p>
        </div>

        <Link
          href="/student/alumni-network"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 shrink-0"
        >
          <span>Alumni Mentors</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Visual Progress Trajectory Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Historical Growth Progression
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Score Evolution: {history.map(h => h.score).join(" → ")}
            </h2>
          </div>

          <button
            onClick={handleOpenQuiz}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-md shadow-emerald-500/20"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Diagnostic Recalibration</span>
          </button>
        </div>

        {/* Visual Bar Graph */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          {history.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-black">
                    #{idx + 1}
                  </span>
                  <span>{item.attempt}</span>
                </span>
                <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
                  {item.score} / 100
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700"
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Technical: <strong>{item.tech}%</strong> • Aptitude: <strong>{item.apt}%</strong> • Communication: <strong>{item.comm}%</strong></span>
                <span className="italic">{item.notes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trajectory Insights Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Improvement</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            +{latest.score - history[0].score}% Growth
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Progressed from baseline diagnostic to elite corporate candidate band.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Placement Vault Sync</div>
          <div className="text-2xl font-black text-blue-600 mt-1">
            Instant Timestamp
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Recruiter dashboard automatically sorts candidates by their highest verified score.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Strategic Recommendation</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            Alumni Mock Prep
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Schedule a 1-on-1 session with placed alumni at Microsoft or Amazon.
          </p>
        </div>
      </div>

      {/* Interactive Diagnostic Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                  Live Recalibration Assessment
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Comprehensive Diagnostic Recalibration Quiz
                </h3>
              </div>
              <button
                onClick={() => setShowQuizModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Answer the following 5 multi-domain questions (DSA, DBMS, System Design, Aptitude). Scoring &ge; 60% automatically boosts your placement readiness score in the TPO central vault!
            </p>

            {isLoadingQuestions ? (
              <div className="py-12 text-center text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                <p className="text-xs font-bold">Loading questions from test bank...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {questions.map((q, qIdx) => (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {q.category}
                      </span>
                      <span className="text-slate-400 font-bold">Q{qIdx + 1} of {questions.length}</span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {q.question}
                    </h4>

                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = answers[q.id] === optIdx;
                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`cursor-pointer p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs"
                                : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-500">
                    {Object.keys(answers).length} of {questions.length} Answered
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowQuizModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitQuiz}
                      disabled={isSubmitting}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-md shadow-emerald-500/20 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      <span>{isSubmitting ? "Scoring Quiz..." : "Submit Diagnostic Quiz"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
