import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {checkbox} from "@nextui-org/theme";

import {CheckboxGroup, Checkbox, CheckboxGroupProps} from "../src";

export default {
  title: "Inputs/CheckboxGroup",
  component: CheckboxGroup,
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
};

const Template: ComponentStory<typeof CheckboxGroup> = (args: CheckboxGroupProps) => (
  <CheckboxGroup {...args}>
    <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
    <Checkbox value="sydney">Sydney</Checkbox>
    <Checkbox value="san-francisco">San Francisco</Checkbox>
    <Checkbox value="london">London</Checkbox>
    <Checkbox value="tokyo">Tokyo</Checkbox>
  </CheckboxGroup>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Select cities",
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  ...defaultProps,
  label: "Select cities",
  defaultValue: ["buenos-aires", "london"],
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  label: "Select cities",
  orientation: "horizontal",
};

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  label: "Select cities",
  isDisabled: true,
};

export const LineThrough = Template.bind({});
LineThrough.args = {
  label: "Select cities",
  lineThrough: true,
};

export const DisableAnimation = Template.bind({});
DisableAnimation.args = {
  label: "Select cities",
  disableAnimation: true,
};

export const Controlled = () => {
  const [groupSelected, setGroupSelected] = React.useState<string[]>(["buenos-aires", "sydney"]);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("CheckboxGroup ", groupSelected);
  }, [groupSelected]);

  return (
    <div className="flex flex-row gap-2">
      <CheckboxGroup
        color="warning"
        label="Select cities"
        value={groupSelected}
        onChange={setGroupSelected}
      >
        <Checkbox color="primary" value="buenos-aires">
          Buenos Aires
        </Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
    </div>
  );
};

export const Group = () => {
  // eslint-disable-next-line no-console
  const handleGroupChange = (value: string[]) => console.log(value);

  return (
    <CheckboxGroup
      color="warning"
      defaultValue={["buenos-aires"]}
      label="Select cities"
      onChange={handleGroupChange}
    >
      <Checkbox color="primary" value="buenos-aires">
        Buenos Aires
      </Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox isDisabled value="london">
        London
      </Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>
  );
};
