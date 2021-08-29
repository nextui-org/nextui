import { getNormalColor, isHex, invertHex } from './../../utils/color';
import { TooltipTypes } from '../../utils/prop-types';
import { NextUIThemesPalette } from '../../theme';

export type TooltipColors = {
  bgColor: string;
  color: string;
};

export const getColors = (
  color: TooltipTypes | string,
  palette: NextUIThemesPalette
): TooltipColors => {
  const textColor =
    color === 'default'
      ? palette.foreground
      : isHex(color)
      ? invertHex(color)
      : palette.background;
  return {
    color: textColor,
    bgColor: getNormalColor(color, palette, palette.background),
  };
};
