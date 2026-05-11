import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#070A12",
        ink: "#0B1020",
        glass: "rgba(15, 23, 42, 0.72)",
        cyanGlow: "#22D3EE",
        violetGlow: "#A78BFA",
        limeGlow: "#A3E635",
      },
      boxShadow: {
        neon: "0 0 40px rgba(34, 211, 238, 0.18)",
        violet: "0 0 50px rgba(167, 139, 250, 0.18)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
