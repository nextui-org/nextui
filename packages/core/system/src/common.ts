import {PropertyValue, defaultThemeMap as defaultStitchesThemeMap} from "@stitches/react";

const spaces = {
  0: "0rem",
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "2.25rem",
  "2xl": "3rem",
  "3xl": "5rem",
  "4xl": "10rem",
  "5xl": "14rem",
  "6xl": "18rem",
  "7xl": "24rem",
  "8xl": "32rem",
  "9xl": "40rem",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
  screen: "100vw",
  full: "100%",
  px: "1px",
  1: "0.125rem",
  2: "0.25rem",
  3: "0.375rem",
  4: "0.5rem",
  5: "0.625rem",
  6: "0.75rem",
  7: "0.875rem",
  8: "1rem",
  9: "1.25rem",
  10: "1.5rem",
  11: "1.75rem",
  12: "2rem",
  13: "2.25rem",
  14: "2.5rem",
  15: "2.75rem",
  16: "3rem",
  17: "3.5rem",
  18: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
};

export const defaultColors = {
  // generic colors
  white: "#ffffff",
  black: "#000000",

  // brand colors
  primaryLight: "$blue200",
  primaryLightHover: "$blue300",
  primaryLightActive: "$blue400",
  primaryLightContrast: "$blue600",
  primary: "$blue600",
  primaryBorder: "$blue500",
  primaryBorderHover: "$blue600",
  primarySolidHover: "$blue700",
  primarySolidContrast: "$white",
  primaryShadow: "$blue500",

  secondaryLight: "$purple200",
  secondaryLightHover: "$purple300",
  secondaryLightActive: "$purple400",
  secondaryLightContrast: "$purple600",
  secondary: "$purple600",
  secondaryBorder: "$purple500",
  secondaryBorderHover: "$purple600",
  secondarySolidHover: "$purple700",
  secondarySolidContrast: "$white",
  secondaryShadow: "$purple500",

  successLight: "$green200",
  successLightHover: "$green300",
  successLightActive: "$green400",
  successLightContrast: "$green700",
  success: "$green600",
  successBorder: "$green500",
  successBorderHover: "$green600",
  successSolidHover: "$green700",
  successSolidContrast: "$white",
  successShadow: "$green500",

  warningLight: "$yellow200",
  warningLightHover: "$yellow300",
  warningLightActive: "$yellow400",
  warningLightContrast: "$yellow700",
  warning: "$yellow600",
  warningBorder: "$yellow500",
  warningBorderHover: "$yellow600",
  warningSolidHover: "$yellow700",
  warningSolidContrast: "$white",
  warningShadow: "$yellow500",

  errorLight: "$red200",
  errorLightHover: "$red300",
  errorLightActive: "$red400",
  errorLightContrast: "$red600",
  error: "$red600",
  errorBorder: "$red500",
  errorBorderHover: "$red600",
  errorSolidHover: "$red700",
  errorSolidContrast: "$white",
  errorShadow: "$red500",

  neutralLight: "$gray100",
  neutralLightHover: "$gray200",
  neutralLightActive: "$gray300",
  neutralLightContrast: "$gray800",
  neutral: "$gray600",
  neutralBorder: "$gray400",
  neutralBorderHover: "$gray500",
  neutralSolidHover: "$gray600",
  neutralSolidContrast: "$white",
  neutralShadow: "$gray400",

  gradient: "linear-gradient(112deg, $cyan600 -63.59%, $pink600 -20.3%, $blue600 70.46%)",

  // accents
  accents0: "$gray50",
  accents1: "$gray100",
  accents2: "$gray200",
  accents3: "$gray300",
  accents4: "$gray400",
  accents5: "$gray500",
  accents6: "$gray600",
  accents7: "$gray700",
  accents8: "$gray800",
  accents9: "$gray900",
};

export const defaultTokens = {
  fonts: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif;",
    mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono','Courier New', monospace;",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
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
    black: 900,
  },
  lineHeights: {
    xs: 1,
    sm: 1.25,
    base: 1.5,
    md: 1.5,
    lg: 1.75,
    xl: 1.75,
    "2xl": 2,
    "3xl": 2.25,
    "4xl": 2.5,
    "5xl": 1,
    "6xl": 1,
    "7xl": 1,
    "8xl": 1,
    "9xl": 1,
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  space: {
    ...spaces,
  },
  sizes: {
    ...spaces,
    auto: "auto",
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.666667%",
    "2/6": "33.333333%",
    "3/6": "50%",
    "4/6": "66.666667%",
    "5/6": "83.333333%",
    "1/12": "8.333333%",
    "2/12": "16.666667%",
    "3/12": "25%",
    "4/12": "33.333333%",
    "5/12": "41.666667%",
    "6/12": "50%",
    "7/12": "58.333333%",
    "8/12": "66.666667%",
    "9/12": "75%",
    "10/12": "83.333333%",
    "11/12": "91.666667%",
  },
  radii: {
    xs: "7px",
    sm: "9px",
    md: "12px",
    base: "14px",
    lg: "14px",
    xl: "18px",
    "2xl": "24px",
    "3xl": "32px",
    squared: "33%",
    rounded: "50%",
    pill: "9999px",
  },
  zIndices: {
    1: "100",
    2: "200",
    3: "300",
    4: "400",
    5: "500",
    10: "1000",
    max: "9999",
  },
  borderWidths: {
    light: "1px",
    normal: "2px",
    bold: "3px",
    extrabold: "4px",
    black: "5px",
  },
  transitions: {
    default: "all 250ms ease",
    button:
      "background 0.25s ease 0s, color 0.25s ease 0s, border-color 0.25s ease 0s, box-shadow 0.25s ease 0s, transform 0.25s ease 0s, opacity 0.25s ease 0s",
    avatar: "box-shadow 0.25s ease 0s, opacity 0.25s ease 0s",
    card: "transform 0.25s ease 0s, filter 0.25s ease 0s, box-shadow 0.25s ease 0s",
    dropdownItem:
      "background 0.12s ease, transform 0.12s ease, color 0.12s ease, box-shadow 0.12s ease 0s",
  },
  colors: defaultColors,
};

export const defaultMedia = {
  xs: "(min-width: 650px)",
  sm: "(min-width: 960px)",
  md: "(min-width: 1280px)",
  lg: "(min-width: 1400px)",
  xl: "(min-width: 1920px)",
  xsMin: "(min-width: 650px)",
  smMin: "(min-width: 960px)",
  mdMin: "(min-width: 1280px)",
  lgMin: "(min-width: 1400px)",
  xlMin: "(min-width: 1920px)",
  xsMax: "(max-width: 650px)",
  smMax: "(max-width: 960px)",
  mdMax: "(max-width: 1280px)",
  lgMax: "(max-width: 1400px)",
  xlMax: "(max-width: 1920px)",
  motion: "(prefers-reduced-motion: reduce)",
  safari: "not all and (min-resolution:.001dpcm)",
  hover: "(any-hover: hover)",
  dark: "(prefers-color-scheme: dark)",
  light: "(prefers-color-scheme: light)",
};

export const defaultUtils = {
  p: (value: PropertyValue<"padding">) => ({
    padding: value,
  }),
  pt: (value: PropertyValue<"paddingTop">) => ({
    paddingTop: value,
  }),
  pr: (value: PropertyValue<"paddingRight">) => ({
    paddingRight: value,
  }),
  pb: (value: PropertyValue<"paddingBottom">) => ({
    paddingBottom: value,
  }),
  pl: (value: PropertyValue<"paddingLeft">) => ({
    paddingLeft: value,
  }),
  px: (value: PropertyValue<"paddingLeft">) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (value: PropertyValue<"paddingTop">) => ({
    paddingTop: value,
    paddingBottom: value,
  }),
  m: (value: PropertyValue<"margin">) => ({
    margin: value,
  }),
  mt: (value: PropertyValue<"marginTop">) => ({
    marginTop: value,
  }),
  mr: (value: PropertyValue<"marginRight">) => ({
    marginRight: value,
  }),
  mb: (value: PropertyValue<"marginBottom">) => ({
    marginBottom: value,
  }),
  ml: (value: PropertyValue<"marginLeft">) => ({
    marginLeft: value,
  }),
  mx: (value: PropertyValue<"marginLeft">) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: PropertyValue<"marginTop">) => ({
    marginTop: value,
    marginBottom: value,
  }),
  ta: (value: PropertyValue<"textAlign">) => ({
    textAlign: value,
  }),
  tt: (value: PropertyValue<"textTransform">) => ({
    textTransform: value,
  }),
  to: (value: PropertyValue<"textOverflow">) => ({
    textOverflow: value,
  }),
  d: (value: PropertyValue<"display">) => ({display: value}),
  dflex: (value: PropertyValue<"alignItems">) => ({
    display: "flex",
    alignItems: value,
    justifyContent: value,
  }),
  fd: (value: PropertyValue<"flexDirection">) => ({
    flexDirection: value,
  }),
  fw: (value: PropertyValue<"flexWrap">) => ({flexWrap: value}),
  ai: (value: PropertyValue<"alignItems">) => ({
    alignItems: value,
  }),
  ac: (value: PropertyValue<"alignContent">) => ({
    alignContent: value,
  }),
  jc: (value: PropertyValue<"justifyContent">) => ({
    justifyContent: value,
  }),
  as: (value: PropertyValue<"alignSelf">) => ({
    alignSelf: value,
  }),
  fg: (value: PropertyValue<"flexGrow">) => ({flexGrow: value}),
  fs: (value: PropertyValue<"fontSize">) => ({
    fontSize: value,
  }),
  fb: (value: PropertyValue<"flexBasis">) => ({
    flexBasis: value,
  }),
  bc: (value: PropertyValue<"backgroundColor">) => ({
    backgroundColor: value,
  }),
  bf: (value: PropertyValue<"backdropFilter">) => ({
    backdropFilter: value,
  }),
  bg: (value: PropertyValue<"backgroundColor">) => ({
    background: value,
  }),
  bgBlur: (value: PropertyValue<"backgroundColor">) => ({
    bf: "saturate(180%) blur(10px)",
    bg: value,
  }),
  bgColor: (value: PropertyValue<"backgroundColor">) => ({
    backgroundColor: value,
  }),
  backgroundClip: (value: PropertyValue<"backgroundClip">) => ({
    WebkitBackgroundClip: value,
    backgroundClip: value,
  }),
  bgClip: (value: PropertyValue<"backgroundClip">) => ({
    WebkitBackgroundClip: value,
    backgroundClip: value,
  }),
  br: (value: PropertyValue<"borderRadius">) => ({
    borderRadius: value,
  }),
  bw: (value: PropertyValue<"borderWidth">) => ({
    borderWidth: value,
  }),
  btrr: (value: PropertyValue<"borderTopRightRadius">) => ({
    borderTopRightRadius: value,
  }),
  bbrr: (value: PropertyValue<"borderBottomRightRadius">) => ({
    borderBottomRightRadius: value,
  }),
  bblr: (value: PropertyValue<"borderBottomLeftRadius">) => ({
    borderBottomLeftRadius: value,
  }),
  btlr: (value: PropertyValue<"borderTopLeftRadius">) => ({
    borderTopLeftRadius: value,
  }),
  bs: (value: PropertyValue<"boxShadow">) => ({
    boxShadow: value,
  }),
  ds: (value: PropertyValue<"boxShadow">) => ({
    dropShadow: value,
  }),
  shadow: (value: PropertyValue<"boxShadow">) => ({
    boxShadow: value,
  }),
  dshadow: (value: PropertyValue<"boxShadow">) => ({
    dropShadow: value,
  }),
  dropShadow: (value: PropertyValue<"boxShadow">) => ({
    filter: `$dropShadows${value}`,
  }),
  normalShadow: (value: PropertyValue<"backgroundColor">) => ({
    boxShadow: `0 4px 14px 0 $colors${value}`,
  }),
  normalShadowVar: (value: PropertyValue<"backgroundColor">) => ({
    boxShadow: `0 4px 14px 0 ${value}`,
  }),
  lh: (value: PropertyValue<"lineHeight">) => ({
    lineHeight: value,
  }),
  ov: (value: PropertyValue<"overflow">) => ({overflow: value}),
  ox: (value: PropertyValue<"overflowX">) => ({
    overflowX: value,
  }),
  oy: (value: PropertyValue<"overflowY">) => ({
    overflowY: value,
  }),
  pe: (value: PropertyValue<"pointerEvents">) => ({
    pointerEvents: value,
  }),
  events: (value: PropertyValue<"pointerEvents">) => ({
    pointerEvents: value,
  }),
  us: (value: PropertyValue<"userSelect">) => ({
    WebkitUserSelect: value,
    userSelect: value,
  }),
  userSelect: (value: PropertyValue<"userSelect">) => ({
    WebkitUserSelect: value,
    userSelect: value,
  }),
  w: (value: PropertyValue<"width">) => ({width: value}),
  h: (value: PropertyValue<"height">) => ({height: value}),
  mw: (value: PropertyValue<"maxWidth">) => ({maxWidth: value}),
  maxW: (value: PropertyValue<"maxWidth">) => ({
    maxWidth: value,
  }),
  mh: (value: PropertyValue<"maxHeight">) => ({
    maxHeight: value,
  }),
  maxH: (value: PropertyValue<"maxHeight">) => ({
    maxHeight: value,
  }),
  size: (value: PropertyValue<"width">) => ({
    width: value,
    height: value,
  }),
  minSize: (value: PropertyValue<"width">) => ({
    minWidth: value,
    minHeight: value,
    width: value,
    height: value,
  }),
  sizeMin: (value: PropertyValue<"width">) => ({
    minWidth: value,
    minHeight: value,
    width: value,
    height: value,
  }),
  maxSize: (value: PropertyValue<"width">) => ({
    maxWidth: value,
    maxHeight: value,
  }),
  sizeMax: (value: PropertyValue<"width">) => ({
    maxWidth: value,
    maxHeight: value,
  }),
  appearance: (value: PropertyValue<"appearance">) => ({
    WebkitAppearance: value,
    appearance: value,
  }),
  scale: (value: PropertyValue<"scale">) => ({
    transform: `scale(${value})`,
  }),
  linearGradient: (value: PropertyValue<"backgroundImage">) => ({
    backgroundImage: `linear-gradient(${value})`,
  }),
  tdl: (value: PropertyValue<"textDecorationLine">) => ({
    textDecorationLine: value,
  }),
  truncateText: (value: PropertyValue<"width">) => ({
    maxWidth: value,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  textGradient: (value: PropertyValue<"backgroundImage">) => ({
    backgroundImage: `linear-gradient(${value})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    "&::selection": {
      WebkitTextFillColor: "$colors$text",
    },
  }),
};

export const defaultThemeMap = {
  ...defaultStitchesThemeMap,
};

export default {
  prefix: "nextui",
  theme: {
    ...defaultTokens,
    shadows: {},
    dropShadows: {},
  },
  media: defaultMedia,
  utils: defaultUtils,
  themeMap: defaultThemeMap,
};

/**
 * Common theme types
 */

// defaultTokens
export type Fonts = typeof defaultTokens.fonts;
export type FontSizes = typeof defaultTokens.fontSizes;
export type FontWeights = typeof defaultTokens.fontWeights;
export type LineHeights = typeof defaultTokens.lineHeights;
export type LetterSpacings = typeof defaultTokens.letterSpacings;
export type Space = typeof defaultTokens.space;
export type Sizes = typeof defaultTokens.sizes;
export type Radii = typeof defaultTokens.radii;
export type ZIndices = typeof defaultTokens.zIndices;
export type BorderWidths = typeof defaultTokens.borderWidths;
export type Transitions = typeof defaultTokens.transitions;
export type Colors = typeof defaultColors;

export type TokensGroup = {
  fonts: Fonts;
  fontSizes: FontSizes;
  fontWeights: FontWeights;
  lineHeights: LineHeights;
  letterSpacings: LetterSpacings;
  space: Space;
  sizes: Sizes;
  radii: Radii;
  zIndices: ZIndices;
  borderWidths: BorderWidths;
  transitions: Transitions;
  colors: Colors;
};

// defaultMedia
export type Media = typeof defaultMedia;

// defaultUtils
export type Utils = typeof defaultUtils;

// defaultThemeMap
export type ThemeMap = typeof defaultThemeMap;
