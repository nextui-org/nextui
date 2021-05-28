import React from 'react';
import { mount } from 'enzyme';
import { Row, Col } from '@components';

describe('Row', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Row>row</Row>);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should be render different components', () => {
    const wrapper = mount(<Row>row</Row>);
    wrapper.setProps({ as: 'div' });
    expect(wrapper.find('div').length).not.toBe(0);

    wrapper.setProps({ as: 'nav' });
    expect(wrapper.find('nav').length).not.toBe(0);

    wrapper.setProps({ as: 'span' });
    expect(wrapper.find('span').length).not.toBe(0);

    wrapper.setProps({ as: 'p' });
    expect(wrapper.find('p').length).not.toBe(0);

    wrapper.setProps({ as: 'details' });
    expect(wrapper.find('details').length).not.toBe(0);
  });

  it('the children should be aligned correctly', () => {
    const wrapper = mount(
      <div>
        <Row justify="flex-end">
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
        <Row align="flex-start">
          <Col />
        </Row>
        <Row align="center">
          <Col />
        </Row>
        <Row align="flex-end">
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
