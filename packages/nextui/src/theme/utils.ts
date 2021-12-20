import commonTheme from './common';
import defaultTheme from './light-theme';
import { TokenValue } from './types';

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
