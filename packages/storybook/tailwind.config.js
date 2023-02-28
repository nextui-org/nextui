const {theme} = require("@nextui-org/theme/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../components/**/src/**/*.{js,jsx,ts,tsx}",
    "../components/**/stories/**/*.{js,jsx,ts,tsx}",
    "../core/theme/stories/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  plugins: [theme()],
};
