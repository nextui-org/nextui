import * as React from "react";
import {render} from "@testing-library/react";

import {Badge} from "../src";

describe("Badge", () => {
  it("should render correctly", () => {
    const wrapper = render(<Badge>New</Badge>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(<Badge ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should render children and content", () => {
    const wrapper = render(
      <Badge content={<span data-testid="badge-content" />}>
        <span data-testid="badge-children">new</span>
      </Badge>,
    );

    expect(wrapper.getByTestId("badge-content")).toBeTruthy();
    expect(wrapper.getByTestId("badge-children")).toBeTruthy();
  });

  it("should not render children if variant is dot", () => {
    const wrapper = render(
      <Badge variant="dot">
        <span data-testid="badge-children">new</span>
      </Badge>,
    );

    expect(wrapper.queryAllByTestId("badge-children")).toHaveLength(0);
  });

  it("should not render children if variant is points", () => {
    const wrapper = render(
      <Badge variant="points">
        <span data-testid="badge-children">new</span>
      </Badge>,
    );

    expect(wrapper.queryAllByTestId("badge-children")).toHaveLength(0);
  });

  it("should have 3 points if variant is points", () => {
    const wrapper = render(<Badge variant="points" />);

    expect(wrapper.getAllByTestId("badge-point")).toHaveLength(3);
  });

  it("should be invisible if invisible is true", () => {
    const wrapper = render(
      <Badge isInvisible content={<span data-testid="badge-content" />} data-testid="badge-root">
        <span data-testid="badge-children">new</span>
      </Badge>,
    );

    expect(wrapper.getByTestId("badge-root")).toHaveClass("nextui-badge--is-invisible");
  });
});
