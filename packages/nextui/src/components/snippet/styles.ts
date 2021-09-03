import { SnippetTypes } from '../../utils/prop-types';
import { NextUIThemesPalette } from '../../theme';
import { hexFromString } from '../../utils/color';

export type SnippetStyles = {
  color: string;
  border: string;
  bgColor: string;
};

export const getStyles = (
  type: SnippetTypes,
  palette: NextUIThemesPalette,
  fill?: boolean
) => {
  const styles: { [key in SnippetTypes]: SnippetStyles } = {
    default: {
      color: palette.foreground,
      border: palette.border,
      bgColor: palette.background,
    },
    primary: {
      color: palette.foreground,
      border: palette.border,
      bgColor: palette.primary,
    },
    success: {
      color: palette.success,
      border: palette.success,
      bgColor: palette.background,
    },
    warning: {
      color: palette.warning,
      border: palette.warning,
      bgColor: palette.background,
    },
    error: {
      color: palette.error,
      border: palette.error,
      bgColor: palette.background,
    },
    secondary: {
      color: palette.secondary,
      border: palette.secondary,
      bgColor: palette.background,
    },
    invert: {
      color: palette.background,
      border: palette.foreground,
      bgColor: palette.foreground,
    },
    gradient: {
      color: palette.foreground,
      border: hexFromString(palette.gradient, palette.primary, true) as string,
      bgColor: palette.gradient,
    },
  };

  const filledTypes: Array<SnippetTypes> = [
    'success',
    'warning',
    'error',
    'secondary',
  ];
  const style = styles[type];
  const shouldFilled = filledTypes.includes(type);
  if (!fill || !shouldFilled) return style;

  return {
    ...style,
    color: style.bgColor,
    bgColor: style.color,
  };
};
