import commonTheme from './common';
import defaultTheme from './light-theme';
import { ThemeType, TokenValue, TokenKeyName } from './types';
import clsx from '../utils/clsx';

export const getTokenValue = (token: TokenKeyName, tokenName: string) => {
  if (!document || !token) return '';
  let docStyle = getComputedStyle(document.documentElement);
  const tokenKey = `--${commonTheme.prefix}-${token}-${tokenName}`;
  const tokenValue = docStyle.getPropertyValue(tokenKey);
  if (tokenValue && tokenValue.includes('var')) {
    getTokenValue(token, tokenValue);
  }
  return tokenValue;
};

export const getDocumentCSSTokens = () => {
  const colorKeys = [
    ...Object.keys(commonTheme.theme.colors),
    ...Object.keys(defaultTheme.colors)
  ];

  const shadowKeys = Object.keys(defaultTheme.shadows);

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
      const color = getTokenValue('colors', crr);
      if (color) {
        acc[crr] = {
          prefix: commonTheme.prefix,
          scale: 'colors',
          token: crr,
          value: color
        };
      }
      return acc;
    },
    {}
  );

  const shadowTokens = shadowKeys.reduce(
    (acc: { [key in string]?: TokenValue }, crr: string) => {
      const shadow = getTokenValue('shadows', crr);
      if (shadow) {
        acc[crr] = {
          prefix: commonTheme.prefix,
          scale: 'shadows',
          token: crr,
          value: shadow
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

export const getThemeName = (theme: ThemeType | string) => {
  if (typeof theme === 'string') {
    return theme?.includes('-theme') ? theme?.replace('-theme', '') : theme;
  }
  return theme;
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
      .filter((stl) => !stl.includes('color-scheme') && stl.length)
      .map((el) => `${el};`) || [];

  el?.setAttribute('class', clsx(prevClasses, `${getThemeName(theme)}-theme`));
  el?.setAttribute('style', clsx(prevStyles, `color-scheme: ${theme};`));
};
