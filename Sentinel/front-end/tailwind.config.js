/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Backgrounds ---
        "bg-primary": "#0a0a0c",
        "bg-secondary": "#121216",
        "surface": "#1a1a22",
        "surface-hover": "#242430",
        "surface-active": "#2e2e3e",

        // --- Accent (Sentinel Purple) ---
        "accent": "#7c3aed",
        "accent-muted": "#4c1d95",
        "accent-hover": "#8b5cf6",
        "accent-glow": "rgba(124, 58, 237, 0.15)",

        // --- Textos ---
        "text-primary": "#f3f4f6",
        "text-secondary": "#9ca3af",
        "text-muted": "#6b7280",

        // --- Bordas ---
        "border-subtle": "#262632",
        "border-active": "#7c3aed",

        // --- Semânticas ---
        "success": "#10b981",
        "warning": "#f59e0b",
        "error": "#ef4444",
        "info": "#3b82f6",
      },
    },
  },
  plugins: [],
}