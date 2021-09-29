import React from 'react';
import ThemeContext from '../theme/theme-context';
import { NextUIThemes } from '../theme';

const useTheme = (): NextUIThemes =>
  React.useContext<NextUIThemes>(ThemeContext);

export default useTheme;
