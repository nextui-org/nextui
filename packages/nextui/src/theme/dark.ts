import { NextUIThemes, NextUIThemesPalette, NextUICommonSizes } from './types';
import { defaultPalette, defaultTheme } from './common';

export const palette: NextUIThemesPalette = {
  ...defaultPalette,
  accents_1: '#111',
  accents_2: '#333',
  accents_3: '#444',
  accents_4: '#666',
  accents_5: '#888',
  accents_6: '#999',
  accents_7: '#eaeaea',
  accents_8: '#fafafa',
  text: '#fff',
  background: '#000',
  foreground: '#fff',
  code: '#77C8E6',
  border: '#333',
  selection: '#ff4ecd'
};

export const shadows: NextUICommonSizes = {
  xs: '0 2px 10px -3px rgba(20, 20, 20, .1)',
  sm: '0 5px 20px -5px rgba(20, 20, 20, .1)',
  md: '0 8px 30px rgba(20, 20, 20, 0.15)',
  lg: '0 30px 60px rgba(20, 20, 20, 0.15)',
  xl: '0 40px 80px rgba(20, 20, 20, 0.25)'
};

export const themes: NextUIThemes = {
  ...defaultTheme,
  type: 'dark',
  palette,
  shadows
};

export default themes;
