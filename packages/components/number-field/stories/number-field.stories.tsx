/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type {ValidationResult} from "@react-types/shared";

import React from "react";
import {Meta} from "@storybook/react";
import {button} from "@nextui-org/theme";
import {Form} from "@nextui-org/form";

import {numberField} from "../../../core/theme";
import {NumberField, NumberFieldProps} from "../src";

export default {
  title: "Components/NumberField",
  component: NumberField,
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
    validationBehavior: {
      control: {
        type: "select",
      },
      options: ["aria", "native"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof NumberField>;

const defaultProps = {
  ...numberField.defaultVariants,
  defaultValue: 1024,
  label: "Width",
};

const Template = (args) => (
  <div className="w-full max-w-[240px]">
    <NumberField {...args} />
  </div>
);

const FormTemplate = (args) => (
  <form
    className="w-full max-w-xl flex flex-row items-end gap-4"
    onSubmit={(e) => {
      alert(`Submitted value: ${e.target["example"].value}`);
      e.preventDefault();
    }}
  >
    <NumberField {...args} name="example" />
    <button className={button({color: "primary"})} type="submit">
      Submit
    </button>
  </form>
);

const ControlledTemplate = (args) => {
  const [value, setValue] = React.useState(0);

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <NumberField {...args} placeholder="Enter a number" value={value} onValueChange={setValue} />
      <p className="text-default-500 text-sm">NumberField value: {value}</p>
    </div>
  );
};

const LabelPlacementTemplate = (args) => (
  <div className="w-full flex flex-col items-center gap-12">
    <div className="flex flex-col gap-3">
      <h3>Without placeholder</h3>
      <div className="w-full max-w-xl flex flex-row items-end gap-4">
        <NumberField {...args} description="inside" />
        <NumberField {...args} description="outside" labelPlacement="outside" />
        <NumberField {...args} description="outside-left" labelPlacement="outside-left" />
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <h3>With placeholder</h3>
      <div className="w-full max-w-xl flex flex-row items-end gap-4">
        <NumberField {...args} description="inside" placeholder="Enter a number" />
        <NumberField
          {...args}
          description="outside"
          labelPlacement="outside"
          placeholder="Enter a number"
        />
        <NumberField
          {...args}
          description="outside-left"
          labelPlacement="outside-left"
          placeholder="Enter a number"
        />
      </div>
    </div>
  </div>
);

const StartContentTemplate = (args) => (
  <div className="w-full max-w-[240px]">
    <NumberField
      {...args}
      label="Price"
      placeholder="0.00"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">$</span>
        </div>
      }
    />
  </div>
);

const EndContentTemplate = (args) => (
  <div className="w-full max-w-[240px]">
    <NumberField
      {...args}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-sm">€</span>
        </div>
      }
      label="Price"
      placeholder="0.00"
    />
  </div>
);

const StartAndEndContentTemplate = (args) => (
  <div className="w-full max-w-[240px]">
    <NumberField
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
    />
  </div>
);

const CustomWithClassNamesTemplate = (args) => (
  <div className="w-full max-w-[340px]">
    <NumberField
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
      endContent={<div className="pointer-events-none flex items-center">€</div>}
      labelPlacement="outside"
      placeholder="Enter the amount"
    />
  </div>
);

// const CustomWithHooksTemplate = (args: NumberFieldProps) => {
//   const {
//     Component,
//     label,
//     domRef,
//     description,
//     isClearable,
//     startContent,
//     endContent,
//     shouldLabelBeOutside,
//     shouldLabelBeInside,
//     errorMessage,
//     getBaseProps,
//     getLabelProps,
//     getNumberFieldProps,
//     getInnerWrapperProps,
//     getNumberFieldWrapperProps,
//     getDescriptionProps,
//     getErrorMessageProps,
//     getClearButtonProps,
//   } = useNumberField({
//     ...args,
//     classNames: {
//       label: "text-black/50 dark:text-white/90",
//       input: [
//         "bg-transparent",
//         "text-black/90 dark:text-white/90",
//         "placeholder:text-default-700/50 dark:placeholder:text-white/60",
//       ],
//       innerWrapper: "bg-transparent",
//       inputWrapper: [
//         "shadow-xl",
//         "bg-default-200/50",
//         "dark:bg-default/60",
//         "backdrop-blur-xl",
//         "backdrop-saturate-200",
//         "hover:bg-default-200/70",
//         "focus-within:!bg-default-200/50",
//         "dark:hover:bg-default/70",
//         "dark:focus-within:!bg-default/60",
//         "!cursor-text",
//       ],
//     },
//   });

//   const labelContent = <label {...getLabelProps()}>{label}</label>;

//   const end = React.useMemo(() => {
//     if (isClearable) {
//       return <span {...getClearButtonProps()}>{endContent || <CloseFilledIcon />}</span>;
//     }

//     return endContent;
//   }, [isClearable, getClearButtonProps]);

//   const innerWrapper = React.useMemo(() => {
//     if (startContent || end) {
//       return (
//         <div {...getInnerWrapperProps()}>
//           {startContent}
//           <input {...getNumberFieldProps()} />
//           {end}
//         </div>
//       );
//     }

//     return <input {...getNumberFieldProps()} />;
//   }, [startContent, end, getNumberFieldProps, getInnerWrapperProps]);

//   return (
//     <div className="w-[340px] h-[300px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
//       <Component {...getBaseProps()}>
//         {shouldLabelBeOutside ? labelContent : null}
//         <div
//           {...getNumberFieldWrapperProps()}
//           role="button"
//           onClick={() => {
//             domRef.current?.focus();
//           }}
//         >
//           {shouldLabelBeInside ? labelContent : null}
//           {innerWrapper}
//         </div>
//         {description && <div {...getDescriptionProps()}>{description}</div>}
//         {errorMessage && <div {...getErrorMessageProps()}>{errorMessage}</div>}
//       </Component>
//     </div>
//   );
// };

// const WithReactHookFormTemplate = (args: NumberFieldProps) => {
//   const {
//     register,
//     formState: {errors},
//     handleSubmit,
//   } = useForm({
//     defaultValues: {
//       withDefaultValue: 1024,
//       withoutDefaultValue: "",
//       requiredField: "",
//     },
//   });

//   const onSubmit = (data: any) => {
//     // eslint-disable-next-line no-console
//     console.log(data);
//     alert("Submitted value: " + JSON.stringify(data));
//   };

//   return (
//     <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
//       <NumberField
//         {...args}
//         isClearable
//         label="With default value"
//         {...register("withDefaultValue")}
//       />
//       <NumberField {...args} label="Without default value" {...register("withoutDefaultValue")} />
//       <NumberField {...args} label="Required" {...register("requiredField", {required: true})} />
//       {errors.requiredField && <span className="text-danger">This field is required</span>}
//       <button className={button({class: "w-fit"})} type="submit">
//         Submit
//       </button>
//     </form>
//   );
// };

const ServerValidationTemplate = (args: NumberFieldProps) => {
  const [serverErrors, setServerErrors] = React.useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    setServerErrors({
      width: "Please provide a valid number.",
    });
  };

  return (
    <Form
      className="flex flex-col items-start gap-2"
      validationErrors={serverErrors}
      onSubmit={onSubmit}
    >
      <NumberField {...args} label="Width" name="width" />
      <button className={button({color: "primary"})} type="submit">
        Submit
      </button>
    </Form>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const HorizontalStepper = {
  render: Template,

  args: {
    ...defaultProps,
    steps: "horizontal",
  },
};

export const HideStepper = {
  render: Template,

  args: {
    ...defaultProps,
    hideStepper: true,
  },
};

export const Required = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const Disabled = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "faded",
    isDisabled: true,
  },
};

export const ReadOnly = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    isReadOnly: true,
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    "aria-label": "Email",
    placeholder: "Enter a number",
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Enter a number",
  },
};

export const WithFormatOptions = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Transaction amount",
    formatOptions: {
      style: "currency",
      currency: "USD",
    },
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
    placeholder: "Enter a number",
    // eslint-disable-next-line no-console
    onClear: () => console.log("input cleared"),
  },
};

export const StartContent = {
  render: StartContentTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
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
    isInvalid: true,
    errorMessage: "Please enter a valid number",
  },
};

export const WithErrorMessageFunction = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    min: "0",
    max: "100",
    type: "number",
    isRequired: true,
    label: "Number",
    placeholder: "Enter a number(0-100)",
    errorMessage: (value: ValidationResult) => {
      if (value.validationDetails.rangeOverflow) {
        return "Value is too high";
      }
      if (value.validationDetails.rangeUnderflow) {
        return "Value is too low";
      }
      if (value.validationDetails.valueMissing) {
        return "Value is required";
      }
    },
  },
};

export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    validate: (value) => {
      if (value < 0 || value > 100) {
        return "Value must be between 0 and 100";
      }
    },
    isRequired: true,
    label: "Number",
    placeholder: "Enter a number(0-100)",
  },
};

export const WithServerValidation = {
  render: ServerValidationTemplate,

  args: {
    ...defaultProps,
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    isInvalid: true,
    placeholder: "Enter a number",
    errorMessage: "Please enter a valid range of numbers",
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
  },
};

export const MinValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Enter a number (min value: 60)",
    minValue: 60,
    defaultValue: 64,
  },
};

export const MaxValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Enter a number (max value: 100)",
    defaultValue: 0,
    maxValue: 100,
  },
};

export const CustomWithClassNames = {
  render: CustomWithClassNamesTemplate,

  args: {
    ...defaultProps,
  },
};

// export const CustomWithHooks = {
//   render: CustomWithHooksTemplate,

//   args: {
//     ...defaultProps,
//     label: "Search",
//     type: "search",
//     placeholder: "Type to search...",
//     startContent: (
//       <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
//     ),
//   },
// };

// export const WithReactHookForm = {
//   render: WithReactHookFormTemplate,

//   args: {
//     ...defaultProps,
//   },
// };
