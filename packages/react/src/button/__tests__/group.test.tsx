import React from "react";
import {mount} from "enzyme";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "../index";
import {nativeEvent} from "../../../tests/utils";

describe("ButtonGroup", () => {
  it("should render correctly", () => {
    const wrapper = mount(
      <Button.Group>
        <Button>action</Button>
      </Button.Group>,
    );

    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("props should be passed to each button", () => {
    const wrapper = mount(
      <Button.Group color="success" size="xs">
        <Button>action</Button>
      </Button.Group>,
    );

    expect(wrapper.html()).toMatchSnapshot();
    wrapper.setProps({flat: true});
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
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
    const wrapper = mount(
      <Button.Group vertical>
        <Button>action1</Button>
        <Button>action2</Button>
      </Button.Group>,
    );

    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render different variants", () => {
    const wrapper = mount(
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

    expect(wrapper).toMatchSnapshot();
    expect(<Button>button</Button>).toMatchSnapshot();
  });
});
