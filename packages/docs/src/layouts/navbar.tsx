import React from 'react';
import { Logo } from '@components';
import { Container } from '@nextui/react';

const Navbar: React.FC = () => {
  return (
    <Container as="nav" gap={0} style={{ padding: '20px 0' }}>
      <Logo />
    </Container>
  );
};

export default Navbar;
