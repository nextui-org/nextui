import React from 'react';
import { mount } from 'enzyme';
import { Text } from '@components';

describe('Text', () => {
  it('should render P element in the default', () => {
    const wrapper = mount(<Text>test-value</Text>);
    expect(wrapper.find('p')).not.toBe(0);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with different styles', () => {
    const wrapper = mount(
      <div>
        <Text type="secondary">test-value</Text>
        <Text type="success">test-value</Text>
        <Text type="warning">test-value</Text>
        <Text type="error">test-value</Text>
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('the specified element should be rendered', () => {
    const elements = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'small',
      'span',
      'del',
      'i',
      'em',
      'b',
    ];
    const wrapper = mount(
      <div>
        {elements.map((el, index) => {
          const prop = { [el]: true };
          return (
            <Text {...prop} key={`${el}-${index}`}>
              test-value
            </Text>
          );
        })}
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('the combined style should be rendered', () => {
    const wrapper = mount(
      <Text p b del>
        test-value
      </Text>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render default color when type missing', () => {
    const Mock = Text as any;
    const wrapper = mount(<Mock type="unknow">test-value</Mock>);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should be able to specify the size of text', () => {
    let wrapper = mount(<Text size={14}>test-value</Text>);
    expect(wrapper.html()).toMatchSnapshot();

    wrapper = mount(<Text size="12rem">test-value</Text>);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
