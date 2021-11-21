import { ThemeTypes } from '../utils/prop-types';

export type ThemeType = ThemeTypes;

export interface NextUICommonSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface NextUIThemesPalette {
  text: string;
  white: string;
  black: string;
  link: string;
  code: string;
  border: string;
  background: string;
  foreground: string;
  selection: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  gradient: string;
  accents_1: string;
  accents_2: string;
  accents_3: string;
  accents_4: string;
  accents_5: string;
  accents_6: string;
  accents_7: string;
  accents_8: string;
}

export interface NextUIThemesFonts {
  sans: string;
  mono: string;
}

export interface NextUIBorderWeights {
  light: string;
  normal: string;
  bold: string;
}

export interface NextUIFontSizes extends NextUICommonSizes {
  base: string;
}

export interface NextUIFontWeights {
  thin: string;
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
  black: string;
}

export interface NextUISpacing extends NextUICommonSizes {
  '0': string;
  px: string;
  '0.5': string;
  '1': string;
  '1.5': string;
  '2': string;
  '2.5': string;
  '3': string;
  '3.5': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '96': string;
}

export interface NextUIThemes {
  type: ThemeTypes;
  fonts: NextUIThemesFonts;
  palette: NextUIThemesPalette;
  borderWeights: NextUIBorderWeights;
  lineHeights: NextUICommonSizes;
  fontSizes: NextUIFontSizes;
  fontWeights: NextUIFontWeights;
  radius: NextUICommonSizes;
  spacing: NextUISpacing;
  breakpoints: NextUICommonSizes;
  shadows: NextUICommonSizes;
}
