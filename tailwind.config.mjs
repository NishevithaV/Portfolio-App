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
        bg: "var(--bg)",
        surface: "var(--surface)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        muted: "var(--muted)",
        "muted-soft": "var(--muted-soft)",
        ink: "var(--ink)",
        accent: "var(--accent)",
        // Fixed values, for the rare case a colour must not follow the
        // surrounding `.invert-section` token overrides.
        "bg-invert": "#0a0a0a",
        "ink-invert": "#f5f5f5",
      },
      fontFamily: {
        display: ["var(--font-big-shoulders)", "ui-sans-serif", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "Cambria", "serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;