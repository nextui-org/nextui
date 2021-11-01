import { NextUIThemesPalette } from '../theme';
import { NormalSizes, NormalColors } from '../utils/prop-types';
import { hexFromString, getNormalColor, hexToRgb } from '../utils/color';

type PaginationSize = {
  font: string;
  width: string;
};

export const getPaginationSizes = (size: NormalSizes | number) => {
  const sizes: { [key in NormalSizes]: PaginationSize } = {
    mini: {
      font: '10px',
      width: '24px'
    },
    small: {
      font: '12px',
      width: '28px'
    },
    medium: {
      font: '14px',
      width: '34px'
    },
    large: {
      font: '16px',
      width: '40px'
    },
    xlarge: {
      font: '18px',
      width: '46px'
    }
  };
  if (typeof size === 'number')
    return { font: `calc(${size}px / 2.55)`, width: `${size}px` };
  return sizes[size];
};
