import { NextUIThemesPalette } from '@theme/index';
import { NormalSizes, ButtonColors } from '@utils/prop-types';
import { ButtonProps } from './button';
import { addColorAlpha } from '@utils/color';

export interface ButtonColorGroup {
  bg: string;
  color: string;
  loaderBg?: string;
  border?: {
    weight: string;
    color?: string;
  };
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

export const getButtonColors = (
  palette: NextUIThemesPalette,
  props: ButtonProps
): ButtonColorGroup => {
  const { color, disabled, bordered, flattened } = props;
  const common = {
    color: palette.white,
    border: {
      weight: '0px',
    },
  };
  const colors: { [key in ButtonColors]?: ButtonColorGroup } = {
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
      color: palette.accents_3,
      loaderBg: palette.accents_1,
    };

  const defaultColor = colors.primary as ButtonColorGroup;
  const selectedColor = colors[color] || defaultColor;
  if (bordered)
    return {
      ...selectedColor,
      bg: palette.background,
      color: palette[color],
      border: {
        weight: '2px',
        color: palette[color],
      },
    };
  if (flattened)
    return {
      ...selectedColor,
      bg: addColorAlpha(selectedColor.bg, 0.15),
      color: palette[color],
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
  color: ButtonColors | string
): string | null => {
  const colors: { [key in ButtonColors]?: string } = {
    primary: palette.primary,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  };
  return colors[color as ButtonColors] || color || null;
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
  const { color, bordered, flattened } = props;
  const colors: { [key in ButtonColors]?: string } = {
    primary: palette.primary,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    gradient: palette.warning,
  };
  if (flattened) return addColorAlpha(colors[color] || palette.accents_2, 0.4);
  const selectedColor = bordered ? colors[color] : palette.accents_2;
  if (selectedColor) return addColorAlpha(selectedColor, 0.25);
  return palette.accents_2;
};
