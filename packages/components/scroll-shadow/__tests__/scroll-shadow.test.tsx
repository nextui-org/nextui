import * as React from "react";
import {render} from "@testing-library/react";
import Lorem from "react-lorem-component";

import {ScrollShadow} from "../src";

describe("ScrollShadow", () => {
  it("should render correctly", () => {
    const wrapper = render(<ScrollShadow />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<ScrollShadow ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should add bottom shadow", () => {
    const wrapper = render(
      <ScrollShadow
        data-testid="scroll-shadow"
        style={{
          width: 300,
          height: 400,
        }}
      >
        <Lorem count={10} />
      </ScrollShadow>,
    );
    const scrollShadow = wrapper.getByTestId("scroll-shadow");

    expect(scrollShadow).toHaveAttribute("data-bottom-scroll");
  });

  it("should add right shadow", () => {
    const wrapper = render(
      <ScrollShadow
        data-testid="scroll-shadow"
        orientation="horizontal"
        style={{
          width: 300,
          height: 400,
        }}
      >
        <Lorem count={10} />
      </ScrollShadow>,
    );
    const scrollShadow = wrapper.getByTestId("scroll-shadow");

    expect(scrollShadow).toHaveAttribute("data-right-scroll");
  });
});
