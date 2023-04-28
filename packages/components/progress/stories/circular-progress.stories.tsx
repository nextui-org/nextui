import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {circularProgress} from "@nextui-org/theme";
import {Card, CardBody, CardFooter} from "@nextui-org/card";
import {Chip} from "@nextui-org/chip";

import {CircularProgress, CircularProgressProps} from "../src";

export default {
  title: "Components/CircularProgress",
  component: CircularProgress,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
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
} as ComponentMeta<typeof CircularProgress>;

const defaultProps = {
  ...circularProgress.defaultVariants,
};

const Template: ComponentStory<typeof CircularProgress> = (args: CircularProgressProps) => (
  <CircularProgress {...args} />
);

const IntervalTemplate: ComponentStory<typeof CircularProgress> = (args: CircularProgressProps) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <CircularProgress {...args} value={value} />;
};

const CustomClassnamesTemplate: ComponentStory<typeof CircularProgress> = (
  args: CircularProgressProps,
) => (
  <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
    <CardBody className="justify-center items-center pb-0">
      <CircularProgress
        {...args}
        classNames={{
          svg: "w-36 h-36 drop-shadow-md",
          circle: "stroke-white",
          track: "stroke-white/10",
          value: "text-3xl font-semibold text-white",
        }}
        strokeWidth={4}
      />
    </CardBody>
    <CardFooter className="justify-center items-center pt-0">
      <Chip
        classNames={{
          base: "border-1 border-white/30",
          content: "text-white/80 text-sm font-semibold",
        }}
        variant="bordered"
      >
        2800 Data points
      </Chip>
    </CardFooter>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
  "aria-label": "Loading...",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...defaultProps,
  label: "Loading...",
};

export const WithValueLabel = IntervalTemplate.bind({});
WithValueLabel.args = {
  ...defaultProps,
  size: "lg",
  value: 70,
  color: "secondary",
  showValueLabel: true,
};

export const WithValueFormatting = Template.bind({});
WithValueFormatting.args = {
  ...defaultProps,
  label: "Loading...",
  size: "xl",
  value: 70,
  color: "warning",
  showValueLabel: true,
  formatOptions: {style: "unit", unit: "kilometer"},
};

export const CustomClassnames = CustomClassnamesTemplate.bind({});
CustomClassnames.args = {
  ...defaultProps,
  size: "xl",
  strokeWidth: 4,
  value: 70,
  showValueLabel: true,
};
