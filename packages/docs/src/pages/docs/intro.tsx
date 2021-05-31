import * as React from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import { Button } from '@nextui/react';

const components = { Button };

export default function IntroPage({ source }) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} components={components} />
    </div>
  );
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const source = 'Some **mdx** text, with a component <Button>Button</Button>';
  const mdxSource = await serialize(source);
  return { props: { source: mdxSource } };
}
