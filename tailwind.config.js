/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Theme-aware colors: each resolves through a CSS variable (RGB channels),
      // so the same utility classes (bg-neutral-900, text-red-600, …) switch
      // between the Royal and Night token sets defined in index.css — and opacity
      // modifiers like bg-neutral-900/90 still work via <alpha-value>.
      colors: {
        red: {
          400: 'rgb(var(--c-red-400) / <alpha-value>)',
          500: 'rgb(var(--c-red-500) / <alpha-value>)',
          600: 'rgb(var(--c-red-600) / <alpha-value>)',
          700: 'rgb(var(--c-red-700) / <alpha-value>)',
          900: 'rgb(var(--c-red-900) / <alpha-value>)',
        },
        neutral: {
          100: 'rgb(var(--c-neutral-100) / <alpha-value>)',
          200: 'rgb(var(--c-neutral-200) / <alpha-value>)',
          300: 'rgb(var(--c-neutral-300) / <alpha-value>)',
          400: 'rgb(var(--c-neutral-400) / <alpha-value>)',
          500: 'rgb(var(--c-neutral-500) / <alpha-value>)',
          600: 'rgb(var(--c-neutral-600) / <alpha-value>)',
          700: 'rgb(var(--c-neutral-700) / <alpha-value>)',
          800: 'rgb(var(--c-neutral-800) / <alpha-value>)',
          900: 'rgb(var(--c-neutral-900) / <alpha-value>)',
          950: 'rgb(var(--c-neutral-950) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Saira Condensed', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
