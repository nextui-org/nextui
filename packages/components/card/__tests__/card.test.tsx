import * as React from "react";
import {render} from "@testing-library/react";
import {act} from "@testing-library/react-hooks";

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
    const {getByRole} = render(<Card disableRipple isPressable onPress={onPress} />);

    const button = getByRole("button");

    act(() => {
      button.click();
    });

    expect(onPress).toHaveBeenCalled();
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
    const {container} = render(<Card disableRipple isPressable />);

    expect(container.firstChild).toHaveAttribute("role", "button");
  });
});
