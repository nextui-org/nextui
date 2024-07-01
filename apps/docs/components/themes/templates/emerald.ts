import {initialDarkTheme, initialLayout, initialLightTheme} from "../constants";
import {Config} from "../types";

export const emerald: Config = {
  light: {
    brandColor: {
      default: "#66cc8a",
      primary: "#66cc8a",
      secondary: "#377cfb",
      success: "#00a96e",
      warning: "#ffbe00",
      danger: "#ff5861",
    },
    baseColor: {...initialLightTheme.baseColor, background: "#f6fffa"},
    otherColor: {...initialLightTheme.otherColor, focus: "#66cc8a"},
  },
  dark: {
    brandColor: {
      default: "#485248",
      primary: "#66cc8a",
      secondary: "#377cfb",
      success: "#00a96e",
      warning: "#ffbe00",
      danger: "#ff5861",
    },
    baseColor: {...initialDarkTheme.baseColor, background: "#010b06"},
    otherColor: {...initialDarkTheme.otherColor, focus: "#66cc8a"},
  },
  layout: initialLayout,
};
