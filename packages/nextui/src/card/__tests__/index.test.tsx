import React from 'react';
import { mount, render } from 'enzyme';
import Card from '../index';

describe('Card', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Card>card</Card>);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support hoverable', () => {
    const wrapper = render(
      <div>
        <Card hoverable>card</Card>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support clikable', () => {
    const wrapper = render(
      <div>
        <Card clickable>card</Card>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support custom css', () => {
    const wrapper = render(
      <div>
        <Card css={{ bg: '$red400' }}>card</Card>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
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
    const wrapper = render(
      <Card>
        <Card shadow>
          <Card>card</Card>
        </Card>
      </Card>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('the component Card.Content should be injected automatically', () => {
    const card = mount(<Card>test-value</Card>);
    const content = mount(
      <Card>
        <Card.Body>test-value</Card.Body>
      </Card>
    );
    expect(card.html()).toEqual(content.html());
  });
});
