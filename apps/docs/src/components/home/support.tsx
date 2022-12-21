import React, {useState, useMemo} from "react";
import {Heart, OpenCollectiveLogo, PatreonLogo, Plus, FeaturesGrid, SonarPulse} from "@components";
import {Section, Title, Subtitle} from "@primitives";
import {styled, Row, Spacer, Tooltip, Avatar, AvatarProps} from "@nextui-org/react";
import {InView} from "react-intersection-observer";
import {Sponsor, SPONSOR_TIERS, SPONSOR_COLORS} from "@lib/docs/sponsors";
import {pulse} from "@utils/animations";
import {clamp} from "lodash";

const supportAccounts = [
  {
    title: "Open Collective",
    description: "Sponsor the NextUI maintainers.",
    icon: <OpenCollectiveLogo fill="#FF4ECD" />,
    href: "https://opencollective.com/nextui",
    isExternal: true,
  },
  {
    title: "Patreon",
    description: "Sponsor the creator, Junior Garcia.",
    icon: <PatreonLogo fill="#FF4ECD" />,
    href: "https://www.patreon.com/jrgarciadev?fan_landing=true",
    isExternal: true,
  },
];

const SONAR_PULSE_SIZE = 80;
const SONAR_PULSE_CIRCLES_COUNT = 4;
const SONAR_PULSE_RADIUS = 130;

const StyledPlusWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background: "linear-gradient(180deg, #FF1CF7 0%, #7928CA 100%)",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  transition: "opacity 0.25s ease",
  "&:active": {
    opacity: 0.8,
  },
});

const StyledSponsorsWrapper = styled("div", {
  position: "absolute",
  size: SONAR_PULSE_RADIUS,
  borderRadius: "50%",
  background: "transparent",
  top: (SONAR_PULSE_RADIUS / 2) * -1,
  left: (SONAR_PULSE_RADIUS / 2) * -1,
});

export interface SupportSectionProps {
  sponsors: Sponsor[];
}

const SupportSection: React.FC<SupportSectionProps> = ({sponsors = []}) => {
  const [isSonarVisible, setIsSonarVisible] = useState(false);

  const handleExternalLinkClick = (href: string) => {
    if (!href) return;
    window.open(href, "_blank");
  };

  const getSponsorName = (sponsor: Sponsor) => {
    if (!sponsor.name) {
      return "";
    }

    return sponsor.name.slice(0, 2).toUpperCase();
  };

  const getSponsorSize = (sponsor: Sponsor) => {
    let size: AvatarProps["size"] = "md";

    switch (sponsor.tier) {
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
    return SPONSOR_COLORS[sponsor.tier] || "default";
  };

  const getSponsorCss = (index: number) => {
    const angle = (index * 360) / sponsors.length;
    const radius = SONAR_PULSE_RADIUS;

    // position the avatar randomly inside the sonar pulse
    const randomRadius = clamp(Math.floor((index + 1) * radius), radius * 0.4, radius);

    const x = randomRadius * Math.cos((angle * Math.PI) / 180);
    const y = randomRadius * Math.sin((angle * Math.PI) / 180);

    return {
      position: "absolute",
      top: "calc(50% - 20px)",
      left: "calc(50% - 20px)",
      transform: `translate(${x}px, ${y}px)`,
    };
  };

  const renderSponsors = useMemo(() => {
    if (!sponsors.length) return null;

    return (
      <StyledSponsorsWrapper>
        {sponsors.map((sponsor, index) => (
          <Avatar
            key={`${sponsor.MemberId}-${index}`}
            bordered
            pointer
            color={getSponsorColor(sponsor) as AvatarProps["color"]}
            css={getSponsorCss(index)}
            size={getSponsorSize(sponsor)}
            src={sponsor.image}
            text={getSponsorName(sponsor)}
            onClick={() => handleExternalLinkClick(sponsor.profile)}
          />
        ))}
      </StyledSponsorsWrapper>
    );
  }, [sponsors]);

  return (
    <Section css={{zIndex: "$10"}}>
      <Spacer css={{"@xsMax": {mt: "$14"}}} y={6} />
      <Row
        align="center"
        css={{
          svg: {
            animation: `${pulse} 2.5s infinite`,
          },
        }}
        justify="center"
      >
        <Title css={{mr: "$6"}}>Support NextUI</Title>
        <Heart filled fill="#FF4ECD" size={50} />
      </Row>
      <Row justify="center">
        <Subtitle css={{textAlign: "center", maxW: "920px"}}>
          If you run a business that intends to use NextUI in a revenue-generating product, or if
          you&apos;re a freelancer and NextUI saves you time in your work, or you&apos;re just using
          it in a fun project, your contributions will help to make NextUI better.
        </Subtitle>
      </Row>
      <Spacer y={2} />
      <FeaturesGrid features={supportAccounts} justify="center" sm={6} xs={12} />
      <Spacer y={7} />
      <InView as="section" className="inview-section" onChange={setIsSonarVisible}>
        <Row justify="center">
          <SonarPulse
            circlesCount={SONAR_PULSE_CIRCLES_COUNT}
            color="#7928CA"
            icon={
              <Tooltip rounded color="secondary" content={"Become a sponsor"} offset={86}>
                <StyledPlusWrapper
                  role="button"
                  onClick={() => handleExternalLinkClick(supportAccounts[0].href)}
                >
                  <Plus fill="#fff" size={54} />
                </StyledPlusWrapper>
              </Tooltip>
            }
            playState={isSonarVisible ? "running" : "paused"}
            size={SONAR_PULSE_SIZE}
          >
            {renderSponsors}
          </SonarPulse>
        </Row>
      </InView>
      <Spacer y={8} />
    </Section>
  );
};

export default SupportSection;
