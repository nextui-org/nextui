import React from 'react';
import { mount } from 'enzyme';
import { Snippet } from '@components';

const command = 'yarn add @geist-ui/react';
const multiLine = ['cd project', 'now'];

describe('Snippet', () => {
  beforeAll(() => {
    window.getSelection = jest.fn().mockImplementation(() => ({
      removeAllRanges: jest.fn(),
      addRange: jest.fn(),
    }));
    document.createRange = jest.fn().mockImplementation(() => ({
      selectNode: jest.fn(),
    }));
  });

  it('should render correctly', () => {
    const wrapper = mount(<Snippet text={command} />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with multi-line', () => {
    const wrapper = mount(<Snippet text={multiLine} />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with different styles', () => {
    const wrapper = mount(
      <div>
        <Snippet text={command} filled />
        <Snippet text={command} width="20%" />
        <Snippet text={command} type="secondary" />
        <Snippet text={command} type="success" filled />
      </div>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('text should be copied', () => {
    document.execCommand = jest.fn();
    const wrapper = mount(<Snippet text={command} />);
    wrapper.find('.copy').simulate('click');
    expect(document.execCommand).toHaveBeenCalled();
    (document.execCommand as jest.Mock).mockRestore();
  });

  it('multi-line commands should be copied', () => {
    document.execCommand = jest.fn();
    const wrapper = mount(<Snippet text={multiLine} />);
    wrapper.find('.copy').simulate('click');
    expect(document.execCommand).toHaveBeenCalled();
    (document.execCommand as jest.Mock).mockRestore();
  });

  it('child commands should be copied', () => {
    document.execCommand = jest.fn();
    const wrapper = mount(<Snippet>{command}</Snippet>);
    wrapper.find('.copy').simulate('click');
    expect(document.execCommand).toHaveBeenCalled();
    (document.execCommand as jest.Mock).mockRestore();
  });

  it('should disable copy function', () => {
    const wrapper = mount(<Snippet text={command} copy="prevent" />);
    expect(wrapper.find('.copy').length).toBe(0);
  });

  it('should work with custom symbol', () => {
    const wrapper = mount(<Snippet text={command} symbol=">" />);
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();

    const emptySymbolWrapper = mount(<Snippet text={command} symbol=" " />);
    expect(emptySymbolWrapper.html()).toMatchSnapshot();

    const emptySymbolWrapper2 = mount(<Snippet text={command} symbol="" />);
    expect(emptySymbolWrapper2.html()).toEqual(emptySymbolWrapper.html());

    expect(() => emptySymbolWrapper.unmount()).not.toThrow();
    expect(() => emptySymbolWrapper2.unmount()).not.toThrow();
  });

  it('should work with custom toast', () => {
    document.execCommand = jest.fn();
    const wrapper = mount(<Snippet text={command} toastText="Code copied!" />);
    wrapper.find('.copy').simulate('click');
    expect(document.execCommand).toHaveBeenCalled();
    (document.execCommand as jest.Mock).mockRestore();
  });

  afterAll(() => {
    (window.getSelection as jest.Mock).mockRestore();
    (document.createRange as jest.Mock).mockRestore();
  });
});
