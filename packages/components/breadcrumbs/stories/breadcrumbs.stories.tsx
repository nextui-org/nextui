import React from "react";
import {Meta} from "@storybook/react";
import {breadcrumbItem} from "@nextui-org/theme";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";
import {Button} from "@nextui-org/button";
import {Tooltip} from "@nextui-org/tooltip";
import {
  CheckIcon,
  ChevronDownIcon,
  HeadphonesIcon,
  InfoIcon,
  MailFilledIcon,
  PetBoldIcon,
  ShoppingCartBoldIcon,
} from "@nextui-org/shared-icons";
import {clsx} from "@nextui-org/shared-utils";

import {Breadcrumbs, BreadcrumbItem, BreadcrumbsProps} from "../src";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    page: {
      control: {
        type: "number",
      },
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "bordered", "light"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["foreground", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    maxItems: {
      control: {
        type: "number",
      },
    },
    itemsBeforeCollapse: {
      control: {
        type: "number",
      },
    },
    itemsAfterCollapse: {
      control: {
        type: "number",
      },
    },
    underline: {
      control: {
        type: "select",
      },
      options: ["none", "hover", "always", "active", "focus"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Breadcrumbs>;

const defaultProps = {
  ...breadcrumbItem.defaultVariants,
  variant: "light",
};

const Template = (args: BreadcrumbsProps & {page: number}) => (
  <Breadcrumbs {...args}>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1">
      Home
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2">
      Music
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3">
      Artist
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4">
      Album
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:5">
      Song
    </BreadcrumbItem>
  </Breadcrumbs>
);

const ControlledTemplate = (args: BreadcrumbsProps & {page: number}) => {
  const [currentPage, setCurrentPage] = React.useState<React.Key>("song");

  return (
    <Breadcrumbs {...args} onAction={(key) => setCurrentPage(key)}>
      <BreadcrumbItem key="home" isCurrent={currentPage === "home"}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem key="music" isCurrent={currentPage === "music"}>
        Music
      </BreadcrumbItem>
      <BreadcrumbItem key="artist" isCurrent={currentPage === "artist"}>
        Artist
      </BreadcrumbItem>
      <BreadcrumbItem key="album" isCurrent={currentPage === "album"}>
        Album
      </BreadcrumbItem>
      <BreadcrumbItem key="song" isCurrent={currentPage === "song"}>
        Song
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

const MenuTypeTemplate = (args: BreadcrumbsProps & {page: number}) => {
  const [currentPage, setCurrentPage] = React.useState<React.Key>("music");

  return (
    <Breadcrumbs
      {...args}
      classNames={{
        list: "gap-2",
      }}
      itemClasses={{
        item: [
          "px-2 py-0.5 border-small border-default-400 rounded-small",
          "data-[current='true']:border-foreground transition-colors",
          "data-[disabled='true']:border-default-400 data-[disabled='true']:bg-default-100",
        ],
        separator: "hidden",
      }}
      onAction={(key) => setCurrentPage(key)}
    >
      <BreadcrumbItem key="home" isCurrent={currentPage === "home"}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem key="music" isCurrent={currentPage === "music"}>
        Music
      </BreadcrumbItem>
      <BreadcrumbItem key="artist" isCurrent={currentPage === "artist"}>
        Artist
      </BreadcrumbItem>
      <BreadcrumbItem key="album" isCurrent={currentPage === "album"}>
        Album
      </BreadcrumbItem>
      <BreadcrumbItem key="song" isDisabled isCurrent={currentPage === "song"}>
        Song
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

const WithStartContentTemplate = (args: BreadcrumbsProps & {page: number}) => (
  <Breadcrumbs {...args}>
    <BreadcrumbItem
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1"
      startContent={<PetBoldIcon />}
    >
      Home
    </BreadcrumbItem>
    <BreadcrumbItem
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2"
      startContent={<HeadphonesIcon />}
    >
      Music
    </BreadcrumbItem>
    <BreadcrumbItem
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3"
      startContent={<InfoIcon />}
    >
      Artist
    </BreadcrumbItem>
    <BreadcrumbItem
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4"
      startContent={<CheckIcon />}
    >
      Album
    </BreadcrumbItem>
    <BreadcrumbItem
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:5"
      startContent={<MailFilledIcon />}
    >
      Song
    </BreadcrumbItem>
  </Breadcrumbs>
);

const WithEndContentTemplate = (args: BreadcrumbsProps & {page: number}) => (
  <Breadcrumbs {...args}>
    <BreadcrumbItem
      endContent={<PetBoldIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1"
    >
      Home
    </BreadcrumbItem>
    <BreadcrumbItem
      endContent={<HeadphonesIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2"
    >
      Music
    </BreadcrumbItem>
    <BreadcrumbItem
      endContent={<InfoIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3"
    >
      Artist
    </BreadcrumbItem>
    <BreadcrumbItem
      endContent={<CheckIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4"
    >
      Album
    </BreadcrumbItem>
    <BreadcrumbItem
      endContent={<MailFilledIcon />}
      href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:5"
    >
      Song
    </BreadcrumbItem>
  </Breadcrumbs>
);

const WithDropdownEllipsisTemplate = (args: BreadcrumbsProps & {page: number}) => (
  <Breadcrumbs
    {...args}
    renderEllipsis={({items, ellipsisIcon, separator}) => (
      <div className="flex items-center">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly className="min-w-unit-6 w-unit-6 h-unit-6" size="sm" variant="flat">
              {ellipsisIcon}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Routes">
            {items.map((item, index) => (
              <DropdownItem key={index} href={item.href}>
                {item.children}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {separator}
      </div>
    )}
  >
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1">
      Electronics
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2">
      GPS
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3">
      Finders
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4">
      Accessories
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:5">
      Bluetooth
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:6">
      Remote Controls
    </BreadcrumbItem>
  </Breadcrumbs>
);

const WithDropdownItemTemplate = (args: BreadcrumbsProps & {page: number}) => {
  const sizeMap = {
    sm: "text-tiny",
    md: "text-small",
    lg: "text-medium",
  };

  return (
    <Breadcrumbs
      {...args}
      itemClasses={{
        item: "px-2",
        separator: "px-0",
      }}
    >
      <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1">
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2">
        Music
      </BreadcrumbItem>
      <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3">
        Artist
      </BreadcrumbItem>
      <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4">
        Album
      </BreadcrumbItem>
      <BreadcrumbItem
        classNames={{
          item: "px-0",
        }}
        href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:5"
      >
        <Dropdown>
          <DropdownTrigger>
            <Button
              className={clsx("h-6 pr-2", args.size && sizeMap[args.size])}
              endContent={<ChevronDownIcon className="text-default-500" />}
              radius="full"
              size="sm"
              variant="light"
            >
              Songs
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Routes">
            <DropdownItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1">
              Song 1
            </DropdownItem>
            <DropdownItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2">
              Song 2
            </DropdownItem>
            <DropdownItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3">
              Song 3
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

const CustomStylesTemplate = (args: BreadcrumbsProps & {page: number}) => (
  <Breadcrumbs
    {...args}
    classNames={{
      list: "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-small",
    }}
    itemClasses={{
      item: "text-white/60 data-[current=true]:text-white",
      separator: "text-white/40",
    }}
    variant="solid"
  >
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:1">
      <Tooltip content="Shopping Cart" size="sm">
        <ShoppingCartBoldIcon />
      </Tooltip>
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:2">
      Checkout
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:3">
      Payment
    </BreadcrumbItem>
    <BreadcrumbItem href="http://localhost:6006/?path=/story/components-breadcrumbs--default&args=page:4">
      Delivery Address
    </BreadcrumbItem>
  </Breadcrumbs>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const CustomSeparator = {
  render: Template,
  args: {
    ...defaultProps,
    itemClasses: {
      separator: "px-2",
    },
    separator: "/",
  },
};

export const ControlledCurrentItem = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};

export const MenuType = {
  render: MenuTypeTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithStartContent = {
  render: WithStartContentTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithEndContent = {
  render: WithEndContentTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithMaxItems = {
  render: Template,
  args: {
    ...defaultProps,
    maxItems: 3,
  },
};

export const WithDropdownEllipsis = {
  render: WithDropdownEllipsisTemplate,
  args: {
    ...defaultProps,
    maxItems: 3,
  },
};

export const WithItemsBeforeCollapse = {
  render: WithDropdownEllipsisTemplate,
  args: {
    ...defaultProps,
    maxItems: 3,
    itemsBeforeCollapse: 2,
    itemsAfterCollapse: 1,
  },
};

export const WithDropdownItem = {
  render: WithDropdownItemTemplate,
  args: {
    ...defaultProps,
  },
};

export const CustomStyles = {
  render: CustomStylesTemplate,
  args: {
    ...defaultProps,
  },
};
