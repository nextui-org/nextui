import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Avatar} from "../avatar";
import {Button} from "../button";
import {Card} from "../card";

import {Popover} from "./index";

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
  component: Popover,
  parameters: {
    layout: "centered",
  },
  title: "Components/Overlays/Popover",
} as Meta<typeof Popover>;

const defaultArgs: Omit<Popover["ContentProps"], "children"> = {};

const Template = (props: Popover["ContentProps"]) => (
  <div className="flex items-center gap-3">
    <Popover>
      <Button isIconOnly aria-label="Popover trigger" variant="tertiary">
        <Icon icon="gravity-ui:circle-info" />
      </Button>
      <Popover.Content {...props}>
        <Popover.Dialog>
          <Popover.Heading>Popover heading</Popover.Heading>
          <p>This is the popover content</p>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  </div>
);

const TemplateWithArrow = (props: Popover["ContentProps"]) => (
  <div className="flex items-center gap-3">
    <Popover>
      <Button isIconOnly aria-label="Popover trigger" variant="tertiary">
        <Icon icon="gravity-ui:circle-info" />
      </Button>
      <Popover.Content {...props}>
        <Popover.Dialog>
          <Popover.Arrow />
          <Popover.Heading>Popover heading</Popover.Heading>
          <p>This is the popover content</p>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  </div>
);

const TemplateWithCustomContent = (props: Popover["ContentProps"]) => {
  const [isFollowing, setIsFollowing] = React.useState(false);

  return (
    <div className="flex items-center gap-3">
      <Popover>
        <Popover.Trigger aria-label="Popover trigger">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image alt="Zoe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5" />
              <Avatar.Fallback>Z</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">Zoe</p>
              <p className="text-xs leading-none text-muted">zoe@heroui.com</p>
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Content {...props} className="w-[290px]">
          <Popover.Dialog className="flex flex-col gap-3">
            <Popover.Heading>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar size="md">
                    <Avatar.Image
                      alt="Zoe"
                      src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
                    />
                    <Avatar.Fallback>Z</Avatar.Fallback>
                  </Avatar>
                  <div className="flex h-full flex-col items-start justify-center">
                    <span className="text-sm font-medium">Zoey Lang</span>
                    <span className="text-sm leading-4 font-normal tracking-tight text-muted">
                      @zoe
                    </span>
                  </div>
                </div>
                <Button
                  className="rounded-full text-xs font-normal"
                  size="sm"
                  variant={isFollowing ? "tertiary" : "primary"}
                  onPress={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </Popover.Heading>
            <div>
              <p className="ps-px text-sm">
                Design Engineer, @hero_ui lover she/her. SF Bay Area&nbsp;
                <span aria-label="confetti" role="img">
                  🎉
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-1">
                <p className="text-sm font-semibold">4</p>
                <p className="text-sm text-muted">Following</p>
              </div>
              <div className="flex gap-1">
                <p className="text-sm font-semibold">97.1K</p>
                <p className="text-sm text-muted">Followers</p>
              </div>
            </div>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const WithArrow = {
  args: defaultArgs,
  render: TemplateWithArrow,
};

export const WithCustomContent = {
  args: defaultArgs,
  render: TemplateWithCustomContent,
};

const SpringAnimationTemplate = (props: Popover["ContentProps"]) => (
  <div className="flex flex-col items-center gap-8 p-8">
    <h1 className="text-xl font-semibold">Popover with Spring Animation</h1>
    <p className="text-sm text-muted">
      The popover now uses a spring easing function for a more dynamic feel
    </p>

    <div className="flex items-center gap-8">
      <Popover>
        <Button>Click for Spring Animation</Button>
        <Popover.Content
          {...props}
          className="data-[entering]:ease-spring data-[entering]:animate-in data-[entering]:duration-600 data-[entering]:fade-in-0 data-[entering]:zoom-in-90"
        >
          <Popover.Dialog>
            <Popover.Arrow />
            <Popover.Heading>Spring Animation 🎉</Popover.Heading>
            <p className="mt-2 text-sm text-muted">
              Notice the subtle bounce effect when the popover appears and disappears.
            </p>
            <p className="mt-4 text-xs text-muted">Easing: cubic-bezier(0.36, 1.66, 0.04, 1)</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>

    <div className="space-y-1 text-center text-xs text-muted">
      <p>Animation classes applied:</p>
      <code className="rounded bg-surface px-2 py-1 text-xs">
        data-[entering]:animate-in data-[entering]:zoom-in-90 data-[entering]:fade-in-0
        data-[entering]:ease-spring data-[entering]:duration-600
      </code>
    </div>
  </div>
);

export const SpringAnimation = {
  args: defaultArgs,
  render: SpringAnimationTemplate,
};

const CardWithHelptextTemplate = (props: Popover["ContentProps"]) => (
  <Card className="w-[400px]">
    <Card.Header>
      <div className="flex items-center gap-2">
        <Card.Title>Card Title</Card.Title>
        <Popover>
          <Button isIconOnly aria-label="Help" size="sm" variant="ghost">
            <Icon className="text-muted" icon="gravity-ui:circle-info" />
          </Button>
          <Popover.Content {...props} className="max-w-[200px]" placement="right">
            <Popover.Dialog>
              <Popover.Arrow />
              <Popover.Heading>Help Information</Popover.Heading>
              <p className="text-sm text-muted">
                This is a helptext popover that appears on top of the card surface. It provides
                additional context or information about the card title.
              </p>
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      </div>
      <Card.Description>
        This card demonstrates how a popover looks when displayed on top of a card surface.
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <p className="text-sm">
        The popover help icon is positioned right after the title, allowing users to access
        additional information without cluttering the main content area.
      </p>
    </Card.Content>
  </Card>
);

export const CardWithHelptext = {
  args: defaultArgs,
  render: CardWithHelptextTemplate,
};
