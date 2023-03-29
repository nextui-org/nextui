import * as React from "react";
import {render} from "@testing-library/react";

import {Progress} from "../src";

describe("Progress", () => {
  it("should render correctly", () => {
    const wrapper = render(<Progress />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Progress ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
