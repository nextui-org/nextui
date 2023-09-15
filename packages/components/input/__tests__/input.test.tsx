import * as React from "react";
import {render, waitFor} from "@testing-library/react";

import {Input} from "../src";

describe("Input", () => {
  it("should render correctly", () => {
    const wrapper = render(<Input label="test input" />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Input ref={ref} label="test input" />);
    expect(ref.current).not.toBeNull();
  });

  it("should have aria-invalid when invalid", () => {
    const {container} = render(<Input isInvalid={true} label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-invalid", "true");
  });

  it("should have aria-readonly when isReadOnly", () => {
    const {container} = render(<Input isReadOnly label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-readonly", "true");
  });

  it("should have disabled attribute when isDisabled", () => {
    const {container} = render(<Input isDisabled label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("disabled");
  });

  it("should have required attribute when isRequired", () => {
    const {container} = render(<Input isRequired label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("required");
    expect(container.querySelector("input")).toHaveAttribute("aria-required", "true");
  });

  it("should have aria-describedby when description is provided", () => {
    const {container} = render(<Input description="help text" label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have aria-describedby when errorMessage is provided", () => {
    const {container} = render(<Input errorMessage="error text" label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have the same aria-labelledby as label id", () => {
    const {container} = render(<Input label="test input" />);

    const labelId = container.querySelector("label")?.id;
    const labelledBy = container.querySelector("input")?.getAttribute("aria-labelledby");

    expect(labelledBy?.includes(labelId as string)).toBeTruthy();
  });

  it("should have the correct type attribute", () => {
    const {container} = render(<Input label="test input" type="email" />);

    expect(container.querySelector("input")).toHaveAttribute("type", "email");

    const {container: container2} = render(<Input label="test input" type="number" />);

    expect(container2.querySelector("input")).toHaveAttribute("type", "number");

    const {container: container3} = render(<Input label="test input" type="password" />);

    expect(container3.querySelector("input")).toHaveAttribute("type", "password");

    const {container: container4} = render(<Input label="test input" type="search" />);

    expect(container4.querySelector("input")).toHaveAttribute("type", "search");

    const {container: container5} = render(<Input label="test input" type="tel" />);

    expect(container5.querySelector("input")).toHaveAttribute("type", "tel");

    const {container: container6} = render(<Input label="test input" type="text" />);

    expect(container6.querySelector("input")).toHaveAttribute("type", "text");
  });

  it("should call dom event handlers only once", () => {
    const onFocus = jest.fn();

    const {container} = render(<Input label="test input" onFocus={onFocus} />);

    container.querySelector("input")?.focus();
    container.querySelector("input")?.blur();

    expect(onFocus).toHaveBeenCalledTimes(1);
  });
  it("ref should update the value", async () => {
    const ref = React.createRef<HTMLInputElement>();

    const {container} = render(<Input ref={ref} type="text" />);

    if (!ref.current) {
      throw new Error("ref is null");
    }
    const value = "value";

    ref.current!.value = value;

    container.querySelector("input")?.focus();

    await waitFor(() => {
      return expect(ref.current?.value)?.toBe(value);
    });
    await waitFor(() => {
      return expect(ref.current?.value)?.toBe(value);
    });
  });
});
