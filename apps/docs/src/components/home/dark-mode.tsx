import React, { useState } from 'react';
import cn from 'classnames';
import { InView } from 'react-intersection-observer';
import NextLink from 'next/link';
import { Box, Section, Title, Subtitle, BlockLink } from '@primitives';
import { Switch, Grid, Row, Col, Spacer, createTheme } from '@nextui-org/react';
import landingContent from '@content/landing';
import { darkTheme, lightTheme } from '@theme/shared';
import { CodeDemoBlock, Player, Blockholder } from '@components';
import { Moon, Sun } from '../icons';

const playerDarkTheme = createTheme({
  type: 'dark',
  className: 'player-dark-theme'
});
const playerLightTheme = createTheme({
  type: 'light',
  className: 'player-light-theme'
});

const DarkModeSection = () => {
  const [activeTheme, setActiveTheme] = useState('dark');
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleTheme = () => {
    setActiveTheme(activeTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <InView as="section" className="inview-section" onChange={setIsVisible}>
      <Spacer y={10} css={{ '@xsMax': { mt: '$14' } }} />
      <Section css={{ position: 'relative', zIndex: '$10' }}>
        <Box
          css={{
            position: 'absolute',
            top: '-25%',
            left: '-20%',
            zIndex: '-$1',
            [`.${darkTheme} &`]: {
              left: '30%',
              right: '-30%',
              '@xsMax': {
                right: '-50%'
              }
            },
            '@xsMax': {
              top: '10%',
              right: '-50%',
              left: '0'
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
              <Switch
                size="xl"
                checked={activeTheme === 'dark'}
                iconOn={<Moon filled />}
                iconOff={<Sun filled />}
                onChange={handleToggleTheme}
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
              <Player
                className={cn(
                  activeTheme === 'dark' ? playerDarkTheme : playerLightTheme,
                  {
                    'is-dark': activeTheme === 'dark',
                    'is-light': activeTheme === 'light'
                  }
                )}
                css={{
                  [`.${darkTheme} &`]: {
                    '&.is-light': {
                      $$cardColor: '$colors$white'
                    }
                  },
                  [`.${lightTheme} &`]: {
                    '&.is-dark': {
                      $$cardColor: '$colors$gray900'
                    }
                  }
                }}
              />
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
            <Col css={{ dflex: 'center', h: '100%' }}>
              {isVisible ? (
                <CodeDemoBlock
                  showWindowIcons
                  language="jsx"
                  value={landingContent.darkModeCode}
                  css={{
                    minHeight: 300,
                    boxShadow: 'none'
                  }}
                />
              ) : (
                <Blockholder height="475px" />
              )}
            </Col>
          </Grid>
        </Grid.Container>
      </Section>
    </InView>
  );
};

export default DarkModeSection;
