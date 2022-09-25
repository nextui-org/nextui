import React from "react";
import {mount} from "enzyme";
import {fireEvent, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "../../button";
import Popover from "../index";

describe("Popover", () => {
  it("should render correctly", () => {
    const wrapper = mount(
      <Popover>
        <Popover.Trigger>
          <button>Open popover</button>
        </Popover.Trigger>
        <Popover.Content>
          <p>This is the content of the popover.</p>
        </Popover.Content>
      </Popover>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should hide the popover when clicking outside", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen onClose={onClose}>
        <Popover.Trigger>
          <button data-testid="trigger-test">Open popover</button>
        </Popover.Trigger>
        <Popover.Content>
          <p>This is the content of the popover.</p>
        </Popover.Content>
      </Popover>,
    );

    const trigger = wrapper.getByTestId("trigger-test");

    userEvent.click(trigger);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should hide the popover when pressing the escape key", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen onClose={onClose}>
        <Popover.Trigger>
          <button>Open popover</button>
        </Popover.Trigger>
        <Popover.Content data-testid="content-test">
          <p>This is the content of the popover.</p>
        </Popover.Content>
      </Popover>,
    );

    const content = wrapper.getByTestId("content-test");

    fireEvent.keyDown(content, {key: "Escape"});
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should still hide the popover when pressing the escape key if isDismissable is false", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen isDismissable={false} onClose={onClose}>
        <Popover.Trigger>
          <button>Open popover</button>
        </Popover.Trigger>
        <Popover.Content data-testid="content-test">
          <p>This is the content of the popover.</p>
        </Popover.Content>
      </Popover>,
    );

    const content = wrapper.getByTestId("content-test");

    fireEvent.keyDown(content, {key: "Escape"});
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not hide the popover when clicking outside if isDismissable is false", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen isDismissable={false} onClose={onClose}>
        <Popover.Trigger>
          <button data-testid="trigger-test">Open popover</button>
        </Popover.Trigger>
        <Popover.Content>
          <p>This is the content of the popover.</p>
        </Popover.Content>
      </Popover>,
    );

    const trigger = wrapper.getByTestId("trigger-test");

    userEvent.click(trigger);
    expect(onClose).toHaveBeenCalledTimes(0);
  });

  it("should hide the popover on blur when shouldCloseOnBlur is true", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen shouldCloseOnBlur onClose={onClose}>
        <Popover.Trigger>
          <button>Open popover</button>
        </Popover.Trigger>
        <Popover.Content data-testid="content-test">
          <p>This is the content of the popover.</p>
        </Popover.Content>
      </Popover>,
    );

    const content = wrapper.getByTestId("content-test");

    fireEvent.blur(content);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should work with NextUI button", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Popover isOpen onClose={onClose}>
        <Popover.Trigger>
          <Button data-testid="trigger-test">Open popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <p>This is the content of the popover.</p>
        </Popover.Content>
      </Popover>,
    );

    const trigger = wrapper.getByTestId("trigger-test");

    userEvent.click(trigger);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
