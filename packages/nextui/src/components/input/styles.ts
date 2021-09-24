import { NormalSizes, SimpleColors } from '../../utils/prop-types';
import { NextUIThemes, NextUIThemesPalette } from '../../theme/index';
import { addColorAlpha, getNormalColor, hexToRgb } from '../../utils/color';

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
  bgColor: string;
  color: string;
  placeholderColor: string;
  helperColor: string;
  borderColor: string;
  hoverBorder: string;
  shadowColor: string;
};

export const getShadowColor = (
  palette: NextUIThemesPalette,
  color?: SimpleColors
) => {
  try {
    const hexColor = getNormalColor(color, palette, palette.accents_4);
    const [r, g, b] = hexToRgb(hexColor);
    return `0 5px 20px -5px rgb(${r} ${g} ${b}/ 40%);`;
  } catch (err) {
    return 'none';
  }
};

export const getColors = (
  theme: NextUIThemes,
  color?: SimpleColors,
  status?: SimpleColors
): InputColor => {
  const palette = theme.palette;

  const baseProps = {
    color: palette.text,
    bgColor: palette.accents_2,
    placeholderColor: palette.accents_3,
    borderColor: palette.accents_2,
    shadowColor: theme.expressiveness.shadowSmall,
  };

  const colors: { [key in SimpleColors]: InputColor } = {
    default: {
      ...baseProps,
      helperColor: palette.text,
      hoverBorder: palette.foreground,
    },
    primary: {
      ...baseProps,
      helperColor: palette.primary,
      hoverBorder: palette.primary,
    },
    secondary: {
      ...baseProps,
      helperColor: palette.secondary,
      hoverBorder: palette.secondary,
    },
    success: {
      ...baseProps,
      helperColor: palette.success,
      hoverBorder: palette.success,
    },
    warning: {
      ...baseProps,
      helperColor: palette.warning,
      hoverBorder: palette.warning,
    },
    error: {
      ...baseProps,
      helperColor: palette.error,
      hoverBorder: palette.error,
    },
  };
  if (status) {
    if (status === 'default' && color) {
      return colors[color];
    }
    const statusColor = getNormalColor(status, palette);
    return {
      ...colors[status],
      color: statusColor,
      placeholderColor: addColorAlpha(statusColor, 0.5),
      bgColor: addColorAlpha(statusColor, 0.2),
      shadowColor: getShadowColor(palette, status),
    };
  }
  if (!color) return colors.default;
  return colors[color];
};
