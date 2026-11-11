import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080D18",
        "background-secondary": "#05070D",
        surface: "#0A1421",
        "surface-container": "#17202E",
        "surface-container-low": "#131C2A",
        "surface-container-lowest": "#060E1C",
        "surface-container-high": "#212A39",
        "surface-container-highest": "#2C3544",
        "surface-elevated": "#172337",
        primary: "#3478F6",
        "primary-container": "#568CFF",
        "primary-fixed": "#D9E2FF",
        "on-primary": "#001945",
        secondary: "#A1E7FF",
        "secondary-container": "#00D5FF",
        "secondary-fixed": "#B3EBFF",
        "on-surface": "#F5F7FA",
        "on-surface-variant": "#929BAD",
        outline: "#8C90A0",
        "outline-variant": "#424654",
        error: "#FFB4AB",
        "error-container": "#93000A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
        headline: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        "cyan-glow": "0 0 20px -2px rgba(0, 213, 255, 0.35)",
        "blue-glow": "0 0 24px rgba(52, 120, 246, 0.4)",
        "hud-card": "0 8px 32px -4px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
