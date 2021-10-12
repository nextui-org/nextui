import { ThemeTypes } from '../utils/prop-types';

export type ThemeType = ThemeTypes;

export interface NextUIThemesPalette {
  accents_1: string;
  accents_2: string;
  accents_3: string;
  accents_4: string;
  accents_5: string;
  accents_6: string;
  accents_7: string;
  accents_8: string;
  text: string;
  white: string;
  background: string;
  foreground: string;
  selection: string;
  primary: string;
  secondary: string;
  code: string;
  border: string;
  success: string;
  gradient: string;
  successLighter: string;
  successLight: string;
  successDark: string;
  error: string;
  errorLighter: string;
  errorLight: string;
  errorDark: string;
  warning: string;
  warningLighter: string;
  warningLight: string;
  warningDark: string;
  cyan: string;
  cyanLighter: string;
  cyanLight: string;
  cyanDark: string;
  violet: string;
  violetLighter: string;
  violetLight: string;
  violetDark: string;
  link: string;
  purple: string;
  magenta: string;
  alert: string;
}

export interface NextUIThemesExpressiveness {
  linkStyle: string;
  linkHoverStyle: string;
  dropdownBoxShadow: string;
  scrollerStart: string;
  scrollerEnd: string;
  shadowSmall: string;
  shadowMedium: string;
  shadowLarge: string;
  portalOpacity: number;
}

export interface NextUIThemesLayout {
  gap: string;
  gapNegative: string;
  gapHalf: string;
  gapHalfNegative: string;
  gapQuarter: string;
  gapQuarterNegative: string;
  pageMargin: string;
  pageWidth: string;
  pageWidthWithMargin: string;
  breakpointMobile: string;
  breakpointTablet: string;
  radius: string;
  stroke: string;
}

export interface NextUIThemesFont {
  sans: string;
  mono: string;
}

export interface BreakpointsItem {
  min: string;
  max: string;
}

export interface NextUIThemesBreakpoints {
  xs: BreakpointsItem;
  sm: BreakpointsItem;
  md: BreakpointsItem;
  lg: BreakpointsItem;
  xl: BreakpointsItem;
}

export interface NextUIThemes {
  type: ThemeTypes;
  font: NextUIThemesFont;
  layout: NextUIThemesLayout;
  palette: NextUIThemesPalette;
  breakpoints: NextUIThemesBreakpoints;
  expressiveness: NextUIThemesExpressiveness;
}
