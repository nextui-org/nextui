import React from "react";
import {Meta} from "@storybook/react";
import {button, inputOtp} from "@nextui-org/theme";
import {useForm} from "react-hook-form";

import {InputOtp, InputOtpProps} from "../src";

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
  },
} as Meta<typeof InputOtp>;

const defaultProps = {
  ...inputOtp.defaultVariants,
};

const Template = (args: InputOtpProps) => <InputOtp {...args} otplength={4} />;

const WithReactHookFormTemplate = (args: InputOtpProps) => {
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
    console.log(data);
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputOtp {...args} otplength={4} {...register("otp", {required: true})} />
      {errors.otp && <span className="text-danger">This field is required</span>}
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
  },
};

export const InputOtpInForm = {
  render: WithReactHookFormTemplate,
  args: {
    ...defaultProps,
  },
};
