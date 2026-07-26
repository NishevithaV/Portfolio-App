/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm-md': { min: '640px', max: '800px' }, 
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        term: {
          bg: "var(--term-bg)",
          surface: "var(--term-surface)",
          "surface-2": "var(--term-surface-2)",
          line: "var(--term-line)",
          "line-strong": "var(--term-line-strong)",
          muted: "var(--term-muted)",
          text: "var(--term-text)",
          accent: "var(--term-accent)",
          "accent-2": "var(--term-accent-2)",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;