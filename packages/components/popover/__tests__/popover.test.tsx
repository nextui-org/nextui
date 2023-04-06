import * as React from "react";
import {render} from "@testing-library/react";

import {Popover} from "../src";

describe("Popover", () => {
  it("should render correctly", () => {
    const wrapper = render(<Popover />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Popover ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
