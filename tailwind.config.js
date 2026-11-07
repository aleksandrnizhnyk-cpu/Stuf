/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        staffBg: '#070709',
        staffDark: '#0b0b0e',
        staffCard: '#121118',
        neonPurple: '#9333ea',
        neonBlue: '#3b82f6',
      }
    },
  },
  plugins: [],
}
