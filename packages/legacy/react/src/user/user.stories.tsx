import React from "react";
import {Meta} from "@storybook/react";

import User from "./index";

export default {
  title: "Display/User",
  component: User,
} as Meta;

const url = "https://avatars.githubusercontent.com/u/30373425?v=4";

export const Default = () => <User squared name="Junior García" src={url} />;

export const Description = () => (
  <User squared name="Junior García" src={url}>
    Software Developer
  </User>
);

export const Link = () => {
  return (
    <User squared name="Junior García" src={url}>
      <User.Link href="https://twitter.com/jrgarciadev">@jrgarciadev</User.Link>
    </User>
  );
};
