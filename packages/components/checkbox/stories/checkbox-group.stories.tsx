import React from "react";
import {ComponentMeta} from "@storybook/react";
import {checkbox} from "@nextui-org/theme";

import {CheckboxGroup, Checkbox, CheckboxGroupProps} from "../src";

import {
  CustomWithClassNames as CheckboxItemWithStyles,
  CustomWithHooks as CheckboxItemWithHooks,
} from "./checkbox.stories";

export default {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["default", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "sm", "md", "lg", "full"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
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

const Template = (args: CheckboxGroupProps) => (
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

export const WithDescription = Template.bind({});
WithDescription.args = {
  ...defaultProps,
  description: "Select the cities you want to visit",
};

export const Invalid = Template.bind({});
Invalid.args = {
  ...defaultProps,
  validationState: "invalid",
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  ...defaultProps,
  validationState: "invalid",
  errorMessage: "The selected cities cannot be visited at the same time",
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

export const CustomWithClassNames = () => {
  const [groupSelected, setGroupSelected] = React.useState<string[]>([]);

  return (
    <>
      <CheckboxGroup label="Select employees" value={groupSelected} onChange={setGroupSelected}>
        <CheckboxItemWithStyles value="junior" />
        <CheckboxItemWithStyles
          userName="John Doe"
          userProfile={{
            avatar: "https://i.pravatar.cc/300?u=a042581f4e29026707d",
            username: "johndoe",
            url: "#",
          }}
          userRole="Product Designer"
          value="johndoe"
        />
        <CheckboxItemWithStyles
          userName="Zoey Lang"
          userProfile={{
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            username: "zoeylang",
            url: "#",
          }}
          userRole="Technical Writer"
          value="zoeylang"
        />
        <CheckboxItemWithStyles
          userName="William Howard"
          userProfile={{
            avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
            username: "william",
            url: "#",
          }}
          userRole="Sales Manager"
          value="william"
        />
      </CheckboxGroup>
      <p className="mt-4 ml-1 text-default-500">Selected: {groupSelected.join(", ")}</p>
    </>
  );
};

export const CustomWithHooks = () => {
  const [groupSelected, setGroupSelected] = React.useState<string[]>([]);

  return (
    <>
      <CheckboxGroup
        className="gap-1"
        label="Select amenities"
        orientation="horizontal"
        value={groupSelected}
        onChange={setGroupSelected}
      >
        <CheckboxItemWithHooks value="wifi">Wifi</CheckboxItemWithHooks>
        <CheckboxItemWithHooks value="tv">TV</CheckboxItemWithHooks>
        <CheckboxItemWithHooks value="kitchen">Kitchen</CheckboxItemWithHooks>
        <CheckboxItemWithHooks value="parking">Parking</CheckboxItemWithHooks>
        <CheckboxItemWithHooks value="pool">Pool</CheckboxItemWithHooks>
        <CheckboxItemWithHooks value="gym">Gym</CheckboxItemWithHooks>
      </CheckboxGroup>
      <p className="mt-4 ml-1 text-default-500">Selected: {groupSelected.join(", ")}</p>
    </>
  );
};
