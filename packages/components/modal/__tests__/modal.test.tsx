import * as React from "react";
import {render} from "@testing-library/react";

import {Modal} from "../src";

describe("Modal", () => {
  it("should render correctly", () => {
    const wrapper = render(<Modal />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Modal ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
