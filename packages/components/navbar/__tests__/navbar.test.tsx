import * as React from "react";
import {render} from "@testing-library/react";

import {Navbar} from "../src";

describe("Navbar", () => {
  it("should render correctly", () => {
    const wrapper = render(<Navbar />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Navbar ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
