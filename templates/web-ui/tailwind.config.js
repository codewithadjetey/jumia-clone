/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jumia-orange': '#F68B1E',
        'jumia-orange-dark': '#E67A0D',
        'jumia-dark': '#1A1A1A',
        'jumia-gray': '#666666',
        'jumia-light-gray': '#F5F5F5',
        'jumia-green': '#00A859',
        'jumia-red': '#E53E3E',
      }
    },
  },
  plugins: [],
}
