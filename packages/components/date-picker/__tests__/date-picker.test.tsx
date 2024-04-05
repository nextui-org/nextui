import * as React from "react";
import {render} from "@testing-library/react";

import {DatePicker} from "../src";

describe("DatePicker", () => {
  it("should render correctly", () => {
    const wrapper = render(<DatePicker />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<DatePicker ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
