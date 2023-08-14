import React from "react";
import {Meta} from "@storybook/react";
import {select, button} from "@nextui-org/theme";
import {PetBoldIcon} from "@nextui-org/shared-icons";
import {Avatar} from "@nextui-org/avatar";

import {Select, SelectItem, SelectProps} from "../src";

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

type Item = {
  label: string;
  value: string;
};

type User = {
  id: number;
  name: string;
  role: string;
  team: string;
  status: string;
  age: string;
  avatar: string;
  email: string;
};

const itemsData: Item[] = [
  {label: "Cat", value: "cat"},
  {label: "Dog", value: "dog"},
  {label: "Elephant", value: "elephant"},
  {label: "Lion", value: "lion"},
  {label: "Tiger", value: "tiger"},
  {label: "Giraffe", value: "giraffe"},
  {label: "Dolphin", value: "dolphin"},
  {label: "Penguin", value: "penguin"},
  {label: "Zebra", value: "zebra"},
  {label: "Shark", value: "shark"},
  {label: "Whale", value: "whale"},
  {label: "Otter", value: "otter"},
  {label: "Crocodile", value: "crocodile"},
];

const usersData: User[] = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "brian.kim@example.com",
    status: "Active",
  },
  {
    id: 7,
    name: "Michael Hunt",
    role: "Designer",
    team: "Design",
    status: "paused",
    age: "27",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    role: "HR Manager",
    team: "HR",
    status: "active",
    age: "31",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    role: "F. Manager",
    team: "Finance",
    status: "vacation",
    age: "33",
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    role: "Ops Manager",
    team: "Operations",
    status: "active",
    age: "35",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    role: "Jr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "brandon.stevens@example.com",
  },
  {
    id: 12,
    name: "Megan Richards",
    role: "P. Manager",
    team: "Product",
    status: "paused",
    age: "28",
    avatar: "https://i.pravatar.cc/150?img=10",
    email: "megan.richards@example.com",
  },
  {
    id: 13,
    name: "Oliver Scott",
    role: "S. Manager",
    team: "Security",
    status: "active",
    age: "37",
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "oliver.scott@example.com",
  },
  {
    id: 14,
    name: "Grace Allen",
    role: "M. Specialist",
    team: "Marketing",
    status: "active",
    age: "30",
    avatar: "https://i.pravatar.cc/150?img=16",
    email: "grace.allen@example.com",
  },
  {
    id: 15,
    name: "Noah Carter",
    role: "IT Specialist",
    team: "I. Technology",
    status: "paused",
    age: "31",
    avatar: "https://i.pravatar.cc/150?img=15",
    email: "noah.carter@example.com",
  },
  {
    id: 16,
    name: "Ava Perez",
    role: "Manager",
    team: "Sales",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?img=20",
    email: "ava.perez@example.com",
  },
  {
    id: 17,
    name: "Liam Johnson",
    role: "Data Analyst",
    team: "Analysis",
    status: "active",
    age: "28",
    avatar: "https://i.pravatar.cc/150?img=33",
    email: "liam.johnson@example.com",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    role: "QA Analyst",
    team: "Testing",
    status: "active",
    age: "27",
    avatar: "https://i.pravatar.cc/150?img=29",
    email: "sophia.taylor@example.com",
  },
  {
    id: 19,
    name: "Lucas Harris",
    role: "Administrator",
    team: "Information Technology",
    status: "paused",
    age: "32",
    avatar: "https://i.pravatar.cc/150?img=50",
    email: "lucas.harris@example.com",
  },
  {
    id: 20,
    name: "Mia Robinson",
    role: "Coordinator",
    team: "Operations",
    status: "active",
    age: "26",
    avatar: "https://i.pravatar.cc/150?img=45",
    email: "mia.robinson@example.com",
  },
];

const items = itemsData.map((item) => (
  <SelectItem key={item.value} value={item.value}>
    {item.label}
  </SelectItem>
));

const Template = ({color, variant, ...args}: SelectProps) => (
  <Select
    aria-label="Favorite Animal"
    className="max-w-xs"
    color={color}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {items}
  </Select>
);

const DynamicTemplate = ({color, variant, ...args}: SelectProps<Item>) => (
  <Select
    aria-label="Favorite Animal"
    className="max-w-xs"
    color={color}
    items={itemsData}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
  </Select>
);

const ControlledTemplate = ({color, variant, ...args}: SelectProps<Item>) => {
  const [value, setValue] = React.useState<React.Key>("cat");

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        fullWidth
        aria-label="Favorite Animal"
        color={color}
        items={itemsData}
        label="Favorite Animal"
        selectedKey={value}
        variant={variant}
        onSelectionChange={setValue}
        {...args}
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>
      <p className="text-default-500">Selected: {value}</p>
    </div>
  );
};

const RequiredTemplate = ({color, variant, ...args}: SelectProps) => {
  return (
    <form
      className="w-full max-w-xs items-end flex flex-col gap-4"
      onSubmit={(e) => {
        alert("Submitted");
        e.preventDefault();
      }}
    >
      <Select
        isRequired
        aria-label="Favorite Animal"
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
    <Select
      aria-label="Select an animal"
      className="max-w-xs"
      color={color}
      label="Select an animal"
      variant={variant}
      {...args}
    >
      {items}
    </Select>
    <Select
      aria-label="Favorite Animal"
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
        <Select
          aria-label="Select an animal"
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
        <Select
          aria-label="Select an animal"
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Select>
        <Select
          aria-label="Select an animal"
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
          aria-label="Select an animal"
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Select>
        <Select
          aria-label="Select an animal"
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
          aria-label="Select an animal"
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
    aria-label="Favorite Animal"
    className="max-w-xs"
    color={color}
    defaultSelectedKey="cat"
    label="Favorite Animal"
    startContent={<PetBoldIcon />}
    variant={variant}
    {...args}
  >
    {items}
  </Select>
);

const CustomItemsTemplate = ({color, variant, ...args}: SelectProps<User>) => (
  <Select
    aria-label="Assigned to"
    className="max-w-xs mt-8"
    classNames={{
      trigger: "h-unit-12 min-h-unit-12",
    }}
    color={color}
    items={usersData}
    label="Assigned to"
    placeholder="Select a user"
    variant={variant}
    {...args}
    labelPlacement="outside"
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

export const Default = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
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

export const LabelPlacement = {
  render: LabelPlacementTemplate,

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

export const WithErrorMessage = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
    errorMessage: "Please select an animal",
  },
};

export const InvalidValidationState = {
  render: Template,

  args: {
    ...defaultProps,
    variant: "bordered",
    defaultSelectedKey: "dog",
    validationState: "invalid",
    errorMessage: "Please select a valid animal",
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomItems = {
  render: CustomItemsTemplate,

  args: {
    ...defaultProps,
  },
};
