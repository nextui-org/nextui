import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useState} from "react";

import {ToggleButton} from "./index";

export default {
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "ghost"],
    },
  },
  component: ToggleButton,
  parameters: {
    layout: "centered",
  },
  title: "Components/Buttons/ToggleButton",
} as Meta<typeof ToggleButton>;

const defaultArgs: ToggleButton["RootProps"] = {
  size: "md",
};

const Template = ({isDisabled, size, variant}: ToggleButton["RootProps"]) => (
  <div className="flex gap-3">
    <ToggleButton isDisabled={isDisabled} size={size} variant={variant}>
      <Icon icon="gravity-ui:heart" />
      Like
    </ToggleButton>
    <ToggleButton isDisabled={isDisabled} size={size} variant={variant ?? "ghost"}>
      <Icon icon="gravity-ui:heart" />
      Like
    </ToggleButton>
  </div>
);

const VariantsTemplate = ({isDisabled, size}: ToggleButton["RootProps"]) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted">Default</p>
      <div className="flex gap-3">
        <ToggleButton isDisabled={isDisabled} size={size}>
          <Icon icon="gravity-ui:heart" />
          Like
        </ToggleButton>
        <ToggleButton defaultSelected isDisabled={isDisabled} size={size}>
          <Icon icon="gravity-ui:heart-fill" />
          Like
        </ToggleButton>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted">Ghost</p>
      <div className="flex gap-3">
        <ToggleButton isDisabled={isDisabled} size={size} variant="ghost">
          <Icon icon="gravity-ui:heart" />
          Like
        </ToggleButton>
        <ToggleButton defaultSelected isDisabled={isDisabled} size={size} variant="ghost">
          <Icon icon="gravity-ui:heart-fill" />
          Like
        </ToggleButton>
      </div>
    </div>
  </div>
);

const SizesTemplate = () => (
  <div className="flex flex-col gap-6">
    <div className="flex items-center gap-3">
      <ToggleButton size="sm">
        <Icon icon="gravity-ui:heart" />
        Small
      </ToggleButton>
      <ToggleButton size="md">
        <Icon icon="gravity-ui:heart" />
        Medium
      </ToggleButton>
      <ToggleButton size="lg">
        <Icon icon="gravity-ui:heart" />
        Large
      </ToggleButton>
    </div>
    <div className="flex items-center gap-3">
      <ToggleButton isIconOnly aria-label="Like" size="sm">
        <Icon icon="gravity-ui:heart" />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Like" size="md">
        <Icon icon="gravity-ui:heart" />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Like" size="lg">
        <Icon icon="gravity-ui:heart" />
      </ToggleButton>
    </div>
  </div>
);

const IconOnlyTemplate = ({isDisabled, size, variant}: ToggleButton["RootProps"]) => (
  <div className="flex gap-3">
    <ToggleButton
      isIconOnly
      aria-label="Like"
      isDisabled={isDisabled}
      size={size}
      variant={variant}
    >
      <Icon icon="gravity-ui:heart" />
    </ToggleButton>
    <ToggleButton
      isIconOnly
      aria-label="Bookmark"
      isDisabled={isDisabled}
      size={size}
      variant={variant ?? "ghost"}
    >
      <Icon icon="gravity-ui:bookmark" />
    </ToggleButton>
  </div>
);

const ControlledTemplate = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <ToggleButton isSelected={isSelected} onChange={setIsSelected}>
          {({isSelected: selected}) => (
            <>
              <Icon icon={selected ? "gravity-ui:heart-fill" : "gravity-ui:heart"} />
              {selected ? "Liked" : "Like"}
            </>
          )}
        </ToggleButton>
      </div>
      <p className="text-sm text-muted">
        Status: <span className="font-medium">{isSelected ? "Selected" : "Not selected"}</span>
      </p>
    </div>
  );
};

const DisabledTemplate = () => (
  <div className="flex gap-3">
    <ToggleButton isDisabled>
      <Icon icon="gravity-ui:heart" />
      Like
    </ToggleButton>
    <ToggleButton defaultSelected isDisabled>
      <Icon icon="gravity-ui:heart-fill" />
      Like
    </ToggleButton>
  </div>
);

const RealWorldTemplate = () => {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [pinned, setPinned] = useState(true);

  return (
    <div className="flex items-center gap-2">
      <ToggleButton isSelected={liked} size="sm" onChange={setLiked}>
        {({isSelected}) => (
          <>
            <Icon icon={isSelected ? "gravity-ui:heart-fill" : "gravity-ui:heart"} />
            Like
          </>
        )}
      </ToggleButton>
      <ToggleButton isSelected={bookmarked} size="sm" variant="ghost" onChange={setBookmarked}>
        {({isSelected}) => (
          <>
            <Icon icon={isSelected ? "gravity-ui:bookmark-fill" : "gravity-ui:bookmark"} />
            Save
          </>
        )}
      </ToggleButton>
      <ToggleButton
        isIconOnly
        aria-label="Pin"
        isSelected={pinned}
        size="sm"
        variant="ghost"
        onChange={setPinned}
      >
        {({isSelected}) => <Icon icon={isSelected ? "gravity-ui:pin-fill" : "gravity-ui:pin"} />}
      </ToggleButton>
    </div>
  );
};

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const Variants = {
  args: defaultArgs,
  render: VariantsTemplate,
};

export const Sizes = {
  render: SizesTemplate,
};

export const IconOnly = {
  args: defaultArgs,
  render: IconOnlyTemplate,
};

export const Controlled = {
  render: ControlledTemplate,
};

export const Disabled = {
  render: DisabledTemplate,
};

export const RealWorld = {
  render: RealWorldTemplate,
};
