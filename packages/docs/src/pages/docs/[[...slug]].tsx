/* eslint-disable react/display-name */
import * as React from 'react';
import { useRouter } from 'next/router';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import DocsLayout from '@layouts/docs';
import * as Components from '@nextui-org/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getSlug } from '@lib/docs/utils';
import { MetaProps } from '@lib/docs/meta';
import useDocsRoute from '@hooks/use-docs-route';
import { MDXComponents } from '@components';
import { Route } from '@lib/docs/page';
import { fetchDocs, fetchPaths } from '@lib/get-docs';

const components = {
  ...Components,
  ...MDXComponents,
};

interface Props {
  routes: Route[];
  currentRoute: Route;
  source: MDXRemoteSerializeResult;
  meta: MetaProps;
}

const DocsPage: React.FC<Props> = ({ routes, currentRoute, source, meta }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(currentRoute, routes);
  const { query } = useRouter();
  const { tag, slug } = getSlug(query);
  return (
    <DocsLayout
      routes={routes}
      currentRoute={route}
      prevRoute={prevRoute}
      nextRoute={nextRoute}
      tag={tag}
      slug={slug}
      meta={meta}
    >
      {source && <MDXRemote {...source} components={components} />}
    </DocsLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await fetchPaths();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const resp = await fetchDocs(params);
  return {
    props: {
      ...resp,
    },
  };
};

export default DocsPage;
