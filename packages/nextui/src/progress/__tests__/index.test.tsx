import { mount } from 'enzyme';
import React from 'react';
import ProgressBar from '../progress';

describe('ProgressBar', () => {
  it('should render correctly', () => {
    const wrapper = mount(<ProgressBar value={50} />);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support all colors', () => {
    const wrapper = mount(
      <div>
        <ProgressBar value={45} color="primary" />
        <ProgressBar value={45} color="secondary" />
        <ProgressBar value={45} color="success" />
        <ProgressBar value={45} color="warning" />
        <ProgressBar value={45} color="error" />
        <ProgressBar value={45} color="gradient" />
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
