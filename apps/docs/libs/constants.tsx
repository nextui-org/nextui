import {DiscordIcon, GithubIcon, XIcon} from "@/components/icons";

export const TWITTER_USER_NAME = "getnextui";
export const SITE_URL = "https://nextui.org";

export const communityAccounts = [
  {
    title: "X",
    description: "For announcements, tips and general information.",
    icon: <XIcon className="text-[#333] dark:text-[#E7E7E7]" size={28} />,
    href: "https://x.com/getnextui",
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
