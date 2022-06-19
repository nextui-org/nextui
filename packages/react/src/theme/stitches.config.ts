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
export const baseTheme = commonTheme;

export const createTheme = ({ type, theme, className }: Theme) => {
  if (!type) {
    throw new Error('Theme type is required');
  }
  return createThemeBase(
    className || `${type}-theme`,
    deepMerge(type === 'dark' ? darkTheme : lightTheme, theme)
  );
};

// stitches types
export type VariantProps<T> = Stitches.VariantProps<T>;
export type PropertyValue<T extends keyof Stitches.CSSProperties> =
  Stitches.PropertyValue<T>;
export type CSSProperties = Stitches.CSSProperties;
export type CSS = Stitches.CSS<typeof config>;
export type StitchesTheme = typeof theme;

// common theme types
export type Spaces = typeof commonTheme.theme['space'];
export type FontSizes = typeof commonTheme.theme['fontSizes'];
export type Fonts = typeof commonTheme.theme['fonts'];
export type FontWeights = typeof commonTheme.theme['fontWeights'];
export type LineHeights = typeof commonTheme.theme['lineHeights'];
export type LetterSpacings = typeof commonTheme.theme['letterSpacings'];
export type Colors = typeof commonTheme.theme['colors'];
export type Radii = typeof commonTheme.theme['radii'];
export type zIndices = typeof commonTheme.theme['zIndices'];
export type BorderWeights = typeof commonTheme.theme['borderWeights'];
export type Tranistions = typeof commonTheme.theme['transitions'];
export type Breakpoints = typeof commonTheme.theme['breakpoints'];
