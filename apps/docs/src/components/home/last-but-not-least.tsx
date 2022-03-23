import React from 'react';
import { Section, Title, Subtitle } from '@primitives';
import { Row, Spacer } from '@nextui-org/react';
import landingContent from '@content/landing';
import { FeaturesGrid } from '@components';

const LastButNotLeastSection = () => {
  return (
    <Section css={{ zIndex: '$10' }}>
      <Spacer y={6} css={{ '@xsMax': { mt: '$14' } }} />
      <Row justify="center">
        <Title>Last&nbsp;</Title>
        <Title color="warning">but&nbsp;</Title>
      </Row>
      <Row justify="center">
        <Title>not&nbsp;</Title>
        <Title color="pink">least.</Title>
      </Row>
      <Row justify="center">
        <Subtitle css={{ textAlign: 'center' }}>
          A fully-featured React UI library.
        </Subtitle>
      </Row>
      <FeaturesGrid features={landingContent.fullFeatures} />
    </Section>
  );
};

export default LastButNotLeastSection;
