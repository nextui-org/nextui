import React from 'react';
import { mount } from 'enzyme';
import Card from '../index';

describe('Card', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Card>card</Card>);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support hoverable', () => {
    const wrapper = mount(
      <div>
        <Card isHoverable>card</Card>
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support clikable', () => {
    const wrapper = mount(
      <div>
        <Card isPressable>card</Card>
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support custom css', () => {
    const wrapper = mount(
      <div>
        <Card css={{ bg: '$red400' }}>card</Card>
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support card types', () => {
    const wrapper = mount(
      <div>
        <Card color="default">card</Card>
        <Card color="primary">card</Card>
        <Card color="success">card</Card>
        <Card color="secondary">card</Card>
        <Card color="warning">card</Card>
        <Card color="gradient">card</Card>
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render correctly when nested', () => {
    const wrapper = mount(
      <Card>
        <Card>
          <Card>card</Card>
        </Card>
      </Card>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
