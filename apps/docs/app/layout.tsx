import "@/styles/globals.css";
import "@/styles/sandpack.css";
import {Metadata, Viewport} from "next";
import {clsx} from "@nextui-org/shared-utils";

import {Providers} from "./providers";

import {Cmdk} from "@/components/cmdk";
import manifest from "@/config/routes.json";
import {siteConfig} from "@/config/site";
import {fonts} from "@/config/fonts";
import {Navbar} from "@/components/navbar";
import {Footer} from "@/components/footer";
import {ProBanner} from "@/components/pro-banner";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "NextUI",
    "React Aria",
    "Server Components",
    "React Components",
    "UI Components",
    "UI Kit",
    "UI Library",
    "UI Framework",
    "UI Design System",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  twitter: siteConfig.twitter,
  openGraph: siteConfig.openGraph,
  authors: [
    {
      name: "getnextui",
      url: "https://x.com/getnextui",
    },
  ],
  creator: "getnextui",
  alternates: {
    canonical: "https://nextui.org",
    types: {
      "application/rss+xml": [{url: "https://nextui.org/feed.xml", title: "NextUI RSS Feed"}],
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    {color: "#f4f4f5", media: "(prefers-color-scheme: light)"},
    {color: "#111111", media: "(prefers-color-scheme: dark)"},
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning dir="ltr" lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fonts.sans.variable,
          fonts.mono.variable,
        )}
      >
        <Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
          <div className="relative flex flex-col" id="app-container">
            <ProBanner />
            <Navbar mobileRoutes={manifest.mobileRoutes} routes={manifest.routes} />
            {children}
            <Footer />
          </div>
          <Cmdk />
        </Providers>
      </body>
    </html>
  );
}
