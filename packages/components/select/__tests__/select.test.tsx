import * as React from "react";
import {render, renderHook, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {useForm} from "react-hook-form";

import {Select, SelectItem, SelectSection, type SelectProps} from "../src";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "../../modal/src";

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

  it("should work with dynamic placeholder and renderValue", async () => {
    const SelectWrapper = (props: {
      placeholder?: SelectProps["placeholder"];
      renderValue?: SelectProps["renderValue"];
    }) => {
      const {placeholder, renderValue} = props;

      return (
        <Select
          aria-label="Favorite Animal"
          data-testid="render-selected-item-test"
          label="Favorite Animal"
          placeholder={placeholder}
          renderValue={renderValue}
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
        </Select>
      );
    };

    const wrapper = render(<SelectWrapper placeholder="Select an animal" />);

    expect(wrapper.getByText("Select an animal")).toBeInTheDocument();

    wrapper.rerender(<SelectWrapper placeholder="Select an favorite animal" />);

    expect(wrapper.getByText("Select an favorite animal")).toBeInTheDocument();

    const select = wrapper.getByTestId("render-selected-item-test");

    await act(async () => {
      await userEvent.click(select);
    });

    const listboxItems = wrapper.getAllByRole("option");

    await act(async () => {
      await userEvent.click(listboxItems[0]);
    });

    expect(select).toHaveTextContent("Penguin");
    expect(wrapper.queryByText("Select an favorite animal")).toBe(null);

    wrapper.rerender(
      <SelectWrapper
        placeholder="Select an favorite animal"
        renderValue={(item) => `next ${item[0].textValue}`}
      />,
    );

    expect(wrapper.getByText("next Penguin")).toBeInTheDocument();
    expect(wrapper.queryByText("Select an favorite animal")).toBe(null);
  });

  it("should close dropdown when clicking outside select", async () => {
    const wrapper = render(
      <Select
        aria-label="Favorite Animal"
        data-testid="close-when-clicking-outside-test"
        label="Favorite Animal"
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

    const select = wrapper.getByTestId("close-when-clicking-outside-test");

    // open the select dropdown
    await act(async () => {
      await userEvent.click(select);
    });

    // assert that the select is open
    expect(select).toHaveAttribute("aria-expanded", "true");

    // click outside the select component
    await act(async () => {
      await userEvent.click(document.body);
    });

    // assert that the select is closed
    expect(select).toHaveAttribute("aria-expanded", "false");
  });

  it("should close dropdown when clicking outside select with modal open", async () => {
    const wrapper = render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>
            <Select
              aria-label="Favorite Animal"
              data-testid="close-when-clicking-outside-test"
              label="Favorite Animal"
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
            </Select>
          </ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const select = wrapper.getByTestId("close-when-clicking-outside-test");

    // open the select dropdown
    await act(async () => {
      await userEvent.click(select);
    });

    // assert that the select is open
    expect(select).toHaveAttribute("aria-expanded", "true");

    // click outside the select component
    await act(async () => {
      await userEvent.click(document.body);
    });

    // assert that the select is closed
    expect(select).toHaveAttribute("aria-expanded", "false");
  });

  it("disabled select shouldn't update by keyboard", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Select
        isDisabled
        aria-label="Favorite Animal"
        data-testid="test-select"
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
    const select = wrapper.getByTestId("test-select");

    await act(async () => {
      await userEvent.click(document.body);
      await userEvent.tab();
      await userEvent.type(select, "z", {skipClick: true});

      expect(onSelectionChange).toBeCalledTimes(0);
    });
  });
});

describe("Select with React Hook Form", () => {
  let select1: HTMLElement;
  let select2: HTMLElement;
  let select3: HTMLElement;
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
      register,
      formState: {errors},
      handleSubmit,
    } = result.current;

    onSubmit = jest.fn();

    wrapper = render(
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Select data-testid="select-1" items={itemsData} {...register("withDefaultValue")}>
          {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
        </Select>

        <Select data-testid="select-2" items={itemsData} {...register("withoutDefaultValue")}>
          {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
        </Select>

        <Select
          data-testid="select-3"
          items={itemsData}
          {...register("requiredField", {required: true})}
        >
          {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
        </Select>

        {errors.requiredField && <span className="text-danger">This field is required</span>}
        <button data-testid="submit-button" type="submit">
          Submit
        </button>
      </form>,
    );

    select1 = wrapper.getByTestId("select-1");
    select2 = wrapper.getByTestId("select-2");
    select3 = wrapper.getByTestId("select-3");
    submitButton = wrapper.getByTestId("submit-button");
  });

  it("should work with defaultValues", () => {
    expect(select1).toHaveTextContent("Cat");
    expect(select2).toHaveTextContent("");
    expect(select3).toHaveTextContent("");
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    const user = userEvent.setup();

    await user.click(select3);

    expect(select3).toHaveAttribute("aria-expanded", "true");

    let listboxItems = wrapper.getAllByRole("option");

    await user.click(listboxItems[1]);

    expect(select3).toHaveTextContent("Dog");

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
