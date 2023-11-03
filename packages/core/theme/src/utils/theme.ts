import {spacingScaleKeys, SpacingScaleKeys, SpacingScale} from "../types";

/**
 * Determines if the theme is a base theme
 *
 * @param theme string
 * @returns "light" | "dark
 */
export const isBaseTheme = (theme: string) => theme === "light" || theme === "dark";

const ROOT_FONT_SIZE = 16;
const baseScale = [1, 2, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const extendedScale = [20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];

export const generateSpacingScale = (spacingUnit: number) => {
  const scaleLabels: Partial<Record<SpacingScaleKeys, number>> = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5.5,
    xl: 9,
    "2xl": 12,
    "3xl": 20,
    "4xl": 30,
    "5xl": 56,
    "6xl": 72,
    "7xl": 96,
    "8xl": 128,
    "9xl": 160,
  };

  const scale = {0: "0px"} as SpacingScale;

  Object.entries(scaleLabels).forEach(([label, multiplier]) => {
    scale[label as SpacingScaleKeys] = multiplier
      ? `${(spacingUnit * multiplier) / ROOT_FONT_SIZE}rem`
      : `${spacingUnit / ROOT_FONT_SIZE}rem`;
  });

  baseScale.forEach((i) => {
    let key = `${i}` as SpacingScaleKeys;

    // if the key has decimal e.g 3.5 change it to "3-5" format
    if (key.includes(".")) {
      const [first, second] = key.split(".");

      key = `${first}_${second}`;
    }

    scale[key] = `${(spacingUnit * i) / ROOT_FONT_SIZE}rem`;
  });

  extendedScale.forEach((i) => {
    const key = `${i}` as SpacingScaleKeys;

    scale[key] = `${(spacingUnit * i) / ROOT_FONT_SIZE}rem`;
  });

  return scale;
};

export function createSpacingUnits(prefix: string) {
  let result = spacingScaleKeys.reduce((acc, key) => {
    let value = `var(--${prefix}-spacing-unit-${key})`;

    if (key.includes(".")) {
      const [first, second] = key.split(".");

      value = `var(--${prefix}-spacing-unit-${first}_${second})`;
    }

    return {
      ...acc,
      [`unit-${key}`]: value,
    };
  }, {});

  return result as Record<SpacingScaleKeys, string>;
}
