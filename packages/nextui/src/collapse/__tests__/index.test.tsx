import React from 'react';
import { mount, render } from 'enzyme';
import Collapse from '../index';
import { updateWrapper } from 'tests/utils';

describe('Collapse', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Collapse title="title">content</Collapse>);
    expect(wrapper).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with subtitle and shadow', () => {
    const wrapper = render(
      <div>
        <Collapse title="title" subtitle="subtitle">
          content
        </Collapse>
        <Collapse title="title" subtitle="subtitle" shadow>
          content
        </Collapse>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should work with initial visible', () => {
    const wrapper = render(
      <div>
        <Collapse title="title" subtitle="subtitle">
          content
        </Collapse>
        <Collapse title="title" initialVisible>
          content
        </Collapse>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should throw error when title missing', () => {
    const Component = Collapse as any;
    let errorMessage = '';
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((msg) => (errorMessage = msg));

    mount(<Component subtitle="subtitle">content</Component>);
    expect(errorMessage.toLowerCase()).not.toEqual('');
    errorSpy.mockRestore();
  });

  it('should expand when title clicked', async () => {
    const wrapper = mount(<Collapse title="title">content</Collapse>);
    wrapper.find('.view').at(0).simulate('click');
    await updateWrapper(wrapper, 300);
    expect(wrapper.find('.expanded').length).not.toBe(0);
  });
});
