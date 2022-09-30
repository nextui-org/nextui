import * as React from "react";
import {render} from "@testing-library/react";

import {Col} from "../src";

describe("Col", () => {
  test("should render correctly", () => {
    const wrapper = render(<Col />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should work with span and offset", () => {
    const wrapper = render(
      <div>
        <Col span={2}>col</Col>
        <Col offset={2} span={2}>
          col
        </Col>
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly when nested", () => {
    const wrapper = render(
      <Col>
        <Col>
          <Col />
          col
        </Col>
      </Col>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render different components", () => {
    let wrapper = render(<Col as="p" data-testid="p-col-test" />);

    let p = wrapper.getByTestId("p-col-test");

    expect(p).toBeTruthy();

    wrapper = render(<Col as="details" data-testid="details-col-test" />);

    let details = wrapper.getByTestId("details-col-test");

    expect(details).toBeTruthy();

    wrapper = render(<Col as="h1" data-testid="h1-col-test" />);

    let h1 = wrapper.getByTestId("h1-col-test");

    expect(h1).toBeTruthy();
  });
});
