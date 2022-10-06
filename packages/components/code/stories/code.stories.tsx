import React from "react";
import {Meta} from "@storybook/react";

import {Code} from "../src";

export default {
  title: "Display/Code",
  component: Code,
} as Meta;

export const Default = () => <Code>npm install @nextui-org/react</Code>;

export const Block = () => <Code block>npm install @nextui-org/react</Code>;
