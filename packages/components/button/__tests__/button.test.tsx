import * as React from "react";
import {act, render} from "@testing-library/react";

import {Button} from "../src";

describe("Button", () => {
  it("should render correctly", () => {
    const wrapper = render(<Button />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(<Button ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should trigger onPress function", () => {
    const onPress = jest.fn();
    const {getByRole} = render(<Button onPress={onPress} />);

    act(() => {
      getByRole("button").click();
    });

    expect(onPress).toHaveBeenCalled();
  });

  it("should show warning message when onClick is being used", () => {
    const onClick = jest.fn();
    const spy = jest.spyOn(console, "warn").mockImplementation(() => {});

    const wrapper = render(<Button onClick={onClick} />);

    act(() => {
      wrapper.getByRole("button").click();
    });

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("should ignore events when disabled", () => {
    const onPress = jest.fn();
    const {getByRole} = render(<Button disabled onPress={onPress} />);

    act(() => {
      getByRole("button").click();
    });

    expect(onPress).not.toHaveBeenCalled();
  });

  it("should renders with left icon", () => {
    const wrapper = render(
      <Button leftIcon={<span data-testid="left-icon">Icon</span>}>Button</Button>,
    );

    expect(wrapper.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("should renders with right icon", () => {
    const wrapper = render(
      <Button rightIcon={<span data-testid="right-icon">Icon</span>}>Button</Button>,
    );

    expect(wrapper.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("should have the proper type attribute", () => {
    const wrapper = render(<Button type="submit" />);

    expect(wrapper.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
