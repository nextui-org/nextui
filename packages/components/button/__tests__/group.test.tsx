import React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Button} from "../src";

describe("ButtonGroup", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <Button.Group>
        <Button>action</Button>
      </Button.Group>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Button.Group ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should ignore events when group disabled", () => {
    const handler = jest.fn();
    const wrapper = render(
      <Button.Group disabled>
        <Button data-testid="button-test" onClick={handler}>
          action
        </Button>
      </Button.Group>,
    );

    let button = wrapper.getByTestId("button-test");

    userEvent.click(button);
    expect(handler).toBeCalledTimes(0);
  });

  it("buttons should be displayed vertically", () => {
    const wrapper = render(
      <Button.Group vertical>
        <Button>action1</Button>
        <Button>action2</Button>
      </Button.Group>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render different variants", () => {
    const wrapper = render(
      <Button.Group>
        <Button flat>button</Button>
        <Button light color="warning">
          light
        </Button>
        <Button flat color="success">
          button
        </Button>
        <Button flat color="warning">
          button
        </Button>
        <Button rounded>button</Button>
        <Button flat>button</Button>
        <Button shadow>button</Button>
        <Button auto>button</Button>
        <Button animated={false}>button</Button>
      </Button.Group>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
