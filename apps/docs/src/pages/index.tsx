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
  Logo
} from '@components';
import landingContent from '@content/landing';
import DefaultLayout from '@layouts/default';
import { getSlug } from '@lib/docs/utils';
import { Route, getCurrentTag, fetchDocsManifest } from '@lib/docs/page';
import { Action, useRegisterActions } from 'kbar';
import { getId } from '@utils/collections';
import { Spacer, Row, Grid, Text, Col } from '@nextui-org/react';

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
          <Title color="violet">more.</Title>
        </Row>
        <Row justify="flex-start">
          <Title>Write</Title>
          <Spacer x={0.5} />
          <Title color="warning">less code.</Title>
        </Row>
        <Subtitle>
          NextUI Components has been built taking into account Developer’s
          Experience in mind avoding having to import multiples components for
          showing only one.
        </Subtitle>
        <Grid.Container gap={1.5}>
          <Grid xs={12} sm={6} css={{ pl: 0 }}>
            <Col css={{ dflex: 'center', fd: 'column' }}>
              <CodeDemo
                language="jsx"
                value={landingContent.comparativeCode.nextui}
                css={{
                  minHeight: 300
                }}
              />
              <Text css={{ color: '$text', fontSize: '$md' }}>NextUI</Text>
            </Col>
          </Grid>
          <Grid xs={12} sm={6} css={{ pr: 0 }}>
            <Col css={{ dflex: 'center', fd: 'column' }}>
              <CodeDemo
                language="jsx"
                css={{
                  height: 300
                }}
                value={landingContent.comparativeCode.others}
              />
              <Text css={{ color: '$accents5', fontSize: '$md' }}>Others</Text>
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
