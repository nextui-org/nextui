import {commonColors} from "./common";
import {semanticColors} from "./semantic";

export * from "./types";

const colors = {
  ...commonColors,
  ...semanticColors,
};

export {colors, commonColors, semanticColors};
