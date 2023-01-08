const plugin = require("tailwindcss/plugin");

const colors = require("./colors.js");

module.exports = plugin(
  function ({addUtilities}) {
    addUtilities({
      /**
       * Custom utilities
       */
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
      ".transition-background": {
        "transition-property": "background",
        "transition-timing-function": "ease",
        "transition-duration": "250ms",
      },
      /**
       * Tailwind utilities
       */
      ".transition-all": {
        "transition-property": "all",
        "transition-timing-function": "ease",
        "transition-duration": "250ms",
      },
      ".transition": {
        "transition-property":
          "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
        "transition-timing-function": "ease",
        "transition-duration": "250ms",
      },
      ".transition-colors": {
        "transition-property":
          "color, background-color, border-color, text-decoration-color, fill, stroke",
        "transition-timing-function": "ease",
        "transition-duration": "250ms",
      },
      ".transition-opacity": {
        "transition-property": "opacity",
        "transition-timing-function": "ease",
        "transition-duration": "250ms",
      },

      ".transition-shadow": {
        "transition-property": "box-shadow",
        "transition-timing-function": "ease",
        "transition-duration": "250ms",
      },

      ".transition-transform": {
        "transition-property": "transform",
        "transition-timing-function": "ease",
        "transition-duration": "250ms",
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
            light: colors.blue[200],
            DEFAULT: colors.blue[500],
            dark: colors.blue[500],
          },
          secondary: {
            light: colors.purple[200],
            DEFAULT: colors.purple[500],
            dark: colors.purple[400],
          },
          success: {
            light: colors.green[200],
            DEFAULT: colors.green[500],
            dark: colors.green[500],
          },
          warning: {
            light: colors.yellow[400],
            DEFAULT: colors.yellow[500],
            dark: colors.yellow[700],
          },
          error: {
            light: colors.red[200],
            DEFAULT: colors.red[500],
            dark: colors.red[500],
          },
          text: {
            light: "#11181C",
            DEFAULT: "#11181C",
            dark: "#ECEDEE",
          },
          red: {
            ...colors.red,
            DEFAULT: colors.red[500],
          },
          yellow: {
            ...colors.yellow,
            DEFAULT: colors.yellow[500],
          },
          green: {
            ...colors.green,
            DEFAULT: colors.green[500],
          },
          blue: {
            ...colors.blue,
            DEFAULT: colors.blue[500],
          },
          purple: {
            ...colors.purple,
            DEFAULT: colors.purple[500],
          },
          pink: {
            ...colors.pink,
            DEFAULT: colors.pink[500],
          },
        },
      },
    },
  },
);
