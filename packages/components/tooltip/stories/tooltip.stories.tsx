import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {ButtonVariantProps, popover} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";

import {Tooltip, TooltipProps} from "../src";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["solid", "bordered", "light", "flat", "faded", "shadow"],
      },
    },
    color: {
      control: {
        type: "select",
        options: ["neutral", "foreground", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
      },
    },
    placement: {
      control: {
        type: "select",
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
    },
    delay: {
      control: {
        type: "number",
      },
    },
    offset: {
      control: {
        type: "number",
      },
    },
    defaultOpen: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
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
} as ComponentMeta<typeof Tooltip>;

const defaultProps = {
  ...popover.defaultVariants,
  placement: "top",
  delay: 0,
  offset: 7,
  defaultOpen: false,
  isDisabled: false,
  disableAnimation: false,
  content: "I am a tooltip",
  children: <Button>Hover me</Button>,
};

const Template: ComponentStory<typeof Tooltip> = (args: TooltipProps) => <Tooltip {...args} />;

const DelayTemplate: ComponentStory<typeof Tooltip> = (args: TooltipProps) => (
  <div className="flex gap-2">
    <Tooltip {...args} content="Tooltip 1" delay={1000}>
      <Button color="success" variant="faded">
        Delay Open (1000ms)
      </Button>
    </Tooltip>
    {/*
    // TODO: Uncomment when closeDelay is deployed in react-aria 
    // https://github.com/adobe/react-spectrum/pull/4128
    <Tooltip {...args} closeDelay={3000} content="Tooltip 2"> 
      <Button color="success" variant="faded">
        Delay Close (3000ms)
      </Button>
    </Tooltip> */}
  </div>
);

const OpenChangeTemplate: ComponentStory<typeof Tooltip> = (args: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Tooltip {...args} onOpenChange={(open) => setIsOpen(open)}>
        <Button>Hover me</Button>
      </Tooltip>
      <p className="text-sm">isOpen: {isOpen ? "true" : "false"}</p>
    </div>
  );
};

const OffsetTemplate: ComponentStory<typeof Tooltip> = (args: TooltipProps) => (
  <div className="flex gap-2">
    <Tooltip {...args} content="Tooltip 1">
      <Button color="secondary" variant="faded">
        Default offset (7)
      </Button>
    </Tooltip>
    <Tooltip {...args} content="Tooltip 2" offset={15}>
      <Button color="secondary" variant="faded">
        15 offset
      </Button>
    </Tooltip>
    <Tooltip {...args} content="Tooltip 3" offset={-7}>
      <Button color="secondary" variant="faded">
        -7 offset
      </Button>
    </Tooltip>
  </div>
);

const MultipleTemplate: ComponentStory<typeof Tooltip> = (args: TooltipProps) => (
  <div className="flex gap-2">
    <Tooltip {...args} content="Tooltip 1" delay={1000}>
      <Button>Hover me (delay 1000ms)</Button>
    </Tooltip>
    <Tooltip {...args} content="Tooltip 2">
      <Button>Then hover me</Button>
    </Tooltip>
  </div>
);

const VariantsTemplate: ComponentStory<typeof Tooltip> = (args: TooltipProps) => {
  const buttonColor = args.color as ButtonVariantProps["color"];

  return (
    <div className="flex gap-2">
      <Tooltip {...args} content="Tooltip 1" variant="solid">
        <Button color={buttonColor}>Solid</Button>
      </Tooltip>
      <Tooltip {...args} content="Tooltip 2" variant="bordered">
        <Button color={buttonColor} variant="bordered">
          Bordered
        </Button>
      </Tooltip>
      <Tooltip {...args} content="Tooltip 3" variant="light">
        <Button color={buttonColor} variant="light">
          Light
        </Button>
      </Tooltip>
      <Tooltip {...args} content="Tooltip 4" variant="flat">
        <Button color={buttonColor} variant="flat">
          Flat
        </Button>
      </Tooltip>
      <Tooltip {...args} content="Tooltip 5" variant="faded">
        <Button color={buttonColor} variant="faded">
          Faded
        </Button>
      </Tooltip>
      <Tooltip {...args} content="Tooltip 6" variant="shadow">
        <Button color={buttonColor} variant="shadow">
          Shadow
        </Button>
      </Tooltip>
    </div>
  );
};

const PlacementsTemplate: ComponentStory<typeof Tooltip> = (args: TooltipProps) => {
  return (
    <div className="inline-grid grid-cols-3 gap-4">
      <Tooltip {...args} content="Top Start" placement="top-start">
        <Button color="primary" variant="flat">
          Top Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Top">
        <Button color="primary" variant="flat">
          Top
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Top End" placement="top-end">
        <Button color="primary" variant="flat">
          Top End
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Bottom Start" placement="bottom-start">
        <Button color="primary" variant="flat">
          Bottom Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Bottom" placement="bottom">
        <Button color="primary" variant="flat">
          Bottom
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Bottom End" placement="bottom-end">
        <Button color="primary" variant="flat">
          Bottom End
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Right Start" placement="right-start">
        <Button color="primary" variant="flat">
          Right Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Right" placement="right">
        <Button color="primary" variant="flat">
          Right
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Right End" placement="right-end">
        <Button color="primary" variant="flat">
          Right End
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Left Start" placement="left-start">
        <Button color="primary" variant="flat">
          Left Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Left" placement="left">
        <Button color="primary" variant="flat">
          Left
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Left End" placement="left-end">
        <Button color="primary" variant="flat">
          Left End
        </Button>
      </Tooltip>
    </div>
  );
};

const ControlledTemplate: ComponentStory<typeof Tooltip> = (args: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    // eslint-disable-next-line no-console
    console.log("handleOpen");
    setIsOpen((prev) => !prev);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Tooltip {...args} content="Tooltip 1" isOpen={isOpen} onOpenChange={handleOpenChange}>
        <Button onPress={handleOpen}>{isOpen ? "Close" : "Open"}</Button>
      </Tooltip>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithArrow = Template.bind({});
WithArrow.args = {
  ...defaultProps,
  showArrow: true,
};

export const OpenChange = OpenChangeTemplate.bind({});
OpenChange.args = {
  ...defaultProps,
};

export const Variants = VariantsTemplate.bind({});
Variants.args = {
  ...defaultProps,
};

export const Placements = PlacementsTemplate.bind({});
Placements.args = {
  ...defaultProps,
  color: "primary",
};

export const WithOffset = OffsetTemplate.bind({});
WithOffset.args = {
  ...defaultProps,
  color: "secondary",
};

export const withDelay = DelayTemplate.bind({});
withDelay.args = {
  ...defaultProps,
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  ...defaultProps,
  shouldCloseOnInteractOutside: false,
  content: (
    <div className="px-1 py-2">
      <div className="text-sm font-bold">Custom Content</div>
      <div className="text-xs">This is a custom tooltip content</div>
    </div>
  ),
};

export const CustomMotion = Template.bind({});
CustomMotion.args = {
  ...defaultProps,
  motionProps: {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          opacity: {duration: 0.1, easings: "easeInOut"},
        },
      },
      enter: {
        opacity: 1,
        transition: {
          opacity: {easings: "easeOut", duration: 0.15},
        },
      },
    },
  },
};

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  ...defaultProps,
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  ...defaultProps,
};

export const DefaultOpen = Template.bind({});
DefaultOpen.args = {
  ...defaultProps,
  defaultOpen: true,
};

export const AlwaysOpen = Template.bind({});
AlwaysOpen.args = {
  ...defaultProps,
  isOpen: true,
  showArrow: true,
  content: (
    <div className="px-1 py-2">
      <div className="text-sm font-bold">Custom Content</div>
      <div className="text-xs">This is a custom tooltip content</div>
    </div>
  ),
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultProps,
  isDisabled: true,
};
