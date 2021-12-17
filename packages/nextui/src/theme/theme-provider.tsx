import React, { PropsWithChildren, useState, useMemo, useEffect } from 'react';
import CssBaseline from '../css-baseline';
import ThemeContext, { ThemeContextType } from './theme-context';
import defaultDarkTheme from './dark-theme';
import defaultLightTheme from './light-theme';
import { theme as defaultTheme, createTheme } from './stitches.config';
import withDefaults from '../utils/with-defaults';
import { NextUITheme, ThemeType } from './types';
import deepMerge from '../utils/deep-merge';
import { copyObject } from '../utils/object';
import { SsrProvider } from './ssr-provider';
import useSSR from '../use-ssr';

export interface Props {
  theme: NextUITheme;
  disableBaseline?: boolean;
}

const defaultProps = {
  disableBaseline: false
};

export type ThemeProviderProps = Props & typeof defaultProps;

const ThemeProvider: React.FC<PropsWithChildren<ThemeProviderProps>> = ({
  theme,
  disableBaseline,
  children
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(
    theme?.type ?? 'light'
  );

  const { isBrowser } = useSSR();

  const { mergedTheme, stitchesTheme } = useMemo(() => {
    const selectedTheme =
      currentTheme === 'dark' ? defaultDarkTheme : defaultLightTheme;

    const userTheme = deepMerge(selectedTheme, theme?.theme);

    const stitchesTheme = createTheme(`${currentTheme}-theme`, userTheme);

    let defaultThemeClone = deepMerge(copyObject(defaultTheme), stitchesTheme);

    return {
      mergedTheme: defaultThemeClone,
      stitchesTheme
    };
  }, [currentTheme, theme]);

  const providerValue = useMemo<ThemeContextType>(() => {
    return {
      theme: mergedTheme,
      type: currentTheme,
      isDark: currentTheme === 'dark'
    };
  }, [currentTheme]);

  const changeCurrentTheme = (type: ThemeType) => {
    if (type !== 'dark' && type !== 'light') {
      return;
    }
    setCurrentTheme((ct) => (ct !== type ? (type as ThemeType) : ct));
  };

  const changeTypeBaseEl = (el: HTMLElement) => {
    const documentTheme =
      el?.getAttribute('data-theme') ||
      el?.getAttribute('style')?.replace('color-scheme: ', '').replace(';', '');
    documentTheme && changeCurrentTheme(documentTheme as ThemeType);
  };

  useEffect(() => {
    document?.body?.setAttribute('class', stitchesTheme);
  }, [stitchesTheme]);

  useEffect(() => {
    if (!isBrowser) return;
    const observer = new MutationObserver((mutation) => {
      if (
        mutation &&
        mutation.length > 0 &&
        mutation[0]?.target.nodeName === 'BODY'
      ) {
        const documentTheme = document?.body?.dataset?.theme;
        documentTheme && changeCurrentTheme(documentTheme as ThemeType);
      } else {
        changeTypeBaseEl(document?.documentElement);
      }
    });

    changeTypeBaseEl(document?.documentElement);

    observer.observe(document?.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'style']
    });

    observer.observe(document?.body, {
      attributes: true,
      attributeFilter: ['data-theme', 'style']
    });

    return () => observer.disconnect();
  }, [isBrowser]);

  return (
    <SsrProvider>
      <ThemeContext.Provider value={providerValue}>
        {!disableBaseline && <CssBaseline />}
        {children}
      </ThemeContext.Provider>
    </SsrProvider>
  );
};

export default withDefaults(ThemeProvider, defaultProps);
