import { act } from 'react-dom/test-utils';
import { ReactWrapper } from 'enzyme';
// @ts-ignore
import mediaQuery from 'css-mediaquery';

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const updateWrapper = async (
  wrapper: ReactWrapper,
  time: number = 0
) => {
  await act(async () => {
    await sleep(time);
    wrapper.update();
  });
};

export const mockNativeEvent = (fn: Function = () => {}) => ({
  nativeEvent: { stopImmediatePropagation: fn }
});

export const nativeEvent = mockNativeEvent();

export const mediaListMock = (width: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).listeners = [] as Array<Function>;
  return (query: string) => {
    return {
      matches: mediaQuery.match(query, { width }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addListener: (fn: Function) => (window as any).listeners.push(fn),
      removeListener: () => {}
    };
  };
};

export function triggerPress(element: ReactWrapper<unknown>) {
  element.simulate('mouseDown');
  element.simulate('mouseUp');
  element.simulate('click');
}
