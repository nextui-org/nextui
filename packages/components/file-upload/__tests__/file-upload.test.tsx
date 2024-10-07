import * as React from "react";
import {render} from "@testing-library/react";

import {FileUpload} from "../src";

describe("FileUpload", () => {
  it("should render correctly", () => {
    const wrapper = render(<FileUpload />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<FileUpload ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
