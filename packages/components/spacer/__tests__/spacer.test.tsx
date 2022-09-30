import * as React from "react";
import {render} from "@testing-library/react";

import {Spacer} from "../src";

describe("Spacer", () => {
  test("should render correctly", () => {
    const wrapper = render(<Spacer />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should support x and y props", () => {
    const wrapper = render(
      <div>
        <Spacer x={5} />
        <Spacer x={15} />
        <Spacer y={15} />
        <Spacer y={2} />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should work with float numbers", () => {
    const wrapper = render(
      <div>
        <Spacer x={2.2} />
        <Spacer x={1.5} />
        <Spacer y={0.1} />
        <Spacer y={1.8} />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should support inline prop", () => {
    const wrapper = render(<Spacer inline />);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
