import React from 'react';
import { Logo } from '@components';
import { Container } from '@nextui/react';

const Navbar: React.FC = () => {
  return (
    <Container
      className="navbar__container"
      display="flex"
      alignItems="center"
      as="nav"
      gap={0}
    >
      <Logo />
      <style jsx>{`
        :global(.navbar__container) {
          min-height: var(--navbar-height);
        }
      `}</style>
    </Container>
  );
};

export default Navbar;
