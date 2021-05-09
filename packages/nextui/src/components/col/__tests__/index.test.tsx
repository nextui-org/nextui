import React from 'react';
import { mount, render } from 'enzyme';
import { Col } from '@components';

describe('Col', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Col>col</Col>);
    expect(wrapper).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with span and offset', () => {
    const wrapper = render(
      <div>
        <Col span={2}>col</Col>
        <Col span={2} offset={2}>
          col
        </Col>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when nested', () => {
    const wrapper = mount(
      <Col>
        <Col>
          <Col />
          col
        </Col>
      </Col>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render different components', () => {
    let wrapper = mount(<Col component="p" />);
    expect(wrapper.find('p').length).not.toBe(0);

    wrapper = mount(<Col component="details" />);
    expect(wrapper.find('details').length).not.toBe(0);

    wrapper = mount(<Col component="h1" />);
    expect(wrapper.find('h1').length).not.toBe(0);
  });
});
