import * as React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Avatar} from "../src";

describe("Avatar", () => {
  test("should render correctly", () => {
    const wrapper = render(<Avatar />);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
