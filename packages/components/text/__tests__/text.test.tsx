import * as React from "react";
import {render} from "@testing-library/react";

import {Text} from "../src";

describe("Text", () => {
  it("should render correctly", () => {
    const wrapper = render(<Text />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLParagraphElement>();

    render(<Text ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should render P element in the default", () => {
    const {container} = render(<Text />);

    expect(container.querySelector("p")).not.toBeNull();
  });

  it("should work with different colors", () => {
    const {container} = render(<Text color="secondary" />);

    expect(container.querySelector("p")).toHaveStyle("color: var(--nextui-colors-secondary)");
  });

  it("the specified element should be rendered", () => {
    const {container} = render(<Text h1 />);

    expect(container.querySelector("h1")).not.toBeNull();
  });

  it("should work with different sizes", () => {
    const {container} = render(<Text size="$sm" />);

    expect(container.querySelector("p")).toHaveStyle("font-size: var(--nextui-fontSizes-sm)");
  });

  it("should work with combined styles", () => {
    const {container} = render(<Text b del />);

    expect(container.querySelector("b")).toContainHTML("del");
  });
});
