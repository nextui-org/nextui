import React from "react";
import {DM_Sans} from "next/font/google";
import {Analytics} from "@vercel/analytics/react";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider} from "next-themes";
import {NextPage} from "next";
import {AppProps} from "next/app";
import {debounce} from "lodash";
import NProgress from "nprogress";

import RouterEvents from "@/libs/router-events";
import {__PROD__} from "@/utils";
import "../styles/globals.css";
import "../styles/sandpack.css";

NProgress.configure({parent: "#app-container"});

const start = debounce(NProgress.start, 100);

RouterEvents.on("routeChangeStart", start);
RouterEvents.on("routeChangeComplete", () => {
  start.cancel();
  NProgress.done();
});
RouterEvents.on("routeChangeError", () => {
  start.cancel();
  NProgress.done();
});

const Application: NextPage<AppProps<{}>> = ({Component, pageProps}) => {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
        {__PROD__ && <Analytics />}
      </ThemeProvider>
    </NextUIProvider>
  );
};

const sans = DM_Sans({
  variable: "--font-sans",
  adjustFontFallback: true,
  display: "optional",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ],
  preload: true,
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const fonts = {
  sans: sans.style.fontFamily,
};

export default Application;
