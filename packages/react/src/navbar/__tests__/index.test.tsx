import React from "react";
import {render} from "@testing-library/react";

import Navbar from "../index";

describe("Navbar", () => {
  it("should render correctly", () => {
    const wrapper = render(<Navbar />);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
