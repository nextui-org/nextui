import React from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Hero } from '@components';
import DefaultLayout from '@layouts/default';
import { fetchDocs } from '@lib/get-docs';
import { getSlug } from '@lib/docs/utils';
import { Route } from '@lib/docs/page';

interface Props {
  routes: Route[];
  currentRoute: Route;
}

const IndexPage: React.FC<Props> = ({ routes, currentRoute }) => {
  const { query } = useRouter();
  const { tag, slug } = getSlug(query);
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const resp = await fetchDocs(params, true);
  return {
    props: {
      ...resp,
    },
  };
};

export default IndexPage;
