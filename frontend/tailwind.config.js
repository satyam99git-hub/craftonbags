/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        // Defines marquee speed (adjust duration '25s' to make it faster or slower)
        'marquee-infinite': 'marquee-infinite 25s linear infinite',
      },
      keyframes: {
        'marquee-infinite': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // Safely loops halfway over the duplicated list
        },
      },
    },
  },
  plugins: [],
}