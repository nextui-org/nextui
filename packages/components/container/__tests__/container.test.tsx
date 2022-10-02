import * as React from "react";
import {render} from "@testing-library/react";

import {Container} from "../src";

describe("Container", () => {
  test("should render correctly", () => {
    const wrapper = render(<Container />);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
