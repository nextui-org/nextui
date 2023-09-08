import React from "react";
import {Meta} from "@storybook/react";
import {Link} from "@nextui-org/link";

import {User} from "../src";

export default {
  title: "Components/User",
  component: User,
} as Meta<typeof User>;

const url = "https://avatars.githubusercontent.com/u/30373425?v=4";

export const Default = {
  args: {
    name: "Junior Garcia",
    avatarProps: {
      src: url,
    },
  },
};

export const isFocusable = {
  args: {
    name: "Junior Garcia",
    isFocusable: true,
    avatarProps: {
      src: url,
    },
  },
};

export const WithDefaultAvatar = {
  args: {
    name: "Junior Garcia",
    avatarProps: {
      name: "Junior Garcia",
      getInitials: (name) =>
        name
          .split(" ")
          .map((n) => n[0])
          .join(""),
    },
  },
};

export const WithDescription = {
  args: {
    name: "Junior Garcia",
    description: "Software Engineer",
    avatarProps: {
      src: url,
    },
  },
};

export const WithLinkDescription = {
  args: {
    name: "Junior Garcia",
    description: (
      <Link href="https://twitter.com/jrgarciadev" size="sm">
        @jrgarciadev
      </Link>
    ),
    avatarProps: {
      src: url,
    },
  },
};
