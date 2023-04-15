/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {link, modal} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Checkbox} from "@nextui-org/checkbox";
import {MailFilledIcon, LockFilledIcon} from "@nextui-org/shared-icons";
import Lorem from "react-lorem-component";

import {
  Modal,
  ModalContent,
  ModalTrigger,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "../src";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "full", "prose"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl"],
      },
    },
    backdropVariant: {
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
              <MailFilledIcon className="text-2xl text-neutral-400 pointer-events-none flex-shrink-0" />
            }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            endContent={
              <LockFilledIcon className="text-2xl text-neutral-400 pointer-events-none flex-shrink-0" />
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
            <a className={link({size: "sm"})} href="#">
              Forgot password?
            </a>
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

const Template: ComponentStory<typeof Modal> = (args: ModalProps) => (
  <Modal {...args}>
    <ModalTrigger>
      <Button disableAnimation={!!args.disableAnimation}>Open Modal</Button>
    </ModalTrigger>
    {content}
  </Modal>
);

const InsideScrollTemplate: ComponentStory<typeof Modal> = (args: ModalProps) => (
  <Modal {...args}>
    <ModalTrigger>
      <Button disableAnimation={!!args.disableAnimation}>Open Modal</Button>
    </ModalTrigger>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem size={5} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

const OutsideScrollTemplate: ComponentStory<typeof Modal> = (args: ModalProps) => (
  <Modal {...args} scrollBehavior="outside">
    <ModalTrigger>
      <Button disableAnimation={!!args.disableAnimation}>Open Modal</Button>
    </ModalTrigger>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Lorem size={5} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const InsideScroll = InsideScrollTemplate.bind({});
InsideScroll.args = {
  ...defaultProps,
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
        duration: 0.3,
      },
      exit: {
        opacity: 0,
        duration: 0.3,
      },
    },
  },
};
