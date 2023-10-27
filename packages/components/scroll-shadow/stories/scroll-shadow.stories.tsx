import React from "react";
import {Meta} from "@storybook/react";
import {scrollShadow, button} from "@nextui-org/theme";
import Lorem from "react-lorem-component";

import {
  ScrollShadow,
  ScrollShadowProps,
  ScrollShadowOrientation,
  ScrollShadowVisibility,
} from "../src";

export default {
  title: "Components/ScrollShadow",
  component: ScrollShadow,
  argTypes: {
    orientation: {
      control: {type: "select"},
      options: ["horizontal", "vertical"],
    },
    offset: {
      control: {type: "number"},
    },
    visible: {
      control: {type: "select"},
      options: ["auto", "top", "bottom", "both", "left", "right"],
    },
    children: {
      table: {
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
} as Meta<typeof ScrollShadow>;

const defaultProps = {
  ...scrollShadow.defaultVariants,
  visible: "auto",
  className: "w-[300px] h-[400px]",
  children: <Lorem count={10} />,
};

const Template = (args: ScrollShadowProps) => <ScrollShadow {...args} />;

const ControlledTemplate = ({children, ...args}: ScrollShadowProps) => {
  const [visible, setVisible] = React.useState<ScrollShadowVisibility>("top");
  const [orientation, setOrientation] = React.useState<ScrollShadowOrientation>("vertical");

  const states: Record<ScrollShadowOrientation, ScrollShadowVisibility[]> = {
    ["vertical"]: ["top", "bottom", "both"],
    ["horizontal"]: ["left", "right", "both"],
  };

  const orientationStates: ScrollShadowOrientation[] = ["vertical", "horizontal"];

  return (
    <div className="flex flex-col gap-3">
      <ScrollShadow
        {...args}
        className={orientation === "horizontal" ? "max-w-[300px] max-h-[400px]" : args.className}
        orientation={orientation}
        visible={visible}
      >
        {orientation === "horizontal" ? <div className="w-[800px]">{children}</div> : children}
      </ScrollShadow>
      <p className="text-default-500">Orientation: {orientation}</p>
      <p className="text-default-500">Visible state: {visible}</p>
      <div className="flex mt-2 gap-2">
        {orientationStates.map((o) => (
          <button
            key={o}
            className={button({
              color: orientation === o ? "primary" : "default",
            })}
            onClick={() => {
              if (o === "horizontal") {
                setVisible("left");
              } else {
                setVisible("top");
              }
              setOrientation(o);
            }}
          >
            {o}
          </button>
        ))}
      </div>
      <div className="flex mt-2 gap-2">
        {states[orientation].map((state) => (
          <button
            key={state}
            className={button({
              color: visible === state ? "primary" : "default",
            })}
            onClick={() => setVisible(state)}
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};

export const HideScrollBar = {
  render: Template,
  args: {
    ...defaultProps,
    hideScrollBar: true,
  },
};

export const CustomShadowSize = {
  render: Template,
  args: {
    ...defaultProps,
    size: 100,
  },
};

export const HorizontalOrientation = {
  render: Template,
  args: {
    ...defaultProps,
    orientation: "horizontal",
    className: "max-w-[400px] max-h-[500px]",
    children: (
      <div className="w-[800px]">
        <Lorem count={10} />,
      </div>
    ),
  },
};

export const ShadowOffset = {
  render: Template,
  args: {
    ...defaultProps,
    offset: 100,
    orientation: "horizontal",
    className: "max-w-[400px] max-h-[500px]",
    children: (
      <div className="w-[800px]">
        <Lorem count={10} />,
      </div>
    ),
  },
};
