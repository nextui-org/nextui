import * as React from "react";
import {render} from "@testing-library/react";

import {Calendar} from "../src";

describe("Calendar", () => {
  it("should render correctly", () => {
    const wrapper = render(<Calendar />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Calendar ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
