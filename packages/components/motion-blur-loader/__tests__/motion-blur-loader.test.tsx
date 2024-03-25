import * as React from "react";
import {render} from "@testing-library/react";

import {MotionBlurLoader} from "../src";

describe("MotionBlurLoader", () => {
  it("should render correctly", () => {
    const wrapper = render(<MotionBlurLoader />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLElement>();

    render(<MotionBlurLoader ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should render with default aria-label", () => {
    const {getByLabelText} = render(<MotionBlurLoader />);

    expect(getByLabelText("Loading")).toBeInTheDocument();
  });

  it("should replace the default aria-label when a label is passed", () => {
    const {getByLabelText} = render(<MotionBlurLoader label="Custom label" />);

    expect(getByLabelText("Custom label")).toBeInTheDocument();
  });

  it("should replace the default aria-label when a children is passed", () => {
    const {getByLabelText} = render(<MotionBlurLoader>Custom label</MotionBlurLoader>);

    expect(getByLabelText("Custom label")).toBeInTheDocument();
  });

  it("should replace the default aria-label if aria-label is passed", () => {
    const {getByLabelText} = render(<MotionBlurLoader aria-label="Custom label" />);

    expect(getByLabelText("Custom label")).toBeInTheDocument();
  });
});
