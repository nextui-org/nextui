import React, { PropsWithChildren, useState, useEffect } from 'react';
import useTheme from '../use-theme';
import ThemeContext from './theme-context';
import { NextUIThemes } from './index';
import { ThemeParam, getThemeByType, mergeTheme, switchTheme } from './utils';
import { ThemeTypes } from '../utils/prop-types';
import withDefaults from '../utils/with-defaults';
import useSSR from '../use-ssr';

export interface Props {
  theme?: ThemeParam;
  type?: ThemeTypes;
  isDark?: boolean;
  storageKey?: string;
  syncStorage?: boolean;
}

const defaultProps = {
  storageKey: 'theme',
  syncStorage: true
};

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  theme,
  type,
  storageKey,
  syncStorage,
  isDark
}) => {
  const customTheme = theme as NextUIThemes;
  const [currentThemeType, setCurrentThemeType] = useState<
    ThemeTypes | undefined
  >(customTheme?.type || type || isDark ? 'dark' : undefined);

  const currentTheme = useTheme();
  const { isBrowser } = useSSR();

  const changeTypeBaseEl = (el: HTMLElement) => {
    const documentTheme = el?.getAttribute('data-theme');
    documentTheme && setCurrentThemeType(documentTheme);
  };

  useEffect(() => {
    if (!isBrowser || !storageKey || !syncStorage) return;
    const storageTheme = localStorage.getItem(storageKey);
    if (storageTheme && currentThemeType && currentThemeType !== storageTheme) {
      localStorage.setItem(storageKey, currentThemeType);
    }
  }, [syncStorage, storageKey, currentThemeType]);

  useEffect(() => {
    if (!isBrowser) return;
    const observer = new MutationObserver((mutation) => {
      if (
        mutation &&
        mutation.length > 0 &&
        mutation[0]?.target.nodeName === 'BODY'
      ) {
        const documentTheme = document?.body?.dataset?.theme;
        documentTheme && setCurrentThemeType(documentTheme);
      } else {
        changeTypeBaseEl(document?.documentElement);
      }
    });

    if (!currentThemeType) {
      changeTypeBaseEl(document?.documentElement);
      observer.observe(document?.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
      observer.observe(document?.body, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }
    return () => observer.disconnect();
  }, [isBrowser]);

  const baseTheme = currentThemeType
    ? getThemeByType(currentThemeType)
    : currentTheme;
  const merged = mergeTheme(baseTheme, customTheme);
  const userTheme =
    currentTheme.type !== merged.type ? switchTheme(merged) : merged;

  return (
    <ThemeContext.Provider value={userTheme}>{children}</ThemeContext.Provider>
  );
};

export default withDefaults(ThemeProvider, defaultProps);
