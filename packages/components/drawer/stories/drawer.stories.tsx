/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import {Meta} from "@storybook/react";
import {drawer} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Checkbox} from "@nextui-org/checkbox";
import {Link} from "@nextui-org/link";
import {MailFilledIcon, LockFilledIcon} from "@nextui-org/shared-icons";
import {useDisclosure} from "@nextui-org/use-disclosure";

import {Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerProps} from "../src";

export default {
  title: "Components/Drawer",
  component: Drawer,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "full"],
    },
    placement: {
      control: {
        type: "select",
      },
      options: ["left", "right", "top", "bottom"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg"],
    },
    backdrop: {
      control: {
        type: "select",
      },
      options: ["transparent", "blur", "opaque"],
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
    isDismissable: {
      control: {
        type: "boolean",
      },
    },
    isKeyboardDismissDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Drawer>;

const defaultProps = {
  ...drawer.defaultVariants,
  isDismissable: true,
  isKeyboardDismissDisabled: false,
};

const content = (
  <DrawerContent>
    {(onClose) => (
      <>
        <DrawerHeader className="flex flex-col gap-1">Log in</DrawerHeader>
        <DrawerBody>
          <Input
            autoFocus
            endContent={
              <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            endContent={
              <LockFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
          />
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-sm",
              }}
            >
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Sign in
          </Button>
        </DrawerFooter>
      </>
    )}
  </DrawerContent>
);

const Template = (args: DrawerProps) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure({defaultOpen: args.defaultOpen});

  return (
    <>
      <Button onPress={onOpen}>Open Drawer</Button>
      <Drawer {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        {content}
      </Drawer>
    </>
  );
};

const PlacementTemplate = (args: DrawerProps) => {
  const [placement, setPlacement] = React.useState<DrawerProps["placement"]>("right");
  const {isOpen, onOpen, onOpenChange} = useDisclosure({defaultOpen: args.defaultOpen});

  const handlePress = (placement: DrawerProps["placement"]) => {
    setPlacement(placement);
    onOpen();
  };

  const placements = ["right", "left", "top", "bottom"] as DrawerProps["placement"][];

  return (
    <>
      <div className="flex flex-wrap gap-2 px-4">
        {placements.map((placement) => (
          <Button
            key={placement}
            color="primary"
            variant="flat"
            onPress={() => handlePress(placement)}
          >
            Open Drawer {placement}
          </Button>
        ))}
      </div>
      <Drawer {...args} isOpen={isOpen} placement={placement} onOpenChange={onOpenChange}>
        {content}
      </Drawer>
    </>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const DefaultOpen = {
  render: Template,
  args: {
    ...defaultProps,
    defaultOpen: true,
  },
};

export const Placement = {
  render: PlacementTemplate,
  args: {
    ...defaultProps,
    placement: "right",
  },
};

export const DisableAnimation = {
  render: Template,
  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const CustomMotion = {
  render: Template,
  args: {
    ...defaultProps,
    motionProps: {
      variants: {
        enter: {
          opacity: 1,
          x: 0,
          duration: 0.3,
        },
        exit: {
          x: 100,
          opacity: 0,
          duration: 0.3,
        },
      },
    },
  },
};
