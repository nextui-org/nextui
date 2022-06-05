import {
  blueDark,
  greenDark,
  purpleDark,
  yellowDark,
  redDark,
  cyanDark,
  pinkDark,
  grayDark
} from './colors';

export default {
  colors: {
    // background
    background: '$black',
    foreground: '$white',
    backgroundContrast: '$accents0',

    //semantic colors
    ...blueDark,
    ...purpleDark,
    ...greenDark,
    ...yellowDark,
    ...redDark,
    ...cyanDark,
    ...pinkDark,
    ...grayDark,

    // brand colors
    primaryLight: '$blue50',
    primaryLightHover: '$blue100',
    primaryLightActive: '$blue200',
    primaryLightContrast: '$blue600',

    secondaryLight: '$purple50',
    secondaryLightHover: '$purple100',
    secondaryLightActive: '$purple200',
    secondaryLightContrast: '$purple800',
    secondary: '$purple700',
    secondaryBorder: '$purple500',
    secondaryBorderHover: '$purple600',
    secondarySolidHover: '$purple700',
    secondaryShadow: '$purple500',

    successLight: '$green50',
    successLightHover: '$green100',
    successLightActive: '$green200',

    warningLight: '$yellow50',
    warningLightHover: '$yellow100',
    warningLightActive: '$yellow200',

    errorLight: '$red50',
    errorLightHover: '$red100',
    errorLightActive: '$red200',
    errorLightContrast: '$red700',

    neutralLight: '$gray200',
    neutralLightHover: '$gray300',
    neutralLightActive: '$gray400',
    neutralSolidContrast: '$white',

    // misc
    text: '$gray900',
    link: '$blue700',
    codeLight: '$cyan50',
    code: '$cyan600',
    selection: '$pink800'
  },
  shadows: {
    xs: '0 1px 3px 0 rgb(22 24 26 / 0.1), 0 1px 2px -1px rgb(22 24 26 / 0.1)',
    sm: '0 4px 6px -1px rgb(22 24 26 / 0.1), 0 2px 4px -2px rgb(22 24 26 / 0.1)',
    md: '0 10px 15px -3px rgb(22 24 26 / 0.1), 0 4px 6px -4px rgb(22 24 26 / 0.1)',
    lg: '0 20px 25px -5px rgb(22 24 26 / 0.1), 0 8px 10px -6px rgb(22 24 26 / 0.1)',
    xl: '0 25px 50px -12px rgb(22 24 26 / 0.25)'
  },
  dropShadows: {
    xs: 'drop-shadow(0 1px 2px rgb(22 24 26 / 0.1)) drop-shadow(0 1px 1px rgb(22 24 26 / 0.06))',
    sm: 'drop-shadow(0 4px 3px rgb(22 24 26 / 0.07)) drop-shadow(0 2px 2px rgb(22 24 26 / 0.06))',
    md: 'drop-shadow(0 10px 8px rgb(22 24 26 / 0.04)) drop-shadow(0 4px 3px rgb(22 24 26 / 0.1))',
    lg: 'drop-shadow(0 20px 13px rgb(22 24 26 / 0.03)) drop-shadow(0 8px 5px rgb(22 24 26 / 0.08))',
    xl: 'drop-shadow(0 25px 25px rgb(22 24 26 / 0.15))'
  }
};
