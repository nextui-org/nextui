import {
  NextUICommonSizes,
  NextUIThemesFonts,
  NextUIBorderWeights,
  NextUIFontSizes,
  NextUISpacing
} from './types';

export const defaultFonts: NextUIThemesFonts = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  mono: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace'
};

export const defaultBreakpoints: NextUICommonSizes = {
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1400px'
};

export const defaultSpacing: NextUISpacing = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '34px',
  '0': '0px',
  px: '1px',
  '0.5': '2px',
  '1': '4px',
  '1.5': '6px',
  '2': '8px',
  '2.5': '10px',
  '3': '12px',
  '3.5': '14px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '7': '28px',
  '8': '32px',
  '9': '36px',
  '10': '40px',
  '11': '44px',
  '12': '48px',
  '13': '52px',
  '14': '56px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
  '28': '112px',
  '32': '128px',
  '36': '144px',
  '40': '160px',
  '44': '176px',
  '48': '192px',
  '52': '208px',
  '56': '224px',
  '60': '240px',
  '64': '256px',
  '72': '288px',
  '80': '320px',
  '96': '384px'
};

export const defaultFontSizes: NextUIFontSizes = {
  xs: '0.875rem',
  base: '1rem',
  sm: '1.25rem',
  md: '1.5rem',
  lg: '2.25rem',
  xl: '3rem'
};

export const defaultLineHeights: NextUICommonSizes = {
  xs: '1rem',
  sm: '1.25rem',
  md: '1.5rem',
  lg: '1.75rem',
  xl: '1.75rem'
};

export const defaultRadius: NextUICommonSizes = {
  xs: '2px',
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '28px'
};

export const defaultBorderWeights: NextUIBorderWeights = {
  light: '1px',
  normal: '2px',
  bold: '3px'
};

export const defaultPalette = {
  white: '#fff',
  black: '#000',
  selection: '#5AC8FA',
  primary: '#0070f3',
  secondary: '#7928ca',
  success: '#17c964',
  warning: '#f5a623',
  error: '#f21361',
  gradient:
    'linear-gradient(111.19deg,#aaffec -63.59%,#ff4ecd -20.3%,#0070f3 70.46%)',
  link: '#0070f3'
};
