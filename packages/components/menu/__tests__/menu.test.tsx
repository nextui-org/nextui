import * as React from "react";
import {act, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Menu, MenuItem, MenuSection} from "../src";

describe("Menu", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <Menu aria-label="Actions" onAction={alert}>
        <MenuItem key="new">New file</MenuItem>
        <MenuItem key="copy">Copy link</MenuItem>
        <MenuItem key="edit">Edit file</MenuItem>
        <MenuItem key="delete" color="danger">
          Delete file
        </MenuItem>
      </Menu>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLUListElement>();

    render(
      <Menu ref={ref} aria-label="Actions" onAction={alert}>
        <MenuItem key="new">New file</MenuItem>
        <MenuItem key="copy">Copy link</MenuItem>
        <MenuItem key="edit">Edit file</MenuItem>
        <MenuItem key="delete" color="danger">
          Delete file
        </MenuItem>
      </Menu>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should render correctly (static)", () => {
    const wrapper = render(
      <Menu aria-label="Actions" onAction={alert}>
        <MenuItem key="new">New file</MenuItem>
        <MenuItem key="copy">Copy link</MenuItem>
        <MenuItem key="edit">Edit file</MenuItem>
        <MenuItem key="delete" color="danger">
          Delete file
        </MenuItem>
      </Menu>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly (dynamic)", () => {
    const menuItems = [
      {key: "new", name: "New File"},
      {key: "copy", name: "Copy Link"},
      {key: "edit", name: "Edit File"},
      {key: "delete", name: "Delete File"},
    ];

    const wrapper = render(
      <Menu aria-label="Actions" items={menuItems}>
        {(item: any) => <MenuItem key={item.key}>{item.name}</MenuItem>}
      </Menu>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (static)", () => {
    const wrapper = render(
      <Menu aria-label="Actions" onAction={alert}>
        <MenuSection title="Actions">
          <MenuItem key="new">New file</MenuItem>
          <MenuItem key="copy">Copy link</MenuItem>
        </MenuSection>
        <MenuSection title="Danger Zone">
          <MenuItem key="edit">Edit file</MenuItem>
          <MenuItem key="delete" color="danger">
            Delete file
          </MenuItem>
        </MenuSection>
      </Menu>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (dynamic)", () => {
    const menuItems = [
      {
        key: "actions",
        title: "Actions",
        children: [
          {key: "new", name: "New File"},
          {key: "copy", name: "Copy Link"},
          {key: "edit", name: "Edit File"},
        ],
      },
      {
        key: "danger",
        title: "Danger Zone",
        children: [{key: "delete", name: "Delete File"}],
      },
    ];

    const wrapper = render(
      <Menu aria-label="Actions" items={menuItems}>
        {(section: any) => (
          <MenuSection aria-label={section.title} items={section.children} title={section.title}>
            {(item: any) => <MenuItem key={item.key}>{item.name}</MenuItem>}
          </MenuSection>
        )}
      </Menu>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should work with single selection (controlled)", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Menu
        disallowEmptySelection
        aria-label="Actions"
        selectionMode="single"
        onSelectionChange={onSelectionChange}
      >
        <MenuItem key="new">New file</MenuItem>
        <MenuItem key="copy">Copy link</MenuItem>
        <MenuItem key="edit">Edit file</MenuItem>
        <MenuItem key="delete" color="danger">
          Delete file
        </MenuItem>
      </Menu>,
    );

    let menu = wrapper.getByRole("menu");

    expect(menu).toBeTruthy();

    let menuItems = wrapper.getAllByRole("menuitemradio");

    expect(menuItems.length).toBe(4);

    await act(async () => {
      await userEvent.click(menuItems[1]);

      expect(onSelectionChange).toBeCalledTimes(1);
    });
  });

  it("should work with multiple selection (controlled)", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Menu
        disallowEmptySelection
        aria-label="Actions"
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      >
        <MenuItem key="new">New file</MenuItem>
        <MenuItem key="copy">Copy link</MenuItem>
        <MenuItem key="edit">Edit file</MenuItem>
        <MenuItem key="delete" color="danger">
          Delete file
        </MenuItem>
      </Menu>,
    );

    let menu = wrapper.getByRole("menu");

    expect(menu).toBeTruthy();

    let menuItems = wrapper.getAllByRole("menuitemcheckbox");

    expect(menuItems.length).toBe(4);

    await act(async () => {
      await userEvent.click(menuItems[0]);

      expect(onSelectionChange).toBeCalledTimes(1);
    });
  });

  it("should show checkmarks if selectionMode is single and has a selected item", () => {
    const wrapper = render(
      <Menu aria-label="Actions" selectedKeys={["new"]} selectionMode="single">
        <MenuItem key="new">New file</MenuItem>
        <MenuItem key="copy">Copy link</MenuItem>
        <MenuItem key="edit">Edit file</MenuItem>
        <MenuItem key="delete" color="danger">
          Delete file
        </MenuItem>
      </Menu>,
    );

    let menuItems = wrapper.getAllByRole("menuitemradio");

    expect(menuItems.length).toBe(4);

    expect(menuItems[0].getAttribute("aria-checked")).toBe("true");
    expect(menuItems[1].getAttribute("aria-checked")).toBe("false");
    expect(menuItems[2].getAttribute("aria-checked")).toBe("false");
    expect(menuItems[3].getAttribute("aria-checked")).toBe("false");

    let svg = menuItems[0].querySelector("svg");

    expect(svg).toBeTruthy();

    expect(svg?.getAttribute("data-selected")).toBe("true");
  });

  it("should show multiple checkmarks if selectionMode is multiple and has selected items", () => {
    const wrapper = render(
      <Menu aria-label="Actions" selectedKeys={["new", "copy"]} selectionMode="multiple">
        <MenuItem key="new">New file</MenuItem>
        <MenuItem key="copy">Copy link</MenuItem>
        <MenuItem key="edit">Edit file</MenuItem>
        <MenuItem key="delete" color="danger">
          Delete file
        </MenuItem>
      </Menu>,
    );

    let menuItems = wrapper.getAllByRole("menuitemcheckbox");

    expect(menuItems.length).toBe(4);

    expect(menuItems[0].getAttribute("aria-checked")).toBe("true");
    expect(menuItems[1].getAttribute("aria-checked")).toBe("true");
    expect(menuItems[2].getAttribute("aria-checked")).toBe("false");
    expect(menuItems[3].getAttribute("aria-checked")).toBe("false");

    let checkmark1 = menuItems[0].querySelector("svg");

    expect(checkmark1).toBeTruthy();

    expect(checkmark1?.getAttribute("data-selected")).toBe("true");

    let checkmark2 = menuItems[1].querySelector("svg");

    expect(checkmark2).toBeTruthy();

    expect(checkmark2?.getAttribute("data-selected")).toBe("true");
  });

  it("should not show checkmarks if selectionMode not defined", () => {
    const wrapper = render(
      <Menu aria-label="Actions" selectedKeys={["new", "copy"]}>
        <MenuItem key="new">New file</MenuItem>
        <MenuItem key="copy">Copy link</MenuItem>
        <MenuItem key="edit">Edit file</MenuItem>
        <MenuItem key="delete" color="danger">
          Delete file
        </MenuItem>
      </Menu>,
    );

    let menuItems = wrapper.getAllByRole("menuitem");

    expect(menuItems.length).toBe(4);

    expect(menuItems[0].getAttribute("aria-checked")).toBeFalsy();
    expect(menuItems[1].getAttribute("aria-checked")).toBeFalsy();
    expect(menuItems[2].getAttribute("aria-checked")).toBeFalsy();
    expect(menuItems[3].getAttribute("aria-checked")).toBeFalsy();

    let checkmark1 = menuItems[0].querySelector("svg");

    expect(checkmark1).toBeFalsy();
  });
});
