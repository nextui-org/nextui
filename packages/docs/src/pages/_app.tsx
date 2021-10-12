import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { NextRouter, Router } from 'next/router';
import { CssBaseline, NextUIThemes, ThemeProvider } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';
import { AppInitialProps } from 'next/app';
import { DeepPartial } from '@utils/types';
import { NextComponent } from '@lib/types';
import sharedTheme from '@theme/shared';

type AppPropsType<
  R extends NextRouter = NextRouter,
  P = {}
> = AppInitialProps & {
  Component: NextComponent<P>;
  router: R;
  __N_SSG?: boolean;
  __N_SSP?: boolean;
};

type AppProps<P = {}> = AppPropsType<Router, P>;

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);
  const [customTheme, setCustomTheme] = useState<DeepPartial<NextUIThemes>>({
    ...sharedTheme,
  });

  const themeChangeHandle = (isDark: boolean) => {
    if (customTheme.type === 'dark' && !isDark) {
      setCustomTheme({
        ...customTheme,
        type: 'light',
      });
    } else if (customTheme.type === 'light' && isDark) {
      setCustomTheme({
        ...customTheme,
        type: 'dark',
      });
    }
  };

  useDarkMode(true, {
    onChange: themeChangeHandle,
  });

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('darkMode')
      ? 'dark'
      : 'light';
    setCustomTheme((prevTheme) => ({
      ...prevTheme,
      type: savedTheme || 'dark',
    }));
    setMounted(true);
  }, []);

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <>
          <CssBaseline />
          {mounted && <Component {...pageProps} />}
        </>
        <style global jsx>{`
          html {
            scroll-behavior: smooth;
          }
          .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
          }
          .npm__react-simple-code-editor__textarea {
            padding: 0px !important; /* remove padding to textarea to avoid wrong cursor in live editor */
          }
        `}</style>
      </ThemeProvider>
    </>
  );
};

export default Application;
