import React from 'react';
import Head from 'next/head';
import withDefaults from '@utils/with-defaults';
import { toCapitalize } from '@utils/index';

export interface HeaderProps {
  title?: string;
  description?: string;
}

const defaultProps = {
  description: 'Beautiful, fast, modern React UI Library',
};

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <Head>
      <title>
        {title ? `${toCapitalize(title)} | ` : ''}NextUI - Beautiful, fast,
        modern React UI Library
      </title>
      <meta name="description" content={description} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#181818" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default withDefaults(Header, defaultProps);
