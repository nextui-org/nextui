import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {accordionItem} from "@nextui-org/theme";
import {
  AnchorIcon,
  MoonIcon,
  SunIcon,
  InfoIcon,
  ShieldSecurityIcon,
  MonitorMobileIcon,
  InvalidCardIcon,
} from "@nextui-org/shared-icons";
import {Avatar} from "@nextui-org/avatar";

import {Accordion, AccordionProps, AccordionItem, Selection} from "../src";
import {AccordionItemProps} from "../src";

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
    selectionMode: {
      control: {
        type: "select",
        options: ["single", "multiple"],
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
    <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const TemplateWithSubtitle: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem key="1" aria-label="Accordion 1" subtitle="Press to expand" title="Accordion 1">
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="2"
      aria-label="Accordion 2"
      subtitle={
        <span>
          Press to expand <strong>key 2</strong>
        </span>
      }
      title="Accordion 2"
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="3" aria-label="Accordion 3" subtitle="Press to expand" title="Accordion 3">
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const TemplateWithStartContent: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
  <Accordion {...args} variant="shadow">
    <AccordionItem
      key="1"
      aria-label="Chung Miller"
      startContent={
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
      aria-label="Janelle Lenard"
      startContent={
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
      aria-label="Zoey Lang"
      startContent={
        <Avatar
          isBordered
          color="warning"
          radius="xl"
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        />
      }
      subtitle={
        <p className="flex">
          2 issues to&nbsp;<p className="text-primary">fix now</p>
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
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
    <div className="flex flex-col gap-4">
      <h3>Bordered</h3>
      <Accordion {...args} variant="bordered">
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
    <div className="flex flex-col gap-4">
      <h3>Splitted</h3>
      <Accordion {...args} variant="splitted">
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  </div>
);

const CustomInidicatorTemplate: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem key="anchor" aria-label="Anchor" indicator={<AnchorIcon />} title="Anchor">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="moon" aria-label="Moon" indicator={<MoonIcon />} title="Moon">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="sun" aria-label="Sun" indicator={<SunIcon />} title="Sun">
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const ControlledTemplate: ComponentStory<typeof Accordion> = (args: AccordionProps) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["1"]));

  // eslint-disable-next-line no-console
  console.log(selectedKeys);

  return (
    <Accordion {...args} selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
      <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
};

const CustomWithClassNamesTemplate: ComponentStory<typeof Accordion> = (args: AccordionProps) => {
  const itemStyles: AccordionItemProps["classNames"] = {
    base: "py-0 w-full",
    title: "font-normal text-base",
    trigger: "px-2 py-0 hover:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-base",
    content: "text-sm px-2",
  };

  return (
    <Accordion
      {...args}
      hideDivider
      className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
      variant="shadow"
    >
      <AccordionItem
        key="1"
        aria-label="Connected devices"
        classNames={itemStyles}
        startContent={<MonitorMobileIcon className="text-primary" />}
        subtitle={
          <p className="flex">
            2 issues to&nbsp;<p className="text-primary">fix now</p>
          </p>
        }
        title="Connected devices"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Apps Permissions"
        classNames={itemStyles}
        startContent={<ShieldSecurityIcon />}
        subtitle="3 apps have read permissions"
        title="Apps Permissions"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Pending tasks"
        classNames={{...itemStyles, subtitle: "text-warning"}}
        startContent={<InfoIcon className="text-warning" />}
        subtitle="Complete your profile"
        title="Pending tasks"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="4"
        aria-label="Card expired"
        classNames={{...itemStyles, subtitle: "text-danger"}}
        startContent={<InvalidCardIcon className="text-danger" />}
        subtitle="Please, update now"
        title={
          <p className="flex gap-1 items-center">
            Card expired
            <p className="text-default-400 text-sm">*4812</p>
          </p>
        }
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
};

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

export const WithStartContent = TemplateWithStartContent.bind({});
WithStartContent.args = {
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

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  ...defaultProps,
};

export const CustomWithClassNames = CustomWithClassNamesTemplate.bind({});
CustomWithClassNames.args = {
  ...defaultProps,
};
