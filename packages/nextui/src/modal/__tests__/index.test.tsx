import React from 'react';
import { mount } from 'enzyme';
import Modal from '../index';
import { nativeEvent, updateWrapper } from 'tests/utils';
import { expectModalIsClosed, expectModalIsOpened } from './use-modal.test';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const TabEvent = {
  key: 'TAB',
  keyCode: 9,
  which: 9
};

describe('Modal', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Modal open={true}>
        <Modal.Header>Modal</Modal.Header>
        <Modal.Body>
          <p>Some content contained within the modal.</p>
        </Modal.Body>
        <Modal.Footer>Cancel</Modal.Footer>
      </Modal>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });
  it('should trigger event when modal changed', async () => {
    const openHandler = jest.fn();
    const closeHandler = jest.fn();
    const wrapper = mount(
      <Modal onOpen={openHandler} onClose={closeHandler}>
        <Modal.Header>Modal</Modal.Header>
      </Modal>
    );
    expectModalIsClosed(wrapper);
    wrapper.setProps({ open: true });
    await updateWrapper(wrapper, 350);
    expectModalIsOpened(wrapper);
    expect(openHandler).toHaveBeenCalled();
    wrapper.find('.nextui-backdrop').simulate('click', nativeEvent);
    await updateWrapper(wrapper, 500);
    expectModalIsClosed(wrapper);
    expect(closeHandler).toHaveBeenCalled();
  });
  it('should disable backdrop event', async () => {
    const closeHandler = jest.fn();
    const wrapper = mount(
      <Modal open={true} preventClose onClose={closeHandler}>
        <Modal.Header>Modal</Modal.Header>
        <Modal.Footer>Submit</Modal.Footer>
      </Modal>
    );
    wrapper.find('.nextui-backdrop').simulate('click', nativeEvent);
    await updateWrapper(wrapper, 500);
    expectModalIsOpened(wrapper);
    expect(closeHandler).not.toHaveBeenCalled();
  });
  it('customization should be supported', () => {
    const wrapper = mount(
      <Modal open={true} width="100px" className="test-class">
        <Modal.Header>Modal</Modal.Header>
      </Modal>
    );
    const html = wrapper.find('.nextui-modal-wrapper').html();
    expect(html).toContain('test-class');
    expect(() => wrapper.unmount()).not.toThrow();
  });
  it('focus should only be switched within modal', () => {
    const wrapper = mount(
      <Modal open={true} width="100px" className="test-class">
        <Modal.Header>Modal</Modal.Header>
      </Modal>
    );
    const tabStart = wrapper.find('.hide-tab').at(0).getDOMNode();
    const tabEnd = wrapper.find('.hide-tab').at(1).getDOMNode();
    const eventElement = wrapper.find('.nextui-modal-wrapper').at(0);
    expect(document.activeElement).toBe(tabStart);
    act(() => {
      eventElement.simulate('keydown', {
        ...TabEvent,
        shiftKey: true
      });
    });
    expect(document.activeElement).toBe(tabEnd);
    act(() => {
      eventElement.simulate('keydown', {
        ...TabEvent,
        shiftKey: false
      });
    });
    expect(document.activeElement).toBe(tabStart);
  });
  it('should close modal when keyboard event is triggered', async () => {
    const wrapper = mount(
      <Modal open={true}>
        <Modal.Header>Modal</Modal.Header>
      </Modal>
    );
    expectModalIsOpened(wrapper);
    userEvent.keyboard('{esc}');
    await updateWrapper(wrapper, 500);
    expectModalIsClosed(wrapper);
  });
});
