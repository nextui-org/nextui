import React from 'react';
import ThemeContext from '../theme/theme-context';
import { NextUIThemeContext } from '../theme/types';

const useTheme = (): NextUIThemeContext =>
  React.useContext<NextUIThemeContext>(ThemeContext);

export default useTheme;
