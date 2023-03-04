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

  // const [groupSelected, setGroupSelected] = React.useState<string[]>(["buenos-aires", "sydney"]);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Checkbox ", selected);
  }, [selected]);

  // React.useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log("CheckboxGroup ", groupSelected);
  // }, [groupSelected]);

  return (
    <div className="flex flex-row gap-2">
      <Checkbox isSelected={selected} onChange={setSelected} {...checkbox.defaultVariants}>
        Subscribe (controlled)
      </Checkbox>
      {/* <Checkbox.Group
        color="warning"
        label="Select cities"
        labelColor="primary"
        value={groupSelected}
        onChange={setGroupSelected}
      >
        <Checkbox color="primary" value="buenos-aires">
          Buenos Aires
        </Checkbox>
        <Checkbox labelColor="warning" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox labelColor="error" value="london">
          London
        </Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </Checkbox.Group> */}
    </div>
  );
};

// export const Group = () => {
//   // eslint-disable-next-line no-console
//   const handleGroupChange = (value: string[]) => console.log(value);

//   return (
//     <Checkbox.Group
//       color="warning"
//       defaultValue={["buenos-aires"]}
//       label="Select cities"
//       labelColor="primary"
//       onChange={handleGroupChange}
//     >
//       <Checkbox color="primary" value="buenos-aires">
//         Buenos Aires
//       </Checkbox>
//       <Checkbox labelColor="warning" value="sydney">
//         Sydney
//       </Checkbox>
//       <Checkbox isDisabled labelColor="error" value="london">
//         London
//       </Checkbox>
//       <Checkbox value="tokyo">Tokyo</Checkbox>
//     </Checkbox.Group>
//   );
// };

// export const GroupRow = () => (
//   <Checkbox.Group
//     color="warning"
//     defaultValue={["1"]}
//     label="Select cities"
//     orientation="horizontal"
//   >
//     <Checkbox color="primary" value="1">
//       Buenos Aires
//     </Checkbox>
//     <Checkbox value="2">Sydney</Checkbox>
//     <Checkbox value="3">London</Checkbox>
//     <Checkbox value="4">Tokyo</Checkbox>
//   </Checkbox.Group>
// );
