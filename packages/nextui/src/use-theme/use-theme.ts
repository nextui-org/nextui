import React from 'react';
import ThemeContext, { ThemeContextType } from '../theme/theme-context';

const useTheme = (): ThemeContextType =>
  React.useContext<ThemeContextType>(ThemeContext);

export default useTheme;
