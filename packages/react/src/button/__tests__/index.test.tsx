import React from 'react';
import { mount } from 'enzyme';
import Button from '../index';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Button>Button</Button>);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support all colors', () => {
    const wrapper = mount(
      <div>
        <Button color="primary" />
        <Button color="secondary" />
        <Button color="success" />
        <Button color="warning" />
        <Button color="error" />
        <Button color="gradient" />
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support all sizes', () => {
    const wrapper = mount(
      <div>
        <Button size="xs" />
        <Button size="sm" />
        <Button size="md" />
        <Button size="lg" />
        <Button size="xl" />
      </div>
    );
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render different text', () => {
    const wrapper = mount(<Button>button</Button>);
    expect(wrapper.text()).toContain('button');

    wrapper.setProps({
      children: <span>Hello</span>
    });
    expect(wrapper.text()).toContain('Hello');
  });

  it('should render empty button correctly', () => {
    expect(<Button />).toMatchSnapshot();
  });

  it('should render different variants', () => {
    const wrapper = mount(
      <div>
        <Button flat>button</Button>
        <Button light color="warning">
          light
        </Button>
        <Button flat color="success">
          button
        </Button>
        <Button flat color="warning">
          button
        </Button>
        <Button rounded>button</Button>
        <Button flat>button</Button>
        <Button shadow>button</Button>
        <Button ghost>button</Button>
        <Button bordered>button</Button>
        <Button auto>button</Button>
        <Button animated={false}>button</Button>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
    expect(<Button>button</Button>).toMatchSnapshot();
  });

  it('ref should be forwarded', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const wrapper = mount(<Button ref={ref}>action</Button>);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should trigger callback function', () => {
    const WrapperButton = () => {
      const [state, setState] = React.useState<string>('state1');
      return <Button onClick={() => setState('state2')}>{state}</Button>;
    };
    const wrapper = mount(<WrapperButton />);
    expect(wrapper.text()).toContain('state1');

    wrapper.simulate('click');
    userEvent.click(wrapper.find('button').getDOMNode());
    expect(wrapper.text()).toContain('state2');
  });

  it('should ignore events when disabled', () => {
    const WrapperButton = () => {
      const [state, setState] = React.useState<string>('state1');
      return (
        <Button disabled onClick={() => setState('state2')}>
          {state}
        </Button>
      );
    };
    const wrapper = mount(<WrapperButton />);
    expect(wrapper.text()).toContain('state1');

    userEvent.click(wrapper.find('button').getDOMNode());
    expect(wrapper.text()).toContain('state1');
    expect(wrapper.text()).not.toContain('state2');
  });

  it('should remove expired events', () => {
    const wrapper = mount(<Button>button</Button>);
    userEvent.click(wrapper.find('button').getDOMNode());
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
