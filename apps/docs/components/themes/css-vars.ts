import {readableColor} from "color2k";

import {colorsId, baseColorsId, showcaseId, otherColorsId} from "./constants";
import {ColorPickerType, Config, ConfigLayout, ThemeType, ThemeColor} from "./types";
import {generateThemeColor, hexToHsl} from "./utils/colors";

export function setCssColor(colorType: ColorPickerType, value: string, theme: ThemeType) {
  const brandColorsEl = document.getElementById(colorsId);
  const commonColorsEl = document.getElementById(baseColorsId);
  const showcaseEl = document.getElementById(showcaseId);
  const themeColor = generateThemeColor(value, colorType, theme);

  if (!brandColorsEl || !commonColorsEl || !showcaseEl) {
    // eslint-disable-next-line no-console
    console.error("One or more required elements are missing from the DOM.");

    return;
  }

  Object.keys(themeColor).forEach((key) => {
    const value = hexToHsl(themeColor[key as keyof ThemeColor]);

    if (key === "DEFAULT") {
      brandColorsEl.style.setProperty(`--nextui-${colorType}`, value);
      commonColorsEl.style.setProperty(`--nextui-${colorType}`, value);
      showcaseEl.style.setProperty(`--nextui-${colorType}`, value);
    } else {
      brandColorsEl.style.setProperty(`--nextui-${colorType}-${key}`, value);
      commonColorsEl.style.setProperty(`--nextui-${colorType}-${key}`, value);
      showcaseEl.style.setProperty(`--nextui-${colorType}-${key}`, value);
    }
  });
}

export function setCssBackground(value: string) {
  const showcaseEl = document.getElementById(showcaseId);
  const baseColor = document.getElementById(baseColorsId);
  const hslValue = hexToHsl(value);

  baseColor?.style.setProperty("--nextui-background", hslValue);
  showcaseEl?.style.setProperty("--nextui-background", hslValue);
}

export function setCssFontSize(type: keyof ConfigLayout["fontSize"], value: string) {
  const el = document.getElementById(showcaseId);

  el?.style.setProperty(`--nextui-font-size-${type}`, `${value}rem`);
}

export function setCssLineHeight(type: keyof ConfigLayout["lineHeight"], value: string) {
  const el = document.getElementById(showcaseId);

  el?.style.setProperty(`--nextui-line-height-${type}`, `${value}rem`);
}

export function setCssRadius(type: keyof ConfigLayout["radius"], value: string) {
  const el = document.getElementById(showcaseId);

  el?.style.setProperty(`--nextui-radius-${type}`, `${value}rem`);
}

export function setCssBorderWidth(type: keyof ConfigLayout["borderWidth"], value: string) {
  const el = document.getElementById(showcaseId);

  el?.style.setProperty(`--nextui-border-width-${type}`, `${value}px`);
}

export function setCssContentColor(level: 1 | 2 | 3 | 4, value: string) {
  const showcaseEl = document.getElementById(showcaseId);
  const baseColorEl = document.getElementById(baseColorsId);
  const hslValue = hexToHsl(value);

  showcaseEl?.style.setProperty(`--nextui-content${level}`, hslValue);
  showcaseEl?.style.setProperty(
    `--nextui-content${level}-foreground`,
    hexToHsl(readableColor(value)),
  );
  baseColorEl?.style.setProperty(`--nextui-content${level}`, hslValue);
  baseColorEl?.style.setProperty(
    `--nextui-content${level}-foreground`,
    hexToHsl(readableColor(value)),
  );
}

export function setCssOtherColor(type: "divider" | "focus" | "overlay", value: string) {
  const showcaseEl = document.getElementById(showcaseId);
  const otherColors = document.getElementById(otherColorsId);
  const hslValue = hexToHsl(value);

  otherColors?.style.setProperty(`--nextui-${type}`, hslValue);
  showcaseEl?.style.setProperty(`--nextui-${type}`, hslValue);
}

export function setOtherCssParams(type: keyof ConfigLayout["otherParams"], value: string) {
  const el = document.getElementById(showcaseId);

  if (!el) return;

  switch (type) {
    case "disabledOpacity":
      el.style.setProperty("--nextui-disabled-opacity", value);
      break;
    case "dividerWeight":
      el.style.setProperty("--nextui-divider-weight", `${value}px`);
      break;
    case "hoverOpacity":
      el.style.setProperty("--nextui-hover-opacity", value);
      break;
  }
}

export function setAllCssVars(config: Config, theme: ThemeType) {
  if (!config[theme] || !config[theme].brandColor || !config[theme].baseColor || !config.layout) {
    // eslint-disable-next-line no-console
    console.error("Invalid configuration or theme provided.");

    return;
  }

  setCssColor("default", config[theme].brandColor.default, theme);
  setCssColor("primary", config[theme].brandColor.primary, theme);
  setCssColor("secondary", config[theme].brandColor.secondary, theme);
  setCssColor("success", config[theme].brandColor.success, theme);
  setCssColor("warning", config[theme].brandColor.warning, theme);
  setCssColor("danger", config[theme].brandColor.danger, theme);
  setCssColor("foreground", config[theme].baseColor.foreground, theme);
  setCssContentColor(1, config[theme].baseColor.content1);
  setCssContentColor(2, config[theme].baseColor.content2);
  setCssContentColor(3, config[theme].baseColor.content3);
  setCssContentColor(4, config[theme].baseColor.content4);
  setCssBackground(config[theme].baseColor.background);
  setCssFontSize("tiny", config.layout.fontSize.tiny);
  setCssFontSize("small", config.layout.fontSize.small);
  setCssFontSize("medium", config.layout.fontSize.medium);
  setCssFontSize("large", config.layout.fontSize.large);
  setCssLineHeight("tiny", config.layout.lineHeight.tiny);
  setCssLineHeight("small", config.layout.lineHeight.small);
  setCssLineHeight("medium", config.layout.lineHeight.medium);
  setCssLineHeight("large", config.layout.lineHeight.large);
  setCssRadius("small", config.layout.radius.small);
  setCssRadius("medium", config.layout.radius.medium);
  setCssRadius("large", config.layout.radius.large);
  setCssBorderWidth("small", config.layout.borderWidth.small);
  setCssBorderWidth("medium", config.layout.borderWidth.medium);
  setCssBorderWidth("large", config.layout.borderWidth.large);
  setCssOtherColor("divider", config[theme].otherColor.divider);
  setCssOtherColor("focus", config[theme].otherColor.focus);
  setCssOtherColor("overlay", config[theme].otherColor.overlay);
  setOtherCssParams("disabledOpacity", config.layout.otherParams.disabledOpacity);
  setOtherCssParams("dividerWeight", config.layout.otherParams.dividerWeight);
  setOtherCssParams("hoverOpacity", config.layout.otherParams.hoverOpacity);
}
