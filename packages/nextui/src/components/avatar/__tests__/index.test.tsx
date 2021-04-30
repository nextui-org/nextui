import React from 'react';
import { mount, render, shallow } from 'enzyme';
import { Avatar } from '@components';

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

  it('should throw error when avatar color is invalid', () => {
    let errorMessage = '';
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((msg) => (errorMessage = msg));
    mount(<Avatar color="#kajsdkl" />);
    expect(errorMessage).toContain('is not a valid color');
    errorSpy.mockRestore();
  });
});
