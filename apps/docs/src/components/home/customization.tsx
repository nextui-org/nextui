import React, { useState } from 'react';
import NextLink from 'next/link';
import { InView } from 'react-intersection-observer';
import { Box, Section, Title, Subtitle, BlockLink } from '@primitives';
import { Grid, Row, Col, Link, Spacer } from '@nextui-org/react';
import landingContent from '@content/landing';
import { darkTheme } from '@theme/shared';
import { CodeDemoBlock, CustomButton, Blockholder } from '@components';

const CustomizationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <InView as="section" className="inview-section" onChange={setIsVisible}>
      <Spacer y={10} css={{ '@xsMax': { mt: '$14' } }} />
      <Section css={{ position: 'relative' }}>
        <Box
          css={{
            position: 'absolute',
            top: '-30%',
            right: '-35%',
            zIndex: '-$1',
            [`.${darkTheme} &`]: {
              top: '-30%',
              left: '-35%'
            }
          }}
        >
          <img
            src="/customization-gradient.svg"
            alt="customization background"
          />
        </Box>
        <Row justify="flex-start">
          <Title>Customization made</Title>
        </Row>
        <Row justify="flex-start">
          <Title color="green">easy.</Title>
        </Row>
        <Subtitle>
          Thanks to NextUI is based on the amazing CSS-in-JS library&nbsp;
          <Link
            href="https://stitches.dev/"
            rel="noreferer noopener"
            target="_blank"
            css={{ color: '$green300' }}
          >
            Stitches
          </Link>
          , you can customize any components in several ways eather using
          the&nbsp;
          <NextLink href="/docs/theme/override-styles#using-the-css-prop">
            <Link css={{ color: '$green300' }}>css&nbsp;</Link>
          </NextLink>
          prop,&nbsp;
          <NextLink href="/docs/theme/override-styles#using-the-styled-function">
            <Link css={{ color: '$green300' }}>styled&nbsp;</Link>
          </NextLink>
          function or native css class names.
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
            <Col
              css={{
                dflex: 'center',
                fd: 'column',
                ai: 'flex-start',
                h: '100%'
              }}
            >
              {isVisible ? (
                <CodeDemoBlock
                  showWindowIcons
                  language="jsx"
                  value={landingContent.customizationCode}
                  css={{
                    maxHeight: 320,
                    bs: '$lg'
                  }}
                />
              ) : (
                <Blockholder height="360px" />
              )}
              <NextLink href="/docs/theme/override-styles">
                <BlockLink color="green">Learn more</BlockLink>
              </NextLink>
            </Col>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            css={{
              pr: 0,
              mt: '$9',
              '@mdMax': {
                pl: '0'
              }
            }}
          >
            <Box css={{ size: '100%', height: 320 }}>
              <Col
                css={{
                  dflex: 'center',
                  fd: 'column',
                  height: '100%',
                  br: '$lg',
                  bg: 'linear-gradient(to right, #4ade80, #06b6d4)'
                }}
              >
                <CustomButton />
              </Col>
            </Box>
          </Grid>
        </Grid.Container>
      </Section>
    </InView>
  );
};

export default CustomizationSection;
