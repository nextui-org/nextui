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
  borderColor: string;
  hoverBorder: string;
};

export const getColors = (
  palette: NextUIThemesPalette,
  status?: SimpleColors
): InputColor => {
  const colors: { [key in SimpleColors]: InputColor } = {
    default: {
      color: palette.foreground,
      borderColor: palette.border,
      hoverBorder: palette.accents_5,
    },
    primary: {
      color: palette.foreground,
      borderColor: palette.primary,
      hoverBorder: palette.primary,
    },
    secondary: {
      color: palette.foreground,
      borderColor: palette.secondary,
      hoverBorder: palette.secondary,
    },
    success: {
      color: palette.foreground,
      borderColor: palette.successLight,
      hoverBorder: palette.success,
    },
    warning: {
      color: palette.foreground,
      borderColor: palette.warningLight,
      hoverBorder: palette.warning,
    },
    error: {
      color: palette.error,
      borderColor: palette.error,
      hoverBorder: palette.errorDark,
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
