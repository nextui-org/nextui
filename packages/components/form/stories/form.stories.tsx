import React from "react";
import {Meta} from "@storybook/react";
import {Input} from "@nextui-org/input";
import {Checkbox, CheckboxGroup} from "@nextui-org/checkbox";
import {RadioGroup, Radio} from "@nextui-org/radio";
import {button} from "@nextui-org/theme";

import {Form, FormProps} from "../src";

export default {
  title: "Components/Form",
  component: Form,
  argTypes: {
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    validationBehavior: {
      control: {
        type: "select",
      },
      options: ["aria", "native"],
    },
  },
} as Meta<typeof Form>;

const defaultProps = {};

const Template = (args: FormProps) => (
  <Form
    {...args}
    className="flex flex-col gap-4"
    onSubmit={(e) => {
      e.preventDefault();
      alert(`Submitted value: ${e.target["input"].value}`);
    }}
  >
    <Input isRequired label="Name (required)" name="input" />
    <CheckboxGroup isRequired>
      <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="san-francisco">San Francisco</Checkbox>
    </CheckboxGroup>
    <RadioGroup isRequired label="Options">
      <Radio value="A">Option A</Radio>
      <Radio value="B">Option B</Radio>
      <Radio value="C">Option C</Radio>
    </RadioGroup>
    <button className={button({className: "max-w-fit"})} type="submit">
      Submit
    </button>
  </Form>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const NativeValidation = {
  render: Template,
  args: {
    ...defaultProps,
    validationBehavior: "native",
  },
};

export const AriaValidation = {
  render: Template,
  args: {
    ...defaultProps,
    validationBehavior: "aria",
  },
};
