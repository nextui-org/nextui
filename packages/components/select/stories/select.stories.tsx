/* eslint-disable react/display-name */
import React, {ChangeEvent} from "react";
import {Meta} from "@storybook/react";
import {select, button} from "@nextui-org/theme";
import {PetBoldIcon, SelectorIcon} from "@nextui-org/shared-icons";
import {Avatar} from "@nextui-org/avatar";
import {Chip} from "@nextui-org/chip";
import {Selection} from "@react-types/shared";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {
  Pokemon,
  usePokemonList,
  animalsData,
  usersData,
  Animal,
  User,
} from "@nextui-org/stories-utils";

import {Select, SelectedItems, SelectItem, SelectProps, SelectSection} from "../src";

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-start justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Select>;

const defaultProps = {
  ...select.defaultVariants,
};

const items = animalsData.map((item) => (
  <SelectItem key={item.value} value={item.value}>
    {item.label}
  </SelectItem>
));

const Template = ({color, variant, ...args}: SelectProps) => (
  <Select className="max-w-xs" color={color} label="Favorite Animal" variant={variant} {...args}>
    {items}
  </Select>
);

const DynamicTemplate = ({color, variant, ...args}: SelectProps<Animal>) => (
  <Select
    className="max-w-xs"
    color={color}
    items={animalsData}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
  </Select>
);

const DynamicTemplateWithDescriptions = ({color, variant, ...args}: SelectProps<Animal>) => (
  <Select
    className="max-w-xs"
    color={color}
    items={animalsData}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {(item) => (
      <SelectItem key={item.value} description={item.description}>
        {item.label}
      </SelectItem>
    )}
  </Select>
);

const ItemStartContentTemplate = ({color, variant, ...args}: SelectProps<Animal>) => (
  <Select className="max-w-xs" color={color} label="Select country" variant={variant} {...args}>
    <SelectItem
      key="argentina"
      startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
    >
      Argentina
    </SelectItem>
    <SelectItem
      key="venezuela"
      startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}
    >
      Venezuela
    </SelectItem>
    <SelectItem
      key="brazil"
      startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
    >
      Brazil
    </SelectItem>
    <SelectItem
      key="switzerland"
      startContent={
        <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
      }
    >
      Switzerland
    </SelectItem>
    <SelectItem
      key="germany"
      startContent={<Avatar alt="Germany" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
    >
      Germany
    </SelectItem>
    <SelectItem
      key="spain"
      startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
    >
      Spain
    </SelectItem>
    <SelectItem
      key="france"
      startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
    >
      France
    </SelectItem>
    <SelectItem
      key="italy"
      startContent={<Avatar alt="Italy" className="w-6 h-6" src="https://flagcdn.com/it.svg" />}
    >
      Italy
    </SelectItem>
    <SelectItem
      key="mexico"
      startContent={<Avatar alt="Mexico" className="w-6 h-6" src="https://flagcdn.com/mx.svg" />}
    >
      Mexico
    </SelectItem>
  </Select>
);

const ControlledTemplate = ({color, variant, ...args}: SelectProps<Animal>) => {
  const [value, setValue] = React.useState<Selection>(new Set(["cat"]));

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(new Set([e.target.value]));
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        fullWidth
        color={color}
        items={animalsData}
        label="Favorite Animal"
        selectedKeys={value}
        variant={variant}
        onChange={handleSelectionChange}
        {...args}
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>
      <p className="text-default-500">Selected: {value}</p>
    </div>
  );
};

const ControlledOpenTemplate = ({color, variant, ...args}: SelectProps<Animal>) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex w-full max-w-xs items-center gap-2">
      <Select
        className="max-w-xs"
        color={color}
        isOpen={isOpen}
        label="Favorite Animal"
        variant={variant}
        {...args}
      >
        {items}
      </Select>
      <button
        className={button({className: "max-w-fit"})}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Open"}
      </button>
    </div>
  );
};

const ControlledMultipleTemplate = ({color, variant, ...args}: SelectProps<Animal>) => {
  const [values, setValues] = React.useState<Selection>(new Set(["cat", "dog"]));

  const handleSelectionChange = (items: Selection) => {
    setValues(items);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        fullWidth
        color={color}
        items={animalsData}
        label="Favorite Animal"
        selectedKeys={values}
        selectionMode="multiple"
        variant={variant}
        onSelectionChange={handleSelectionChange}
        {...args}
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>
      <p className="text-default-500">Selected: {[...values].join(", ")}</p>
    </div>
  );
};

const RequiredTemplate = ({color, variant, ...args}: SelectProps) => {
  return (
    <form
      className="w-full max-w-xs items-end flex flex-col gap-4"
      onSubmit={(e) => {
        alert(`Submitted value: ${e.target["favorite-animal"].value}`);
        e.preventDefault();
      }}
    >
      <Select
        isRequired
        color={color}
        label="Favorite Animal"
        name="favorite-animal"
        variant={variant}
        {...args}
      >
        {items}
      </Select>
      <button className={button({className: "max-w-fit"})} type="submit">
        Submit
      </button>
    </form>
  );
};

const MirrorTemplate = ({color, variant, ...args}: SelectProps) => (
  <div className="w-full max-w-xl flex flex-row gap-4">
    <Select className="max-w-xs" color={color} label="Select an animal" variant={variant} {...args}>
      {items}
    </Select>
    <Select
      className="max-w-xs"
      color={color}
      label="Favorite Animal"
      placeholder="Select an animal"
      variant={variant}
      {...args}
    >
      {items}
    </Select>
  </div>
);

const LabelPlacementTemplate = ({color, variant, ...args}: SelectProps) => (
  <div className="w-full flex flex-col items-center gap-12">
    <div className="w-full max-w-2xl flex flex-col gap-3">
      <h3>Without placeholder</h3>
      <div className="w-full flex flex-row items-end gap-4">
        <Select color={color} label="Select an animal" variant={variant} {...args}>
          {items}
        </Select>
        <Select
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Select>
        <Select
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Select>
      </div>
    </div>
    <div className="w-full max-w-2xl flex flex-col gap-3">
      <h3>With placeholder</h3>
      <div className="w-full flex flex-row items-end gap-4">
        <Select
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
        <Select
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Select>
        <Select
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Select>
      </div>
    </div>
  </div>
);

const StartContentTemplate = ({color, variant, ...args}: SelectProps) => (
  <Select
    className="max-w-xs"
    color={color}
    defaultSelectedKeys={["cat"]}
    label="Favorite Animal"
    startContent={<PetBoldIcon />}
    variant={variant}
    {...args}
  >
    {items}
  </Select>
);

const CustomItemsTemplate = ({color, variant, ...args}: SelectProps<User>) => (
  <div className="w-full justify-center flex gap-2">
    <Select
      className="max-w-xs mt-8"
      color={color}
      items={usersData}
      label="Assigned to"
      variant={variant}
      {...args}
    >
      {(item) => (
        <SelectItem key={item.id} textValue={item.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-tiny text-default-400">{item.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
    <Select
      className="max-w-xs mt-8"
      color={color}
      items={usersData}
      label="Assigned to"
      placeholder="Assigned to"
      variant={variant}
      {...args}
    >
      {(item) => (
        <SelectItem key={item.id} textValue={item.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-tiny text-default-400">{item.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  </div>
);

const WithSectionsTemplate = ({color, variant, ...args}: SelectProps<User>) => (
  <Select className="max-w-xs" color={color} label="Favorite Animal" variant={variant} {...args}>
    <SelectSection showDivider title="Mammals">
      <SelectItem key="Lion">Lion</SelectItem>
      <SelectItem key="Tiger">Tiger</SelectItem>
      <SelectItem key="Elephant">Elephant</SelectItem>
      <SelectItem key="Kangaroo">Kangaroo</SelectItem>
      <SelectItem key="Panda">Panda</SelectItem>
      <SelectItem key="Giraffe">Giraffe</SelectItem>
      <SelectItem key="Zebra">Zebra</SelectItem>
      <SelectItem key="Cheetah">Cheetah</SelectItem>
    </SelectSection>
    <SelectSection title="Birds">
      <SelectItem key="Eagle">Eagle</SelectItem>
      <SelectItem key="Parrot">Parrot</SelectItem>
      <SelectItem key="Penguin">Penguin</SelectItem>
      <SelectItem key="Ostrich">Ostrich</SelectItem>
      <SelectItem key="Peacock">Peacock</SelectItem>
      <SelectItem key="Swan">Swan</SelectItem>
      <SelectItem key="Falcon">Falcon</SelectItem>
      <SelectItem key="Flamingo">Flamingo</SelectItem>
    </SelectSection>
  </Select>
);

const WithCustomSectionsStylesTemplate = ({color, variant, ...args}: SelectProps<User>) => {
  const headingClasses =
    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";

  return (
    <Select
      className="max-w-xs"
      color={color}
      label="Favorite Animal"
      scrollShadowProps={{
        isEnabled: false,
      }}
      variant={variant}
      {...args}
    >
      <SelectSection
        classNames={{
          heading: headingClasses,
        }}
        title="Mammals"
      >
        <SelectItem key="Lion">Lion</SelectItem>
        <SelectItem key="Tiger">Tiger</SelectItem>
        <SelectItem key="Elephant">Elephant</SelectItem>
        <SelectItem key="Kangaroo">Kangaroo</SelectItem>
        <SelectItem key="Panda">Panda</SelectItem>
        <SelectItem key="Giraffe">Giraffe</SelectItem>
        <SelectItem key="Zebra">Zebra</SelectItem>
        <SelectItem key="Cheetah">Cheetah</SelectItem>
      </SelectSection>
      <SelectSection
        classNames={{
          heading: headingClasses,
        }}
        title="Birds"
      >
        <SelectItem key="Eagle">Eagle</SelectItem>
        <SelectItem key="Parrot">Parrot</SelectItem>
        <SelectItem key="Penguin">Penguin</SelectItem>
        <SelectItem key="Ostrich">Ostrich</SelectItem>
        <SelectItem key="Peacock">Peacock</SelectItem>
        <SelectItem key="Swan">Swan</SelectItem>
        <SelectItem key="Falcon">Falcon</SelectItem>
        <SelectItem key="Flamingo">Flamingo</SelectItem>
      </SelectSection>
    </Select>
  );
};

const WithAriaLabelTemplate = ({color, variant, ...args}: SelectProps) => (
  <Select className="max-w-xs" color={color} label="Favorite Animal" variant={variant} {...args}>
    {items}
  </Select>
);

const CustomStylesTemplate = ({color, variant, ...args}: SelectProps<User>) => {
  return (
    <Select
      className="max-w-xs"
      classNames={{
        label: "group-data-[filled=true]:-translate-y-5",
        trigger: "min-h-unit-16",
        listboxWrapper: "max-h-[400px]",
      }}
      color={color}
      items={usersData}
      label="Assigned to"
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: "before:bg-default-200",
          content: "p-0 border-small border-divider bg-background",
        },
      }}
      variant={variant}
      {...args}
    >
      {(item) => (
        <SelectItem key={item.id} textValue={item.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-tiny text-default-400">{item.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

const AsyncLoadingTemplate = ({color, variant, ...args}: SelectProps<Pokemon>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {items, hasMore, isLoading, onLoadMore} = usePokemonList({fetchDelay: 1500});

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    distance: 20,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  return (
    <Select
      className="max-w-xs"
      color={color}
      isLoading={isLoading}
      items={items}
      label="Pick a Pokemon"
      placeholder="Select a Pokemon"
      scrollRef={scrollerRef}
      selectionMode="single"
      variant={variant}
      onOpenChange={setIsOpen}
      {...args}
    >
      {(item) => (
        <SelectItem key={item.name} className="capitalize">
          {item.name}
        </SelectItem>
      )}
    </Select>
  );
};

export const Default = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
  },
};

export const Multiple = {
  render: Template,

  args: {
    ...defaultProps,
    selectionMode: "multiple",
  },
};

export const Required = {
  render: RequiredTemplate,

  args: {
    ...defaultProps,
  },
};

export const Disabled = {
  render: Template,

  args: {
    ...defaultProps,
    selectedKey: "cat",
    variant: "faded",
    isDisabled: true,
  },
};

export const DisabledOptions = {
  render: Template,

  args: {
    ...defaultProps,
    disabledKeys: ["zebra", "tiger", "lion", "elephant", "crocodile", "whale"],
  },
};

export const WithDescription = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
    description: "Select your favorite animal",
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    "aria-label": "Select an animal",
    placeholder: "Select an animal",
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const AsyncLoading = {
  render: AsyncLoadingTemplate,

  args: {
    ...defaultProps,
  },
};

export const StartContent = {
  render: StartContentTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithoutScrollShadow = {
  render: Template,

  args: {
    ...defaultProps,
    scrollShadowProps: {
      isEnabled: false,
    },
  },
};

export const WithItemDescriptions = {
  render: DynamicTemplateWithDescriptions,

  args: {
    ...defaultProps,
  },
};

export const WithItemStartContent = {
  render: ItemStartContentTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithErrorMessage = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
    errorMessage: "Please select an animal",
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    variant: "bordered",
    defaultSelectedKeys: ["dog"],
    errorMessage: "Please select a valid animal",
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const ControlledMultiple = {
  render: ControlledMultipleTemplate,

  args: {
    ...defaultProps,
  },
};

export const ControlledOpen = {
  render: ControlledOpenTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomSelectorIcon = {
  render: Template,

  args: {
    ...defaultProps,
    disableSelectorIconRotation: true,
    selectorIcon: <SelectorIcon />,
  },
};

export const CustomItems = {
  render: CustomItemsTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomRenderValue = {
  render: CustomItemsTemplate,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
    classNames: {
      trigger: "h-12",
    },
    renderValue: (items: SelectedItems<User>) => {
      return items.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <Avatar
            alt={item.data?.name}
            className="flex-shrink-0"
            size="sm"
            src={item.data?.avatar}
          />
          <div className="flex flex-col">
            <span>{item.data?.name}</span>
            <span className="text-default-500 text-tiny">({item.data?.email})</span>
          </div>
        </div>
      ));
    },
  },
};

export const WithChips = {
  render: CustomItemsTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
    selectionMode: "multiple",
    isMultiline: true,
    classNames: {
      trigger: "py-2",
    },
    renderValue: (items: SelectedItems<User>) => {
      return (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Chip key={item.key}>{item.data?.name}</Chip>
          ))}
        </div>
      );
    },
  },
};

export const WithSections = {
  render: WithSectionsTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithCustomSectionsStyles = {
  render: WithCustomSectionsStylesTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithAriaLabel = {
  render: WithAriaLabelTemplate,

  args: {
    ...defaultProps,
    label: "Select an animal 🐹",
    "aria-label": "Select an animal",
  },
};

export const CustomStyles = {
  render: CustomStylesTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
    renderValue: (items: SelectedItems<User>) => {
      return items.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <Avatar
            alt={item.data?.name}
            className="flex-shrink-0"
            size="sm"
            src={item.data?.avatar}
          />
          <div className="flex flex-col">
            <span>{item.data?.name}</span>
            <span className="text-default-500 text-tiny">({item.data?.email})</span>
          </div>
        </div>
      ));
    },
  },
};
