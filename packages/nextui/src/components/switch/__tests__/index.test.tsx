import React from 'react';
import { mount, shallow, ReactWrapper } from 'enzyme';
import { Switch } from '@components';
import { nativeEvent, updateWrapper } from '@tests/utils';

interface IconProps {
  className?: string;
}

const Icon: React.FC<IconProps> = ({ className = '' }) => (
  <svg className={className} />
);

const expectSwitchIsChecked = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.checked').length).not.toBe(0);
};

const expectSwitchIsUnChecked = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.checked').length).toBe(0);
};

describe('Switch', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Switch />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support square and circle', () => {
    const circle = shallow(<Switch />);
    expect(() => circle.unmount()).not.toThrow();
    const square = shallow(<Switch squared />);
    expect(() => square.unmount()).not.toThrow();
  });

  it('should render correctly with an icon', () => {
    const wrapper = mount(<Switch icon={<Icon />} />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render correctly with an iconOn', () => {
    const wrapper = mount(<Switch iconOn={<Icon />} />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render correctly with an iconOff', () => {
    const wrapper = mount(<Switch iconOff={<Icon />} />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render correctly with both icons on/off', () => {
    const wrapper = mount(<Switch iconOn={<Icon />} iconOff={<Icon />} />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should trigger events when switch changed and change icons on/off', async () => {
    const wrapper = mount(
      <Switch
        initialChecked={false}
        iconOn={<Icon className="icon-on" />}
        iconOff={<Icon className="icon-off" />}
      />
    );

    let icon = wrapper.find('.icon-off').at(0).getDOMNode() as SVGSVGElement;
    expect(icon).not.toBeNull();

    wrapper.find('input').simulate('change', {
      ...nativeEvent,
      target: { checked: true },
    });
    await updateWrapper(wrapper);
    expectSwitchIsChecked(wrapper);

    icon = wrapper.find('.icon-on').at(0).getDOMNode() as SVGSVGElement;
    expect(icon).not.toBeNull();
  });

  it('should throw error when icon is left over', () => {
    let errorMessage = '';
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((msg) => (errorMessage = msg));
    mount(<Switch icon={<Icon />} iconOn={<Icon />} />);
    expect(errorMessage).toContain('Remove props "icon"');
    errorSpy.mockRestore();
  });

  it('should work with different colors', () => {
    const wrapper = mount(
      <div>
        <Switch color="primary" />
        <Switch color="secondary" />
        <Switch color="success" />
        <Switch color="warning" />
        <Switch color="error" />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with different sizes', () => {
    const wrapper = mount(
      <div>
        <Switch size="mini" />
        <Switch size="small" />
        <Switch size="medium" />
        <Switch size="large" />
        <Switch size="xlarge" />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should set switch follow checked prop', async () => {
    const wrapper = mount(<Switch initialChecked={true} />);
    expectSwitchIsChecked(wrapper);

    wrapper.setProps({ checked: false });
    await updateWrapper(wrapper);
    expectSwitchIsUnChecked(wrapper);

    wrapper.setProps({ checked: true });
    await updateWrapper(wrapper);
    expectSwitchIsChecked(wrapper);
  });

  it('should trigger events when switch changed', async () => {
    let checked = false;
    const changeHandler = jest
      .fn()
      .mockImplementation((e) => (checked = e.target.checked));
    const wrapper = mount(<Switch onChange={changeHandler} />);

    wrapper.find('input').simulate('change', {
      ...nativeEvent,
      target: { checked: true },
    });
    await updateWrapper(wrapper);
    expectSwitchIsChecked(wrapper);

    expect(changeHandler).toHaveBeenCalled();
    expect(checked).toEqual(true);
  });

  it('should ignore events when switch disabled', async () => {
    const changeHandler = jest.fn();
    const wrapper = mount(<Switch onChange={changeHandler} disabled />);

    wrapper.find('input').simulate('change', {
      ...nativeEvent,
      target: { checked: true },
    });
    await updateWrapper(wrapper);
    expectSwitchIsUnChecked(wrapper);

    expect(changeHandler).not.toHaveBeenCalled();
  });
});
