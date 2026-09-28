"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  Bot, 
  Mic, 
  BrainCircuit, 
  Layers, 
  MessagesSquare, 
  FileCode2,
  Sparkles
} from "lucide-react";
import { SIMULATION_MODULES } from "@/lib/mockData";

export default function SimulationCenterPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [micActive, setMicActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentModule = SIMULATION_MODULES.find(m => m.step === activeStep) || SIMULATION_MODULES[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <span>Step 5 of 12</span>
            <span>•</span>
            <span>Full Placement Cycle Sandbox</span>
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
          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20 shrink-0"
        >
          <span>Readiness Score (Step 6)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 6-Step Horizontal Pipeline Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SIMULATION_MODULES.map((mod) => {
          const isActive = mod.step === activeStep;
          return (
            <button
              key={mod.step}
              onClick={() => setActiveStep(mod.step)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]"
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
                <div className={`text-[11px] font-bold mt-1 ${isActive ? "text-blue-100" : "text-emerald-600"}`}>
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
              <PlayCircle className="w-5 h-5 text-blue-600" />
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
          
          {/* View for Module 6: AI Mock Interview Terminal */}
          {activeStep === 6 ? (
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold">Gemini AI Voice Interview Terminal</h3>
                    <p className="text-xs text-slate-400">Pacing: 135 WPM (Optimal) • Confidence: 88%</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Terminal
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-200">
                &ldquo;Candidate, explain how you would design a cache eviction policy in an in-memory datastore under heavy write workloads.&rdquo;
              </div>

              <div className="flex items-center justify-center py-4">
                <button
                  type="button"
                  onClick={() => setMicActive(!micActive)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    micActive
                      ? "bg-red-500 text-white animate-pulse shadow-red-500/30 scale-110"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
                  }`}
                >
                  <Mic className="w-7 h-7" />
                </button>
              </div>

              <div className="text-center text-xs text-slate-400">
                {micActive ? "Listening to your spoken answer... (Speak clearly into microphone)" : "Click mic to speak your simulated interview answer"}
              </div>
            </div>
          ) : (
            /* View for Modules 1 to 5 (MCQs / Case Scenarios) */
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>Question 1 of {currentModule.questionsCount}</span>
                  <span className="text-blue-600">Weight: 4 Marks</span>
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
                        ? "border-blue-600 bg-blue-50 text-blue-900 font-bold"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedAnswer === i && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => alert("Answer confirmed. AI scoring pipeline updated!")}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  Submit Answer &amp; Next
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
