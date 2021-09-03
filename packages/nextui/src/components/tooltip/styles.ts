import { getNormalColor, invertHex, hexFromString } from './../../utils/color';
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
  let bgColor = getNormalColor(color, palette, palette.background);
  bgColor = bgColor.includes('linear-gradient')
    ? (hexFromString(bgColor, palette.text, true) as string)
    : bgColor;
  const labelColor =
    textColor && textColor !== 'default'
      ? getNormalColor(textColor, palette)
      : invertHex(bgColor);

  return {
    color: labelColor,
    bgColor,
  };
};
