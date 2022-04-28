import { defaultThemeMap as defaultStitchesThemeMap } from '@stitches/react';
import type * as Stitches from '@stitches/react';

export const defaultTokens = {
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
    lg: '1.25rem',
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
    default: 'all 250ms ease',
    button:
      'background 0.25s ease 0s, color 0.25s ease 0s, border-color 0.25s ease 0s, box-shadow 0.25s ease 0s, transform 0.25s ease 0s, opacity 0.25s ease 0s',
    avatar: 'box-shadow 0.25s ease 0s, opacity 0.25s ease 0s',
    link: 'opacity 0.25s ease 0s, background 0.25s ease 0s',
    card: 'transform 0.25s ease 0s'
  },
  breakpoints: {
    xs: '650px',
    sm: '960px',
    md: '1280px',
    lg: '1400px',
    xl: '1920px'
  }
};

export const defaultColors = {
  // generic colors
  white: '#ffffff',
  black: '#000000',

  // brand colors
  primaryLight: '$blue50',
  primaryLightHover: '$blue100',
  primaryLightActive: '$blue200',
  primaryLightContrast: '$blue700',
  primary: '$blue600',
  primaryBorder: '$blue400',
  primaryBorderHover: '$blue500',
  primarySolidHover: '$blue700',
  primarySolidContrast: '$white',
  primaryShadow: '$blue500',

  secondaryLight: '$purple50',
  secondaryLightHover: '$purple100',
  secondaryLightActive: '$purple200',
  secondaryLightContrast: '$purple700',
  secondary: '$purple600',
  secondaryBorder: '$purple400',
  secondaryBorderHover: '$purple500',
  secondarySolidHover: '$purple700',
  secondarySolidContrast: '$white',
  secondaryShadow: '$purple500',

  successLight: '$green50',
  successLightHover: '$green100',
  successLightActive: '$green200',
  successLightContrast: '$green800',
  success: '$green600',
  successBorder: '$green400',
  successBorderHover: '$green500',
  successSolidHover: '$green700',
  successSolidContrast: '$white',
  successShadow: '$green500',

  warningLight: '$yellow50',
  warningLightHover: '$yellow100',
  warningLightActive: '$yellow200',
  warningLightContrast: '$yellow800',
  warning: '$yellow600',
  warningBorder: '$yellow400',
  warningBorderHover: '$yellow500',
  warningSolidHover: '$yellow700',
  warningSolidContrast: '$black',
  warningShadow: '$yellow500',

  errorLight: '$red50',
  errorLightHover: '$red100',
  errorLightActive: '$red200',
  errorLightContrast: '$red700',
  error: '$red600',
  errorBorder: '$red400',
  errorBorderHover: '$red500',
  errorSolidHover: '$red700',
  errorSolidContrast: '$white',
  errorShadow: '$red500',

  gradient:
    'linear-gradient(112deg, $cyan600 -63.59%, $pink600 -20.3%, $blue600 70.46%)',
  link: '$blue500',

  // accents
  accents0: '$gray50',
  accents1: '$gray100',
  accents2: '$gray200',
  accents3: '$gray300',
  accents4: '$gray400',
  accents5: '$gray500',
  accents6: '$gray600',
  accents7: '$gray700',
  accents8: '$gray800',
  accents9: '$gray900'
};

export const defaultMedia = {
  xs: `(min-width: ${defaultTokens.breakpoints.xs})`,
  sm: `(min-width: ${defaultTokens.breakpoints.sm})`,
  md: `(min-width: ${defaultTokens.breakpoints.md})`,
  lg: `(min-width: ${defaultTokens.breakpoints.lg})`,
  xl: `(min-width: ${defaultTokens.breakpoints.xl})`,
  xsMax: `(max-width: ${defaultTokens.breakpoints.xs})`,
  smMax: `(max-width: ${defaultTokens.breakpoints.sm})`,
  mdMax: `(max-width: ${defaultTokens.breakpoints.md})`,
  lgMax: `(max-width: ${defaultTokens.breakpoints.lg})`,
  xlMax: `(max-width: ${defaultTokens.breakpoints.xl})`,
  motion: '(prefers-reduced-motion: reduce)',
  safari: 'not all and (min-resolution:.001dpcm)',
  hover: '(any-hover: hover)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)'
};

export const defaultUtils = {
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
  ta: (value: Stitches.PropertyValue<'textAlign'>) => ({
    textAlign: value
  }),
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
  as: (value: Stitches.PropertyValue<'alignSelf'>) => ({
    alignSelf: value
  }),
  fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
  fs: (value: Stitches.PropertyValue<'fontSize'>) => ({
    fontSize: value
  }),
  fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({
    flexBasis: value
  }),
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
  bs: (value: Stitches.PropertyValue<'boxShadow'>) => ({
    boxShadow: value
  }),
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
  ox: (value: Stitches.PropertyValue<'overflowX'>) => ({
    overflowX: value
  }),
  oy: (value: Stitches.PropertyValue<'overflowY'>) => ({
    overflowY: value
  }),
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
  maxW: (value: Stitches.PropertyValue<'maxWidth'>) => ({
    maxWidth: value
  }),
  mh: (value: Stitches.PropertyValue<'maxHeight'>) => ({
    maxHeight: value
  }),
  maxH: (value: Stitches.PropertyValue<'maxHeight'>) => ({
    maxHeight: value
  }),
  size: (value: Stitches.PropertyValue<'width'>) => ({
    width: value,
    height: value
  }),
  minSize: (value: Stitches.PropertyValue<'width'>) => ({
    minWidth: value,
    minHeight: value,
    width: value,
    height: value
  }),
  sizeMin: (value: Stitches.PropertyValue<'width'>) => ({
    minWidth: value,
    minHeight: value,
    width: value,
    height: value
  }),
  maxSize: (value: Stitches.PropertyValue<'width'>) => ({
    maxWidth: value,
    maxHeight: value
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
  tdl: (value: Stitches.PropertyValue<'textDecorationLine'>) => ({
    textDecorationLine: value
  }),
  textGradient: (value: Stitches.PropertyValue<'backgroundImage'>) => ({
    backgroundImage: `linear-gradient(${value})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '&::selection': {
      WebkitTextFillColor: '$colors$text'
    }
  })
};

export const defaultThemeMap = {
  ...defaultStitchesThemeMap,
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
};

export default {
  prefix: 'nextui',
  theme: {
    ...defaultTokens,
    colors: defaultColors,
    shadows: {}
  },
  media: defaultMedia,
  utils: defaultUtils,
  themeMap: defaultThemeMap
};
