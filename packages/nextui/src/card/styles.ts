import { NormalColors, SimpleColors } from '../utils/prop-types';
import { getNormalColor, hexFromString, addColorAlpha } from './../utils/color';
import { NextUIThemesPalette } from '../theme';

export type CardStyles = {
  bgColor: string;
  color: string;
  borderColor: string;
  dripColor: string;
};

export const getDripColor = (
  palette: NextUIThemesPalette,
  color: NormalColors | string,
  bordered: boolean
) => {
  const colors: { [key in any]: string } = {
    default: palette.accents_2,
    primary: palette.primary,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    gradient: hexFromString(palette.gradient, palette.primary, true) as string
  };
  const baseColor =
    color === 'default'
      ? palette.primary
      : colors[color || 'default'] || getNormalColor(color, palette);
  const selectedColor = bordered ? baseColor : palette.accents_6;
  if (selectedColor) return addColorAlpha(selectedColor, 0.25);
  return palette.accents_2;
};

export const getStyles = (
  color: NormalColors | string,
  textColor: SimpleColors | string,
  shadow: boolean,
  bordered: boolean,
  palette: NextUIThemesPalette
): CardStyles => {
  const normalColor = getNormalColor(color, palette, palette.background);
  const normalTextColor = getNormalColor(textColor, palette, palette.text);
  const dripColor = getDripColor(palette, color, bordered);
  return {
    bgColor:
      color === 'default' && !shadow && !bordered
        ? palette.accents_1
        : normalColor,
    color: normalTextColor,
    borderColor: color === 'default' ? palette.border : normalColor,
    dripColor
  };
};
