import React from "react";
import {Meta} from "@storybook/react";

import {Container} from "../src";

export default {
  title: "Layout/Container",
  component: Container,
} as Meta;

export const Default = () => <Container />;
