import React, {useState} from "react";
import {Heart, OpenCollectiveLogo, PatreonLogo, Plus, FeaturesGrid, SonarPulse} from "@components";
import {Section, Title, Subtitle} from "@primitives";
import {styled, Row, Spacer, Tooltip} from "@nextui-org/react";
import {InView} from "react-intersection-observer";
import {pulse} from "@utils/animations";

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

const SupportSection = () => {
  const [isSonarVisible, setIsSonarVisible] = useState(false);

  const handleSupportClick = () => {
    window.open(supportAccounts[0].href, "_blank");
  };

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
      <Spacer y={5} />
      <InView as="section" className="inview-section" onChange={setIsSonarVisible}>
        <Row justify="center">
          <SonarPulse color="#7928CA" playState={isSonarVisible ? "running" : "paused"}>
            <Tooltip rounded color="secondary" content={"Become a sponsor"} offset={86}>
              <StyledPlusWrapper role="button" onClick={handleSupportClick}>
                <Plus fill="#fff" size={54} />
              </StyledPlusWrapper>
            </Tooltip>
          </SonarPulse>
        </Row>
      </InView>
      <Spacer y={5} />
    </Section>
  );
};

export default SupportSection;
