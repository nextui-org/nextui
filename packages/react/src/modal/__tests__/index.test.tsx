import React from "react";
import {mount} from "enzyme";
import {nativeEvent, updateWrapper} from "tests/utils";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

import Modal from "../index";

import {expectModalIsClosed, expectModalIsOpened} from "./use-modal.test";

const TabEvent = {
  key: "TAB",
  keyCode: 9,
  which: 9,
};

describe("Modal", () => {
  it("should render correctly", () => {
    const wrapper = mount(
      <Modal open={true}>
        <Modal.Header>Modal</Modal.Header>
        <Modal.Body>
          <p>Some content contained within the modal.</p>
        </Modal.Body>
        <Modal.Footer>Cancel</Modal.Footer>
      </Modal>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should trigger event when modal changed", async () => {
    const openHandler = jest.fn();
    const closeHandler = jest.fn();
    const wrapper = mount(
      <Modal onClose={closeHandler} onOpen={openHandler}>
        <Modal.Header>Modal</Modal.Header>
      </Modal>,
    );

    expectModalIsClosed(wrapper);
    wrapper.setProps({open: true});
    await updateWrapper(wrapper, 350);
    expectModalIsOpened(wrapper);
    expect(openHandler).toHaveBeenCalled();

    wrapper.find(".nextui-backdrop").at(0).simulate("click", nativeEvent);
    await updateWrapper(wrapper, 500);
    expectModalIsClosed(wrapper);
    expect(closeHandler).toHaveBeenCalled();
  });
  it("should disable backdrop event", async () => {
    const closeHandler = jest.fn();
    const wrapper = mount(
      <Modal preventClose open={true} onClose={closeHandler}>
        <Modal.Header>Modal</Modal.Header>
        <Modal.Footer>Submit</Modal.Footer>
      </Modal>,
    );

    wrapper.find(".nextui-backdrop").at(0).simulate("click", nativeEvent);
    await updateWrapper(wrapper, 500);
    expectModalIsOpened(wrapper);
    expect(closeHandler).not.toHaveBeenCalled();
  });
  it("customization should be supported", () => {
    const wrapper = mount(
      <Modal className="test-class" open={true} width="100px">
        <Modal.Header>Modal</Modal.Header>
      </Modal>,
    );
    const html = wrapper.find(".nextui-modal").at(0).html();

    expect(html).toContain("test-class");
    expect(() => wrapper.unmount()).not.toThrow();
  });
  it("focus should only be switched within modal", () => {
    const wrapper = mount(
      <Modal className="test-class" open={true} width="100px">
        <Modal.Header>Modal</Modal.Header>
      </Modal>,
    );
    const tabStart = wrapper.find(".nextui-modal-hide-tab").at(0).at(0).getDOMNode();
    const tabEnd = wrapper.find(".nextui-modal-hide-tab").at(2).at(0).getDOMNode();
    const eventElement = wrapper.find(".nextui-modal").at(0);

    expect(document.activeElement).toBe(tabStart);
    act(() => {
      eventElement.simulate("keydown", {
        ...TabEvent,
        shiftKey: true,
      });
    });
    expect(document.activeElement).toBe(tabEnd);
    act(() => {
      eventElement.simulate("keydown", {
        ...TabEvent,
        shiftKey: false,
      });
    });
    expect(document.activeElement).toBe(tabStart);
  });
  it("should close modal when keyboard event is triggered", async () => {
    const wrapper = mount(
      <Modal open={true}>
        <Modal.Header>Modal</Modal.Header>
      </Modal>,
    );

    expectModalIsOpened(wrapper);
    userEvent.keyboard("{esc}");
    await updateWrapper(wrapper, 500);
    expectModalIsClosed(wrapper);
  });
});
