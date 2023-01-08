const plugin = require("tailwindcss/plugin");

const colors = require("./colors.js");

module.exports = plugin(
  function ({addUtilities}) {
    addUtilities({
      ".leading-inherit": {
        "line-height": "inherit",
      },
      ".bg-img-inherit": {
        "background-image": "inherit",
      },
      ".bg-clip-inherit": {
        "background-clip": "inherit",
      },
      ".text-fill-inherit": {
        "-webkit-text-fill-color": "inherit",
      },
    });
  },
  {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          transparent: "transparent",
          white: "#ffffff",
          black: "#000000",
          neutral: {
            light: "#889096",
            DEFAULT: "#889096",
            dark: "#697177",
          },
          primary: {
            light: colors.blue[400],
            DEFAULT: colors.blue[600],
            dark: colors.blue[700],
          },
          secondary: {
            light: colors.purple[400],
            DEFAULT: colors.purple[600],
            dark: colors.purple[700],
          },
          success: {
            light: colors.green[400],
            DEFAULT: colors.green[600],
            dark: colors.green[700],
          },
          warning: {
            light: colors.yellow[400],
            DEFAULT: colors.yellow[600],
            dark: colors.yellow[700],
          },
          error: {
            light: colors.red[400],
            DEFAULT: colors.red[600],
            dark: colors.red[700],
          },
          text: {
            light: "#11181C",
            DEFAULT: "#11181C",
            dark: "#ECEDEE",
          },
          red: {
            ...colors.red,
            DEFAULT: "#F31260",
          },
          yellow: {
            ...colors.yellow,
            DEFAULT: "#F5A524",
          },
          green: {
            ...colors.green,
            DEFAULT: "#17C964",
          },
          blue: {
            ...colors.blue,
            DEFAULT: "#0072F5",
          },
          purple: {
            ...colors.purple,
            DEFAULT: "#7828C8",
          },
          pink: {
            ...colors.pink,
            DEFAULT: "#FF4ECD",
          },
        },
      },
    },
  },
);
