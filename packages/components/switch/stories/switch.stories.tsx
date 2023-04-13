/* eslint-disable react/display-name */
import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {toggle} from "@nextui-org/theme";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {SunFilledIcon, MoonFilledIcon} from "@nextui-org/shared-icons";
import {clsx} from "@nextui-org/shared-utils";

import {Switch, SwitchProps, SwitchThumbIconProps, useSwitch} from "../src";

export default {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
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
} as ComponentMeta<typeof Switch>;

const defaultProps = {
  ...toggle.defaultVariants,
};

const Template: ComponentStory<typeof Switch> = (args: SwitchProps) => <Switch {...args} />;

const WithIconsTemplate: ComponentStory<typeof Switch> = (args: SwitchProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <Switch
        {...args}
        classNames={{
          startIcon: "text-white",
        }}
        endIcon={<MoonFilledIcon />}
        isSelected={isSelected}
        startIcon={<SunFilledIcon />}
        onValueChange={setIsSelected}
      />
      <p className="text-neutral-500">Selected: {isSelected ? "true" : "false"}</p>
    </div>
  );
};

const ControlledTemplate: ComponentStory<typeof Switch> = (args: SwitchProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <Switch {...args} isSelected={isSelected} onValueChange={setIsSelected} />
      <p className="text-neutral-500">Selected: {isSelected ? "true" : "false"}</p>
    </div>
  );
};

const CustomWithClassNamesTemplate: ComponentStory<typeof Switch> = (args: SwitchProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <Switch
        classNames={{
          base: clsx(
            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center justify-between cursor-pointer rounded-lg gap-2 p-4 border-1.5 border-transparent",
            {
              "border-primary": isSelected,
            },
          ),
        }}
        isSelected={isSelected}
        size="lg"
        onValueChange={setIsSelected}
        {...args}
      >
        <div className="flex flex-col gap-1">
          <p className="text-base">Enable early access</p>
          <p className="text-xs text-neutral-400">
            Get access to new features before they are released.
          </p>
        </div>
      </Switch>
      <p className="text-neutral-500">Selected: {isSelected ? "true" : "false"}</p>
    </div>
  );
};

const CustomWithHooksTemplate: ComponentStory<typeof Switch> = (args: SwitchProps) => {
  const {Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps} = useSwitch(
    args,
  );

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-neutral-100 hover:bg-neutral-200",
            ],
          })}
        >
          {isSelected ? <SunFilledIcon /> : <MoonFilledIcon />}
        </div>
      </Component>
      <p className="text-neutral-500 select-none">Lights: {isSelected ? "on" : "off"}</p>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const IsReadOnly = Template.bind({});
IsReadOnly.args = {
  ...defaultProps,
  isReadOnly: true,
  defaultSelected: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...defaultProps,
  children: "Bluetooth",
};

export const DisableAnimation = Template.bind({});
DisableAnimation.args = {
  ...defaultProps,
  disableAnimation: true,
};

export const WithThumbIcon = Template.bind({});
WithThumbIcon.args = {
  ...defaultProps,
  size: "xl",
  thumbIcon: (props: SwitchThumbIconProps) =>
    props.isSelected ? (
      <SunFilledIcon className={props.className} />
    ) : (
      <MoonFilledIcon className={props.className} />
    ),
};

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {
  ...defaultProps,
  size: "xl",
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  ...defaultProps,
};

export const CustomWithClassNames = CustomWithClassNamesTemplate.bind({});
CustomWithClassNames.args = {
  ...defaultProps,
};

export const CustomWithHooks = CustomWithHooksTemplate.bind({});
CustomWithHooks.args = {
  ...defaultProps,
};
