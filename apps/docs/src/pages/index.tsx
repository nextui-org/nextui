import React from 'react';
import { GetStaticProps } from 'next';
import router, { useRouter } from 'next/router';
import {
  FeaturesGrid,
  Hero,
  Section,
  Title,
  Subtitle,
  CodeDemo,
  Player,
  BlockLink,
  ThemeSwitch,
  CustomButton,
  Box,
  ShopCard
} from '@components';
import NextLink from 'next/link';
import landingContent from '@content/landing';
import DefaultLayout from '@layouts/default';
import { getSlug } from '@lib/docs/utils';
import { Route, getCurrentTag, fetchDocsManifest } from '@lib/docs/page';
import { Action, useRegisterActions } from 'kbar';
import { Spacer, Row, Grid, Text, Col, Link } from '@nextui-org/react';
import { getId } from '@utils/collections';

interface Props {
  routes: Route[];
  currentRoute: Route;
}

const IndexPage: React.FC<Props> = ({ routes, currentRoute }) => {
  const { query } = useRouter();
  const { tag, slug } = getSlug(query);

  // kbar home action
  const homeAction: Action = React.useMemo(() => {
    return {
      id: getId(),
      name: 'Getting started',
      section: 'Scope',
      shortcut: [],
      keywords: 'help, docs, go, started, getting started, nextui',
      perform: () => router.push('/docs/guide/getting-started')
    };
  }, [routes]);

  useRegisterActions([homeAction]);

  return (
    <DefaultLayout
      routes={routes}
      currentRoute={currentRoute}
      tag={tag}
      slug={slug}
    >
      {/* Hero */}
      <Hero />

      {/* Main features */}
      <Section>
        <FeaturesGrid features={landingContent.topFeatures} />
      </Section>

      {/* Custom themes */}
      <Spacer y={10} />
      <Section>
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
              <ShopCard />
              <NextLink href="/docs/theme/override-styles">
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
                language="jsx"
                value={landingContent.customizationCode}
                css={{
                  maxHeight: 320
                }}
              />
            </Col>
          </Grid>
        </Grid.Container>
      </Section>

      {/*  Comparation  */}
      <Spacer y={10} />
      <Section>
        <Row justify="flex-start">
          <Title>Do</Title>
          <Spacer x={0.5} />
          <Title color="cyan">more.</Title>
        </Row>
        <Row justify="flex-start">
          <Title>Write</Title>
          <Spacer x={0.5} />
          <Title color="warning">less code.</Title>
        </Row>
        <Subtitle>
          NextUI components have been created with the Developer's experience
          <br />
          in mind, avoiding having to import multiple components to display just
          one.
        </Subtitle>
        <Grid.Container gap={1.5}>
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
            <Col css={{ dflex: 'center', fd: 'column' }}>
              <CodeDemo
                showWindowIcons
                language="jsx"
                value={landingContent.comparativeCode.nextui}
                css={{
                  minHeight: 340
                }}
              />
              <Text css={{ color: '$text', fontSize: '$md' }}>NextUI</Text>
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
            <Col css={{ dflex: 'center', fd: 'column' }}>
              <CodeDemo
                showWindowIcons
                language="jsx"
                css={{
                  height: 340,
                  boxShadow: 'none'
                }}
                value={landingContent.comparativeCode.others}
              />
              <Text css={{ color: '$accents5', fontSize: '$md' }}>Others</Text>
            </Col>
          </Grid>
        </Grid.Container>
      </Section>

      {/* Dark mode */}
      <Spacer y={10} />
      <Section>
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
              <CodeDemo
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

      {/* Customization */}
      <Spacer y={10} />
      <Section>
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
          <NextLink href="/docs/theme/override-styles#usign-the-styled-function">
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
            <Col css={{ dflex: 'center', fd: 'column', ai: 'flex-start' }}>
              <CodeDemo
                showWindowIcons
                language="jsx"
                value={landingContent.customizationCode}
                css={{
                  maxHeight: 320,
                  bs: '$lg'
                }}
              />
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
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tag = await getCurrentTag();
  const manifest = await fetchDocsManifest(tag);
  return {
    props: {
      routes: manifest.routes
    }
  };
};

export default IndexPage;
