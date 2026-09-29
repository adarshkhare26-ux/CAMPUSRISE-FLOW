import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CampusRise | AI-Powered Placement ERP & Readiness Platform",
  description: "Unified AI-powered placement ERP, readiness score engine, and recruitment platform connecting TPOs, Students, Companies, and Alumni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans antialiased min-h-screen bg-slate-50/50">
        {children}
      </body>
    </html>
  );
}
