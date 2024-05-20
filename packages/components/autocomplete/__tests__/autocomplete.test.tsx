import * as React from "react";
import {act, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Autocomplete, AutocompleteItem, AutocompleteSection} from "../src";
import {Modal, ModalContent, ModalBody, ModalHeader, ModalFooter} from "../../modal/src";

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

describe("Autocomplete", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" label="Favorite Animal">
        <AutocompleteItem key="penguin" value="penguin">
          Penguin
        </AutocompleteItem>
        <AutocompleteItem key="zebra" value="zebra">
          Zebra
        </AutocompleteItem>
        <AutocompleteItem key="shark" value="shark">
          Shark
        </AutocompleteItem>
      </Autocomplete>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(
      <Autocomplete ref={ref} aria-label="Favorite Animal" label="Favorite Animal">
        <AutocompleteItem key="penguin" value="penguin">
          Penguin
        </AutocompleteItem>
        <AutocompleteItem key="zebra" value="zebra">
          Zebra
        </AutocompleteItem>
        <AutocompleteItem key="shark" value="shark">
          Shark
        </AutocompleteItem>
      </Autocomplete>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should render correctly (dynamic)", () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" items={itemsData} label="Favorite Animal">
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (static)", () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" label="Favorite Animal">
        <AutocompleteSection title="Birds">
          <AutocompleteItem key="penguin" value="penguin">
            Penguin
          </AutocompleteItem>
        </AutocompleteSection>
        <AutocompleteSection title="Mammals">
          <AutocompleteItem key="zebra" value="zebra">
            Zebra
          </AutocompleteItem>
          <AutocompleteItem key="shark" value="shark">
            Shark
          </AutocompleteItem>
        </AutocompleteSection>
      </Autocomplete>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (dynamic)", () => {
    const wrapper = render(
      <Autocomplete aria-label="Favorite Animal" items={itemsSectionData} label="Favorite Animal">
        {(section) => (
          <AutocompleteSection<Item>
            aria-label={section.title}
            items={section.children}
            title={section.title}
          >
            {/* @ts-ignore TODO: fix section children types*/}
            {(item: Item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
          </AutocompleteSection>
        )}
      </Autocomplete>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should close dropdown when clicking outside autocomplete", async () => {
    const wrapper = render(
      <Autocomplete
        aria-label="Favorite Animal"
        data-testid="close-when-clicking-outside-test"
        label="Favorite Animal"
      >
        <AutocompleteItem key="penguin" value="penguin">
          Penguin
        </AutocompleteItem>
        <AutocompleteItem key="zebra" value="zebra">
          Zebra
        </AutocompleteItem>
        <AutocompleteItem key="shark" value="shark">
          Shark
        </AutocompleteItem>
      </Autocomplete>,
    );

    const autocomplete = wrapper.getByTestId("close-when-clicking-outside-test");

    // open the select dropdown
    await act(async () => {
      await userEvent.click(autocomplete);
    });

    // assert that the autocomplete dropdown is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    // click outside the autocomplete component
    await act(async () => {
      await userEvent.click(document.body);
    });

    // assert that the autocomplete is closed
    expect(autocomplete).toHaveAttribute("aria-expanded", "false");
  });

  it("should close dropdown when clicking outside autocomplete with modal open", async () => {
    const wrapper = render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>
            <Autocomplete
              aria-label="Favorite Animal"
              data-testid="close-when-clicking-outside-test"
              label="Favorite Animal"
            >
              <AutocompleteItem key="penguin" value="penguin">
                Penguin
              </AutocompleteItem>
              <AutocompleteItem key="zebra" value="zebra">
                Zebra
              </AutocompleteItem>
              <AutocompleteItem key="shark" value="shark">
                Shark
              </AutocompleteItem>
            </Autocomplete>
          </ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const autocomplete = wrapper.getByTestId("close-when-clicking-outside-test");

    // open the autocomplete dropdown
    await act(async () => {
      await userEvent.click(autocomplete);
    });

    // assert that the autocomplete dropdown is open
    expect(autocomplete).toHaveAttribute("aria-expanded", "true");

    // click outside the autocomplete component
    await act(async () => {
      await userEvent.click(document.body);
    });

    // assert that the autocomplete dropdown is closed
    expect(autocomplete).toHaveAttribute("aria-expanded", "false");
  });
});
