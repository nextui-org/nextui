const {nextui} = require("@nextui-org/theme/plugin");

// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./.storybook/welcome.stories.mdx",
    "../components/*/src/**/*.{js,jsx,ts,tsx}",
    "../components/*/stories/**/*.{js,jsx,ts,tsx}",
    "../core/theme/src/components/**/*.{js,jsx,ts,tsx}",
    "../core/theme/src/utils/**/*.{js,jsx,ts,tsx}",
    "../core/theme/stories/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        // "dark": {
        //   extend: "dark", // <- inherit default values from dark theme
        //   colors: {
        //     background: "#0D001A",
        //     foreground: "#ffffff",
        //     content1: "#3B096C",
        //     content2: "#520F83",
        //     content3: "#7318A2",
        //     content4: "#9823C2",
        //     default: {
        //       50: "#3B096C",
        //       100: "#521d86",
        //       200: "#6423a6",
        //       300: "#7524cc",
        //       400: "#8935e8",
        //       500: "#9f57f5",
        //       600: "#ba86fa",
        //       700: "#d4b5fd",
        //       800: "#e7d6fe",
        //       900: "#f2e8ff",
        //       DEFAULT: "#3B096C",
        //       foreground: "#d4b5fd",
        //     },
        //     primary: {
        //       50: "#3B096C",
        //       100: "#520F83",
        //       200: "#7318A2",
        //       300: "#9823C2",
        //       400: "#c031e2",
        //       500: "#DD62ED",
        //       600: "#F182F6",
        //       700: "#FCADF9",
        //       800: "#FDD5F9",
        //       900: "#FEECFE",
        //       DEFAULT: "#DD62ED",
        //       foreground: "#ffffff",
        //     },
        //     focus: "#F182F6",
        //   },
        //   layout: {
        //     disabledOpacity: "0.3",
        //     radius: {
        //       small: "4px",
        //       medium: "6px",
        //       large: "8px",
        //     },
        //     borderWidth: {
        //       small: "1px",
        //       medium: "2px",
        //       large: "3px",
        //     },
        //   },
        // },
      },
    }),
  ],
};
