import React from 'react';
import Header from './header';
import Footer from './footer';
import Navbar from './navbar';
import { Container } from '@nextui-org/react';
import { DotsContainer } from '@components';
import { Route } from '@lib/docs/page';

export interface Props {
  routes: Route[];
  currentRoute?: Route;
  tag?: string;
  slug?: string;
}

const DefaultLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  routes,
}) => {
  return (
    <DotsContainer>
      <Header />
      <Container
        lg
        display="flex"
        as="main"
        alignContent="space-between"
        className="main-container"
        gap={0}
      >
        <Navbar isHome routes={routes} />
        {children}
        <Footer />
        <style jsx>{`
          :global(.main-container) {
            margin: 0 auto;
            position: relative;
            min-height: 100vh;
          }
        `}</style>
      </Container>
    </DotsContainer>
  );
};

export default DefaultLayout;
