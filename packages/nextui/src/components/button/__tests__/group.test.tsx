import React from 'react';
import { mount } from 'enzyme';
import { Button } from '@components';
import { nativeEvent } from 'tests/utils';

describe('ButtonGroup', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Button.Group>
        <Button>action</Button>
      </Button.Group>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('props should be passed to each button', () => {
    const wrapper = mount(
      <Button.Group size="mini" color="success">
        <Button>action</Button>
      </Button.Group>
    );
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.setProps({ ghost: true });
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should ignore events when group disabled', () => {
    const handler = jest.fn();
    const wrapper = mount(
      <Button.Group>
        <Button onClick={handler}>action</Button>
      </Button.Group>
    );
    wrapper.find('button').simulate('click', nativeEvent);
    expect(handler).toHaveBeenCalledTimes(1);
    wrapper.setProps({ disabled: true });
    wrapper.find('button').simulate('click', nativeEvent);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('buttons should be displayed vertically', () => {
    const wrapper = mount(
      <Button.Group vertical>
        <Button>action1</Button>
        <Button>action2</Button>
      </Button.Group>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
