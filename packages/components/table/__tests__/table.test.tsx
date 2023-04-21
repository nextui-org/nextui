import * as React from "react";
import {render} from "@testing-library/react";

import {Table} from "../src";

describe("Table", () => {
  it("should render correctly", () => {
    const wrapper = render(<Table />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Table ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
