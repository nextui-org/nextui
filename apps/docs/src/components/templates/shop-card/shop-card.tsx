import React, {useMemo} from "react";
import {Card, Col, Grid, Row, Text, Spacer, useTheme} from "@nextui-org/react";
import {Box} from "@components";
import {get} from "lodash";
import {motion} from "framer-motion";

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
  StyledCard,
} from "./styles";
import {themes, sizes} from "./content";
import framerAnimations from "./animations";
import {
  lightModernTheme,
  darkModernTheme,
  lightElegantTheme,
  darkElegantTheme,
  lightRetroTheme,
  darkRetroTheme,
} from "./themes";

interface Props {
  onChangeTheme?: (theme: string) => void;
}

const getActiveTheme = (id: string, isDark?: boolean) => {
  switch (id) {
    case "nextui":
      return;
    case "modern":
      return isDark ? darkModernTheme : lightModernTheme;
    case "elegant":
      return isDark ? darkElegantTheme : lightElegantTheme;
    case "retro":
      return isDark ? darkRetroTheme : lightRetroTheme;
    default:
      return;
  }
};

const ShopCard: React.FC<Props> = ({onChangeTheme}) => {
  const [activeTheme, setActiveTheme] = React.useState(themes[0].id);
  const [activeSize, setActiveSize] = React.useState(sizes[0].id);
  const [liked, setLiked] = React.useState(false);
  const {isDark} = useTheme();

  const animations = get(framerAnimations, activeTheme);

  const theme = useMemo(() => getActiveTheme(activeTheme, isDark), [activeTheme, isDark]);

  const handleChangeTheme = (id: string) => {
    setActiveTheme(id);
    onChangeTheme?.(id);
  };

  return (
    <Box className={theme} css={{ov: "visible"}}>
      <Grid.Container css={{py: 0}} gap={5}>
        {themes.map(({id, title, icon}, index) => (
          <GridItem
            key={`${id}-${index}`}
            css={{pl: 0, "@xs": {mr: "$10"}}}
            selected={activeTheme === id}
            onClick={() => handleChangeTheme(id)}
          >
            {icon()}
            <TabText>{title}</TabText>
          </GridItem>
        ))}
      </Grid.Container>
      <Spacer y={0.1} />
      <StyledCard>
        <Card.Body css={{px: "$8", position: "relative", ov: "visible"}}>
          <StyledStar liked={liked} size={30} onClick={() => setLiked(!liked)} />
          <Grid.Container>
            <Grid
              css={{
                "@smMax": {
                  mr: "$10",
                },
                "@xsMax": {
                  width: "100%",
                  mr: "0 !important",
                },
              }}
              sm={4}
            >
              <ProductImageContainer animate={animations.productContainer} as={motion.div}>
                <ProductImage src="/images/shoes-1.png" />
              </ProductImageContainer>
            </Grid>
            <Grid
              css={{
                px: "$10",
                position: "relative",
                zIndex: "$10",
                "@xsMax": {
                  py: "$8",
                },
              }}
              sm={8}
            >
              <Col as="nav">
                <StyledTitle animate={animations.title} as={motion.h4}>
                  Nike Adapt BB 2.0
                </StyledTitle>
                <StyledSubtitle animate={animations.subtitle} as={motion.p}>
                  Consistent, customized fit, game-changing.
                </StyledSubtitle>
                <Row css={{py: "$4"}}>
                  <StyledPrice animate={animations.price} as={motion.p}>
                    $279.97
                  </StyledPrice>
                  <StyledOldPrice animate={animations.oldPrice} as={motion.p}>
                    $350
                  </StyledOldPrice>
                  <StyledDiscount animate={animations.discount} as={motion.p}>
                    20% off
                  </StyledDiscount>
                </Row>
                <Grid.Container css={{py: "$4"}} gap={2}>
                  {sizes.map(({id, title}, index) => (
                    <Grid key={`${id}-${index}`} css={{pl: 0}} onClick={() => setActiveSize(id)}>
                      <ProductSize
                        animate={animations.productSizeButton}
                        as={motion.div}
                        selected={activeSize === id}
                        transition={{duration: 0.1}}
                      >
                        <Text b css={{textAlign: "center", color: "currentColor"}} size={14}>
                          {title}
                        </Text>
                      </ProductSize>
                    </Grid>
                  ))}
                </Grid.Container>
                <Row css={{pt: "$4"}}>
                  <BuyButton auto shadow={activeTheme === "nextui"}>
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
