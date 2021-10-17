import React from 'react';
import { GetStaticProps } from 'next';
import router, { useRouter } from 'next/router';
import { Hero } from '@components';
import DefaultLayout from '@layouts/default';
import { getSlug } from '@lib/docs/utils';
import { Route, getCurrentTag, fetchDocsManifest } from '@lib/docs/page';
import { Action, useRegisterActions } from 'kbar';
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
      <Hero />
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
