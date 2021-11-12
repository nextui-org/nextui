import React, { PropsWithChildren } from 'react';
import useTheme from '../use-theme';
import ThemeContext from './theme-context';
import { NextUIThemes } from './index';
import { ThemeParam, getThemeByType, mergeTheme, switchTheme } from './utils';
import { ThemeTypes } from '../utils/prop-types';

export interface Props {
  theme?: ThemeParam;
  type?: ThemeTypes;
  isDark?: boolean;
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  theme,
  type,
  isDark
}) => {
  const customTheme = theme as NextUIThemes;
  const currentTheme = useTheme();
  const themeType = customTheme?.type || type;
  const baseTheme = themeType
    ? getThemeByType(themeType)
    : isDark
    ? getThemeByType('dark')
    : currentTheme;
  const merged = mergeTheme(baseTheme, customTheme);
  const userTheme =
    currentTheme.type !== merged.type ? switchTheme(merged) : merged;

  return (
    <ThemeContext.Provider value={userTheme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
