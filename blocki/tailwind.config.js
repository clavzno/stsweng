/** @type {import('tailwindcss').Config} */
module.eports = {
  darkMode: 'class', //
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./app/**/*.{js,jsx,ts,tsx}"
  ], //
  theme: {
    extend: {
      colors: {
        'primary': '#526DF4', // Consolidated and corrected primary color
        'green': '#4BD148', //
        'off-white': '#FFFAF7', //
        'red': '#FF5757', //
        'yellow': '#FEBD59', //
        'dark-blue': '#287BA0', //
        'orange': '#F38735', //
        'dark-bg': '#0D122C', //
        'text': '#0d122b', //
        'background': '#f7f7f7', //
        'secondary': '#f38735', //
        'accent': '#4ad147', //
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'], //
        roboto: ['Roboto', 'sans-serif'], //
        telegraf: ['Telegraf', 'sans-serif'], //
      },
    },
  },
  plugins: [],
};