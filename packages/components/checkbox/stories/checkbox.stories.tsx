import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {checkbox} from "@nextui-org/theme";

import {Checkbox, CheckboxProps} from "../src";

export default {
  title: "Inputs/Checkbox",
  component: Checkbox,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    lineThrough: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Checkbox>;

const defaultProps = {
  ...checkbox.defaultVariants,
  children: "Option",
};

const Template: ComponentStory<typeof Checkbox> = (args: CheckboxProps) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  ...defaultProps,
  isDisabled: true,
};

export const DefaultSelected = Template.bind({});
DefaultSelected.args = {
  ...defaultProps,
  defaultSelected: true,
};

export const AlwaysSelected = Template.bind({});
AlwaysSelected.args = {
  ...defaultProps,
  isSelected: true,
};

export const IsIndeterminate = Template.bind({});
IsIndeterminate.args = {
  ...defaultProps,
  isIndeterminate: true,
};

export const LineThrough = Template.bind({});
LineThrough.args = {
  ...defaultProps,
  lineThrough: true,
};

export const DisableAnimation = Template.bind({});
DisableAnimation.args = {
  ...defaultProps,
  disableAnimation: true,
};

export const Controlled = () => {
  const [selected, setSelected] = React.useState<boolean>(true);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Checkbox ", selected);
  }, [selected]);

  return (
    <div className="flex flex-row gap-2">
      <Checkbox isSelected={selected} onChange={setSelected} {...checkbox.defaultVariants}>
        Subscribe (controlled)
      </Checkbox>
    </div>
  );
};
