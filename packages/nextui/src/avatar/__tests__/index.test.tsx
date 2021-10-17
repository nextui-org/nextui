import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Avatar from '../index';

interface IconProps {
  className?: string;
}

const Icon: React.FC<IconProps> = ({ className = '' }) => (
  <svg className={className} />
);

describe('Avatar', () => {
  it('should support square and circle', () => {
    const circle = shallow(<Avatar />);
    expect(() => circle.unmount()).not.toThrow();
    const square = shallow(<Avatar squared />);
    expect(() => square.unmount()).not.toThrow();
  });

  it('should render text element', () => {
    const imageAvatar = render(<Avatar />);
    expect(imageAvatar).toMatchSnapshot();
    const textAvatar = render(<Avatar text="text" />);
    expect(textAvatar).toMatchSnapshot();
  });

  it('should work with different colors', () => {
    const wrapper = mount(
      <div>
        <Avatar color="primary" />
        <Avatar color="secondary" />
        <Avatar color="success" />
        <Avatar color="warning" />
        <Avatar color="error" />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with a gradient color', () => {
    const wrapper = mount(<Avatar color="gradient" />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with pointer', () => {
    const wrapper = mount(<Avatar pointer />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with zoomed', () => {
    const wrapper = mount(<Avatar zoomed />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render correctly with an icon', () => {
    const wrapper = mount(<Avatar icon={<Icon />} />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should omit long chars automatically', () => {
    const avatar = mount(<Avatar text="loremipsumtextlarge" />);
    const text = avatar.find('.avatar-text').text();
    expect(text.length).toBeLessThan(4);
  });

  it('stacked should be work', () => {
    const avatar = shallow(
      <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026705d" stacked />
    );
    expect(() => avatar.unmount()).not.toThrow();
  });

  it('should work correctly with different sizes', () => {
    const wrapper = mount(
      <div>
        <Avatar size="mini" />
        <Avatar size="small" />
        <Avatar size="medium" />
        <Avatar size="large" />
        <Avatar size="xlarge" />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render component of a specified size', () => {
    const avatar = render(<Avatar size={20} />);
    expect(avatar).toMatchSnapshot();
  });
});
