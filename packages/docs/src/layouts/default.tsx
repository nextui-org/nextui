import React from 'react';
import BaseLayout from './base';
import Footer from './footer';

const DefaultLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <BaseLayout>
      {children}
      <Footer />
    </BaseLayout>
  );
};

export default DefaultLayout;
