/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#526DF3',
        green: '#4BD148',
        'off-white': '#FFFAF7',
        red: '#FF5757',
        yellow: '#FEBD59',
        'dark-blue': '#287BA0',
        orange: '#F38735',
        'dark-bg': '#0D122C',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        telegraf: ['Telegraf', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

