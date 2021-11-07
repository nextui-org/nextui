import { NextUIThemes } from '../theme';
import { detectBrowser } from './dom';
import css from 'styled-jsx/css';

export function getFocusStyles(theme: NextUIThemes) {
  const isSafari = detectBrowser('Safari') || detectBrowser('WebKit');
  return isSafari
    ? css.resolve`
        -webkit-tap-highlight-color: transparent;
        outline: none;
      `
    : css.resolve`
        -webkit-tap-highlight-color: transparent;
        :focus:not(:focus-visible) {
          box-shadow: none !important;
        }
        :focus {
          outline: none;
          box-shadow: 0 0 0 2px ${theme.palette.background},
            0 0 0 4px ${theme.palette.primary} !important;
        }
      `;
}
