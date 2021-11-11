import {
  NextUIThemes,
  NextUIThemesPalette,
  NextUIThemesExpressiveness
} from './index';
import { defaultFont, defaultBreakpoints, defaultLayout } from './shared';
import commonPalette from './common';

export const palette: NextUIThemesPalette = {
  ...commonPalette,
  accents_1: '#f6f6f6',
  accents_2: '#eaeaea',
  accents_3: '#999',
  accents_4: '#888',
  accents_5: '#666',
  accents_6: '#444',
  accents_7: '#333',
  accents_8: '#111',
  text: '#333',
  white: '#fff',
  background: '#fff',
  foreground: '#000',
  code: '#f81ce5',
  border: '#eaeaea',
  selection: '#0070f3'
};

export const expressiveness: NextUIThemesExpressiveness = {
  linkStyle: 'none',
  linkHoverStyle: 'none',
  dropdownBoxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.02)',
  scrollerStart: 'rgba(255, 255, 255, 1)',
  scrollerEnd: 'rgba(255, 255, 255, 0)',
  shadowSmall: '0 5px 20px -5px rgba(0, 0, 0, .1)',
  shadowMedium: '0 8px 30px rgba(0, 0, 0, 0.15)',
  shadowLarge: '0 30px 60px rgba(0, 0, 0, 0.15)',
  portalOpacity: 0.25
};

export const font = defaultFont;

export const breakpoints = defaultBreakpoints;

export const layout = defaultLayout;

export const themes: NextUIThemes = {
  type: 'light',
  font,
  layout,
  palette,
  breakpoints,
  expressiveness
};

export default themes;
