import React from 'react';
import { mount } from 'enzyme';
import Spacer from '../index';

describe('Spacer', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Spacer />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support x and y', () => {
    const wrapper = mount(
      <div>
        <Spacer x={5} />
        <Spacer x={15} />
        <Spacer y={15} />
        <Spacer y={2} />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with float', () => {
    const wrapper = mount(
      <div>
        <Spacer x={2.2} />
        <Spacer x={1.5} />
        <Spacer y={0.1} />
        <Spacer y={1.8} />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with inline mode', () => {
    const wrapper = mount(<Spacer inline />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
