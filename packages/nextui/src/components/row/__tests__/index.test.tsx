import React from 'react';
import { mount } from 'enzyme';
import { Row, Col } from '@components';

describe('Row', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Row>row</Row>);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should be render differnet components', () => {
    const wrapper = mount(<Row>row</Row>);
    wrapper.setProps({ component: 'span' });
    expect(wrapper.find('span').length).not.toBe(0);

    wrapper.setProps({ component: 'p' });
    expect(wrapper.find('p').length).not.toBe(0);

    wrapper.setProps({ component: 'details' });
    expect(wrapper.find('details').length).not.toBe(0);
  });

  it('the children should be aligned correctly', () => {
    const wrapper = mount(
      <div>
        <Row justify="end">
          <Col />
        </Row>
        <Row justify="center">
          <Col />
        </Row>
        <Row justify="space-around">
          <Col />
        </Row>
        <Row justify="space-between">
          <Col />
        </Row>
        <Row align="top">
          <Col />
        </Row>
        <Row align="middle">
          <Col />
        </Row>
        <Row align="bottom">
          <Col />
        </Row>
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('the children should have the correct spacing', () => {
    const wrapper = mount(
      <div>
        <Row gap={1}>
          <Col />
        </Row>
        <Row gap={2}>
          <Col />
        </Row>
        <Row gap={10}>
          <Col />
        </Row>
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with nested', () => {
    const wrapper = mount(
      <Row>
        <Row>
          <Row>
            <Col>
              <Row>row</Row>
            </Col>
          </Row>
        </Row>
      </Row>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
