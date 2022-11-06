import React, {useEffect} from "react";
import {
  Input,
  Card,
  Row,
  Col,
  Loading,
  Text,
  styled,
  Grid,
  Pagination,
  Tooltip,
  Button,
  StyledButton,
} from "@nextui-org/react";
import {useRouter} from "next/router";
import {levitating} from "@utils/animations";
import {Logo, UserTwitterCard, ThemeSwitch} from "@components";
import {useIsMobile} from "@hooks/use-media-query";
import {darkTheme} from "@theme/shared";

const StyledContainer = styled("div", {
  dflex: "center",
  position: "absolute",
  zIndex: "$max",
  "@xsMax": {
    display: "none",
  },
});

const HeroComponents = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      const element = document.getElementById("nextui-tooltip");

      if (element) {
        element.remove();
      }
    }
  }, [isMobile]);

  return (
    <StyledContainer>
      <Input
        bordered
        clearable
        color="secondary"
        css={{
          position: "absolute",
          top: "-200px",
          right: "-100px",
          $$inputBorderColor: "$colors$secondary",
          animation: `${levitating} 10s ease infinite`,
        }}
        initialValue="NextUI"
        labelPlaceholder="Input"
      />
      <ThemeSwitch
        css={{
          color: "$black",
          position: "absolute",
          top: "-170%",
          right: "-120%",
          animation: `${levitating} 13s ease infinite 1s reverse`,
          ".nextui-switch-circle": {
            bg: "$white",
          },
        }}
      />
      <UserTwitterCard
        avatarProps={{
          squared: false,
          color: "default",
          css: {
            ".nextui-avatar-img": {
              borderColor: "#FF1CF7",
            },
          },
        }}
        avatarUrl="/avatars/avatar-3.png"
        css={{
          position: "relative",
          cursor: "pointer",
          top: "-120px",
          left: "100px",
          px: "$8",
          mw: "280px",
          animation: `${levitating} 12s ease infinite`,
          backgroundColor: "$cardBackground",
          boxShadow: "$sm",
        }}
      />
      <Grid
        css={{
          position: "absolute",
          bottom: "-20px",
          left: "200px",
          animation: `${levitating} 14s ease infinite`,
        }}
      >
        <Tooltip
          initialVisible
          keepMounted
          color="secondary"
          content={"Developers love Next.js"}
          css={{
            animation: `${levitating} 14s ease infinite 0.1s`,
            marginLeft: "-90px",
            marginTop: "$2",
            transform: "translate(0, 0)",
          }}
          offset={124}
          trigger="click"
        >
          <Button auto bordered borderWeight="bold" color="primary" size="sm">
            Tooltip
          </Button>
        </Tooltip>
      </Grid>
      <Card
        css={{
          p: 0,
          w: "120px",
          h: "120px",
          position: "absolute",
          right: "-240px",
          top: "-300px",
          animation: `${levitating} 13s ease infinite 1s`,
        }}
      >
        <Card.Header css={{position: "absolute", zIndex: 1, top: -5}}>
          <Col>
            <Text color="#ffffffAA" size={10} transform="uppercase" weight="bold">
              New
            </Text>
          </Col>
        </Card.Header>
        <Card.Body css={{p: 0}}>
          <Card.Image
            alt="Card example background"
            css={{
              width: "100%",
              transform: "translateY(-30%)",
              height: "150%",
            }}
            height={400}
            objectFit="cover"
            src="/images/card-example-6.jpeg"
            width="100%"
          />
        </Card.Body>
        <Card.Footer
          css={{
            position: "absolute",
            bf: "saturate(180%) blur(10px)",
            bg: "$backgroundBlur",
            maxHeight: "$space$12",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            px: "$6",
            bottom: "0px",
            zIndex: "$max",
          }}
        >
          <Row justify="space-between">
            <Text
              color="#fff"
              css={{
                fontWeight: "$semibold",
                textShadow: "0 2px 2px rgba(0,0,0,0.3)",
              }}
              size={12}
            >
              Camera
            </Text>
            <Text
              color="#fff"
              css={{
                fontWeight: "$semibold",
                textShadow: "0 2px 2px rgba(0,0,0,0.3)",
              }}
              size={12}
            >
              $525
            </Text>
          </Row>
        </Card.Footer>
      </Card>
      <Button.Group
        bordered
        borderWeight="bold"
        color="gradient"
        css={{
          position: "absolute",
          top: "-160px",
          left: "180%",
          animation: `${levitating} 16s ease infinite`,
          [`& ${StyledButton}`]: {
            "&:not(:last-child)&:not(:first-child)": {
              pl: 0,
              py: "calc($space$1 + 1px)",
              filter: "hue-rotate(-45deg)",
            },
          },
        }}
        size="sm"
      >
        <Button>Fast</Button>
        <Button>Modern</Button>
        <Button>Unique</Button>
      </Button.Group>
      <Grid
        css={{
          position: "absolute",
          size: "100px",
          cursor: "pointer",
          top: "-110px",
          right: "-220px",
          dflex: "center",
          animation: `${levitating} 18s ease infinite`,
          backgroundColor: "$cardBackground",
          boxShadow: "$sm",
          borderRadius: "$lg",
        }}
        onClick={() => {
          router.push("/docs/guide/getting-started");
        }}
      >
        <Logo small size={60} />
      </Grid>
      <Pagination
        noMargin
        rounded
        shadow
        css={{
          position: "absolute",
          top: "-80px",
          right: "-190%",
          animation: `${levitating} 20s ease infinite 2s`,
        }}
        initialPage={6}
        size="md"
        total={10}
      />
      <Grid
        css={{
          position: "absolute",
          zIndex: "$3",
          size: "80px",
          top: "-20px",
          right: "-120%",
          display: "flex",
          animation: `${levitating} 23s ease infinite`,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "$cardBackground",
          boxShadow: "$sm",
          borderRadius: "$lg",
        }}
      >
        <Loading size="lg" />
      </Grid>
      <Card
        css={{
          p: 0,
          w: "200px",
          h: "200px",
          zIndex: "$2",
          position: "absolute",
          right: "-95%",
          top: "40px",
          animation: `${levitating} 18s ease infinite 1s`,
        }}
      >
        <Card.Body css={{p: 0}}>
          <Card.Image
            alt="Hero Card background"
            height={400}
            objectFit="cover"
            src="/images/hero-card.png"
            width="100%"
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bf: "saturate(180%) blur(10px)",
            bg: "$backgroundBlur",
            px: "$6",
            py: "$4",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row align="center">
            <Col>
              <Text
                css={{
                  textShadow: "0 2px 2px rgba(0,0,0,0.3)",
                  color: "$white",
                }}
                size={12}
              >
                Available soon.
              </Text>
            </Col>
            <Col>
              <Row align="center" justify="flex-end">
                <Button
                  auto
                  rounded
                  color="secondary"
                  css={{
                    px: "$4",
                    height: "$space$10",
                    color: "$white",
                    [`.${darkTheme} &`]: {
                      bg: "$purple900",
                      color: "$purple300",
                    },
                  }}
                  size="sm"
                >
                  Notify Me
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </StyledContainer>
  );
};

export default HeroComponents;
