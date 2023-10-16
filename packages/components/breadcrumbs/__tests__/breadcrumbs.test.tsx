import * as React from "react";
import {render} from "@testing-library/react";

import {Breadcrumbs} from "../src";

describe("Breadcrumbs", () => {
  it("should render correctly", () => {
    const wrapper = render(<Breadcrumbs />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Breadcrumbs ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
