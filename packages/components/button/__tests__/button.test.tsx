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

  it("should ignore events when disabled", () => {
    const onPress = jest.fn();
    const {getByRole} = render(<Button disabled onPress={onPress} />);

    act(() => {
      getByRole("button").click();
    });

    expect(onPress).not.toHaveBeenCalled();
  });

  it("should renders with start icon", () => {
    const wrapper = render(
      <Button startIcon={<span data-testid="start-icon">Icon</span>}>Button</Button>,
    );

    expect(wrapper.getByTestId("start-icon")).toBeInTheDocument();
  });

  it("should renders with end icon", () => {
    const wrapper = render(
      <Button endIcon={<span data-testid="end-icon">Icon</span>}>Button</Button>,
    );

    expect(wrapper.getByTestId("end-icon")).toBeInTheDocument();
  });

  it("should have the proper type attribute", () => {
    const wrapper = render(<Button type="submit" />);

    expect(wrapper.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
