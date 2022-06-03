import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import userEvent from '@testing-library/user-event';
import Checkbox from '../index';

const getCheckboxElement = (wrapper: ReactWrapper) => {
  return wrapper.find('input');
};

const expectCheckboxIsChecked = (wrapper: ReactWrapper, value: boolean) => {
  expect(getCheckboxElement(wrapper).props().checked).toBe(value);
};

const expectCheckboxToHaveARIAChecked = (
  wrapper: ReactWrapper,
  value: boolean
) => {
  expect(getCheckboxElement(wrapper).props()['aria-checked']).toBe(value);
};

describe('Checkbox', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Checkbox isSelected={true}>Buenos Aires</Checkbox>);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with different sizes', () => {
    const wrapper = mount(
      <div>
        <Checkbox size="xs">mini</Checkbox>
        <Checkbox size="sm">small</Checkbox>
        <Checkbox size="md">medium</Checkbox>
        <Checkbox size="lg">large</Checkbox>
        <Checkbox size="xl">xlarge</Checkbox>
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with initial value', () => {
    let wrapper = mount(<Checkbox isSelected={true}>Buenos Aires</Checkbox>);
    expectCheckboxIsChecked(wrapper, true);

    wrapper = mount(<Checkbox isSelected={false}>Buenos Aires</Checkbox>);
    expectCheckboxIsChecked(wrapper, false);

    wrapper = mount(<Checkbox isSelected>Buenos Aires</Checkbox>);
    expectCheckboxIsChecked(wrapper, true);

    wrapper = mount(<Checkbox isSelected={false}>Buenos Aires</Checkbox>);
    expectCheckboxIsChecked(wrapper, false);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should change value after click', () => {
    const Wrapper = () => {
      const [state, setState] = React.useState<string>('state1');

      return (
        <Checkbox isSelected onChange={() => setState('state2')}>
          {state}
        </Checkbox>
      );
    };
    const wrapper = mount(<Wrapper />);
    const input = getCheckboxElement(wrapper);
    userEvent.click(input.getDOMNode());
    expect(wrapper.find('.nextui-checkbox-text').at(0).text()).toContain(
      'state2'
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should ignore events when disabled', () => {
    const Wrapper = () => {
      const [state, setState] = React.useState<string>('state1');

      return (
        <Checkbox isDisabled onChange={() => setState('state2')}>
          {state}
        </Checkbox>
      );
    };
    const wrapper = mount(<Wrapper />);
    const input = getCheckboxElement(wrapper);
    userEvent.click(input.getDOMNode());
    expect(wrapper.find('.nextui-checkbox-text').at(0).text()).toContain(
      'state1'
    );
    expectCheckboxIsChecked(wrapper, false);
    expectCheckboxToHaveARIAChecked(wrapper, false);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with indeterminate value', () => {
    let wrapper = mount(
      <Checkbox isSelected isIndeterminate>
        Buenos Aires
      </Checkbox>
    );

    expect(getCheckboxElement(wrapper).props()['aria-checked']).toBe('mixed');

    wrapper = mount(<Checkbox isIndeterminate={false}>Buenos Aires</Checkbox>);
    expect(getCheckboxElement(wrapper).props()['aria-checked']).toBe(false);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with line-through value', () => {
    let wrapper = mount(<Checkbox lineThrough>Buenos Aires</Checkbox>);
    let icon = wrapper.find('.nextui-checkbox-text').at(0).getDOMNode();
    expect((icon as HTMLInputElement).className).toContain('lineThrough-true');

    wrapper = mount(<Checkbox lineThrough={false}>Buenos Aires</Checkbox>);
    icon = wrapper.find('.nextui-checkbox-text').at(0).getDOMNode();
    expect((icon as HTMLInputElement).className).not.toContain(
      'lineThrough-true'
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
