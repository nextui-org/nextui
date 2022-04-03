import React from 'react';
import { mount, ReactWrapper, render } from 'enzyme';
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

const expectCheckboxToHaveARIADisabled = (
  wrapper: ReactWrapper,
  value: boolean
) => {
  expect(getCheckboxElement(wrapper).props()['aria-disabled']).toBe(value);
};

describe('Checkbox', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Checkbox checked={true}>Buenos Aires</Checkbox>);
    expect(() => wrapper.unmount()).not.toThrow();
    const rendered = render(<Checkbox>Buenos Aires</Checkbox>);
    expect(rendered.html()).toMatchSnapshot();
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
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with initial value', () => {
    let wrapper = mount(
      <Checkbox initialChecked={true}>Buenos Aires</Checkbox>
    );
    expectCheckboxIsChecked(wrapper, true);

    wrapper = mount(<Checkbox initialChecked={false}>Buenos Aires</Checkbox>);
    expectCheckboxIsChecked(wrapper, false);

    wrapper = mount(<Checkbox initialChecked>Buenos Aires</Checkbox>);
    expectCheckboxIsChecked(wrapper, true);

    wrapper = mount(<Checkbox initialChecked={false}>Buenos Aires</Checkbox>);
    expectCheckboxIsChecked(wrapper, false);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should change value after click', () => {
    const Wrapper = () => {
      const [state, setState] = React.useState<string>('state1');

      return (
        <Checkbox initialChecked onChange={() => setState('state2')}>
          {state}
        </Checkbox>
      );
    };
    const wrapper = mount(<Wrapper />);
    const input = getCheckboxElement(wrapper);
    input.simulate('change');
    expect(wrapper.find('.nextui-checkbox-text').at(0).text()).toContain(
      'state2'
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should ignore events when disabled', () => {
    const Wrapper = () => {
      const [state, setState] = React.useState<string>('state1');

      return (
        <Checkbox disabled onChange={() => setState('state2')}>
          {state}
        </Checkbox>
      );
    };
    const wrapper = mount(<Wrapper />);
    const input = getCheckboxElement(wrapper);
    input.simulate('change');
    expect(wrapper.find('.nextui-checkbox-text').at(0).text()).not.toContain(
      'state2'
    );
    expectCheckboxIsChecked(wrapper, false);
    expectCheckboxToHaveARIAChecked(wrapper, false);
    expectCheckboxToHaveARIADisabled(wrapper, true);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with indeterminate value', () => {
    let wrapper = mount(
      <Checkbox checked indeterminate>
        Buenos Aires
      </Checkbox>
    );

    expect(getCheckboxElement(wrapper).props()['aria-checked']).toBe('mixed');

    wrapper = mount(<Checkbox indeterminate={false}>Buenos Aires</Checkbox>);
    expect(getCheckboxElement(wrapper).props()['aria-checked']).toBe(false);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with line-through value', () => {
    let wrapper = mount(<Checkbox line>Buenos Aires</Checkbox>);
    let icon = wrapper.find('.nextui-checkbox-text').at(0).getDOMNode();
    expect((icon as HTMLInputElement).className).toContain('line-true');

    wrapper = mount(<Checkbox line={false}>Buenos Aires</Checkbox>);
    icon = wrapper.find('.nextui-checkbox-text').at(0).getDOMNode();
    expect((icon as HTMLInputElement).className).not.toContain('line-true');

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
