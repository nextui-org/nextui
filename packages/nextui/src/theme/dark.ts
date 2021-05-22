import {
  NextUIThemes,
  NextUIThemesPalette,
  NextUIThemesExpressiveness,
} from './index';
import { defaultFont, defaultBreakpoints, defaultLayout } from './shared';
import commonPalette from './common';

export const palette: NextUIThemesPalette = {
  ...commonPalette,
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
  code: '#79ffe1',
  border: '#333',
};

export const expressiveness: NextUIThemesExpressiveness = {
  linkStyle: 'none',
  linkHoverStyle: 'none',
  dropdownBoxShadow: '0 0 0 1px #333',
  scrollerStart: 'rgba(255, 255, 255, 1)',
  scrollerEnd: 'rgba(255, 255, 255, 0)',
  shadowSmall: '0 0 0 1px #333',
  shadowMedium: '0 0 0 1px #333',
  shadowLarge: '0 0 0 1px #333',
  portalOpacity: 0.75,
};

export const font = defaultFont;

export const breakpoints = defaultBreakpoints;

export const layout = defaultLayout;

export const themes: NextUIThemes = {
  type: 'dark',
  font,
  layout,
  palette,
  breakpoints,
  expressiveness,
};

export default themes;
