import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Avatar from '../index';

describe('AvatarGroup', () => {
  it('should render correctly', () => {
    const pictureUsers = [
      'https://i.pravatar.cc/300?u=a042581f4e29026705d',
      'https://i.pravatar.cc/300?u=a042581f4e29026706d',
      'https://i.pravatar.cc/300?u=a042581f4e29026707d',
      'https://i.pravatar.cc/300?u=a042581f4e29026709d',
      'https://i.pravatar.cc/300?u=a042581f4f29026709d'
    ];
    const nameUsers = ['Junior', 'Jane', 'W', 'John'];
    const wrapper = mount(
      <Avatar.Group animated>
        {pictureUsers.map((url, index) => (
          <Avatar key={index} src={url} bordered stacked />
        ))}
      </Avatar.Group>
    );
    expect(() => wrapper.unmount()).not.toThrow();
    const rendered = render(
      <Avatar.Group animated={false}>
        {nameUsers.map((name, index) => (
          <Avatar key={index} text={name} bordered stacked />
        ))}
      </Avatar.Group>
    );
    expect(rendered).toMatchSnapshot();
  });

  it('group component should render all children', () => {
    const group = mount(
      <Avatar.Group>
        <Avatar text="1" />
        <Avatar text="2" />
      </Avatar.Group>
    );
    expect(group.find('Avatar')).toHaveLength(2);
  });

  it('should stacked when avatars are in a group', () => {
    const group = render(
      <Avatar.Group>
        <Avatar text="1" />
        <Avatar text="2" />
      </Avatar.Group>
    );
    expect(group).toMatchSnapshot();
  });

  it('should show count in group', () => {
    const count = 20;
    const group = shallow(<Avatar.Group count={count} />);
    const text = group.find('.nextui-avatar-group-count').text();
    expect(text).toContain(count);
  });
});
