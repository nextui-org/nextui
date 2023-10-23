/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import {Meta} from "@storybook/react";
import {popover, ButtonVariantProps} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Card, CardHeader, CardFooter} from "@nextui-org/card";

import {Popover, PopoverTrigger, PopoverContent, PopoverProps} from "../src";

export default {
  title: "Components/Popover",
  component: Popover,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "bordered", "light", "flat", "faded", "shadow"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "foreground", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    placement: {
      control: {
        type: "select",
      },
      options: [
        "top",
        "bottom",
        "right",
        "left",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "left-start",
        "left-end",
        "right-start",
        "right-end",
      ],
    },
    backdrop: {
      control: {
        type: "select",
      },
      options: ["transparent", "blur", "opaque"],
    },
    offset: {
      control: {
        type: "number",
      },
    },
    isOpen: {
      control: {
        type: "boolean",
      },
    },
    defaultOpen: {
      control: {
        type: "boolean",
      },
    },
    showArrow: {
      control: {
        type: "boolean",
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
} as Meta<typeof Popover>;

const defaultProps = {
  ...popover.defaultVariants,
  placement: "top",
  offset: 7,
  defaultOpen: false,
  disableAnimation: false,
};

const content = (
  <PopoverContent>
    <div className="px-1 py-2">
      <div className="text-sm font-bold">Popover Content</div>
      <div className="text-xs">This is a content of the popover</div>
    </div>
  </PopoverContent>
);

const Template = (args: PopoverProps) => {
  return (
    <Popover {...args}>
      <PopoverTrigger>
        <Button disableAnimation={!!args.disableAnimation}>Open Popover</Button>
      </PopoverTrigger>
      {content}
    </Popover>
  );
};

const WithTitlePropsTemplate = (args: PopoverProps) => {
  return (
    <Popover {...args}>
      <PopoverTrigger>
        <Button disableAnimation={!!args.disableAnimation}>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2">
            <h3 className="text-sm font-bold" {...titleProps}>
              Popover Content
            </h3>
            <div className="text-xs">This is a content of the popover</div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

const OpenChangeTemplate = (args: PopoverProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Popover
        {...args}
        style={{
          zIndex: 10,
        }}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-sm font-bold">Popover Content</div>
            <div className="text-xs">This is a content of the popover</div>
          </div>
        </PopoverContent>
      </Popover>
      <p className="text-sm">isOpen: {isOpen ? "true" : "false"}</p>
    </div>
  );
};

const PlacementsTemplate = (args: PopoverProps) => {
  const buttonColor = args.color as ButtonVariantProps["color"];

  return (
    <div className="inline-grid grid-cols-3 gap-4">
      <Popover {...args} placement="top-start">
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Top Start
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args}>
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Top
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="top-end">
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Top End
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="bottom-start">
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Bottom Start
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="bottom">
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Bottom
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="bottom-end">
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Bottom End
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="right-start">
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Right Start
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="right">
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Right
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="right-end">
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Right End
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="left-start">
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Left Start
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="left">
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Left
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>

      <Popover {...args} placement="left-end">
        <PopoverTrigger>
          <Button color={buttonColor} variant="flat">
            Left End
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>
    </div>
  );
};

const OffsetTemplate = (args: PopoverProps) => (
  <div className="flex gap-2">
    <Popover {...args}>
      <PopoverTrigger>
        <Button color="warning" variant="faded">
          Default offset (7)
        </Button>
      </PopoverTrigger>
      {content}
    </Popover>
    <Popover {...args} offset={15}>
      <PopoverTrigger>
        <Button color="warning" variant="faded">
          15 offset
        </Button>
      </PopoverTrigger>
      {content}
    </Popover>
    <Popover {...args} offset={-7}>
      <PopoverTrigger>
        <Button color="warning" variant="faded">
          -7 offset
        </Button>
      </PopoverTrigger>
      {content}
    </Popover>
  </div>
);

const WithFormTemplate = (args: PopoverProps) => (
  <Popover {...args}>
    <PopoverTrigger>
      <Button color="primary">Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p className="text-sm font-bold text-foreground" {...titleProps}>
            Dimensions
          </p>
          <div className="mt-2 flex flex-col gap-2 w-full">
            <Input autoFocus defaultValue="100%" label="Width" size="sm" variant="bordered" />
            <Input defaultValue="300px" label="Max. width" size="sm" variant="bordered" />
            <Input defaultValue="24px" label="Height" size="sm" variant="bordered" />
            <Input defaultValue="30px" label="Max. height" size="sm" variant="bordered" />
          </div>
        </div>
      )}
    </PopoverContent>
  </Popover>
);

const BackdropsTemplate = (args: PopoverProps) => {
  const backdrops: PopoverProps["backdrop"][] = ["opaque", "blur", "transparent"];

  const content = (
    <PopoverContent className="w-[240px]">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground" {...titleProps}>
            Dimensions
          </p>
          <div className="mt-2 flex flex-col gap-2 w-full">
            <Input defaultValue="100%" label="Width" size="sm" variant="bordered" />
            <Input defaultValue="300px" label="Max. width" size="sm" variant="bordered" />
            <Input defaultValue="24px" label="Height" size="sm" variant="bordered" />
            <Input defaultValue="30px" label="Max. height" size="sm" variant="bordered" />
          </div>
        </div>
      )}
    </PopoverContent>
  );

  return (
    <div className="flex flex-wrap gap-4">
      {backdrops.map((backdrop) => (
        <Popover
          key={backdrop}
          showArrow
          offset={10}
          placement="bottom"
          {...args}
          backdrop={backdrop}
        >
          <PopoverTrigger>
            <Button className="capitalize" color="warning" variant="flat">
              {backdrop}
            </Button>
          </PopoverTrigger>
          {content}
        </Popover>
      ))}
    </div>
  );
};

const WithBackdropTemplate = (args: PopoverProps) => (
  <Card isFooterBlurred className="w-[420px] h-[400px] col-span-12 sm:col-span-7">
    <CardHeader className="absolute z-10 top-1 flex-col items-start">
      <p className="text-xs text-white/60 uppercase font-bold">Your day your way</p>
      <h4 className="text-white/90 font-medium text-2xl">Your checklist for better sleep</h4>
    </CardHeader>
    <img
      alt="Relaxing app background"
      className="w-full h-full object-cover"
      src="https://nextui.org/images/card-example-5.jpeg"
    />
    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t border-default-600 dark:border-default-100">
      <div className="flex flex-grow gap-2 items-center">
        <img
          alt="Breathing app icon"
          className="rounded-full w-10 h-11 bg-black"
          src="https://nextui.org/images/breathing-app-icon.jpeg"
        />
        <div className="flex flex-col">
          <p className="text-xs text-white/60">Breathing App</p>
          <p className="text-xs text-white/60">Get a good night&apos;s sleep.</p>
        </div>
      </div>
      <Popover {...args}>
        <PopoverTrigger>
          <Button color="primary" radius="full">
            Open Popover
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p className="text-sm font-bold text-foreground" {...titleProps}>
                Dimensions
              </p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Input defaultValue="100%" label="Width" size="sm" variant="bordered" />
                <Input defaultValue="300px" label="Max. width" size="sm" variant="bordered" />
                <Input defaultValue="24px" label="Height" size="sm" variant="bordered" />
                <Input defaultValue="30px" label="Max. height" size="sm" variant="bordered" />
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </CardFooter>
  </Card>
);

export const Default = {
  render: Template,

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

export const WithoutScaleTrigger = {
  render: Template,

  args: {
    ...defaultProps,
    triggerScaleOnOpen: false,
  },
};

export const WithArrow = {
  render: Template,

  args: {
    ...defaultProps,
    showArrow: true,
  },
};

export const OpenChange = {
  render: OpenChangeTemplate,

  args: {
    ...defaultProps,
  },
};

export const Placements = {
  render: PlacementsTemplate,

  args: {
    ...defaultProps,
    color: "secondary",
  },
};

export const WithOffset = {
  render: OffsetTemplate,

  args: {
    ...defaultProps,
    color: "warning",
  },
};

export const WithTitleProps = {
  render: WithTitlePropsTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithForm = {
  render: WithFormTemplate,

  args: {
    ...defaultProps,
    showArrow: true,
    offset: 10,
    placement: "top",
    className: "w-[280px] bg-content1",
  },
};

export const Backdrops = {
  render: BackdropsTemplate,

  args: {
    ...defaultProps,
    showArrow: true,
    offset: 10,
    placement: "bottom",
  },
};

export const WithBackdrop = {
  render: WithBackdropTemplate,

  args: {
    ...defaultProps,
    showArrow: true,
    offset: 10,
    placement: "left",
    backdrop: "blur",
  },
};

export const CustomMotion = {
  render: Template,

  args: {
    ...defaultProps,
    placement: "bottom",
    motionProps: {
      variants: {
        enter: {
          opacity: 1,
          duration: 0.2,
        },
        exit: {
          opacity: 0,
          duration: 0.1,
        },
      },
    },
  },
};
