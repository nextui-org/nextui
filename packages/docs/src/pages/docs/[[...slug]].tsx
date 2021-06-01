import * as React from 'react';
import fs from 'fs';
import path from 'path';
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
import { getCurrentTag, fetchDocsManifest, getPaths } from '@lib/docs/page';

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
  const paths = getPaths(manifest.routes);
  console.log({ paths });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = getSlug(params);
  const folderPath = path.join(process.cwd(), 'content');
  const filePath = path.join(folderPath, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return {
      notFound: true, // It's not need for "fallback: false" but avoid fs.read exception
    };
  }
  const rawFileSource = fs.readFileSync(filePath);
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
