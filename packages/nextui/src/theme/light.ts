import { NextUIThemes, NextUIThemesPalette, NextUICommonSizes } from './types';
import { defaultPalette, defaultTheme } from './common';

export const palette: NextUIThemesPalette = {
  ...defaultPalette,
  accents_1: '#f6f6f6',
  accents_2: '#eaeaea',
  accents_3: '#999',
  accents_4: '#888',
  accents_5: '#666',
  accents_6: '#444',
  accents_7: '#333',
  accents_8: '#111',
  text: '#333',
  background: '#fff',
  foreground: '#000',
  code: '#f81ce5',
  border: '#eaeaea',
  selection: '#0070f3'
};

export const shadows: NextUICommonSizes = {
  xs: '0 2px 10px -3px rgba(0, 0, 0, .1)',
  sm: '0 5px 20px -5px rgba(0, 0, 0, .1)',
  md: '0 8px 30px rgba(0, 0, 0, 0.15)',
  lg: '0 30px 60px rgba(0, 0, 0, 0.15)',
  xl: '0 40px 80px rgba(0, 0, 0, 0.25)'
};

export const themes: NextUIThemes = {
  ...defaultTheme,
  type: 'light',
  palette,
  shadows
};

export default themes;
