import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  useTheme,
  Container,
  Row,
  StyledGridItem,
  Col,
  Text,
  Spacer,
  Button,
  Grid,
  Snippet,
  keyframes
} from '@nextui-org/react';
import { ImageBrowser, Blockholder } from '@components';
import { addColorAlpha } from '@utils/index';
import useIsMounted from '@hooks/use-is-mounted';

const Hero: React.FC = () => {
  const { theme, isDark } = useTheme();
  const isMounted = useIsMounted();

  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('docs/guide/getting-started');
  };

  const appearAnimation = keyframes({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  });

  return (
    <Container
      lg
      className="hero__container"
      display="flex"
      alignItems="center"
      justify="space-between"
      wrap="nowrap"
      as="section"
      css={{
        position: 'relative',
        '.hero__gradient-blue, .hero__gradient-violet': {
          position: 'absolute',
          top: 0,
          opacity: 0,
          animation: `${appearAnimation} 200ms 100ms ease forwards`
        },
        '.hero__gradient-blue': {
          top: 30,
          left: -40,
          zIndex: -1
        },
        '.hero__gradient-violet': {
          zIndex: 1,
          top: '-100%',
          right: '-50%',
          '@mdMax': {
            top: '-65%',
            right: '-52%'
          }
        },
        '@xsMax': {
          height: 'calc(100vh - 64px)',
          overflow: 'hidden'
        },
        '@lgMax': {
          padding: '0 20px'
        }
      }}
    >
      <Row
        className="hero__content"
        align="center"
        css={{
          '@mdMax': {
            mt: '80px',
            p: '0 8px'
          }
        }}
      >
        <Col
          className="hero__left-container"
          css={{
            position: 'relative',
            zIndex: '$2',
            '@md': {
              width: '50%'
            },
            '@mdMax': {
              width: '100%'
            }
          }}
        >
          <Text
            h1
            className="hero__title"
            css={{
              fontWeight: '$semibold',
              mb: 0,
              color: '$foreground',
              lh: '1.2',
              '@lg': {
                fs: '3.7rem'
              },
              '@xsMax': {
                fontSize: '2.2rem'
              }
            }}
          >
            Beautiful, fast and
          </Text>
          <Text
            h1
            css={{
              fontWeight: '$semibold',
              color: '$text',
              opacity: 0.6,
              '@lg': {
                fontSize: '3.7rem'
              },
              '@xsMax': {
                fontSize: '2.2rem'
              }
            }}
            className="hero__title hero__title-smooth"
          >
            modern React UI library.
          </Text>
          <Spacer y={1.5} />
          <Grid.Container
            gap={2}
            justify="center"
            css={{
              '@mdMax': {
                padding: 0,
                [`& ${StyledGridItem}`]: {
                  padding: '0 0 $$gridGapUnit $$gridGapUnit'
                }
              }
            }}
          >
            <Grid xs={6}>
              <Row align="center">
                <Image
                  className="hero__feature-img"
                  src={isDark ? '/themeable-dark.svg' : '/themeable-light.svg'}
                  quality={100}
                  width={32}
                  height={32}
                  alt="themeable"
                />
                <Text
                  b
                  size="1.1rem"
                  css={{
                    '@xsMax': {
                      ml: '$4',
                      fontSize: '$base'
                    }
                  }}
                >
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
                  alt="light and dark theme"
                  quality={100}
                  width={32}
                  height={32}
                />
                <Text
                  b
                  size="1.1rem"
                  css={{
                    '@xsMax': {
                      ml: '$4',
                      fontSize: '$base'
                    }
                  }}
                >
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
                  alt="open source"
                  quality={100}
                  width={32}
                  height={32}
                />
                <Text
                  b
                  size="1.1rem"
                  css={{
                    '@xsMax': {
                      ml: '$4',
                      fontSize: '$base'
                    }
                  }}
                >
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
                  alt="fully responsive components"
                />
                <Text
                  b
                  size="1.1rem"
                  css={{
                    '@xsMax': {
                      ml: '$4',
                      fontSize: '$base'
                    }
                  }}
                >
                  Responsive Design
                </Text>
              </Row>
            </Grid>
          </Grid.Container>
          <Grid.Container
            gap={1}
            alignItems="center"
            css={{
              '@md': {
                mt: '$lg'
              }
            }}
          >
            <Grid xs={12} sm={3}>
              <Button
                auto
                className="hero__get-started-button"
                size="lg"
                onClick={handleGetStartedClick}
                css={{
                  '@xsMax': {
                    width: '100%',
                    marginBottom: 0
                  }
                }}
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
                  tooltipColor="primary"
                  css={{
                    boxShadow: isDark
                      ? '0px 5px 20px -5px rgb(0 0 0 / 15%)'
                      : 'none',
                    bf: 'saturate(180%) blur(10px)',
                    bg: addColorAlpha(theme?.colors.accents2.value, 0.4),
                    '@xsMax': {
                      width: '100%'
                    }
                  }}
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
        <Col
          span={6}
          className="hero__right-container"
          css={{
            position: 'relative',
            height: '100%',
            '@mdMax': {
              display: 'none'
            }
          }}
        >
          <ImageBrowser />
        </Col>
        {isDark && (
          <img
            className="hero__gradient-violet"
            src="/gradient-right-dark.svg"
            alt="gradient violet background"
          />
        )}
      </Row>
    </Container>
  );
};

export default Hero;
