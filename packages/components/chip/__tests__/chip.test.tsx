import * as React from "react";
import {render} from "@testing-library/react";

import {Chip} from "../src";

describe("Chip", () => {
  it("should render correctly", () => {
    const wrapper = render(<Chip />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Chip ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
