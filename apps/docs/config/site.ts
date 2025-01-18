export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "HeroUI (Previously NextUI) - Beautiful, fast and modern React UI Library",
  description: "Make beautiful websites regardless of your design experience.",
  ogImage: "https://heroui.com/heroui.jpg",
  author: "Junior Garcia",
  email: "jrgarciadev@gmail.com",
  siteUrl: "https://heroui.com",
  creator: "@hero_ui",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://heroui.com",
    siteName: "HeroUI (Previously NextUI)",
    description: "Beautiful, fast and modern React UI Library",
    images: [
      {
        url: "https://heroui.com/heroui.jpg",
        width: 1200,
        height: 630,
        alt: "HeroUI (Previously NextUI)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HeroUI (Previously NextUI) - Beautiful, fast and modern React UI Library",
    description: "Make beautiful websites regardless of your design experience.",
    image: "https://heroui.com/heroui.jpg",
    creator: "@hero_ui",
  },
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://x.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
    portfolio: "https://jrgarciadev.com",
  },
};
