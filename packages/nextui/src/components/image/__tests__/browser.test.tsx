import React from 'react';
import { mount, render } from 'enzyme';
import { Image } from '@components';

const link = 'https://react.geist-ui.dev/en-us/guide/introduction';
const url =
  'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA' +
  'AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO' +
  '9TXL0Y4OHwAAAABJRU5ErkJggg==';

describe('Image Browser', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Image.Browser url={link}>
        <Image src={url} />
      </Image.Browser>
    );
    expect(() => wrapper.unmount()).not.toThrow();

    const browser = render(
      <Image.Browser url={link}>
        <Image src={url} />
      </Image.Browser>
    );
    expect(browser).toMatchSnapshot();
  });

  it('show title when url missing', () => {
    const wrapper = mount(
      <Image.Browser title="test-title">
        <Image src={url} />
      </Image.Browser>
    );
    expect(wrapper.find('header').text()).toContain('test-title');
  });

  it('should work correctly with full link', () => {
    const wrapper = mount(
      <Image.Browser url={link}>
        <Image src={url} />
      </Image.Browser>
    );
    expect(wrapper.find('.link').text()).not.toContain('http');
    wrapper.setProps({ showFullLink: true });
    expect(wrapper.find('.link').text()).toContain('http');
  });

  it('show full link when url parse error', () => {
    const errorLink = 'httpsw/com';
    const wrapper = mount(
      <Image.Browser url={errorLink}>
        <Image src={url} />
      </Image.Browser>
    );
    expect(wrapper.find('.link').text()).toContain(errorLink);
  });

  it('should work correctly when props missing', () => {
    const wrapper = mount(<Image.Browser />);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('anchor props should be passed through', () => {
    const anchorRel = 'noreferrer';
    const wrapper = mount(
      <Image.Browser url={link} anchorProps={{ rel: anchorRel }}>
        <Image src={url} />
      </Image.Browser>
    );
    const rel = wrapper.find('a').getDOMNode().getAttribute('rel');
    expect(rel).toEqual(anchorRel);
  });
});
