import * as React from "react";
import {render} from "@testing-library/react";

import {Container} from "../src";

describe("Container", () => {
  it("should render correctly", () => {
    const wrapper = render(<Container />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Container ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
