import React from 'react';
import { mount } from 'enzyme';
import Image from '../index';
import { updateWrapper } from '../../../tests/utils';

const url =
  'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA' +
  'AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO' +
  '9TXL0Y4OHwAAAABJRU5ErkJggg==';

describe('Image', () => {
  it('should render correctly', async () => {
    let wrapper = mount(<Image src={url} />);
    expect(wrapper).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();

    wrapper = mount(<Image src={url} width={20} height={20} />);
    wrapper.find('img').at(0).simulate('load');
    expect(wrapper).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();

    wrapper = mount(
      <Image src={url} width={20} height={20} showSkeleton={false} />
    );
    wrapper.find('img').at(0).simulate('load');
    expect(wrapper).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly with skeleton', async () => {
    let wrapper = mount(<Image src={url} width={20} height={20} />);
    expect(wrapper.find('.skeleton').length).not.toBe(0);

    wrapper = mount(<Image src={url} width={20} height={20} />);
    wrapper.find('img').at(0).simulate('load');
    await updateWrapper(wrapper);
    expect(wrapper.find('.skeleton').length).not.toBe(0);

    wrapper = mount(<Image src={url} width={20} />);
    expect(wrapper.find('.skeleton').length).toBe(0);

    mount(<Image src={url} width={20} height={20} showSkeleton={false} />);
    expect(wrapper.find('.skeleton').length).toBe(0);
  });

  it('should remove skeleton when timeout', async () => {
    const animation = mount(
      <Image src={url} width={20} height={20} maxDelay={100} />
    );
    const NoAnimation = mount(
      <Image
        src={url}
        width={20}
        height={20}
        maxDelay={100}
        showSkeleton={false}
      />
    );
    expect(animation.find('.skeleton').length).not.toBe(0);
    await updateWrapper(animation, 300);
    await updateWrapper(NoAnimation, 300);
    expect(animation.find('.skeleton').length).toBe(0);
    expect(NoAnimation.find('.skeleton').length).toBe(0);
  });

  it('should remove skeleton when image completed', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.defineProperty((global as any).Image.prototype, 'complete', {
      get() {
        return true;
      }
    });
    const wrapper = mount(<Image src={url} width={20} height={20} />);
    const img = wrapper.find('img').at(0);
    img.simulate('load');
    await updateWrapper(wrapper);
    expect((img.getDOMNode() as HTMLImageElement).complete).toEqual(true);
    expect(wrapper.find('.skeleton').length).toBe(0);
  });
});
