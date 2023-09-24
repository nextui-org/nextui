import * as React from "react";
import {render} from "@testing-library/react";

import {Slider} from "../src";

describe("Slider", () => {
  it("should render correctly", () => {
    const wrapper = render(<Slider />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Slider ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
