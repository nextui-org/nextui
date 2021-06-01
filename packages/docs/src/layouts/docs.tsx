import React from 'react';
import Navbar from './navbar';
import { Container, Row, Col } from '@nextui/react';

const DocsLayout: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  return (
    <Container className="docs__container" display="flex" gap={0}>
      <Navbar />
      <Row>
        <Col span={3}>
          <p>Main Sidebar</p>
        </Col>
        <Col span={7}>{children}</Col>
        <Col span={2}>Component Sidebar</Col>
      </Row>
    </Container>
  );
};

export default DocsLayout;
