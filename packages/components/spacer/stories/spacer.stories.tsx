import React from "react";
import {Meta} from "@storybook/react";
import {styled} from "@nextui-org/system";

import {Spacer} from "../src";

export default {
  title: "Layout/Spacer",
  component: Spacer,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container = ({children, vertical}: any) => (
  <div
    style={{
      display: "flex",
      flexDirection: vertical ? "column" : "row",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: "50%",
      minWidth: "50%",
    }}
  >
    {children}
  </div>
);

const SpacerContainer = styled("div", {
  width: "100%",
  background: "$primary",
  borderRadius: "8px",
});

export const Vertical = () => (
  <Container vertical>
    <SpacerContainer>
      <Spacer y={1} />
    </SpacerContainer>
    <Spacer y={1} />
    <SpacerContainer>
      <Spacer y={2} />
    </SpacerContainer>
    <Spacer y={1} />
    <SpacerContainer>
      <Spacer y={3} />
    </SpacerContainer>
  </Container>
);

export const Horizontal = () => (
  <Container>
    <SpacerContainer css={{minHeight: "100px"}}>
      <Spacer x={5} />
    </SpacerContainer>
    <Spacer x={2} />
    <SpacerContainer css={{minHeight: "100px"}}>
      <Spacer x={5} />
    </SpacerContainer>
    <Spacer x={2} />
    <SpacerContainer css={{minHeight: "100px"}}>
      <Spacer x={5} />
    </SpacerContainer>
  </Container>
);
