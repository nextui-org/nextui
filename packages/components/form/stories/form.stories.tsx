import React, {useState} from "react";
import {Meta} from "@storybook/react";
// import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

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
  <Form {...args} className="flex flex-col gap-2 w-4/5">
    {/* <Input isRequired label="comment" name="input" /> */}
    <Button color="primary" type="submit">
      Submit
    </Button>
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

export const ServerValidation = () => {
  const [serverErrors, setServerErrors] = useState({});
  const onSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    for (let el of e.target.elements) {
      errors[el.name] = `Invalid value for "${el.name}".`;
    }
    setServerErrors(errors);
  };

  return <Template validationErrors={serverErrors} onSubmit={onSubmit} />;
};
