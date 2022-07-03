import React from "react";
import {Logo} from "@components";

import {Palette, Magic, GamingConsole} from "../../icons";

const themes = [
  {
    id: "nextui",
    title: "NextUI",
    icon: () => (
      <Logo
        small
        css={{
          "& path": {
            fill: "currentColor",
          },
        }}
        size={44}
      />
    ),
  },
  {
    id: "modern",
    title: "Modern",
    icon: () => <Palette fill="currentColor" size={44} />,
  },
  {
    id: "elegant",
    title: "Elegant",
    icon: () => <Magic fill="currentColor" size={44} />,
  },
  {
    id: "retro",
    title: "Retro",
    icon: () => <GamingConsole fill="currentColor" size={44} />,
  },
];

const sizes = [
  {
    id: "extra-small",
    title: "XS",
  },
  {
    id: "small",
    title: "S",
  },
  {
    id: "medium",
    title: "M",
  },
  {
    id: "large",
    title: "L",
  },
  {
    id: "extra-large",
    title: "XL",
  },
];

export {themes, sizes};
