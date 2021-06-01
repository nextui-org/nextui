import * as React from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import DocsLayout from '@layouts/docs';
import * as Components from '@nextui/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getSlug } from '@lib/docs/utils';
import fs from 'fs';
import path from 'path';

const components = { ...Components };

interface Props {
  source: MDXRemoteSerializeResult;
}

const IntroPage: React.FC<Props> = ({ source }) => {
  return (
    <DocsLayout>
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
  const mdx = fs.readFileSync(filePath);
  const mdxSource = await serialize(mdx.toString());
  return {
    props: {
      source: mdxSource,
    },
  };
};

export default IntroPage;
