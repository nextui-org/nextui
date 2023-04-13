/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
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
        options: ["flat", "faded", "bordered", "underlined"],
      },
    },
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
    labelPosition: {
      control: {
        type: "select",
        options: ["inside", "outside", "outside-left"],
      },
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
} as ComponentMeta<typeof Input>;

const defaultProps = {
  ...input.defaultVariants,
  label: "Email",
};

const Template: ComponentStory<typeof Input> = (args: InputProps) => (
  <div className="w-full max-w-[240px]">
    <Input {...args} />
  </div>
);

const MirrorTemplate: ComponentStory<typeof Input> = (args: InputProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Input {...args} />
    <Input {...args} placeholder="Enter your email" />
  </div>
);

const PasswordTemplate: ComponentStory<typeof Input> = (args: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="w-full max-w-[240px]">
      <Input
        {...args}
        endContent={
          <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-neutral-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-neutral-400 pointer-events-none" />
            )}
          </button>
        }
        type={isPasswordVisible ? "text" : "password"}
      />
    </div>
  );
};

const RegexValidationTemplate: ComponentStory<typeof Input> = (args: InputProps) => {
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

const ControlledTemplate: ComponentStory<typeof Input> = (args: InputProps) => {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <Input {...args} placeholder="Enter your email" value={value} onValueChange={setValue} />
      <p className="text-neutral-500 text-sm">Input value: {value}</p>
    </div>
  );
};

const LabelPositionTemplate: ComponentStory<typeof Input> = (args: InputProps) => (
  <div className="w-full flex flex-col items-center gap-12">
    <div className="w-full max-w-xl flex flex-row items-end gap-4">
      <Input {...args} />
      <Input {...args} labelPosition="outside" />
      <Input {...args} labelPosition="outside-left" />
    </div>
    <div className="w-full max-w-xl flex flex-row items-end gap-4">
      <Input {...args} placeholder="Enter your email" />
      <Input {...args} labelPosition="outside" placeholder="Enter your email" />
      <Input {...args} labelPosition="outside-left" placeholder="Enter your email" />
    </div>
  </div>
);

const StartContentTemplate: ComponentStory<typeof Input> = (args: InputProps) => (
  <div className="w-full max-w-xl flex flex-row items-end gap-4">
    <Input
      {...args}
      placeholder="you@example.com"
      startContent={
        <MailFilledIcon className="text-2xl text-neutral-400 pointer-events-none flex-shrink-0" />
      }
    />
    <Input
      {...args}
      label="Price"
      placeholder="0.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-neutral-400 text-sm">$</span>
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
          <span className="text-neutral-400 text-sm">https://</span>
        </div>
      }
      type="url"
    />
  </div>
);

const EndContentTemplate: ComponentStory<typeof Input> = (args: InputProps) => (
  <div className="w-full max-w-xl flex flex-row items-end gap-4">
    <Input
      {...args}
      endContent={
        <MailFilledIcon className="text-2xl text-neutral-400 pointer-events-none flex-shrink-0" />
      }
      placeholder="you@example.com"
    />
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-neutral-400 text-sm">$</span>
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
          <span className="text-neutral-400 text-sm">.org/</span>
        </div>
      }
      label="Website"
      placeholder="nextui"
      type="url"
    />
  </div>
);

const StartAndEndContentTemplate: ComponentStory<typeof Input> = (args: InputProps) => (
  <div className="w-full max-w-xs flex flex-col items-end gap-4">
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-neutral-400 text-sm">@gmail.com</span>
        </div>
      }
      placeholder="nextui"
      startContent={
        <MailFilledIcon className="text-xl text-neutral-400 pointer-events-none flex-shrink-0" />
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
            className="outline-none border-0 bg-transparent text-neutral-400 text-sm"
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
          <span className="text-neutral-400 text-sm">$</span>
        </div>
      }
      type="number"
    />
    <Input
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-neutral-400 text-sm">.org</span>
        </div>
      }
      label="Website"
      placeholder="nextui"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-neutral-400 text-sm">https://</span>
        </div>
      }
      type="url"
    />
  </div>
);

const InputTypesTemplate: ComponentStory<typeof Input> = (args: InputProps) => (
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

const CustomWithClassNamesTemplate: ComponentStory<typeof Input> = (args: InputProps) => (
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

const CustomWithHooksTemplate: ComponentStory<typeof Input> = (args: InputProps) => {
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
        "placeholder:text-neutral-700/50 dark:placeholder:text-white/60",
      ],
      innerWrapper: "bg-transparent",
      inputWrapper: [
        "shadow-xl",
        "bg-neutral-200/50",
        "dark:bg-neutral/60",
        "backdrop-blur-xl",
        "backdrop-saturate-200",
        "hover:bg-neutral-200/70",
        "focus-within:!bg-neutral-200/50",
        "dark:hover:bg-neutral/70",
        "dark:focus-within:!bg-neutral/60",
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

export const Default = MirrorTemplate.bind({});
Default.args = {
  ...defaultProps,
};

export const Required = MirrorTemplate.bind({});
Required.args = {
  ...defaultProps,
  isRequired: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultProps,
  defaultValue: "junior@nextui.org",
  variant: "faded",
  isDisabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...defaultProps,
  defaultValue: "junior@nextui.org",
  variant: "bordered",
  isReadOnly: true,
};

export const WithDescription = MirrorTemplate.bind({});
WithDescription.args = {
  ...defaultProps,
  description: "We'll never share your email with anyone else.",
};

export const Password = PasswordTemplate.bind({});
Password.args = {
  ...defaultProps,
  label: "Password",
  placeholder: "Enter your password",
  variant: "bordered",
};

export const LabelPosition = LabelPositionTemplate.bind({});
LabelPosition.args = {
  ...defaultProps,
};

export const Clearable = Template.bind({});
Clearable.args = {
  ...defaultProps,
  variant: "bordered",
  placeholder: "Enter your email",
  defaultValue: "junior@nextui.org",
  // eslint-disable-next-line no-console
  onClear: () => console.log("input cleared"),
};

export const StartContent = StartContentTemplate.bind({});
StartContent.args = {
  ...defaultProps,
  labelPosition: "outside",
};

export const EndContent = EndContentTemplate.bind({});
EndContent.args = {
  ...defaultProps,
  variant: "bordered",
  labelPosition: "outside",
};

export const StartAndEndContent = StartAndEndContentTemplate.bind({});
StartAndEndContent.args = {
  ...defaultProps,
  variant: "bordered",
  labelPosition: "outside",
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  ...defaultProps,
  errorMessage: "Please enter a valid email address",
};

export const InvalidValidationState = Template.bind({});
InvalidValidationState.args = {
  ...defaultProps,
  variant: "bordered",
  defaultValue: "invalid@email.com",
  validationState: "invalid",
  placeholder: "Enter your email",
  errorMessage: "Please enter a valid email address",
};

export const RegexValidation = RegexValidationTemplate.bind({});
RegexValidation.args = {
  ...defaultProps,
  variant: "faded",
};

export const InputTypes = InputTypesTemplate.bind({});
InputTypes.args = {
  ...defaultProps,
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  ...defaultProps,
  variant: "bordered",
};

export const CustomWithClassNames = CustomWithClassNamesTemplate.bind({});
CustomWithClassNames.args = {
  ...defaultProps,
};

export const CustomWithHooks = CustomWithHooksTemplate.bind({});
CustomWithHooks.args = {
  ...defaultProps,
  label: "Search",
  type: "search",
  placeholder: "Type to search...",
  startContent: (
    <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
  ),
};
