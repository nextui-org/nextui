import * as React from "react";
import {act, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Select, SelectItem, SelectSection} from "../src";

type Item = {
  label: string;
  value: string;
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

const itemsSectionData = [
  {
    key: "mammals",
    title: "Mammals",
    children: [
      {key: "lion", label: "Lion", value: "lion"},
      {key: "tiger", label: "Tiger", value: "tiger"},
      {key: "elephant", label: "Elephant", value: "elephant"},
    ],
  },
  {
    key: "birds",
    title: "Birds",
    children: [
      {key: "penguin", label: "Penguin", value: "penguin"},
      {key: "ostrich", label: "Ostrich", value: "ostrich"},
      {key: "peacock", label: "Peacock", value: "peacock"},
    ],
  },
];

describe("Select", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <Select aria-label="Favorite Animal" label="Favorite Animal">
        <SelectItem key="penguin" value="penguin">
          Penguin
        </SelectItem>
        <SelectItem key="zebra" value="zebra">
          Zebra
        </SelectItem>
        <SelectItem key="shark" value="shark">
          Shark
        </SelectItem>
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLSelectElement>();

    render(
      <Select ref={ref} aria-label="Favorite Animal" label="Favorite Animal">
        <SelectItem key="penguin" value="penguin">
          Penguin
        </SelectItem>
        <SelectItem key="zebra" value="zebra">
          Zebra
        </SelectItem>
        <SelectItem key="shark" value="shark">
          Shark
        </SelectItem>
      </Select>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should render correctly (dynamic)", () => {
    const wrapper = render(
      <Select aria-label="Favorite Animal" items={itemsData} label="Favorite Animal">
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (static)", () => {
    const wrapper = render(
      <Select aria-label="Favorite Animal" label="Favorite Animal">
        <SelectSection title="Birds">
          <SelectItem key="penguin" value="penguin">
            Penguin
          </SelectItem>
        </SelectSection>
        <SelectSection title="Mammals">
          <SelectItem key="zebra" value="zebra">
            Zebra
          </SelectItem>
          <SelectItem key="shark" value="shark">
            Shark
          </SelectItem>
        </SelectSection>
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (dynamic)", () => {
    const wrapper = render(
      <Select aria-label="Favorite Animal" items={itemsSectionData} label="Favorite Animal">
        {(section) => (
          <SelectSection<Item>
            aria-label={section.title}
            items={section.children}
            title={section.title}
          >
            {/* @ts-ignore TODO: fix section children types*/}
            {(item: Item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
          </SelectSection>
        )}
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should work with single selection (controlled)", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Select
        disallowEmptySelection
        isOpen
        aria-label="Favorite Animal"
        label="Favorite Animal"
        selectionMode="single"
        value="penguin"
        onSelectionChange={onSelectionChange}
      >
        <SelectItem key="penguin" value="penguin">
          Penguin
        </SelectItem>
        <SelectItem key="zebra" value="zebra">
          Zebra
        </SelectItem>
        <SelectItem key="shark" value="shark">
          Shark
        </SelectItem>
      </Select>,
    );

    let listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(3);

    await act(async () => {
      await userEvent.click(listboxItems[1]);

      expect(onSelectionChange).toBeCalledTimes(1);
    });
  });

  it("should work with multiple selection (controlled)", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Select
        disallowEmptySelection
        isOpen
        aria-label="Favorite Animal"
        label="Favorite Animal"
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      >
        <SelectItem key="penguin" value="penguin">
          Penguin
        </SelectItem>
        <SelectItem key="zebra" value="zebra">
          Zebra
        </SelectItem>
        <SelectItem key="shark" value="shark">
          Shark
        </SelectItem>
      </Select>,
    );

    let listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(3);

    await act(async () => {
      await userEvent.click(listboxItems[1]);
      await userEvent.click(listboxItems[2]);

      expect(onSelectionChange).toBeCalledTimes(2);
    });
  });
});
