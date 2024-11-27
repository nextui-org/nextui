import * as React from "react";
import {act, render, fireEvent} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";

import {Table, TableHeader, TableCell, TableColumn, TableBody, TableRow} from "../src";
import {keyCodes} from "../../../utilities/test-utils/src";

const columns = [
  {name: "Foo", key: "foo"},
  {name: "Bar", key: "bar"},
  {name: "Baz", key: "baz"},
];

let items = [
  {test: "Test 1", foo: "Foo 1", bar: "Bar 1", yay: "Yay 1", baz: "Baz 1"},
  {test: "Test 2", foo: "Foo 2", bar: "Bar 2", yay: "Yay 2", baz: "Baz 2"},
];

describe("Table", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <Table aria-label="Test example table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>DATE MODIFIED</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Games</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>6/7/2020</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLTableElement>();

    render(
      <Table ref={ref} aria-label="Test example table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>DATE MODIFIED</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Games</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>6/7/2020</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should render a static table", () => {
    const wrapper = render(
      <Table aria-label="Static Table">
        <TableHeader>
          <TableColumn>Foo</TableColumn>
          <TableColumn>Bar</TableColumn>
          <TableColumn>Baz</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Foo 1</TableCell>
            <TableCell>Bar 1</TableCell>
            <TableCell>Baz 1</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table = wrapper.getByRole("grid");

    expect(table).toHaveAttribute("aria-label", "Static Table");

    // should have 3 "role=columnheader"
    expect(wrapper.getAllByRole("columnheader")).toHaveLength(3);

    // should have 2 "role=rowgroup"
    expect(wrapper.getAllByRole("rowgroup")).toHaveLength(2);

    // should have 2 "role=row" - 1 for header, 1 for body
    expect(wrapper.getAllByRole("row")).toHaveLength(2);

    // should have 2 "role=gridcell" - react-aria sets the first one as "rowheader"
    expect(wrapper.getAllByRole("rowheader")).toHaveLength(1);
    expect(wrapper.getAllByRole("gridcell")).toHaveLength(2);
  });

  it("should disable key navigations when isKeyboardNavigationDisabled is enabled", async () => {
    const wrapper = render(
      <Table isKeyboardNavigationDisabled={true} selectionMode="single">
        <TableHeader>
          <TableColumn>Foo</TableColumn>
          <TableColumn>Bar</TableColumn>
          <TableColumn>Baz</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Foo 1</TableCell>
            <TableCell>Bar 1</TableCell>
            <TableCell>Baz 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Foo 2</TableCell>
            <TableCell>Bar 2</TableCell>
            <TableCell>Baz 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const row1 = wrapper.getAllByRole("row")[1];

    // selecting the row1
    await act(async () => {
      await userEvent.click(row1);
    });
    expect(row1).toHaveFocus();

    // triggering the arrow down on row1 should not shift the focus to row2
    fireEvent.keyDown(row1, {key: "ArrowDown", keyCode: keyCodes.ArrowDown});
    expect(row1).toHaveFocus();
  });

  it("should render dynamic table", () => {
    const wrapper = render(
      <Table aria-label="Dynamic Table">
        <TableHeader columns={columns}>
          {(column) => <TableColumn>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.test}>
              <TableCell>{item.test}</TableCell>
              <TableCell>{item.foo}</TableCell>
              <TableCell>{item.bar}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>,
    );

    const table = wrapper.getByRole("grid");

    expect(table).toHaveAttribute("aria-label", "Dynamic Table");

    // should have 3 "role=columnheader"
    expect(wrapper.getAllByRole("columnheader")).toHaveLength(3);

    // should have 2 "role=rowgroup"
    expect(wrapper.getAllByRole("rowgroup")).toHaveLength(2);

    // should have 3 "role=row" - 1 for header, 2 for body
    expect(wrapper.getAllByRole("row")).toHaveLength(3);

    // should have 4 "role=gridcell" - 2 "rowheader"
    expect(wrapper.getAllByRole("rowheader")).toHaveLength(2);
    expect(wrapper.getAllByRole("gridcell")).toHaveLength(4);
  });

  it("should work with single selectionMode='single'", async () => {
    const onRowAction = jest.fn();

    const wrapper = render(
      <Table aria-label="Single Selection Table" selectionMode="single" onRowAction={onRowAction}>
        <TableHeader>
          <TableColumn>Foo</TableColumn>
          <TableColumn>Bar</TableColumn>
          <TableColumn>Baz</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Foo 1</TableCell>
            <TableCell>Bar 1</TableCell>
            <TableCell>Baz 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Foo 2</TableCell>
            <TableCell>Bar 2</TableCell>
            <TableCell>Baz 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table = wrapper.getByRole("grid");

    expect(table).toHaveAttribute("aria-label", "Single Selection Table");

    // get the first row
    const row1 = wrapper.getAllByRole("row")[1];

    await user.click(row1);
    expect(onRowAction).toHaveBeenCalledTimes(1);
  });

  it("should work with single selectionMode='multiple'", async () => {
    const onRowAction = jest.fn();

    const wrapper = render(
      <Table
        aria-label="Multiple Selection Table"
        selectionMode="multiple"
        onRowAction={onRowAction}
      >
        <TableHeader>
          <TableColumn>Foo</TableColumn>
          <TableColumn>Bar</TableColumn>
          <TableColumn>Baz</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Foo 1</TableCell>
            <TableCell>Bar 1</TableCell>
            <TableCell>Baz 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Foo 2</TableCell>
            <TableCell>Bar 2</TableCell>
            <TableCell>Baz 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table = wrapper.getByRole("grid");

    expect(table).toHaveAttribute("aria-label", "Multiple Selection Table");

    // get the first row
    const row1 = wrapper.getAllByRole("row")[1];
    const row2 = wrapper.getAllByRole("row")[2];

    await user.click(row1);
    await user.click(row2);

    expect(onRowAction).toHaveBeenCalledTimes(2);
  });

  it("should set the proper aria-sort on an ascending sorted column header", async () => {
    const wrapper = render(
      <Table aria-label="Static Table">
        <TableHeader>
          <TableColumn allowsSorting data-testid="test-sort-column">
            Foo
          </TableColumn>
          <TableColumn>Bar</TableColumn>
          <TableColumn>Baz</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Foo 1</TableCell>
            <TableCell>Bar 1</TableCell>
            <TableCell>Baz 1</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const column = wrapper.getByTestId("test-sort-column");

    expect(column).toHaveAttribute("aria-sort", "none");

    act(async () => {
      await userEvent.click(column);
      expect(column).toHaveAttribute("aria-sort", "ascending");
    });
  });
});
