import React from 'react';
import { mount } from 'enzyme';
import Card from '../index';

describe('Card Footer', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Card>
        <p>card</p>
        <Card.Footer>footer</Card.Footer>
      </Card>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work properly when use alone', () => {
    const wrapper = mount(<Card.Footer>footer</Card.Footer>);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with disable-auto-margin', () => {
    const wrapper = mount(<Card.Footer css={{ m: 0 }}>footer</Card.Footer>);
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
