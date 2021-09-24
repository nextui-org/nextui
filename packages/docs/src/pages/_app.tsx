import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { NextRouter, Router } from 'next/router';
import { CssBaseline, NextUIThemes, ThemeProvider } from '@nextui-org/react';
import { AppInitialProps } from 'next/app';
import { DeepPartial } from '@utils/types';
import useDomClean from '@hooks/use-dom-clean';
import sharedTheme from '@theme/shared';
import { NextComponent } from '@lib/types';

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
  const [customTheme, setCustomTheme] = useState<DeepPartial<NextUIThemes>>({
    ...sharedTheme,
    type: 'dark',
  });
  const themeChangeHandle = (theme: DeepPartial<NextUIThemes>) => {
    setCustomTheme(theme);
  };

  useEffect(() => {
    const theme = window.localStorage.getItem('theme');

    if (theme !== 'dark') return;
    themeChangeHandle({ type: 'dark' });
  }, []);

  useDomClean();
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <>
          <CssBaseline />
          <Component {...pageProps} />
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
