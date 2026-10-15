import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Separator} from "./index";

const meta: Meta<typeof Separator> = {
  title: "Components/Layout/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isDecorative: {
      control: "boolean",
    },
    orientation: {
      control: {type: "radio"},
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <div className="space-y-1">
        <h4 className="text-medium font-medium">HeroUI v3 Components</h4>
        <p className="text-small text-default-400">Beautiful, fast and modern React UI library.</p>
      </div>
      <Separator className="my-4" />
      <div className="text-small flex h-5 items-center space-x-4">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="text-small flex h-5 items-center space-x-4">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
};

export const Decorative: Story = {
  args: {
    isDecorative: true,
  },
  render: (args) => (
    <div className="flex h-5 items-center gap-4">
      <span>Blog</span>
      <Separator {...args} orientation="vertical" />
      <span>Docs</span>
    </div>
  ),
};

const items = [
  {
    iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/bell-small.png",
    subtitle: "Receive account activity updates",
    title: "Set Up Notifications",
  },
  {
    iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/compass-small.png",
    subtitle: "Connect your browser to your account",
    title: "Set up Browser Extension",
  },
  {
    iconUrl:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/mint-collective-small.png",
    subtitle: "Create your first collectible",
    title: "Mint Collectible",
  },
];

export const WithContent: Story = {
  render: () => (
    <div className="max-w-md space-y-4 rounded-3xl bg-surface p-4 shadow-surface">
      {items.map((item, index) => (
        <div key={item.title}>
          <div className="flex items-center gap-3">
            <img alt={item.title} className="size-12" src={item.iconUrl} />
            <div className="flex-1 space-y-0">
              <h4 className="text-small font-medium">{item.title}</h4>
              <p className="text-sm text-muted">{item.subtitle}</p>
            </div>
          </div>
          {index < items.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col items-center gap-3">
      <div>Default Variant</div>
      <Separator variant="default" />
      <div>Secondary Variant</div>
      <Separator variant="secondary" />
      <div>Tertiary Variant</div>
      <Separator variant="tertiary" />
    </div>
  ),
};
