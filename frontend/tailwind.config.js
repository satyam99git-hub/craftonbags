/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'marquee-infinite': 'marquee-infinite 25s linear infinite',
        // Smooth editorial page load entry animation class
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.215, 0.610, 0.355, 1) forwards',
      },
      keyframes: {
        'marquee-infinite': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [],
}