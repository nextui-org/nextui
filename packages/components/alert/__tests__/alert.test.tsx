import * as React from "react";
import {act, render} from "@testing-library/react";

import {Alert} from "../src";

const title = "Testing Title";
const description = "Testing Description";

describe("Alert", () => {
  it("should render correctly", () => {
    const wrapper = render(<Alert description={description} title={title} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Alert ref={ref} description={description} title={title} />);

    expect(ref.current).not.toBeNull();
  });

  it("should display title and description when component is rendered", () => {
    const wrapper = render(<Alert description={description} title={title} />);

    const titleElement = wrapper.getByText(title);
    const descriptionElement = wrapper.getByText(description);

    expect(titleElement).toContainHTML(title);
    expect(descriptionElement).toContainHTML(description);
  });

  it("should show close button when is Closable", () => {
    const {getByRole} = render(<Alert isClosable description={description} title={title} />);

    const closeButton = getByRole("button");

    expect(closeButton).toBeVisible();
  });

  it("should show close button when onClose is passed", () => {
    const onClose = jest.fn();

    const {getByRole} = render(<Alert description={description} title={title} onClose={onClose} />);

    const closeButton = getByRole("button");

    expect(closeButton).toBeVisible();
  });

  it("should not show close button when not isClosable and onClose is not passed", () => {
    const wrapper = render(<Alert description={description} title={title} />);

    const closeButton = wrapper.queryByRole("button");

    expect(closeButton).toBeNull();
  });

  it("should call the onClose function when clicking on close button", () => {
    const onClose = jest.fn();

    const wrapper = render(<Alert description={description} title={title} onClose={onClose} />);

    const closeButton = wrapper.getByRole("button");

    act(() => {
      closeButton.click();
    });

    expect(onClose).toHaveBeenCalled();
  });

  it("should close the alert when clicking on close button", () => {
    const wrapper = render(<Alert isClosable description={description} title={title} />);

    const closeButton = wrapper.getByRole("button");

    act(() => {
      closeButton.click();
    });

    expect(wrapper.container).toBeEmptyDOMElement();
  });
});
