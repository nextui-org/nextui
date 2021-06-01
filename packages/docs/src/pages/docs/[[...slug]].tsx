import * as React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import DocsLayout from '@layouts/docs';
import * as Components from '@nextui/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getSlug } from '@lib/docs/utils';
import { MetaProps } from '@lib/docs/meta';

const components = { ...Components };

interface Props {
  source: MDXRemoteSerializeResult;
  meta: MetaProps;
}

const IntroPage: React.FC<Props> = ({ source, meta }) => {
  return (
    <DocsLayout meta={meta}>
      <MDXRemote {...source} components={components} />
    </DocsLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['/docs/getting-started', '/docs/guide/introduction'],
    fallback: false,
  };
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

export default IntroPage;
