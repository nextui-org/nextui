import * as React from "react";
import {render} from "@testing-library/react";

import {DateInput} from "../src";

describe("DateInput", () => {
  it("should render correctly", () => {
    const wrapper = render(<DateInput />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<DateInput ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
