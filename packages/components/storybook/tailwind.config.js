/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["../**/src/**/*.{js,jsx,ts,tsx}"],
  // Toggle dark-mode based on data-mode="dark"
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [require("@nextui-org/theme/plugin")],
};
