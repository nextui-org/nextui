import React, {useState} from "react";
import cn from "classnames";
import {InView} from "react-intersection-observer";
import NextLink from "next/link";
import {Box, Section, Title, Subtitle, BlockLink} from "@primitives";
import {Switch, Grid, Row, Col, Spacer, createTheme} from "@nextui-org/react";
import landingContent from "@content/landing";
import {darkTheme, lightTheme} from "@theme/shared";
import {CodeDemoBlock, Player, Blockholder} from "@components";

import {Moon, Sun} from "../icons";

const playerDarkTheme = createTheme({
  type: "dark",
  className: "player-dark-theme",
});
const playerLightTheme = createTheme({
  type: "light",
  className: "player-light-theme",
});

const DarkModeSection = () => {
  const [activeTheme, setActiveTheme] = useState("dark");
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleTheme = () => {
    setActiveTheme(activeTheme === "dark" ? "light" : "dark");
  };

  return (
    <InView as="section" className="inview-section" onChange={setIsVisible}>
      <Spacer css={{"@xsMax": {mt: "$14"}}} y={10} />
      <Section css={{position: "relative", zIndex: "$10"}}>
        <Box
          css={{
            position: "absolute",
            top: "-25%",
            left: "-20%",
            zIndex: "-$1",
            [`.${darkTheme} &`]: {
              left: "30%",
              right: "-30%",
              "@xsMax": {
                right: "-50%",
              },
            },
            "@xsMax": {
              top: "10%",
              right: "-50%",
              left: "0",
            },
          }}
        >
          <img alt="dark mode background" src="/dark-mode-gradient.svg" />
        </Box>
        <Row justify="flex-start">
          <Title>Dark mode</Title>
        </Row>
        <Row justify="flex-start">
          <Title>is</Title>
          <Spacer x={0.5} />
          <Title color="violet">effortless.</Title>
        </Row>
        <Subtitle>
          NextUI comes with a fully well-scaled default dark theme that you can apply to your
          application with just a few lines of code.
        </Subtitle>
        <Grid.Container gap={2}>
          <Grid
            css={{
              pl: 0,
              "@xsMax": {
                pr: "0",
              },
            }}
            sm={6}
            xs={12}
          >
            <Col css={{d: "flex", fd: "column", ai: "flex-start", pt: "$4"}}>
              <Spacer y={0.2} />
              <Switch
                checked={activeTheme === "dark"}
                css={{
                  $$switchColorHover: "linear-gradient(180deg, #FF1CF7 25%, #b249f8 100%)",
                  "& .nextui-switch": {
                    bg: "$$switchColorHover",
                  },
                  "& .nextui-switch-circle": {
                    bg: "#FFD1ED",
                    color: "#9F0EB7",
                  },
                }}
                iconOff={<Sun filled />}
                iconOn={<Moon filled />}
                size="xl"
                onChange={handleToggleTheme}
              />

              <Spacer y={1} />
              <Player
                className={cn(activeTheme === "dark" ? playerDarkTheme : playerLightTheme, {
                  "is-dark": activeTheme === "dark",
                  "is-light": activeTheme === "light",
                })}
                css={{
                  [`.${darkTheme} &`]: {
                    "&.is-light": {
                      $$cardColor: "$colors$white",
                    },
                  },
                  [`.${lightTheme} &`]: {
                    "&.is-dark": {
                      $$cardColor: "#363449",
                    },
                  },
                }}
              />
              <NextLink href="/docs/theme/dark-mode">
                <BlockLink color="pink">Learn more</BlockLink>
              </NextLink>
            </Col>
          </Grid>
          <Grid
            css={{
              pr: 0,
              "@xsMax": {
                pl: "0",
              },
            }}
            sm={6}
            xs={12}
          >
            <Col css={{dflex: "center", h: "100%"}}>
              {isVisible ? (
                <CodeDemoBlock
                  showWindowIcons
                  css={{
                    minHeight: 300,
                    boxShadow: "none",
                  }}
                  language="jsx"
                  value={landingContent.darkModeCode}
                />
              ) : (
                <Blockholder height="475px" />
              )}
            </Col>
          </Grid>
        </Grid.Container>
      </Section>
    </InView>
  );
};

export default DarkModeSection;
