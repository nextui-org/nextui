import * as React from "react";
import {render} from "@testing-library/react";

import {Select} from "../src";

describe("Select", () => {
  it("should render correctly", () => {
    const wrapper = render(<Select />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Select ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
