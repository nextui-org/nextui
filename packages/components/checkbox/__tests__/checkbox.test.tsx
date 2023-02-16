import * as React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Checkbox, CheckboxProps} from "../src";

describe("Checkbox", () => {
  it("should render correctly", () => {
    const wrapper = render(<Checkbox>Label</Checkbox>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLLabelElement>();

    render(<Checkbox ref={ref} label="checkbox-test" />);
    expect(ref.current).not.toBeNull();
  });

  it("should work correctly with initial value", () => {
    let {container} = render(<Checkbox isSelected label="checkbox-test" />);

    expect(container.querySelector("input")?.checked).toBe(true);

    container = render(<Checkbox isSelected={false} label="checkbox-test" />).container;

    expect(container.querySelector("input")?.checked).toBe(false);
  });

  it("should change value after click", () => {
    const {container} = render(<Checkbox label="checkbox-test" />);

    userEvent.click(container.querySelector("label")!);

    expect(container.querySelector("input")?.checked).toBe(true);
  });

  it("should ignore events when disabled", () => {
    const {container} = render(<Checkbox isDisabled label="checkbox-test" />);

    userEvent.click(container.querySelector("label")!);

    expect(container.querySelector("input")?.checked).toBe(false);
  });

  it("should work correctly with indeterminate value", () => {
    const {container} = render(<Checkbox isIndeterminate label="checkbox-test" />);

    expect(container.querySelector("input")?.indeterminate).toBe(true);
  });

  it('should work correctly with "onChange" prop', () => {
    const onChange = jest.fn();
    const {container} = render(<Checkbox label="checkbox-test" onChange={onChange} />);

    userEvent.click(container.querySelector("label")!);

    expect(onChange).toBeCalled();
  });

  it('should work correctly with "onFocus" prop', () => {
    const onFocus = jest.fn();
    const {container} = render(<Checkbox label="checkbox-test" onFocus={onFocus} />);

    userEvent.click(container.querySelector("label")!);

    expect(onFocus).toBeCalled();
  });

  it('should work correctly with "isRequired" prop', () => {
    const {container} = render(<Checkbox isRequired label="checkbox-test" />);

    expect(container.querySelector("input")?.required).toBe(true);
  });

  // it("should work correctly with controlled value", () => {
  //   const onChange = jest.fn();

  //   const Component = (props: CheckboxProps) => {
  //     const [value, setValue] = React.useState(false);

  //     return (
  //       <Checkbox
  //         {...props}
  //         isSelected={value}
  //         onChange={(checked) => {
  //           setValue(checked);
  //           onChange(checked);
  //         }}
  //       />
  //     );
  //   };

  //   const {container} = render(<Component label="checkbox-test" onChange={onChange} />);

  //   userEvent.click(container.querySelector("label")!);

  //   expect(onChange).toBeCalled();

  //   expect(container.querySelector("input")?.getAttribute("aria-checked")).toBe("true");
  // });
});
