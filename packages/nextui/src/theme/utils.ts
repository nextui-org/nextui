import commonTheme from './common';
import defaultTheme from './light-theme';
import { ThemeType, TokenValue } from './types';
import clsx from '../utils/clsx';

export const getDocumentCSSTokens = () => {
  const colorKeys = [
    ...Object.keys(commonTheme.theme.colors),
    ...Object.keys(defaultTheme.colors)
  ];

  const shadowKeys = Object.keys(defaultTheme.shadows);

  let docStyle = getComputedStyle(document.documentElement);
  /**
   * accents1: {
   *    prefix: "nextui"
   *    scale: "colors"
   *    token: "accents1"
   *    value: "var(--nextui-colors-gray100)"
   * }
   */
  const colorTokens = colorKeys.reduce(
    (acc: { [key in string]?: TokenValue }, crr: string) => {
      const colorKey = `--${commonTheme.prefix}-colors-${crr}`;
      const color = docStyle.getPropertyValue(colorKey);
      if (color) {
        acc[crr] = {
          prefix: commonTheme.prefix,
          scale: 'colors',
          token: crr,
          value: `var(${colorKey})`
        };
      }
      return acc;
    },
    {}
  );

  const shadowTokens = shadowKeys.reduce(
    (acc: { [key in string]?: TokenValue }, crr: string) => {
      const shadowKey = `--${commonTheme.prefix}-shadows-${crr}`;
      const shadow = docStyle.getPropertyValue(shadowKey);
      if (shadow) {
        acc[crr] = {
          prefix: commonTheme.prefix,
          scale: 'shadows',
          token: crr,
          value: `var(${shadowKey})`
        };
      }
      return acc;
    },
    {}
  );

  return {
    colors: colorTokens,
    shadows: shadowTokens
  };
};

/**
 * Returns active theme according to the given document
 */
export const getDocumentTheme = (el: HTMLElement) => {
  const styleAttrValues =
    el
      ?.getAttribute('style')
      ?.split(';')
      .map((el) => el.trim())
      .filter((el) => el.includes('color-scheme')) || [];

  const colorScheme =
    styleAttrValues.length > 0
      ? styleAttrValues[0].replace('color-scheme: ', '').replace(';', '')
      : '';

  const documentTheme = el?.getAttribute('data-theme');

  return documentTheme || colorScheme;
};

export const changeTheme = (theme: ThemeType | string) => {
  if (!document) return;
  const el = document.documentElement;

  const prevClasses =
    el
      ?.getAttribute('class')
      ?.split(' ')
      .filter(
        (cls) =>
          !cls.includes('theme') &&
          !cls.includes('light') &&
          !cls.includes('dark')
      ) || [];
  const prevStyles =
    el
      ?.getAttribute('style')
      ?.split(';')
      .filter((stl) => !stl.includes('color-scheme'))
      .map((el) => `${el};`) || [];

  el?.setAttribute('class', clsx(prevClasses, `${theme}-theme`));
  el?.setAttribute('style', clsx(prevStyles, `color-scheme: ${theme};`));
};
