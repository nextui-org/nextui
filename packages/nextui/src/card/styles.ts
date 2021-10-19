import { CardColors } from '../utils/prop-types';
import { NextUIThemesPalette } from '../theme';

export type CardStyles = {
  color: string;
  bgColor: string;
  borderColor: string;
};

export const getStyles = (
  type: CardColors,
  palette: NextUIThemesPalette,
  shadow: boolean
): CardStyles => {
  const colors: { [key in CardColors]: CardStyles } = {
    default: {
      color: palette.foreground,
      bgColor: shadow ? palette.background : palette.accents_1,
      borderColor: palette.border
    },
    primary: {
      color: palette.background,
      bgColor: palette.primary,
      borderColor: palette.primary
    },
    dark: {
      color: palette.background,
      bgColor: palette.foreground,
      borderColor: palette.foreground
    },
    secondary: {
      color: palette.background,
      bgColor: palette.secondary,
      borderColor: palette.secondary
    },
    success: {
      color: palette.background,
      bgColor: palette.success,
      borderColor: palette.success
    },
    warning: {
      color: palette.background,
      bgColor: palette.warning,
      borderColor: palette.warning
    },
    error: {
      color: palette.background,
      bgColor: palette.error,
      borderColor: palette.error
    },
    lite: {
      color: palette.foreground,
      bgColor: palette.background,
      borderColor: palette.background
    },
    gradient: {
      color: palette.white,
      bgColor: palette.gradient,
      borderColor: palette.primary
    },
    alert: {
      color: palette.white,
      bgColor: palette.alert,
      borderColor: palette.alert
    },
    purple: {
      color: palette.white,
      bgColor: palette.purple,
      borderColor: palette.purple
    },
    violet: {
      color: palette.white,
      bgColor: palette.violet,
      borderColor: palette.violet
    },
    cyan: {
      color: palette.text,
      bgColor: palette.cyan,
      borderColor: palette.cyan
    }
  };
  return colors[type];
};
