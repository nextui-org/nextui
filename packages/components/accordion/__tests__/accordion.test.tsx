import * as React from "react";
import {render} from "@testing-library/react";

import {Accordion} from "../src";

describe("Accordion", () => {
  it("should render correctly", () => {
    const wrapper = render(<Accordion />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Accordion ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
