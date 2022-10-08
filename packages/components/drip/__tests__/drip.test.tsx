import * as React from "react";
import {render} from "@testing-library/react";

import { Drip } from "../src";

describe("Drip", () => {
  it("should render correctly", () => {
   const wrapper = render(<Drip />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Drip ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});