import * as React from "react";
import {render} from "@testing-library/react";

import {Avatar} from "../src";

describe("Avatar", () => {
  it("should render correctly", () => {
    const wrapper = render(<Avatar />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Avatar ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
