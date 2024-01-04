/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import {Meta} from "@storybook/react";
import {drawer} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Checkbox} from "@nextui-org/checkbox";
import {Link} from "@nextui-org/link";
import {MailFilledIcon, LockFilledIcon} from "@nextui-org/shared-icons";
import Lorem from "react-lorem-component";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerProps,
  useDisclosure,
} from "../src";

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
    children: {
      control: {
        disable: true,
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
} as Meta<typeof Drawer>;

const defaultProps = {
  ...drawer.defaultVariants,
  disableAnimation: false,
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

const InsideScrollTemplate = (args: DrawerProps) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Drawer</Button>
      <Drawer {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerBody>
            <Lorem count={5} />
          </DrawerBody>
          <DrawerFooter>
            <Button onPress={onClose}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const OutsideScrollTemplate = (args: DrawerProps) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Drawer</Button>
      <Drawer {...args} isOpen={isOpen} scrollBehavior="outside" onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerBody>
            <Lorem count={5} />
          </DrawerBody>
          <DrawerFooter>
            <Button onPress={onClose}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
const OpenChangeTemplate = (args: DrawerProps) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen}>Open Drawer</Button>
      <Drawer {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerBody>
            <Lorem count={5} />
          </DrawerBody>
          <DrawerFooter>
            <Button onPress={onClose}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <p className="text-sm">isOpen: {isOpen ? "true" : "false"}</p>
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const PlacementTop = {
  render: Template,

  args: {
    ...defaultProps,
    placement: "top",
  },
};

export const PlacementLeft = {
  render: Template,

  args: {
    ...defaultProps,
    placement: "left",
  },
};

export const PlacementBottom = {
  render: Template,

  args: {
    ...defaultProps,
    placement: "bottom",
  },
};

export const DefaultOpen = {
  render: Template,

  args: {
    ...defaultProps,
    defaultOpen: true,
  },
};

export const OpenChange = {
  render: OpenChangeTemplate,

  args: {
    ...defaultProps,
    scrollBehavior: "inside",
  },
};

export const InsideScroll = {
  render: InsideScrollTemplate,

  args: {
    ...defaultProps,
    scrollBehavior: "inside",
  },
};

export const OutsideScroll = {
  render: OutsideScrollTemplate,

  args: {
    ...defaultProps,
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
          duration: 0.3,
        },
        exit: {
          opacity: 0,
          duration: 0.3,
        },
      },
    },
  },
};
