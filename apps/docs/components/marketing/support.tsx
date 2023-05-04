import {FC, useMemo, useRef} from "react";
import {Avatar, AvatarProps, Button, Spacer, Tooltip} from "@nextui-org/react";
import {clamp, get} from "lodash";
import {useInView} from "framer-motion";

import {sectionWrapper, titleWrapper, title, subtitle} from "../primitives";

import {FeaturesGrid} from "@/components/marketing";
import {OpenCollectiveIcon, PatreonIcon, HeartBoldIcon, PlusLinearIcon} from "@/components/icons";
import {Sponsor, SPONSOR_TIERS, SPONSOR_COLORS, getTier} from "@/libs/sponsors";
import {SonarPulse} from "@/components/sonar-pulse";

export interface SupportProps {
  sponsors: Sponsor[];
}

const supportAccounts = [
  {
    title: "Open Collective",
    description: "Sponsor the NextUI maintainers.",
    icon: <OpenCollectiveIcon className="text-pink-500" />,
    href: "https://opencollective.com/nextui",
    isExternal: true,
  },
  {
    title: "Patreon",
    description: "Sponsor the creator, Junior Garcia.",
    icon: <PatreonIcon className="text-pink-500" />,
    href: "https://www.patreon.com/jrgarciadev?fan_landing=true",
    isExternal: true,
  },
];

const SONAR_PULSE_SIZE = 80;
const SONAR_PULSE_CIRCLES_COUNT = 4;
const SONAR_PULSE_RADIUS = 130;

const getSponsorName = (sponsor: Sponsor) => {
  if (!sponsor.name) {
    return "";
  }

  return sponsor.name.slice(0, 2).toUpperCase();
};

const getSponsorSize = (sponsor: Sponsor) => {
  let size: AvatarProps["size"] = "md";
  const tier = sponsor.tier || getTier(sponsor.totalAmountDonated);

  switch (tier) {
    case SPONSOR_TIERS.BRONZE:
      size = "md";
      break;
    case SPONSOR_TIERS.SILVER:
      size = "md";
      break;
    case SPONSOR_TIERS.GOLD:
      size = "xl";
      break;
    case SPONSOR_TIERS.PLATINUM:
      size = "xl";
      break;
    default:
      size = "md";
  }

  return size;
};

const getSponsorColor = (sponsor: Sponsor) => {
  const tier = sponsor.tier || getTier(sponsor.totalAmountDonated);

  return SPONSOR_COLORS[tier] || "neutral";
};

const getSponsorAvatarStyles = (index: number, sponsors: Sponsor[] = []) => {
  const angle = (index * 360) / sponsors.length;
  const radius = SONAR_PULSE_RADIUS;

  // position the avatar randomly inside the sonar pulse
  const randomRadius = clamp(Math.floor((index + 1) * radius), radius * 0.4, radius);

  const x = randomRadius * Math.cos((angle * Math.PI) / 180);
  const y = randomRadius * Math.sin((angle * Math.PI) / 180);

  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

export const Support: FC<SupportProps> = ({sponsors = []}) => {
  const sonarRef = useRef(null);

  const isInView = useInView(sonarRef, {
    margin: "110px",
  });

  const handleExternalLinkClick = (href: string) => {
    if (!href) return;
    window.open(href, "_blank");
  };

  const renderSponsors = useMemo(() => {
    if (!sponsors.length) return null;

    return (
      <div
        className="absolute rounded-full bg-transparent"
        style={{
          width: `${SONAR_PULSE_RADIUS}px`,
          top: SONAR_PULSE_RADIUS / 6,
          left: SONAR_PULSE_RADIUS / 6,
        }}
      >
        {sponsors.map((sponsor, index) => (
          <Avatar
            key={`${sponsor.MemberId}-${index}`}
            isBordered
            className="absolute cursor-pointer"
            color={getSponsorColor(sponsor) as AvatarProps["color"]}
            name={getSponsorName(sponsor)}
            size={getSponsorSize(sponsor)}
            src={sponsor.image}
            style={getSponsorAvatarStyles(index, sponsors)}
            onClick={() =>
              handleExternalLinkClick(get(sponsor, "website") || get(sponsor, "profile"))
            }
          />
        ))}
      </div>
    );
  }, [sponsors]);

  return (
    <section className={sectionWrapper({class: "flex flex-col items-center mt-16 lg:mt-44"})}>
      <div className="max-w-4xl flex flex-col gap-8">
        <div>
          <div className={titleWrapper({class: "items-center"})}>
            <div className="inline-flex items-center">
              <h1 className={title({size: "lg"})}>Support NextUI</h1>&nbsp;&nbsp;
              <HeartBoldIcon
                className="text-pink-500 animate-heartbeat"
                size={50}
                style={{
                  animationDuration: "2.5s",
                }}
              />
            </div>
          </div>
          <p
            className={subtitle({class: "md:w-full text-center flex justify-center items-center"})}
          >
            If you run a business that intends to use NextUI in a revenue-generating product, or if
            you&apos;re a freelancer and NextUI saves you time in your work, or you&apos;re just
            using it in a fun project, your contributions will help to make NextUI better.
          </p>
          <Spacer y={12} />
          <FeaturesGrid
            classNames={{
              base: "lg:grid-cols-2",
            }}
            features={supportAccounts}
          />
          <div ref={sonarRef} className="relative mt-40 w-full flex items-center justify-center">
            {isInView && (
              <SonarPulse
                circlesCount={SONAR_PULSE_CIRCLES_COUNT}
                color="#7928CA"
                icon={
                  <Tooltip
                    showArrow
                    color="secondary"
                    content={"Become a sponsor"}
                    offset={10}
                    radius="xl"
                  >
                    <Button
                      isIconOnly
                      className="z-50 w-auto h-auto bg-gradient-to-b from-[#FF1CF7] to-[#7928CA]"
                      radius="full"
                      onPress={() => handleExternalLinkClick(supportAccounts[0].href)}
                    >
                      <PlusLinearIcon
                        className="flex items-center justify-center rounded-full text-white"
                        size={54}
                      />
                    </Button>
                  </Tooltip>
                }
                playState="running"
                size={SONAR_PULSE_SIZE}
              >
                {renderSponsors}
              </SonarPulse>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
