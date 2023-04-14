import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {modal} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";

import {Modal, ModalContent, ModalTrigger, ModalProps} from "../src";

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
};

const Template: ComponentStory<typeof Modal> = (args: ModalProps) => {
  return (
    <Modal {...args}>
      <ModalTrigger>
        <Button disableAnimation={!!args.disableAnimation}>Open popover</Button>
      </ModalTrigger>
      <ModalContent>
        <div className="px-1 py-2">
          <div className="text-sm font-bold">Modal Content</div>
          <div className="text-xs">This is a content of the modal</div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
