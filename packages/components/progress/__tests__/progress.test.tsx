import * as React from "react";
import {render} from "@testing-library/react";

import {Progress} from "../src";

describe("Progress", () => {
  it("should render correctly", () => {
    const wrapper = render(<Progress aria-label="progress" />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Progress ref={ref} aria-label="progress" />);
    expect(ref.current).not.toBeNull();
  });

  it("should contain progress aria attributes", () => {
    const {container} = render(<Progress aria-label="progress" />);
    const div = container.querySelector("div");

    expect(div).toHaveAttribute("role", "progressbar");

    expect(div).toHaveAttribute("aria-valuemin", "0");
    expect(div).toHaveAttribute("aria-valuemax", "100");
    expect(div).toHaveAttribute("aria-valuenow", "0");
    expect(div).toHaveAttribute("aria-valuetext", "0%");
  });

  it("should display the correct value", () => {
    const {container} = render(<Progress aria-label="progress" value={55} />);

    // get the "aria-valuenow" attribute
    const value = container.querySelector("div")?.getAttribute("aria-valuenow");

    expect(value).toBe("55");
  });

  it("should support label value formatting", () => {
    const {container} = render(
      <Progress
        aria-label="progress"
        formatOptions={{style: "currency", currency: "ARS"}}
        value={55}
      />,
    );

    // get the "aria-valuetext" attribute
    const value = container.querySelector("div")?.getAttribute("aria-valuetext");

    expect(value).toBe("ARS 55.00");
  });

  it("should ignore a value under the minimum", () => {
    const {container} = render(<Progress aria-label="progress" value={-1} />);

    // get the "aria-valuenow" attribute
    const value = container.querySelector("div")?.getAttribute("aria-valuenow");

    expect(value).toBe("0");
  });

  it("should ignore a value over the maximum", () => {
    const {container} = render(<Progress aria-label="progress" value={101} />);

    // get the "aria-valuenow" attribute
    const value = container.querySelector("div")?.getAttribute("aria-valuenow");

    expect(value).toBe("100");
  });

  it("should render a label", () => {
    const {container} = render(<Progress aria-label="progress" label="Loading..." />);

    expect(container.querySelector("span")).not.toBeNull();
  });

  it("should render a value label", () => {
    const {container} = render(<Progress showValueLabel aria-label="progress" value={55} />);

    expect(container.querySelector("span")).not.toBeNull();
  });

  it("the aria-valuenow should not be set if isIndeterminate is true", () => {
    const {container} = render(<Progress isIndeterminate aria-label="progress" />);

    // get the "aria-valuenow" attribute
    const value = container.querySelector("div")?.getAttribute("aria-valuenow");

    expect(value).toBeNull();
  });
});
