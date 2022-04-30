import { blue, purple, green, yellow, red, cyan, pink, gray } from './colors';

export default {
  colors: {
    // background colors
    background: '$white',
    foreground: '$black',
    backgroundContrast: '$white',

    //semantic colors
    ...blue,
    ...purple,
    ...green,
    ...yellow,
    ...red,
    ...cyan,
    ...pink,
    ...gray,

    // misc
    text: '$gray900',
    link: '$blue600',
    codeLight: '$pink100',
    code: '$pink600',
    selection: '$blue200'
  },
  shadows: {
    xs: '-4px 0 4px rgb(0 0 0 / 5%);',
    sm: '0 5px 20px -5px rgba(0, 0, 0, 0.1)',
    md: '0 8px 30px rgba(0, 0, 0, 0.15)',
    lg: '0 30px 60px rgba(0, 0, 0, 0.15)',
    xl: '0 40px 80px rgba(0, 0, 0, 0.25)'
  }
};
