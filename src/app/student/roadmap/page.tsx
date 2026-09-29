"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ListOrdered, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Code, 
  Award, 
  Bot,
  Sparkles
} from "lucide-react";
import { ROADMAP_PLAYLIST } from "@/lib/mockData";

export default function ActionRoadmapPage() {
  const [playlist, setPlaylist] = useState(ROADMAP_PLAYLIST);

  const toggleTask = (phaseIndex: number, taskId: string) => {
    const updated = [...playlist];
    const task = updated[phaseIndex].tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setPlaylist(updated);
    }
  };

  const totalTasks = playlist.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = playlist.reduce((acc, p) => acc + p.tasks.filter(t => t.completed).length, 0);
  const completionPct = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <span>Step 8 of 12</span>
            <span>•</span>
            <span>AI Prescriptive Learning Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Personalized Action Roadmap &amp; Playlist
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Curated 4-stage action plan (Learn &rarr; Practice &rarr; Test &rarr; Interview) designed to bridge your critical skill gaps.
          </p>
        </div>

        <Link
          href="/student/reassessment"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 shrink-0"
        >
          <span>Reassessment (Step 9)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-300">Playlist Completion</div>
            <div className="text-2xl font-black mt-1">
              {completedTasks} of {totalTasks} Tasks Completed ({completionPct}%)
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Completing the remaining items will trigger an automated score recalibration up to 92%.
            </p>
          </div>

          <div className="w-full sm:w-48 bg-white/20 h-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
              style={{ width: `${completionPct}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 4 Phases List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playlist.map((phase, pIdx) => {
          return (
            <div key={pIdx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-blue-600" />
                  {phase.phase}
                </h2>
                <span className="text-[11px] font-bold text-slate-400">
                  {phase.tasks.filter(t => t.completed).length}/{phase.tasks.length} Done
                </span>
              </div>

              <div className="space-y-3">
                {phase.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(pIdx, task.id)}
                    className={`cursor-pointer p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3 select-none ${
                      task.completed
                        ? "bg-emerald-50/50 border-emerald-200 text-slate-600"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 hover:text-blue-500" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className={`font-bold ${task.completed ? "line-through text-slate-400" : "text-slate-900"}`}>
                        {task.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {task.duration}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                          {task.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
