import { NormalSizes, SimpleColors } from '../utils/prop-types';
import { NextUIThemes, NextUIThemesPalette } from '../theme';
import { getNormalColor, addColorAlpha, hexToRgb } from '../utils/color';
import { isEmpty } from '../utils/assertion';

export type InputSize = {
  heightRatio: string;
  fontSize: string;
};

export const getSizes = (size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: InputSize } = {
    xs: {
      heightRatio: '1.2',
      fontSize: '.75rem'
    },
    sm: {
      heightRatio: '1.6',
      fontSize: '.75rem'
    },
    md: {
      heightRatio: '2',
      fontSize: '.875rem'
    },
    lg: {
      heightRatio: '2.2',
      fontSize: '1rem'
    },
    xl: {
      heightRatio: '2.6',
      fontSize: '1.25rem'
    }
  };
  if (!size) return sizes.md;
  return sizes[size];
};

export type InputColor = {
  color: string;
  bgColor: string;
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
  disabled?: boolean,
  color?: SimpleColors,
  status?: SimpleColors,
  helperColor?: SimpleColors
): InputColor => {
  const palette = theme.palette;
  const isDark = theme.type === 'dark';
  const normalColor = getNormalColor(color, palette);
  const normalHelperColor = getNormalColor(helperColor, palette);
  const normalStatusColor = getNormalColor(status, palette);

  const baseProps = {
    color: palette.text,
    bgColor: isDark ? palette.accents_1 : palette.accents_2,
    placeholderColor: isDark ? palette.accents_6 : palette.accents_3,
    borderColor: palette.accents_2,
    shadowColor: theme.shadows.sm
  };

  if (disabled) {
    return {
      ...baseProps,
      placeholderColor: isDark
        ? theme.palette.accents_4
        : theme.palette.accents_3,
      color: theme.palette.accents_3,
      bgColor: isDark ? theme.palette.accents_2 : theme.palette.accents_1,
      borderColor: theme.palette.accents_2,
      helperColor: palette.text,
      hoverBorder: palette.foreground
    };
  }

  if (status === 'default' || isEmpty(status)) {
    return color === 'default'
      ? {
          ...baseProps,
          helperColor: palette.text,
          hoverBorder: palette.foreground
        }
      : {
          ...baseProps,
          helperColor: normalHelperColor,
          hoverBorder: normalColor
        };
  }

  return {
    ...baseProps,
    hoverBorder: normalColor,
    borderColor: normalColor,
    helperColor: normalHelperColor,
    color: normalStatusColor,
    placeholderColor: addColorAlpha(normalStatusColor, 0.5),
    bgColor: addColorAlpha(normalStatusColor, 0.2),
    shadowColor: getShadowColor(palette, status)
  };
};
