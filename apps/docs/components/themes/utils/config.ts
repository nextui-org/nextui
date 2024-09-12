import {NextUIPluginConfig} from "@nextui-org/theme";
import {readableColor} from "color2k";

import {Config, ConfigColors, ThemeType} from "../types";

import {generateThemeColor} from "./colors";
import {copyData, stringifyData} from "./shared";
function generateLayoutConfig(config: Config): NextUIPluginConfig["layout"] {
  return {
    fontSize: {
      tiny: `${config.layout.fontSize.tiny}rem`,
      small: `${config.layout.fontSize.small}rem`,
      medium: `${config.layout.fontSize.medium}rem`,
      large: `${config.layout.fontSize.large}rem`,
    },
    lineHeight: {
      tiny: `${config.layout.lineHeight.tiny}rem`,
      small: `${config.layout.lineHeight.small}rem`,
      medium: `${config.layout.lineHeight.medium}rem`,
      large: `${config.layout.lineHeight.large}rem`,
    },
    radius: {
      small: `${config.layout.radius.small}rem`,
      medium: `${config.layout.radius.medium}rem`,
      large: `${config.layout.radius.large}rem`,
    },
    borderWidth: {
      small: `${config.layout.borderWidth.small}px`,
      medium: `${config.layout.borderWidth.medium}px`,
      large: `${config.layout.borderWidth.large}px`,
    },
    disabledOpacity: config.layout.otherParams.disabledOpacity,
    dividerWeight: config.layout.otherParams.dividerWeight,
    hoverOpacity: config.layout.otherParams.hoverOpacity,
  };
}

function generateThemeColorsConfig(config: Config, theme: ThemeType) {
  return {
    default: generateThemeColor(config[theme].brandColor.default, "default", "light"),
    primary: generateThemeColor(config[theme].brandColor.primary, "primary", "light"),
    secondary: generateThemeColor(config[theme].brandColor.secondary, "secondary", "light"),
    success: generateThemeColor(config[theme].brandColor.success, "success", "light"),
    warning: generateThemeColor(config[theme].brandColor.warning, "warning", "light"),
    danger: generateThemeColor(config[theme].brandColor.danger, "danger", "light"),
    background: config[theme].baseColor.background,
    foreground: generateThemeColor(config[theme].baseColor.foreground, "foreground", "light"),
    content1: {
      DEFAULT: config[theme].baseColor.content1,
      foreground: readableColor(config[theme].baseColor.content1),
    },
    content2: {
      DEFAULT: config[theme].baseColor.content2,
      foreground: readableColor(config[theme].baseColor.content2),
    },
    content3: {
      DEFAULT: config[theme].baseColor.content3,
      foreground: readableColor(config[theme].baseColor.content3),
    },
    content4: {
      DEFAULT: config[theme].baseColor.content4,
      foreground: readableColor(config[theme].baseColor.content4),
    },
    focus: config[theme].otherColor.focus,
    overlay: config[theme].otherColor.overlay,
    divider: config[theme].otherColor.divider,
  };
}

/**
 * Generate plugin configuration
 */
export function generatePluginConfig(config: Config): NextUIPluginConfig {
  return {
    themes: {
      light: {
        colors: generateThemeColorsConfig(config, "light"),
      },
      dark: {
        colors: generateThemeColorsConfig(config, "dark"),
      },
    },
    layout: generateLayoutConfig(config),
  };
}

export function copyBrandColorConfig(
  config: Config,
  colorType: keyof ConfigColors["brandColor"],
  theme: ThemeType,
) {
  copyData(
    `"${colorType}": ${stringifyData(
      generateThemeColor(config[theme].brandColor[colorType], colorType, theme),
    )}`,
  );
}

export function copyBaseColorConfig(
  config: Config,
  colorType: keyof ConfigColors["baseColor"],
  theme: ThemeType,
) {
  switch (colorType) {
    case "background":
      copyData(`"${colorType}": "${config[theme].baseColor[colorType]}"`);
      break;
    case "foreground":
      copyData(
        `"${colorType}": ${stringifyData(
          generateThemeColor(config[theme].baseColor[colorType], colorType, theme),
        )}`,
      );
      break;
    case "content1":
    case "content2":
    case "content3":
    case "content4":
      copyData(
        `"${colorType}": {
            "DEFAULT": "${config[theme].baseColor[colorType]}",
            "foreground": "${readableColor(config[theme].baseColor[colorType])}",
        },`,
      );
      break;
  }
}

export function copyOtherColorConfig(
  config: Config,
  colorType: keyof ConfigColors["otherColor"],
  theme: ThemeType,
) {
  copyData(`"${colorType}": "${config[theme].otherColor[colorType]}"`);
}
