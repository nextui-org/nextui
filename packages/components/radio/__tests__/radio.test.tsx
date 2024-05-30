import * as React from "react";
import {act, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {RadioGroup, Radio, RadioGroupProps} from "../src";

describe("Radio", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <RadioGroup label="Options">
        <Radio value="1">Option 1</Radio>
      </RadioGroup>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded - group", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <RadioGroup ref={ref} label="Options">
        <Radio value="1">Option 1</Radio>
      </RadioGroup>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("ref should be forwarded - option", () => {
    const ref = React.createRef<HTMLLabelElement>();

    render(
      <RadioGroup label="Options">
        <Radio ref={ref} value="1">
          Option 1
        </Radio>
      </RadioGroup>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should work correctly with initial value", () => {
    let {container} = render(
      <RadioGroup label="Options" value="1">
        <Radio data-testid="radio-test-1" value="1">
          Option 1
        </Radio>
      </RadioGroup>,
    );

    expect(container.querySelector("[data-testid=radio-test-1] input")).toBeChecked();

    let wrapper = render(
      <RadioGroup defaultValue="2" label="Options">
        <Radio value="1">Option 1</Radio>
        <Radio data-testid="radio-test-2" value="2">
          Option 1
        </Radio>
      </RadioGroup>,
    );

    expect(wrapper.container.querySelector("[data-testid=radio-test-2] input")).toBeChecked();
  });

  it("should change value after click", () => {
    const {container} = render(
      <RadioGroup defaultValue="1" label="Options">
        <Radio value="1">Option 1</Radio>
        <Radio className="radio-test-2" value="2">
          Option 1
        </Radio>
      </RadioGroup>,
    );

    let radio2 = container.querySelector(".radio-test-2 input") as HTMLInputElement;

    act(() => {
      radio2.click();
    });

    expect(radio2).toBeChecked();
  });

  it("should ignore events when disabled", () => {
    const {container} = render(
      <RadioGroup label="Options">
        <Radio isDisabled className="radio-test-1" value="1">
          Option 1
        </Radio>
        <Radio value="2">Option 2</Radio>
      </RadioGroup>,
    );

    let radio1 = container.querySelector(".radio-test-1 input") as HTMLInputElement;

    act(() => {
      radio1.click();
    });

    expect(radio1).not.toBeChecked();
  });

  it('should work correctly with "onValueChange" prop', () => {
    const onValueChange = jest.fn();

    const {container} = render(
      <RadioGroup defaultValue="1" label="Options" onValueChange={onValueChange}>
        <Radio value="1">Option 1</Radio>
        <Radio className="radio-test-2" value="2">
          Option 2
        </Radio>
      </RadioGroup>,
    );

    let radio2 = container.querySelector(".radio-test-2 input") as HTMLInputElement;

    act(() => {
      radio2.click();
    });

    expect(onValueChange).toBeCalledWith("2");

    expect(radio2).toBeChecked();
  });

  it('should work correctly with "onFocus" prop', () => {
    const onFocus = jest.fn();

    const {container} = render(
      <RadioGroup defaultValue="1" label="Options" onFocus={onFocus}>
        <Radio value="1">Option 1</Radio>
        <Radio className="radio-test-2" value="2">
          Option 2
        </Radio>
      </RadioGroup>,
    );

    let radio2 = container.querySelector(".radio-test-2 input") as HTMLInputElement;

    act(() => {
      radio2.focus();
    });

    expect(onFocus).toBeCalled();
  });

  it('should work correctly with "isRequired" prop', () => {
    const {getByRole, getAllByRole} = render(
      <RadioGroup isRequired label="Options" validationBehavior="native">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </RadioGroup>,
    );

    const group = getByRole("radiogroup");

    expect(group).toHaveAttribute("aria-required", "true");

    const radios = getAllByRole("radio");

    expect(radios[0]).toHaveAttribute("required");
  });

  it("should work correctly with controlled value", () => {
    const onValueChange = jest.fn();

    const Component = ({onValueChange}: Omit<RadioGroupProps, "value">) => {
      const [value, setValue] = React.useState("1");

      return (
        <RadioGroup
          label="Options"
          value={value}
          onValueChange={(next) => {
            setValue(next);
            onValueChange?.(next as any);
          }}
        >
          <Radio value="1">Option 1</Radio>
          <Radio className="radio-test-2" value="2">
            Option 2
          </Radio>
        </RadioGroup>
      );
    };

    const {container} = render(<Component onValueChange={onValueChange} />);

    let radio2 = container.querySelector(".radio-test-2 input") as HTMLInputElement;

    act(() => {
      radio2.click();
    });

    expect(onValueChange).toBeCalled();

    expect(radio2).toBeChecked();
  });
});

describe("validation", () => {
  let user = userEvent.setup();

  beforeAll(() => {
    user = userEvent.setup();
  });
  describe("validationBehavior=native", () => {
    it("supports isRequired", async () => {
      const {getAllByRole, getByRole, getByTestId} = render(
        <form data-testid="form">
          <RadioGroup isRequired aria-label="favorite pet" validationBehavior="native">
            <Radio value="dogs">Dogs</Radio>
            <Radio value="cats">Cats</Radio>
            <Radio value="dragons">Dragons</Radio>
          </RadioGroup>
        </form>,
      );

      const group = getByRole("radiogroup");

      expect(group).not.toHaveAttribute("aria-describedby");

      const radios = getAllByRole("radio") as HTMLInputElement[];

      for (let input of radios) {
        expect(input).toHaveAttribute("required");
        expect(input).not.toHaveAttribute("aria-required");
        expect(input.validity.valid).toBe(false);
      }

      act(() => {
        (getByTestId("form") as HTMLFormElement).checkValidity();
      });

      expect(group).toHaveAttribute("aria-describedby");
      expect(
        document.getElementById(group.getAttribute("aria-describedby") as string),
      ).toHaveTextContent("Constraints not satisfied");
      expect(document.activeElement).toBe(radios[0]);

      await user.click(radios[0]);
      for (let input of radios) {
        expect(input.validity.valid).toBe(true);
      }

      expect(group).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("validationBehavior=aria", () => {
    it("supports validate function", async () => {
      const {getAllByRole, getByRole} = render(
        <RadioGroup
          aria-label="favorite pet"
          defaultValue="dragons"
          validate={(v) => (v === "dragons" ? "Too scary" : null)}
          validationBehavior="aria"
        >
          <Radio value="dogs">Dogs</Radio>
          <Radio value="cats">Cats</Radio>
          <Radio value="dragons">Dragons</Radio>
        </RadioGroup>,
      );

      const group = getByRole("radiogroup");

      expect(group).toHaveAttribute("aria-describedby");
      expect(group).toHaveAttribute("aria-invalid", "true");
      expect(
        document.getElementById(group.getAttribute("aria-describedby") as string),
      ).toHaveTextContent("Too scary");

      const radios = getAllByRole("radio") as HTMLInputElement[];

      for (let input of radios) {
        expect(input.validity.valid).toBe(true);
      }

      await user.click(radios[0]);
      expect(group).not.toHaveAttribute("aria-describedby");
      expect(group).not.toHaveAttribute("aria-invalid");
    });
  });
});
