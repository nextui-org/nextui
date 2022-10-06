import * as React from "react";
import {render} from "@testing-library/react";

import {Code} from "../src";

describe("Code", () => {
  it("should render correctly", () => {
    const wrapper = render(<Code />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Code ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should support block mode", () => {
    const {container} = render(<Code block />);

    expect(container.querySelector("pre")).not.toBeNull();
  });
});
