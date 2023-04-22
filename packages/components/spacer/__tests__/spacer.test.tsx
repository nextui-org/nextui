import * as React from "react";
import {render} from "@testing-library/react";

import {Spacer} from "../src";

describe("Spacer", () => {
  it("should render correctly", () => {
    const wrapper = render(<Spacer />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Spacer ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
