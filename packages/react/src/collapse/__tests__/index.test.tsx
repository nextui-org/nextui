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

  it('should work with content title', () => {
    const wrapper = render(
      <div>
        <Collapse title="title" subtitle="subtitle">
          content
        </Collapse>
        <Collapse title={<h1>title</h1>} subtitle="subtitle" shadow>
          content
        </Collapse>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should work without divider', () => {
    const wrapper = render(
      <div>
        <Collapse divider={false} title="title">
          content
        </Collapse>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should work with content subtitle and shadow', () => {
    const wrapper = render(
      <div>
        <Collapse title="title" subtitle="subtitle">
          content
        </Collapse>
        <Collapse title="title" subtitle={<h1>subtitle</h1>} shadow>
          content
        </Collapse>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should work with initial visible', () => {
    const wrapper = render(
      <div>
        <Collapse title="title" subtitle="subtitle">
          content
        </Collapse>
        <Collapse title="title" expanded>
          content
        </Collapse>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should switch visibility with expanded prop', async () => {
    const wrapper = mount(
      <Collapse title="title" subtitle="subtitle">
        content
      </Collapse>
    );

    wrapper.setProps({ expanded: true });
    await updateWrapper(wrapper, 300);

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ expanded: false });
    await updateWrapper(wrapper, 300);

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
    wrapper.find('.nextui-collapse-view').at(0).simulate('click');
    await updateWrapper(wrapper, 300);
    expect(wrapper.find('.nextui-expand-content').length).not.toBe(0);
  });

  it('should work without animation', async () => {
    const wrapper = mount(
      <Collapse title="title" animated={false}>
        content
      </Collapse>
    );
    wrapper.find('.nextui-collapse-view').at(0).simulate('click');
    await updateWrapper(wrapper, 300);
    expect(wrapper.find('.nextui-expand-content').length).not.toBe(0);
  });

  it('should be work with content', () => {
    const wrapper = mount(
      <div>
        <Collapse
          title="Content left test"
          contentLeft={<span id="test-icon">test-icon</span>}
        />
      </div>
    );
    expect(wrapper.find('#test-icon').at(0)).not.toBeNull();
  });

  it('should be work with a custom arrow icon', () => {
    const wrapper = mount(
      <div>
        <Collapse
          title="Content left test"
          arrowIcon={<span id="test-icon">test-icon</span>}
        />
      </div>
    );
    expect(wrapper.find('#test-icon').at(0)).not.toBeNull();
  });

  it('should be work without arrow icon', () => {
    const wrapper = mount(
      <div>
        <Collapse
          title="Content left test"
          showArrow={false}
          arrowIcon={<span id="test-icon">test-icon</span>}
        />
      </div>
    );
    expect(wrapper.find('#test-icon').length).toBe(0);
  });

  it('should trigger event when collapse changed', () => {
    let value = false;

    const callback = jest
      .fn()
      .mockImplementation(
        (
          _: React.MouseEvent<HTMLDivElement, MouseEvent>,
          __: number | undefined,
          val: boolean
        ) => {
          value = val;
        }
      );

    const wrapper = mount(
      <Collapse title="Changed test" onChange={callback} />
    );

    wrapper.find('.nextui-collapse-view').at(0).simulate('click');

    expect(callback).toHaveBeenCalled();
    expect(value).toBe(true);
  });
});
