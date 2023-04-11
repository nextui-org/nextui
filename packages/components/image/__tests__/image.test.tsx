import * as React from "react";
import {render} from "@testing-library/react";

import {Image} from "../src";

describe("Image", () => {
  it("should render correctly", () => {
    const wrapper = render(<Image />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Image ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
