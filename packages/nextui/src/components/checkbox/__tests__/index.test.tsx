import React from 'react';
import { mount, render } from 'enzyme';
import { Checkbox } from '@components';

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
        <Checkbox size="mini">mini</Checkbox>
        <Checkbox size="small">small</Checkbox>
        <Checkbox size="medium">medium</Checkbox>
        <Checkbox size="large">large</Checkbox>
        <Checkbox size="xlarge">xlarge</Checkbox>
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with initial value', () => {
    let wrapper = mount(<Checkbox checked={true}>Buenos Aires</Checkbox>);
    let input = wrapper.find('input').getDOMNode();
    expect((input as HTMLInputElement).checked).toBeTruthy();

    wrapper = mount(<Checkbox checked={false}>Buenos Aires</Checkbox>);
    input = wrapper.find('input').getDOMNode();
    expect((input as HTMLInputElement).checked).not.toBeTruthy();

    wrapper = mount(<Checkbox initialChecked>Buenos Aires</Checkbox>);
    input = wrapper.find('input').getDOMNode();
    expect((input as HTMLInputElement).checked).toBeTruthy();

    wrapper = mount(<Checkbox initialChecked={false}>Buenos Aires</Checkbox>);
    input = wrapper.find('input').getDOMNode();
    expect((input as HTMLInputElement).checked).not.toBeTruthy();

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
    const input = wrapper.find('input').at(0);
    input.simulate('change');
    expect(wrapper.find('.text').text()).toContain('state2');
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
    const input = wrapper.find('input').at(0);
    input.simulate('change');
    expect(wrapper.find('.text').text()).not.toContain('state2');
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with indeterminate value', () => {
    let wrapper = mount(<Checkbox indeterminate>Buenos Aires</Checkbox>);
    let icon = wrapper.find('i').getDOMNode();
    expect((icon as HTMLInputElement).className).toContain('indeterminate');

    wrapper = mount(<Checkbox indeterminate={false}>Buenos Aires</Checkbox>);
    icon = wrapper.find('i').getDOMNode();
    expect((icon as HTMLInputElement).className).not.toContain('indeterminate');

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with line-through value', () => {
    let wrapper = mount(<Checkbox line>Buenos Aires</Checkbox>);
    let icon = wrapper.find('.text').getDOMNode();
    expect((icon as HTMLInputElement).className).toContain('line-through');

    wrapper = mount(<Checkbox line={false}>Buenos Aires</Checkbox>);
    icon = wrapper.find('.text').getDOMNode();
    expect((icon as HTMLInputElement).className).not.toContain('line-through');

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
