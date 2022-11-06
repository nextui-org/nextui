import * as React from "react";
import {render} from "@testing-library/react";

import {Snippet} from "../src";

describe("Snippet", () => {
  it("should render correctly", () => {
    const wrapper = render(<Snippet />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Snippet ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
