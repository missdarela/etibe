/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ajo-green': '#122919',
        'ajo-gold': '#96601e',
        'ajo-beige': '#F5F1E8',
        'ajo-cream': '#EDE8DC',
      },
    },
  },
  plugins: [],
}
