import React from 'react';
import NextLink from 'next/link';
import { Box, Section, Title, Subtitle, BlockLink } from '@primitives';
import { Grid, Row, Col, Spacer } from '@nextui-org/react';
import landingContent from '@content/landing';
import { darkTheme } from '@theme/shared';
import { CodeDemoBlock, ThemeSwitch, Player } from '@components';

const DarkModeSection = () => {
  return (
    <Section css={{ position: 'relative' }}>
      <Box
        css={{
          position: 'absolute',
          top: '-25%',
          left: '-20%',
          zIndex: '-$1',
          [`.${darkTheme} &`]: {
            left: '30%',
            right: '-30%'
          }
        }}
      >
        <img src="/dark-mode-gradient.svg" alt="dark mode background" />
      </Box>
      <Row justify="flex-start">
        <Title>Dark mode</Title>
      </Row>
      <Row justify="flex-start">
        <Title>is</Title>
        <Spacer x={0.5} />
        <Title color="violet">effortless.</Title>
      </Row>
      <Subtitle>
        NextUI comes with a fully well-scaled default dark theme that you can
        apply to your application with just a few lines of code.
      </Subtitle>
      <Grid.Container gap={2}>
        <Grid
          xs={12}
          sm={6}
          css={{
            pl: 0,
            '@xsMax': {
              pr: '0'
            }
          }}
        >
          <Col css={{ d: 'flex', fd: 'column', ai: 'flex-start', pt: '$4' }}>
            <Spacer y={0.2} />
            <ThemeSwitch
              css={{
                $$switchColorHover:
                  'linear-gradient(180deg, #FF1CF7 25%, #b249f8 100%)',
                '& .nextui-switch': {
                  bg: '$$switchColorHover'
                },
                '& .nextui-switch-circle': {
                  bg: '#FFD1ED',
                  color: '#9F0EB7'
                }
              }}
            />
            <Spacer y={1} />
            <Player />
            <NextLink href="/docs/theme/dark-mode">
              <BlockLink>Learn more</BlockLink>
            </NextLink>
          </Col>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          css={{
            pr: 0,
            '@xsMax': {
              pl: '0'
            }
          }}
        >
          <Col css={{ dflex: 'center' }}>
            <CodeDemoBlock
              showWindowIcons
              language="jsx"
              value={landingContent.darkModeCode}
              css={{
                minHeight: 300,
                boxShadow: 'none'
              }}
            />
          </Col>
        </Grid>
      </Grid.Container>
    </Section>
  );
};

export default DarkModeSection;
