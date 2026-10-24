import type {ScrollShadowVisibility} from ".";
import type {Meta, StoryObj} from "@storybook/react";

import React, {useState} from "react";

import {Button} from "../button";
import {Card} from "../card";

import {ScrollShadow} from ".";

const meta: Meta<typeof ScrollShadow> = {
  title: "Components/Utilities/ScrollShadow",
  component: ScrollShadow,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ScrollShadow>;

const LoremContent = () => (
  <div className="space-y-4">
    {Array.from({length: 10}).map((_, idx) => (
      <p key={`scroll-shadow-lorem-content-${idx}`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
        hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam. Morbi
        accumsan cursus enim, sed ultricies sapien.
      </p>
    ))}
  </div>
);

const LoremCards = () => {
  const images = [
    "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/robot1.jpeg",
    "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg",
    "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg",
  ];

  const getRandomImage = (idx: number) => {
    return images[idx % images.length];
  };

  return (
    <div className="flex flex-row gap-4">
      {Array.from({length: 10}).map((_, idx) => (
        <Card
          key={`scroll-shadow-lorem-cards-${idx}`}
          className="flex min-w-[200px] flex-row gap-3 p-1"
          variant="transparent"
        >
          <img
            alt="Lorem Card"
            className="aspect-square h-16 w-16 shrink-0 rounded-xl object-cover select-none sm:h-20 sm:w-20"
            loading="lazy"
            src={getRandomImage(idx)}
          />
          <div className="flex flex-1 flex-col justify-center gap-1">
            <Card.Title className="text-sm">Bridging the Future</Card.Title>
            <Card.Description className="text-xs">Today, 6:30 PM</Card.Description>
          </div>
        </Card>
      ))}
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <div className="w-full p-0 sm:max-w-sm">
      <ScrollShadow className="max-h-[240px] p-4" tabIndex={0} {...args}>
        <LoremContent />
      </ScrollShadow>
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="mb-2 text-sm font-semibold">Fade (Opacity Effect)</h4>
        <div className="w-full p-0 sm:max-w-sm">
          <ScrollShadow className="max-h-[240px] p-4" tabIndex={0} {...args}>
            <LoremContent />
          </ScrollShadow>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold">Blur (Blur Effect)</h4>
        <div className="w-full p-0 sm:max-w-sm">
          <ScrollShadow className="max-h-[240px] p-4" tabIndex={0} {...args}>
            <LoremContent />
          </ScrollShadow>
        </div>
      </div>
    </div>
  ),
};

export const Orientation: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="mb-2 text-sm font-semibold">Vertical</h4>
        <Card className="w-full p-0 sm:max-w-sm">
          <ScrollShadow className="max-h-[240px] p-4" orientation="vertical" tabIndex={0} {...args}>
            <LoremContent />
          </ScrollShadow>
        </Card>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold">Horizontal</h4>
        <Card className="w-full p-0 sm:max-w-sm">
          <ScrollShadow className="p-4" orientation="horizontal" tabIndex={0} {...args}>
            <LoremCards />
          </ScrollShadow>
        </Card>
      </div>
    </div>
  ),
};

export const HideScrollBar: Story = {
  render: (args) => (
    <div className="w-full p-0 sm:max-w-sm">
      <ScrollShadow hideScrollBar className="max-h-[240px] p-4" tabIndex={0} {...args}>
        <LoremContent />
      </ScrollShadow>
    </div>
  ),
};

export const CustomSize: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="mb-2 text-sm font-semibold">Small Shadow (20px)</h4>
        <div className="w-full p-0 sm:max-w-sm">
          <ScrollShadow className="max-h-[200px] p-4" size={20} tabIndex={0} {...args}>
            <LoremContent />
          </ScrollShadow>
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-semibold">Default Shadow (40px)</h4>
        <div className="w-full p-0 sm:max-w-sm">
          <ScrollShadow className="max-h-[200px] p-4" tabIndex={0} {...args}>
            <LoremContent />
          </ScrollShadow>
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-semibold">Large Shadow (80px)</h4>
        <div className="w-full p-0 sm:max-w-sm">
          <ScrollShadow className="max-h-[200px] p-4" size={80} tabIndex={0} {...args}>
            <LoremContent />
          </ScrollShadow>
        </div>
      </div>
    </div>
  ),
};

export const VisibilityChange: Story = {
  render: (args) => {
    const [verticalState, setVerticalState] = useState<ScrollShadowVisibility>("none");
    const [horizontalState, setHorizontalState] = useState<ScrollShadowVisibility>("none");

    return (
      <>
        <div className="mb-4 flex flex-col gap-4">
          <div className="rounded bg-default p-4">
            <p className="text-sm font-semibold">Vertical Shadow State: {verticalState}</p>
          </div>
          <div className="w-full p-0 sm:max-w-sm">
            <ScrollShadow
              className="max-h-[240px] p-4"
              orientation="vertical"
              tabIndex={0}
              onVisibilityChange={(visibility) => setVerticalState(visibility)}
              {...args}
            >
              <LoremContent />
            </ScrollShadow>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded bg-default p-4">
            <p className="text-sm font-semibold">Horizontal Shadow State: {horizontalState}</p>
          </div>
          <div className="w-full p-0 sm:max-w-sm">
            <ScrollShadow
              className="p-4"
              orientation="horizontal"
              tabIndex={0}
              onVisibilityChange={(visibility) => setHorizontalState(visibility)}
              {...args}
            >
              <LoremCards />
            </ScrollShadow>
          </div>
        </div>
      </>
    );
  },
};

export const WithCard: Story = {
  render: (args) => (
    <Card className="max-w-[400px]">
      <Card.Header>
        <Card.Title>Terms and Conditions</Card.Title>
        <Card.Description>Please review before proceeding</Card.Description>
      </Card.Header>
      <Card.Content className="p-0">
        <ScrollShadow className="h-[300px] px-4" size={80} tabIndex={0} {...args}>
          <LoremContent />
        </ScrollShadow>
      </Card.Content>
      <Card.Footer className="mt-4 flex flex-row gap-2">
        <Button className="w-full" variant="secondary">
          Cancel
        </Button>
        <Button className="w-full">Accept</Button>
      </Card.Footer>
    </Card>
  ),
};
