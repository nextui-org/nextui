import { NextUIThemes } from '@nextui/react';

export type BrowserColors = {
  color: string;
  barBgColor: string;
  inputBgColor: string;
  borderColor: string;
  titleColor: string;
  radius: string;
};

export const getBrowserColors = (
  dark: boolean,
  theme: NextUIThemes
): BrowserColors => {
  return dark
    ? {
        color: theme.palette.background,
        barBgColor: theme.palette.foreground,
        inputBgColor: theme.palette.accents_7,
        radius: theme.layout.radius,
        borderColor: theme.palette.accents_7,
        titleColor: theme.palette.accents_2,
      }
    : {
        color: theme.palette.foreground,
        barBgColor: theme.palette.background,
        radius: theme.layout.radius,
        inputBgColor: theme.palette.accents_1,
        borderColor: theme.palette.border,
        titleColor: theme.palette.accents_5,
      };
};
