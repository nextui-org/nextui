import React from 'react';
import { mount, render, shallow } from 'enzyme';
import { Avatar } from '@components';

describe('AvatarGroup', () => {
  it('group component should render all children', () => {
    const group = mount(
      <Avatar.Group>
        <Avatar />
        <Avatar />
      </Avatar.Group>
    );
    expect(group.find('.avatar')).toHaveLength(2);
  });

  it('should stacked when avatars are in a group', () => {
    const group = render(
      <Avatar.Group>
        <Avatar />
        <Avatar />
      </Avatar.Group>
    );
    expect(group).toMatchSnapshot();
  });

  it('should show count in group', () => {
    const count = 20;
    const group = shallow(<Avatar.Group count={count} />);
    const text = group.find('.count').text();
    expect(text).toContain(count);
  });
});
