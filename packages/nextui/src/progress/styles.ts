import { NextUIThemesPalette } from '../theme';
import { NormalColors, NormalSizes } from '../utils/prop-types';
import { hexFromString, getNormalColor, hexToRgb } from '../utils/color';

export type ProgessSize = {
  height: string;
  radius: string;
};

export const getShadowColor = (
  color: NormalColors | string,
  palette: NextUIThemesPalette
) => {
  try {
    const hexColor =
      color === 'gradient'
        ? (hexFromString(palette.gradient, palette.primary, true) as string)
        : getNormalColor(color, palette, palette.primary);
    const [r, g, b] = hexToRgb(hexColor);
    return `1px 2px 5px 0px rgb(${r} ${g} ${b}/ 60%);`;
  } catch (err) {
    return 'none';
  }
};

export const getSizes = (size: NormalSizes, squared: boolean) => {
  const sizes: {
    [key in NormalSizes]: ProgessSize;
  } = {
    mini: {
      height: '0.25rem',
      radius: squared ? '1px' : '0.25rem'
    },
    small: {
      height: '0.5rem',
      radius: squared ? '2px' : '0.5rem'
    },
    medium: {
      height: '1rem',
      radius: squared ? '3px' : '0.75rem'
    },
    large: {
      height: '1.5rem',
      radius: squared ? '4px' : '1rem'
    },
    xlarge: {
      height: '2rem',
      radius: squared ? '5px' : '1.5rem'
    }
  };
  if (!size) return sizes.medium;
  return sizes[size];
};
