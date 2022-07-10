import React from "react";
import {Meta} from "@storybook/react";

import Navbar from "./index";

export default {
  title: "Navigation/Navbar",
  component: Navbar,
} as Meta;

export const Default = () => <Navbar>Default</Navbar>;
