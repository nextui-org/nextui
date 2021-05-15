import React from 'react';
import BaseLayout from './base';
import Footer from './footer';
import Navbar from './navbar';

const DefaultLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <BaseLayout>
      <Navbar />
      {children}
      <Footer />
    </BaseLayout>
  );
};

export default DefaultLayout;
