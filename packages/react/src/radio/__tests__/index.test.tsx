import React from 'react';
import { mount } from 'enzyme';
import userEvent from '@testing-library/user-event';
import { nativeEvent } from '../../../tests/utils';
import Radio from '../index';
import type { ReactWrapper } from 'enzyme';

const getRadioElement = (wrapper: ReactWrapper) => {
  return wrapper.find('input');
};

const expectRadioIsChecked = (wrapper: ReactWrapper, value: boolean) => {
  expect(getRadioElement(wrapper).props().checked).toBe(value);
};

describe('Radio', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <div>
        <Radio.Group label="Options">
          <Radio value="1">Option 1</Radio>
        </Radio.Group>
        <Radio.Group label="Options" defaultValue="1" orientation="horizontal">
          <Radio value="1">1</Radio>
          <Radio value="2">2</Radio>
        </Radio.Group>
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support circle and square', () => {
    const circle = mount(
      <Radio.Group label="Options">
        <Radio value="1">Option 1</Radio>
      </Radio.Group>
    );
    const circleDOM = circle.find('.nextui-radio-label').at(0).getDOMNode();
    expect(circleDOM.className).toContain('isSquared-false');
    expect(() => circle.unmount()).not.toThrow();
    const square = mount(
      <Radio.Group label="Options">
        <Radio value="1" isSquared>
          Option 1
        </Radio>
      </Radio.Group>
    );
    const squareDOM = square.find('.nextui-radio-label').at(0).getDOMNode();
    expect(squareDOM.className).toContain('isSquared-true');
    expect(() => square.unmount()).not.toThrow();
  });

  it('should work correctly with different sizes', () => {
    const wrapper = mount(
      <Radio.Group label="Options">
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
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with different colors', () => {
    const wrapper = mount(
      <Radio.Group label="Options">
        <Radio value="primary" color="primary" label="primary" />
        <Radio value="secondary" color="secondary" label="secondary" />
        <Radio value="success" color="success" label="success" />
        <Radio value="warning" color="warning" label="warning" />
        <Radio value="error" color="error" label="error" />
      </Radio.Group>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with different textColors', () => {
    const wrapper = mount(
      <Radio.Group label="Options">
        <Radio value="primary" labelColor="primary" label="primary" />
        <Radio value="secondary" labelColor="secondary" label="secondary" />
        <Radio value="success" labelColor="success" label="success" />
        <Radio value="warning" labelColor="warning" label="warning" />
        <Radio value="error" labelColor="error" label="error" />
      </Radio.Group>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support react-node in description', () => {
    const wrapper = mount(
      <Radio.Group label="Options">
        <Radio value="1">Option 1</Radio>
        <Radio value="2" description="Description for Option2">
          Option 2
        </Radio>
        <Radio
          value="3"
          description={
            <p>
              <b>Description</b> for Option3
            </p>
          }
        >
          Option 3
        </Radio>
      </Radio.Group>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render correctly with value prop', () => {
    let value = '1';
    const wrapper = mount(
      <Radio.Group
        label="Options"
        defaultValue="2"
        onChange={(val) => (value = val)}
      >
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>
    );
    const option1DOM = getRadioElement(wrapper)
      .at(0)
      .getDOMNode() as HTMLInputElement;
    const option2DOM = getRadioElement(wrapper)
      .at(1)
      .getDOMNode() as HTMLInputElement;
    userEvent.click(option1DOM);
    expect(value).toEqual('1');
    expect(option1DOM.checked).toEqual(true);
    expect(option2DOM.checked).toEqual(false);
    userEvent.click(option2DOM);
    expect(value).toEqual('2');
    expect(option1DOM.checked).toEqual(false);
    expect(option2DOM.checked).toEqual(true);
  });

  it('should trigger events', () => {
    let value = '';
    const changeHandler = jest.fn().mockImplementation((val) => (value = val));
    const wrapper = mount(
      <Radio.Group label="Options" onChange={changeHandler}>
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>
    );
    wrapper
      .find('input')
      .at(0)
      .simulate('change', {
        ...nativeEvent,
        target: { checked: true }
      });
    expect(changeHandler).toHaveBeenCalled();
    expect(value).toEqual('1');
    changeHandler.mockRestore();
  });

  it('should ignore events when disabled', () => {
    const changeHandler = jest.fn();
    const wrapper = mount(
      <Radio.Group label="Options" onChange={changeHandler} isDisabled>
        <Radio value="1">Option 1</Radio>
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

  it('should render correctly with default-value', () => {
    const wrapper = mount(
      <Radio.Group label="Options" defaultValue="1">
        <Radio value="1">Option 1</Radio>
      </Radio.Group>
    );
    expectRadioIsChecked(wrapper, true);
  });

  it('should be warning when value unset', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(
      <Radio.Group label="Options">
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
      <Radio.Group label="Options">
        <Radio value="1" checked>
          Option 1
        </Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>
    );
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
