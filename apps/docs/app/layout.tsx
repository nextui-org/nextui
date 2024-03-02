import "@/styles/globals.css";
import "@/styles/sandpack.css";
import {Metadata} from "next";
import Script from "next/script";
import {clsx} from "@nextui-org/shared-utils";

import {Providers} from "./providers";

import {Cmdk} from "@/components/cmdk";
import manifest from "@/config/routes.json";
import {siteConfig} from "@/config/site";
import {fontSans} from "@/config/fonts";
import {Navbar} from "@/components/navbar";
import {Footer} from "@/components/footer";
import {ProBanner} from "@/components/pro-banner";
import {ScriptProviders} from "@/components/scripts/script-providers";

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
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
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
      name: "jrgarciadev",
      url: "https://jrgarciadev.com",
    },
  ],
  creator: "jrgarciadev",
  alternates: {
    canonical: "https://nextui.org",
    types: {
      "application/rss+xml": [{url: "https://nextui.org/feed.xml", title: "NextUI RSS Feed"}],
    },
  },
  viewport:
    "viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning dir="ltr" lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
          <div className="relative flex flex-col" id="app-container">
            <ProBanner />
            <Navbar mobileRoutes={manifest.mobileRoutes} routes={manifest.routes} />
            {children}
            <Footer />
          </div>
          <Cmdk />
        </Providers>
        <Script
          defer
          data-modal-disclaimer="This is a custom LLM for NextUI with access to all developer docs (nextui.org/docs) and GitHub Issues and PRs (github.com/nextui-org/nextui)."
          data-modal-example-questions="How do I install for Next.js?,How do I customize primary color?"
          data-project-color="#000000"
          data-project-logo="https://avatars.githubusercontent.com/u/86160567?s=280&v=4"
          data-project-name="NextUI"
          data-website-id="e733a73f-980e-4f7d-9e8b-91867453f899"
          src="https://widget.kapa.ai/kapa-widget.bundle.js"
          strategy="afterInteractive"
        />
        {__PROD__ && <Analytics />}
        <Script id="featurebase-sdk" src="https://do.featurebase.app/js/sdk.js" />
        <ScriptProviders />
      </body>
    </html>
  );
}
