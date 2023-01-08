/** @type {import('tailwindcss').Config} */
const plugin = require("@nextui-org/theme/plugin")

module.exports = {
  content: ["../**/src/**/*.{js,jsx,ts,tsx}"],
  // Toggle dark-mode based on data-mode="dark"
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [plugin],
};
