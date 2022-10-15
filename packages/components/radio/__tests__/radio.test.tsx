import * as React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Radio, RadioProps} from "../src";

describe("Radio", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <Radio.Group label="Options">
        <Radio value="1">Option 1</Radio>
      </Radio.Group>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLLabelElement>();

    render(
      <Radio.Group label="Options">
        <Radio ref={ref} value="1">
          Option 1
        </Radio>
      </Radio.Group>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should work correctly with initial value", () => {
    let {container} = render(
      <Radio.Group label="Options" value="1">
        <Radio value="1">Option 1</Radio>
      </Radio.Group>,
    );

    expect(container.querySelector("input")?.checked).toBe(true);

    let wrapper = render(
      <Radio.Group defaultValue="2" label="Options">
        <Radio value="1">Option 1</Radio>
        <Radio data-testid="radio-test-2" value="2">
          Option 1
        </Radio>
      </Radio.Group>,
    );

    let radio2 = wrapper.getByTestId("radio-test-2") as HTMLInputElement;

    expect(radio2?.checked).toBe(true);
  });

  it("should change value after click", () => {
    const {container} = render(
      <Radio.Group label="Options">
        <Radio value="1">Option 1</Radio>
        <Radio className="radio-test-2" value="2">
          Option 1
        </Radio>
      </Radio.Group>,
    );

    let radio2 = container
      .querySelector(".radio-test-2")
      ?.querySelector("input") as HTMLInputElement;

    // get by classname
    userEvent.click(radio2);

    expect(radio2?.checked).toBe(true);
  });

  it("should ignore events when disabled", () => {
    const {container} = render(
      <Radio.Group label="Options">
        <Radio isDisabled className="radio-test-1" value="1">
          Option 1
        </Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>,
    );

    let radio1 = container
      .querySelector(".radio-test-1")
      ?.querySelector("input") as HTMLInputElement;

    userEvent.click(radio1);

    expect(radio1?.checked).toBe(false);
  });

  it('should work correctly with "onChange" prop', () => {
    const onChange = jest.fn();
    const {container} = render(
      <Radio.Group label="Options" onChange={onChange}>
        <Radio value="1">Option 1</Radio>
        <Radio className="radio-test-2" value="2">
          Option 2
        </Radio>
      </Radio.Group>,
    );

    let radio2 = container
      .querySelector(".radio-test-2")
      ?.querySelector("input") as HTMLInputElement;

    userEvent.click(radio2);

    expect(onChange).toBeCalledWith("2");
    expect(radio2?.checked).toBe(true);
  });

  it('should work correctly with "onFocus" prop', () => {
    const onFocus = jest.fn();
    const {container} = render(
      <Radio.Group label="Options" onFocus={onFocus}>
        <Radio value="1">Option 1</Radio>
        <Radio className="radio-test-2" value="2">
          Option 2
        </Radio>
      </Radio.Group>,
    );

    let radio2 = container
      .querySelector(".radio-test-2")
      ?.querySelector("input") as HTMLInputElement;

    userEvent.click(radio2);

    expect(onFocus).toBeCalled();
  });

  it('should work correctly with "isRequired" prop', () => {
    const {container} = render(
      <Radio.Group isRequired label="Options">
        <Radio value="1">Option 1</Radio>
        <Radio className="radio-test-2" value="2">
          Option 2
        </Radio>
      </Radio.Group>,
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
        <Radio.Group
          label="Options"
          value={value}
          onChange={(next) => {
            setValue(next);
            onChange?.(next);
          }}
        >
          <Radio value="1">Option 1</Radio>
          <Radio className="radio-test-2" value="2">
            Option 2
          </Radio>
        </Radio.Group>
      );
    };

    const {container} = render(<Component onChange={onChange} />);

    let radio2 = container
      .querySelector(".radio-test-2")
      ?.querySelector("input") as HTMLInputElement;

    userEvent.click(radio2);

    expect(onChange).toBeCalled();

    expect(radio2?.checked).toBe(true);
  });
});
