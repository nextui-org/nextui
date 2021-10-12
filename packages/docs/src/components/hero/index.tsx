import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  useTheme,
  Container,
  NextUIThemes,
  Row,
  Col,
  Text,
  Spacer,
  Button,
  Grid,
  Snippet,
} from '@nextui-org/react';
import { ImageBrowser } from '@components';
import { addColorAlpha } from '@utils/index';
import router from 'next/router';

const Hero: React.FC = () => {
  const theme = useTheme() as NextUIThemes;
  const isDark = theme.type === 'dark';

  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('docs/guide/getting-started');
  };

  return (
    <Container
      lg
      className="hero__container"
      display="flex"
      alignItems="center"
      justify="space-between"
      wrap="nowrap"
      as="section"
    >
      <Row className="hero__content" align="center">
        <Col className="hero__left-container">
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
                <Image
                  className="hero__feature-img"
                  src="/themeable.svg"
                  quality={100}
                  width={30}
                  height={31.28}
                />
                <Spacer x={0.6} />
                <Text b size="1.1rem">
                  Themeable
                </Text>
              </Row>
            </Grid>
            <Grid xs={6}>
              <Row align="center">
                <Image
                  className="hero__feature-img"
                  src="/light-and-dark.svg"
                  quality={100}
                  width={30}
                  height={24.41}
                />
                <Spacer x={0.6} />
                <Text b size="1.1rem">
                  Light and dark UI
                </Text>
              </Row>
            </Grid>
            <Grid xs={6}>
              <Row align="center">
                <Image
                  className="hero__feature-img"
                  src="/open-source.svg"
                  quality={100}
                  width={30}
                  height={23.23}
                />
                <Spacer x={0.6} />
                <Text b size="1.1rem">
                  Open source
                </Text>
              </Row>
            </Grid>
            <Grid xs={6}>
              <Row align="center">
                <Image
                  className="hero__feature-img"
                  src="/responsive.svg"
                  width={30}
                  height={31.57}
                />
                <Spacer x={0.6} />
                <Text b size="1.1rem">
                  Responsive Design
                </Text>
              </Row>
            </Grid>
          </Grid.Container>
          <Spacer y={2} />
          <Grid.Container gap={1} alignItems="center">
            <Grid xs={12} sm={3}>
              <Button
                auto
                className="hero__get-started-button"
                size="large"
                shadow={!isDark}
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
            </Grid>
            <Grid xs={12} sm={9}>
              <Snippet className="hero__snippet" tooltipColor="primary">
                npm install @nextui-org/react
              </Snippet>
            </Grid>
          </Grid.Container>
          {isDark && (
            <img
              className="hero__gradient-blue"
              src="/gradient-left-dark.svg"
              alt="gradient blue background"
            />
          )}
        </Col>
        <Col span={6} className="hero__right-container">
          <ImageBrowser className="hero__browser-image" />
        </Col>
        {isDark && (
          <img
            className="hero__gradient-violet"
            src="/gradient-right-dark.svg"
            alt="gradient violet background"
          />
        )}
      </Row>
      <style jsx>{`
        :global(.hero__container) {
          position: relative;
        }
        :global(.hero__title) {
          margin-bottom: 0rem;
          color: ${theme.palette.foreground} !important;
          line-height: 1.2;
        }
        :global(.hero__github-link) {
          color: ${theme.palette.text} !important;
        }
        :global(.hero__title-smooth) {
          color: ${theme.type === 'dark'
            ? theme.palette.accents_6
            : theme.palette.accents_3} !important;
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
          display: block;
          z-index: 1;
          top: -100%;
          right: -50%;
        }
        :global(.hero__snippet) {
          backdrop-filter: saturate(180%) blur(20px);
          background: ${addColorAlpha(theme.palette.accents_2, 0.5)} !important;
          box-shadow: 0px 5px 20px -5px rgb(0 0 0 / 15%);
        }
        :global(.hero__snippet .copy) {
          background: transparent !important;
        }
        @media only screen and (max-width: ${theme.breakpoints.xs.max}) {
          :global(.hero__container) {
            height: calc(100vh - 64px);
            overflow: hidden;
          }
          :global(.hero__get-started-button) {
            margin-bottom: ${theme.layout.gap};
          }
          :global(.hero__get-started-button, .hero__snippet) {
            width: 100% !important;
          }
        }
        @media only screen and (max-width: ${theme.breakpoints.md.min}) {
          :global(.hero__gradient-violet) {
            top: -65%;
            right: -52%;
          }
          :global(.hero__content) {
            margin-top: 80px;
            padding: 0 8px;
          }
          :global(.hero__left-container) {
            width: 100% !important;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.md.min}) {
          :global(.hero__right-container, .hero__gradient-violet) {
            display: block;
          }
          :global(.hero__left-container) {
            width: 50% !important;
          }
        }
        @media only screen and (max-width: ${theme.breakpoints.lg.min}) {
          :global(.hero__title, .hero__title-smooth) {
            font-size: calc(2rem + 2.5vw) !important;
          }
          :global(.hero__container) {
            padding: 0 20px !important;
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
    </Container>
  );
};

export default Hero;
