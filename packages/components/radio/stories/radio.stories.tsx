import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {radio, button} from "@nextui-org/theme";
import {clsx} from "@nextui-org/shared-utils";

import {
  RadioGroup,
  Radio,
  RadioProps,
  RadioGroupProps,
  useRadio,
  useRadioGroupContext,
} from "../src";

export default {
  title: "Components/RadioGroup",
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

const ControlledTemplate: ComponentStory<typeof RadioGroup> = (args: RadioGroupProps) => {
  const [selectedItem, setSelectedItem] = React.useState<string>("london");

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("isSelected:", selectedItem);
  }, [selectedItem]);

  return (
    <div className="flex flex-col gap-2">
      <RadioGroup
        label="Select city"
        value={selectedItem}
        onValueChange={setSelectedItem}
        {...args}
      >
        <Radio value="buenos-aires">Buenos Aires</Radio>
        <Radio value="sydney">Sydney</Radio>
        <Radio value="london">London</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
      <p className="text-neutral-500">Selected: {selectedItem}</p>
    </div>
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

export const DisableAnimation = Template.bind({});
DisableAnimation.args = {
  ...defaultProps,
  disableAnimation: true,
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  ...defaultProps,
};

const CustomRadio = (props: RadioProps) => {
  const {children, ...otherProps} = props;

  const {groupState} = useRadioGroupContext();

  const isSelected = groupState.selectedValue === otherProps.value;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: clsx(
          "inline-flex bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          {
            "border-primary": isSelected,
          },
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export const CustomWithClassNames = () => {
  return (
    <RadioGroup label="Plans">
      <CustomRadio description="Up to 20 items" value="free">
        Free
      </CustomRadio>
      <CustomRadio description="Unlimited items. $10 per month." value="pro">
        Pro
      </CustomRadio>
      <CustomRadio description="24/7 support. Contact us for pricing." value="enterprise">
        Enterprise
      </CustomRadio>
    </RadioGroup>
  );
};

const RadioCard = (props: RadioProps) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={clsx(
        "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse max-w-[300px] cursor-pointer border-2 border-neutral rounded-lg gap-4 p-4",
        {
          "border-primary": isSelected,
        },
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className={clsx("text-sm text-foreground opacity-70")}>{description}</span>
        )}
      </div>
    </Component>
  );
};

export const CustomWithHooks = () => {
  return (
    <RadioGroup label="Plans">
      <RadioCard description="Up to 20 items" value="free">
        Free
      </RadioCard>
      <RadioCard description="Unlimited items. $10 per month." value="pro">
        Pro
      </RadioCard>
      <RadioCard description="24/7 support. Contact us for pricing." value="enterprise">
        Enterprise
      </RadioCard>
    </RadioGroup>
  );
};
