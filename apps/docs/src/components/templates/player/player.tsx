import React from "react";
import {Card, Avatar, Grid, Text, Row, Progress, StyledProgressBar, CSS} from "@nextui-org/react";
import {Box, Heart, Play, Rewind5s, Forward5s, NextTrack, PreviousTrack} from "@components";

export interface Props {
  className?: string;
  css?: CSS;
}

const Player: React.FC<Props> = ({css, ...props}) => {
  const [liked, setLiked] = React.useState(false);

  return (
    <Card css={{p: "$6", mt: "$8", boxShadow: "$md", ...css}} {...props}>
      <Card.Header css={{d: "flex", ai: "center", py: "$8"}}>
        <Grid.Container>
          <Grid css={{mr: "$8"}}>
            <Avatar squared color="secondary" size="xl" src="/images/hero-card.png" />
          </Grid>
          <Grid>
            <Row>
              <Text b size={14}>
                Daily Mix
              </Text>
            </Row>
            <Row>
              <Text b css={{color: "$accents6"}} size={14}>
                12 Tracks
              </Text>
            </Row>
            <Row>
              <Text b size={16}>
                Frontend Radio
              </Text>
            </Row>
            <Heart
              css={{
                cursor: "pointer",
                position: "absolute",
                top: "$9",
                right: "$10",
              }}
              fill="#FF4ECD"
              filled={liked}
              onClick={() => setLiked(!liked)}
            />
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{mt: "$5", py: "$8"}}>
        <Row>
          <Progress
            css={{
              [`& ${StyledProgressBar}`]: {
                bg: "#FF4ECD",
              },
            }}
            max={100}
            size="sm"
            value={30}
          />
        </Row>
        <Row css={{py: "$6", px: "$1"}} justify="space-between">
          <Text b css={{color: "#FF4ECD"}} size={14}>
            13:36
          </Text>
          <Text b css={{color: "$accents6"}} size={14}>
            35:01
          </Text>
        </Row>
      </Card.Body>
      <Card.Footer css={{pt: "$2", color: "$text", pb: "$8"}}>
        <Row align="center" css={{mx: "$14"}} justify="space-between">
          <Rewind5s
            css={{
              cursor: "pointer",
            }}
          />
          <PreviousTrack
            css={{
              cursor: "pointer",
            }}
          />
          <Box
            css={{
              dflex: "center",
              bg: "linear-gradient(180deg, #FF1CF7 25%, #b249f8 100%)",
              size: "$16",
              br: "$pill",
              boxShadow: "$sm",
              cursor: "pointer",
            }}
          >
            <Play css={{ml: "$1"}} />
          </Box>
          <NextTrack
            css={{
              cursor: "pointer",
            }}
          />
          <Forward5s
            css={{
              cursor: "pointer",
            }}
          />
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default Player;
