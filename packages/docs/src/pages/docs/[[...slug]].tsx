import * as React from 'react';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Header from '@layouts/header';
import DocsLayout from '@layouts/docs';
import * as Components from '@nextui/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getSlug } from '@lib/docs/utils';
import { MetaProps } from '@lib/docs/meta';
import { ReactFCLayout } from '@lib/types';
import {
  getCurrentTag,
  fetchDocsManifest,
  getPaths,
  fetchRawDoc,
  findRouteByPath,
} from '@lib/docs/page';

const components = { ...Components };

interface Props {
  source: MDXRemoteSerializeResult;
  meta: MetaProps;
}

const DocsPage: ReactFCLayout<Props> = ({ source, meta }) => {
  return (
    <>
      <Header {...meta} />
      <MDXRemote {...source} components={components} />
    </>
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
      meta: data,
    },
  };
};

DocsPage.Layout = DocsLayout;

export default DocsPage;
