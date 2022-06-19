import React from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {Container, Row, Col, Spacer, Button, Grid, Snippet} from "@nextui-org/react";

import {StyledTitle, StyledGradientTitle, StyledSubtitle} from "./styles";

const DynamicLopperBG = dynamic(() => import("../looper-bg"), {
  ssr: true,
});

const DynamicHeroComponents = dynamic(() => import("./components"), {
  ssr: true,
});

const Hero: React.FC = () => {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push("docs/guide/getting-started");
  };

  return (
    <Container
      alignItems="center"
      as="section"
      className="hero__container"
      css={{
        position: "relative",
        height: "calc(84vh - 76px)",
        "@xsMax": {
          height: "calc(100vh - 64px)",
        },
      }}
      display="flex"
      gap={0}
      justify="space-between"
      lg={true}
      wrap="nowrap"
    >
      <Row
        align="center"
        className="hero__content"
        css={{
          zIndex: "$2",
          "@mdMax": {
            mt: "80px",
            p: "0 8px",
          },
          "@xsMax": {
            mt: "0px",
          },
        }}
        wrap="wrap"
      >
        <Col
          className="hero__left-container"
          css={{
            position: "relative",
            zIndex: "$2",
            "@md": {
              width: "50%",
            },
            "@mdMax": {
              width: "100%",
            },
          }}
        >
          <StyledTitle css={{mb: 0}}>Make&nbsp;</StyledTitle>
          <StyledGradientTitle css={{mb: 0}}>beautiful&nbsp;</StyledGradientTitle>
          <StyledTitle css={{mb: 0, "@xsMax": {d: "inline-block"}}}>
            websites regardless of your design experience.
          </StyledTitle>

          <StyledSubtitle className="hero__text-subtitle">
            Beautiful, fast and modern React UI library.
          </StyledSubtitle>
          <Spacer y={1.5} />
          <Grid.Container
            alignItems="center"
            css={{
              "@md": {
                mt: "$lg",
              },
            }}
            gap={0}
          >
            <Grid sm={3} xs={12}>
              <Button
                auto
                rounded
                className="hero__get-started-button"
                css={{
                  maxHeight: "$space$14",
                  "@xsMax": {
                    width: "100%",
                    marginBottom: "$8",
                  },
                }}
                size="lg"
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
            </Grid>
            <Grid sm={9} xs={12}>
              <Snippet
                className="hero__snippet"
                css={{
                  borderRadius: "$pill",
                  height: "$space$14",
                  py: 0,
                  transition: "opacity 0.3s ease-in-out",
                  dflex: "center",
                  boxShadow: "$sm",
                  bg: "$backgroundContrast",
                  "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
                    bf: "saturate(180%) blur(10px)",
                    bg: "$backgroundBlur",
                  },
                  "@xsMax": {
                    width: "100%",
                  },
                }}
                tooltipColor="primary"
              >
                npm install @nextui-org/react
              </Snippet>
            </Grid>
          </Grid.Container>
        </Col>
        <Col
          className="hero__right-container"
          css={{
            position: "relative",
            height: "100%",
            "@mdMax": {
              display: "none",
            },
          }}
          span={6}
        >
          <DynamicHeroComponents />
        </Col>
      </Row>
      <DynamicLopperBG
        css={{
          zIndex: "0",
          position: "absolute",
          transform: "translate(10%, 5%)",
        }}
      />
    </Container>
  );
};

export default Hero;
