import React from 'react';
import { mount } from 'enzyme';
import Radio from '../index';
import { nativeEvent } from '../../../tests/utils';

describe('Radio Group', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <div>
        <Radio.Group value="1">
          <Radio value="1">1</Radio>
          <Radio value="2">2</Radio>
        </Radio.Group>
        <Radio.Group value="1" row>
          <Radio value="1">1</Radio>
          <Radio value="2">2</Radio>
        </Radio.Group>
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with different sizes', () => {
    const wrapper = mount(
      <div>
        <Radio.Group value="1" size="mini">
          <Radio value="1">1</Radio>
        </Radio.Group>
        <Radio.Group value="1" size="small">
          <Radio value="1">1</Radio>
        </Radio.Group>
        <Radio.Group value="1" size="large">
          <Radio value="1">1</Radio>
        </Radio.Group>
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should trigger events in group', () => {
    let value = '';
    const changeHandler = jest.fn().mockImplementation((val) => (value = val));
    const wrapper = mount(
      <Radio.Group onChange={changeHandler}>
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>
    );

    wrapper
      .find('input')
      .at(0)
      .simulate('change', {
        ...nativeEvent,
        target: { checked: true },
      });
    expect(changeHandler).toHaveBeenCalled();
    expect(value).toEqual('1');
    changeHandler.mockRestore();
  });

  it('the radio value should be support number', () => {
    let value = '';
    const changeHandler = jest.fn().mockImplementation((val) => (value = val));
    const wrapper = mount(
      <Radio.Group onChange={changeHandler}>
        <Radio value={5}>Option 1</Radio>
        <Radio value={10}>Option 2</Radio>
      </Radio.Group>
    );

    wrapper
      .find('input')
      .at(0)
      .simulate('change', {
        ...nativeEvent,
        target: { checked: true },
      });
    expect(changeHandler).toHaveBeenCalled();
    expect(value).toEqual(5);
    changeHandler.mockRestore();
  });

  it('should ignore events when disabled', () => {
    const changeHandler = jest.fn();
    const wrapper = mount(
      <Radio.Group onChange={changeHandler} disabled>
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>
    );

    wrapper
      .find('input')
      .at(0)
      .simulate('change', {
        ...nativeEvent,
        target: { checked: true },
      });
    expect(changeHandler).not.toHaveBeenCalled();
    changeHandler.mockRestore();
  });

  it('should render correctly with inital-value', () => {
    const wrapper = mount(
      <Radio.Group initialValue="2">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>
    );
    const input = wrapper.find('input').at(1).getDOMNode() as HTMLInputElement;
    expect(input.checked).toEqual(true);
  });

  it('should be warning when value unset', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(
      <Radio.Group>
        <Radio>Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>
    );

    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('should be warning when checked is set', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(
      <Radio.Group>
        <Radio value="1" checked>
          Option 1
        </Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>
    );

    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('should set state through value prop', () => {
    const wrapper = mount(
      <Radio.Group>
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>
    );
    let input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement;
    expect(input.checked).toEqual(false);

    wrapper.setProps({ value: '1' });
    input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement;
    expect(input.checked).toEqual(true);

    wrapper.setProps({ value: '2' });
    input = wrapper.find('input').at(1).getDOMNode() as HTMLInputElement;
    expect(input.checked).toEqual(true);
  });
});
