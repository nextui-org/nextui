import * as React from "react";
import {render} from "@testing-library/react";

import {Link} from "../src";

describe("Link", () => {
  it("should render correctly", () => {
    const wrapper = render(<Link />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Link ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
