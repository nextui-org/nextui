import React from "react";
import {mount} from "enzyme";
import userEvent from "@testing-library/user-event";
import {render} from "@testing-library/react";

import Button from "../index";

describe("Button", () => {
  it("should render correctly", () => {
    const wrapper = mount(<Button>Button</Button>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should support all colors", () => {
    const wrapper = mount(
      <div>
        <Button color="primary" />
        <Button color="secondary" />
        <Button color="success" />
        <Button color="warning" />
        <Button color="error" />
        <Button color="gradient" />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should support all sizes", () => {
    const wrapper = mount(
      <div>
        <Button size="xs" />
        <Button size="sm" />
        <Button size="md" />
        <Button size="lg" />
        <Button size="xl" />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render different text", () => {
    const wrapper = mount(<Button>button</Button>);

    expect(wrapper.text()).toContain("button");

    wrapper.setProps({
      children: <span>Hello</span>,
    });
    expect(wrapper.text()).toContain("Hello");
  });

  it("should render empty button correctly", () => {
    expect(<Button />).toMatchSnapshot();
  });

  it("should render different variants", () => {
    const wrapper = mount(
      <div>
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
        <Button ghost>button</Button>
        <Button bordered>button</Button>
        <Button auto>button</Button>
        <Button animated={false}>button</Button>
      </div>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(<Button>button</Button>).toMatchSnapshot();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLButtonElement>();
    const wrapper = mount(<Button ref={ref}>action</Button>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should trigger onPress function", () => {
    let onPressFn = jest.fn();
    const wrapper = render(
      <Button data-testid="button-test" onPress={onPressFn}>
        action
      </Button>,
    );

    let button = wrapper.getByTestId("button-test");

    userEvent.click(button);
    expect(onPressFn).toBeCalledTimes(1);
  });

  it("should trigger onClick function", () => {
    let onClickFn = jest.fn();
    const wrapper = render(
      <Button data-testid="button-test" onClick={onClickFn}>
        action
      </Button>,
    );

    let button = wrapper.getByTestId("button-test");

    userEvent.click(button);
    expect(onClickFn).toBeCalledTimes(1);
  });

  it("should show warning message when onClick is being used", () => {
    let warnMessage = "";
    const warnSpy = jest.spyOn(console, "warn").mockImplementation((msg) => (warnMessage = msg));

    const wrapper = render(
      <Button data-testid="button-test" onClick={() => {}}>
        action
      </Button>,
    );
    let button = wrapper.getByTestId("button-test");

    userEvent.click(button);
    expect(warnMessage).toEqual("onClick is deprecated, please use onPress");
    warnSpy.mockRestore();
  });

  it("should ignore events when disabled", () => {
    let onClickFn = jest.fn();
    const wrapper = render(
      <Button disabled data-testid="button-test" onClick={onClickFn}>
        action
      </Button>,
    );

    let button = wrapper.getByTestId("button-test");

    userEvent.click(button);
    expect(onClickFn).toBeCalledTimes(0);
  });

  it("should remove expired events", () => {
    const wrapper = mount(<Button>button</Button>);

    userEvent.click(wrapper.find("button").getDOMNode());
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
