import { CSSProperties } from 'react';
import { NextUIThemesPalette } from '@theme/index';
import { NormalSizes, NormalColors, NormalWeights } from '@utils/prop-types';
import { ButtonProps } from './button';
import { ButtonGroupProps } from './button-group';
import { addColorAlpha } from '@utils/color';

export interface ButtonBorder {
  display?: string;
  weight?: string;
  color?: string;
}

export interface ButtonColorGroup {
  bg?: string;
  color?: string;
  loaderBg?: string;
  border?: ButtonBorder;
  style?: CSSProperties;
}

export interface ButtonCursorGroup {
  cursor: string;
  events: string;
}

export type ButtonSizeGroup = {
  height: string;
  width: string;
  loaderSize?: NormalSizes;
  padding: string;
  minWidth: string;
  fontSize: string;
};

export const getGroupBorder = (
  palette: NextUIThemesPalette,
  props: ButtonGroupProps
): ButtonBorder => {
  const { bordered, color } = props;
  const common = {
    color: palette.background,
    weight: bordered ? '2px' : '0px',
  };
  if (!bordered && color !== 'primary') return common;

  const colors: { [key in NormalColors]?: ButtonColorGroup } = {
    default: {
      ...common,
      color: palette.primary,
    },
    primary: {
      ...common,
      color: palette.primary,
    },
    success: {
      ...common,
      color: palette.success,
    },
    secondary: {
      ...common,
      color: palette.secondary,
    },
    error: {
      ...common,
      color: palette.error,
    },
    warning: {
      ...common,
      color: palette.warning,
    },
  };
  return (
    colors[color as NormalColors] || {
      ...common,
      color: palette.primary,
    }
  );
};

const getButtonWeight = (weight: NormalWeights): string | undefined => {
  const weights: { [key in NormalWeights]?: string } = {
    light: '1px',
    normal: '2px',
    bold: '3px',
  };
  return weights[weight];
};

export const getButtonColors = (
  palette: NextUIThemesPalette,
  props: ButtonProps
): ButtonColorGroup => {
  const { color, disabled, bordered, weight, flat, light } = props;
  const border = getButtonWeight(weight);
  const common = {
    color: palette.white,
    border: {
      weight: border || '0px',
    },
  };
  const colors: { [key in NormalColors]?: ButtonColorGroup } = {
    default: {
      ...common,
      bg: palette.primary,
      loaderBg: palette.primary,
    },
    primary: {
      ...common,
      bg: palette.primary,
      loaderBg: palette.primary,
    },
    secondary: {
      ...common,
      bg: palette.secondary,
      loaderBg: palette.primary,
    },
    success: {
      ...common,
      bg: palette.success,
      loaderBg: palette.success,
    },
    warning: {
      ...common,
      bg: palette.warning,
      loaderBg: palette.warning,
    },
    gradient: {
      ...common,
      bg: palette.gradient,
      loaderBg: palette.warning,
    },
    error: {
      ...common,
      bg: palette.error,
      loaderBg: palette.error,
    },
  };
  if (disabled)
    return {
      bg: palette.accents_2,
      color: palette.accents_4,
      loaderBg: palette.accents_1,
    };

  const defaultColor = colors.default as ButtonColorGroup;
  const selectedColor = colors[color] || defaultColor;
  const baseColor = color === 'default' ? palette.accents_2 : palette[color];
  const highlightColor = color === 'default' ? palette.primary : baseColor;

  if (bordered)
    return color === 'gradient'
      ? {
          ...selectedColor,
          bg: palette.background,
          color: 'inherit',
          border: {
            display: 'none',
          },
          style: {
            padding: border,
            backgroundClip: 'content-box, border-box',
            backgroundImage: `linear-gradient(${palette.background},${palette.background}),
             ${palette.gradient}`,
          },
        }
      : {
          ...selectedColor,
          bg: palette.background,
          color: highlightColor,
          border: {
            display: 'solid',
            weight: border,
            color: highlightColor,
          },
        };
  if (light)
    return {
      ...selectedColor,
      bg: palette.background,
      color: color === 'default' ? palette.foreground : baseColor,
    };
  if (flat)
    return {
      ...selectedColor,
      bg: addColorAlpha(selectedColor?.bg || palette.foreground, 0.15),
      color: highlightColor,
    };
  return selectedColor;
};

export const getLoadingSize = (size: NormalSizes): NormalSizes => {
  const loaderSizes: { [key in NormalSizes]?: NormalSizes } = {
    mini: 'mini',
    small: 'small',
    medium: 'small',
    large: 'medium',
    xlarge: 'medium',
  };
  return loaderSizes[size] || 'small';
};

export const getLoadingBackground = (
  palette: NextUIThemesPalette,
  color: NormalColors | string
): string | null => {
  const colors: { [key in NormalColors]?: string } = {
    primary: palette.primary,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  };
  return colors[color as NormalColors] || color || null;
};

export const getButtonCursor = (
  disabled: boolean,
  loading: boolean
): ButtonCursorGroup => {
  if (disabled)
    return {
      cursor: 'not-allowed',
      events: 'auto',
    };
  if (loading)
    return {
      cursor: 'default',
      events: 'none',
    };

  return {
    cursor: 'pointer',
    events: 'auto',
  };
};

export const getButtonRadius = (
  size: NormalSizes,
  rounded?: boolean
): string => {
  const radius: { [key in NormalSizes]: string } = {
    mini: '0.4375rem',
    small: '0.5625rem',
    medium: '0.7375rem',
    large: '0.8rem',
    xlarge: '0.9rem',
  };
  const baseRadius = radius[size];
  return rounded ? `calc(${baseRadius} + 10rem)` : baseRadius;
};

export const getButtonSize = (
  size: NormalSizes = 'medium',
  auto: boolean
): ButtonSizeGroup => {
  const loaderSize = getLoadingSize(size);
  const defaultLayout: ButtonSizeGroup = {
    loaderSize,
    height: '2.5rem',
    width: 'auto',
    padding: '1.375rem',
    fontSize: '.875rem',
    minWidth: '12.5rem',
  };
  const autoPaddings: { [key in NormalSizes]: string } = {
    mini: '0.625rem',
    small: '0.9375rem',
    medium: '1.25rem',
    large: '1.5625rem',
    xlarge: '1.875rem',
  };
  const layouts: { [key in NormalSizes]: ButtonSizeGroup } = {
    mini: {
      loaderSize,
      height: '1.5rem',
      width: 'initial',
      padding: '1.375rem',
      fontSize: '.75rem',
      minWidth: '5.25rem',
    },
    small: {
      loaderSize,
      height: '2rem',
      width: 'initial',
      padding: '1.25rem',
      fontSize: '.875rem',
      minWidth: '9.375rem',
    },
    medium: defaultLayout,
    large: {
      loaderSize,
      height: '2.75rem',
      width: 'initial',
      padding: '1.875rem',
      fontSize: '1rem',
      minWidth: '15.625rem',
    },
    xlarge: {
      loaderSize,
      height: '3.5rem',
      width: 'initial',
      padding: '2.875rem',
      fontSize: '1.2rem',
      minWidth: '18.625rem',
    },
  };

  if (auto)
    return {
      ...(layouts[size] || defaultLayout),
      padding: autoPaddings[size] || autoPaddings.medium,
      minWidth: 'min-content',
      width: 'auto',
    };

  return layouts[size] || defaultLayout;
};

export const getButtonDripColor = (
  palette: NextUIThemesPalette,
  props: ButtonProps
) => {
  const { color, bordered, flat, light } = props;
  const colors: { [key in NormalColors]?: string } = {
    default: palette.accents_2,
    primary: palette.primary,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    gradient: palette.warning,
  };
  const baseColor = color === 'default' ? palette.primary : colors[color];
  if (light) return addColorAlpha(palette.accents_2, 0.8);
  if (flat) return addColorAlpha(baseColor || palette.accents_2, 0.4);
  const selectedColor = bordered ? baseColor : palette.accents_2;
  if (selectedColor) return addColorAlpha(selectedColor, 0.25);
  return palette.accents_2;
};
