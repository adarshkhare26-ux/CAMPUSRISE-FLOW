import { Navbar } from "@/components/Navbar";
import { StudentSidebar } from "@/components/StudentSidebar";
import { StudentSectionNav } from "@/components/StudentSectionNav";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 text-slate-900">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row">
        <StudentSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <StudentSectionNav />
          {children}
        </main>
      </div>
    </div>
  );
}
