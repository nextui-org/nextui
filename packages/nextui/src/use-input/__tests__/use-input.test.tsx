import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import useInput from '../index';
import Input from '../../input';

describe('UseInput', () => {
  it('should follow change with use-input 1', () => {
    let log = '';

    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation((msg) => (log = msg));

    const MockInput: React.FC<{ propValue?: string }> = ({ propValue }) => {
      const { value, setValue, bindings } = useInput('');

      useEffect(() => {
        if (propValue) setValue(propValue);
      }, [propValue]);

      useEffect(() => {
        if (value) console.log(value);
      }, [value]);
      return <Input {...bindings} />;
    };

    const wrapper = mount(<MockInput />);
    wrapper.setProps({ propValue: 'test' });
    const input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement;

    expect(input.value).toEqual('test');
    expect(log).toContain('test');

    log = '';
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test-change' } });
    expect(log).toContain('test-change');
    logSpy.mockRestore();
  });

  it('should follow change with use-input 2', () => {
    const MockInput: React.FC<{ value?: string; resetValue?: boolean }> = ({
      value,
      resetValue
    }) => {
      const { reset, setValue, bindings } = useInput('');
      useEffect(() => {
        if (value) setValue(value);
      }, [value]);
      useEffect(() => {
        if (resetValue) reset();
      }, [resetValue]);
      return <Input {...bindings} />;
    };

    const wrapper = mount(<MockInput />);
    wrapper.setProps({ value: 'test' });
    let input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('test');

    wrapper.setProps({ resetValue: true });
    input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual('');
  });
});
