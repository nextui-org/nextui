import React from 'react';
import { mount } from 'enzyme';
import Pagination from '../pagination';

describe('Pagination', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Pagination />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
