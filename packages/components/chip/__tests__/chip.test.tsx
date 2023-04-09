import * as React from "react";
import {render} from "@testing-library/react";
import {Avatar} from "@nextui-org/avatar";
import {act} from "@testing-library/react-hooks";

import {Chip} from "../src";

describe("Chip", () => {
  it("should render correctly", () => {
    const wrapper = render(<Chip />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Chip ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should render with dot variant", () => {
    const wrapper = render(<Chip variant="dot" />);

    expect(wrapper.container.querySelector("span")).not.toBeNull();
  });

  it("should support avatar", () => {
    const wrapper = render(<Chip avatar={<Avatar data-testid="avatar" />} />);

    expect(wrapper.getByTestId("avatar")).not.toBeNull();
  });

  it("should support startContent", () => {
    const wrapper = render(<Chip startContent={<span data-testid="start-icon" />} />);

    expect(wrapper.getByTestId("start-icon")).not.toBeNull();
  });

  it("should support endContent", () => {
    const wrapper = render(<Chip avatar={<span data-testid="close-icon" />} />);

    expect(wrapper.getByTestId("close-icon")).not.toBeNull();
  });

  it("should display a close button if onClose is passed", () => {
    const wrapper = render(<Chip onClose={() => {}} />);

    expect(wrapper.getByRole("button")).not.toBeNull();
  });

  it("should call onClose when close button is clicked", () => {
    const onClose = jest.fn();
    const {getByRole} = render(<Chip onClose={onClose} />);

    act(() => {
      getByRole("button").click();
    });

    expect(onClose).toHaveBeenCalled();
  });
});
