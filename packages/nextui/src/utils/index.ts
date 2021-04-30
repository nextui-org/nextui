import { NormalColors, normalColors } from './prop-types';
import { NextUIThemesPalette } from '@theme/index';
/**
 * This function allows validate if a string is a hexadecimal
 * value
 * @param str [string] hexadecimal value
 * @returns result [boolean]
 */
export const isHex = (str: string): boolean => {
  const exp = /#[a-fA-F0-9]{3,6}/g;
  return exp.test(str);
};

/**
 *
 * @param hex [string]
 * @param alpha [number]
 * @returns [string]
 */
export const hexToRGBA = (hex: string, alpha: number = 1): string => {
  let r: string | number = 0,
    g: string | number = 0,
    b: string | number = 0;
  // 3 digits
  if (hex.length == 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];
    // 6 digits
  } else if (hex.length == 7) {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }
  return `rgba(${+r}, ${+g},${+b},${alpha})`;
};

export const getNormalColor = (
  color: NormalColors | string | undefined,
  palette: NextUIThemesPalette,
  defaultColor: string = 'inherit'
) => {
  const colors: { [key in NormalColors | string]: string } = {
    default: defaultColor,
    primary: palette.primary,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    gradient: palette.gradient,
  };
  return color && colors[color] ? colors[color] : defaultColor;
};

export const isNormalColor = (color: string): boolean => {
  let found = normalColors.find((el) => el === color);
  return found !== undefined && found !== null;
};

/**
 * Function that checks color name support in the current browser
 * @param strColor
 * @returns boolean
 */
export const isColor = (strColor: string) => {
  let s = new Option().style;
  s.color = strColor;
  return s.color == strColor;
};
