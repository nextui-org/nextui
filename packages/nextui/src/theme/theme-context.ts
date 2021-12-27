import React from 'react';
import { theme } from './stitches.config';
import { NextUIThemeContext } from './types';

export const defaultContext: NextUIThemeContext = {
  isDark: false,
  theme,
  type: 'light'
};

const ThemeContext: React.Context<NextUIThemeContext> =
  React.createContext<NextUIThemeContext>(defaultContext);

export default ThemeContext;
