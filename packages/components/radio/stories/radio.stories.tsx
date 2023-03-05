import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {radio, button} from "@nextui-org/theme";

import {RadioGroup, Radio, RadioGroupProps} from "../src";

export default {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
  onChange: {action: "changed"},
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
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof RadioGroup>;

const defaultProps = {
  ...radio.defaultVariants,
  label: "Options",
};

const Template: ComponentStory<typeof RadioGroup> = (args: RadioGroupProps) => {
  const radioProps = args.description
    ? {
        a: {
          description: "Description for Option A",
        },
        b: {
          description: "Description for Option B",
        },
        c: {
          description: "Description for Option C",
        },
        d: {
          description: "Description for Option D",
        },
      }
    : {
        a: {},
        b: {},
        c: {},
        d: {},
      };

  const items = (
    <>
      <Radio value="A" {...radioProps.a}>
        Option A
      </Radio>
      <Radio value="B" {...radioProps.b}>
        Option B
      </Radio>
      <Radio value="C" {...radioProps.c}>
        Option C
      </Radio>
      <Radio value="D" {...radioProps.d}>
        Option D
      </Radio>
    </>
  );

  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Submitted!");
      }}
    >
      <RadioGroup {...args}>{items}</RadioGroup>
      <button className={button({color: "primary"})} type="submit">
        Submit
      </button>
    </form>
  ) : (
    <RadioGroup {...args}>{items}</RadioGroup>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  ...defaultProps,
  isDisabled: true,
};

export const DefaultChecked = Template.bind({});
DefaultChecked.args = {
  ...defaultProps,
  defaultValue: "C",
};

export const IsRequired = Template.bind({});
IsRequired.args = {
  ...defaultProps,
  isRequired: true,
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  ...defaultProps,
  description: "for",
};

export const Invalid = Template.bind({});
Invalid.args = {
  ...defaultProps,
  validationState: "invalid",
  description: "for",
};

export const Row = Template.bind({});
Row.args = {
  ...defaultProps,
  orientation: "horizontal",
  description: "for",
};

export const Controlled = () => {
  const [checked, setChecked] = React.useState<string>("london");

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("checked:", checked);
  }, [checked]);

  return (
    <RadioGroup label="Select city" value={checked} onChange={setChecked}>
      <Radio value="buenos-aires">Buenos Aires</Radio>
      <Radio value="sydney">Sydney</Radio>
      <Radio value="london">London</Radio>
      <Radio value="tokyo">Tokyo</Radio>
    </RadioGroup>
  );
};

export const DisableAnimation = Template.bind({});
DisableAnimation.args = {
  ...defaultProps,
  disableAnimation: true,
};
