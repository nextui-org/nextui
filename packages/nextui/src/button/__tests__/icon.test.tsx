import React from 'react';
import { mount } from 'enzyme';
import Button from '../index';

const Icon: React.FC<unknown> = () => <svg />;

describe('ButtonIcon', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Button icon={<Icon />}>action</Button>);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with right', () => {
    const wrapper = mount(<Button iconRight={<Icon />}>action</Button>);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work without text', () => {
    const wrapper = mount(<Button iconRight={<Icon />} />);
    const text = wrapper.find('.text');
    expect(wrapper.html()).toMatchSnapshot();
    expect(text.length).toBe(0);
  });
});
