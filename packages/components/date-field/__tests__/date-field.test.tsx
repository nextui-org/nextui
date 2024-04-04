import * as React from "react";
import {render} from "@testing-library/react";

import {DateField} from "../src";

describe("DateField", () => {
  it("should render correctly", () => {
    const wrapper = render(<DateField />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<DateField ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
