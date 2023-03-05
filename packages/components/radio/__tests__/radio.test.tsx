import * as React from "react";
import {act, render} from "@testing-library/react";

import {RadioGroup, Radio, RadioProps} from "../src";

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

  it('should work correctly with "onChange" prop', () => {
    const onChange = jest.fn();

    const {container} = render(
      <RadioGroup defaultValue="1" label="Options" onChange={onChange}>
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

    expect(onChange).toBeCalledWith("2");

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
    const {container} = render(
      <RadioGroup isRequired label="Options">
        <Radio value="1">Option 1</Radio>
        <Radio className="radio-test-2" value="2">
          Option 2
        </Radio>
      </RadioGroup>,
    );

    let radio2 = container
      .querySelector(".radio-test-2")
      ?.querySelector("input") as HTMLInputElement;

    expect(radio2?.required).toBe(true);
  });

  it("should work correctly with controlled value", () => {
    const onChange = jest.fn();

    const Component = ({onChange}: Omit<RadioProps, "value">) => {
      const [value, setValue] = React.useState("1");

      return (
        <RadioGroup
          label="Options"
          value={value}
          onChange={(next) => {
            setValue(next);
            onChange?.(next as any);
          }}
        >
          <Radio value="1">Option 1</Radio>
          <Radio className="radio-test-2" value="2">
            Option 2
          </Radio>
        </RadioGroup>
      );
    };

    const {container} = render(<Component onChange={onChange} />);

    let radio2 = container.querySelector(".radio-test-2 input") as HTMLInputElement;

    act(() => {
      radio2.click();
    });

    expect(onChange).toBeCalled();

    expect(radio2).toBeChecked();
  });
});
