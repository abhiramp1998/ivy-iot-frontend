/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // CRITICAL: Scan all files in the src/ directory
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}