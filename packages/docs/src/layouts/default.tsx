import React from 'react';
import Header from './header';
import Footer from './footer';
import Navbar from './navbar';
import { Container } from '@nextui-org/react';
import { DotsContainer } from '@components';

const DefaultLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <DotsContainer>
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
        :global(.main-container) {
          min-height: 100vh;
        }
      `}</style>
    </DotsContainer>
  );
};

export default DefaultLayout;
