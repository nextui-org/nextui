import React from 'react';
import { Section, Title, Subtitle } from '@primitives';
import { Grid, Row, Col, Spacer, Text } from '@nextui-org/react';
import landingContent from '@content/landing';
import { CodeDemoBlock } from '@components';

const ComparationSection = () => {
  return (
    <Section css={{ zIndex: '$10' }}>
      <Row justify="flex-start">
        <Title>Do</Title>
        <Spacer x={0.5} />
        <Title color="cyan">more.</Title>
      </Row>
      <Row justify="flex-start">
        <Title>Write</Title>
        <Spacer x={0.5} />
        <Title color="warning">less code.</Title>
      </Row>
      <Subtitle>
        NextUI components have been created with the Developer's experience
        <br />
        in mind, avoiding having to import multiple components to display just
        one.
      </Subtitle>
      <Grid.Container gap={1.5}>
        <Grid
          xs={12}
          sm={6}
          css={{
            pl: 0,
            '@xsMax': {
              pr: '0'
            }
          }}
        >
          <Col css={{ dflex: 'center', fd: 'column' }}>
            <CodeDemoBlock
              showWindowIcons
              language="jsx"
              value={landingContent.comparativeCode.nextui}
              css={{
                minHeight: 340
              }}
            />
            <Text css={{ color: '$text', fontSize: '$md' }}>NextUI</Text>
          </Col>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          css={{
            pr: 0,
            '@xsMax': {
              pl: '0'
            }
          }}
        >
          <Col css={{ dflex: 'center', fd: 'column' }}>
            <CodeDemoBlock
              showWindowIcons
              language="jsx"
              css={{
                height: 340,
                boxShadow: 'none'
              }}
              value={landingContent.comparativeCode.others}
            />
            <Text css={{ color: '$accents5', fontSize: '$md' }}>Others</Text>
          </Col>
        </Grid>
      </Grid.Container>
    </Section>
  );
};

export default ComparationSection;
