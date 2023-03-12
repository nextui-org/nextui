import * as React from "react";
import {render} from "@testing-library/react";

import {Pagination} from "../src";

describe("Pagination", () => {
  it("should render correctly", () => {
    const wrapper = render(<Pagination total={10} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLUListElement>();

    render(<Pagination ref={ref} total={10} />);
    expect(ref.current).not.toBeNull();
  });

  it("should render correctly with controls", () => {
    const wrapper = render(<Pagination showControls total={10} />);

    const nextButton = wrapper.getByLabelText("next page button");
    const prevButton = wrapper.getByLabelText("previous page button");

    expect(nextButton).not.toBeNull();
    expect(prevButton).not.toBeNull();
  });

  it("should render correctly without controls", () => {
    const wrapper = render(<Pagination total={10} />);

    const nextButton = wrapper.queryByLabelText("next page button");
    const prevButton = wrapper.queryByLabelText("previous page button");

    expect(nextButton).toBeNull();
    expect(prevButton).toBeNull();
  });

  it("should show dots when total is greater than 10", () => {
    const wrapper = render(<Pagination total={10} />);

    const dots = wrapper.queryAllByLabelText("dots element");

    expect(dots).toHaveLength(1);
  });

  it("should show 2 dots when total is greater than 10 and the initialPage is in de middle", () => {
    const wrapper = render(<Pagination initialPage={6} total={10} />);

    const dots = wrapper.queryAllByLabelText("dots element");

    expect(dots).toHaveLength(2);
  });

  it("the pagination cursor should have a aria-hidden attribute", () => {
    const {container} = render(<Pagination total={10} />);

    const cursor = container.querySelector("span[aria-hidden]");

    expect(cursor).toHaveAttribute("aria-hidden", "true");
  });
});
