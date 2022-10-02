import * as React from "react";
import {render} from "@testing-library/react";

import {Row} from "../src";

describe("Row", () => {
  test("should render correctly", () => {
    const wrapper = render(<Row />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render different components", () => {
    let wrapper = render(<Row as="p" data-testid="p-row-test" />);

    let p = wrapper.getByTestId("p-row-test");

    expect(p).toBeTruthy();

    wrapper = render(<Row as="details" data-testid="details-row-test" />);

    let details = wrapper.getByTestId("details-row-test");

    expect(details).toBeTruthy();

    wrapper = render(<Row as="h1" data-testid="h1-row-test" />);

    let h1 = wrapper.getByTestId("h1-row-test");

    expect(h1).toBeTruthy();
  });

  it("the children should be aligned correctly", () => {
    const wrapper = render(
      <div>
        <Row justify="flex-end">
          <div />
        </Row>
        <Row justify="center">
          <div />
        </Row>
        <Row justify="space-around">
          <div />
        </Row>
        <Row justify="space-between">
          <div />
        </Row>
        <Row align="flex-start">
          <div />
        </Row>
        <Row align="center">
          <div />
        </Row>
        <Row align="flex-end">
          <div />
        </Row>
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("the children should have the correct spacing", () => {
    const wrapper = render(
      <div>
        <Row gap={1}>
          <div />
        </Row>
        <Row gap={2}>
          <div />
        </Row>
        <Row gap={10}>
          <div />
        </Row>
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should work with nested", () => {
    const wrapper = render(
      <Row>
        <Row>
          <Row>
            <div>
              <Row>row</Row>
            </div>
          </Row>
        </Row>
      </Row>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
