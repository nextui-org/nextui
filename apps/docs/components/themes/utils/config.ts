import {NextUIPluginConfig} from "@nextui-org/theme";
import {readableColor} from "color2k";

import {Config} from "../types";
import {defaultDarkColorWeight} from "../constants";

import {generateThemeColor} from "./colors";

/**
 * Generate plugin configuration
 */
export function generatePluginConfig(config: Config): NextUIPluginConfig {
  const layout: NextUIPluginConfig["layout"] = {
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

  return {
    themes: {
      light: {
        colors: {
          default: generateThemeColor(
            config.light.brandColor.default,
            "light",
            defaultDarkColorWeight,
          ),
          primary: generateThemeColor(config.light.brandColor.primary, "light"),
          secondary: generateThemeColor(config.light.brandColor.secondary, "light"),
          success: generateThemeColor(config.light.brandColor.success, "light"),
          warning: generateThemeColor(config.light.brandColor.warning, "light"),
          danger: generateThemeColor(config.light.brandColor.danger, "light"),
          background: config.light.baseColor.background,
          foreground: generateThemeColor(config.light.baseColor.foreground, "light"),
          content1: {
            DEFAULT: config.light.baseColor.content1,
            foreground: readableColor(config.light.baseColor.content1),
          },
          content2: {
            DEFAULT: config.light.baseColor.content2,
            foreground: readableColor(config.light.baseColor.content2),
          },
          content3: {
            DEFAULT: config.light.baseColor.content3,
            foreground: readableColor(config.light.baseColor.content3),
          },
          content4: {
            DEFAULT: config.light.baseColor.content4,
            foreground: readableColor(config.light.baseColor.content4),
          },
          focus: config.light.otherColor.focus,
          overlay: config.light.otherColor.overlay,
          divider: config.light.otherColor.divider,
        },
      },
      dark: {
        colors: {
          default: generateThemeColor(config.dark.brandColor.default, "dark"),
          primary: generateThemeColor(config.dark.brandColor.primary, "dark"),
          secondary: generateThemeColor(config.dark.brandColor.secondary, "dark"),
          success: generateThemeColor(config.dark.brandColor.success, "dark"),
          warning: generateThemeColor(config.dark.brandColor.warning, "dark"),
          danger: generateThemeColor(config.dark.brandColor.danger, "dark"),
          background: config.dark.baseColor.background,
          foreground: generateThemeColor(config.dark.baseColor.foreground, "dark"),
          content1: {
            DEFAULT: config.dark.baseColor.content1,
            foreground: readableColor(config.dark.baseColor.content1),
          },
          content2: {
            DEFAULT: config.dark.baseColor.content2,
            foreground: readableColor(config.dark.baseColor.content2),
          },
          content3: {
            DEFAULT: config.dark.baseColor.content3,
            foreground: readableColor(config.dark.baseColor.content3),
          },
          content4: {
            DEFAULT: config.dark.baseColor.content4,
            foreground: readableColor(config.dark.baseColor.content4),
          },
          focus: config.dark.otherColor.focus,
          overlay: config.dark.otherColor.overlay,
          divider: config.dark.otherColor.divider,
        },
      },
    },
    layout,
  };
}
