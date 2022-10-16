import * as React from "react";
import {render} from "@testing-library/react";

import { Collapse } from "../src";

describe("Collapse", () => {
  it("should render correctly", () => {
   const wrapper = render(<Collapse />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Collapse ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});