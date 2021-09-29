import React from 'react';
import { mount, render } from 'enzyme';
import ImageBrowser from '../image-browser';
import Image from '../index';

const link = 'https://react.geist-ui.dev/en-us/guide/introduction';
const url =
  'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA' +
  'AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO' +
  '9TXL0Y4OHwAAAABJRU5ErkJggg==';

describe('Image Browser', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <ImageBrowser url={link}>
        <Image src={url} />
      </ImageBrowser>
    );
    expect(() => wrapper.unmount()).not.toThrow();

    const browser = render(
      <ImageBrowser url={link}>
        <Image src={url} />
      </ImageBrowser>
    );
    expect(browser).toMatchSnapshot();
  });

  it('show title when url missing', () => {
    const wrapper = mount(
      <ImageBrowser title="test-title">
        <Image src={url} />
      </ImageBrowser>
    );
    expect(wrapper.find('header').text()).toContain('test-title');
  });

  it('should work correctly with full link', () => {
    const wrapper = mount(
      <ImageBrowser url={link}>
        <Image src={url} />
      </ImageBrowser>
    );
    expect(wrapper.find('.link').text()).not.toContain('http');
    wrapper.setProps({ showFullLink: true });
    expect(wrapper.find('.link').text()).toContain('http');
  });

  it('show full link when url parse error', () => {
    const errorLink = 'httpsw/com';
    const wrapper = mount(
      <ImageBrowser url={errorLink}>
        <Image src={url} />
      </ImageBrowser>
    );
    expect(wrapper.find('.link').text()).toContain(errorLink);
  });

  it('should work correctly when props missing', () => {
    const wrapper = mount(<ImageBrowser />);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('anchor props should be passed through', () => {
    const anchorRel = 'noreferrer';
    const wrapper = mount(
      <ImageBrowser url={link} anchorProps={{ rel: anchorRel }}>
        <Image src={url} />
      </ImageBrowser>
    );
    const rel = wrapper.find('a').getDOMNode().getAttribute('rel');
    expect(rel).toEqual(anchorRel);
  });
});
