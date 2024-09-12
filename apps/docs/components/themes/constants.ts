import {colors} from "@nextui-org/theme";

import {ConfigColors, Config, ConfigLayout} from "./types";

// Colors
export const defaultDarkColorWeight = 20;
export const defaultLightColorWeight = 17.5;
export const colorWeight = 17.5;

// Regex
export const floatNumberPattern = /^\d+(\.\d*)?$/;

// Elements ids
export const colorsId = "th-colors";
export const baseColorsId = "th-base-colors";
export const otherColorsId = "th-other-colors";
export const showcaseId = "th-showcase";
export const contentShowcaseId = "th-content-showcase";

// Local storage
export const configKey = "config";
export const syncThemesKey = "sync-themes";

// Theme configuration
export const initialLightTheme: ConfigColors = {
  brandColor: {
    default: "#d4d4d8",
    primary: colors.blue[500],
    secondary: colors.purple[500],
    success: colors.green[500],
    warning: colors.yellow[500],
    danger: colors.red[500],
  },
  baseColor: {
    foreground: colors.black,
    background: colors.white,
    content1: colors.white,
    content2: colors.zinc[100],
    content3: colors.zinc[200],
    content4: colors.zinc[300],
  },
  otherColor: {
    divider: "#111111",
    focus: colors.blue[500],
    overlay: colors.black,
  },
};

export const initialDarkTheme: ConfigColors = {
  brandColor: {
    default: colors.zinc[700],
    primary: colors.blue[500],
    secondary: colors.purple[500],
    success: colors.green[500],
    warning: colors.yellow[500],
    danger: colors.red[500],
  },
  baseColor: {
    foreground: colors.white,
    background: colors.black,
    content1: colors.zinc[900],
    content2: colors.zinc[800],
    content3: colors.zinc[700],
    content4: colors.zinc[600],
  },
  otherColor: {
    divider: colors.white,
    focus: colors.blue[500],
    overlay: colors.white,
  },
};

export const initialLayout: ConfigLayout = {
  fontSize: {
    tiny: "0.75",
    small: "0.875",
    medium: "1",
    large: "1.125",
  },
  lineHeight: {
    tiny: "1",
    small: "1.25",
    medium: "1.5",
    large: "1.75",
  },
  radius: {
    small: "0.5",
    medium: "0.75",
    large: "0.875",
  },
  borderWidth: {
    small: "1",
    medium: "2",
    large: "3",
  },
  otherParams: {
    disabledOpacity: "0.5",
    dividerWeight: "1",
    hoverOpacity: "0.9",
  },
};

export const initialConfig: Config = {
  light: initialLightTheme,
  dark: initialDarkTheme,
  layout: initialLayout,
};
