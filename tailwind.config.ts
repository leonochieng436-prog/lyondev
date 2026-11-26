import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      navy: "rgb(var(--color-navy-rgb) / <alpha-value>)",
      ink: "rgb(var(--color-ink-rgb) / <alpha-value>)",
      card: "rgb(var(--color-card-rgb) / <alpha-value>)",
      brand: "rgb(var(--color-brand-rgb) / <alpha-value>)",
      cyan: "rgb(var(--color-cyan-rgb) / <alpha-value>)",
      overlay: "rgb(var(--color-overlay-rgb) / <alpha-value>)",
      body: "#BDBDBD",
      muted: "var(--color-muted)",
    },
    fontFamily: {
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      head: ["var(--font-head)", "var(--font-sans)", "sans-serif"],
    },
  } },
} satisfies Config;
