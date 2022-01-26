import React from 'react';
import dynamic from 'next/dynamic';
import { Grid, Text, Row, Spacer } from '@nextui-org/react';
import { StyledCommunityCard } from './styles';
import { Twitter, Discord, Github } from '@components';
import { Title, Subtitle } from '@primitives';
import withDefaults from '@utils/with-defaults';

export interface CommunityProps {
  twitter?: string;
  github?: string;
  discord?: string;
}

const defaultProps = {
  twitter: 'https://twitter.com/getnextui',
  github: 'https://github.com/nextui-org/nextui',
  discord: 'https://discord.gg/9b6yyZKmH4'
};

const DynamicLopperBG = dynamic(() => import('../looper-bg'), {
  ssr: false
});

const Community: React.FC<CommunityProps> = ({ twitter, github, discord }) => {
  return (
    <Grid.Container justify="center" gap={2} css={{ position: 'relative' }}>
      <Grid xs={12} direction="column" css={{ mb: '$10' }}>
        <Row justify="center">
          <Title css={{ textAlign: 'center' }}>Community</Title>
        </Row>
        <Row justify="center">
          <Subtitle css={{ textAlign: 'center' }}>
            Get involved in our comunnity. Everyone is welcome!
          </Subtitle>
        </Row>
      </Grid>
      <Grid xs={12} sm={6} md={3} justify="center">
        <StyledCommunityCard
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Row justify="flex-start" align="center">
            <Twitter fill="#00ACEE" size={30} />
            <Spacer x={0.4} />
            <Text h5>Twitter</Text>
          </Row>
          <Spacer y={0.5} />
          <Row justify="flex-start" align="center">
            <Text css={{ color: '$accents6', textAlign: 'left' }}>
              For announcements, tips and general information.
            </Text>
          </Row>
        </StyledCommunityCard>
      </Grid>
      <Grid xs={12} sm={6} md={3} justify="center">
        <StyledCommunityCard
          href={discord}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Row justify="flex-start" align="center">
            <Discord fill="#7289DA" size={30} />
            <Spacer x={0.4} />
            <Text h5>Discord</Text>
          </Row>
          <Spacer y={0.5} />
          <Row justify="flex-start" align="center">
            <Text css={{ color: '$accents6' }}>
              To get involved in the communinty, ask questions and share tips.
            </Text>
          </Row>
        </StyledCommunityCard>
      </Grid>
      <Grid xs={12} sm={6} md={3} justify="center">
        <StyledCommunityCard
          href={github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Row justify="flex-start" align="center">
            <Github className="github-icon" fill="#E7E7E7" size={30} />
            <Spacer x={0.4} />
            <Text h5>GitHub</Text>
          </Row>
          <Spacer y={0.5} />
          <Row justify="flex-start" align="center">
            <Text css={{ color: '$accents6' }}>
              For issues, feature requests and contribute.
            </Text>
          </Row>
        </StyledCommunityCard>
      </Grid>
      <DynamicLopperBG
        css={{
          zIndex: '-$1',
          position: 'absolute',
          transform: 'translate(5%, -70%)'
        }}
      />
    </Grid.Container>
  );
};

export default withDefaults(Community, defaultProps);
