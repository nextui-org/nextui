import React from "react";
import dynamic from "next/dynamic";
import {Grid, Text, Row, Spacer} from "@nextui-org/react";
import {Twitter, Discord, Github} from "@components";
import {Title, Subtitle} from "@primitives";
import withDefaults from "@utils/with-defaults";

import {StyledCommunityCard} from "./styles";

export interface CommunityProps {
  twitter?: string;
  github?: string;
  discord?: string;
}

const defaultProps = {
  twitter: "https://twitter.com/getnextui",
  github: "https://github.com/nextui-org/nextui",
  discord: "https://discord.gg/9b6yyZKmH4",
};

const DynamicLopperBG = dynamic(() => import("../looper-bg"), {
  ssr: false,
});

const Community: React.FC<CommunityProps> = ({twitter, github, discord}) => {
  return (
    <Grid.Container css={{position: "relative"}} gap={2} justify="center">
      <Grid css={{mb: "$10"}} direction="column" xs={12}>
        <Row justify="center">
          <Title css={{textAlign: "center"}}>Community</Title>
        </Row>
        <Row justify="center">
          <Subtitle css={{textAlign: "center"}}>
            Get involved in our community. Everyone is welcome!
          </Subtitle>
        </Row>
      </Grid>
      <Grid justify="center" md={3} sm={6} xs={12}>
        <StyledCommunityCard href={twitter} rel="noopener noreferrer" target="_blank">
          <Row align="center" justify="flex-start">
            <Twitter fill="#00ACEE" size={30} />
            <Spacer x={0.4} />
            <Text h5>Twitter</Text>
          </Row>
          <Spacer y={0.5} />
          <Row align="center" justify="flex-start">
            <Text css={{color: "$accents8", textAlign: "left"}}>
              For announcements, tips and general information.
            </Text>
          </Row>
        </StyledCommunityCard>
      </Grid>
      <Grid justify="center" md={3} sm={6} xs={12}>
        <StyledCommunityCard href={discord} rel="noopener noreferrer" target="_blank">
          <Row align="center" justify="flex-start">
            <Discord fill="#7289DA" size={30} />
            <Spacer x={0.4} />
            <Text h5>Discord</Text>
          </Row>
          <Spacer y={0.5} />
          <Row align="center" justify="flex-start">
            <Text css={{color: "$accents8"}}>
              To get involved in the community, ask questions and share tips.
            </Text>
          </Row>
        </StyledCommunityCard>
      </Grid>
      <Grid justify="center" md={3} sm={6} xs={12}>
        <StyledCommunityCard href={github} rel="noopener noreferrer" target="_blank">
          <Row align="center" justify="flex-start">
            <Github className="github-icon" fill="#E7E7E7" size={30} />
            <Spacer x={0.4} />
            <Text h5>GitHub</Text>
          </Row>
          <Spacer y={0.5} />
          <Row align="center" justify="flex-start">
            <Text css={{color: "$accents8"}}>For issues, feature requests and contribute.</Text>
          </Row>
        </StyledCommunityCard>
      </Grid>
      <DynamicLopperBG
        css={{
          zIndex: "-$1",
          position: "absolute",
          transform: "translate(5%, -70%)",
        }}
      />
    </Grid.Container>
  );
};

export default withDefaults(Community, defaultProps);
