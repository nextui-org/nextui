import * as React from "react";
import {render} from "@testing-library/react";

import {Alert} from "../src";

describe("Alert", () => {
  it("should render correctly", () => {
    const wrapper = render(<Alert />);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
