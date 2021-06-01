import React from 'react';
import { MetaProps } from '@lib/docs/meta';
import Header from './header';

export interface Props {
  meta?: MetaProps;
}

const DocsLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  meta,
}) => {
  return (
    <div>
      <Header {...meta} />
      {children}
    </div>
  );
};

export default DocsLayout;
