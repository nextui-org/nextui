import {
  NextUIThemes,
  NextUIThemesPalette,
  NextUIThemesExpressiveness,
} from './index';
import { defaultFont, defaultBreakpoints, defaultLayout } from './shared';

export const palette: NextUIThemesPalette = {
  accents_1: '#f6f6f6',
  accents_2: '#eaeaea',
  accents_3: '#999',
  accents_4: '#888',
  accents_5: '#666',
  accents_6: '#444',
  accents_7: '#333',
  accents_8: '#111',
  text: '#2c3e50',
  white: '#fff',
  background: '#fff',
  foreground: '#000',
  selection: '#5AC8FA',
  primary: '#0070f3',
  secondary: '#7928ca',
  code: '#f81ce5',
  border: '#eaeaea',
  error: '#f21361',
  errorLight: '#e85186',
  errorLighter: '#f59aba',
  errorDark: '#e3001e',
  success: '#17c964',
  successLight: '#6ec293',
  successLighter: '#9bc7ae',
  successDark: '#009c22',
  warning: '#f5a623',
  warningLight: '#f7b955',
  warningLighter: '#ffefcf',
  warningDark: '#ab570a',
  cyan: '#50e3c2',
  cyanLighter: '#aaffec',
  cyanLight: '#79ffe1',
  cyanDark: '#29bc9b',
  violet: '#7928ca',
  violetLighter: '#e3d7fc',
  violetLight: '#8a63d2',
  violetDark: '#4c2889',
  purple: '#f81ce5',
  alert: '#ff0080',
  magenta: '#eb367f',
  link: '#0070f3',
};

export const expressiveness: NextUIThemesExpressiveness = {
  linkStyle: 'none',
  linkHoverStyle: 'none',
  dropdownBoxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.02)',
  scrollerStart: 'rgba(255, 255, 255, 1)',
  scrollerEnd: 'rgba(255, 255, 255, 0)',
  shadowSmall: '0 5px 10px rgba(0, 0, 0, 0.12)',
  shadowMedium: '0 8px 30px rgba(0, 0, 0, 0.12)',
  shadowLarge: '0 30px 60px rgba(0, 0, 0, 0.12)',
  portalOpacity: 0.25,
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
  expressiveness,
};

export default themes;
