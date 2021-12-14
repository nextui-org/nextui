import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { NextRouter, Router, useRouter } from 'next/router';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AppInitialProps } from 'next/app';
import { NextComponent } from '@lib/types';
import generateKbarActions from '@lib/kbar-actions';
import { KBarProvider } from 'kbar';

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

// const KbarComponent = dynamic(() => import('../components/kbar'), {
//   ssr: false
// });

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
  const router = useRouter();
  const kbarActions = generateKbarActions(router);

  return (
    <NextThemesProvider disableTransitionOnChange defaultTheme="system">
      <NextUIProvider>
        <KBarProvider
          actions={kbarActions}
          options={{
            animations: {
              enterMs: 250,
              exitMs: 100
            }
          }}
        >
          {/* <KbarComponent /> */}
          <Component {...pageProps} />
        </KBarProvider>
        <style global jsx>{`
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
      </NextUIProvider>
    </NextThemesProvider>
  );
};

export default Application;
