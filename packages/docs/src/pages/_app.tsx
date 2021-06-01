import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { NextRouter, Router } from 'next/router';
import { CssBaseline, NextUIThemes, ThemeProvider } from '@nextui/react';
import { AppInitialProps } from 'next/app';
import DefaultLayout from '@layouts/default';
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
  const Layout = Component.Layout || DefaultLayout;
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Layout>
          <CssBaseline />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default Application;
