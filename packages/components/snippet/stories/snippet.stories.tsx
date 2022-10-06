import React from "react";
import {Meta} from "@storybook/react";

import { Snippet } from "../src";

export default {
  title: "Snippet",
  component: Snippet,
} as Meta;


export const Default = () => <Snippet />;
