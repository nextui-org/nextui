import * as React from "react";
import {render} from "@testing-library/react";

import {Grid} from "../src";

describe("Grid", () => {
  it("should render correctly", () => {
    const wrapper = render(<Grid />);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
