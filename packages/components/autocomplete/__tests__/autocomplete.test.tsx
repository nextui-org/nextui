import * as React from "react";
import {render} from "@testing-library/react";

import { Autocomplete } from "../src";

describe("Autocomplete", () => {
  it("should render correctly", () => {
   const wrapper = render(<Autocomplete />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Autocomplete ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
