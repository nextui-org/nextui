import React from 'react';

export interface Meta {
  title: string;
}

export interface Props {
  meta?: Meta;
  getStaticProps?: any;
}

const DocsLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  meta,
}) => {
  console.log({ meta });
  return <>{children}</>;
};

export default DocsLayout;
