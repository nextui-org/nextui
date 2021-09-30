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
  Grid,
} from '../index';
import { CardColors } from '../utils/prop-types';
import Headphones from '../../../assets/headphones.jpg';
import Watch from '../../../assets/watch.jpeg';
import Items from '../../../assets/items.jpeg';
import Cup from '../../../assets/cup.jpeg';
import Airpods from '../../../assets/airpods.jpeg';
import Bicycle from '../../../assets/bicycle.jpeg';

export default {
  title: 'Surfaces/Card',
  component: Card,
  decorators: [
    (Story) => (
      <Grid.Container gap={2} justify="center" direction="column">
        <Story />
      </Grid.Container>
    ),
  ],
} as Meta;

export const Default = () => (
  <Card width="400px">
    <p>A basic card.</p>
  </Card>
);

export const Bordered = () => (
  <Card width="400px" bordered>
    <p>A basic card.</p>
  </Card>
);

export const Colors = () => {
  const colorsLeft: Array<CardColors> = [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'dark',
  ];
  const colorsRight: Array<CardColors> = [
    'alert',
    'purple',
    'violet',
    'cyan',
    'gradient',
    'lite',
  ];
  return (
    <>
      {colorsLeft.map((left, index) => (
        <Row justify="space-around" key={left} style={{ marginBottom: '18px' }}>
          <Col span={10}>
            <Card color={left}>
              <Text h4 capitalize>
                {left}
              </Text>
              <Text span>{left}</Text>
            </Card>
          </Col>
          <Col span={10}>
            <Card color={colorsRight[index]}>
              <Text h4 capitalize>
                {colorsRight[index]}
              </Text>
              <Text span>{colorsRight[index]}</Text>
            </Card>
          </Col>
        </Row>
      ))}
    </>
  );
};

export const Hoverable = () => (
  <Card hoverable width="400px">
    <p>hoverable card.</p>
  </Card>
);

export const Shadow = () => (
  <Card shadow width="400px">
    <h4>The Evil Rabbit</h4>
    <p>shadow card.</p>
  </Card>
);

export const WithFooter = () => (
  <Row flexWrap justify="flex-start">
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

export const WithImage = () => {
  const title = 'Next UI';
  const description = '🚀 Beautiful and modern React UI library.';
  const action = 'Visit source code on GitHub.';
  const cards = [
    {
      title,
      description,
      image: Headphones,
      action,
    },
    {
      title,
      description,
      image: Items,
      action: 'See articles',
    },
    {
      title,
      description,
      image: Watch,
      action: 'Order',
    },
    {
      title,
      description,
      image: Cup,
      action: 'Order',
    },
    {
      title,
      description,
      image: Airpods,
      action: 'Buy',
    },
    {
      title,
      description,
      image: Bicycle,
      action: 'See more information',
    },
  ];
  return (
    <Grid.Container gap={1} justify="center">
      {cards.map((card, index) => (
        <Grid key={index}>
          <Card width="330px" animated>
            <Image
              disableAutoResize
              src={card.image}
              height={200}
              width={400}
              style={{ objectFit: 'cover' }}
            />
            <Text h4>{card.title}</Text>
            <Text>{card.description}</Text>
            <Card.Footer>
              <Link
                color
                target="_blank"
                href="https://github.com/jrgarciadev/nextui"
              >
                {card.action}
              </Link>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
};

export const WithDivider = () => (
  <Card width="400px">
    <Card.Content>
      <Text b>Description</Text>
    </Card.Content>
    <Divider y={0} />
    <Card.Content>
      <Text>
        The Object constructor creates an object wrapper for the given value.
      </Text>
      <Text>
        When called in a non-constructor context, Object behaves identically to{' '}
        <Code>new Object()</Code>.
      </Text>
    </Card.Content>
  </Card>
);
