import type * as Stitches from "@stitches/react";

import {createStitches} from "@stitches/react";
import {deepMerge} from "@nextui-org/shared-utils";

import commonTheme from "./common";
import lightTheme from "./light-theme";
import darkTheme from "./dark-theme";
import {Theme, BaseTheme} from "./types";

export const getStitchesTheme = (targetTheme: BaseTheme): BaseTheme => {
  return deepMerge(targetTheme, commonTheme.theme);
};

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  config,
  createTheme: createThemeBase,
} = createStitches({
  ...commonTheme,
  theme: {
    ...commonTheme.theme,
    shadows: {
      ...lightTheme.shadows,
    },
    dropShadows: {
      ...lightTheme.dropShadows,
    },
    colors: {
      ...commonTheme.theme.colors,
      ...lightTheme.colors,
    },
  },
});

export const createTheme = ({type, theme = {}, className}: Theme) => {
  if (!type) {
    throw new Error("Theme type is required");
  }

  return createThemeBase(
    className || `${type}-theme`,
    deepMerge(type === "dark" ? darkTheme : lightTheme, theme),
  );
};

// stitches types
export type StitchesConfig = typeof config;
export type VariantProps<T> = Stitches.VariantProps<T>;
export type PropertyValue<T extends keyof Stitches.CSSProperties> = Stitches.PropertyValue<T>;
export type ScaleValue<T> = Stitches.ScaleValue<T>;
export type CSSProperties = Stitches.CSSProperties;
export type CSS = Stitches.CSS<StitchesConfig>;
export type StitchesTheme = typeof theme;
