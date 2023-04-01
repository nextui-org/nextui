import * as React from "react";
import {render} from "@testing-library/react";

import {Input} from "../src";

describe("Input", () => {
  it("should render correctly", () => {
    const wrapper = render(<Input />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Input ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
