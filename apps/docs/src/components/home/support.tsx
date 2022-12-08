import React from "react";
import {Heart, OpenCollectiveLogo, PatreonLogo, FeaturesGrid} from "@components";
import {Section, Title, Subtitle} from "@primitives";
import {Row, Spacer} from "@nextui-org/react";
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

const SupportSection = () => {
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
      <FeaturesGrid features={supportAccounts} justify="center" xs={6} />
    </Section>
  );
};

export default SupportSection;
