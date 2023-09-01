import * as React from "react";
import {act, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Listbox, ListboxItem, ListboxSection} from "../src";

describe("Listbox", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <Listbox aria-label="Actions" onAction={alert}>
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLUListElement>();

    render(
      <Listbox ref={ref} aria-label="Actions" onAction={alert}>
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should render correctly (static)", () => {
    const wrapper = render(
      <Listbox aria-label="Actions" onAction={alert}>
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly (dynamic)", () => {
    const listboxItems = [
      {key: "new", name: "New File"},
      {key: "copy", name: "Copy Link"},
      {key: "edit", name: "Edit File"},
      {key: "delete", name: "Delete File"},
    ];

    const wrapper = render(
      <Listbox aria-label="Actions" items={listboxItems}>
        {(item: any) => <ListboxItem key={item.key}>{item.name}</ListboxItem>}
      </Listbox>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (static)", () => {
    const wrapper = render(
      <Listbox aria-label="Actions" onAction={alert}>
        <ListboxSection title="Actions">
          <ListboxItem key="new">New file</ListboxItem>
          <ListboxItem key="copy">Copy link</ListboxItem>
        </ListboxSection>
        <ListboxSection title="Danger Zone">
          <ListboxItem key="edit">Edit file</ListboxItem>
          <ListboxItem key="delete" color="danger">
            Delete file
          </ListboxItem>
        </ListboxSection>
      </Listbox>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (dynamic)", () => {
    const listboxItems = [
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
      <Listbox aria-label="Actions" items={listboxItems}>
        {(section) => (
          <ListboxSection aria-label={section.title} items={section.children} title={section.title}>
            {(item) => <ListboxItem key={item.key}>{item.name}</ListboxItem>}
          </ListboxSection>
        )}
      </Listbox>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should work with single selection (controlled)", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Listbox
        disallowEmptySelection
        aria-label="Actions"
        selectionMode="single"
        onSelectionChange={onSelectionChange}
      >
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>,
    );

    let listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(4);

    await act(async () => {
      await userEvent.click(listboxItems[1]);

      expect(onSelectionChange).toBeCalledTimes(1);
    });
  });

  it("should work with multiple selection (controlled)", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Listbox
        disallowEmptySelection
        aria-label="Actions"
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      >
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>,
    );

    let listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(4);

    await act(async () => {
      await userEvent.click(listboxItems[0]);

      expect(onSelectionChange).toBeCalledTimes(1);
    });
  });

  it("should show checkmarks if selectionMode is single and has a selected item", () => {
    const wrapper = render(
      <Listbox aria-label="Actions" selectedKeys={["new"]} selectionMode="single">
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>,
    );

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(4);

    expect(listboxItems[0].getAttribute("aria-selected")).toBe("true");
    expect(listboxItems[1].getAttribute("aria-selected")).toBe("false");
    expect(listboxItems[2].getAttribute("aria-selected")).toBe("false");
    expect(listboxItems[3].getAttribute("aria-selected")).toBe("false");

    let svg = listboxItems[0].querySelector("svg");

    expect(svg).toBeTruthy();

    expect(svg?.getAttribute("data-selected")).toBe("true");
  });

  it("should show multiple checkmarks if selectionMode is multiple and has selected items", () => {
    const wrapper = render(
      <Listbox aria-label="Actions" selectedKeys={["new", "copy"]} selectionMode="multiple">
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>,
    );

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(4);

    expect(listboxItems[0].getAttribute("aria-selected")).toBe("true");
    expect(listboxItems[1].getAttribute("aria-selected")).toBe("true");
    expect(listboxItems[2].getAttribute("aria-selected")).toBe("false");
    expect(listboxItems[3].getAttribute("aria-selected")).toBe("false");

    let checkmark1 = listboxItems[0].querySelector("svg");

    expect(checkmark1).toBeTruthy();

    expect(checkmark1?.getAttribute("data-selected")).toBe("true");

    let checkmark2 = listboxItems[1].querySelector("svg");

    expect(checkmark2).toBeTruthy();

    expect(checkmark2?.getAttribute("data-selected")).toBe("true");
  });

  it("should not show checkmarks if selectionMode not defined", () => {
    const wrapper = render(
      <Listbox aria-label="Actions" selectedKeys={["new", "copy"]}>
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>,
    );

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(4);

    expect(listboxItems[0].getAttribute("aria-selected")).toBeFalsy();
    expect(listboxItems[1].getAttribute("aria-selected")).toBeFalsy();
    expect(listboxItems[2].getAttribute("aria-selected")).toBeFalsy();
    expect(listboxItems[3].getAttribute("aria-selected")).toBeFalsy();

    let checkmark1 = listboxItems[0].querySelector("svg");

    expect(checkmark1).toBeFalsy();
  });
});
