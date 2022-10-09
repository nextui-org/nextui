import * as React from "react";
import {render} from "@testing-library/react";

import {Loading} from "../src";

describe("Loading", () => {
  it("should render correctly", () => {
    const wrapper = render(<Loading />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Loading ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should render with default aria-label", () => {
    const {getByLabelText} = render(<Loading />);

    expect(getByLabelText("Loading")).toBeInTheDocument();
  });

  it("should render with default aria-label for spinner", () => {
    const {getByLabelText} = render(<Loading type="spinner" />);

    expect(getByLabelText("Loading")).toBeInTheDocument();
  });

  it("should work with text in spinner type", () => {
    const {getByText} = render(<Loading type="spinner">Loading</Loading>);

    expect(getByText("Loading")).toBeInTheDocument();
  });

  it("should replace the default aria-label when a children is passed", () => {
    const {getByLabelText} = render(<Loading>Custom label</Loading>);

    expect(getByLabelText("Custom label")).toBeInTheDocument();
  });

  it("should replace the default aria-label if aria-label is passed", () => {
    const {getByLabelText} = render(<Loading aria-label="Custom label" />);

    expect(getByLabelText("Custom label")).toBeInTheDocument();
  });
});
