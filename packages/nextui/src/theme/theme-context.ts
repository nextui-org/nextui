import React from 'react';
import { NextUIThemes } from './index';
import defaultTheme from './default';

const ThemeContext: React.Context<NextUIThemes> = React.createContext<NextUIThemes>(
  defaultTheme
);

export default ThemeContext;
