import React from 'react';
import { Meta } from '@storybook/react';
import Card from './index';
import {
  Row,
  Col,
  Link,
  Image,
  Text,
  Spacer,
  Divider,
  Code,
  Grid
} from '../index';
import { CardColors } from '../utils/prop-types';
import AppleEvent from '../../assets/apple-event.jpeg';

export default {
  title: 'Surfaces/Card',
  component: Card,
  decorators: [
    (Story) => (
      <Grid.Container gap={1} justify="center" direction="column">
        <Story />
      </Grid.Container>
    )
  ]
} as Meta;

export const Default = () => (
  <Card width="400px">
    <p>A basic card.</p>
  </Card>
);

export const Bordered = () => (
  <Card width="400px" bordered>
    <p>A bordered card.</p>
  </Card>
);

export const Colors = () => {
  const colorsLeft: Array<CardColors> = [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'dark'
  ];
  const colorsRight: Array<CardColors> = [
    'alert',
    'purple',
    'violet',
    'cyan',
    'gradient',
    'lite'
  ];
  return (
    <>
      {colorsLeft.map((left, index) => (
        <Grid.Container gap={2} key={left} style={{ marginBottom: '18px' }}>
          <Grid xs={6}>
            <Card color={left}>
              <Text h4 capitalize>
                {left}
              </Text>
              <Text span>{left}</Text>
            </Card>
          </Grid>
          <Grid xs={6}>
            <Card color={colorsRight[index]}>
              <Text h4 capitalize>
                {colorsRight[index]}
              </Text>
              <Text span>{colorsRight[index]}</Text>
            </Card>
          </Grid>
        </Grid.Container>
      ))}
    </>
  );
};

export const NoShadow = () => (
  <Card shadow={false} width="400px">
    <h4>The Evil Rabbit</h4>
    <p>shadow card.</p>
  </Card>
);

export const WithFooter = () => (
  <Row wrap="wrap" justify="flex-start">
    <Card width="330px">
      <Text h4>Next UI</Text>
      <Text>🚀 Beautiful and modern React UI library.</Text>
      <Card.Footer>
        <Link color target="_blank" href="https://github.com/geist-org/react">
          Visit source code on GitHub.
        </Link>
      </Card.Footer>
    </Card>
    <Spacer x={1} />
    <Card width="330px" color="primary">
      <Text h4>Next UI</Text>
      <Text>🚀 Beautiful and modern React UI library.</Text>
      <Card.Footer>
        <Link target="_blank" href="https://github.com/geist-org/react">
          Visit source code on GitHub.
        </Link>
      </Card.Footer>
    </Card>
  </Row>
);

export const AbsImageWithHeader = () => {
  return (
    <Grid.Container gap={1} justify="center">
      <Grid>
        <Card width="330px">
          <Card.Header>
            <Col>
              <Text h4>What to watch</Text>
              <Text h3>Stream the Apple event</Text>
            </Col>
          </Card.Header>
          <Image
            disableAutoResize
            src={AppleEvent}
            height={200}
            width={400}
            style={{ objectFit: 'cover' }}
          />
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export const WithDivider = () => (
  <Card width="400px">
    <Card.Body>
      <Text b>Description</Text>
    </Card.Body>
    <Divider y={0} />
    <Card.Body>
      <Text>
        The Object constructor creates an object wrapper for the given value.
      </Text>
      <Text>
        When called in a non-constructor context, Object behaves identically to{' '}
        <Code>new Object()</Code>.
      </Text>
    </Card.Body>
  </Card>
);
