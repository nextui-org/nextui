import * as React from "react";
import {render} from "@testing-library/react";

import {Skeleton} from "../src";

describe("Skeleton", () => {
  it("should render correctly", () => {
    const wrapper = render(<Skeleton />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Skeleton ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
