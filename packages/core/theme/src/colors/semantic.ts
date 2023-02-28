import type {SemanticColors, SemanticBaseColors} from "./types";

import twColors from "tailwindcss/colors";
import {readableColor} from "color2k";

import {swapColorValues} from "../utils/object";

import {commonColors as common} from "./common";

const base: SemanticBaseColors = {
  light: {
    background: {
      DEFAULT: "#ffffff",
    },
    foreground: {
      DEFAULT: "#11181C",
    },
    border: {
      DEFAULT: "#00000026",
    },
  },
  dark: {
    background: {
      DEFAULT: "#000000",
    },
    foreground: {
      DEFAULT: "#ECEDEE",
    },
    border: {
      DEFAULT: "#ffffff26",
    },
  },
};

export const semanticColorsLight: SemanticColors = {
  ...base.light,
  neutral: {
    ...twColors.zinc,
    contrastText: readableColor(twColors.zinc[300]),
    DEFAULT: twColors.zinc[300],
  },
  primary: {
    ...common.blue,
    contrastText: common.white,
    DEFAULT: common.blue[500],
  },
  secondary: {
    ...common.purple,
    contrastText: common.white,
    DEFAULT: common.purple[500],
  },
  success: {
    ...common.green,
    contrastText: common.white,
    DEFAULT: common.green[500],
  },
  warning: {
    ...common.yellow,
    contrastText: common.white,
    DEFAULT: common.yellow[500],
  },
  danger: {
    ...common.red,
    contrastText: common.white,
    DEFAULT: common.red[500],
  },
};

export const semanticColorsDark: SemanticColors = {
  ...base.dark,
  neutral: {
    ...swapColorValues(twColors.zinc),
    contrastText: readableColor(twColors.zinc[700]),
    DEFAULT: twColors.zinc[700],
  },
  primary: {
    ...swapColorValues(common.blue),
    DEFAULT: common.blue[500],
    contrastText: common.white,
  },
  secondary: {
    ...swapColorValues(common.purple),
    contrastText: common.white,
    DEFAULT: common.purple[400],
  },
  success: {
    ...swapColorValues(common.green),
    contrastText: readableColor(common.green[500]),
    DEFAULT: common.green[500],
  },
  warning: {
    ...swapColorValues(common.yellow),
    contrastText: readableColor(common.yellow[500]),
    DEFAULT: common.yellow[500],
  },
  danger: {
    ...swapColorValues(common.red),
    contrastText: common.white,
    DEFAULT: common.red[500],
  },
};

export const semanticColors = {
  light: semanticColorsLight,
  dark: semanticColorsDark,
};
