import React from 'react';
import { Meta } from '@storybook/react';
import Card from './index';
import { styled } from '../theme/stitches.config';
import { Row, Col, Link, Text, Code, Button, Grid } from '../index';
import AppleEvent from '../../assets/apple-event.jpeg';
import Homepods from '../../assets/homepod.jpeg';
import Relaxing from '../../assets/relaxing.jpeg';
import BreathingApp from '../../assets/breathing-app-icon.jpeg';

export default {
  title: 'Surfaces/Card',
  component: Card
} as Meta;

export const Default = () => (
  <Card css={{ w: '400px' }}>
    <Card.Body css={{ py: '$lg' }}>
      <Text>A basic card</Text>
    </Card.Body>
  </Card>
);

export const Variants = () => (
  <Grid.Container gap={2}>
    <Grid xs={4}>
      <Card>
        <Card.Body>
          <Text>Default card. (shadow)</Text>
        </Card.Body>
      </Card>
    </Grid>
    <Grid xs={4}>
      <Card variant="flat">
        <Card.Body>
          <Text>Flat card.</Text>
        </Card.Body>
      </Card>
    </Grid>
    <Grid xs={4}>
      <Card variant="bordered">
        <Card.Body>
          <Text>Bordered card.</Text>
        </Card.Body>
      </Card>
    </Grid>
  </Grid.Container>
);

export const WithFooter = () => (
  <Grid.Container gap={2}>
    <Grid xs={4}>
      <Card css={{ p: '$6' }}>
        <Card.Header>
          <img
            alt="nextui logo"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width="34px"
            height="34px"
          />
          <Grid.Container css={{ pl: '$6' }}>
            <Grid xs={12}>
              <Text h4 css={{ lineHeight: '$xs' }}>
                Next UI
              </Text>
            </Grid>
            <Grid xs={12}>
              <Text css={{ color: '$accents8' }}>nextui.org</Text>
            </Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Body css={{ py: '$2' }}>
          <Text>
            Make beautiful websites regardless of your design experience.
          </Text>
        </Card.Body>
        <Card.Footer>
          <Link
            icon
            color="primary"
            target="_blank"
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link>
        </Card.Footer>
      </Card>
    </Grid>
  </Grid.Container>
);

export const AbsImageWithHeader = () => {
  return (
    <Grid.Container gap={1} justify="center">
      <Grid>
        <Card css={{ w: '330px' }}>
          <Card.Header css={{ position: 'absolute', top: 5, zIndex: 1 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                What to watch
              </Text>
              <Text h3 color="white">
                Stream the Apple event
              </Text>
            </Col>
          </Card.Header>
          <Card.Image
            autoResize={false}
            src={AppleEvent}
            height={440}
            width="100%"
            alt="Apple event background"
            style={{ objectFit: 'cover' }}
          />
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export const AbsImgWithHeaderFooter = () => {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid>
        <Card css={{ w: '330px', bg: '$gray50' }}>
          <Card.Header css={{ position: 'absolute', top: 5, zIndex: 1 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#9E9E9E"
              >
                New
              </Text>
              <Text h2 color="black">
                HomePod mini
              </Text>
              <Text size={14} style={{ paddingRight: '10px' }}>
                Room-filling sound, Intelligent assistant. Smart home control.
                Works seamlessly with iPhone. Check it out
              </Text>
            </Col>
          </Card.Header>
          <Card.Image
            autoResize={false}
            src={Homepods}
            height={440}
            width="100%"
            alt="Apple homedpods background"
            style={{ objectFit: 'cover', paddingTop: '100px' }}
          />
          <Card.Footer css={{ m: 0 }}>
            <Row>
              <Col>
                <Text size={12}>Available soon.</Text>
                <Text size={12}>Get notified.</Text>
              </Col>
              <Col>
                <Row justify="flex-end">
                  <Button flat auto rounded>
                    <Text size={12} weight="bold" transform="uppercase">
                      Notify Me
                    </Text>
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
      <Grid>
        <Card css={{ w: '630px' }}>
          <Card.Header css={{ position: 'absolute', top: 5, zIndex: 1 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#9E9E9E"
              >
                Your day your way
              </Text>
              <Text h3 color="white">
                Your checklist for better sleep
              </Text>
            </Col>
          </Card.Header>
          <Card.Image
            autoResize={false}
            src={Relaxing}
            height={440}
            width="100%"
            alt="Apple homedpods background"
            style={{ objectFit: 'cover' }}
          />
          <Card.Footer
            blur
            css={{
              position: 'absolute',
              bgBlur: '#0f111466',
              borderTop: '$borderWeights$light solid $gray500',
              bottom: 0,
              zIndex: 1
            }}
          >
            <Row>
              <Col>
                <Row>
                  <Col span={3}>
                    <Card.Image
                      autoResize={false}
                      src={BreathingApp}
                      style={{ background: 'black' }}
                      height={40}
                      width={40}
                      alt="Breathing app icon"
                    />
                  </Col>
                  <Col>
                    <Text color="#d1d1d1" size={12}>
                      Breathing App
                    </Text>
                    <Text color="#d1d1d1" size={12}>
                      Get a good night's sleep.
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row justify="flex-end">
                  <Button
                    flat
                    auto
                    rounded
                    css={{ color: '#94f9f0', bg: '#94f9f026' }}
                  >
                    <Text size={12} weight="bold" transform="uppercase">
                      Get App
                    </Text>
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export const CoverImage = () => (
  <Grid.Container gap={2} justify="center">
    <Grid xs={12} sm={4}>
      <Card>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col>
            <Text
              size={12}
              weight="bold"
              transform="uppercase"
              color="#ffffffAA"
            >
              What to watch
            </Text>
            <Text h4 color="white">
              Stream the Acme event
            </Text>
          </Col>
        </Card.Header>
        <Card.Image
          src="https://nextui.org/images/card-example-4.jpeg"
          objectFit="cover"
          width="100%"
          height={340}
          alt="Card image background"
        />
      </Card>
    </Grid>
    <Grid xs={12} sm={4}>
      <Card css={{ w: '100%' }}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col>
            <Text
              size={12}
              weight="bold"
              transform="uppercase"
              color="#ffffffAA"
            >
              Plant a tree
            </Text>
            <Text h4 color="white">
              Contribute to the planet
            </Text>
          </Col>
        </Card.Header>
        <Card.Image
          src="https://nextui.org/images/card-example-3.jpeg"
          width="100%"
          height={340}
          objectFit="cover"
          alt="Card image background"
        />
      </Card>
    </Grid>
    <Grid xs={12} sm={4}>
      <Card css={{ bg: '$black', w: '100%' }}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col>
            <Text
              size={12}
              weight="bold"
              transform="uppercase"
              color="#ffffffAA"
            >
              Supercharged
            </Text>
            <Text h4 color="white">
              Creates beauty like a beast
            </Text>
          </Col>
        </Card.Header>
        <Card.Image
          src="https://nextui.org/images/card-example-2.jpeg"
          width="100%"
          height={340}
          objectFit="cover"
          alt="Card image background"
        />
      </Card>
    </Grid>
    <Grid xs={12} sm={5}>
      <Card css={{ w: '100%', h: '400px' }}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col>
            <Text
              size={12}
              weight="bold"
              transform="uppercase"
              color="#ffffffAA"
            >
              New
            </Text>
            <Text h3 color="black">
              Acme camera
            </Text>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src="https://nextui.org/images/card-example-6.jpeg"
            width="100%"
            height="100%"
            objectFit="cover"
            alt="Card example background"
          />
        </Card.Body>
        <Card.Footer
          blur
          css={{
            position: 'absolute',
            bgBlur: '#ffffff66',
            borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
            bottom: 0,
            zIndex: 1
          }}
        >
          <Row>
            <Col>
              <Text color="#000" size={12}>
                Available soon.
              </Text>
              <Text color="#000" size={12}>
                Get notified.
              </Text>
            </Col>
            <Col>
              <Row justify="flex-end">
                <Button flat auto rounded color="secondary">
                  <Text
                    css={{ color: 'inherit' }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Notify Me
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
    <Grid xs={12} sm={7}>
      <Card css={{ w: '100%', h: '400px' }}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col>
            <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
              Your day your way
            </Text>
            <Text h3 color="white">
              Your checklist for better sleep
            </Text>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src="https://nextui.org/images/card-example-5.jpeg"
            objectFit="cover"
            width="100%"
            height="100%"
            alt="Relaxing app background"
          />
        </Card.Body>
        <Card.Footer
          blur
          css={{
            position: 'absolute',
            bgBlur: '#0f111466',
            borderTop: '$borderWeights$light solid $gray700',
            bottom: 0,
            zIndex: 1
          }}
        >
          <Row>
            <Col>
              <Row>
                <Col span={3}>
                  <Card.Image
                    src="https://nextui.org/images/breathing-app-icon.jpeg"
                    css={{ bg: 'black', br: '50%' }}
                    height={40}
                    width={40}
                    alt="Breathing app icon"
                  />
                </Col>
                <Col>
                  <Text color="#d1d1d1" size={12}>
                    Breathing App
                  </Text>
                  <Text color="#d1d1d1" size={12}>
                    Get a good night's sleep.
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row justify="flex-end">
                <Button
                  flat
                  auto
                  rounded
                  css={{ color: '#94f9f0', bg: '#94f9f026' }}
                >
                  <Text
                    css={{ color: 'inherit' }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Get App
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  </Grid.Container>
);

export const PrimaryAction = () => {
  const list = [
    {
      title: 'Orange',
      img: '/images/fruit-1.jpeg',
      price: '$5.50'
    },
    {
      title: 'Tangerine',
      img: '/images/fruit-2.jpeg',
      price: '$3.00'
    },
    {
      title: 'Raspberry',
      img: '/images/fruit-3.jpeg',
      price: '$10.00'
    },
    {
      title: 'Lemon',
      img: '/images/fruit-4.jpeg',
      price: '$5.30'
    },
    {
      title: 'Advocato',
      img: '/images/fruit-5.jpeg',
      price: '$15.70'
    },
    {
      title: 'Lemon 2',
      img: '/images/fruit-6.jpeg',
      price: '$8.00'
    },
    {
      title: 'Banana',
      img: '/images/fruit-7.jpeg',
      price: '$7.50'
    },
    {
      title: 'Watermelon',
      img: '/images/fruit-8.jpeg',
      price: '$12.20'
    }
  ];

  return (
    <Grid.Container gap={2} justify="flex-start">
      {list.map((item, index) => (
        <Grid xs={6} sm={3} key={index}>
          <Card isPressable>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={'https://nextui.org' + item.img}
                objectFit="cover"
                width="100%"
                height={140}
                alt={item.title}
              />
            </Card.Body>
            <Card.Footer css={{ justifyItems: 'flex-start' }}>
              <Row wrap="wrap" justify="space-between">
                <Text b>{item.title}</Text>
                <Text css={{ color: '$accents7', fontWeight: '$semibold' }}>
                  {item.price}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
};

export const CenterImgWithHeader = () => {
  const list = [
    {
      title: 'Mac',
      img: require('../../assets/mac.png')
    },
    {
      title: 'iPhone',
      img: require('../../assets/iphone.png')
    },
    {
      title: 'iPad',
      img: require('../../assets/ipad.png')
    },
    {
      title: 'Apple Watch',
      img: require('../../assets/apple-watch.png')
    },
    {
      title: 'AirPods',
      img: require('../../assets/airpods.png')
    },
    {
      title: 'AirTag',
      img: require('../../assets/airtag.png')
    },
    {
      title: 'Apple TV',
      img: require('../../assets/appletv.png')
    },
    {
      title: 'HomePod mini',
      img: require('../../assets/homepod-mini.png')
    },
    {
      title: 'Accessories',
      img: require('../../assets/accessories.png')
    }
  ];
  return (
    <Grid.Container gap={2} justify="center">
      {list.map((item, index) => (
        <Grid key={index}>
          <Card isHoverable isPressable css={{ w: '200px', h: '220px' }}>
            <Card.Header css={{ p: 0 }}>
              <Text h5 style={{ paddingLeft: '24px', paddingTop: '10px' }}>
                {item.title}
              </Text>
            </Card.Header>
            <Card.Body css={{ h: '100%', jc: 'center' }}>
              <Card.Image
                autoResize={false}
                src={item.img}
                width={180}
                alt={item.title}
              />
            </Card.Body>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
};

export const WithDivider = () => (
  <Card css={{ w: '400px' }}>
    <Card.Header>
      <Text b>Description</Text>
    </Card.Header>
    <Card.Divider />
    <Card.Body>
      <Text>
        The Object constructor creates an object wrapper for the given value.
      </Text>
    </Card.Body>
    <Card.Divider />
    <Card.Footer>
      <Text>
        When called in a non-constructor context, Object behaves identically to{' '}
        <Code>new Object()</Code>.
      </Text>
    </Card.Footer>
  </Card>
);

export const Shadows = () => {
  const Box = styled('div', {
    size: '120px',
    dflex: 'center',
    bg: '$backgroundContrast',
    br: '$md'
  });

  const shadows = ['$xs', '$sm', '$md', '$lg', '$xl'];

  return (
    <Grid.Container justify="center" gap={3}>
      <Grid xs={12} justify="center">
        <Text b>Drop shadows</Text>
      </Grid>
      {shadows.map((shadow, index) => (
        <Grid key={`${shadow}_${index}`} xs={6} sm={2}>
          <Box css={{ dropShadow: shadow }}>
            <Text>Shadow: {shadow}</Text>
          </Box>
        </Grid>
      ))}
      <Grid xs={12} justify="center">
        <Text b>Box shadows</Text>
      </Grid>
      {shadows.map((shadow, index) => (
        <Grid key={`${shadow}_${index}`} xs={6} sm={2}>
          <Box css={{ boxShadow: shadow }}>
            <Text>Shadow: {shadow}</Text>
          </Box>
        </Grid>
      ))}
    </Grid.Container>
  );
};
