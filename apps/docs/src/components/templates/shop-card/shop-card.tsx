import React, { useMemo } from 'react';
import {
  Card,
  Col,
  Grid,
  Row,
  Text,
  Spacer,
  useTheme
} from '@nextui-org/react';
import { Box } from '@components';
import {
  GridItem,
  TabText,
  ProductSize,
  ProductImage,
  ProductImageContainer,
  StyledStar,
  BuyButton,
  AddToBagButton,
  StyledTitle,
  StyledSubtitle,
  StyledPrice,
  StyledOldPrice,
  StyledDiscount,
  StyledCard
} from './styles';
import { get } from 'lodash';
import { themes, sizes } from './content';
import { motion } from 'framer-motion';
import framerAnimations from './animations';
import {
  lightModernTheme,
  darkModernTheme,
  lightElegantTheme,
  darkElegantTheme,
  lightRetroTheme,
  darkRetroTheme
} from './themes';

interface Props {
  onChangeTheme?: (theme: string) => void;
}

const getActiveTheme = (id: string, isDark?: boolean) => {
  switch (id) {
    case 'nextui':
      return;
    case 'modern':
      return isDark ? darkModernTheme : lightModernTheme;
    case 'elegant':
      return isDark ? darkElegantTheme : lightElegantTheme;
    case 'retro':
      return isDark ? darkRetroTheme : lightRetroTheme;
    default:
      return;
  }
};

const ShopCard: React.FC<Props> = ({ onChangeTheme }) => {
  const [activeTheme, setActiveTheme] = React.useState(themes[0].id);
  const [activeSize, setActiveSize] = React.useState(sizes[0].id);
  const [liked, setLiked] = React.useState(false);
  const { isDark } = useTheme();

  const animations = get(framerAnimations, activeTheme);

  const theme = useMemo(
    () => getActiveTheme(activeTheme, isDark),
    [activeTheme, isDark]
  );

  const handleChangeTheme = (id: string) => {
    setActiveTheme(id);
    onChangeTheme?.(id);
  };

  return (
    <Box className={theme} css={{ ov: 'visible' }}>
      <Grid.Container gap={5} css={{ py: 0 }}>
        {themes.map(({ id, title, icon }, index) => (
          <GridItem
            key={`${id}-${index}`}
            css={{ pl: 0, '@xs': { mr: '$10' } }}
            onClick={() => handleChangeTheme(id)}
            selected={activeTheme === id}
          >
            {icon()}
            <TabText>{title}</TabText>
          </GridItem>
        ))}
      </Grid.Container>
      <Spacer y={0.1} />
      <StyledCard>
        <Card.Body css={{ px: '$8', position: 'relative', ov: 'visible' }}>
          <StyledStar
            size={30}
            liked={liked}
            onClick={() => setLiked(!liked)}
          />
          <Grid.Container>
            <Grid
              sm={4}
              css={{
                '@smMax': {
                  mr: '$10'
                },
                '@xsMax': {
                  width: '100%',
                  mr: '0 !important'
                }
              }}
            >
              <ProductImageContainer
                as={motion.div}
                animate={animations.productContainer}
              >
                <ProductImage src="/images/shoes-1.png" />
              </ProductImageContainer>
            </Grid>
            <Grid
              sm={8}
              css={{
                px: '$10',
                position: 'relative',
                zIndex: '$10',
                '@xsMax': {
                  py: '$8'
                }
              }}
            >
              <Col as="nav">
                <StyledTitle as={motion.h4} animate={animations.title}>
                  Nike Adapt BB 2.0
                </StyledTitle>
                <StyledSubtitle as={motion.p} animate={animations.subtitle}>
                  Consistent, customized fit, game-changing.
                </StyledSubtitle>
                <Row css={{ py: '$4' }}>
                  <StyledPrice as={motion.p} animate={animations.price}>
                    $279.97
                  </StyledPrice>
                  <StyledOldPrice as={motion.p} animate={animations.oldPrice}>
                    $350
                  </StyledOldPrice>
                  <StyledDiscount as={motion.p} animate={animations.discount}>
                    20% off
                  </StyledDiscount>
                </Row>
                <Grid.Container gap={2} css={{ py: '$4' }}>
                  {sizes.map(({ id, title }, index) => (
                    <Grid
                      key={`${id}-${index}`}
                      css={{ pl: 0 }}
                      onClick={() => setActiveSize(id)}
                    >
                      <ProductSize
                        as={motion.div}
                        selected={activeSize === id}
                        animate={animations.productSizeButton}
                        transition={{ duration: 0.1 }}
                      >
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
                  <BuyButton auto shadow>
                    Buy now
                  </BuyButton>
                  <Spacer x={0.5} />
                  <AddToBagButton auto bordered>
                    Add to bag
                  </AddToBagButton>
                </Row>
              </Col>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </StyledCard>
    </Box>
  );
};

export default ShopCard;
