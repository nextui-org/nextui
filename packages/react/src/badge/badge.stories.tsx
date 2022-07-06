import React from "react";
import {Meta} from "@storybook/react";

import {Col, Row, Spacer} from "../index";

import Badge from "./index";

export default {
  title: "Display/Badge",
  component: Badge,
} as Meta;

export const Default = () => <Badge>New</Badge>;

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
      <Badge enableShadow>Neutral</Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge enableShadow color="primary">
        Primary
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge enableShadow color="secondary">
        Secondary
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge enableShadow color="success">
        Success
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge enableShadow color="warning">
        Warning
      </Badge>
    </Row>
    <Spacer y={0.5} />
    <Row>
      <Badge enableShadow color="error">
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
      <Badge size="xl" variant="dot" />
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
