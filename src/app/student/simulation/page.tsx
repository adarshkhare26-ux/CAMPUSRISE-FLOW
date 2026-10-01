"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  Bot, 
  Mic, 
  MicOff,
  BrainCircuit, 
  Layers, 
  MessagesSquare, 
  FileCode2,
  Sparkles,
  Send,
  Loader2,
  Award,
  RefreshCw,
  Volume2,
  VolumeX,
  Radio
} from "lucide-react";
import { SIMULATION_MODULES } from "@/lib/mockData";
import { useToast } from "@/components/Toast";

export default function SimulationCenterPage() {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(6); // Default to AI Voice Interview
  const [modulesState, setModulesState] = useState(SIMULATION_MODULES);
  const [micActive, setMicActive] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [fillerCount, setFillerCount] = useState(0);
  const [wordsCount, setWordsCount] = useState(0);
  const recognitionRef = useRef<any>(null);

  const currentModule = modulesState.find(m => m.step === activeStep) || modulesState[0];

  const currentQuestionText = 
    "Candidate, explain how you would design a cache eviction policy in an in-memory datastore under heavy write workloads. When would you choose LFU over LRU?";

  // Initialize Speech Recognition if supported
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = "en-IN";

        recog.onresult = (event: any) => {
          let currentText = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript;
          }
          setTranscript((prev) => prev + " " + currentText);
        };

        recog.onerror = (err: any) => {
          console.warn("Speech recognition notice:", err.error);
          setMicActive(false);
        };

        recognitionRef.current = recog;
      }
    }
  }, []);

  // Track words count and filler words in real time
  useEffect(() => {
    const fullText = (transcript + " " + typedAnswer).toLowerCase();
    const words = fullText.trim().split(/\s+/).filter(Boolean);
    setWordsCount(words.length);

    const fillers = ["um", "uh", "like", "actually", "basically", "you know"];
    let count = 0;
    fillers.forEach(f => {
      const regex = new RegExp(`\\b${f}\\b`, "gi");
      const matches = fullText.match(regex);
      if (matches) count += matches.length;
    });
    setFillerCount(count);
  }, [transcript, typedAnswer]);

  const handleSpeakQuestion = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast("Text-to-speech is not supported in this browser.", "info");
      return;
    }

    if (isSpeakingQuestion) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuestion(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentQuestionText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    utterance.onend = () => {
      setIsSpeakingQuestion(false);
    };
    utterance.onerror = () => {
      setIsSpeakingQuestion(false);
    };

    setIsSpeakingQuestion(true);
    window.speechSynthesis.speak(utterance);
    toast("AI Interviewer is speaking question out loud...", "info");
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      toast("Speech recognition is supported in Google Chrome & Microsoft Edge.", "info");
      setMicActive(!micActive);
      return;
    }

    if (micActive) {
      recognitionRef.current.stop();
      setMicActive(false);
      toast("Microphone paused. You can edit your response below.", "info");
    } else {
      try {
        recognitionRef.current.start();
        setMicActive(true);
        toast("Listening to your voice... Speak clearly.", "success");
      } catch (err) {
        console.error("Mic error:", err);
        setMicActive(false);
      }
    }
  };

  const handleEvaluateVoice = async () => {
    const finalAnswer = (transcript + " " + typedAnswer).trim();
    if (!finalAnswer) {
      toast("Please speak or type your answer before submitting for AI scoring.", "error");
      return;
    }

    if (micActive && recognitionRef.current) {
      recognitionRef.current.stop();
      setMicActive(false);
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/student/simulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: "Full Stack SDE",
          question: currentQuestionText,
          answerText: finalAnswer,
          speechMetrics: {
            wpm: 135,
            confidence: 88,
            clarity: 85,
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.submission) {
        setEvaluationResult(data.submission);
        toast(`AI Evaluation Complete! Rating: ${data.submission.rating}/10`, "success");
      } else {
        toast(data.message || "Evaluation failed", "error");
      }
    } catch {
      toast("Error submitting answer to AI engine", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load persistent simulation attempts on mount
  useEffect(() => {
    fetchSimulationData();
  }, []);

  const fetchSimulationData = async () => {
    try {
      const res = await fetch("/api/student/simulation");
      const data = await res.json();
      if (data.success && data.modules) {
        setModulesState(data.modules);
      }
    } catch {
      // ignore
    }
  };

  const handleMcqSubmit = async () => {
    if (selectedAnswer === null) {
      toast("Please select an answer option first.", "info");
      return;
    }

    setIsSubmitting(true);
    // Correct answer is option 0 (e.g. 120 meters, B-Tree, etc.)
    const isCorrect = selectedAnswer === 0;
    const scoreVal = isCorrect ? 95 : 65;

    try {
      const res = await fetch("/api/student/simulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phaseStep: activeStep,
          phaseId: `phase-${activeStep}`,
          title: currentModule.title,
          score: scoreVal,
          totalQuestions: currentModule.questionsCount,
          correctAnswers: isCorrect ? currentModule.questionsCount : Math.floor(currentModule.questionsCount * 0.6),
          timeSpentSeconds: 180,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast(`Phase ${activeStep} recorded! Score: ${scoreVal}%. Readiness: ${data.compositeScore}%`, "success");
        setModulesState((prev) =>
          prev.map((m) => (m.step === activeStep ? { ...m, score: scoreVal } : m))
        );
        setSelectedAnswer(null);
        if (activeStep < 6) {
          setActiveStep(activeStep + 1);
        }
      } else {
        toast(data.message || "Submission failed", "error");
      }
    } catch {
      toast("Error recording assessment score", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI Multimodal Evaluation Sandbox</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Placement Simulation Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete the 6 multi-stage assessments to calibrate your verified AI Readiness Score.
          </p>
        </div>

        <Link
          href="/student/readiness-score"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 shrink-0"
        >
          <span>Readiness Score</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 6-Step Horizontal Pipeline Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {modulesState.map((mod) => {
          const isActive = mod.step === activeStep;
          return (
            <button
              key={mod.step}
              onClick={() => {
                setActiveStep(mod.step);
                setEvaluationResult(null);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/20 scale-[1.02]"
                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-800"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  Phase {mod.step}
                </span>
                <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-emerald-500"}`} />
              </div>

              <div>
                <div className="text-xs font-extrabold leading-snug line-clamp-1">{mod.title}</div>
                <div className={`text-[11px] font-bold mt-1 ${isActive ? "text-emerald-100" : "text-emerald-600"}`}>
                  Score: {mod.score}%
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Active Module Workspace */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interactive Test Workspace • Stage {currentModule.step} of 6
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-emerald-600" />
              {currentModule.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">{currentModule.desc}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentModule.questionsCount} Questions</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentModule.timeMins} Mins</span>
            </div>
          </div>
        </div>

        {/* Dynamic Module Content View */}
        <div className="mt-6">
          
          {/* View for Module 6: AI Voice Interview Terminal */}
          {activeStep === 6 ? (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold">Gemini AI Voice Interview Terminal</h3>
                      <p className="text-xs text-slate-400">Pacing: 135 WPM (Optimal) • Confidence: 88%</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {micActive ? "Listening (Live Speech API)" : "Ready for Input"}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-200 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    &ldquo;{currentQuestionText}&rdquo;
                  </div>
                  <button
                    type="button"
                    onClick={handleSpeakQuestion}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                      isSpeakingQuestion
                        ? "bg-amber-500 text-slate-950 animate-pulse font-extrabold"
                        : "bg-white/10 hover:bg-white/20 text-slate-200"
                    }`}
                  >
                    {isSpeakingQuestion ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    <span>{isSpeakingQuestion ? "Stop Audio" : "Listen AI Voice"}</span>
                  </button>
                </div>

                {/* Mic & Input Zone with Live Soundwave Equalizer */}
                <div className="flex flex-col items-center justify-center py-2 gap-3">
                  <button
                    type="button"
                    onClick={toggleMic}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      micActive
                        ? "bg-rose-500 text-white animate-pulse shadow-rose-500/40 scale-110"
                        : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/30"
                    }`}
                    title={micActive ? "Click to stop mic" : "Click to speak"}
                  >
                    {micActive ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                  </button>

                  {/* Dynamic Soundwave Waveform Equalizer */}
                  <div className="flex items-center justify-center gap-1.5 h-10 my-1">
                    {[
                      "animate-wave-1", "animate-wave-2", "animate-wave-3", "animate-wave-4",
                      "animate-wave-5", "animate-wave-6", "animate-wave-7", "animate-wave-8"
                    ].map((cls, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 rounded-full transition-all ${
                          micActive 
                            ? `bg-gradient-to-t from-emerald-500 to-teal-300 ${cls}` 
                            : "h-2 bg-slate-700 opacity-40"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-center text-xs text-slate-400">
                    {micActive ? "🔴 Listening... Speak clearly into your microphone" : "Click microphone to speak or type your answer below"}
                  </div>

                  {/* Live Speech Metrics Strip */}
                  <div className="grid grid-cols-3 gap-3 w-full max-w-md py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Word Count</div>
                      <div className="text-xs font-black text-white mt-0.5">{wordsCount} words</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Filler Words</div>
                      <div className={`text-xs font-black mt-0.5 ${fillerCount === 0 ? "text-emerald-400" : "text-amber-400"}`}>
                        {fillerCount} {fillerCount === 0 ? "(Clean Speech)" : "detected"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pacing</div>
                      <div className="text-xs font-black text-blue-400 mt-0.5">~135 WPM (Optimal)</div>
                    </div>
                  </div>
                </div>

                {/* Live Transcript / Typed Input Box */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Your Spoken / Typed Response:</span>
                    {(transcript || typedAnswer) && (
                      <button
                        onClick={() => {
                          setTranscript("");
                          setTypedAnswer("");
                        }}
                        className="text-[11px] text-slate-400 hover:text-white"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={typedAnswer || transcript}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    placeholder="Speak using the microphone above, or type your answer here (e.g., In high write workloads, LRU can suffer from lock contention on doubly linked lists, whereas LFU tracks access frequency...)"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                  />
                </div>

                <div className="flex justify-end items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleEvaluateVoice}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>{isSubmitting ? "Evaluating with AI..." : "Submit Answer for AI Scoring"}</span>
                  </button>
                </div>
              </div>

              {/* Evaluation Results Card */}
              {evaluationResult && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border border-emerald-200 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">AI Scoring &amp; Diagnostic Feedback</h4>
                        <p className="text-xs text-slate-500">Evaluated on Technical Precision, Communication &amp; Logic</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-emerald-700">{evaluationResult.rating}</span>
                      <span className="text-xs font-extrabold text-slate-500">/ 10</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Technical Score</div>
                      <div className="text-lg font-black text-slate-900 mt-0.5">{evaluationResult.scores?.technical}%</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Communication Clarity</div>
                      <div className="text-lg font-black text-slate-900 mt-0.5">{evaluationResult.scores?.communication}%</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Problem Solving</div>
                      <div className="text-lg font-black text-slate-900 mt-0.5">{evaluationResult.scores?.problemSolving}%</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-emerald-100 text-xs text-slate-700 leading-relaxed">
                    <strong>AI Feedback Critique:</strong> {evaluationResult.feedback}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* View for Modules 1 to 5 (MCQs / Case Scenarios) */
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>Question 1 of {currentModule.questionsCount}</span>
                  <span className="text-blue-600 font-bold">Weight: 4 Marks</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-relaxed">
                  {activeStep === 1 && "A train running at 54 km/h takes 20 seconds to pass a platform. If the train length is 180 meters, what is the length of the platform?"}
                  {activeStep === 2 && "Which indexing data structure does PostgreSQL default to for PRIMARY KEY constraints, and what is its worst-case search complexity?"}
                  {activeStep === 3 && "You discover a critical security loophole in production 2 hours before a major product demo to prospective investors. How do you respond?"}
                  {activeStep === 4 && "System latency surges from 120ms to 2400ms after deploying a database migration. Walk through your triage sequence."}
                  {activeStep === 5 && "Topic for Discussion: 'Should universities replace traditional end-term exams with AI-verified skill portfolios?'"}
                </h3>
              </div>

              {/* Sample Options */}
              <div className="space-y-2.5">
                {[
                  activeStep === 1 ? "120 meters" : activeStep === 2 ? "B-Tree (O(log n))" : "Halt release immediately and notify engineering lead with patch PR",
                  activeStep === 1 ? "150 meters" : activeStep === 2 ? "Hash Index (O(n))" : "Proceed with demo silently and fix post-demo",
                  activeStep === 1 ? "180 meters" : activeStep === 2 ? "LSM Tree (O(1))" : "Blame the infrastructure provider publicly",
                  activeStep === 1 ? "200 meters" : activeStep === 2 ? "BitMap Index (O(log n))" : "Delegate issue to junior intern"
                ].map((opt, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedAnswer(i)}
                    className={`cursor-pointer p-3.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                      selectedAnswer === i
                        ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm shadow-emerald-500/10"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedAnswer === i && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleMcqSubmit}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
                >
                  Submit Answer &amp; Next Phase
                </button>
                <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Module Score Calibrated: {currentModule.score}%
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
