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
    xs: '0 2px 8px 1px rgb(0 0 0 / 0.07), 0 1px 1px -1px rgb(0 0 0 / 0.04)',
    sm: '0 2px 8px 2px rgb(0 0 0 / 0.07), 0 2px 4px -1px rgb(0 0 0 / 0.04)',
    md: '0 12px 20px 6px rgb(0 0 0 / 0.08)',
    lg: '0 12px 34px 6px rgb(0 0 0 / 0.18)',
    xl: '0 25px 65px 0px rgb(0 0 0 / 0.35)'
  },
  dropShadows: {
    xs: 'drop-shadow(0 2px 4px rgb(0 0 0 / 0.07)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.04))',
    sm: 'drop-shadow(0 2px 8px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 4px rgb(0 0 0 / 0.04))',
    md: 'drop-shadow(0 4px 12px rgb(0 0 0 / 0.08)) drop-shadow(0 20px 8px rgb(0 0 0 / 0.04))',
    lg: 'drop-shadow(0 12px 24px rgb(0 0 0 / 0.15)) drop-shadow(0 12px 14px rgb(0 0 0 / 0.1))',
    xl: 'drop-shadow(0 25px 34px rgb(0 0 0 / 0.35))'
  }
};
