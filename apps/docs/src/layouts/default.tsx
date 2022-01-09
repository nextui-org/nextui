import React from 'react';
import Header from './header';
import Footer from './footer';
import Navbar from './navbar';
import { Container } from '@nextui-org/react';
import { Route } from '@lib/docs/page';

export interface Props {
  routes: Route[];
  currentRoute?: Route;
  tag?: string;
  slug?: string;
}

const DefaultLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  routes
}) => {
  return (
    <>
      <Header />
      <Navbar isHome routes={routes} />
      <Container
        lg
        display="flex"
        as="main"
        alignContent="space-between"
        className="main-container"
        css={{
          position: 'relative',
          minHeight: '100vh'
        }}
      >
        {children}
        <Footer />
      </Container>
    </>
  );
};

export default DefaultLayout;
