import * as React from "react";
import {render} from "@testing-library/react";

import {InputOtp} from "../src";

describe("InputOtp", () => {
  it("should render correctly", () => {
    const wrapper = render(<InputOtp />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<InputOtp ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
