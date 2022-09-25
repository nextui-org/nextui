import * as React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Autocomplete from "../src";

describe("Autocomplete", () => {
  test("should render correctly", () => {
   const wrapper = render(<Autocomplete />);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});