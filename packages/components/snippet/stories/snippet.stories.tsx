import React from "react";
import {Meta} from "@storybook/react";
import {snippet} from "@nextui-org/theme";

import {Snippet} from "../src";

export default {
  title: "Components/Snippet",
  component: Snippet,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "solid", "bordered", "shadow"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    disableCopy: {
      control: {
        type: "boolean",
      },
    },
    disableTooltip: {
      control: {
        type: "boolean",
      },
    },
    hideCopyButton: {
      control: {
        type: "boolean",
      },
    },
    hideSymbol: {
      control: {
        type: "boolean",
      },
    },
    symbol: {
      control: {
        type: "text",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Snippet>;

const defaultProps = {
  children: "npm install @nextui-org/react",
  symbol: "$",
  disableCopy: false,
  disableTooltip: false,
  hideCopyButton: false,
  hideSymbol: false,
  ...snippet.defaultVariants,
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const MultiLine = {
  args: {
    ...defaultProps,
    children: [
      // "npm install @nextui-org/react",
      // "yarn add @nextui-org/react",
      // "pnpm add @nextui-org/react",
      `
{
  "name": "Next.js PWA",
  "short_name": "NextPWA",
  "description": "A Progressive Web App built with Next.js and React",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
`,
    ],
  },
};
