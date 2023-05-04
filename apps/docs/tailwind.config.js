const {nextui} = require("@nextui-org/theme/plugin");
const {commonColors} = require("@nextui-org/theme/colors");

// get tailwindcss default config
const defaultConfig = require("tailwindcss/defaultConfig");
const twColors = require("tailwindcss/colors.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/core/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "code-foreground": "#F4F4F4",
        "code-syntax1": "#61AFEF",
        "code-syntax2": "#98C379",
        "code-syntax3": "#c678dd",
        "code-syntax4": commonColors.yellow[600],
        "code-syntax5": "#E06C75",
        "code-syntax6": commonColors.yellow[600],
        "code-removed": commonColors.red[300],
        "code-added": commonColors.green[300],
        "code-line-number": twColors.zinc[300],
        "code-faded-line": twColors.zinc[500],
        "code-comment": twColors.zinc[500],
        "code-highlighted-word1-bg": commonColors.purple[500],
        "code-highlighted-word1-bg-active": commonColors.purple[600],
        "code-highlighted-word1-text": commonColors.purple[800],
        "code-highlighted-word2-bg": commonColors.red[100],
        "code-highlighted-word2-bg-active": commonColors.red[500],
        "code-highlighted-word2-text": commonColors.red[200],
        "code-highlighted-word3-bg": commonColors.green[300],
        "code-highlighted-word3-bg-active": commonColors.green[300],
        "code-highlighted-word3-text": commonColors.green[100],
      },
      boxShadow: {
        highlighted: `${commonColors.purple[500]} 1px 0 0, ${commonColors.purple[500]} -1px 0 0`,
      },
      fontFamily: {
        sans: ["Inter", ...defaultConfig.theme.fontFamily.sans],
        serif: defaultConfig.theme.fontFamily.serif,
        mono: defaultConfig.theme.fontFamily.mono,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      heartbeat: {
        "0%": {transform: "scale(1)"},
        "50%": {transform: "scale(1.2)"},
        "100%": {transform: "scale(1)"},
      },
      levitate: {
        "0%": {
          transform: "translateY(0)",
        },
        "30%": {
          transform: "translateY(-10px)",
        },
        "50%": {
          transform: "translateY(4px)",
        },
        "70%": {
          transform: "translateY(-15px)",
        },
        "100%": {
          transform: "translateY(0)",
        },
      },
      expand: {
        "0%": {transform: "scale(1)"},
        "50%": {transform: "scale(1.2)"},
        "100%": {transform: "scale(1)"},
      },
      "expand-opacity": {
        "0%": {
          opacity: 0,
          transform: "scale(1)",
        },
        "50%": {
          opacity: 1,
          transform: "scale(1.3)",
        },
        "100%": {
          opacity: 0,
          transform: "scale(1.295)",
        },
      },
    },
    animation: {
      heartbeat: "heartbeat 1s ease-in-out infinite",
      levitate: "levitate 5s ease infinite",
      "expand": "expand 6s ease-out infinite",
      "expand-opacity": "expand-opacity 6s linear infinite",
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          "code-background": "#363449",
        },
        dark: {
          "code-background": "#111111",
        },
      },
    }),
  ],
};
