import * as React from "react";
import {render} from "@testing-library/react";

import {Dropdown} from "../src";

describe("Dropdown", () => {
  it("should render correctly", () => {
    const wrapper = render(<Dropdown />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Dropdown ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
