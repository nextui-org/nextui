import * as React from "react";
import {render} from "@testing-library/react";

import {Menu} from "../src";

describe("Menu", () => {
  it("should render correctly", () => {
    const wrapper = render(<Menu />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Menu ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
