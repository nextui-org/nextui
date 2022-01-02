import React from 'react';
import Head from 'next/head';
import withDefaults from '@utils/with-defaults';
import { toCapitalize } from '@utils/index';
import { isProd } from '@utils/index';
import { TWITTER_USER_NAME, SITE_URL } from '@lib/constants';
import { useTheme } from '@nextui-org/react';

export interface HeaderProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const defaultProps = {
  description: 'Beautiful, fast, modern React UI Library',
  image: '/twitter-cards/nextui.png'
};

if (global.document) {
  const info = [`Let's make the Web prettier 🚀`];

  for (const message of info) {
    // eslint-disable-next-line no-console
    console.log(message);
  }
}

const Header: React.FC<HeaderProps> = ({ title, description, image, url }) => {
  const { theme, isDark } = useTheme();

  let pageTitle = title ? `${toCapitalize(title)} | ` : '';
  pageTitle += 'NextUI - Beautiful, fast,modern React UI Library';
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} />
      <meta
        name="twitter:card"
        content={image ? 'summary_large_image' : 'summary'}
      />
      {image && (
        <meta
          property="og:image"
          content={image.startsWith('https://') ? image : `${SITE_URL}${image}`}
        />
      )}
      <meta property="og:title" content={pageTitle} key="title" />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta
        name="msapplication-TileColor"
        content={
          isDark ? theme?.colors?.black?.value : theme?.colors?.white?.value
        }
      />
      <meta
        name="theme-color"
        content={
          isDark ? theme?.colors?.black?.value : theme?.colors?.white?.value
        }
      />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
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
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color={
          isDark ? theme?.colors?.black?.value : theme?.colors?.white?.value
        }
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      {isProd && (
        <script
          defer
          data-domain="nextui.org"
          src="https://plausible.io/js/plausible.js"
        />
      )}
    </Head>
  );
};

export default withDefaults(Header, defaultProps);
