/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import {Meta} from "@storybook/react";
import {input} from "@nextui-org/theme";
import {
  MailFilledIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
  SearchIcon,
  CloseFilledIcon,
} from "@nextui-org/shared-icons";

import {Input, InputProps, useInput} from "../src";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
    },
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
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Input>;

const defaultProps = {
  ...input.defaultVariants,
  label: "Email",
};

const Template = (args) => (
  <div className="w-full max-w-[240px]">
    <Input {...args} size="sm" />
  </div>
);

const MirrorTemplate = (args) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Input {...args} />
    <Input {...args} placeholder="Enter your email" />
  </div>
);

const PasswordTemplate = (args) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="w-full max-w-[240px]">
      <Input
        {...args}
        endContent={
          <button
            aria-label="show password"
            aria-pressed={isPasswordVisible}
            type="button"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isPasswordVisible ? "text" : "password"}
      />
    </div>
  );
};

const RegexValidationTemplate = (args) => {
  const [value, setValue] = React.useState("");

  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const validationState = React.useMemo(() => {
    if (value === "") return undefined;

    return validateEmail(value) ? "valid" : "invalid";
  }, [value]);

  return (
    <div className="w-full max-w-[240px]">
      <Input
        {...args}
        errorMessage={validationState === "invalid" && "Please enter a valid email"}
        placeholder="Enter your email"
        validationState={validationState}
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
};

const ControlledTemplate = (args) => {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <Input {...args} placeholder="Enter your email" value={value} onValueChange={setValue} />
      <p className="text-default-500 text-sm">Input value: {value}</p>
    </div>
  );
};

const LabelPlacementTemplate = (args) => (
  <div className="w-full flex flex-col items-center gap-12">
    <div className="flex flex-col gap-3">
      <h3>Without placeholder</h3>
      <div className="w-full max-w-xl flex flex-row items-end gap-4">
        <Input {...args} />
        <Input {...args} labelPlacement="outside" />
        <Input {...args} labelPlacement="outside-left" />
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <h3>With placeholder</h3>
      <div className="w-full max-w-xl flex flex-row items-end gap-4">
        <Input {...args} placeholder="Enter your email" />
        <Input {...args} labelPlacement="outside" placeholder="Enter your email" />
        <Input {...args} labelPlacement="outside-left" placeholder="Enter your email" />
      </div>
    </div>
  </div>
);

const StartContentTemplate = (args) => (
  <div className="w-full max-w-xl flex flex-row items-end gap-4">
    <Input
      {...args}
      placeholder="you@example.com"
      startContent={
        <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
    <Input
      {...args}
      label="Price"
      placeholder="0.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">$</span>
        </div>
      }
      type="number"
    />
    <Input
      {...args}
      label="Website"
      placeholder="nextui.org"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">https://</span>
        </div>
      }
      type="url"
    />
  </div>
);

const EndContentTemplate = (args) => (
  <div className="w-full max-w-xl flex flex-row items-end gap-4">
    <Input
      {...args}
      endContent={
        <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
      placeholder="you@example.com"
    />
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">$</span>
        </div>
      }
      label="Price"
      placeholder="0.00"
      type="number"
    />
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">.org/</span>
        </div>
      }
      label="Website"
      placeholder="nextui"
      type="url"
    />
  </div>
);

const StartAndEndContentTemplate = (args) => (
  <div className="w-full max-w-xs flex flex-col items-end gap-4">
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">@gmail.com</span>
        </div>
      }
      placeholder="nextui"
      startContent={
        <MailFilledIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
    <Input
      {...args}
      endContent={
        <div className="flex items-center">
          <label className="sr-only" htmlFor="currency">
            Currency
          </label>
          <select
            className="outline-none border-0 bg-transparent text-default-400 text-sm"
            id="currency"
            name="currency"
          >
            <option>USD</option>
            <option>ARS</option>
            <option>EUR</option>
          </select>
        </div>
      }
      label="Price"
      placeholder="0.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">$</span>
        </div>
      }
      type="number"
    />
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">.org</span>
        </div>
      }
      label="Website"
      placeholder="nextui"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">https://</span>
        </div>
      }
      type="url"
    />
  </div>
);

const InputTypesTemplate = (args) => (
  <div className="grid grid-cols-3 gap-4">
    <Input {...args} label="Text" placeholder="Enter your text" />
    <Input {...args} label="Number" placeholder="Enter your number" type="number" />
    <Input {...args} label="Password" placeholder="Enter your password" type="password" />
    <Input {...args} label="Email" placeholder="Enter your email" type="email" />
    <Input {...args} label="URL" placeholder="Enter your url" type="url" />
    <Input {...args} label="Search" placeholder="Enter your search" type="search" />
    <Input {...args} label="Tel" placeholder="Enter your phone" type="tel" />
    <Input {...args} label="Date" placeholder="Enter your date" type="date" />
    <Input {...args} label="Time" placeholder="Enter your time" type="time" />
    <Input {...args} label="Month" placeholder="Enter your month" type="month" />
    <Input {...args} label="Week" placeholder="Enter your week" type="week" />
    <Input {...args} label="Range" placeholder="Enter your range" type="range" />
  </div>
);

const CustomWithClassNamesTemplate = (args) => (
  <div className="w-full max-w-[340px]">
    <Input
      {...args}
      classNames={{
        label: "hidden",
        inputWrapper: [
          "bg-slate-100",
          "border",
          "shadow",
          "hover:bg-slate-200",
          "focus-within:!bg-slate-100",
          "dark:bg-slate-900",
          "dark:hover:bg-slate-800",
          "dark:border-slate-800",
          "dark:focus-within:!bg-slate-900",
        ],
        innerWrapper: "gap-3",
        input: [
          "text-base",
          "text-slate-500",
          "placeholder:text-slate-500",
          "dark:text-slate-400",
          "dark:placeholder:text-slate-400",
        ],
      }}
      endContent={
        <div className="pointer-events-none flex items-center">
          <kbd className="font-sans font-semibold text-slate-400">
            <abbr className="no-underline" title="Command">
              ⌘
            </abbr>
            &nbsp;K
          </kbd>
        </div>
      }
      placeholder="Quick search..."
      startContent={
        <SearchIcon className="text-xl text-slate-400 pointer-events-none flex-shrink-0" />
      }
    />
  </div>
);

const CustomWithHooksTemplate = (args: InputProps) => {
  const {
    Component,
    label,
    domRef,
    description,
    isClearable,
    startContent,
    endContent,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    errorMessage,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
  } = useInput({
    ...args,
    classNames: {
      label: "text-black/50 dark:text-white/90",
      input: [
        "bg-transparent",
        "text-black/90 dark:text-white/90",
        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
      ],
      innerWrapper: "bg-transparent",
      inputWrapper: [
        "shadow-xl",
        "bg-default-200/50",
        "dark:bg-default/60",
        "backdrop-blur-xl",
        "backdrop-saturate-200",
        "hover:bg-default-200/70",
        "focus-within:!bg-default-200/50",
        "dark:hover:bg-default/70",
        "dark:focus-within:!bg-default/60",
        "!cursor-text",
      ],
    },
  });

  const labelContent = <label {...getLabelProps()}>{label}</label>;

  const end = React.useMemo(() => {
    if (isClearable) {
      return <span {...getClearButtonProps()}>{endContent || <CloseFilledIcon />}</span>;
    }

    return endContent;
  }, [isClearable, getClearButtonProps]);

  const innerWrapper = React.useMemo(() => {
    if (startContent || end) {
      return (
        <div {...getInnerWrapperProps()}>
          {startContent}
          <input {...getInputProps()} />
          {end}
        </div>
      );
    }

    return <input {...getInputProps()} />;
  }, [startContent, end, getInputProps, getInnerWrapperProps]);

  return (
    <div className="w-[340px] h-[300px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
      <Component {...getBaseProps()}>
        {shouldLabelBeOutside ? labelContent : null}
        <div
          {...getInputWrapperProps()}
          role="button"
          onClick={() => {
            domRef.current?.focus();
          }}
        >
          {shouldLabelBeInside ? labelContent : null}
          {innerWrapper}
        </div>
        {description && <div {...getDescriptionProps()}>{description}</div>}
        {errorMessage && <div {...getErrorMessageProps()}>{errorMessage}</div>}
      </Component>
    </div>
  );
};

export const Default = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
  },
};

export const Required = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const Disabled = {
  render: Template,

  args: {
    ...defaultProps,
    defaultValue: "junior@nextui.org",
    variant: "faded",
    isDisabled: true,
  },
};

export const ReadOnly = {
  render: Template,

  args: {
    ...defaultProps,
    defaultValue: "junior@nextui.org",
    variant: "bordered",
    isReadOnly: true,
  },
};

export const WithDescription = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
    description: "We'll never share your email with anyone else.",
  },
};

export const Password = {
  render: PasswordTemplate,

  args: {
    ...defaultProps,
    label: "Password",
    placeholder: "Enter your password",
    variant: "bordered",
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const Clearable = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    placeholder: "Enter your email",
    defaultValue: "junior@nextui.org",
    // eslint-disable-next-line no-console
    onClear: () => console.log("input cleared"),
  },
};

export const StartContent = {
  render: StartContentTemplate,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
  },
};

export const EndContent = {
  render: EndContentTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
    labelPlacement: "outside",
  },
};

export const StartAndEndContent = {
  render: StartAndEndContentTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
    labelPlacement: "outside",
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    errorMessage: "Please enter a valid email address",
  },
};

export const InvalidValidationState = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    defaultValue: "invalid@email.com",
    validationState: "invalid",
    placeholder: "Enter your email",
    errorMessage: "Please enter a valid email address",
  },
};

export const RegexValidation = {
  render: RegexValidationTemplate,

  args: {
    ...defaultProps,
    variant: "faded",
  },
};

export const InputTypes = {
  render: InputTypesTemplate,

  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
  },
};

export const CustomWithClassNames = {
  render: CustomWithClassNamesTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomWithHooks = {
  render: CustomWithHooksTemplate,

  args: {
    ...defaultProps,
    label: "Search",
    type: "search",
    placeholder: "Type to search...",
    startContent: (
      <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
    ),
  },
};
