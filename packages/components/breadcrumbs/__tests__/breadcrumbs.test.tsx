import * as React from "react";
import {render} from "@testing-library/react";

import {Breadcrumbs, BreadcrumbItem} from "../src";

describe("Breadcrumbs", () => {
  it("should render correctly", () => {
    const wrapper = render(<Breadcrumbs />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Breadcrumbs ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should support aria-label", () => {
    const {container} = render(<Breadcrumbs aria-label="Routes" />);

    expect(container.querySelector("nav")).toHaveAttribute("aria-label", "Routes");
  });

  it("should support multiple items", () => {
    const {container} = render(
      <Breadcrumbs>
        <BreadcrumbItem href="#1">Item 1</BreadcrumbItem>
        <BreadcrumbItem href="#2">Item 2</BreadcrumbItem>
        <BreadcrumbItem href="#3">Item 3</BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(container.querySelectorAll("span")).toHaveLength(3);
  });

  it("should support multiple links items", () => {
    const {container} = render(
      <Breadcrumbs>
        <BreadcrumbItem href="#1">Item 1</BreadcrumbItem>
        <BreadcrumbItem href="#2">Item 2</BreadcrumbItem>
        <BreadcrumbItem href="#3">Item 3</BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(container.querySelectorAll("a")).toHaveLength(2);

    // The last one is not a link because it is the current page
    const current = container.querySelector("[aria-current]");

    expect(current).not.toBeNull();
    expect(current).toHaveAttribute("aria-current", "page");

    expect(current?.tagName.toLowerCase()).toBe("span");
  });

  it("should support maxItems", () => {
    const {container, getByText} = render(
      <Breadcrumbs itemsAfterCollapse={1} itemsBeforeCollapse={1} maxItems={3}>
        <BreadcrumbItem href="#1">Item 1</BreadcrumbItem>
        <BreadcrumbItem href="#2">Item 2</BreadcrumbItem>
        <BreadcrumbItem href="#3">Item 3</BreadcrumbItem>
        <BreadcrumbItem href="#4">Item 4</BreadcrumbItem>
        <BreadcrumbItem href="#5">Item 5</BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(container.querySelectorAll("a")).toHaveLength(2);

    // visible items should be 1 and 5
    const first = getByText("Item 1");
    const last = getByText("Item 5");

    // visible
    expect(first).not.toBeNull();
    expect(last).not.toBeNull();
  });

  it("should support custom separator", () => {
    const {container} = render(
      <Breadcrumbs separator="/">
        <BreadcrumbItem>Item 1</BreadcrumbItem>
        <BreadcrumbItem>Item 2</BreadcrumbItem>
        <BreadcrumbItem>Item 3</BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(container.querySelectorAll("[data-slot='item']")).toHaveLength(3);
    expect(container.querySelector("[data-slot='separator']")).toHaveTextContent("/");
  });

  it("should disable the items before the current one", () => {
    const {getByText} = render(
      <Breadcrumbs isDisabled>
        <BreadcrumbItem href="#1">Item 1</BreadcrumbItem>
        <BreadcrumbItem href="#2">Item 2</BreadcrumbItem>
        <BreadcrumbItem href="#3">Item 3</BreadcrumbItem>
      </Breadcrumbs>,
    );

    const item1 = getByText("Item 1");

    expect(item1).toHaveAttribute("aria-disabled", "true");
    const item2 = getByText("Item 2");

    expect(item2).toHaveAttribute("aria-disabled", "true");
  });

  it("should support aria-labelledby", function () {
    let {getByRole} = render(
      <>
        <span id="test">Test</span>
        <Breadcrumbs aria-labelledby="test">
          <BreadcrumbItem>Folder 1</BreadcrumbItem>
        </Breadcrumbs>
      </>,
    );

    const breadcrumbs = getByRole("navigation");

    expect(breadcrumbs).toHaveAttribute("aria-labelledby", "test");
  });

  it("should support aria-describedby", function () {
    let {getByRole} = render(
      <>
        <span id="test">Test</span>
        <Breadcrumbs aria-describedby="test">
          <BreadcrumbItem>Folder 1</BreadcrumbItem>
        </Breadcrumbs>
      </>,
    );

    const breadcrumbs = getByRole("navigation");

    expect(breadcrumbs).toHaveAttribute("aria-describedby", "test");
  });

  it("should support startContent & endContent", () => {
    const {getByText} = render(
      <Breadcrumbs>
        <BreadcrumbItem
          endContent={<span data-testid="end-content">End</span>}
          startContent={<span data-testid="start-content">Start</span>}
        >
          Item 1
        </BreadcrumbItem>
      </Breadcrumbs>,
    );

    const startContent = getByText("Start");
    const endContent = getByText("End");

    expect(startContent).not.toBeNull();
    expect(endContent).not.toBeNull();
  });
});
