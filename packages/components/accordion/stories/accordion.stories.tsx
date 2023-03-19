import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {accordionItem, link} from "@nextui-org/theme";
import {AnchorIcon, MoonIcon, SunIcon} from "@nextui-org/shared-icons";
import {Avatar} from "@nextui-org/avatar";

import {Accordion, AccordionProps, AccordionItem} from "../src";

export default {
  title: "Components/Accordion",
  component: Accordion,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["default", "shadow", "bordered", "splitted"],
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Accordion>;

const defaultProps = {
  ...accordionItem.defaultVariants,
  selectionMode: "single",
};

const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const Template: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem key="1" title="Accordion 1">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="2" title="Accordion 2">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="3" title="Accordion 3">
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const TemplateWithSubtitle: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem key="1" subtitle="Press to expand" title="Accordion 1">
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="2"
      subtitle={
        <span>
          Press to expand <strong>key 2</strong>
        </span>
      }
      title="Accordion 2"
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="3" subtitle="Press to expand" title="Accordion 3">
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const TemplateWithLeftIndicator: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
  <Accordion {...args} variant="shadow">
    <AccordionItem
      key="1"
      leftIndicator={
        <Avatar
          isBordered
          color="primary"
          radius="xl"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      }
      subtitle="4 unread messages"
      title="Chung Miller"
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="2"
      leftIndicator={
        <Avatar
          isBordered
          color="success"
          radius="xl"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      }
      subtitle="3 incompleted steps"
      title="Janelle Lenard"
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="3"
      leftIndicator={
        <Avatar
          isBordered
          color="warning"
          radius="xl"
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        />
      }
      subtitle={
        <p>
          2 issues to{" "}
          <a className={link()} href="/?path=/story/components-accordion--with-left-indicator">
            fix now
          </a>
        </p>
      }
      title="Zoey Lang"
    >
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const VariantsTemplate: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
  <div className="flex flex-col gap-8 mb-24">
    <div className="flex flex-col gap-4">
      <h3>Default</h3>
      <Accordion {...args}>
        <AccordionItem key="1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
    <div className="flex flex-col gap-4">
      <h3>Shadow</h3>
      <Accordion {...args} variant="shadow">
        <AccordionItem key="1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
    <div className="flex flex-col gap-4">
      <h3>Bordered</h3>
      <Accordion {...args} variant="bordered">
        <AccordionItem key="1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
    <div className="flex flex-col gap-4">
      <h3>Splitted</h3>
      <Accordion {...args} variant="splitted">
        <AccordionItem key="1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  </div>
);

const CustomInidicatorTemplate: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem key="anchor" indicator={<AnchorIcon />} title="Anchor">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="moon" indicator={<MoonIcon />} title="Moon">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="sun" indicator={<SunIcon />} title="Sun">
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const IsCompact = Template.bind({});
IsCompact.args = {
  ...defaultProps,
  isCompact: true,
};

export const Multiple = Template.bind({});
Multiple.args = {
  ...defaultProps,
  selectionMode: "multiple",
};

export const DefaultExpanded = Template.bind({});
DefaultExpanded.args = {
  ...defaultProps,
  defaultExpandedKeys: ["2"],
};

export const DisabledKeys = Template.bind({});
DisabledKeys.args = {
  ...defaultProps,
  disabledKeys: ["2"],
};

export const WithSubtitle = TemplateWithSubtitle.bind({});
WithSubtitle.args = {
  ...defaultProps,
};

export const WithLeftIndicator = TemplateWithLeftIndicator.bind({});
WithLeftIndicator.args = {
  ...defaultProps,
};

export const Variants = VariantsTemplate.bind({});
Variants.args = {
  ...defaultProps,
};

export const CustomMotion = Template.bind({});
CustomMotion.args = {
  ...defaultProps,
  motionProps: {
    startingY: 0,
    transition: {
      exit: {
        height: {duration: 0.2},
        opacity: {duration: 0.3},
      },
      enter: {
        height: {duration: 0.3},
        opacity: {duration: 0.6},
      },
    },
  },
};

export const CustomIndicator = CustomInidicatorTemplate.bind({});
CustomIndicator.args = {
  ...defaultProps,
};
