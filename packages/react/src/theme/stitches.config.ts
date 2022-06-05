import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import commonTheme from './common';
import lightTheme from './light-theme';
import darkTheme from './dark-theme';
import deepMerge from '../utils/deep-merge';
import { Theme, BaseTheme } from './types';

export const getStitchesTheme = (targetTheme: BaseTheme): BaseTheme => {
  return deepMerge(targetTheme, commonTheme.theme);
};

const stitches = createStitches({
  ...commonTheme,
  theme: {
    ...commonTheme.theme,
    shadows: {
      ...lightTheme.shadows
    },
    dropShadows: {
      ...lightTheme.dropShadows
    },
    colors: {
      ...commonTheme.theme.colors,
      ...lightTheme.colors
    }
  }
});

export const createThemeBase = stitches.createTheme;
export const styled = stitches.styled;
export const css = stitches.css;
export const globalCss = stitches.globalCss;
export const keyframes = stitches.keyframes;
export const getCssText = stitches.getCssText;
export const theme = stitches.theme;
export const config = stitches.config;

export const createTheme = ({ type, theme, className }: Theme) => {
  if (!type) {
    throw new Error('Theme type is required');
  }
  return createThemeBase(
    className || `${type}-theme`,
    deepMerge(type === 'dark' ? darkTheme : lightTheme, theme)
  );
};

export type VariantProps<T> = Stitches.VariantProps<T>;
export type CSS = Stitches.CSS<typeof config>;
export type StitchesTheme = typeof theme;
