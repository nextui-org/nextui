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

export const getButtonBorderColors = (
  palette: NextUIThemesPalette,
  type: ButtonColors
): ButtonColorGroup | null => {
  const colors: { [key in ButtonColors]?: ButtonColorGroup } = {
    primary: {
      bg: palette.background,
      color: palette.primary,
      border: {
        weight: '2px',
        color: palette.primary,
      },
    },
    secondary: {
      bg: palette.background,
      color: palette.secondary,
      border: {
        weight: '2px',
        color: palette.secondary,
      },
    },
    success: {
      bg: palette.background,
      color: palette.success,
      border: {
        weight: '2px',
        color: palette.success,
      },
    },
    warning: {
      bg: palette.background,
      color: palette.warning,
      border: {
        weight: '2px',
        color: palette.warning,
      },
    },
    gradient: {
      bg: palette.gradient,
      color: palette.warning,
      border: {
        weight: '2px',
        color: palette.warning,
      },
    },
    error: {
      bg: palette.background,
      color: palette.error,
      border: {
        weight: '2px',
        color: palette.error,
      },
    },
  };

  return colors[type] || null;
};

export const getButtonColors = (
  palette: NextUIThemesPalette,
  props: ButtonProps
): ButtonColorGroup => {
  const { color, disabled, bordered } = props;
  const colors: { [key in ButtonColors]?: ButtonColorGroup } = {
    primary: {
      bg: palette.primary,
      color: palette.white,
      loaderBg: palette.primary,
      border: {
        weight: '0px',
      },
    },
    secondary: {
      bg: palette.secondary,
      color: palette.white,
      loaderBg: palette.primary,
      border: {
        weight: '0px',
      },
    },
    success: {
      bg: palette.success,
      color: palette.white,
      loaderBg: palette.success,
      border: {
        weight: '0px',
      },
    },
    warning: {
      bg: palette.warning,
      color: palette.white,
      loaderBg: palette.warning,
      border: {
        weight: '0px',
      },
    },
    gradient: {
      bg: palette.gradient,
      color: palette.white,
      loaderBg: palette.warning,
      border: {
        weight: '0px',
      },
    },
    error: {
      bg: palette.error,
      color: palette.white,
      loaderBg: palette.error,
      border: {
        weight: '0px',
      },
    },
    abort: {
      bg: 'transparent',
      color: palette.accents_5,
    },
  };
  if (disabled)
    return {
      bg: palette.accents_2,
      color: palette.accents_3,
      loaderBg: palette.accents_1,
    };

  /**
   * The '-light' type is the same color as the common type,
   * only hover's color is different.
   * e.g.
   *   Color['success'] === Color['success-light']
   *   Color['warning'] === Color['warning-light']
   */
  const withoutLightType = color.replace('-light', '') as ButtonColors;
  const defaultColor = colors.primary as ButtonColorGroup;

  if (bordered)
    return getButtonBorderColors(palette, withoutLightType) || defaultColor;
  return colors[withoutLightType] || defaultColor;
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
  const withoutLightType = color.replace('-light', '') as ButtonColors;
  return colors[withoutLightType] || color || null;
};

export const getButtonGhostHoverColors = (
  palette: NextUIThemesPalette,
  type: ButtonColors
): ButtonColorGroup | null => {
  const colors: { [key in ButtonColors]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.foreground,
      color: palette.background,
    },
    success: {
      bg: palette.success,
      color: 'white',
    },
    warning: {
      bg: palette.warning,
      color: 'white',
    },
    error: {
      bg: palette.error,
      color: 'white',
    },
  };
  const withoutLightType = type.replace('-light', '') as ButtonColors;
  return colors[withoutLightType] || null;
};

export interface ButtonCursorGroup {
  cursor: string;
  events: string;
}

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

export type ButtonSizeGroup = {
  height: string;
  width: string;
  loaderSize?: NormalSizes;
  padding: string;
  minWidth: string;
  fontSize: string;
};

export const getButtonRadius = (size: NormalSizes): string => {
  const radius: { [key in NormalSizes]: string } = {
    mini: '0.4375rem',
    small: '0.5625rem',
    medium: '0.7375rem',
    large: '0.8rem',
    xlarge: '0.9rem',
  };
  return radius[size];
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

export const getButtonDripColor = (palette: NextUIThemesPalette) => {
  return addColorAlpha(palette.accents_2, 0.25);
};
