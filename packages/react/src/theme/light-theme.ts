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
    xs: '0 1px 3px 0 rgb(17 24 28 / 0.1), 0 1px 2px -1px rgb(17 24 28 / 0.1)',
    sm: '0 4px 6px -1px rgb(17 24 28 / 0.1), 0 2px 4px -2px rgb(17 24 28 / 0.1)',
    md: '0 10px 15px -3px rgb(17 24 28 / 0.1), 0 4px 6px -4px rgb(17 24 28 / 0.1)',
    lg: '0 20px 25px -5px rgb(17 24 28 / 0.1), 0 8px 10px -6px rgb(17 24 28 / 0.1)',
    xl: '0 25px 50px -12px rgb(17 24 28 / 0.25)'
  },
  dropShadows: {
    xs: 'drop-shadow(0 1px 2px rgb(17 24 28 / 0.1)) drop-shadow(0 1px 1px rgb(17 24 28 / 0.06))',
    sm: 'drop-shadow(0 4px 3px rgb(17 24 28 / 0.07)) drop-shadow(0 2px 2px rgb(17 24 28 / 0.06))',
    md: 'drop-shadow(0 10px 8px rgb(17 24 28 / 0.04)) drop-shadow(0 4px 3px rgb(17 24 28 / 0.1))',
    lg: 'drop-shadow(0 20px 13px rgb(17 24 28 / 0.03)) drop-shadow(0 8px 5px rgb(17 24 28 / 0.08))',
    xl: 'drop-shadow(0 25px 25px rgb(17 24 28 / 0.15))'
  }
};
