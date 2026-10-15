import type {Meta, StoryObj} from "@storybook/react";
import type {Selection, SortDescriptor} from "react-aria-components/Table";

import {cn} from "@heroui/styles";
import {Icon} from "@iconify/react";
import React from "react";
import {TableLayout, Virtualizer} from "react-aria-components/Virtualizer";

import {Avatar} from "../avatar";
import {Button} from "../button";
import {Checkbox} from "../checkbox";
import {Chip} from "../chip";
import {EmptyState} from "../empty-state";
import {Pagination} from "../pagination";
import {Spinner} from "../spinner";

import {Table} from "./index";

export default {
  component: Table,
  parameters: {
    layout: "centered",
  },
  title: "Components/Data Display/Table",
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
  },
} as Meta<typeof Table>;

type Story = StoryObj<typeof Table>;

/* -------------------------------------------------------------------------------------------------
 * Sample Data
 * -----------------------------------------------------------------------------------------------*/
interface User {
  id: number;
  name: string;
  image_url: string;
  role: string;
  status: "Active" | "Inactive" | "On Leave";
  email: string;
}

const users: User[] = [
  {
    email: "kate@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    id: 4586932,
    name: "Kate Moore",
    role: "Chief Executive Officer",
    status: "Active",
  },
  {
    email: "john@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    id: 5273849,
    name: "John Smith",
    role: "Chief Technology Officer",
    status: "Active",
  },
  {
    email: "sara@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    id: 7492836,
    name: "Sara Johnson",
    role: "Chief Marketing Officer",
    status: "On Leave",
  },
  {
    email: "michael@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    id: 8293746,
    name: "Michael Brown",
    role: "Chief Financial Officer",
    status: "Active",
  },
  {
    email: "emily@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    id: 1234567,
    name: "Emily Davis",
    role: "Product Manager",
    status: "Inactive",
  },
  {
    email: "davis@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg",
    id: 9876543,
    name: "Davis Wilson",
    role: "Lead Designer",
    status: "Active",
  },
  {
    email: "olivia@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    id: 3456789,
    name: "Olivia Martinez",
    role: "Frontend Engineer",
    status: "Active",
  },
  {
    email: "james@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    id: 4567890,
    name: "James Taylor",
    role: "Backend Engineer",
    status: "Active",
  },
  {
    email: "sophia@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    id: 5678901,
    name: "Sophia Anderson",
    role: "QA Engineer",
    status: "On Leave",
  },
  {
    email: "liam@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    id: 6789012,
    name: "Liam Thomas",
    role: "DevOps Engineer",
    status: "Active",
  },
  {
    email: "ava@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    id: 7890123,
    name: "Ava Jackson",
    role: "Data Analyst",
    status: "Inactive",
  },
  {
    email: "noah@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg",
    id: 8901234,
    name: "Noah White",
    role: "Security Engineer",
    status: "Active",
  },
];

const columns = [
  {id: "name", isRowHeader: true, name: "Name"},
  {id: "role", name: "Role"},
  {id: "status", name: "Status"},
  {id: "email", name: "Email"},
];

/* -------------------------------------------------------------------------------------------------
 * Wrapper
 * -----------------------------------------------------------------------------------------------*/
const Wrapper = ({children}: {children: React.ReactNode}) => (
  <div className="w-full max-w-4xl">{children}</div>
);

/* -------------------------------------------------------------------------------------------------
 * Pagination Helpers
 * -----------------------------------------------------------------------------------------------*/
const ROWS_PER_PAGE = 4;

function usePagination<T>(items: T[], rowsPerPage = ROWS_PER_PAGE) {
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(items.length / rowsPerPage);

  const paginatedItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return items.slice(start, start + rowsPerPage);
  }, [items, page, rowsPerPage]);

  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, items.length);

  return {end, page, paginatedItems, setPage, start, total: items.length, totalPages};
}

function TablePaginationFooter({pagination}: {pagination: ReturnType<typeof usePagination>}) {
  const {end, page, setPage, start, total, totalPages} = pagination;
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);

  return (
    <Pagination size="sm">
      <Pagination.Summary>
        {start} to {end} of {total} results
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={page === 1}
            onPress={() => setPage((p) => Math.max(1, p - 1))}
          >
            <Pagination.PreviousIcon />
            Prev
          </Pagination.Previous>
        </Pagination.Item>
        {pages.map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next
            isDisabled={page === totalPages}
            onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Stories
 * -----------------------------------------------------------------------------------------------*/

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
  Active: "success",
  Inactive: "danger",
  "On Leave": "warning",
};

/**
 * Shared template for Default and SecondaryVariant stories.
 */
function DefaultTableTemplate({variant = "primary"}: {variant?: "primary" | "secondary"}) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const sortedUsers = React.useMemo(() => {
    return [...users].sort((a, b) => {
      const col = sortDescriptor.column as keyof User;
      const first = String(a[col]);
      const second = String(b[col]);
      let cmp = first.localeCompare(second);

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [sortDescriptor]);

  const pagination = usePagination(sortedUsers);

  return (
    <Wrapper>
      <Table variant={variant}>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Custom cells"
            className="min-w-[800px]"
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <Table.Header>
              <Table.Column className="pe-0">
                <Checkbox aria-label="Select all" slot="selection">
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox.Content>
                </Checkbox>
              </Table.Column>
              <Table.Column allowsSorting isRowHeader className="after:hidden" id="id">
                {({sortDirection}) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Worker ID
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="name">
                {({sortDirection}) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Member
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="role">
                {({sortDirection}) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Role
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="status">
                {({sortDirection}) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    Status
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
              <Table.Column className="text-end">Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {pagination.paginatedItems.map((user) => (
                <Table.Row key={user.id} id={user.id}>
                  <Table.Cell className="pe-0">
                    <Checkbox
                      aria-label={`Select ${user.name}`}
                      slot="selection"
                      variant="secondary"
                    >
                      <Checkbox.Content>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                      </Checkbox.Content>
                    </Checkbox>
                  </Table.Cell>
                  <Table.Cell className="font-medium">
                    <div className="flex items-center gap-2">
                      #{user.id.toString()}{" "}
                      <Button isIconOnly aria-label="Copy user ID" size="sm" variant="ghost">
                        <Icon className="size-4 text-muted" icon="gravity-ui:copy" />
                      </Button>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <Avatar.Image alt="" src={user.image_url} />
                        <Avatar.Fallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs">{user.name}</span>
                        <span className="text-xs text-muted">{user.email}</span>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="min-w-52">{user.role}</Table.Cell>
                  <Table.Cell className="min-w-25">
                    <Chip color={statusColorMap[user.status]} size="sm" variant="soft">
                      {user.status}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      <Button isIconOnly aria-label="View details" size="sm" variant="tertiary">
                        <Icon className="size-4" icon="gravity-ui:eye" />
                      </Button>
                      <Button isIconOnly aria-label="Edit" size="sm" variant="tertiary">
                        <Icon className="size-4" icon="gravity-ui:pencil" />
                      </Button>
                      <Button isIconOnly aria-label="Delete" size="sm" variant="danger-soft">
                        <Icon className="size-4" icon="gravity-ui:trash-bin" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>
          <TablePaginationFooter pagination={pagination} />
        </Table.Footer>
      </Table>
    </Wrapper>
  );
}

/**
 * Default table with custom cells: avatars, chips, action buttons, and sortable columns.
 */
export const Default: Story = {
  args: {
    variant: "primary",
  },
  render: ({variant}) => <DefaultTableTemplate variant={variant} />,
};

/**
 * Secondary variant: same content as Default with secondary styling.
 */
export const SecondaryVariant: Story = {
  render: () => <DefaultTableTemplate variant="secondary" />,
};

/**
 * Empty state via user-provided renderEmptyState.
 */
export const EmptyStateDemo: Story = {
  args: {
    variant: "primary",
  },
  render: ({variant}) => (
    <Wrapper>
      <Table className="min-h-[200px] min-w-[600px]" variant={variant}>
        <Table.ScrollContainer>
          <Table.Content aria-label="Empty state" className="h-full">
            <Table.Header>
              {columns.map((col) => (
                <Table.Column key={col.id} id={col.id} isRowHeader={col.isRowHeader}>
                  {col.name}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                  <Icon className="size-6 text-muted" icon="gravity-ui:tray" />
                  <span className="text-sm text-muted">No results found</span>
                </EmptyState>
              )}
            >
              {[]}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </Wrapper>
  ),
};

/**
 * Dynamic collection with items prop.
 * Uses Table.Collection to render dynamic cells within rows,
 * which also allows placing static cells (e.g. checkbox) before the dynamic ones.
 */
export const DynamicCollection: Story = {
  render: () => {
    const pagination = usePagination(users);

    return (
      <Wrapper>
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Dynamic collection" className="min-w-[600px]">
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column isRowHeader={column.isRowHeader}>{column.name}</Table.Column>
                )}
              </Table.Header>
              <Table.Body items={pagination.paginatedItems}>
                {(user) => (
                  <Table.Row>
                    <Table.Collection items={columns}>
                      {(column) => <Table.Cell>{user[column.id as keyof User]}</Table.Cell>}
                    </Table.Collection>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
          <Table.Footer>
            <TablePaginationFooter pagination={pagination} />
          </Table.Footer>
        </Table>
      </Wrapper>
    );
  },
};

/**
 * Dynamic collection with selection — shows how Table.Collection lets you
 * add static cells (checkbox) alongside dynamic column-based cells.
 */
const DynamicWithSelectionTemplate = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());
  const pagination = usePagination(users);

  return (
    <Wrapper>
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Dynamic with selection"
            className="min-w-[650px]"
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            onSelectionChange={setSelectedKeys}
          >
            <Table.Header>
              <Table.Column>
                <Checkbox aria-label="Select all" slot="selection">
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox.Content>
                </Checkbox>
              </Table.Column>
              <Table.Collection items={columns}>
                {(column) => (
                  <Table.Column isRowHeader={column.isRowHeader}>{column.name}</Table.Column>
                )}
              </Table.Collection>
            </Table.Header>
            <Table.Body items={pagination.paginatedItems}>
              {(user) => (
                <Table.Row>
                  <Table.Cell>
                    <Checkbox
                      aria-label={`Select ${user.name}`}
                      slot="selection"
                      variant="secondary"
                    >
                      <Checkbox.Content>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                      </Checkbox.Content>
                    </Checkbox>
                  </Table.Cell>
                  <Table.Collection items={columns}>
                    {(column) => <Table.Cell>{user[column.id]}</Table.Cell>}
                  </Table.Collection>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>
          <TablePaginationFooter pagination={pagination} />
        </Table.Footer>
      </Table>
    </Wrapper>
  );
};

export const DynamicWithSelection: Story = {
  render: () => <DynamicWithSelectionTemplate />,
};

/**
 * Column resizing with drag handles between columns.
 */
export const ColumnResizing: Story = {
  render: () => (
    <Wrapper>
      <Table>
        <Table.ResizableContainer>
          <Table.Content aria-label="Column resizing" className="min-w-[700px]">
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="1fr" id="name" minWidth={160}>
                Name
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="role" minWidth={220}>
                Role
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                Status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="email" minWidth={200}>
                Email
              </Table.Column>
            </Table.Header>
            <Table.Body items={users}>
              {(user) => (
                <Table.Row>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <Chip color={statusColorMap[user.status]} size="sm" variant="soft">
                      {user.status}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </Wrapper>
  ),
};

/**
 * Async loading with infinite scroll using Table.LoadMore.
 * Simulates fetching paginated data — scroll to the bottom to load more rows.
 */
const ITEMS_PER_PAGE = 6;

function useAsyncUsers() {
  const [items, setItems] = React.useState<User[]>(() => users.slice(0, ITEMS_PER_PAGE));
  const [isLoading, setIsLoading] = React.useState(false);
  const isLoadingRef = React.useRef(false);
  const hasMore = items.length < users.length;

  const loadMore = React.useCallback(() => {
    if (!hasMore || isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setItems((prev) => users.slice(0, prev.length + ITEMS_PER_PAGE));
      setIsLoading(false);
      requestAnimationFrame(() => {
        isLoadingRef.current = false;
      });
    }, 1500);
  }, [hasMore]);

  return {hasMore, isLoading, items, loadMore};
}

export const AsyncLoading: Story = {
  args: {
    variant: "primary",
  },
  render: ({variant}) => {
    const {hasMore, isLoading, items, loadMore} = useAsyncUsers();

    return (
      <Wrapper>
        <Table variant={variant}>
          <Table.ScrollContainer className="h-[280px] overflow-y-auto">
            <Table.Content aria-label="Async loading" className="min-w-[600px]">
              <Table.Header className="sticky top-0 z-10 bg-surface-secondary">
                {columns.map((col) => (
                  <Table.Column key={col.id} id={col.id} isRowHeader={col.isRowHeader}>
                    {col.name}
                  </Table.Column>
                ))}
              </Table.Header>
              <Table.Body>
                <Table.Collection items={items}>
                  {(user) => (
                    <Table.Row>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>
                        <Chip color={statusColorMap[user.status]} size="sm" variant="soft">
                          {user.status}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Collection>
                {!!hasMore && (
                  <Table.LoadMore isLoading={isLoading} scrollOffset={0} onLoadMore={loadMore}>
                    <Table.LoadMoreContent>
                      <Spinner size="md" />
                    </Table.LoadMoreContent>
                  </Table.LoadMore>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Wrapper>
    );
  },
};

export const Virtualization: Story = {
  render: () => {
    const roles = [
      "Software Engineer",
      "Senior Engineer",
      "Staff Engineer",
      "Product Manager",
      "Designer",
      "Data Analyst",
      "QA Engineer",
      "DevOps Engineer",
      "Marketing Manager",
      "Sales Representative",
    ];

    const statuses: User["status"][] = ["Active", "Inactive", "On Leave"];

    const firstNames = [
      "Emma",
      "Liam",
      "Olivia",
      "Noah",
      "Ava",
      "James",
      "Sophia",
      "Oliver",
      "Isabella",
      "Lucas",
      "Mia",
      "Ethan",
      "Charlotte",
      "Mason",
      "Amelia",
      "Logan",
      "Harper",
      "Alexander",
      "Ella",
      "Benjamin",
    ];

    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
      "Anderson",
      "Taylor",
      "Thomas",
      "Jackson",
      "White",
      "Harris",
      "Clark",
      "Lewis",
      "Robinson",
      "Walker",
    ];

    function generateUsers(n: number): User[] {
      const users: User[] = [];

      for (let i = 0; i < n; i++) {
        const firstName = firstNames[i % firstNames.length];
        const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
        const name = `${firstName} ${lastName}`;

        users.push({
          id: i + 1,
          name,
          image_url: `https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg`,
          role: roles[i % roles.length],
          status: statuses[i % statuses.length],
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@acme.com`,
        });
      }

      return users;
    }

    const virtualizedUsers = generateUsers(1000);

    return (
      <Virtualizer
        layout={TableLayout}
        layoutOptions={{
          rowHeight: 42,
          headingHeight: 42,
        }}
      >
        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Virtualized table with 1000 rows"
              className="h-[500px] min-w-[700px] scrollbar overflow-auto"
            >
              <Table.Header className="h-full w-full">
                <Table.Column isRowHeader id="name" minWidth={160}>
                  Name
                </Table.Column>
                <Table.Column id="role" minWidth={220}>
                  Role
                </Table.Column>
                <Table.Column id="email" minWidth={240}>
                  Email
                </Table.Column>
              </Table.Header>
              <Table.Body items={virtualizedUsers}>
                {(user) => (
                  <Table.Row>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.role}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Virtualizer>
    );
  },
};

export const ExpandableRows: Story = {
  render: () => {
    type Row = {
      children: Row[];
      date: string;
      id: string;
      title: string;
      type: string;
    };

    const data: Row[] = [
      {
        children: [
          {
            children: [
              {children: [], date: "7/10/2025", id: "3", title: "Weekly Report", type: "File"},
              {children: [], date: "8/20/2025", id: "4", title: "Budget", type: "File"},
            ],
            date: "8/2/2025",
            id: "2",
            title: "Project",
            type: "Directory",
          },
        ],
        date: "10/20/2025",
        id: "1",
        title: "Documents",
        type: "Directory",
      },
      {
        children: [
          {children: [], date: "1/23/2026", id: "6", title: "Image 1", type: "File"},
          {children: [], date: "2/3/2026", id: "7", title: "Image 2", type: "File"},
        ],
        date: "2/3/2026",
        id: "5",
        title: "Photos",
        type: "Directory",
      },
    ];

    const [expandedKeys, setExpandedKeys] = React.useState<Selection>(() => new Set(["1"]));

    const renderExpandableRow = (item: Row) => {
      return (
        <Table.Row id={item.id} textValue={item.title}>
          <Table.Cell textValue={item.title}>
            {({hasChildItems, isDisabled, isExpanded, isTreeColumn}) => (
              <span className="flex items-center gap-1">
                {hasChildItems && isTreeColumn ? (
                  <Button
                    isIconOnly
                    aria-label="Toggle row"
                    isDisabled={isDisabled}
                    size="sm"
                    slot="chevron"
                    variant="ghost"
                  >
                    <Icon
                      aria-hidden
                      icon="gravity-ui:chevron-right"
                      className={cn(
                        "size-4 text-muted transition-transform duration-150",
                        isExpanded ? "rotate-90" : "rtl:rotate-180",
                      )}
                    />
                  </Button>
                ) : null}
                <span>{item.title}</span>
              </span>
            )}
          </Table.Cell>
          <Table.Cell>{item.type}</Table.Cell>
          <Table.Cell>{item.date}</Table.Cell>
          <Table.Collection items={item.children}>{renderExpandableRow}</Table.Collection>
        </Table.Row>
      );
    };

    return (
      <Wrapper>
        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Files"
              className="min-w-[520px]"
              expandedKeys={expandedKeys}
              treeColumn="name"
              onExpandedChange={setExpandedKeys}
            >
              <Table.Header>
                <Table.Column isRowHeader id="name">
                  Name
                </Table.Column>
                <Table.Column id="type">Type</Table.Column>
                <Table.Column id="date">Date Modified</Table.Column>
              </Table.Header>
              <Table.Body items={data}>{renderExpandableRow}</Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Wrapper>
    );
  },
};
