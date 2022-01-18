import React from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Row,
  Col,
  Spacer,
  Button,
  Grid,
  Snippet
} from '@nextui-org/react';
import { LooperBG } from '@components';
import HeroComponents from './components';
import { StyledTitle, StyledGradientTitle, StyledSubtitle } from './styles';

const Hero: React.FC = () => {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('docs/guide/getting-started');
  };

  return (
    <Container
      lg={true}
      className="hero__container"
      display="flex"
      alignItems="center"
      justify="space-between"
      wrap="nowrap"
      gap={0}
      as="section"
      css={{
        position: 'relative',
        height: 'calc(84vh - 76px)',
        '@xsMax': {
          height: 'calc(100vh - 64px)',
          overflow: 'hidden'
        }
      }}
    >
      <Row
        className="hero__content"
        align="center"
        css={{
          zIndex: '$2',
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
          <StyledTitle>
            Make&nbsp;
            <StyledGradientTitle>beautiful&nbsp;</StyledGradientTitle>
            <StyledTitle>
              websites regardless of your design experience.
            </StyledTitle>
          </StyledTitle>
          <StyledSubtitle className="hero__text-subtitle">
            Beautiful, fast and modern React UI library.
          </StyledSubtitle>
          <Spacer y={1.5} />
          <Grid.Container
            gap={0}
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
                rounded
                className="hero__get-started-button"
                size="lg"
                onClick={handleGetStartedClick}
                css={{
                  maxHeight: '$space$14',
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
          <HeroComponents />
        </Col>
      </Row>
      <LooperBG
        css={{
          zIndex: '$1',
          position: 'absolute',
          transform: 'translate(10%, 5%)'
        }}
      />
    </Container>
  );
};

export default Hero;
