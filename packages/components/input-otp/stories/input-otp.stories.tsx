import React from "react";
import {Meta} from "@storybook/react";
import {button, inputOtp} from "@nextui-org/theme";
import {useForm} from "react-hook-form";
import {ValidationResult} from "@react-types/shared";

import {InputOtp} from "../src";

export default {
  title: "Components/InputOtp",
  component: InputOtp,
  argTypes: {
    variant: {
      control: {type: "select"},
      options: ["flat", "faded", "bordered", "underlined"],
    },
    color: {
      control: {type: "select"},
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
    },
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
} as Meta<typeof InputOtp>;

const defaultProps = {
  ...inputOtp.defaultVariants,
};

const Template = (args) => (
  <div className="w-screen h-screen flex items-center justify-center">
    <InputOtp {...args} />
  </div>
);

const WithReactHookFormTemplate = (args) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: {
      otp: "1234",
    },
  });

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <InputOtp {...args} length={4} {...register("otp", {required: true})} />
        {errors.otp && <div className="text-xs text-danger">This field is required</div>}
        <button className={button({class: "w-fit"})} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const ControlledTemplate = (args) => {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-screen h-screen flex flex-col gap-y-2 items-center justify-center">
      <InputOtp {...args} length={4} value={value} onValueChange={setValue} />
      <p className="text-default-500 text-sm">Input value: {value}</p>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
  },
};

export const Required = {
  render: WithReactHookFormTemplate,
  args: {
    ...defaultProps,
    length: 4,
  },
};

export const Disabled = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
    isDisabled: true,
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
    value: "12",
    isReadOnly: true,
  },
};

export const WithDescription = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
    description: "description for the otp component",
  },
};

export const WithErrorMessage = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
    isInvalid: true,
    errorMessage: "Please enter a valid OTP.",
  },
};

export const WithErrorMessageFunction = {
  render: WithReactHookFormTemplate,
  args: {
    ...defaultProps,
    length: 4,
    isRequired: true,
    minLength: 4,
    errorMessage: (value: ValidationResult) => {
      if (value.validationDetails.tooShort) {
        return "Value is too short";
      }
    },
  },
};

export const isInvalid = {
  render: Template,
  args: {
    ...defaultProps,
    length: 4,
    isInvalid: true,
    errorMessage: "Invalid OTP",
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomWithClassNames = {
  render: Template,

  args: {
    ...defaultProps,
    length: 4,
    classNames: {
      segment: "bg-gradient-to-tr from-pink-500 to-yellow-500",
      caret: "bg-red-700",
    },
    radius: "md",
    description: "Custom otp component.",
  },
};
