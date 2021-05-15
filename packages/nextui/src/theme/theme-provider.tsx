import React, { PropsWithChildren } from 'react';
import useTheme from '@hooks/use-theme';
import ThemeContext from './theme-context';
import { ThemeParam, mergeTheme, switchTheme } from './utils';

export interface Props {
  theme?: ThemeParam;
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  theme,
}) => {
  const customTheme = theme;
  const currentTheme = useTheme();
  const merged = mergeTheme(currentTheme, customTheme);
  const userTheme =
    currentTheme.type !== merged.type ? switchTheme(merged) : merged;

  return (
    <ThemeContext.Provider value={userTheme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
