import * as React from "react";
import {render} from "@testing-library/react";

import {ScrollShadow} from "../src";

describe("ScrollShadow", () => {
  it("should render correctly", () => {
    const wrapper = render(<ScrollShadow />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<ScrollShadow ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should support controlled visibility state", () => {
    const {getByTestId} = render(<ScrollShadow data-testid="scroll-shadow" visibility="top" />);

    // should have the data-top-scroll attribute in true
    expect(getByTestId("scroll-shadow")).toHaveAttribute("data-top-scroll", "true");
  });
});
