import * as React from "react";
import {render, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Checkbox, CheckboxProps} from "../src";

describe("Checkbox", () => {
  it("should render correctly", () => {
    const wrapper = render(<Checkbox>Label</Checkbox>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLLabelElement>();

    render(<Checkbox ref={ref}>Option</Checkbox>);
    expect(ref.current).not.toBeNull();
  });

  it("should work correctly with initial value", () => {
    let {container} = render(<Checkbox isSelected>Option</Checkbox>);

    expect(container.querySelector("input")?.checked).toBe(true);

    container = render(<Checkbox isSelected={false}>Option</Checkbox>).container;

    expect(container.querySelector("input")?.checked).toBe(false);
  });

  it("should change value after click", () => {
    const wrapper = render(<Checkbox data-testid="checkbox-test">Option</Checkbox>);
    const checkbox = wrapper.container.querySelector("input")!;

    expect(checkbox.checked).toBe(false);

    act(() => {
      wrapper.getByTestId("checkbox-test").click();
    });

    expect(checkbox.checked).toBe(true);
  });

  it("should ignore events when disabled", () => {
    const {container} = render(<Checkbox isDisabled>Option</Checkbox>);

    act(() => {
      userEvent.click(container.querySelector("label")!);
    });

    expect(container.querySelector("input")?.checked).toBe(false);
  });

  it("should work correctly with indeterminate value", () => {
    const {container} = render(<Checkbox isIndeterminate>Option</Checkbox>);

    expect(container.querySelector("input")?.indeterminate).toBe(true);
  });

  it('should work correctly with "onChange" prop', () => {
    const onChange = jest.fn();
    const wrapper = render(
      <Checkbox data-testid="checkbox-test" onChange={onChange}>
        Option
      </Checkbox>,
    );

    act(() => {
      wrapper.getByTestId("checkbox-test").click();
    });

    expect(onChange).toBeCalled();
  });

  it('should work correctly with "onFocus" prop', () => {
    const onFocus = jest.fn();
    const wrapper = render(
      <Checkbox data-testid="checkbox-test" onFocus={onFocus}>
        Option
      </Checkbox>,
    );

    const input = wrapper.container.querySelector("input")!;

    act(() => {
      input.focus();
    });

    expect(onFocus).toBeCalled();
  });

  it('should work correctly with "isRequired" prop', () => {
    const {container} = render(<Checkbox isRequired>Option</Checkbox>);

    expect(container.querySelector("input")?.required).toBe(true);
  });

  it("should work correctly with controlled value", () => {
    const onChange = jest.fn();

    const Component = (props: CheckboxProps) => {
      const [value, setValue] = React.useState(false);

      return (
        <Checkbox
          {...props}
          isSelected={value}
          onValueChange={(checked) => {
            act(() => {
              setValue(checked);
              onChange(checked);
            });
          }}
        />
      );
    };

    const wrapper = render(
      <Component data-testid="checkbox-test" onChange={onChange}>
        Option
      </Component>,
    );

    act(() => {
      wrapper.getByTestId("checkbox-test").click();
    });

    expect(onChange).toBeCalled();
  });
});
