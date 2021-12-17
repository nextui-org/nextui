import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import defaultTheme from './common';
import lightTheme from './light-theme';
import deepMerge from '../utils/deep-merge';
import { Theme } from './types';

export const getStitchesTheme = (targetTheme: Theme): Theme => {
  return deepMerge(targetTheme, defaultTheme.theme);
};

export const {
  styled,
  css,
  theme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  config
} = createStitches({
  ...defaultTheme,
  theme: {
    ...defaultTheme.theme,
    shadows: {
      ...lightTheme.shadows
    },
    colors: {
      ...defaultTheme.theme.colors,
      ...lightTheme.colors
    }
  }
});

export const sharedFocus = css({
  WebkitTapHighlightColor: 'transparent',
  '&:focus:not(&:focus-visible)': {
    boxShadow: 'none'
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px $colors$background, 0 0 0 4px $colors$primary'
  },
  '@safari': {
    WebkitTapHighlightColor: 'transparent',
    outline: 'none'
  }
});

export const sharedVisuallyHidden = css({
  border: '0px',
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '1px',
  width: '1px',
  margin: '-1px',
  padding: '0px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'absolute'
});

export type VariantProps<T> = Stitches.VariantProps<T>;
export type CSS = Stitches.CSS<typeof config>;
export type StitchesTheme = typeof theme;
