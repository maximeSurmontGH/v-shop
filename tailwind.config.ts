import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "v-blue": "#0E131F",
        "v-clear-purple": "#f915e4",
        "v-clear-blue": "#20c4fc",
      },
      boxShadow: {
        "sm-l": "-2px 2px 0px 1px rgb(0 0 0 / 0.1)",
        "sm-l-hover": "-1px 1px 0px 1px rgb(0 0 0 / 0.1)",
        "md-l": "-4px 4px 0px 1px rgb(0 0 0 / 0.1)",
        "md-l-hover": "-3px 3px 0px 1px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
