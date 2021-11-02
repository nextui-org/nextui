import React from 'react';
import { mount } from 'enzyme';
import Pagination from '../pagination';
import { act } from 'react-dom/test-utils';
import { updateWrapper } from 'tests/utils';

describe('Pagination', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Pagination />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('the specified page should be activated', async () => {
    const wrapper = mount(<Pagination total={10} initialPage={2} />);
    expect(wrapper.find('.active').text()).toEqual('2');
    await act(async () => {
      wrapper.setProps({ page: 10 });
    });
    await updateWrapper(wrapper, 200);
    expect(wrapper.find('.active').text()).toEqual('10');
  });

  it('should trigger change event', async () => {
    let current = 1;
    const handler = jest.fn().mockImplementation((val) => (current = val));
    const wrapper = mount(
      <Pagination total={10} initialPage={2} onChange={handler} />
    );

    await act(async () => {
      wrapper.setProps({ page: 10 });
    });
    await updateWrapper(wrapper, 200);
    expect(handler).toHaveBeenCalled();
    expect(current).toEqual(10);

    const btns = wrapper.find('button');
    btns.at(0).simulate('click');
    await updateWrapper(wrapper, 200);
    expect(current).toEqual(9);

    btns.at(btns.length - 1).simulate('click');
    btns.at(btns.length - 1).simulate('click');
    btns.at(btns.length - 1).simulate('click');
    btns.at(btns.length - 1).simulate('click');
    await updateWrapper(wrapper, 200);
    expect(current).toEqual(10);
    handler.mockRestore();
  });

  it('should trigger change event when ellipsis clicked', async () => {
    let current = 20;
    const handler = jest.fn().mockImplementation((val) => (current = val));
    const wrapper = mount(
      <Pagination total={20} initialPage={20} onChange={handler} />
    );
    const btn = wrapper.find('svg').at(0).parents('button');
    btn.at(0).simulate('click');
    await updateWrapper(wrapper, 200);
    expect(handler).toHaveBeenCalled();
    expect(current).toEqual(15);

    await act(async () => {
      wrapper.setProps({ page: 1 });
    });
    await updateWrapper(wrapper, 200);
    const lastBtn = wrapper.find('svg').at(0).parents('button');
    lastBtn.at(0).simulate('click');
    await updateWrapper(wrapper, 200);
    expect(current).toEqual(1 + 5);
  });

  it('another SVG should be displayed when the mouse is moved in', async () => {
    const wrapper = mount(<Pagination total={20} initialPage={20} />);
    const svg = wrapper.find('svg').at(0);
    const btn = svg.parents('button');

    const html = svg.html();
    btn.simulate('mouseEnter');
    await updateWrapper(wrapper);
    expect(html).not.toEqual(wrapper.find('svg').at(0).html());

    btn.simulate('mouseLeave');
    await updateWrapper(wrapper);
    expect(html).toEqual(wrapper.find('svg').at(0).html());
  });

  //   it('custom buttons should be display', () => {
  //     const wrapper = mount(
  //       <Pagination total={20}>
  //         <Pagination.Previous>custom-prev</Pagination.Previous>
  //         <Pagination.Next>custom-next</Pagination.Next>
  //       </Pagination>
  //     );
  //     const btns = wrapper.find('button');
  //     expect(btns.at(0).text()).toEqual('custom-prev');
  //     expect(btns.at(btns.length - 1).text()).toEqual('custom-next');
  //   });
});
