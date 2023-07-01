import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {Link} from "@nextui-org/link";

import {User, UserProps} from "../src";

export default {
  title: "Components/User",
  component: User,
} as ComponentMeta<typeof User>;

const url = "https://avatars.githubusercontent.com/u/30373425?v=4";

const Template: ComponentStory<typeof User> = (args: UserProps) => <User {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "Junior Garcia",
  avatarProps: {
    src: url,
  },
};

export const isFocusable = Template.bind({});
isFocusable.args = {
  name: "Junior Garcia",
  isFocusable: true,
  avatarProps: {
    src: url,
  },
};

export const WithDefaultAvatar = Template.bind({});
WithDefaultAvatar.args = {
  name: "Junior Garcia",
  avatarProps: {
    name: "Junior Garcia",
    getInitials: (name) =>
      name
        .split(" ")
        .map((n) => n[0])
        .join(""),
  },
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  name: "Junior Garcia",
  description: "Software Engineer",
  avatarProps: {
    src: url,
  },
};

export const WithLinkDescription = Template.bind({});
WithLinkDescription.args = {
  name: "Junior Garcia",
  description: (
    <Link href="https://twitter.com/jrgarciadev" size="sm">
      @jrgarciadev
    </Link>
  ),
  avatarProps: {
    src: url,
  },
};
