import * as React from "react";
import {render} from "@testing-library/react";

import {Tabs} from "../src";

describe("Tabs", () => {
  it("should render correctly", () => {
    const wrapper = render(<Tabs />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Tabs ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
