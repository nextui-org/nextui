import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Button, Tooltip } from '../../index';
import { ThemeProvider } from '../../../theme';
import { nativeEvent, updateWrapper } from 'tests/utils';
import { act } from 'react-dom/test-utils';

const expectTooltipIsShow = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.inner').length).not.toBe(0);
};

const expectTooltipIsHidden = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.inner').length).toBe(0);
};

describe('Tooltip', () => {
  it('should render correctly', async () => {
    const wrapper = mount(
      <ThemeProvider theme={{ type: 'dark' }}>
        <Tooltip text={<p id="test">custom-content</p>}>some tips</Tooltip>
      </ThemeProvider>
    );

    expectTooltipIsHidden(wrapper);

    wrapper.find('.tooltip').simulate('mouseEnter', nativeEvent);
    await updateWrapper(wrapper, 150);
    wrapper.find('#test').simulate('click', nativeEvent);
    expectTooltipIsShow(wrapper);

    await updateWrapper(wrapper, 150);
    wrapper.find('.tooltip').simulate('mouseLeave', nativeEvent);
    await updateWrapper(wrapper, 150);
    expectTooltipIsHidden(wrapper);
  });

  it('should render text when hover it', async () => {
    const wrapper = mount(
      <div>
        <Tooltip text="some text">some tips</Tooltip>
      </div>
    );
    wrapper.find('.tooltip').simulate('mouseEnter', nativeEvent);
    await updateWrapper(wrapper, 150);
    expectTooltipIsShow(wrapper);

    wrapper.find('.tooltip').simulate('mouseLeave', nativeEvent);
    await updateWrapper(wrapper, 150);
    expectTooltipIsHidden(wrapper);
  });

  it('should render react-node when click it', async () => {
    const wrapper = mount(
      <Tooltip text={<p id="test">custom-content</p>} trigger="click">
        <span>click me</span>
      </Tooltip>
    );
    wrapper.find('.tooltip').simulate('click', nativeEvent);
    await updateWrapper(wrapper, 150);
    expectTooltipIsShow(wrapper);

    const testNode = wrapper.find('#test');
    expect(testNode.length).not.toBe(0);
    expect(testNode.text()).toContain('custom-content');
    act(() => {
      document.body.dispatchEvent(
        new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
    });

    await updateWrapper(wrapper, 150);
    expectTooltipIsHidden(wrapper);
  });

  it('should render inner components', async () => {
    const wrapper = mount(
      <Tooltip text="some text">
        <Button auto size="small" id="test">
          button
        </Button>
      </Tooltip>
    );
    expect(wrapper.find('#test').length).not.toBe(0);
  });

  it('should render correctly by visible', async () => {
    const wrapper = mount(
      <div>
        <Tooltip
          text={<p id="visible">custom-content</p>}
          visible={true}
          placement="rightEnd"
        >
          some tips
        </Tooltip>
      </div>
    );

    await updateWrapper(wrapper, 150);
    expect(wrapper.find('#visible').length).toBe(1);
  });

  it('should render correctly by using wrong placement', async () => {
    const wrapper = mount(
      <div>
        <Tooltip
          text={<p id="initial-visible">custom-content</p>}
          initialVisible={true}
          placement={'test' as any}
        >
          some tips
        </Tooltip>
      </div>
    );
    expect(wrapper.find('#initial-visible').length).toBe(1);
  });
});
