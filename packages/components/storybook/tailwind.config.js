const {theme} = require("@nextui-org/theme/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../**/src/**/*.{js,jsx,ts,tsx}", "../**/stories/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  plugins: [theme()],
}
