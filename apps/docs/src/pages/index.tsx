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
  ThemeSwitch
} from '@components';
import NextLink from 'next/link';
import landingContent from '@content/landing';
import DefaultLayout from '@layouts/default';
import { getSlug } from '@lib/docs/utils';
import { Route, getCurrentTag, fetchDocsManifest } from '@lib/docs/page';
import { Action, useRegisterActions } from 'kbar';
import { getId } from '@utils/collections';
import { Spacer, Row, Grid, Text, Col, Link } from '@nextui-org/react';

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
      <Hero />

      <Section>
        <FeaturesGrid features={landingContent.topFeatures} />
      </Section>

      <Spacer y={4} />
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
                  minHeight: 290
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
                  height: 290
                }}
                value={landingContent.comparativeCode.others}
              />
              <Text css={{ color: '$accents5', fontSize: '$md' }}>Others</Text>
            </Col>
          </Grid>
        </Grid.Container>
      </Section>

      <Spacer y={4} />
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
            sm={5}
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
            sm={7}
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
                  minHeight: 300
                }}
              />
            </Col>
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
