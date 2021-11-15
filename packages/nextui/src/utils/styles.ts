import { detectBrowser } from './dom';
import { NextUISpaces, NextUISpacesKeys } from './default-props';
import { NextUIThemes } from '../theme';
import { getSpaceTransform } from './spaces';
import { flattenArray } from './collections';
import { getSpacings } from './dimensions';
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

export function getSpacingsStyles(theme: NextUIThemes, props: NextUISpaces) {
  const spacings: NextUISpacesKeys = getSpacings(theme, props);
  try {
    let cssStyles = {} as { [key: string]: string };
    const cssStylesArray = flattenArray(
      Object.entries(spacings).map(([key, value]) => {
        const transforms = getSpaceTransform(key as keyof NextUISpaces);
        return Array.isArray(transforms)
          ? transforms.map((el) => {
              return { [el]: value };
            })
          : transforms
          ? { [transforms]: value }
          : {};
      })
    );
    cssStyles = cssStylesArray.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, cssStyles);
    return cssStyles || {};
  } catch (error) {
    return {};
  }
}
