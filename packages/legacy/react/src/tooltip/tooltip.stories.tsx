import React from "react";
import {Meta} from "@storybook/react";

import {Tooltip, Button, Code, Spacer, Grid, Link} from "../index";

export default {
  title: "Display/Tooltip",
  component: Tooltip,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container = ({children}: any) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      width: "100%",
      position: "absolute",
      left: 100,
      top: 80,
    }}
  >
    {children}
  </div>
);

export const Default = () => {
  return (
    <Container>
      <Tooltip content={"Developers love Next.js"}>
        <Button auto flat>
          Do hover here
        </Button>
      </Tooltip>
    </Container>
  );
};

export const Rounded = () => {
  return (
    <Container>
      <Tooltip rounded color="primary" content={"Developers love Next.js"}>
        <Button auto flat>
          Do hover here
        </Button>
      </Tooltip>
    </Container>
  );
};

export const Colors = () => {
  return (
    <Container>
      <div>
        <Tooltip content="Developers love Next.js">
          <Button auto light>
            Default
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip color="invert" content="Developers love Next.js">
          <Button auto flat>
            Invert
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip color="primary" content="Developers love Next.js">
          <Button auto flat>
            Primary
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip color="secondary" content="Developers love Next.js">
          <Button auto flat color="secondary">
            Secondary
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip color="success" content="Developers love Next.js">
          <Button auto flat color="success">
            Success
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip color="warning" content="Developers love Next.js">
          <Button auto flat color="warning">
            Warning
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip color="error" content="Developers love Next.js">
          <Button auto flat color="error">
            Error
          </Button>
        </Tooltip>
      </div>
    </Container>
  );
};

export const TextColors = () => {
  return (
    <Container>
      <div>
        <Tooltip content="Developers love Next.js">
          <Button auto light>
            Default
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip color="invert" content="Developers love Next.js">
          <Button auto flat>
            Invert
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip content="Developers love Next.js" contentColor="primary">
          <Button auto flat>
            Primary
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip content="Developers love Next.js" contentColor="secondary">
          <Button auto flat color="secondary">
            Secondary
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip content="Developers love Next.js" contentColor="success">
          <Button auto flat color="success">
            Success
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip content="Developers love Next.js" contentColor="warning">
          <Button auto flat color="warning">
            Warning
          </Button>
        </Tooltip>
        <Spacer inline x={1.5} />
        <Tooltip content="Developers love Next.js" contentColor="error">
          <Button auto flat color="error">
            Error
          </Button>
        </Tooltip>
      </div>
    </Container>
  );
};

export const Placements = () => {
  const text = "Developers love Next.js and NextUI";

  return (
    <Container>
      <Grid.Container alignContent="center" gap={1.5} justify="center">
        <Grid justify="flex-end" xs={4}>
          <Tooltip color="primary" content={text} placement="topStart">
            topStart
          </Tooltip>
        </Grid>
        <Grid justify="center" xs={4}>
          <Tooltip color="primary" content={text} placement="top">
            top
          </Tooltip>
        </Grid>
        <Grid xs={4}>
          <Tooltip color="primary" content={text} placement="topEnd">
            topEnd
          </Tooltip>
        </Grid>
        <Grid justify="flex-end" xs={3}>
          <Tooltip color="primary" content={text} placement="leftStart">
            leftStart
          </Tooltip>
        </Grid>
        <Grid xs={6} />
        <Grid xs={3}>
          <Tooltip color="primary" content={text} placement="rightStart">
            rightStart
          </Tooltip>
        </Grid>
        <Grid justify="flex-end" xs={3}>
          <Tooltip color="primary" content={text} placement="left">
            left
          </Tooltip>
        </Grid>
        <Grid xs={6} />
        <Grid xs={3}>
          <Tooltip color="primary" content={text} placement="right">
            right
          </Tooltip>
        </Grid>
        <Grid justify="flex-end" xs={3}>
          <Tooltip color="primary" content={text} placement="leftEnd">
            leftEnd
          </Tooltip>
        </Grid>
        <Grid xs={6} />
        <Grid xs={3}>
          <Tooltip color="primary" content={text} placement="rightEnd">
            rightEnd
          </Tooltip>
        </Grid>
        <Grid justify="flex-end" xs={4}>
          <Tooltip color="primary" content={text} placement="bottomStart">
            bottomStart
          </Tooltip>
        </Grid>
        <Grid justify="center" xs={4}>
          <Tooltip color="primary" content={text} placement="bottom">
            bottom
          </Tooltip>
        </Grid>
        <Grid xs={4}>
          <Tooltip color="primary" content={text} placement="bottomEnd">
            bottomEnd
          </Tooltip>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export const Trigger = () => {
  return (
    <Container>
      <Tooltip color="primary" content={"Developers love Next.js"} trigger="click">
        <Link>Click me</Link>
      </Tooltip>
    </Container>
  );
};

export const WithComponents = () => {
  return (
    <Container>
      <Tooltip content={"Developers love Next.js"}>
        <Button auto>Button</Button>
      </Tooltip>
    </Container>
  );
};

export const HideArrow = () => {
  return (
    <Container>
      <Tooltip hideArrow color="primary" content={"Developers love Next.js"}>
        <Button auto flat>
          Click me
        </Button>
      </Tooltip>
    </Container>
  );
};

export const NoShadow = () => {
  return (
    <Container>
      <Tooltip color="primary" content={"Developers love Next.js"} shadow={false}>
        <Button auto flat>
          Click me
        </Button>
      </Tooltip>
    </Container>
  );
};

export const CustomContent = () => {
  return (
    <Container>
      <Tooltip
        content={
          <>
            Developers love <Code>Next.js</Code>.
          </>
        }
      >
        <span>Do hover here</span>
      </Tooltip>
    </Container>
  );
};

export const WithoutContent = () => {
  return (
    <Container>
      <Tooltip color="primary" content="">
        <Button auto flat>
          Do hover here
        </Button>
      </Tooltip>
    </Container>
  );
};
