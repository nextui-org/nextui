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
  <div>
    <InputOtp {...args} />
  </div>
);

const RequiredTemplate = (args) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <div className="flex flex-col">
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
    <div className="flex flex-col gap-y-2">
      <InputOtp {...args} length={4} value={value} onValueChange={setValue} />
      <p className="text-default-500 text-sm">Input value: {value}</p>
    </div>
  );
};

const WithReactHookFormTemplate = (args) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: {
      withDefaultValue: "12",
      requiredField: "",
    },
  });

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="text-default-400/60 text-xs">Default value:</div>
        <InputOtp {...args} {...register("withDefaultValue")} />
      </div>
      <div className="flex flex-col">
        <div className="text-default-400/60 text-xs">Required value:</div>
        <InputOtp {...args} {...register("requiredField", {required: true})} />
        {errors.requiredField && (
          <span className="text-danger text-tiny">This field is required</span>
        )}
      </div>
      <button className={button({class: "w-fit"})} type="submit">
        Submit
      </button>
    </form>
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
  render: RequiredTemplate,
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
    defaultValue: "123",
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

export const Password = {
  render: Template,
  args: {
    ...defaultProps,
    type: "password",
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

export const WithReactHookForm = {
  render: WithReactHookFormTemplate,
  args: {
    ...defaultProps,
    length: 4,
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
    description: "custom otp component",
  },
};
