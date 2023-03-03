import * as React from "react";
import {render} from "@testing-library/react";
import {Avatar} from "@nextui-org/avatar";

import {Badge} from "../src";

const content = <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />;

describe("Badge", () => {
  it("should render correctly", () => {
    const wrapper = render(<Badge>New</Badge>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(<Badge ref={ref}>{content}</Badge>);
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

  it("should be invisible if invisible is true", () => {
    const wrapper = render(
      <Badge isInvisible content={<span data-testid="badge-content" />} data-testid="badge-root">
        <span data-testid="badge-children">new</span>
      </Badge>,
    );

    expect(wrapper.getByTestId("badge-root")).toHaveAttribute("data-invisible", "true");
  });
});
