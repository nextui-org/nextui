import localFont from "next/font/local";

const fontSans = localFont({
  src: [
    {
      path: "../public/assets/fonts/Inter-Light.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/assets/fonts/Inter-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/assets/fonts/Inter-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/assets/fonts/Inter-SemiBold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/assets/fonts/Inter-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "../public/assets/fonts/Inter-ExtraBold.woff2",
      style: "normal",
      weight: "800",
    },
    {
      path: "../public/assets/fonts/Inter-Black.woff2",
      style: "normal",
      weight: "900",
    },
  ],
  variable: "--font-sans",
});

const fontMono = localFont({
  src: [
    {
      path: "../public/assets/fonts/FiraCode-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/assets/fonts/FiraCode-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/assets/fonts/FiraCode-SemiBold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/assets/fonts/FiraCode-Bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-mono",
});

export const fonts = {
  mono: fontMono,
  sans: fontSans,
};
