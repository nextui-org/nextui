import {
  NextUIThemesBreakpoints,
  NextUIThemesFont,
  NextUIThemesLayout,
} from './index';

export const defaultFont: NextUIThemesFont = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  mono: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
};

export const defaultBreakpoints: NextUIThemesBreakpoints = {
  xs: {
    min: '0',
    max: '650px',
  },
  sm: {
    min: '750px',
    max: '900px',
  },
  md: {
    min: '960px',
    max: '1280px',
  },
  lg: {
    min: '1280px',
    max: '1920px',
  },
  xl: {
    min: '1920px',
    max: '10000px',
  },
};

export const defaultLayout: NextUIThemesLayout = {
  gap: '16pt',
  gapNegative: '-16pt',
  gapHalf: '8pt',
  gapHalfNegative: '-8pt',
  gapQuarter: '4pt',
  gapQuarterNegative: '-4pt',
  pageMargin: '16pt',
  pageWidth: '750pt',
  pageWidthWithMargin: '782pt',
  breakpointMobile: defaultBreakpoints.xs.max,
  breakpointTablet: defaultBreakpoints.sm.max,
  radius: '14px',
  stroke: '2px',
};
