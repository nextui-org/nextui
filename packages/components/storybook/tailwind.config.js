/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../**/src/**/*.{js,jsx,ts,tsx}", "../**/stories/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@nextui-org/theme/plugin")],
};
