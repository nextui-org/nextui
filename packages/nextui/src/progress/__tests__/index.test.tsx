import { mount } from 'enzyme';
import React from 'react';
import Progress from '../progress';

describe('Progress', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Progress value={50} />);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support all colors', () => {
    const wrapper = mount(
      <div>
        <Progress value={45} color="primary" />
        <Progress value={45} color="secondary" />
        <Progress value={45} color="success" />
        <Progress value={45} color="warning" />
        <Progress value={45} color="error" />
        <Progress value={45} color="gradient" />
        <Progress value={45} color="#f4d" />
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support all status colors', () => {
    const wrapper = mount(
      <div>
        <Progress value={45} color="primary" status="primary" />
        <Progress value={45} color="secondary" status="secondary" />
        <Progress value={45} color="success" status="success" />
        <Progress value={45} color="warning" status="warning" />
        <Progress value={45} color="error" status="error" />
        <Progress value={45} color="#f4d" status="#f4d" />
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should show different progress by maximum', () => {
    const wrapper = mount(
      <div>
        <Progress value={59} max={60} />
        <Progress value={21} max={50} />
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support shadow', () => {
    const wrapper = mount(
      <div>
        <Progress shadow value={59} max={60} />
        <Progress shadow value={21} max={50} />
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support indeterminated', () => {
    const wrapper = mount(
      <div>
        <Progress indeterminated value={59} max={60} />
        <Progress indeterminated value={21} max={50} />
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support no animated', () => {
    const wrapper = mount(
      <div>
        <Progress animated={false} value={59} max={60} />
        <Progress animated={false} value={21} max={50} />
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should ignore a value under the minimum', () => {
    const value = 10;
    const minValue = 20;
    const wrapper = mount(<Progress value={value} min={minValue} max={60} />);
    const props = wrapper.find('.filler').at(0).props();
    expect(() => props['aria-valuenow'] === minValue).toBeTruthy();
  });

  it('should ignore a value above the max', () => {
    const value = 30;
    const maxValue = 20;
    const wrapper = mount(<Progress value={value} min={0} max={maxValue} />);
    const props = wrapper.find('.filler').at(0).props();
    expect(() => props['aria-valuenow'] === maxValue).toBeTruthy();
  });
});
