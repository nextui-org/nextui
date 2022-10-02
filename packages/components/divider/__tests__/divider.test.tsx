import * as React from "react";
import {render} from "@testing-library/react";
import {getMargin} from "@nextui-org/shared-utils";

import {Divider} from "../src";

describe("Divider", () => {
  it("should render correctly", () => {
    const wrapper = render(<Divider />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Divider ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should work with x and y", () => {
    let x = 2;
    let y = 4;
    const {container} = render(<Divider x={x} y={4} />);

    expect(container.firstChild).toHaveStyle(`margin: ${getMargin(x / 2)} ${getMargin(y / 2)}`);
  });

  it("should support float x & y", () => {
    let x = 2.5;
    let y = 4.5;
    const {container} = render(<Divider x={x} y={4.5} />);

    expect(container.firstChild).toHaveStyle(`margin: ${getMargin(x / 2)} ${getMargin(y / 2)}`);
  });
});
