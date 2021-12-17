import React from 'react';
import { theme as defaultTheme, StitchesTheme } from './stitches.config';
import { ThemeType } from './types';

export type ThemeContextType = {
  isDark: boolean;
  theme: StitchesTheme;
  type: ThemeType;
};

const defaultContext: ThemeContextType = {
  isDark: false,
  theme: defaultTheme,
  type: 'light'
};

const ThemeContext: React.Context<ThemeContextType> =
  React.createContext<ThemeContextType>(defaultContext);

export default ThemeContext;
