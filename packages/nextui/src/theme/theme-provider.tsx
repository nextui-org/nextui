import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import CssBaseline from '../css-baseline';
import ThemeContext, { ThemeContextType } from './theme-context';
import { NextUITheme, theme as lightTheme, darkTheme } from './stitches.config';
import { ThemeTypes } from '../utils/prop-types';
import withDefaults from '../utils/with-defaults';

export interface Props {
  type?: ThemeTypes;
  defaultTheme?: ThemeTypes;
  customTheme?: NextUITheme;
  isDark?: boolean;
  disableBaseline?: boolean;
}

const defaultProps = {
  disableBaseline: false
};

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  type,
  customTheme,
  defaultTheme,
  disableBaseline,
  isDark
}) => {
  const getDefaultTheme = useCallback(() => {
    if (defaultTheme === 'dark') {
      return darkTheme;
    }
    return lightTheme;
  }, [defaultTheme]);

  const theme = useMemo(
    () =>
      customTheme
        ? customTheme
        : isDark || type === 'dark'
        ? darkTheme
        : getDefaultTheme(),
    [isDark, customTheme, getDefaultTheme, type]
  ) as NextUITheme;

  const providerValue = useMemo<ThemeContextType>(() => {
    return {
      theme,
      type: type || isDark ? 'dark' : 'light',
      isDark: isDark || type === 'dark'
    };
  }, []);

  return (
    <ThemeContext.Provider value={providerValue}>
      <div id="__nextui" className={theme}>
        {!disableBaseline && <CssBaseline />}
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default withDefaults(ThemeProvider, defaultProps);
