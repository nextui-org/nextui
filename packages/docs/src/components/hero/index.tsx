import React from 'react';
import {
  useTheme,
  NextUIThemes,
  Text,
  Row,
  Col,
  Grid,
  Link,
  Spacer,
  Button,
} from '@nextui-org/react';
import { ImageBrowser } from '@components';
import NextLink from 'next/link';
import { useMediaQuery } from '@hooks/use-media-query';

const Hero: React.FC = () => {
  const theme = useTheme() as NextUIThemes;
  const isMobile = useMediaQuery(
    Number(theme.breakpoints.sm.min.replace('px', ''))
  );
  return (
    <>
      <Row className="hero-container" align="center">
        <Col className="hero__left-container" span={isMobile ? 12 : 6}>
          <Text h1 className="hero__title" size="4rem">
            Beautiful, fast and
          </Text>
          <Text h1 size="4rem" className="hero__title hero__title-smooth">
            modern React UI library.
          </Text>
          <Spacer y={1.5} />
          <Grid.Container gap={2} justify="center">
            <Grid xs={6}>
              <Row align="center">
                <img
                  className="hero__feature-img"
                  src="/responsive.svg"
                  width="24"
                  height="27.9"
                  alt="responsive icon"
                />
                <Spacer />
                <Text b size="1.1rem">
                  Responsive design
                </Text>
              </Row>
            </Grid>
            <Grid xs={6}>
              <Row align="center">
                <img
                  className="hero__feature-img"
                  src="/components.svg"
                  width="24"
                  height="27.9"
                  alt="components icon"
                />
                <Spacer />
                <Text b size="1.1rem">
                  +100 Components
                </Text>
              </Row>
            </Grid>
            <Grid xs={6}>
              <Row align="center">
                <img
                  className="hero__feature-img"
                  src="/graph.svg"
                  width="24"
                  height="28.8"
                  alt="graph icon"
                />
                <Spacer />
                <Text b size="1.1rem">
                  Graph & analytics
                </Text>
              </Row>
            </Grid>
            <Grid xs={6}>
              <Row align="center">
                <img
                  className="hero__feature-img"
                  src="/open_source.svg"
                  width="24"
                  height="25.06"
                  alt="open source icon"
                />
                <Spacer />
                <Text b size="1.1rem">
                  Open source
                </Text>
              </Row>
            </Grid>
          </Grid.Container>
          <Spacer y={2} />
          <Row align="center">
            <Button auto size="large">
              <NextLink href="docs/guide/getting-started">
                <Link>Get Started</Link>
              </NextLink>
            </Button>
            <Spacer x={0.5} />
            <Button light auto size="large">
              <Link
                rel="noreferrer"
                target="_blank"
                href="https://github.com/nextui-org/nextui"
              >
                View on Github
              </Link>
            </Button>
          </Row>
          <img
            className="hero__gradient-blue"
            src="/gradient-blue.png"
            alt="gradient blue background"
          />
        </Col>
        <Col span={6} className="hero__right-container">
          <ImageBrowser className="hero__browser-image" />
          <img
            className="hero__gradient-violet"
            src="/gradient-violet.png"
            alt="gradient violet background"
          />
        </Col>
      </Row>
      <style jsx>{`
        .hero-container {
          position: relative;
        }
        .hero__feature-img {
          opacity: 0;
          animation: appear 200ms 100ms ease forwards;
        }
        :global(.hero__title) {
          margin-bottom: 0rem;
          line-height: 1.2;
        }
        :global(.hero__title-smooth) {
          color: #c1c1c1 !important;
        }
        :global(.hero__left-container, .hero__right-container) {
          position: relative;
        }
        :global(.hero__right-container) {
          display: none;
          height: 100%;
        }
        :global(.hero__left-container) {
          z-index: 20;
        }
        :global(.hero__browser-image) {
          position: relative;
          z-index: 20;
          opacity: 0;
          animation: appear 200ms 100ms ease forwards;
        }
        :global(.hero__gradient-blue, .hero__gradient-violet) {
          top: 0;
          position: absolute;
          opacity: 0;
          animation: appear 200ms 100ms ease forwards;
        }
        :global(.hero__gradient-blue) {
          top: 30%;
          left: -40%;
          z-index: -1;
        }
        :global(.hero__gradient-violet) {
          display: none;
          z-index: 1;
          right: 5%;
        }
        @media only screen and (min-width: ${theme.breakpoints.sm.min}) {
          :global(.hero__right-container, .hero__gradient-violet) {
            display: block;
          }
        }
        @keyframes appear {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Hero;
