import React from 'react';
import { mount, render } from 'enzyme';
import { Divider } from '@components';

describe('Divider', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Divider />);
    expect(wrapper).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work with x and y', () => {
    const wrapper = render(
      <div>
        <Divider x={3} />
        <Divider y={3} />
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should work with type', () => {
    const wrapper = render(
      <div>
        <Divider type="secondary" />
        <Divider type="warning" />
        <Divider type="dark" />
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should work with align and volume', () => {
    const wrapper = render(
      <div>
        <Divider align="start">start</Divider>
        <Divider align="left">left</Divider>
        <Divider align="end">end</Divider>
        <Divider align="start" volume={2}>
          start
        </Divider>
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support float', () => {
    const wrapper = mount(
      <div>
        <Divider x={1.1} y={2.5} />
        <Divider volume={2.5} />
      </div>
    );
    expect(wrapper).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
