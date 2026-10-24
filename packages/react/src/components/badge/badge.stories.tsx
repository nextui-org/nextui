import type {BadgeProps} from "./index";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Avatar} from "../avatar";
import {Separator} from "../separator";

import {Badge} from "./index";

export default {
  argTypes: {
    color: {
      control: "select",
      options: ["default", "accent", "success", "warning", "danger"],
    },
    placement: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "soft"],
    },
  },
  component: Badge,
  parameters: {
    layout: "centered",
  },
  title: "Components/Data Display/Badge",
} as Meta<typeof Badge>;

const AVATAR_URL = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg";

const defaultArgs: BadgeProps = {
  color: "accent",
  placement: "top-right",
  size: "sm",
  variant: "primary",
};

const Template = (props: BadgeProps) => (
  <Badge.Anchor>
    <Avatar>
      <Avatar.Image alt="" src={AVATAR_URL} />
    </Avatar>
    <Badge {...props}>5</Badge>
  </Badge.Anchor>
);

const SizesTemplate = (props: BadgeProps) => (
  <div className="flex items-center gap-8">
    <div className="flex flex-col items-center gap-2">
      <Badge.Anchor>
        <Avatar size="lg">
          <Avatar.Image alt="" src={AVATAR_URL} />
        </Avatar>
        <Badge {...props} size="lg">
          99+
        </Badge>
      </Badge.Anchor>
      <span className="text-xs text-muted">Large</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Badge.Anchor>
        <Avatar size="md">
          <Avatar.Image alt="" src={AVATAR_URL} />
        </Avatar>
        <Badge {...props} size="md">
          99+
        </Badge>
      </Badge.Anchor>
      <span className="text-xs text-muted">Medium</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Badge.Anchor>
        <Avatar size="sm">
          <Avatar.Image alt="" src={AVATAR_URL} />
        </Avatar>
        <Badge {...props} size="sm">
          99+
        </Badge>
      </Badge.Anchor>
      <span className="text-xs text-muted">Small</span>
    </div>
  </div>
);

const ColorsTemplate = (props: BadgeProps) => {
  const colors = ["accent", "default", "success", "warning", "danger"] as const;

  return (
    <div className="flex items-center gap-8">
      {colors.map((color) => (
        <div key={color} className="flex flex-col items-center gap-2">
          <Badge.Anchor>
            <Avatar>
              <Avatar.Image alt="" src={AVATAR_URL} />
            </Avatar>
            <Badge {...props} color={color} />
          </Badge.Anchor>
          <span className="text-xs text-muted capitalize">{color}</span>
        </div>
      ))}
    </div>
  );
};

const WithContentTemplate = (props: BadgeProps) => (
  <div className="flex items-center gap-8">
    <div className="flex flex-col items-center gap-2">
      <Badge.Anchor>
        <Avatar>
          <Avatar.Image alt="" src={AVATAR_URL} />
        </Avatar>
        <Badge {...props} color="danger">
          5
        </Badge>
      </Badge.Anchor>
      <span className="text-xs text-muted">Number</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Badge.Anchor>
        <Avatar>
          <Avatar.Image alt="" src={AVATAR_URL} />
        </Avatar>
        <Badge {...props} color="danger">
          New
        </Badge>
      </Badge.Anchor>
      <span className="text-xs text-muted">Text</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Badge.Anchor>
        <Avatar>
          <Avatar.Image alt="" src={AVATAR_URL} />
        </Avatar>
        <Badge {...props} color="danger">
          99+
        </Badge>
      </Badge.Anchor>
      <span className="text-xs text-muted">Overflow</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Badge.Anchor>
        <Avatar>
          <Avatar.Image alt="" src={AVATAR_URL} />
        </Avatar>
        <Badge {...props} color="accent">
          <Icon icon="gravity-ui:bell" />
        </Badge>
      </Badge.Anchor>
      <span className="text-xs text-muted">Icon</span>
    </div>
  </div>
);

const PlacementsTemplate = () => {
  const placements = ["top-right", "top-left", "bottom-right", "bottom-left"] as const;

  return (
    <div className="flex items-center gap-8">
      {placements.map((placement) => (
        <div key={placement} className="flex flex-col items-center gap-2">
          <Badge.Anchor>
            <Avatar>
              <Avatar.Image alt="" src={AVATAR_URL} />
            </Avatar>
            <Badge color="accent" placement={placement} size="sm" />
          </Badge.Anchor>
          <span className="text-xs text-muted">{placement}</span>
        </div>
      ))}
    </div>
  );
};

const VariantsTemplate = () => {
  const variants = ["primary", "secondary", "soft"] as const;
  const colors = ["accent", "default", "success", "warning", "danger"] as const;

  return (
    <div className="flex flex-col gap-8">
      {variants.map((variant, index) => (
        <React.Fragment key={variant}>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-muted capitalize">{variant}</h3>
            <div className="flex items-center gap-8">
              {colors.map((color) => (
                <div key={color} className="flex flex-col items-center gap-2">
                  <Badge.Anchor>
                    <Avatar>
                      <Avatar.Image alt="" src={AVATAR_URL} />
                    </Avatar>
                    <Badge color={color} size="sm" variant={variant}>
                      5
                    </Badge>
                  </Badge.Anchor>
                  <span className="text-xs text-muted capitalize">{color}</span>
                </div>
              ))}
            </div>
          </div>
          {index < variants.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};

const DotBadgeTemplate = () => {
  const colors = ["accent", "success", "warning", "danger"] as const;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-muted">Status Indicators</h3>
        <div className="flex items-center gap-8">
          {colors.map((color) => (
            <Badge.Anchor key={color}>
              <Avatar size="sm">
                <Avatar.Image alt="" src={AVATAR_URL} />
              </Avatar>
              <Badge color={color} placement="bottom-right" size="sm" />
            </Badge.Anchor>
          ))}
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-muted">Sizes</h3>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Badge.Anchor>
              <Avatar size="lg">
                <Avatar.Image alt="" src={AVATAR_URL} />
              </Avatar>
              <Badge color="success" placement="bottom-right" size="lg" />
            </Badge.Anchor>
            <span className="text-xs text-muted">Large</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Badge.Anchor>
              <Avatar size="md">
                <Avatar.Image alt="" src={AVATAR_URL} />
              </Avatar>
              <Badge color="success" placement="bottom-right" size="md" />
            </Badge.Anchor>
            <span className="text-xs text-muted">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Badge.Anchor>
              <Avatar size="sm">
                <Avatar.Image alt="" src={AVATAR_URL} />
              </Avatar>
              <Badge color="success" placement="bottom-right" size="sm" />
            </Badge.Anchor>
            <span className="text-xs text-muted">Small</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const Sizes = {
  args: defaultArgs,
  render: SizesTemplate,
};

export const Colors = {
  args: defaultArgs,
  render: ColorsTemplate,
};

export const WithContent = {
  args: defaultArgs,
  render: WithContentTemplate,
};

export const Placements = {
  render: PlacementsTemplate,
};

export const Variants = {
  render: VariantsTemplate,
};

export const DotBadge = {
  render: DotBadgeTemplate,
};
