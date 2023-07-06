import React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {ButtonGroup, Button} from "../src";

describe("ButtonGroup", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <ButtonGroup>
        <Button disableRipple>action</Button>
      </ButtonGroup>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<ButtonGroup ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should ignore events when group disabled", () => {
    const handler = jest.fn();
    const wrapper = render(
      <ButtonGroup isDisabled={true}>
        <Button disableRipple data-testid="button-test" onClick={handler}>
          action
        </Button>
      </ButtonGroup>,
    );

    let button = wrapper.getByTestId("button-test");

    userEvent.click(button);
    expect(handler).toBeCalledTimes(0);
  });

  it("should render different variants", () => {
    const wrapper = render(
      <ButtonGroup>
        <Button variant="flat">button</Button>
        <Button disableRipple color="warning" variant="light">
          light
        </Button>
        <Button disableRipple color="success" variant="light">
          button
        </Button>
        <Button disableRipple color="warning" variant="bordered">
          button
        </Button>
      </ButtonGroup>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
