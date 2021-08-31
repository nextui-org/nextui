import { getNormalColor } from './../../utils/color';
import { SimpleColors, TooltipTypes } from '../../utils/prop-types';
import { NextUIThemesPalette } from '../../theme';

export type TooltipColors = {
  bgColor: string;
  color: string;
};

export const getColors = (
  color: TooltipTypes | string,
  textColor: SimpleColors | string,
  palette: NextUIThemesPalette
): TooltipColors => {
  const labelColor = getNormalColor(textColor, palette);
  return {
    color: labelColor,
    bgColor: getNormalColor(color, palette, palette.background),
  };
};
