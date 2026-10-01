"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  ChevronDown, 
  Loader2, 
  User, 
  RefreshCw,
  Lightbulb,
  ArrowRight
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  provider?: string;
}

const QUICK_PROMPTS = [
  "Why is my readiness score low?",
  "How can I improve my DSA?",
  "Give me a 4-week roadmap for my role",
  "How to prepare for TCS & Cisco interview?",
  "Review my resume ATS score",
];

export function AiAssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `### Welcome to **CampusRise AI Placement Copilot**! 👋\n\nI am your personalized AI Career & Employability Advisor. I have context of your verified academic standing, your chosen target role, your current skill gaps, and active campus drives.\n\nHow can I help accelerate your placement journey today?`,
      timestamp: "Just now",
      provider: "CampusRise AI Engine",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (userPrompt?: string) => {
    const textToSend = (userPrompt || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.success && data.reply) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          provider: data.provider || "CampusRise Copilot",
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "I encountered a temporary connection issue. Please try your question again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Error reaching the AI service. Please verify your connection.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-blue-500/30 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group border border-white/20"
          aria-label="Open AI Placement Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
          </div>
          <span className="text-xs font-black tracking-wide hidden sm:inline">
            CampusRise AI Copilot
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-bold hidden md:inline">
            Live
          </span>
        </button>
      )}

      {/* Slide-in Chat Drawer / Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-4 flex items-center justify-between border-b border-slate-700/60 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black text-white">CampusRise AI Copilot</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-slate-300 font-medium">Grounded in verified student data</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              title="Close Copilot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-xs shadow-md shadow-blue-600/10"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans text-xs">
                    {msg.content}
                  </div>

                  <div
                    className={`mt-1.5 flex items-center justify-between text-[9px] font-semibold ${
                      msg.role === "user" ? "text-blue-200" : "text-slate-400"
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {msg.provider && <span className="opacity-80 font-mono text-[8px]">{msg.provider}</span>}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    PS
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200/80 w-fit">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="font-semibold">CampusRise AI is analyzing student context...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-1" />
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 px-2.5 py-1 rounded-full border border-slate-200 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything (e.g. How to pass Cisco interview?)..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-slate-50/50 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all disabled:opacity-40 shrink-0 shadow-md shadow-blue-500/20"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
