export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "HeroUI (Previously NextUI) - Beautiful, fast and modern React UI Library",
  description: "Make beautiful websites regardless of your design experience.",
  ogImage: "https://heroui.org/twitter-cards/heroui.jpeg",
  author: "Junior Garcia",
  email: "jrgarciadev@gmail.com",
  siteUrl: "https://heroui.org",
  creator: "@hero_ui",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://heroui.org",
    siteName: "HeroUI (Previously NextUI)",
    description: "Beautiful, fast and modern React UI Library",
    images: [
      {
        url: "https://heroui.org/twitter-cards/heroui.jpeg",
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
    image: "https://heroui.org/twitter-cards/heroui.jpeg",
    creator: "@hero_ui",
  },
  links: {
    github: "https://github.com/frontioai/heroui",
    twitter: "https://x.com/hero_ui",
    docs: "https://heroui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
    portfolio: "https://jrgarciadev.com",
  },
};
