import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Label} from "../label";

import {Slider} from "./index";

const meta: Meta<typeof Slider> = {
  argTypes: {
    isDisabled: {
      control: {type: "boolean"},
    },
    orientation: {
      control: {type: "select"},
      options: ["horizontal", "vertical"],
    },
  },
  component: Slider,
  decorators: [
    (Story) => (
      <div className="w-96 p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Controls/Slider",
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => {
    return (
      <Slider defaultValue={30} {...args}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    );
  },
};

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <div className="h-96 p-8">
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    return (
      <Slider defaultValue={30} orientation="vertical" {...args}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Slider isDisabled defaultValue={30} {...args}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    );
  },
};

export const Range: Story = {
  render: (args) => {
    return (
      <Slider
        defaultValue={[100, 500]}
        formatOptions={{currency: "USD", style: "currency"}}
        maxValue={1000}
        minValue={0}
        step={50}
        {...args}
      >
        <Label>Price Range</Label>
        <Slider.Output />
        <Slider.Track>
          {({state}) => (
            <>
              <Slider.Fill />
              {state.values.map((_, i) => (
                <Slider.Thumb key={i} index={i} />
              ))}
            </>
          )}
        </Slider.Track>
      </Slider>
    );
  },
};

export const WithSteps: Story = {
  render: (args) => (
    <Slider defaultValue={40} step={10} {...args}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Steps />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  ),
};

export const WithMarks: Story = {
  render: (args) => (
    <Slider defaultValue={40} {...args}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
      <Slider.Marks>
        <Slider.Mark value={0}>Off</Slider.Mark>
        <Slider.Mark value={20}>Quiet</Slider.Mark>
        <Slider.Mark value={60}>Loud</Slider.Mark>
        <Slider.Mark value={100}>Max</Slider.Mark>
      </Slider.Marks>
    </Slider>
  ),
};

export const WithStepsAndMarks: Story = {
  render: (args) => (
    <Slider defaultValue={0.4} maxValue={1} step={0.1} {...args}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        {({state}) => (
          <>
            <Slider.Fill />
            <Slider.Steps />
            {state.values.map((_, index) => (
              <Slider.Thumb key={index} index={index} />
            ))}
          </>
        )}
      </Slider.Track>
      <Slider.Marks>
        <Slider.Mark value={0} />
        <Slider.Mark value={0.5} />
        <Slider.Mark value={1} />
      </Slider.Marks>
    </Slider>
  ),
};

export const RangeWithStepsAndMarks: Story = {
  ...WithStepsAndMarks,
  args: {defaultValue: [0.2, 0.8]},
};

export const VerticalWithStepsAndMarks: Story = {
  ...WithStepsAndMarks,
  args: {orientation: "vertical"},
  decorators: [
    (Story) => (
      <div className="h-72">
        <Story />
      </div>
    ),
  ],
};
