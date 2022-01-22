/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import NextLink from 'next/link';
import { Box, Section, Title, Subtitle, BlockLink } from '@primitives';
import { Grid, Row, Col } from '@nextui-org/react';
import { darkTheme } from '@theme/shared';
import landingContent from '@content/landing';
import { useTheme } from 'next-themes';
import { ShopCard, CodeDemo } from '@components';
import { get } from 'lodash';

const codeHighlights = {
  nextui: '3-11',
  modern: '22-37',
  elegant: '54-72',
  retro: '93-107'
};

const darkCodeHighlights = {
  nextui: '10-21',
  modern: '38-53',
  elegant: '73-91',
  retro: '109-124'
};

const CustomThemesSection = () => {
  const [activeHighlight, setActiveHighlight] = useState('nextui');

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Section css={{ position: 'relative' }}>
      <Box
        css={{
          position: 'absolute',
          top: '-25%',
          right: '-30%',
          zIndex: '-$1',
          [`.${darkTheme} &`]: {
            right: 0,
            left: '-30%',
            '@xsMax': {
              top: '15%',
              left: '10% !important'
            }
          },
          '@xsMax': {
            top: '5%',
            right: '-40% !important'
          }
        }}
      >
        <img src="/theming-gradient.svg" alt="theming background" />
      </Box>
      <Row justify="flex-start">
        <Title>Apply your own</Title>
      </Row>
      <Row justify="flex-start">
        <Title color="blue">theming&nbsp;</Title>
        <Title>decisions.</Title>
      </Row>
      <Subtitle>
        NextUI provides a simple way to customize the default themes, you can
        change the colors, fonts, breakpoints and everything you need.
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
          <Col>
            <ShopCard onChangeTheme={setActiveHighlight} />
            <NextLink href="/docs/theme/customize-theme">
              <BlockLink color="blue">Learn more</BlockLink>
            </NextLink>
          </Col>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          css={{
            pr: 0,
            '@mdMax': {
              pl: '0'
            }
          }}
        >
          <Col css={{ dflex: 'center', fd: 'column', ai: 'flex-start' }}>
            <CodeDemo
              showWindowIcons
              line={get(
                isDark ? darkCodeHighlights : codeHighlights,
                activeHighlight
              )}
              language="jsx"
              value={landingContent.themingCode}
              css={{
                maxHeight: 350
              }}
            />
          </Col>
        </Grid>
      </Grid.Container>
    </Section>
  );
};

export default CustomThemesSection;
