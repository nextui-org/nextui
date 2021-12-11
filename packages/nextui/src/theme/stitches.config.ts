import { createStitches, defaultThemeMap } from '@stitches/react';
import type * as Stitches from '@stitches/react';

export type VariantProps<T> = Stitches.VariantProps<T>;

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
      // generic colors
      white: '#ffffff',
      black: '#000000',
      //semantic colors
      blue100: '#CBECFE',
      blue200: '#98D5FD',
      blue300: '#64B8FB',
      blue400: '#3D9CF7',
      blue500: '#0070F3',
      blue600: '#0056D0',
      blue700: '#0040AE',
      blue800: '#002D8C',
      blue900: '#002074',
      purple100: '#F0D3FC',
      purple200: '#DDA9F9',
      purple300: '#C17CEF',
      purple400: '#A258DF',
      purple500: '#7928ca',
      purple600: '#5E1DAD',
      purple700: '#461491',
      purple800: '#310C75',
      purple900: '#220760',
      green100: '#CFFCD1',
      green200: '#A1F9AC',
      green300: '#6FEE8D',
      green400: '#4ADE7B',
      green500: '#17c964',
      green600: '#10AC63',
      green700: '#0B905F',
      green800: '#077457',
      green900: '#046050',
      yellow100: '#FEF4D2',
      yellow200: '#FEE7A6',
      yellow300: '#FCD57A',
      yellow400: '#F9C258',
      yellow500: '#f5a623',
      yellow600: '#D28519',
      yellow700: '#B06811',
      yellow800: '#8E4D0B',
      yellow900: '#753A06',
      red100: '#fdd7e3',
      red200: '#FDA0A5',
      red300: '#FB7085',
      red400: '#F74C77',
      red500: '#f21361',
      red600: '#D00D65',
      red700: '#AE0963',
      red800: '#8C065C',
      red900: '#740357',
      cyan100: '#EEFFF4',
      cyan200: '#DDFFED',
      cyan300: '#CCFFE9',
      cyan400: '#BFFFEA',
      cyan500: '#AAFFEC',
      cyan600: '#7CDBCF',
      cyan700: '#55B7B4',
      cyan800: '#368D93',
      cyan900: '#206C7A',
      pink100: '#FFDBE7',
      pink200: '#FFB8D6',
      pink300: '#FF94CC',
      pink400: '#FF7ACC',
      pink500: '#ff4ecd',
      pink600: '#DB39BD',
      pink700: '#B727AA',
      pink800: '#921893',
      pink900: '#6E0E7A',
      gray100: '#F4F4F4',
      gray200: '#EAEAEA',
      gray300: '#C1C1C1',
      gray400: '#848484',
      gray500: '#333333',
      gray600: '#2B2525',
      gray700: '#24191B',
      gray800: '#1D1013',
      gray900: '#18090E',
      // brand colors
      primaryLight: '$blue100',
      primary: '$blue500',
      primaryDark: '$blue600',

      secondaryLight: '$purple100',
      secondary: '$purple500',
      secondaryDark: '$purple600',

      successLight: '$green100',
      success: '$green500',
      successDark: '$green600',

      warningLight: '$yellow100',
      warning: '$yellow500',
      warningDark: '$yellow600',

      errorLight: '$red100',
      error: '$red500',
      errorDark: '$red600',

      gradient:
        'linear-gradient(112deg, $cyan500 -63.59%, $pink500 -20.3%, $blue500 70.46%)',
      link: '$blue500',

      accents1: '$gray100',
      accents2: '$gray200',
      accents3: '$gray300',
      accents4: '$gray400',
      accents5: '$gray500',
      accents6: '$gray600',
      accents7: '$gray700',
      accents8: '$gray800',
      accents9: '$gray900',
      text: '$gray500',
      background: '$white',
      foreground: '$black',
      code: '$pink500',
      border: '$gray200',
      selection: '$blue200'
    },
    fonts: {
      sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif;",
      mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono','Courier New', monospace;"
    },
    fontSizes: {
      tiny: '.75rem',
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
      lg: '1.375rem',
      xl: '2.25rem',
      px: '1px',
      1: '0.125rem',
      2: '0.25rem',
      3: '0.375rem',
      4: '0.5rem',
      5: '0.625rem',
      6: '0.75rem',
      7: '0.875rem',
      8: '1rem',
      9: '1.25rem',
      10: '1.5rem',
      11: '1.75rem',
      12: '2rem',
      13: '2.25rem',
      14: '2.5rem',
      15: '2.75rem',
      16: '3rem',
      17: '3.5rem',
      18: '4rem',
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
      xs: '7px',
      sm: '9px',
      md: '12px',
      base: '14px',
      lg: '14px',
      xl: '18px',
      squared: '33%',
      rounded: '50%',
      pill: '9999px'
    },
    shadows: {
      xs: '-4px 0 4px rgb(0 0 0 / 5%);',
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
      10: '1000',
      max: '9999'
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
    },
    breakpoints: {
      xs: '650px',
      sm: '960px',
      md: '1280px',
      lg: '1400px',
      xl: '1920px'
    }
  },
  media: {
    xs: '(min-width: 650px)',
    sm: '(min-width: 960px)',
    md: '(min-width: 1280px)',
    lg: '(min-width: 1400px)',
    xl: '(min-width: 1920px)',
    xsMax: '(max-width: 650px)',
    smMax: '(max-width: 960px)',
    mdMax: '(max-width: 1280px)',
    lgMax: '(max-width: 1400px)',
    xlMax: '(max-width: 1920px)',
    motion: '(prefers-reduced-motion)',
    safari: 'not all and (min-resolution:.001dpcm)',
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
    tt: (value: Stitches.PropertyValue<'textTransform'>) => ({
      textTransform: value
    }),
    to: (value: Stitches.PropertyValue<'textOverflow'>) => ({
      textOverflow: value
    }),
    d: (value: Stitches.PropertyValue<'display'>) => ({ display: value }),
    dflex: (value: Stitches.PropertyValue<'alignItems'>) => ({
      display: 'flex',
      alignItems: value,
      justifyContent: value
    }),
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
    fs: (value: Stitches.PropertyValue<'fontSize'>) => ({
      fontSize: value
    }),
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({ flexBasis: value }),
    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value
    }),
    bf: (value: Stitches.PropertyValue<'backdropFilter'>) => ({
      backdropFilter: value
    }),
    bg: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      background: value
    }),
    bgBlur: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      bf: 'saturate(180%) blur(10px)',
      bg: `${value}66`
    }),
    bgColor: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value
    }),
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value
    }),
    bgClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value
    }),
    br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderRadius: value
    }),
    bw: (value: Stitches.PropertyValue<'borderWidth'>) => ({
      borderWidth: value
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
    normalShadow: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      boxShadow: `0 4px 14px 0 $colors${value}`
    }),
    normalShadowVar: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      boxShadow: `0 4px 14px 0 ${value}`
    }),
    lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({
      lineHeight: value
    }),
    ov: (value: Stitches.PropertyValue<'overflow'>) => ({ overflow: value }),
    ox: (value: Stitches.PropertyValue<'overflowX'>) => ({ overflowX: value }),
    oy: (value: Stitches.PropertyValue<'overflowY'>) => ({ overflowY: value }),
    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => ({
      pointerEvents: value
    }),
    events: (value: Stitches.PropertyValue<'pointerEvents'>) => ({
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
    w: (value: Stitches.PropertyValue<'width'>) => ({ width: value }),
    h: (value: Stitches.PropertyValue<'height'>) => ({ height: value }),
    mw: (value: Stitches.PropertyValue<'maxWidth'>) => ({ maxWidth: value }),
    maxW: (value: Stitches.PropertyValue<'maxWidth'>) => ({ maxWidth: value }),
    mh: (value: Stitches.PropertyValue<'maxHeight'>) => ({ maxHeight: value }),
    maxH: (value: Stitches.PropertyValue<'maxHeight'>) => ({
      maxHeight: value
    }),
    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value
    }),
    sizeMin: (value: Stitches.PropertyValue<'width'>) => ({
      minWidth: value,
      minHeight: value,
      width: value,
      height: value
    }),
    sizeMax: (value: Stitches.PropertyValue<'width'>) => ({
      maxWidth: value,
      maxHeight: value
    }),
    appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
      WebkitAppearance: value,
      appearance: value
    }),
    scale: (value: Stitches.PropertyValue<'scale'>) => ({
      transform: `scale(${value})`
    }),
    linearGradient: (value: Stitches.PropertyValue<'backgroundImage'>) => ({
      backgroundImage: `linear-gradient(${value})`
    }),
    textGradient: (value: Stitches.PropertyValue<'backgroundImage'>) => ({
      backgroundImage: `linear-gradient(${value})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
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
    maxInlineSize: 'space',
    borderWidth: 'borderWeights'
  }
});

export type CSS = Stitches.CSS<typeof config>;
export type Theme = typeof theme;

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
    xs: '-4px 0 15px rgb(0 0 0 / 50%)',
    sm: '0 5px 20px -5px rgba(20, 20, 20, 0.1)',
    md: '0 8px 30px rgba(20, 20, 20, 0.15)',
    lg: '0 30px 60px rgba(20, 20, 20, 0.15)',
    xl: '0 40px 80px rgba(20, 20, 20, 0.25)'
  }
});

export const sharedFocus = css({
  WebkitTapHighlightColor: 'transparent',
  '&:focus:not(&:focus-visible)': {
    boxShadow: 'none'
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px $colors$background, 0 0 0 4px $colors$primary'
  },
  '@safari': {
    WebkitTapHighlightColor: 'transparent',
    outline: 'none'
  }
});

export const sharedVisuallyHidden = css({
  border: '0px',
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '1px',
  width: '1px',
  margin: '-1px',
  padding: '0px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'absolute'
});
