import * as React from "react";
import {render} from "@testing-library/react";

import {Autocomplete, AutocompleteItem, AutocompleteSection} from "../src";

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
});
