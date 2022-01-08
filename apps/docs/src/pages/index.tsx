import React from 'react';
import { GetStaticProps } from 'next';
import router, { useRouter } from 'next/router';
import {
  FeaturesGrid,
  FeatureType,
  Hero,
  Moon,
  Magic,
  Flash,
  Devices
} from '@components';
import DefaultLayout from '@layouts/default';
import { getSlug } from '@lib/docs/utils';
import { Route, getCurrentTag, fetchDocsManifest } from '@lib/docs/page';
import { Action, useRegisterActions } from 'kbar';
import { getId } from '@utils/collections';
import { styled } from '@nextui-org/react';

interface Props {
  routes: Route[];
  currentRoute: Route;
}

const Section = styled('section', {
  zIndex: '$2',
  px: '$10',
  width: '100%'
});

const topFeatures: FeatureType[] = [
  {
    title: 'Themeable',
    description:
      'Provides a simple way to customize default themes, you can change the colors, fonts, breakpoints and everything you need.',
    icon: <Magic fill="#FF4ECD" />
  },
  {
    title: 'Fast',
    description:
      'Avoids unnecessary styles props at runtime, making it more performant than other UI libraries.',
    icon: <Flash fill="#FF4ECD" />
  },
  {
    title: 'Light & Dark UI',
    description:
      'Automatic dark mode recognition, NextUI automatically changes the theme when detects HTML theme prop changes.',
    icon: <Moon fill="#FF4ECD" />
  },
  {
    title: 'Unique DX',
    description:
      'NextUI is fully-typed to minimize the learning curve, and provide the best possible developer experience.',
    icon: <Devices fill="#FF4ECD" />
  }
];

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
        <FeaturesGrid features={topFeatures} />
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
