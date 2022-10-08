import * as React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

    getByRole("button").click();
    expect(onPress).toHaveBeenCalled();
  });

  it("should show warning message when onClick is being used", () => {
    const onClick = jest.fn();
    const spy = jest.spyOn(console, "warn").mockImplementation(() => {});

    const wrapper = render(<Button onClick={onClick} />);

    let button = wrapper.getByRole("button");

    userEvent.click(button);

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("should ignore events when disabled", () => {
    const onPress = jest.fn();
    const {getByRole} = render(<Button disabled onPress={onPress} />);

    getByRole("button").click();
    expect(onPress).not.toHaveBeenCalled();
  });

  it("should renders with left icon", () => {
    const wrapper = render(
      <Button icon={<span data-testid="left-icon">Icon</span>}>Button</Button>,
    );

    expect(wrapper.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("should renders with right icon", () => {
    const wrapper = render(
      <Button iconRight={<span data-testid="right-icon">Icon</span>}>Button</Button>,
    );

    expect(wrapper.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("should have the proper type attribute", () => {
    const wrapper = render(<Button type="submit" />);

    expect(wrapper.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
