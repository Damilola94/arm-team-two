import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14122B",       // deep navy-ink, primary text/bg
        plum: "#241F45",      // secondary panel navy
        magenta: "#A3195B",   // ARM brand magenta
        ember: "#E8A33D",     // streak / gamification gold
        sage: "#3F7D5C",      // growth / success green
        cream: "#F7F4EE",     // warm background
        sand: "#EAE3D4",      // card / divider tone
        mute: "#8B87A6",      // muted lavender-grey text
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,18,43,0.06), 0 8px 24px -12px rgba(20,18,43,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
