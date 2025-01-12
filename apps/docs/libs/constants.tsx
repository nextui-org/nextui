import {DiscordIcon, GithubIcon, XIcon} from "@/components/icons";
import {siteConfig} from "@/config/site";

export const TWITTER_USER_NAME = "hero_ui";
export const SITE_URL = "https://heroui.com";

export const communityAccounts = [
  {
    title: "X",
    description: "For announcements, tips and general information.",
    icon: <XIcon className="text-[#333] dark:text-[#E7E7E7]" size={28} />,
    href: siteConfig.links.twitter,
    isExternal: true,
  },
  {
    title: "Discord",
    description: "To get involved in the community, ask questions and share tips.",
    icon: <DiscordIcon className="text-[#7289DA]" size={32} />,
    href: siteConfig.links.discord,
    isExternal: true,
  },
  {
    title: "Github",
    description: "To report bugs, request features and contribute to the project.",
    icon: <GithubIcon className="text-[#333] dark:text-[#E7E7E7]" size={32} />,
    href: siteConfig.links.github,
    isExternal: true,
  },
];
