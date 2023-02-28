import type {Config as TWConfig} from "tailwindcss/types/config";

import get from "lodash.get";
import deepMerge from "deepmerge";
import resolveConfig from "tailwindcss/resolveConfig";

import {commonColors} from "./colors";
// import {theme} from "./plugin";

export type NextUIDefaultColors = {
  background: string;
  foreground: string;
  border: string;
  neutral: string;
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
};

export type ColorValue =
  | NextUIDefaultColors
  | Record<string, string>
  | Record<string, Record<number, string>>;

export type Colors = {
  common?: ColorValue;
  light?: ColorValue;
  dark?: ColorValue;
};

export type ExtendedThemeConfig = TWConfig["theme"] & {
  extend?: Omit<TWConfig["theme"], "extend"> & {
    colors?: Colors;
  };
};

export interface Config extends TWConfig {
  theme?: ExtendedThemeConfig;
}

export type WithNextUI = {
  <C extends Config>(nextuiConfig: Config): C;
};

export const withNextUI = (tailwindConfig: Config) => {
  let config = resolveConfig(tailwindConfig);

  const userColors = get(config.theme, "colors", {});
  // const userLightColors = get(userColors, "light", {});
  // const userDarkColors = get(userColors, "dark", {});

  if (userColors && config.theme?.colors) {
    config.theme.colors = deepMerge(userColors, commonColors);
  }

  // config.plugins = [
  //   theme({
  //     light: {
  //       primary: "#0072f5",
  //       secondary: "darkblue",
  //       brand: "#F3F3F3",
  //     },
  //     dark: {
  //       primary: "#17c964",
  //       secondary: "tomato",
  //       brand: "#4A4A4A",
  //     },
  //   }),
  // theme({
  //   light: deepMerge(semanticColors.light, userLightColors),
  //   dark: deepMerge(semanticColors.dark, userDarkColors),
  // }),
  // ];

  // console.log(config);

  return config;
};
