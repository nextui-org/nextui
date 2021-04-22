import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import CssBaseline from '@components/css-baseline';

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Next UI</title>
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
};

export default Application;
