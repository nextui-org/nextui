import React, { useEffect } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Modal from '../index';
import useModal from '../use-modal';
import { updateWrapper } from 'tests/utils';

export const expectModalIsOpened = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.content').length).not.toBe(0);
};

export const expectModalIsClosed = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.content').length).toBe(0);
};

describe('UseModal', () => {
  it('should follow change with use-modal', async () => {
    const MockModal: React.FC<{ show?: boolean }> = ({ show }) => {
      const { setVisible, bindings } = useModal();
      useEffect(() => {
        if (show !== undefined) setVisible(show);
      }, [show]);
      return (
        <Modal {...bindings}>
          <Modal.Header>Modal</Modal.Header>
        </Modal>
      );
    };

    const wrapper = mount(<MockModal />);
    wrapper.setProps({ show: true });
    await updateWrapper(wrapper, 300);
    expectModalIsOpened(wrapper);

    wrapper.setProps({ show: false });
    await updateWrapper(wrapper, 500);
    expectModalIsClosed(wrapper);
  });
});
