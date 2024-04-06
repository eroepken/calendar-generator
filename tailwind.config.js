/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    { pattern: /^col-start-/ },
    { pattern: /^row-start-/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}