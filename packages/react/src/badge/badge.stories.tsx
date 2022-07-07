import React from "react";
import {Meta} from "@storybook/react";

import {Col, Row, Spacer, Grid, Avatar, Switch, Text} from "../index";
import {Notification} from "../utils/icons";

import Badge from "./index";

export default {
  title: "Display/Badge",
  component: Badge,
} as Meta;

export const Default = () => <Badge>New</Badge>;

export const WithAvatar = () => (
  <Grid.Container gap={1} justify="center">
    <Grid>
      <Badge color="error" content={5} size="sm">
        <Avatar
          bordered
          pointer
          squared
          color="secondary"
          size="lg"
          src="https://i.pravatar.cc/300?u=a042581f4e29026707d"
        />
      </Badge>
    </Grid>
    <Grid>
      <Badge color="error" content={5} placement="bottom-right" shape="circle" size="sm">
        <Avatar
          bordered
          pointer
          color="secondary"
          size="lg"
          src="https://i.pravatar.cc/300?u=a042581f4e29026707e"
        />
      </Badge>
    </Grid>
  </Grid.Container>
);

export const WithIcon = () => (
  <Badge color="error" content={5} horizontalOffset={2} shape="circle">
    <Notification fill="currentColor" size={30} />
  </Badge>
);

export const WithContentIcon = () => (
  <Badge
    color="error"
    content={<Notification fill="currentColor" size={12} />}
    css={{p: "$2"}}
    horizontalOffset={2}
    shape="circle"
  >
    <Avatar
      bordered
      pointer
      color="secondary"
      size="lg"
      src="https://i.pravatar.cc/300?u=a042581f4e29026707e"
    />
  </Badge>
);

export const ToggleBadge = () => {
  const [invisible, setInvisible] = React.useState(false);

  return (
    <Grid.Container alignItems="center" gap={2}>
      <Grid>
        <Badge color="error" content={5} invisible={invisible} placement="top-right" shape="circle">
          <Notification fill="currentColor" size={30} />
        </Badge>
      </Grid>
      <Grid>
        <Row align="center">
          <Switch
            initialChecked
            css={{mr: "$2"}}
            onChange={(ev) => setInvisible(!ev.target.checked)}
          />
          <Text>Show badge</Text>
        </Row>
      </Grid>
    </Grid.Container>
  );
};

export const WithContentPlacements = () => {
  return (
    <>
      <Grid.Container gap={1} justify="center">
        <Grid>
          <Badge color="error" content={5} size="sm">
            <Avatar
              bordered
              pointer
              squared
              color="secondary"
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e29026707d"
            />
          </Badge>
        </Grid>
        <Grid>
          <Badge color="error" content={5} placement="bottom-right" size="sm">
            <Avatar
              bordered
              pointer
              squared
              color="secondary"
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e29026707e"
            />
          </Badge>
        </Grid>
        <Grid>
          <Badge color="error" content={5} placement="top-left" size="sm">
            <Avatar
              bordered
              pointer
              squared
              color="secondary"
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e290267072"
            />
          </Badge>
        </Grid>
        <Grid>
          <Badge color="error" content={5} placement="bottom-left" size="sm">
            <Avatar
              bordered
              pointer
              squared
              color="secondary"
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e290267073"
            />
          </Badge>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={1} justify="center">
        <Grid>
          <Badge
            invisible
            color="primary"
            content={5}
            placement="bottom-right"
            size="md"
            variant="points"
          >
            <Avatar
              bordered
              pointer
              color="primary"
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e29026707d"
            />
          </Badge>
        </Grid>
        <Grid>
          <Badge
            color="success"
            content={5}
            placement="bottom-right"
            shape="circle"
            size="md"
            variant="dot"
          >
            <Avatar
              bordered
              pointer
              color="success"
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e29026707e"
            />
          </Badge>
        </Grid>
        <Grid>
          <Badge color="error" content={5} placement="top-left" size="sm">
            <Avatar
              bordered
              pointer
              squared
              color="secondary"
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e290267072"
            />
          </Badge>
        </Grid>
        <Grid>
          <Badge color="error" content={5} placement="bottom-left" size="sm">
            <Avatar
              bordered
              pointer
              squared
              color="secondary"
              size="lg"
              src="https://i.pravatar.cc/300?u=a042581f4e290267073"
            />
          </Badge>
        </Grid>
      </Grid.Container>
    </>
  );
};

export const Sizes = () => (
  <Col css={{pl: "$6"}}>
    <Row>
      <Badge size="xs">New (xs)</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge size="sm">New (sm)</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge size="md">New (md)</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge size="lg">New (lg)</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge size="xl">New (xl)</Badge>
    </Row>
    <Spacer y={0.5} />
  </Col>
);

export const Squared = () => (
  <Col css={{pl: "$6"}}>
    <Row>
      <Badge isSquared size="xs">
        New (xs)
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge isSquared size="sm">
        New (sm)
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge isSquared size="md">
        New (md)
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge isSquared size="lg">
        New (lg)
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge isSquared size="xl">
        New (xl)
      </Badge>
    </Row>
    <Spacer y={0.5} />
  </Col>
);

export const Colors = () => (
  <Col css={{pl: "$6"}}>
    <Row>
      <Badge>Neutral</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="primary">Primary</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="secondary">Secondary</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="success">Success</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="warning">Warning</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="error">Error</Badge>
    </Row>
  </Col>
);

export const EnableShadow = () => (
  <Col css={{pl: "$6"}}>
    <Row>
      <Badge disableOutline enableShadow>
        Neutral
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge disableOutline enableShadow color="primary">
        Primary
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge disableOutline enableShadow color="secondary">
        Secondary
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge disableOutline enableShadow color="success">
        Success
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge disableOutline enableShadow color="warning">
        Warning
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge disableOutline enableShadow color="error">
        Error
      </Badge>
    </Row>
  </Col>
);

export const FlatVariant = () => (
  <Col css={{pl: "$6"}}>
    <Row>
      <Badge variant="flat">Neutral</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="primary" variant="flat">
        Primary
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="secondary" variant="flat">
        Secondary
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="success" variant="flat">
        Success
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="warning" variant="flat">
        Warning
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="error" variant="flat">
        Error
      </Badge>
    </Row>
  </Col>
);

export const BorderedVariant = () => (
  <Col css={{pl: "$6"}}>
    <Row>
      <Badge variant="bordered">Neutral</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="primary" variant="bordered">
        Primary
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="secondary" variant="bordered">
        Secondary
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="success" variant="bordered">
        Success
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="warning" variant="bordered">
        Warning
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="error" variant="bordered">
        Error
      </Badge>
    </Row>
  </Col>
);

export const DotVariant = () => (
  <Col css={{pl: "$6"}}>
    <Row>
      <Badge size="xl" variant="dot">
        <span>new</span>
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="primary" size="xl" variant="dot" />
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="secondary" size="xl" variant="dot" />
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="success" size="xl" variant="dot" />
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="warning" size="xl" variant="dot" />
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge color="error" size="xl" variant="dot" />
    </Row>
  </Col>
);

export const PointsVariant = () => (
  <Col css={{pl: "$6"}}>
    <Row>
      <Badge isSquared size="xs" variant="points" />
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge isSquared color="primary" size="sm" variant="points" />
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge isSquared color="secondary" size="md" variant="points" />
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge isSquared color="success" size="lg" variant="points" />
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge isSquared color="warning" size="xl" variant="points" />
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge isSquared color="error" size="xl" variant="points" />
    </Row>
  </Col>
);
