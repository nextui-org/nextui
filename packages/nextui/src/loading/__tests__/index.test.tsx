import React from 'react';
import { mount } from 'enzyme';
import Loading from '../index';

describe('Loading', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Loading />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).toMatchSnapshot();
  });

  it('should render with default aria-label', () => {
    const wrapper = mount(<Loading />);
    expect(wrapper.find('.nextui-loading').at(0).prop('aria-label')).toEqual(
      'Loading'
    );
  });

  it('should render with default aria-label for spinner', () => {
    const wrapper = mount(<Loading type="spinner" />);
    expect(
      wrapper.find('.nextui-spinner-container').at(0).prop('aria-label')
    ).toEqual('Loading');
  });

  it('should work with children', () => {
    const wrapper = mount(<Loading>Loading</Loading>);
    expect(wrapper.find('.nextui-loading-label').at(0).text()).toContain(
      'Loading'
    );
  });

  it('should work with different colors', () => {
    const wrapper = mount(
      <div>
        <Loading color="primary" />
        <Loading color="success" />
        <Loading color="secondary" />
        <Loading color="warning" />
        <Loading color="error" />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).toMatchSnapshot();
  });

  it('should work with different text colors', () => {
    const wrapper = mount(
      <div>
        <Loading textColor="primary" />
        <Loading textColor="success" />
        <Loading textColor="secondary" />
        <Loading textColor="warning" />
        <Loading textColor="error" />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).toMatchSnapshot();
  });

  it('should work with different sizes', () => {
    const wrapper = mount(
      <div>
        <Loading size="xs" />
        <Loading size="sm" />
        <Loading size="md" />
        <Loading size="lg" />
        <Loading size="xl" />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).toMatchSnapshot();
  });

  it('should work with different types', () => {
    const wrapper = mount(
      <div>
        <Loading type="default" />
        <Loading type="spinner" />
        <Loading type="points" />
        <Loading type="points-opacity" />
        <Loading type="gradient" />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).toMatchSnapshot();
  });

  it('should work with text in spinner type', () => {
    const wrapper = mount(<Loading type="spinner">Spinner</Loading>);
    expect(wrapper.find('.nextui-spinner').at(0).text()).toContain('Spinner');
  });
});
