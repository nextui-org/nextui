import type {Selection, SortDescriptor} from "react-aria-components/Table";

import {
  User,
  cleanup,
  fireEvent,
  render,
  runAllTimers,
  screen,
  setupUser,
} from "@heroui/testing/helpers";

import {Checkbox} from "@/components/checkbox";
import {Input} from "@/components/input";
import {Table} from "@/components/table";
import {TextField} from "@/components/textfield";

const rows = [
  {id: "1", name: "Kate", role: "CEO"},
  {id: "2", name: "John", role: "CTO"},
  {id: "3", name: "Sara", role: "CMO"},
];

const renderTable = (
  props: {
    selectedKeys?: Selection;
    onSelectionChange?: (keys: Selection) => void;
    sortDescriptor?: SortDescriptor;
    onSortChange?: (descriptor: SortDescriptor) => void;
  } = {},
) => {
  return render(
    <Table data-testid="table">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Team"
          selectedKeys={props.selectedKeys}
          selectionMode="multiple"
          sortDescriptor={props.sortDescriptor}
          onSelectionChange={props.onSelectionChange}
          onSortChange={props.onSortChange}
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
            <Table.Column allowsSorting isRowHeader id="name">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  Member
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column id="role">Role</Table.Column>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.id} id={row.id}>
                <Table.Cell>
                  <Checkbox aria-label={`Select ${row.name}`} slot="selection">
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox.Content>
                  </Checkbox>
                </Table.Cell>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>,
  );
};

type EditableKind = "contenteditable" | "input" | "select" | "textarea";

const renderEditable = (kind: EditableKind) => {
  switch (kind) {
    case "contenteditable":
      return (
        <div
          contentEditable
          suppressContentEditableWarning
          aria-label="Alpha value"
          role="textbox"
          tabIndex={0}
        >
          <span data-testid="contenteditable-target">Edit</span>
        </div>
      );
    case "input":
      return (
        <TextField aria-label="Alpha value">
          <Input />
        </TextField>
      );
    case "select":
      return (
        <select aria-label="Alpha value" defaultValue="alpha">
          <option value="alpha">Alpha</option>
          <option value="yes">Yes</option>
        </select>
      );
    case "textarea":
      return <textarea aria-label="Alpha value" />;
    default: {
      const exhaustiveKind: never = kind;

      return exhaustiveKind;
    }
  }
};

const renderTypeaheadTable = (
  kind: EditableKind = "input",
  keyboardNavigationBehavior?: "arrow" | "tab",
) => {
  return render(
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Editable values"
          keyboardNavigationBehavior={keyboardNavigationBehavior}
        >
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Value</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row id="alpha">
              <Table.Cell>Alpha</Table.Cell>
              <Table.Cell>{renderEditable(kind)}</Table.Cell>
            </Table.Row>
            <Table.Row id="year-range">
              <Table.Cell>Year Range</Table.Cell>
              <Table.Cell>2020–2026</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>,
  );
};

describe("Table", () => {
  let testUtilUser: User;
  let user: ReturnType<typeof setupUser>;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
    user = setupUser({advanceTimers: vi.advanceTimersByTime});
    testUtilUser = new User({
      interactionType: "mouse",
      advanceTimer: vi.advanceTimersByTime,
    });
  });

  afterEach(() => {
    cleanup();
    runAllTimers();
    vi.useRealTimers();
  });

  it("exposes shell slots and grid role", () => {
    renderTable();

    expect(screen.getByTestId("table")).toHaveAttribute("data-slot", "table");
    expect(screen.getByTestId("table").className).toEqual(expect.stringContaining("table"));
    expect(document.querySelector('[data-slot="table-scroll-container"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="table-content"]')).not.toBeNull();
    expect(screen.getByRole("grid", {name: "Team"})).toBeInTheDocument();
    expect(document.querySelector('[data-slot="table-header"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="table-body"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="table-row"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="table-cell"]')).not.toBeNull();
  });

  it("supports toggling row selection via Table tester", async () => {
    const onSelectionChange = vi.fn();

    renderTable({onSelectionChange});

    const tester = testUtilUser.createTester("Table", {
      root: screen.getByRole("grid", {name: "Team"}),
      advanceTimer: vi.advanceTimersByTime,
    });

    await tester.toggleRowSelection({row: "John"});
    runAllTimers();

    expect(onSelectionChange).toHaveBeenCalled();
    const selection = onSelectionChange.mock.calls[0]?.[0] as Selection;

    expect(selection === "all" ? null : [...selection]).toEqual(["2"]);
  });

  it("preserves the header checkmark across indeterminate selection transitions", async () => {
    renderTable();
    const headerCheckbox = screen.getByRole("checkbox", {name: "Select all"});
    const headerField = headerCheckbox.closest('[data-slot="checkbox"]');
    const checkmark = headerField?.querySelector(
      '[data-slot="checkbox-default-indicator--checkmark"]',
    );

    await user.click(screen.getByRole("checkbox", {name: /^Select Kate/}));
    runAllTimers();

    expect(headerField).toHaveAttribute("data-indeterminate", "true");
    expect(
      headerField?.querySelector('[data-slot="checkbox-default-indicator--indeterminate"]'),
    ).not.toBeNull();

    await user.click(headerCheckbox);
    runAllTimers();

    expect(headerField).toHaveAttribute("data-selected", "true");
    expect(headerField?.querySelector('[data-slot="checkbox-default-indicator--checkmark"]')).toBe(
      checkmark,
    );
    expect(checkmark).toHaveAttribute("stroke-dashoffset", "44");
    expect(
      headerField?.querySelector('[data-slot="checkbox-default-indicator--indeterminate"]'),
    ).toBeNull();

    await user.click(screen.getByRole("checkbox", {name: /^Select Kate/}));
    await user.click(screen.getByRole("checkbox", {name: /^Select John/}));
    await user.click(screen.getByRole("checkbox", {name: /^Select Sara/}));
    runAllTimers();

    expect(headerField).not.toHaveAttribute("data-indeterminate");
    expect(headerField?.querySelector('[data-slot="checkbox-default-indicator--checkmark"]')).toBe(
      checkmark,
    );
    expect(checkmark).toHaveAttribute("stroke-dashoffset", "66");
    expect(
      headerField?.querySelector('[data-slot="checkbox-default-indicator--indeterminate"]'),
    ).toBeNull();
  });

  it("supports toggling sort via Table tester", async () => {
    const onSortChange = vi.fn();

    renderTable({
      sortDescriptor: {column: "name", direction: "ascending"},
      onSortChange,
    });

    expect(document.querySelector('[data-slot="table-sortable-column-header"]')).not.toBeNull();

    const tester = testUtilUser.createTester("Table", {
      root: screen.getByRole("grid", {name: "Team"}),
      advanceTimer: vi.advanceTimersByTime,
    });

    await tester.toggleSort({column: "Member"});
    runAllTimers();

    expect(onSortChange).toHaveBeenCalled();
    expect(onSortChange.mock.calls[0]?.[0]).toEqual(expect.objectContaining({column: "name"}));
  });

  it.each([
    ["input", "textbox"],
    ["textarea", "textbox"],
    ["select", "combobox"],
  ] as const)("supports matching letter keystrokes in a nested %s", async (kind, role) => {
    renderTypeaheadTable(kind);
    const editable = screen.getByRole(role, {name: "Alpha value"});

    await user.click(editable);
    expect(editable).toHaveFocus();
    await user.keyboard("y");

    expect(editable).toHaveFocus();
    if (kind !== "select") {
      expect(editable).toHaveValue("y");
    }
  });

  it("supports matching letter keystrokes in a nested contenteditable target", async () => {
    renderTypeaheadTable("contenteditable");
    const editable = screen.getByRole("textbox", {name: "Alpha value"});

    await user.click(editable);
    expect(editable).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId("contenteditable-target"), {key: "y"});

    expect(editable).toHaveFocus();
  });

  it("supports overriding keyboard navigation behavior", async () => {
    renderTypeaheadTable("input", "arrow");
    const editable = screen.getByRole("textbox", {name: "Alpha value"});
    const yearRangeCell = screen.getByRole("rowheader", {name: "Year Range"});

    await user.click(editable);
    expect(editable).toHaveFocus();
    await user.keyboard("y");

    expect(yearRangeCell).toHaveFocus();
  });

  it("supports typeahead from non-editable cells", async () => {
    renderTypeaheadTable();
    const alphaCell = screen.getByRole("rowheader", {name: "Alpha"});
    const yearRangeCell = screen.getByRole("rowheader", {name: "Year Range"});

    await user.click(alphaCell);
    expect(alphaCell).toHaveFocus();
    await user.keyboard("y");

    expect(yearRangeCell).toHaveFocus();
  });
});
