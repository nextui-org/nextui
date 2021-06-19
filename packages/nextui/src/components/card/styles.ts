import { CardColors } from '../../utils/prop-types';
import { NextUIThemesPalette } from '../../theme';

export interface CardBorder {
  weight?: string;
  color?: string;
}

export type CardStyles = {
  color: string;
  bgColor: string;
  border?: CardBorder;
};

export const getStyles = (
  type: CardColors,
  palette: NextUIThemesPalette,
  shadow?: boolean,
  bordered?: boolean
): CardStyles => {
  const colors: { [key in CardColors]: Omit<CardStyles, 'borderColor'> } = {
    default: {
      color: palette.foreground,
      bgColor: palette.accents_1,
    },
    primary: {
      color: palette.background,
      bgColor: palette.primary,
    },
    dark: {
      color: palette.background,
      bgColor: palette.foreground,
    },
    secondary: {
      color: palette.background,
      bgColor: palette.secondary,
    },
    success: {
      color: palette.background,
      bgColor: palette.success,
    },
    warning: {
      color: palette.background,
      bgColor: palette.warning,
    },
    error: {
      color: palette.background,
      bgColor: palette.error,
    },
    lite: {
      color: palette.foreground,
      bgColor: palette.background,
    },
    gradient: {
      color: palette.white,
      bgColor: palette.gradient,
    },
    alert: {
      color: palette.white,
      bgColor: palette.alert,
    },
    purple: {
      color: palette.white,
      bgColor: palette.purple,
    },
    violet: {
      color: palette.white,
      bgColor: palette.violet,
    },
    cyan: {
      color: palette.text,
      bgColor: palette.cyan,
    },
  };
  const showBorder = bordered && !shadow;
  return {
    ...colors[type],
    border: {
      weight: showBorder ? '2px' : '0px',
      color: showBorder ? palette.border : 'transparent',
    },
  };
};
