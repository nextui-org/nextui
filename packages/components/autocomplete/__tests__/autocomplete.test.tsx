import * as React from "react";
import {within, render, renderHook, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {useForm} from "react-hook-form";

import {Autocomplete, AutocompleteItem, AutocompleteProps, AutocompleteSection} from "../src";
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

const AutocompleteExample = (props: Partial<AutocompleteProps> = {}) => (
  <Autocomplete label="Favorite Animal" {...props}>
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
);

describe("Autocomplete", () => {
  it("should render correctly", () => {
    const wrapper = render(<AutocompleteExample />);

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

  describe("validation", () => {
    let user;

    beforeAll(() => {
      user = userEvent.setup();
    });

    describe("validationBehavior=native", () => {
      it("supports isRequired", async () => {
        const {getByTestId, getByRole, findByRole} = render(
          <form data-testid="form">
            <AutocompleteExample isRequired validationBehavior="native" />
          </form>,
        );

        const input = getByRole("combobox") as HTMLInputElement;

        expect(input).toHaveAttribute("required");
        expect(input).not.toHaveAttribute("aria-required");
        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(false);

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Constraints not satisfied",
        );

        await user.click(input);
        await user.keyboard("pe");

        const listbox = await findByRole("listbox");
        const items = within(listbox).getAllByRole("option");

        await user.click(items[0]);
        expect(input).toHaveAttribute("aria-describedby");
      });
    });

    describe("validationBehavior=aria", () => {
      it("supports validate function", async () => {
        let {getByRole, findByRole} = render(
          <form data-testid="form">
            <AutocompleteExample
              defaultInputValue="Penguin"
              validate={(v) => (v === "Penguin" ? "Invalid value" : null)}
              validationBehavior="aria"
            />
          </form>,
        );

        const input = getByRole("combobox") as HTMLInputElement;

        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid value",
        );
        expect(input.validity.valid).toBe(true);

        await user.tab();
        await user.click();
        // open the select dropdown
        await user.keyboard("{ArrowDown}");

        const listbox = await findByRole("listbox");
        const item = within(listbox).getByRole("option", {name: "Zebra"});

        await user.click(item);

        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input).not.toHaveAttribute("aria-invalid");
      });
    });
  });
});

describe("Autocomplete with React Hook Form", () => {
  let autocomplete1: HTMLInputElement;
  let autocomplete2: HTMLInputElement;
  let autocomplete3: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let wrapper: any;
  let onSubmit: () => void;

  beforeEach(() => {
    const {result} = renderHook(() =>
      useForm({
        defaultValues: {
          withDefaultValue: "cat",
          withoutDefaultValue: "",
          requiredField: "",
        },
      }),
    );

    const {
      handleSubmit,
      register,
      formState: {errors},
    } = result.current;

    onSubmit = jest.fn();

    wrapper = render(
      <form className="flex w-full max-w-xs flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          data-testid="autocomplete-1"
          {...register("withDefaultValue")}
          aria-label="Favorite Animal"
          items={itemsData}
          label="Favorite Animal"
        >
          {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        <Autocomplete
          data-testid="autocomplete-2"
          {...register("withoutDefaultValue")}
          aria-label="Favorite Animal"
          items={itemsData}
          label="Favorite Animal"
        >
          {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        <Autocomplete
          data-testid="autocomplete-3"
          {...register("requiredField", {required: true})}
          aria-label="Favorite Animal"
          items={itemsData}
          label="Favorite Animal"
        >
          {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        {errors.requiredField && <span className="text-danger">This field is required</span>}
        <button data-testid="submit-button" type="submit">
          Submit
        </button>
      </form>,
    );

    autocomplete1 = wrapper.getByTestId("autocomplete-1");
    autocomplete2 = wrapper.getByTestId("autocomplete-2");
    autocomplete3 = wrapper.getByTestId("autocomplete-3");
    submitButton = wrapper.getByTestId("submit-button");
  });

  it("should work with defaultValues", () => {
    expect(autocomplete1).toHaveValue("Cat");
    expect(autocomplete2).toHaveValue("");
    expect(autocomplete3).toHaveValue("");
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    const user = userEvent.setup();

    await user.click(autocomplete3);

    expect(autocomplete3).toHaveAttribute("aria-expanded", "true");

    let listboxItems = wrapper.getAllByRole("option");

    await user.click(listboxItems[1]);

    expect(autocomplete3).toHaveValue("Dog");

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
