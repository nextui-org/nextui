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
      <div className="wrapper">
        <Container lg display="flex" as="main" className="main-container">
          <Navbar />
          {children}
          <Footer />
        </Container>
      </div>
      <style jsx>{`
        .wrapper {
          --dot-size: 1px;
          --dot-space: 22px;
          --navbar-height: 50px;
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(90deg, #000 21px, transparent 1%) 50%,
            linear-gradient(#000 21px, transparent 1%) 50%, #444;
          background-size: var(--dot-space) var(--dot-space);
        }
        :global(.main-container) {
          min-height: 100vh;
        }
      `}</style>
    </BaseLayout>
  );
};

export default DefaultLayout;
