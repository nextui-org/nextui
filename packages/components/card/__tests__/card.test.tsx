import * as React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Card} from "../src";

describe("Card", () => {
  it("should render correctly", () => {
    const wrapper = render(<Card />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Card ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should support hoverable", () => {
    const wrapper = render(<Card isHoverable />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should be clicked when is pressable", () => {
    const onPress = jest.fn();
    const {container} = render(<Card isPressable onPress={onPress} />);

    userEvent.click(container.firstChild as HTMLElement);
    expect(onPress).toBeCalledTimes(1);
  });

  it("should render correctly when nested", () => {
    const wrapper = render(
      <Card>
        <Card />
      </Card>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should have a button role when is pressable", () => {
    const {container} = render(<Card isPressable />);

    expect(container.firstChild).toHaveAttribute("role", "button");
  });
});
