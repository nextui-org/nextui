import React from "react";
import {Meta} from "@storybook/react";

import {Col, Row, Spacer, Grid, Avatar, Switch, Text} from "../index";
import {Notification, CartIcon} from "../utils/icons";

import Badge from "./index";

export default {
  title: "Display/Badge",
  component: Badge,
} as Meta;

export const Default = () => <Badge>Default</Badge>;

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
  const [isInvisible, setIsInvisible] = React.useState(false);

  return (
    <Grid.Container alignItems="center" gap={2}>
      <Grid>
        <Badge color="error" content={5} isInvisible={isInvisible} shape="circle">
          <Notification fill="currentColor" size={30} />
        </Badge>
      </Grid>
      <Grid>
        <Badge color="error" content={50} isInvisible={isInvisible} shape="circle">
          <CartIcon fill="currentColor" size={30} />
        </Badge>
      </Grid>
      <Grid>
        <Row align="center">
          <Switch initialChecked onChange={(ev) => setIsInvisible(!ev.target.checked)} />
          <Text css={{ml: "$3"}}>Show badge</Text>
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
          <Badge color="error" content={5} size="xs">
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
          <Badge color="error" content={5} placement="bottom-right" size="md">
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
            isInvisible
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
  <Grid.Container>
    <Grid.Container alignItems="center" gap={1} justify="center">
      <Grid>
        <Badge size="xs">New (xs)</Badge>
      </Grid>
      <Grid>
        <Badge size="sm">New (sm)</Badge>
      </Grid>
      <Grid>
        <Badge size="md">New (md)</Badge>
      </Grid>
      <Grid>
        <Badge size="lg">New (lg)</Badge>
      </Grid>
      <Grid>
        <Badge size="xl">New (xl)</Badge>
      </Grid>
    </Grid.Container>
    <Spacer y={1} />
    <Grid.Container gap={1} justify="center">
      <Grid>
        <Badge color="error" content="xs" size="xs">
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
        <Badge color="error" content="sm" size="sm">
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
        <Badge color="error" content="md" size="md">
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
        <Badge color="error" content="lg" size="lg">
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
      <Grid>
        <Badge color="error" content="xl" size="xl">
          <Avatar
            bordered
            pointer
            squared
            color="secondary"
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e290267071"
          />
        </Badge>
      </Grid>
    </Grid.Container>
    <Spacer y={1} />
    <Grid.Container gap={2} justify="center">
      <Grid>
        <Badge color="error" content="999+" size="xs">
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
        <Badge color="error" content="999+" size="sm">
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
        <Badge color="error" content="999+" size="md">
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
        <Badge color="error" content="999+" size="lg">
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
      <Grid>
        <Badge color="error" content="999+" size="xl">
          <Avatar
            bordered
            pointer
            squared
            color="secondary"
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e290267071"
          />
        </Badge>
      </Grid>
    </Grid.Container>
  </Grid.Container>
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
