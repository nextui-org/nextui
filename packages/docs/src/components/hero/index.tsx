import React from 'react';
import { Text, Row, Col } from '@nextui/react';
import { ImageBrowser } from '@components';

const Hero: React.FC = () => {
  return (
    <>
      <Row className="hero-container">
        <Col span={6}>
          <Text h1 className="hero__title" size="4.2rem">
            Beautiful, fast and
          </Text>
          <Text h1 size="4.2rem" className="hero__title hero__title-smooth">
            modern React UI library.
          </Text>
        </Col>
        <Col span={6} className="hero__image-container">
          <ImageBrowser className="hero__image" />
        </Col>
      </Row>
      <style jsx>{`
        :global(.hero-container) {
          padding: 20vh 0;
        }
        :global(.hero__title) {
          margin-bottom: 0rem;
          line-height: 1.2;
        }
        :global(.hero__title-smooth) {
          color: #c1c1c1 !important;
        }
        :global(.hero__image) {
          transform: translate3d(0, -50px, 0);
        }
      `}</style>
    </>
  );
};

export default Hero;
