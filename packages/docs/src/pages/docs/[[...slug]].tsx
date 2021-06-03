import * as React from 'react';
import matter from 'gray-matter';
import { useRouter } from 'next/router';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Header from '@layouts/header';
import DocsLayout from '@layouts/docs';
import * as Components from '@nextui/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getSlug } from '@lib/docs/utils';
import { MetaProps } from '@lib/docs/meta';
import useDocsRoute from '@hooks/use-docs-route';
import {
  Route,
  getCurrentTag,
  fetchDocsManifest,
  getPaths,
  fetchRawDoc,
  findRouteByPath,
} from '@lib/docs/page';

const components = { ...Components };

interface Props {
  routes: Route[];
  currentRoute: Route;
  source: MDXRemoteSerializeResult;
  meta: MetaProps;
}

const DocsPage: React.FC<Props> = ({ routes, currentRoute, source, meta }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(currentRoute, routes);
  console.log({ route, prevRoute, nextRoute });
  const { query } = useRouter();
  const { tag, slug } = getSlug(query);
  return (
    <DocsLayout routes={routes} tag={tag} slug={slug}>
      <Header {...meta} />
      <MDXRemote {...source} components={components} />
    </DocsLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tag = await getCurrentTag();
  const manifest = await fetchDocsManifest(tag);
  return { paths: getPaths(manifest.routes), fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tag, slug } = getSlug(params);
  const currentTag = await getCurrentTag(tag);
  const manifest = await fetchDocsManifest(currentTag).catch((error) => {
    // If a manifest wasn't found for a custom tag, show a 404 instead
    if (error.status === 404) return;
    throw error;
  });

  const route = manifest && findRouteByPath(slug, manifest.routes);

  if (!route) return { props: {} };

  const rawFileSource = await fetchRawDoc(route.path, currentTag);

  const { content, data } = matter(rawFileSource);
  const mdxSource = await serialize(content.toString());

  return {
    props: {
      source: mdxSource,
      routes: manifest.routes,
      currentRoute: route,
      meta: data,
    },
  };
};

export default DocsPage;
