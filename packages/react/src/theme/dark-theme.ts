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

    neutralLight: '$gray50',
    neutralLightHover: '$gray100',
    neutralLightActive: '$gray200',
    neutralSolidContrast: '$black',

    // misc
    text: '$gray900',
    link: '$blue700',
    codeLight: '$cyan50',
    code: '$cyan600',
    selection: '$pink800'
  },
  shadows: {
    xs: '-4px 0 15px rgb(0 0 0 / 50%)',
    sm: '0 5px 20px -5px rgba(20, 20, 20, 0.1)',
    md: '0 8px 30px rgba(20, 20, 20, 0.15)',
    lg: '0 30px 60px rgba(20, 20, 20, 0.15)',
    xl: '0 40px 80px rgba(20, 20, 20, 0.25)'
  }
};
