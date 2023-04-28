import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {checkbox, colors} from "@nextui-org/theme";
import {CheckIcon, CloseIcon} from "@nextui-org/shared-icons";
import {User} from "@nextui-org/user";
import {Link} from "@nextui-org/link";
import {Chip, ChipProps} from "@nextui-org/chip";
import {clsx} from "@nextui-org/shared-utils";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {
  Checkbox,
  CheckboxIconProps,
  CheckboxProps,
  useCheckbox,
  useCheckboxGroupContext,
} from "../src";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
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
    lineThrough: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Checkbox>;

const defaultProps: CheckboxProps = {
  ...checkbox.defaultVariants,
  children: "Option",
};

const Template: ComponentStory<typeof Checkbox> = (args: CheckboxProps) => <Checkbox {...args} />;

const ControlledTemplate: ComponentStory<typeof Checkbox> = (args: CheckboxProps) => {
  const [selected, setSelected] = React.useState<boolean>(true);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Checkbox ", selected);
  }, [selected]);

  return (
    <div className="flex flex-col gap-2">
      <Checkbox isSelected={selected} onValueChange={setSelected} {...args}>
        Subscribe (controlled)
      </Checkbox>
      <p className="text-neutral-500">Selected: {selected ? "true" : "false"}</p>
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

export const DefaultSelected = Template.bind({});
DefaultSelected.args = {
  ...defaultProps,
  defaultSelected: true,
};

export const CustomIconNode = Template.bind({});
CustomIconNode.args = {
  ...defaultProps,
  icon: <CloseIcon />,
};

export const CustomIconFunction = Template.bind({});
CustomIconFunction.args = {
  ...defaultProps,
  // eslint-disable-next-line react/display-name
  icon: (props: CheckboxIconProps) => <CloseIcon {...props} />,
};

export const AlwaysSelected = Template.bind({});
AlwaysSelected.args = {
  ...defaultProps,
  isSelected: true,
};

export const IsIndeterminate = Template.bind({});
IsIndeterminate.args = {
  ...defaultProps,
  isIndeterminate: true,
};

export const LineThrough = Template.bind({});
LineThrough.args = {
  ...defaultProps,
  lineThrough: true,
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

interface CustomCheckboxProps extends CheckboxProps {
  userName?: string;
  userProfile?: {
    username?: string;
    avatar?: string;
    url?: string;
  };
  userRole?: string;
  status?: string;
  statusColor?: ChipProps["color"];
}

export const CustomWithClassNames = (props: CustomCheckboxProps) => {
  const {
    value,
    userName = "Junior Garcia",
    userProfile = {
      avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
      username: "jrgarciadev",
      url: "https://twitter.com/jrgarciadev",
    },
    userRole = "Software Developer",
    status = "Active",
    statusColor = "secondary",
    ...otherProps
  } = props;

  const groupContext = useCheckboxGroupContext();
  const isInGroup = !!groupContext;

  const [isSelected, setIsSelected] = React.useState<boolean>(false);

  const checkboxProps = !isInGroup
    ? {
        isSelected,
        onValueChange: setIsSelected,
      }
    : {};

  const isChecked = isInGroup && value ? groupContext?.groupState.isSelected(value) : isSelected;

  return (
    <Checkbox
      {...otherProps}
      aria-label={userName}
      classNames={{
        base: clsx(
          "inline-flex w-full max-w-md bg-content1 hover:bg-content2 items-center justify-start cursor-pointer rounded-lg gap-2 p-4 border-2.5 border-transparent",
          {
            "border-primary": isChecked,
          },
        ),
        label: "w-full",
      }}
      value={value}
      {...checkboxProps}
    >
      <div className="w-full flex justify-between gap-2">
        <User
          avatarProps={{size: "sm", src: userProfile.avatar}}
          description={
            <Link href={userProfile.url} size="xs">
              @{userProfile.username}
            </Link>
          }
          name={userName}
        />
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-neutral-500">{userRole}</span>
          <Chip color={statusColor} size="xs" variant="flat">
            {status}
          </Chip>
        </div>
      </div>
    </Checkbox>
  );
};

export const CustomWithHooks = (props: CheckboxProps) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    "aria-label": props["aria-label"] || "Toggle status",
    ...props,
  });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: clsx("border-neutral hover:bg-neutral-200", {
            "border-primary bg-primary hover:bg-primary-600 hover:border-primary-600": isSelected,
            "outline-none ring-2 !ring-primary ring-offset-2 ring-offset-background dark:ring-offset-background-dark": isFocusVisible,
          }),
          content: clsx("text-primary", {
            "text-primary-foreground pl-1": isSelected,
          }),
        }}
        color="primary"
        startContent={isSelected ? <CheckIcon className="ml-1" color={colors.white} /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};
