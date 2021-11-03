import { NextUIThemes } from '../theme';
import css from 'styled-jsx/css';

export function getFocusStyles(theme: NextUIThemes) {
  return css.resolve`
    :focus {
      outline: none;
      box-shadow: 0 0 0 2px
          ${theme.type === 'dark'
            ? theme.palette.accents_2
            : theme.palette.background},
        0 0 0 4px ${theme.palette.primary} !important;
    }
    :focus:not(:focus-visible) {
      box-shadow: none !important;
    }
  `;
}
