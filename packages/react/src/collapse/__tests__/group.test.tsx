import React from 'react';
import { mount, render, ReactWrapper } from 'enzyme';
import Collapse from '../index';
import { updateWrapper } from 'tests/utils';

const getCollapseElement = (wrapper: ReactWrapper, className: string) => {
  return wrapper.find(className).at(0).find('.nextui-collapse-view').at(0);
};

const expectCollapseToHaveARIAExpanded = (
  wrapper: ReactWrapper,
  className: string,
  value: boolean
) => {
  expect(getCollapseElement(wrapper, className).props()['aria-expanded']).toBe(
    value
  );
};

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
        <Collapse className="test-collapse-1" title="title1">
          content1
        </Collapse>
        <Collapse className="test-collapse-2" title="title2">
          content2
        </Collapse>
      </Collapse.Group>
    );

    const view1 = getCollapseElement(wrapper, '.test-collapse-1');
    const view2 = getCollapseElement(wrapper, '.test-collapse-2');

    view1.at(0).simulate('click');
    view2.at(0).simulate('click');

    await updateWrapper(wrapper, 300);

    expectCollapseToHaveARIAExpanded(wrapper, '.test-collapse-1', true);
    expectCollapseToHaveARIAExpanded(wrapper, '.test-collapse-2', true);

    view1.at(0).simulate('click');
    view2.at(0).simulate('click');

    await updateWrapper(wrapper, 300);

    expectCollapseToHaveARIAExpanded(wrapper, '.test-collapse-1', false);
    expectCollapseToHaveARIAExpanded(wrapper, '.test-collapse-2', false);
  });

  it('should be display one when is in accordion mode', async () => {
    const wrapper = mount(
      <Collapse.Group>
        <Collapse className="test-collapse-1" title="title1">
          content1
        </Collapse>
        <Collapse className="test-collapse-2" title="title2">
          content2
        </Collapse>
      </Collapse.Group>
    );

    const view2 = getCollapseElement(wrapper, '.test-collapse-2');

    view2.at(0).simulate('click');
    await updateWrapper(wrapper, 300);

    expectCollapseToHaveARIAExpanded(wrapper, '.test-collapse-1', false);
    expectCollapseToHaveARIAExpanded(wrapper, '.test-collapse-2', true);
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
        <Collapse className="test-collapse" title="title2">
          content3
        </Collapse>
      </Collapse.Group>
    );
    const view = getCollapseElement(wrapper, '.test-collapse');
    view.at(0).simulate('click');

    expect(callback).toHaveBeenCalled();
    expect(index).toBe(3);
    expect(value).toBe(true);
  });
});
