import * as React from "react";
import {render} from "@testing-library/react";

import {Spinner} from "../src";

describe("Spinner", () => {
  it("should render correctly", () => {
    const wrapper = render(<Spinner />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLElement>();

    render(<Spinner ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should render with default aria-label", () => {
    const {getByLabelText} = render(<Spinner />);

    expect(getByLabelText("Loading")).toBeInTheDocument();
  });

  it("should replace the default aria-label when a label is passed", () => {
    const {getByLabelText} = render(<Spinner label="Custom label" />);

    expect(getByLabelText("Custom label")).toBeInTheDocument();
  });

  it("should replace the default aria-label when a children is passed", () => {
    const {getByLabelText} = render(<Spinner>Custom label</Spinner>);

    expect(getByLabelText("Custom label")).toBeInTheDocument();
  });

  it("should replace the default aria-label if aria-label is passed", () => {
    const {getByLabelText} = render(<Spinner aria-label="Custom label" />);

    expect(getByLabelText("Custom label")).toBeInTheDocument();
  });
});
