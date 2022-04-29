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
    primarySolidContrast: '$black',

    secondaryLightContrast: '$purple700',
    secondary: '$purple700',
    secondaryBorder: '$purple500',
    secondaryBorderHover: '$purple600',
    secondarySolidHover: '$purple700',
    secondarySolidContrast: '$black',
    secondaryShadow: '$purple500',

    successSolidContrast: '$black',

    warningSolidContrast: '$black',

    errorSolidContrast: '$black',

    // misc
    text: '$white',
    link: '$blue700',
    codeLight: '$cyan50',
    code: '$cyan700',
    border: '$gray700',
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
