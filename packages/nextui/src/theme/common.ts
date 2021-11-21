import {
  NextUICommonSizes,
  NextUIThemesFonts,
  NextUIBorderWeights,
  NextUIFontWeights,
  NextUIFontSizes,
  NextUISpacing,
  NextUIThemes
} from './types';

export const defaultFonts: NextUIThemesFonts = {
  sans: 'var(--nextui-fonts-sans)',
  mono: 'var(--nextui-fonts-mono)'
};

export const defaultBreakpoints: NextUICommonSizes = {
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1400px'
};

export const defaultSpacing: NextUISpacing = {
  xs: 'var(--nextui-spacing-xs)',
  sm: 'var(--nextui-spacing-sm)',
  md: 'var(--nextui-spacing-md)',
  lg: 'var(--nextui-spacing-lg)',
  xl: 'var(--nextui-spacing-xl)',
  '0': 'var(--nextui-spacing-0)',
  px: 'var(--nextui-spacing-px)',
  '0.5': 'var(--nextui-spacing-0\\.5)',
  '1': 'var(--nextui-spacing-1)',
  '1.5': 'var(--nextui-spacing-1\\.5)',
  '2': 'var(--nextui-spacing-2)',
  '2.5': 'var(--nextui-spacing-2\\.5)',
  '3': 'var(--nextui-spacing-3)',
  '3.5': 'var(--nextui-spacing-3\\.5)',
  '4': 'var(--nextui-spacing-4)',
  '5': 'var(--nextui-spacing-5)',
  '6': 'var(--nextui-spacing-6)',
  '7': 'var(--nextui-spacing-7)',
  '8': 'var(--nextui-spacing-8)',
  '9': 'var(--nextui-spacing-9)',
  '10': 'var(--nextui-spacing-10)',
  '11': 'var(--nextui-spacing-11)',
  '12': 'var(--nextui-spacing-12)',
  '14': 'var(--nextui-spacing-14)',
  '16': 'var(--nextui-spacing-16)',
  '20': 'var(--nextui-spacing-20)',
  '24': 'var(--nextui-spacing-24)',
  '28': 'var(--nextui-spacing-28)',
  '32': 'var(--nextui-spacing-32)',
  '36': 'var(--nextui-spacing-36)',
  '40': 'var(--nextui-spacing-40)',
  '44': 'var(--nextui-spacing-44)',
  '48': 'var(--nextui-spacing-48)',
  '52': 'var(--nextui-spacing-52)',
  '56': 'var(--nextui-spacing-56)',
  '60': 'var(--nextui-spacing-60)',
  '64': 'var(--nextui-spacing-64)',
  '72': 'var(--nextui-spacing-72)',
  '80': 'var(--nextui-spacing-80)',
  '96': 'var(--nextui-spacing-96)'
};

export const defaultFontSizes: NextUIFontSizes = {
  xs: 'var(--nextui-font-size-xs)',
  base: 'var(--nextui-font-size-base)',
  sm: 'var(--nextui-font-size-sm)',
  md: 'var(--nextui-font-size-md)',
  lg: 'var(--nextui-font-size-lg)',
  xl: 'var(--nextui-font-size-xl)'
};

export const defaultLineHeights: NextUICommonSizes = {
  xs: 'var(--nextui-line-height-xs)',
  sm: 'var(--nextui-line-height-sm)',
  md: 'var(--nextui-line-height-md)',
  lg: 'var(--nextui-line-height-lg)',
  xl: 'var(--nextui-line-height-xl)'
};

export const defaultRadius: NextUICommonSizes = {
  xs: 'var(--nextui-radius-xs)',
  sm: 'var(--nextui-radius-sm)',
  md: 'var(--nextui-radius-md)',
  lg: 'var(--nextui-radius-lg)',
  xl: 'var(--nextui-radius-xl)'
};

export const defaultFontWeights: NextUIFontWeights = {
  thin: 'var(--nextui-fontWeights-thin)',
  light: 'var(--nextui-fontWeights-light)',
  normal: 'var(--nextui-fontWeights-normal)',
  medium: 'var(--nextui-fontWeights-medium)',
  semibold: 'var(--nextui-fontWeights-semibold)',
  bold: 'var(--nextui-fontWeights-bold)',
  extrabold: 'var(--nextui-fontWeights-extrabold)',
  black: 'var(--nextui-fontWeights-black)'
};

export const defaultBorderWeights: NextUIBorderWeights = {
  light: 'var(--nextui-border-light)',
  normal: 'var(--nextui-border-normal)',
  bold: 'var(--nextui-border-bold)'
};

export const defaultPalette = {
  background: 'var(--nextui-color-background)',
  foreground: 'var(--nextui-color-foreground)',
  white: 'var(--nextui-color-white)',
  black: 'var(--nextui-color-black)',
  accents_1: 'var(--nextui-color-accents-1)',
  accents_2: 'var(--nextui-color-accents-2)',
  accents_3: 'var(--nextui-color-accents-3)',
  accents_4: 'var(--nextui-color-accents-4)',
  accents_5: 'var(--nextui-color-accents-5)',
  accents_6: 'var(--nextui-color-accents-6)',
  accents_7: 'var(--nextui-color-accents-7)',
  accents_8: 'var(--nextui-color-accents-8)',
  primary: 'var(--nextui-color-primary)',
  secondary: 'var(--nextui-color-secondary)',
  success: 'var(--nextui-color-success)',
  warning: 'var(--nextui-color-warning)',
  error: 'var(--nextui-color-error)',
  gradient: 'var(--nextui-color-gradient)',
  link: 'var(--nextui-color-link)',
  text: 'var(--nextui-color-text)',
  code: 'var(--nextui-color-code)',
  border: 'var(--nextui-color-border)',
  selection: 'var(--nextui-color-selection)'
};

export const defaultShadows: NextUICommonSizes = {
  xs: 'var(--nextui-shadow-xs)',
  sm: 'var(--nextui-shadow-sm)',
  md: 'var(--nextui-shadow-md)',
  lg: 'var(--nextui-shadow-lg)',
  xl: 'var(--nextui-shadow-xl)'
};
export const defaultTheme: Omit<NextUIThemes, 'type'> = {
  fonts: defaultFonts,
  palette: defaultPalette,
  breakpoints: defaultBreakpoints,
  borderWeights: defaultBorderWeights,
  lineHeights: defaultLineHeights,
  fontSizes: defaultFontSizes,
  fontWeights: defaultFontWeights,
  radius: defaultRadius,
  spacing: defaultSpacing,
  shadows: defaultShadows
};
