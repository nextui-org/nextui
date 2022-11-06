import React from "react";
import {Meta} from "@storybook/react";

import {Card, Grid, Spacer} from "../index";

import Row from "./index";

export default {
  title: "Layout/Row",
  component: Row,
  decorators: [
    (Story) => (
      <Grid.Container direction="column" justify="center">
        <Story />
      </Grid.Container>
    ),
  ],
} as Meta;

const MockItem = () => {
  return <Card shadow color="primary" style={{width: "100%", height: "40px"}} />;
};

export const Default = () => (
  <>
    <Row as="nav">
      <MockItem />
    </Row>
    <Spacer y={1} />
    <Row>
      <MockItem />
    </Row>
    <Spacer y={1} />
    <Row>
      <MockItem />
    </Row>
    <Spacer y={1} />
    <Row>
      <MockItem />
    </Row>
  </>
);
