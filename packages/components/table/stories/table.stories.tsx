import React, {Key} from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {table} from "@nextui-org/theme";
import {User} from "@nextui-org/user";
import {Chip, ChipProps} from "@nextui-org/chip";
import {Button} from "@nextui-org/button";
import {Spinner} from "@nextui-org/spinner";
import {Tooltip} from "@nextui-org/tooltip";
import {EditIcon, DeleteIcon, EyeIcon} from "@nextui-org/shared-icons";
import {useAsyncList} from "@react-stately/data";

import {Table, TableHeader, TableColumn, TableBody, TableCell, TableRow, TableProps} from "../src";

export default {
  title: "Components/Table",
  component: Table,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    layout: {
      control: {
        type: "select",
        options: ["auto", "fixed"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
      },
    },
    shadow: {
      control: {
        type: "select",
        options: ["none", "sm", "md", "lg", "xl", "2xl", "inner"],
      },
    },
    selectionMode: {
      control: {
        type: "select",
        options: ["none", "single", "multiple"],
      },
    },
    isStriped: {
      control: {
        type: "boolean",
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
} as ComponentMeta<typeof Table>;

const defaultProps = {
  ...table.defaultVariants,
  className: "max-w-lg",
};

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

type SWCharacter = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
};

const isObject = (target: unknown) => target && typeof target === "object";

const getKeyValue = (obj: any, key: Key) => {
  if (!isObject(obj)) return obj;
  if (obj instanceof Array) return [...obj];

  return obj[key];
};

const StaticTemplate: ComponentStory<typeof Table> = (args: TableProps) => (
  <Table aria-label="Example static collection table" {...args}>
    <TableHeader>
      <TableColumn>NAME</TableColumn>
      <TableColumn>ROLE</TableColumn>
      <TableColumn>STATUS</TableColumn>
    </TableHeader>
    <TableBody>
      <TableRow key="1">
        <TableCell>Tony Reichert</TableCell>
        <TableCell>CEO</TableCell>
        <TableCell>Active</TableCell>
      </TableRow>
      <TableRow key="2">
        <TableCell>Zoey Lang</TableCell>
        <TableCell>Technical Lead</TableCell>
        <TableCell>Paused</TableCell>
      </TableRow>
      <TableRow key="3">
        <TableCell>Jane Fisher</TableCell>
        <TableCell>Senior Developer</TableCell>
        <TableCell>Active</TableCell>
      </TableRow>
      <TableRow key="4">
        <TableCell>William Howard</TableCell>
        <TableCell>Community Manager</TableCell>
        <TableCell>Vacation</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const EmptyTemplate: ComponentStory<typeof Table> = (args: TableProps) => (
  <Table aria-label="Example empty table" {...args}>
    <TableHeader>
      <TableColumn>NAME</TableColumn>
      <TableColumn>ROLE</TableColumn>
      <TableColumn>STATUS</TableColumn>
    </TableHeader>
    <TableBody renderEmptyState={() => "No rows to display."}>{[]}</TableBody>
  </Table>
);

const DynamicTemplate: ComponentStory<typeof Table> = (args: TableProps) => (
  <Table aria-label="Example table with dynamic content" {...args}>
    <TableHeader columns={columns}>
      {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
    </TableHeader>
    <TableBody items={rows}>
      {(item) => (
        <TableRow key={item.key}>
          {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
        </TableRow>
      )}
    </TableBody>
  </Table>
);

const CustomCellTemplate: ComponentStory<typeof Table> = (args: TableProps) => {
  const columns = [
    {name: "NAME", uid: "name"},
    {name: "ROLE", uid: "role"},
    {name: "STATUS", uid: "status"},
    {name: "ACTIONS", uid: "actions"},
  ];
  const users = [
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
      role: "Technical Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      email: "zoey.lang@example.com",
    },
    {
      id: 3,
      name: "Jane Fisher",
      role: "Senior Developer",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      email: "jane.fisher@example.com",
    },
    {
      id: 4,
      name: "William Howard",
      role: "Community Manager",
      team: "Marketing",
      status: "vacation",
      age: "28",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      email: "william.howard@example.com",
    },
    {
      id: 5,
      name: "Kristen Copper",
      role: "Sales Manager",
      team: "Sales",
      status: "active",
      age: "24",
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
      email: "kristen.cooper@example.com",
    },
  ];

  type User = typeof users[0];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "xl", src: user.avatar}}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-neutral-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-neutral-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-neutral-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells" {...args}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const SortableTemplate: ComponentStory<typeof Table> = (args: TableProps) => {
  let list = useAsyncList<SWCharacter>({
    async load({signal}) {
      let res = await fetch(`https://swapi.py4e.com/api/people/?search`, {
        signal,
      });
      let json = await res.json();

      return {
        items: json.results,
      };
    },
    async sort({items, sortDescriptor}) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column!];
          let second = b[sortDescriptor.column!];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      {...args}
    >
      <TableHeader>
        <TableColumn key="name" allowsSorting>
          Name
        </TableColumn>
        <TableColumn key="height" allowsSorting>
          Height
        </TableColumn>
        <TableColumn key="mass" allowsSorting>
          Mass
        </TableColumn>
        <TableColumn key="birth_year" allowsSorting>
          Birth year
        </TableColumn>
      </TableHeader>
      <TableBody items={list.items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const LoadMoreTemplate: ComponentStory<typeof Table> = (args: TableProps) => {
  const [page, setPage] = React.useState(1);

  let list = useAsyncList<SWCharacter>({
    async load({signal, cursor}) {
      if (cursor) {
        // write this /^http:\/\//i using RegExp
        const regex = "/^http:///i";

        cursor = cursor.replace(regex, "https://");

        setPage((prev) => prev + 1);
      }

      let res = await fetch(cursor || "https://swapi.py4e.com/api/people/?search=", {signal});
      let json = await res.json();

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  const hasMore = page < 9;

  return (
    <Table
      aria-label="Example table with client side sorting"
      bottomContent={
        hasMore ? (
          <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}>
            {list.isLoading && <Spinner color="white" size="sm" />}
            Load More
          </Button>
        ) : null
      }
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      {...args}
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="height">Height</TableColumn>
        <TableColumn key="mass">Mass</TableColumn>
        <TableColumn key="birth_year">Birth year</TableColumn>
      </TableHeader>
      <TableBody items={list.items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export const Static = StaticTemplate.bind({});
Static.args = {
  ...defaultProps,
};

export const Dynamic = DynamicTemplate.bind({});
Dynamic.args = {
  ...defaultProps,
};

export const EmptyState = EmptyTemplate.bind({});
EmptyState.args = {
  ...defaultProps,
};

export const NoHeader = StaticTemplate.bind({});
NoHeader.args = {
  ...defaultProps,
  hideHeader: true,
};

export const CustomCells = CustomCellTemplate.bind({});
CustomCells.args = {
  ...defaultProps,
  className: "max-w-3xl",
};

export const Striped = StaticTemplate.bind({});
Striped.args = {
  ...defaultProps,
  isStriped: true,
};

export const RemoveWrapper = StaticTemplate.bind({});
RemoveWrapper.args = {
  ...defaultProps,
  classNames: {
    table: "max-w-lg",
  },
  removeWrapper: true,
};

export const SingleSelection = StaticTemplate.bind({});
SingleSelection.args = {
  ...defaultProps,
  selectionMode: "single",
};

export const MultipleSelection = StaticTemplate.bind({});
MultipleSelection.args = {
  ...defaultProps,
  selectionMode: "multiple",
  color: "secondary",
};

export const DisabledKeys = StaticTemplate.bind({});
DisabledKeys.args = {
  ...defaultProps,
  selectionMode: "multiple",
  disabledKeys: ["2"],
  color: "warning",
};

export const DisallowEmptySelection = StaticTemplate.bind({});
DisallowEmptySelection.args = {
  ...defaultProps,
  disallowEmptySelection: true,
  color: "primary",
  defaultSelectedKeys: ["2"],
  selectionMode: "multiple",
};

export const Sortable = SortableTemplate.bind({});
Sortable.args = {
  ...defaultProps,
};

export const LoadMore = LoadMoreTemplate.bind({});
LoadMore.args = {
  ...defaultProps,
  className: "max-w-3xl max-h-auto",
};

export const DisableAnimation = StaticTemplate.bind({});
DisableAnimation.args = {
  ...defaultProps,
  selectionMode: "multiple",
  color: "secondary",
  disableAnimation: true,
};
