import React from 'react';
import Navbar from './navbar';
import { Container, Row, Col } from '@nextui/react';
import { Route } from '@lib/docs/page';
import { Sidebar } from '@components';

export interface Props {
  routes: Route[];
  tag?: string;
  slug?: string;
}

const DocsLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  routes,
  tag,
  slug,
}) => {
  return (
    <Container className="docs__container" display="flex" gap={0}>
      <Navbar />
      <Row className="docs__content">
        <Col className="docs__left-sidebar" span={3}>
          <Sidebar routes={routes} tag={tag} slug={slug} />
        </Col>
        <Col span={7}>{children}</Col>
        <Col span={2}>Component Sidebar</Col>
      </Row>
      <style jsx>
        {`
          :global(.docs__content) {
            padding-top: 2rem;
          }
        `}
      </style>
    </Container>
  );
};

export default DocsLayout;
