import React from "react";
import {Meta} from "@storybook/react";

import {Spacer, Text} from "../index";

import Link from "./link";

export default {
  title: "Navigation/Link",
  component: Link,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const text = `"First solve the problem. Then, write the code." - Jon Johnson.`;

export const Default = () => <Link href="#">{text}</Link>;

export const Underline = () => (
  <Link underline color="primary">
    {text}
  </Link>
);

export const Variants = () => (
  <>
    <Text>
      <Link href="#">{text}</Link>
    </Text>
    <Text>
      <Link color="secondary" href="#">
        {text}
      </Link>
    </Text>
    <Text>
      <Link color="success" href="#">
        {text}
      </Link>
    </Text>
    <Text>
      <Link color="error" href="#">
        {text}
      </Link>
    </Text>
  </>
);

export const Icon = () => (
  <>
    <Link icon href="#">
      {text}
    </Link>
    <Spacer y={0.5} />
    <Link icon color="primary" href="#">
      {text}
    </Link>
  </>
);

export const Block = () => (
  <Link block href="#">
    {text}
  </Link>
);
