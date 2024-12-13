import "@testing-library/jest-dom";
import * as React from "react";
import {render} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";

import {Button} from "../src";

describe("Button", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(<Button disableRipple />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(<Button ref={ref} disableRipple />);
    expect(ref.current).not.toBeNull();
  });

  it("should trigger onPress function", async () => {
    const onPress = jest.fn();
    const {getByRole} = render(<Button disableRipple onPress={onPress} />);

    const button = getByRole("button");

    await user.click(button);

    expect(onPress).toHaveBeenCalled();
  });

  it("should trigger onClick function", async () => {
    const onClick = jest.fn();
    const {getByRole} = render(<Button disableRipple onClick={onClick} />);

    const button = getByRole("button");

    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should ignore events when disabled", async () => {
    const onPress = jest.fn();
    const {getByRole} = render(<Button disableRipple isDisabled onPress={onPress} />);

    const button = getByRole("button");

    await user.click(button);

    expect(onPress).not.toHaveBeenCalled();
  });

  it("should renders with start icon", () => {
    const wrapper = render(
      <Button disableRipple startContent={<span data-testid="start-icon">Icon</span>}>
        Button
      </Button>,
    );

    expect(wrapper.getByTestId("start-icon")).toBeInTheDocument();
  });

  it("should renders with end icon", () => {
    const wrapper = render(
      <Button disableRipple endContent={<span data-testid="end-icon">Icon</span>}>
        Button
      </Button>,
    );

    expect(wrapper.getByTestId("end-icon")).toBeInTheDocument();
  });

  it("should have the proper type attribute", () => {
    const wrapper = render(<Button disableRipple type="submit" />);

    expect(wrapper.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
