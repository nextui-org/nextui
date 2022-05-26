import React from 'react';
import { mount, shallow } from 'enzyme';
import Radio from '../index';
import { nativeEvent } from '../../../tests/utils';

describe('Radio', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Radio.Group>
        <Radio value="1">Option 1</Radio>
      </Radio.Group>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support square and circle', () => {
    const circle = shallow(
      <Radio.Group>
        <Radio value="1">Option 1</Radio>
      </Radio.Group>
    );
    expect(() => circle.unmount()).not.toThrow();
    const square = shallow(
      <Radio.Group>
        <Radio value="1" isSquared>
          Option 1
        </Radio>
      </Radio.Group>
    );
    expect(() => square.unmount()).not.toThrow();
  });

  it('should work correctly with different sizes', () => {
    const wrapper = mount(
      <Radio.Group>
        <Radio value="xs" size="xs">
          mini
        </Radio>
        <Radio value="sm" size="sm">
          small
        </Radio>
        <Radio value="md" size="md">
          medium
        </Radio>
        <Radio value="lg" size="lg">
          large
        </Radio>
        <Radio value="xl" size="xl">
          xlarge
        </Radio>
      </Radio.Group>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with different colors', () => {
    const wrapper = mount(
      <Radio.Group>
        <Radio value="primary" color="primary" />
        <Radio value="secondary" color="secondary" />
        <Radio value="success" color="success" />
        <Radio value="warning" color="warning" />
        <Radio value="error" color="error" />
      </Radio.Group>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with different textColors', () => {
    const wrapper = mount(
      <Radio.Group>
        <Radio value="primary" labelColor="primary" />
        <Radio value="secondary" labelColor="secondary" />
        <Radio value="success" labelColor="success" />
        <Radio value="warning" labelColor="warning" />
        <Radio value="error" labelColor="error" />
      </Radio.Group>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  // it('should render correctly with checked prop', () => {
  //   const wrapper = mount(<Radio>Option</Radio>);
  //   wrapper.setProps({ checked: false });
  //   let input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement;
  //   expect(input.checked).toEqual(false);

  //   wrapper.setProps({ checked: true });
  //   input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement;
  //   expect(input.checked).toEqual(true);
  // });

  // it('should trigger events when use alone', () => {
  //   const changeHandler = jest.fn();
  //   const wrapper = mount(<Radio onChange={changeHandler}>Option</Radio>);
  //   wrapper
  //     .find('input')
  //     .at(0)
  //     .simulate('change', {
  //       ...nativeEvent,
  //       target: { checked: true }
  //     });
  //   expect(changeHandler).toHaveBeenCalled();
  //   changeHandler.mockRestore();
  // });

  it('should ignore events when disabled', () => {
    const changeHandler = jest.fn();
    const wrapper = mount(
      <Radio.Group>
        <Radio value="1" onChange={changeHandler} isDisabled>
          Option 1
        </Radio>
      </Radio.Group>
    );
    wrapper
      .find('input')
      .at(0)
      .simulate('change', {
        ...nativeEvent,
        target: { checked: true }
      });
    expect(changeHandler).not.toHaveBeenCalled();
    changeHandler.mockRestore();
  });

  it('should support react-node in description', () => {
    const wrapper = mount(
      <Radio.Group>
        <Radio value="1">Option 1</Radio>
        <Radio value="2">
          Option 2<Radio.Desc>Description for Option2</Radio.Desc>
        </Radio>
        <Radio value="3">
          Option 3
          <Radio.Desc>
            <b>Description</b> for Option3
          </Radio.Desc>
        </Radio>
      </Radio.Group>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
