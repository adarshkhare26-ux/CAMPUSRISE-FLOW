export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full mb-4">
        Phase 1 Initialized
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Campus<span className="text-blue-600">2</span>Corp
      </h1>
      <p className="mt-3 text-lg text-slate-600 max-w-xl">
        AI-Powered Placement ERP, Corporate Readiness &amp; Recruitment Platform.
      </p>
    </main>
  );
}
