import React from 'react';
import { mount, render } from 'enzyme';
import Collapse from '../index';
import { updateWrapper } from 'tests/utils';

describe('Collapse Group', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Collapse.Group>
        <Collapse title="title1">content1</Collapse>
        <Collapse title="title2">content2</Collapse>
      </Collapse.Group>
    );

    expect(wrapper).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should be no errors when children are missing', () => {
    const wrapper = mount(<Collapse.Group></Collapse.Group>);

    expect(wrapper).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work without accordion', () => {
    const wrapper = render(
      <Collapse.Group accordion={false}>
        <Collapse title="title1">content1</Collapse>
        <Collapse title="title2">content2</Collapse>
      </Collapse.Group>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should work with bordered', () => {
    const wrapper = render(
      <Collapse.Group bordered={true}>
        <Collapse title="title1">content1</Collapse>
        <Collapse title="title2">content2</Collapse>
      </Collapse.Group>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should be display all when without accordion', async () => {
    const wrapper = mount(
      <Collapse.Group accordion={false}>
        <Collapse title="title1">content1</Collapse>
        <Collapse title="title2">content2</Collapse>
      </Collapse.Group>
    );

    const views = wrapper.find('.nextui-collapse-view');
    views.at(0).simulate('click');
    views.at(1).simulate('click');
    await updateWrapper(wrapper, 300);
    expect(wrapper.find('.expanded').length).toBe(2);

    views.at(0).simulate('click');
    views.at(1).simulate('click');
    await updateWrapper(wrapper, 300);
    expect(wrapper.find('.expanded').length).toBe(0);
  });

  it('should be display one when in accordion mode', async () => {
    const wrapper = mount(
      <Collapse.Group>
        <Collapse title="title1">content1</Collapse>
        <Collapse title="title2">content2</Collapse>
      </Collapse.Group>
    );

    const views = wrapper.find('.nextui-collapse-view');
    views.at(0).simulate('click');
    views.at(1).simulate('click');
    await updateWrapper(wrapper, 300);
    expect(wrapper.find('.expanded').length).toBe(1);

    views.at(1).simulate('click');
    await updateWrapper(wrapper, 300);
    expect(wrapper.find('.expanded').length).toBe(0);
  });

  it('should trigger event when collapse changed', () => {
    let index = 0;
    let value = false;

    const callback = jest
      .fn()
      .mockImplementation((idx: number | undefined, val: boolean) => {
        index = idx || 0;
        value = val;
      });

    const wrapper = mount(
      <Collapse.Group onChange={callback}>
        <Collapse title="title1">content1</Collapse>
        <Collapse title="title2">content2</Collapse>
        <Collapse title="title2">content3</Collapse>
      </Collapse.Group>
    );
    const views = wrapper.find('.nextui-collapse-view');
    views.at(2).simulate('click');

    expect(callback).toHaveBeenCalled();
    expect(index).toBe(3);
    expect(value).toBe(true);
  });
});
