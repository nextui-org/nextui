import React from 'react';
import Header from './header';
import Footer from './footer';
import Navbar from './navbar';
import { Container } from '@nextui-org/react';

const DefaultLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <div className="wrapper">
      <Header />
      <Container
        display="flex"
        as="main"
        alignContent="space-between"
        className="main-container"
      >
        <Navbar />
        {children}
        <Footer />
      </Container>
      <style jsx>{`
        .wrapper {
          --dot-size: 1px;
          --dot-space: 22px;
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(90deg, #000 21px, transparent 1%) 50%,
            linear-gradient(#000 21px, transparent 1%) 50%, #444;
          background-size: var(--dot-space) var(--dot-space);
          overflow-y: clip;
        }
        :global(.main-container) {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default DefaultLayout;
