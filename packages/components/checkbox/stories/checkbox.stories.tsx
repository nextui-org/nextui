import React from "react";
import {Meta} from "@storybook/react";
import {checkbox} from "@nextui-org/theme";
import {CloseIcon} from "@nextui-org/shared-icons";
import {button} from "@nextui-org/theme";

import {Checkbox, CheckboxIconProps, CheckboxProps} from "../src";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
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
} as Meta<typeof Checkbox>;

const defaultProps: CheckboxProps = {
  ...checkbox.defaultVariants,
  children: "Option",
};

const ControlledTemplate = (args: CheckboxProps) => {
  const [selected, setSelected] = React.useState<boolean>(true);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Checkbox ", selected);
  }, [selected]);

  return (
    <div className="flex flex-col gap-2">
      <Checkbox isSelected={selected} onValueChange={setSelected} {...args}>
        Subscribe (controlled)
      </Checkbox>
      <p className="text-default-500">Selected: {selected ? "true" : "false"}</p>
    </div>
  );
};

const FormTemplate = (args: CheckboxProps) => {
  return (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        alert(`Submitted value: ${e.target["check"].value}`);
        e.preventDefault();
      }}
    >
      <Checkbox name="check" value="checked" {...args}>
        Check
      </Checkbox>
      <button className={button({color: "primary"})} type="submit">
        Submit
      </button>
    </form>
  );
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DefaultSelected = {
  args: {
    ...defaultProps,
    defaultSelected: true,
  },
};

export const CustomIconNode = {
  args: {
    ...defaultProps,
    icon: <CloseIcon />,
  },
};

export const CustomIconFunction = {
  args: {
    ...defaultProps,
    // eslint-disable-next-line react/display-name
    icon: (props: CheckboxIconProps) => <CloseIcon {...props} />,
  },
};

export const AlwaysSelected = {
  args: {
    ...defaultProps,
    isSelected: true,
  },
};

export const IsIndeterminate = {
  args: {
    ...defaultProps,
    isIndeterminate: true,
  },
};

export const LineThrough = {
  args: {
    ...defaultProps,
    lineThrough: true,
  },
};

export const DisableAnimation = {
  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const Required = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};
