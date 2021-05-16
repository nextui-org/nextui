import React from 'react';
import BaseLayout from './base';
import Footer from './footer';
import Navbar from './navbar';
import { Container } from '@nextui/react';

const DefaultLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <BaseLayout>
      <Container>
        <Navbar />
        {children}
        <Footer />
      </Container>
    </BaseLayout>
  );
};

export default DefaultLayout;
