import React from "react";
import NextHead from "next/head";
import {useTheme} from "next-themes";

import {TWITTER_USER_NAME, SITE_URL} from "@/libs/constants";

export interface HeaderProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

if (global.document) {
  const info = [`Let's make the Web prettier 🚀`];

  for (const message of info) {
    // eslint-disable-next-line no-console
    console.log(message);
  }
}

export const Head: React.FC<HeaderProps> = ({
  title,
  description = "Make beautiful websites regardless of your design experience.",
  image = "/twitter-cards/nextui.jpeg",
  url,
}) => {
  const {theme} = useTheme();

  const isDark = theme === "dark";
  let pageTitle = title ? `${title} | ` : "";

  pageTitle += "NextUI - Beautiful, fast and modern React UI Library";

  return (
    <NextHead>
      <title>{pageTitle}</title>
      <meta content={`@${TWITTER_USER_NAME}`} name="twitter:site" />
      <meta content={image ? "summary_large_image" : "summary"} name="twitter:card" />
      {image && (
        <meta
          content={image.startsWith("https://") ? image : `${SITE_URL}${image}`}
          property="og:image"
        />
      )}
      <meta key="title" content={pageTitle} property="og:title" />
      {url && <meta content={url} property="og:url" />}
      <meta content={description} property="og:description" />
      <meta content={description} name="description" />
      <meta content={isDark ? "#000000" : "#FFFFFF"} name="msapplication-TileColor" />
      <meta content={isDark ? "#000000" : "#FFFFFF"} name="theme-color" />
      <meta
        key="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        name="viewport"
      />
      <link href="/favicon.ico" rel="icon" />
      <link href="/manifest.json" rel="manifest" />
      <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link color={isDark ? "#000000" : "#FFFFFF"} href="/safari-pinned-tab.svg" rel="mask-icon" />
    </NextHead>
  );
};
