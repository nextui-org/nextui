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
      <Container className="main-container">
        <Navbar />
        {children}
        <Footer />
      </Container>
      <style jsx>{`
        :global(.main-container) {
          min-height: 100vh;
          --dot-size: 1px;
          --dot-space: 22px;
          background: linear-gradient(90deg, #000 21px, transparent 1%) 50%,
            linear-gradient(#000 21px, transparent 1%) 50%, #444;
          background-size: var(--dot-space) var(--dot-space);
        }
      `}</style>
    </BaseLayout>
  );
};

export default DefaultLayout;
