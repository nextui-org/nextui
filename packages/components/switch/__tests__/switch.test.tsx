import * as React from "react";
import {render} from "@testing-library/react";

import {Switch} from "../src";

describe("Switch", () => {
  it("should render correctly", () => {
    const wrapper = render(<Switch />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Switch ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
