import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF",
          hover: "#1D4ED8",
          light: "#E0F2FE",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
          hover: "#059669",
          tint: "#ECFDF5",
        },
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#FFFFFF",
          soft: "#FEF3C7",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
        },
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
        pill: "24px",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        card: "0px 8px 24px rgba(37, 99, 235, 0.06)",
        elevated: "0px 14px 34px rgba(37, 99, 235, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
