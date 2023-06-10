/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {modal} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Checkbox} from "@nextui-org/checkbox";
import {Link} from "@nextui-org/link";
import {MailFilledIcon, LockFilledIcon} from "@nextui-org/shared-icons";
import Lorem from "react-lorem-component";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  useDisclosure,
} from "../src";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "full"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl"],
      },
    },
    backdrop: {
      control: {
        type: "select",
        options: ["transparent", "blur", "opaque"],
      },
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
} as ComponentMeta<typeof Modal>;

const defaultProps = {
  ...modal.defaultVariants,
  disableAnimation: false,
  isDismissable: true,
  isKeyboardDismissDisabled: false,
};

const content = (
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Sign in
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
);

const Template: ComponentStory<typeof Modal> = (args: ModalProps) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure({defaultOpen: args.defaultOpen});

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        {content}
      </Modal>
    </>
  );
};

const InsideScrollTemplate: ComponentStory<typeof Modal> = (args: ModalProps) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem count={5} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const OutsideScrollTemplate: ComponentStory<typeof Modal> = (args: ModalProps) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} scrollBehavior="outside" onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem count={5} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
const OpenChangeTemplate: ComponentStory<typeof Modal> = (args: ModalProps) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem count={5} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <p className="text-sm">isOpen: {isOpen ? "true" : "false"}</p>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const DefaultOpen = Template.bind({});
DefaultOpen.args = {
  ...defaultProps,
  defaultOpen: true,
};

export const OpenChange = OpenChangeTemplate.bind({});
OpenChange.args = {
  ...defaultProps,
  scrollBehavior: "inside",
};

export const InsideScroll = InsideScrollTemplate.bind({});
InsideScroll.args = {
  ...defaultProps,
  scrollBehavior: "inside",
};

export const OutsideScroll = OutsideScrollTemplate.bind({});
OutsideScroll.args = {
  ...defaultProps,
};

export const DisableAnimation = Template.bind({});
DisableAnimation.args = {
  ...defaultProps,
  disableAnimation: true,
};

export const CustomMotion = Template.bind({});
CustomMotion.args = {
  ...defaultProps,
  motionProps: {
    variants: {
      enter: {
        opacity: 1,
        y: 0,
        duration: 0.3,
      },
      exit: {
        y: 20,
        opacity: 0,
        duration: 0.3,
      },
    },
  },
};
