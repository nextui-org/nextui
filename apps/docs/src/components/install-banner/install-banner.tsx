import { FeaturesGrid, Note, NextJsLogo } from '@components';
import { Button, Container, Grid, Snippet } from '@nextui-org/react';
import { StyledCardBlur, Title, Subtitle } from '@primitives';
import React from 'react';

const bannerSuggestions = [
  {
    title: 'Getting Started',
    description:
      'NextUI allows you make beautiful, modern, and fast websites/applications regardless of your design experience.',
    icon: <Note fill="#FF4ECD" />,
    href: '/docs/guide/getting-started'
  },
  {
    title: 'NextUI + Next.js',
    description:
      'NextUI is totally compatible with Next.js you just need to customize the _app.jsx entry file to load the provider.',
    icon: <NextJsLogo fill="#FF4ECD" />,
    href: '/docs/guide/nextui-plus-nextjs'
  }
];

const InstallBanner: React.FC = () => {
  return (
    <StyledCardBlur
      css={{
        br: 0,
        p: 0,
        dflex: 'center',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        ml: '-50vw',
        mr: '-50vw',
        border: '1.5px solid $border',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent'
      }}
    >
      <Container
        lg
        css={{
          ml: 0,
          mr: 0,
          py: '$8',
          '@xsMax': {
            px: '$4'
          }
        }}
      >
        <Grid.Container gap={2}>
          <Grid xs={12} md={6} direction="column" justify="center">
            <Title css={{ fontSize: '2.4rem' }}>Let's make the Web</Title>
            <Title color="violet" css={{ fontSize: '2.4rem' }}>
              Prettier
            </Title>
            <Subtitle
              css={{
                my: '$2',
                fs: '1.2rem',
                maxW: '100%',
                '@xsMax': {
                  my: '$8'
                }
              }}
            >
              Try it for yourself, and share with us what you've built!
            </Subtitle>
            <Grid.Container xs={12} alignItems="center">
              <Grid xs={12} sm={2.5}>
                <Button
                  auto
                  rounded
                  color="secondary"
                  css={{
                    '@xsMax': {
                      width: '100%',
                      mb: '$6'
                    }
                  }}
                >
                  Get started
                </Button>
              </Grid>
              <Grid xs={12} sm={9.5}>
                <Snippet
                  className="hero__snippet"
                  tooltipColor="primary"
                  css={{
                    borderRadius: '$pill',
                    height: '$space$14',
                    py: 0,
                    transition: 'opacity 0.3s ease-in-out',
                    dflex: 'center',
                    boxShadow: '$sm',
                    bf: 'saturate(180%) blur(10px)',
                    bg: '$backgroundBlur',
                    '@xsMax': {
                      width: '100%'
                    }
                  }}
                >
                  npm install @nextui-org/react
                </Snippet>
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid xs={12} md={6} css={{ py: '$10' }}>
            <FeaturesGrid
              xs={6}
              sm={6}
              lg={6}
              features={bannerSuggestions}
              itemCss={{
                bg: 'rgba(255, 255, 255, 0)'
              }}
            />
          </Grid>
        </Grid.Container>
      </Container>
    </StyledCardBlur>
  );
};

export default InstallBanner;
