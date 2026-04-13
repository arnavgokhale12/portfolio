import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            table: {
              width: "100%",
              borderCollapse: "collapse",
            },
            "thead th": {
              borderBottom: "2px solid",
              borderColor: "var(--tw-prose-th-borders)",
              padding: "0.75rem",
              textAlign: "left",
            },
            "tbody td": {
              borderBottom: "1px solid",
              borderColor: "var(--tw-prose-td-borders)",
              padding: "0.75rem",
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-th-borders": "#374151",
            "--tw-prose-td-borders": "#1f2937",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
