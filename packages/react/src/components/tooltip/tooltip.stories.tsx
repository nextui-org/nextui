import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Card} from "../card";

import {Tooltip} from "./index";

export default {
  argTypes: {
    offset: {
      control: "number",
    },
    placement: {
      control: "select",
      options: [
        "bottom",
        "bottom left",
        "bottom right",
        "bottom start",
        "bottom end",
        "top",
        "top left",
        "top right",
        "top start",
        "top end",
        "left",
        "left top",
        "left bottom",
        "start",
        "start top",
        "start bottom",
        "right",
        "right top",
        "right bottom",
        "end",
        "end top",
        "end bottom",
      ],
    },
  },
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  title: "Components/Overlays/Tooltip",
} as Meta<typeof Tooltip>;

const defaultArgs: Omit<Tooltip["ContentProps"], "children"> = {
  showArrow: true,
};

const Template = (props: Tooltip["ContentProps"]) => (
  <div className="flex items-center justify-center gap-3">
    <Tooltip delay={0}>
      <Button isIconOnly aria-label="More information" variant="tertiary">
        <Icon icon="gravity-ui:circle-info" />
      </Button>
      <Tooltip.Content {...props}>
        <Tooltip.Arrow />
        <p>Tooltip content</p>
      </Tooltip.Content>
    </Tooltip>
  </div>
);

const TemplateWithTrigger = (props: Tooltip["ContentProps"]) => (
  <div className="flex items-center gap-3">
    <Tooltip delay={0}>
      <Tooltip.Trigger aria-label="Tooltip trigger">
        <div className="rounded-full bg-accent-soft p-2">
          <Icon icon="gravity-ui:circle-info" />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content {...props}>
        <Tooltip.Arrow />
        <p>Tooltip content</p>
      </Tooltip.Content>
    </Tooltip>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const WithTrigger = {
  args: defaultArgs,
  render: TemplateWithTrigger,
};

const CardWithTooltipTemplate = (props: Tooltip["ContentProps"]) => (
  <Card className="w-[200px]">
    <Card.Content className="flex items-center justify-center p-6">
      <Tooltip delay={0}>
        <Button
          isIconOnly
          aria-label="Attach file"
          className="rounded-full"
          size="lg"
          variant="secondary"
        >
          <Icon icon="gravity-ui:paperclip" />
        </Button>
        <Tooltip.Content {...props}>
          <Tooltip.Arrow />
          <p>Attach a file</p>
        </Tooltip.Content>
      </Tooltip>
    </Card.Content>
  </Card>
);

export const CardWithTooltip = {
  args: defaultArgs,
  render: CardWithTooltipTemplate,
};
