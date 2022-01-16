import React from 'react';
import { Card, Col, Grid, Row, Text, Button, Spacer } from '@nextui-org/react';
import { Box, Logo } from '@components';
import { Palette, Magic, GamingConsole, Star } from '../../icons';
import {
  GridItem,
  TabText,
  ProductSize,
  ProductImage,
  ProductImageContainer
} from './styles';

const tabs = [
  {
    id: 'nextui',
    title: 'NextUI',
    icon: () => (
      <Logo
        small
        size={44}
        css={{
          '& path': {
            fill: 'currentColor'
          }
        }}
      />
    )
  },
  {
    id: 'modern',
    title: 'Modern',
    icon: () => <Palette size={44} fill="currentColor" />
  },
  {
    id: 'elegant',
    title: 'Elegant',
    icon: () => <Magic size={44} fill="currentColor" />
  },
  {
    id: 'retro',
    title: 'Retro',
    icon: () => <GamingConsole size={44} fill="currentColor" />
  }
];

const sizes = [
  {
    id: 'extra-small',
    title: 'XS'
  },
  {
    id: 'small',
    title: 'S'
  },
  {
    id: 'medium',
    title: 'M'
  },
  {
    id: 'large',
    title: 'L'
  },
  {
    id: 'extra-large',
    title: 'XL'
  }
];

const ShopCard: React.FC<unknown> = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0].id);
  const [activeSize, setActiveSize] = React.useState(sizes[0].id);
  const [liked, setLiked] = React.useState(false);

  return (
    <Box>
      <Grid.Container gap={10} css={{ py: 0 }}>
        {tabs.map(({ id, title, icon }, index) => (
          <GridItem
            key={`${id}-${index}`}
            css={{ pl: 0 }}
            onClick={() => setActiveTab(id)}
            selected={activeTab === id}
          >
            {icon()}
            <TabText>{title}</TabText>
          </GridItem>
        ))}
      </Grid.Container>
      <Card css={{ py: '$2', mt: '$8', boxShadow: '$lg', br: '35px' }}>
        <Card.Body css={{ px: '$8', position: 'relative', ov: 'hidden' }}>
          <Star
            size={30}
            css={{
              position: 'absolute',
              top: '$6',
              right: '$8',
              cursor: 'pointer',
              '& path': {
                stroke: liked ? '$yellow500' : '$accents4',
                fill: liked ? '$yellow500' : 'transparent'
              },
              '&:hover': {
                '& path': {
                  stroke: liked ? '$yellow600' : 'currentcolor'
                }
              }
            }}
            onClick={() => setLiked(!liked)}
          />
          <Grid.Container>
            <Grid xs={4}>
              <ProductImageContainer>
                <ProductImage src="/images/shoes-1.png" />
              </ProductImageContainer>
            </Grid>
            <Grid xs={8} css={{ px: '$10' }}>
              <Col>
                <Text h4>Nike Adapt BB 2.0</Text>
                <Text b size={14} css={{ color: '$accents6' }}>
                  Consistent, customized fit, game-changing.
                </Text>
                <Row css={{ py: '$4' }}>
                  <Text size={18} b>
                    $279.97
                  </Text>
                  <Text
                    b
                    size={18}
                    css={{
                      textDecorationLine: 'line-through',
                      ml: '$8',
                      color: '$accents6'
                    }}
                  >
                    $350
                  </Text>
                  <Text b size={18} css={{ ml: '$4', color: '$success' }}>
                    20% off
                  </Text>
                </Row>
                <Grid.Container gap={2} css={{ py: '$4' }}>
                  {sizes.map(({ id, title }, index) => (
                    <Grid
                      key={`${id}-${index}`}
                      css={{ pl: 0 }}
                      onClick={() => setActiveSize(id)}
                    >
                      <ProductSize selected={activeSize === id}>
                        <Text
                          b
                          size={14}
                          css={{ textAlign: 'center', color: 'currentColor' }}
                        >
                          {title}
                        </Text>
                      </ProductSize>
                    </Grid>
                  ))}
                </Grid.Container>
                <Row css={{ pt: '$4' }}>
                  <Button auto shadow css={{ ov: 'hidden', tt: 'none' }}>
                    Buy now
                  </Button>
                  <Spacer x={0.5} />
                  <Button
                    auto
                    bordered
                    css={{
                      ov: 'hidden',
                      color: '$accents6',
                      borderColor: '$accents6',
                      tt: 'none'
                    }}
                  >
                    Add to bag
                  </Button>
                </Row>
              </Col>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Box>
  );
};

export default ShopCard;
