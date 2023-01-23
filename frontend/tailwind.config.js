/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {
      colors: {
        'hslblue': '#007ac9',
        'hslpurple': '#7a4090',
        'hslgreen': '#3f9560',
    },
  },
  plugins: [],
}
}
