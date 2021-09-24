import { hexToRGBA } from './../../utils/color';
import { NormalSizes, SimpleColors } from '../../utils/prop-types';
import { NextUIThemesPalette } from '../../theme/index';

export type InputSize = {
  heightRatio: string;
  fontSize: string;
};

export const getSizes = (size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: InputSize } = {
    mini: {
      heightRatio: '1.2',
      fontSize: '.75rem',
    },
    small: {
      heightRatio: '1.5',
      fontSize: '.75rem',
    },
    medium: {
      heightRatio: '1.687',
      fontSize: '.875rem',
    },
    large: {
      heightRatio: '1.875',
      fontSize: '1rem',
    },
    xlarge: {
      heightRatio: '2.25',
      fontSize: '1.25rem',
    },
  };
  if (!size) return sizes.medium;
  return sizes[size];
};

export type InputColor = {
  color: string;
  helperColor: string;
  borderColor: string;
  hoverBorder: string;
};

export const getColors = (
  palette: NextUIThemesPalette,
  color?: SimpleColors
): InputColor => {
  const colors: { [key in SimpleColors]: InputColor } = {
    default: {
      color: palette.text,
      helperColor: palette.text,
      borderColor: palette.accents_2,
      hoverBorder: palette.foreground,
    },
    primary: {
      color: palette.text,
      helperColor: palette.primary,
      borderColor: palette.accents_2,
      hoverBorder: palette.primary,
    },
    secondary: {
      color: palette.text,
      helperColor: palette.secondary,
      borderColor: palette.accents_2,
      hoverBorder: palette.secondary,
    },
    success: {
      color: palette.text,
      helperColor: palette.success,
      borderColor: palette.accents_2,
      hoverBorder: palette.success,
    },
    warning: {
      color: palette.text,
      helperColor: palette.warning,
      borderColor: palette.accents_2,
      hoverBorder: palette.warning,
    },
    error: {
      color: palette.text,
      helperColor: palette.error,
      borderColor: palette.accents_2,
      hoverBorder: palette.error,
    },
  };

  if (!color) return colors.default;
  return colors[color];
};
