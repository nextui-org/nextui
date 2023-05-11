import {DiscordIcon, GithubIcon, TwitterIcon} from "@/components/icons";

export const TWITTER_USER_NAME = "getnextui";
export const SITE_URL = "https://nextui.org";

export const communityAccounts = [
  {
    title: "Twitter",
    description: "For announcements, tips and general information.",
    icon: <TwitterIcon className="text-[#00ACEE]" size={32} />,
    href: "https://twitter.com/getnextui",
    isExternal: true,
  },
  {
    title: "Discord",
    description: "To get involved in the community, ask questions and share tips.",
    icon: <DiscordIcon className="text-[#7289DA]" size={32} />,
    href: "https://discord.gg/9b6yyZKmH4",
    isExternal: true,
  },
  {
    title: "Github",
    description: "To report bugs, request features and contribute to the project.",
    icon: <GithubIcon className="text-[#333] dark:text-[#E7E7E7]" size={32} />,
    href: "https://github.com/nextui-org/nextui",
    isExternal: true,
  },
];
