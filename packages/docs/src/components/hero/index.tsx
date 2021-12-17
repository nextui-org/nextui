import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  useTheme,
  Container,
  Row,
  Col,
  Text,
  Spacer,
  Button,
  Grid,
  Snippet
} from '@nextui-org/react';
import { ImageBrowser } from '@components';
import { addColorAlpha } from '@utils/index';
import Blockholder from '../blockholder';
import useIsMounted from '@hooks/use-is-mounted';

const Hero: React.FC = () => {
  const { theme, isDark } = useTheme();
  const isMounted = useIsMounted();

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
                  src={isDark ? '/themeable-dark.svg' : '/themeable-light.svg'}
                  quality={100}
                  width={32}
                  height={32}
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
                  src={
                    isDark
                      ? '/light-and-dark_dark.svg'
                      : '/light-and-dark_light.svg'
                  }
                  quality={100}
                  width={32}
                  height={32}
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
                  src={
                    isDark ? '/open-source-dark.svg' : '/open-source-light.svg'
                  }
                  quality={100}
                  width={32}
                  height={32}
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
                  src={
                    isDark ? '/responsive-dark.svg' : '/responsive-light.svg'
                  }
                  width={32}
                  height={32}
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
                size="lg"
                shadow={!isDark}
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
            </Grid>
            <Grid xs={12} sm={9}>
              {!isMounted ? (
                <Blockholder height="54px" alt="package install script" />
              ) : (
                <Snippet
                  className="hero__snippet"
                  bordered={!isDark}
                  tooltipColor="primary"
                >
                  npm install @nextui-org/react
                </Snippet>
              )}
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
          color: ${theme.colors.foreground.value} !important;
          line-height: 1.2;
        }
        :global(.hero__github-link) {
          color: ${theme.colors.text.value} !important;
        }
        :global(.hero__title-smooth) {
          color: ${isDark
            ? theme.colors.accents6.value
            : theme.colors.accents3.value} !important;
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
          border-width: 2px !important;
          border-color: ${isDark
            ? 'transparent'
            : theme.colors.accents2.value} !important;
          backdrop-filter: saturate(180%) blur(20px);
          background: ${addColorAlpha(
            theme.colors.accents2.value,
            0.5
          )} !important;
          box-shadow: ${isDark ? '0px 5px 20px -5px rgb(0 0 0 / 15%)' : 'none'};
        }
        :global(.hero__snippet .copy) {
          background: transparent !important;
        }
        @media only screen and (max-width: ${theme.breakpoints.xs}) {
          :global(.hero__container) {
            height: calc(100vh - 64px);
            overflow: hidden;
          }
          :global(.hero__get-started-button) {
            margin-bottom: ${theme.space.lg};
          }
          :global(.hero__get-started-button, .hero__snippet) {
            width: 100% !important;
          }
        }
        @media only screen and (max-width: ${theme.breakpoints.md}) {
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
        @media only screen and (min-width: ${theme.breakpoints.md}) {
          :global(.hero__right-container, .hero__gradient-violet) {
            display: block;
          }
          :global(.hero__left-container) {
            width: 50% !important;
          }
        }
        @media only screen and (max-width: ${theme.breakpoints.lg}) {
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
