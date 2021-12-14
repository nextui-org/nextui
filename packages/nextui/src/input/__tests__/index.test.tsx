import React from 'react';
import { mount } from 'enzyme';
import { Input } from '../../index';
import { nativeEvent } from '../../../tests/utils';

describe('Input', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Input placeholder="placeholder" />);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with different sizes', () => {
    const wrapper = mount(
      <div>
        <Input size="xs" />
        <Input size="sm" />
        <Input size="lg" />
        <Input size="xl" />
        <Input width="50%" />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should work with different status', () => {
    const wrapper = mount(
      <div>
        <Input color="secondary" />
        <Input color="success" />
        <Input color="warning" />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should be work with label', () => {
    const wrapper = mount(
      <div>
        <Input label="label" />
        <Input labelRight="label" />
        <Input labelLeft="label" />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should be work with content', () => {
    const wrapper = mount(
      <div>
        <Input contentLeft={<span>test-icon</span>} />
        <Input contentRight={<span>test-icon</span>} />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should set input from value', () => {
    let wrapper = mount(<Input initialValue="test" />);
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('test');

    wrapper = mount(<Input value="test2" />);
    input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('test2');

    wrapper.setProps({ value: 'test3' });
    input = wrapper.find('input').getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('test3');
  });

  it('should trigger event when input changed', () => {
    let value = '';
    const callback = jest
      .fn()
      .mockImplementation(
        (e: React.ChangeEvent<HTMLInputElement>) => (value = e.target.value)
      );
    const wrapper = mount(<Input onChange={callback} />);
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } });
    expect(callback).toHaveBeenCalled();
    expect(value).toEqual('test');
  });

  it('should ignore event when input disabled', () => {
    const callback = jest.fn();
    const wrapper = mount(<Input onChange={callback} disabled />);
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } });
    expect(callback).not.toHaveBeenCalled();
  });

  it('should ignore event when input readonly', () => {
    const callback = jest.fn();
    const wrapper = mount(<Input onChange={callback} readOnly />);
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } });
    expect(callback).not.toHaveBeenCalled();
  });

  it('should clear text', () => {
    let value = '';
    const callback = jest
      .fn()
      .mockImplementation(
        (e: React.ChangeEvent<HTMLInputElement>) => (value = e.target.value)
      );
    const clearHandler = jest.fn();
    const wrapper = mount(
      <Input onChange={callback} clearable onClearClick={clearHandler} />
    );

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } });
    expect(callback).toHaveBeenCalled();
    expect(value).toEqual('test');

    wrapper
      .find('.nextui-input-clear-button')
      .at(0)
      .simulate('click', nativeEvent);
    expect(clearHandler).toHaveBeenCalled();
    expect(value).toEqual('');
  });

  it('should trigger focus correctly', () => {
    const focus = jest.fn();
    const blur = jest.fn();
    const wrapper = mount(<Input onFocus={focus} onBlur={blur} />);

    const input = wrapper.find('input').at(0);
    input.simulate('focus');
    expect(focus).toHaveBeenCalled();
    input.simulate('blur');
    expect(blur).toHaveBeenCalled();
  });

  it('should trigger content event', () => {
    const click = jest.fn();
    const wrapper = mount(
      <Input
        contentLeft={<span id="test-icon">icon</span>}
        onContentClick={click}
        contentClickable
      />
    );
    wrapper.find('#test-icon').simulate('click', nativeEvent);
    expect(click).toHaveBeenCalled();
  });

  it('should ignore content event when input is disabled', () => {
    const click = jest.fn();
    const wrapper = mount(
      <Input
        contentLeft={<span id="test-icon">icon</span>}
        onContentClick={click}
        contentClickable
        disabled
      />
    );
    wrapper.find('#test-icon').simulate('click', nativeEvent);
    expect(click).not.toHaveBeenCalled();
  });

  // check ref is available: https://github.com/geist-org/react/issues/189
  it('should forward ref by default', () => {
    const ref = React.createRef<HTMLInputElement>();
    const wrapper = mount(<Input ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
