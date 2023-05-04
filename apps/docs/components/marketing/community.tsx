import {Spacer} from "@nextui-org/react";

import {sectionWrapper, titleWrapper, title, subtitle} from "../primitives";

import {FeaturesGrid} from "@/components/marketing";
import {DiscordIcon, GithubIcon, TwitterIcon} from "@/components/icons";

export interface CommunityProps {
  twitter?: string;
  github?: string;
  discord?: string;
}

const communityAccounts = [
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

export const Community = () => {
  return (
    <section className={sectionWrapper({class: "flex flex-col items-center mt-16 lg:mt-44"})}>
      <div className="max-w-4xl flex flex-col gap-8">
        <div>
          <div className={titleWrapper({class: "items-center"})}>
            <div className="inline-flex items-center">
              <h1 className={title({size: "lg"})}>Community</h1>&nbsp;&nbsp;
            </div>
          </div>
          <p
            className={subtitle({class: "md:w-full text-center flex justify-center items-center"})}
          >
            Get involved in our community. Everyone is welcome!
          </p>
          <Spacer y={12} />
          <FeaturesGrid
            classNames={{
              base: "lg:grid-cols-3",
              iconWrapper: "bg-transparent",
              body: "pt-0",
            }}
            features={communityAccounts}
          />
        </div>
      </div>
    </section>
  );
};
