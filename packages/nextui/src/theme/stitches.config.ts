import { createStitches, defaultThemeMap } from '@stitches/react';
import type * as Stitches from '@stitches/react';

export type { VariantProps } from '@stitches/react';

export const {
  styled,
  css,
  theme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  config
} = createStitches({
  prefix: 'nextui',
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      primary: '#0070f3',
      secondary: '#7928ca',
      success: '#17c964',
      warning: '#f5a623',
      error: '#f21361',
      gradient:
        'linear-gradient(111.19deg, #aaffec -63.59%,#ff4ecd -20.3%,#0070f3 70.46%)',
      link: '#0070f3',
      accents1: '#f6f6f6',
      accents2: '#eaeaea',
      accents3: '#999999',
      accents4: '#888888',
      accents5: '#666666',
      accents6: '#444444',
      accents7: '#333333',
      accents8: '#111111',
      text: '#333333',
      background: '#ffffff',
      foreground: '#000000',
      code: '#f81ce5',
      border: '#eaeaea',
      selection: '#0070f3'
    },
    fonts: {
      sans:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif;",
      mono:
        "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono','Courier New', monospace;"
    },
    fontSizes: {
      xs: '0.875rem',
      base: '1rem',
      sm: '1.25rem',
      md: '1.5rem',
      lg: '2.25rem',
      xl: '3rem'
    },
    fontWeights: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeights: {
      xs: 1,
      sm: 1.25,
      md: 1.5,
      lg: 1.625,
      xl: 1.75
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    },
    space: {
      0: '0rem',
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '2.25rem',
      px: '1px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem'
    },
    radii: {
      xs: '2px',
      sm: '6px',
      md: '10px',
      base: '14px',
      lg: '14px',
      xl: '28px',
      round: '50%',
      pill: '9999px'
    },
    shadows: {
      xs: '0 2px 10px -3px rgba(0, 0, 0, 0.1)',
      sm: '0 5px 20px -5px rgba(0, 0, 0, 0.1)',
      md: '0 8px 30px rgba(0, 0, 0, 0.15)',
      lg: '0 30px 60px rgba(0, 0, 0, 0.15)',
      xl: '0 40px 80px rgba(0, 0, 0, 0.25)'
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      5: '500',
      max: '999'
    },
    borderWeights: {
      light: '1px',
      normal: '2px',
      bold: '3px',
      extrabold: '4px',
      black: '5px'
    },
    transitions: {
      default: 'all 250ms ease'
    }
  },
  media: {
    xs: '(min-width: 576px)',
    sm: '(min-width: 768px)',
    md: '(min-width: 992px)',
    lg: '(min-width: 1200px)',
    xl: '(min-width: 1400px)',
    motion: '(prefers-reduced-motion)',
    hover: '(any-hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)'
  },
  utils: {
    p: (value: Stitches.PropertyValue<'padding'>) => ({
      padding: value
    }),
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value
    }),
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
      paddingRight: value
    }),
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value
    }),
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value
    }),
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    m: (value: Stitches.PropertyValue<'margin'>) => ({
      margin: value
    }),
    mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value
    }),
    mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
      marginRight: value
    }),
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
      marginBottom: value
    }),
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value
    }),
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value
    }),
    my: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value
    }),
    ta: (value: Stitches.PropertyValue<'textAlign'>) => ({ textAlign: value }),
    fd: (value: Stitches.PropertyValue<'flexDirection'>) => ({
      flexDirection: value
    }),
    fw: (value: Stitches.PropertyValue<'flexWrap'>) => ({ flexWrap: value }),
    ai: (value: Stitches.PropertyValue<'alignItems'>) => ({
      alignItems: value
    }),
    ac: (value: Stitches.PropertyValue<'alignContent'>) => ({
      alignContent: value
    }),
    jc: (value: Stitches.PropertyValue<'justifyContent'>) => ({
      justifyContent: value
    }),
    as: (value: Stitches.PropertyValue<'alignSelf'>) => ({ alignSelf: value }),
    fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
    fs: (value: Stitches.PropertyValue<'flexShrink'>) => ({
      flexShrink: value
    }),
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({ flexBasis: value }),
    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value
    }),
    br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderRadius: value
    }),
    btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
      borderTopRightRadius: value
    }),
    bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => ({
      borderBottomRightRadius: value
    }),
    bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
      borderBottomLeftRadius: value
    }),
    btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
      borderTopLeftRadius: value
    }),
    bs: (value: Stitches.PropertyValue<'boxShadow'>) => ({ boxShadow: value }),
    lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({
      lineHeight: value
    }),
    ox: (value: Stitches.PropertyValue<'overflowX'>) => ({ overflowX: value }),
    oy: (value: Stitches.PropertyValue<'overflowY'>) => ({ overflowY: value }),
    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => ({
      pointerEvents: value
    }),
    us: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value
    }),
    userSelect: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value
    }),
    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value
    }),
    appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
      WebkitAppearance: value,
      appearance: value
    }),
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value
    }),
    linearGradient: (value: Stitches.PropertyValue<'backgroundImage'>) => ({
      backgroundImage: `linear-gradient(${value})`
    })
  },
  themeMap: {
    ...defaultThemeMap,
    width: 'space',
    height: 'space',
    minWidth: 'space',
    maxWidth: 'space',
    minHeight: 'space',
    maxHeight: 'space',
    flexBasis: 'space',
    gridTemplateColumns: 'space',
    gridTemplateRows: 'space',
    blockSize: 'space',
    minBlockSize: 'space',
    maxBlockSize: 'space',
    inlineSize: 'space',
    minInlineSize: 'space',
    maxInlineSize: 'space'
  }
});

export type CSS = Stitches.CSS<typeof config>;

export const darkTheme = createTheme('dark-theme', {
  colors: {
    accents1: '#111111',
    accents2: '#333333',
    accents3: '#444444',
    accents4: '#666666',
    accents5: '#888888',
    accents6: '#999999',
    accents7: '#eaeaea',
    accents8: '#fafafa',
    text: '#ffffff',
    background: '#000000',
    foreground: '#ffffff',
    code: '#77c8e6',
    border: '#333333',
    selection: '#ff4ecd'
  },
  shadows: {
    xs: '0 2px 10px -3px rgba(20, 20, 20, 0.1)',
    sm: '0 5px 20px -5px rgba(20, 20, 20, 0.1)',
    md: '0 8px 30px rgba(20, 20, 20, 0.15)',
    lg: '0 30px 60px rgba(20, 20, 20, 0.15)',
    xl: '0 40px 80px rgba(20, 20, 20, 0.25)'
  }
});
