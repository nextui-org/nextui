import type {BrandColors, SemanticBaseColors} from "./types";

import twColors from "tailwindcss/colors.js";
import {readableColor} from "color2k";

import {swapColorValues} from "../utils/object";

import {commonColors as common} from "./common";

const base: SemanticBaseColors = {
  light: {
    background: {
      DEFAULT: "#FFFFFF",
    },
    foreground: {
      ...twColors.zinc,
      DEFAULT: "#11181C",
    },
    divider: {
      DEFAULT: "rgba(17, 17, 17, 0.15)",
    },
    boundary: {
      DEFAULT: twColors.zinc[300],
    },
    focus: {
      DEFAULT: common.blue[500],
    },
    content1: {
      DEFAULT: "#FFFFFF",
      foreground: "#11181C",
    },
    content2: {
      DEFAULT: twColors.zinc[100],
      foreground: twColors.zinc[800],
    },
    content3: {
      DEFAULT: twColors.zinc[200],
      foreground: twColors.zinc[700],
    },
    content4: {
      DEFAULT: twColors.zinc[300],
      foreground: twColors.zinc[600],
    },
  },
  dark: {
    background: {
      DEFAULT: "#000000",
    },
    foreground: {
      ...swapColorValues(twColors.zinc),
      DEFAULT: "#ECEDEE",
    },
    focus: {
      DEFAULT: common.blue[500],
    },
    divider: {
      DEFAULT: "rgba(255, 255, 255, 0.15)",
    },
    boundary: {
      DEFAULT: twColors.zinc[800],
    },
    content1: {
      DEFAULT: twColors.zinc[900],
      foreground: twColors.zinc[50],
    },
    content2: {
      DEFAULT: twColors.zinc[800],
      foreground: twColors.zinc[100],
    },
    content3: {
      DEFAULT: twColors.zinc[700],
      foreground: twColors.zinc[200],
    },
    content4: {
      DEFAULT: twColors.zinc[600],
      foreground: twColors.zinc[300],
    },
  },
};

export const brandColorsLight: BrandColors = {
  ...base.light,
  default: {
    ...twColors.zinc,
    foreground: readableColor(twColors.zinc[300]),
    DEFAULT: twColors.zinc[300],
  },
  primary: {
    ...common.blue,
    foreground: readableColor(common.blue[500]),
    DEFAULT: common.blue[500],
  },
  secondary: {
    ...common.purple,
    foreground: readableColor(common.purple[500]),
    DEFAULT: common.purple[500],
  },
  success: {
    ...common.green,
    foreground: common.green[900],
    DEFAULT: common.green[500],
  },
  warning: {
    ...common.yellow,
    foreground: common.yellow[900],
    DEFAULT: common.yellow[500],
  },
  danger: {
    ...common.red,
    foreground: common.white,
    DEFAULT: common.red[500],
  },
};

export const brandColorsDark: BrandColors = {
  ...base.dark,
  default: {
    ...swapColorValues(twColors.zinc),
    foreground: readableColor(twColors.zinc[700]),
    DEFAULT: twColors.zinc[700],
  },
  primary: {
    ...swapColorValues(common.blue),
    foreground: readableColor(common.blue[500]),
    DEFAULT: common.blue[500],
  },
  secondary: {
    ...swapColorValues(common.purple),
    foreground: readableColor(common.purple[400]),
    DEFAULT: common.purple[400],
  },
  success: {
    ...swapColorValues(common.green),
    foreground: readableColor(common.green[500]),
    DEFAULT: common.green[500],
  },
  warning: {
    ...swapColorValues(common.yellow),
    foreground: readableColor(common.yellow[500]),
    DEFAULT: common.yellow[500],
  },
  danger: {
    ...swapColorValues(common.red),
    foreground: common.white,
    DEFAULT: common.red[500],
  },
};

export const semanticColors = {
  light: brandColorsLight,
  dark: brandColorsDark,
};
