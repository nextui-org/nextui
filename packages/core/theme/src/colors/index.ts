import {commonColors} from "./common";
import {semanticColorsLight, semanticColorsDark} from "./semantic";

export * from "./types";

const colors = {
  ...commonColors,
  light: {
    ...semanticColorsLight,
  },
  dark: {
    ...semanticColorsDark,
  },
};

export {colors, commonColors, semanticColorsLight, semanticColorsDark};
