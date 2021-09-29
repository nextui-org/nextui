import React from 'react';
import { mount, render } from 'enzyme';
import User from '../index';

describe(' User', () => {
  it('should render correctly', () => {
    const wrapper = mount(<User name="Junior" />);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should support image and text', () => {
    const wrapper = render(
      <div>
        <User name="Junior" text="Junior" />
        <User
          name="Junior Garcia"
          src="https://avatars.githubusercontent.com/u/30373425?v=4"
        />
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render description correctly', () => {
    const wrapper = mount(<User name="Junior">description</User>);
    expect(wrapper.text().toLowerCase()).toContain('description');
  });

  it('should render link on user.link', () => {
    const wrapper = mount(
      <User name="Junior">
        <User.Link href="https://twitter.com/jrgarciadev">twitter</User.Link>
      </User>
    );
    const link = wrapper.find('a');
    expect(link.length).not.toBe(0);
  });

  it('should pass alt attribute', () => {
    const wrapper = mount(
      <User
        name="Junior"
        src="https://avatars.githubusercontent.com/u/30373425?v=4"
        altText="Junior"
      />
    );
    expect(wrapper.find('img').prop('alt')).toEqual('Junior');
  });
});
