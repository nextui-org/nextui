import React from "react";
import {useRouter} from "next/router";
import {FeaturesGrid, Note, NextJsLogo} from "@components";
import {Button, Container, Grid, Snippet} from "@nextui-org/react";
import {StyledCardBlur, Title, Subtitle} from "@primitives";

const bannerSuggestions = [
  {
    title: "Getting Started",
    description:
      "NextUI allows you make beautiful, modern, and fast websites/applications regardless of your design experience.",
    icon: <Note fill="#FF4ECD" />,
    href: "/docs/guide/getting-started",
  },
  {
    title: "NextUI + Next.js",
    description:
      "NextUI is totally compatible with Next.js you just need to customize the _app.jsx entry file to load the provider.",
    icon: <NextJsLogo fill="#FF4ECD" />,
    href: "/docs/guide/nextui-plus-nextjs",
  },
];

const InstallBanner: React.FC = () => {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push("docs/guide/getting-started");
  };

  return (
    <StyledCardBlur
      css={{
        br: 0,
        p: 0,
        dflex: "center",
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        ml: "-50vw",
        mr: "-50vw",
        border: "1.5px solid $border",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
      }}
    >
      <Container
        lg
        css={{
          ml: 0,
          mr: 0,
          py: "$8",
          "@xsMax": {
            px: "$4",
          },
        }}
      >
        <Grid.Container gap={2}>
          <Grid direction="column" justify="center" md={6} xs={12}>
            <Title css={{fontSize: "2.4rem"}}>Let&apos;s make the Web</Title>
            <Title color="violet" css={{fontSize: "2.4rem"}}>
              Prettier
            </Title>
            <Subtitle
              css={{
                my: "$2",
                fs: "1.2rem",
                maxW: "100%",
                "@xsMax": {
                  my: "$8",
                },
              }}
            >
              Try it for yourself, and share with us what you&apos;ve built!
            </Subtitle>
            <Grid.Container alignItems="center" xs={12}>
              <Grid sm={2.5} xs={12}>
                <Button
                  auto
                  rounded
                  color="secondary"
                  css={{
                    "@xsMax": {
                      width: "100%",
                      mb: "$6",
                    },
                  }}
                  onClick={handleGetStartedClick}
                >
                  Get started
                </Button>
              </Grid>
              <Grid sm={9.5} xs={12}>
                <Snippet
                  className="hero__snippet"
                  css={{
                    borderRadius: "$pill",
                    height: "$space$14",
                    py: 0,
                    transition: "opacity 0.3s ease-in-out",
                    dflex: "center",
                    boxShadow: "$sm",
                    bf: "saturate(180%) blur(10px)",
                    bg: "$backgroundBlur",
                    "@xsMax": {
                      width: "100%",
                    },
                  }}
                  tooltipColor="secondary"
                >
                  npm install @nextui-org/react
                </Snippet>
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid css={{py: "$10"}} md={6} xs={12}>
            <FeaturesGrid
              features={bannerSuggestions}
              itemCss={{
                bg: "rgba(255, 255, 255, 0)",
              }}
              lg={6}
              sm={6}
              xs={12}
            />
          </Grid>
        </Grid.Container>
      </Container>
    </StyledCardBlur>
  );
};

export default InstallBanner;
