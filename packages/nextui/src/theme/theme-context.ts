import React from 'react';
import { NextUITheme, theme as defaultTheme } from './stitches.config';
import { ThemeTypes } from '../utils/prop-types';

export type ThemeContextType = {
  theme: NextUITheme;
  isDark: boolean;
  type: ThemeTypes;
};

const defaultContext: ThemeContextType = {
  theme: defaultTheme,
  isDark: false,
  type: 'light'
};

const ThemeContext: React.Context<ThemeContextType> =
  React.createContext<ThemeContextType>(defaultContext);

export default ThemeContext;
