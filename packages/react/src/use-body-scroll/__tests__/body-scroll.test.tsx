/* eslint-disable no-undef */
import React, { RefObject } from 'react';
import useBodyScroll from '../index';
import { act, renderHook } from '@testing-library/react-hooks';

describe('UseBodyScroll', () => {
  it('should work correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    (ref as any).current = document.createElement('div');
    const { result } = renderHook(() => useBodyScroll(ref));
    const [hidden, setHidden] = result.current;
    expect(hidden).toBe(false);

    act(() => setHidden(true));
    expect(result.current[0]).toBe(true);
  });

  it('should set overflow', () => {
    const ref = React.createRef<HTMLDivElement>();
    (ref as any).current = document.createElement('div');
    const el = ref.current as HTMLDivElement;
    const { result } = renderHook(() => useBodyScroll(ref));

    act(() => result.current[1](true));
    expect(el.style.overflow).toEqual('hidden');

    act(() => result.current[1](false));
    expect(el.style.overflow).toEqual('');
  });

  it('the last value of overflow should be recovered after setHidden', () => {
    const ref = React.createRef<HTMLDivElement>();
    const div = document.createElement('div');
    div.style.overflow = 'scroll';
    (ref as any).current = div;
    const el = ref.current as HTMLDivElement;
    const { result } = renderHook(() => useBodyScroll(ref));
    expect(el.style.overflow).toEqual('scroll');

    act(() => result.current[1](true));
    expect(el.style.overflow).toEqual('hidden');

    act(() => result.current[1](false));
    expect(el.style.overflow).toEqual('scroll');
  });

  it('should work correctly with multiple element', () => {
    const ref = React.createRef<HTMLDivElement>();
    (ref as any).current = document.createElement('div');
    const el = ref.current as HTMLDivElement;
    const { result } = renderHook(() => useBodyScroll(ref));

    const ref2 = React.createRef<HTMLDivElement>();
    (ref2 as any).current = document.createElement('div');
    const el2 = ref2.current as HTMLDivElement;
    const { result: result2 } = renderHook(() => useBodyScroll(ref2));

    act(() => result.current[1](true));
    act(() => result2.current[1](true));
    expect(el.style.overflow).toEqual('hidden');
    expect(el2.style.overflow).toEqual('hidden');

    act(() => result.current[1](false));
    act(() => result2.current[1](false));
    expect(el.style.overflow).toEqual('');
    expect(el2.style.overflow).toEqual('');
  });

  it('should work correctly with iOS', () => {
    Object.defineProperty(window.navigator, 'platform', {
      value: '',
      writable: true
    });
    (window.navigator as any).platform = 'iPhone';
    const event = { preventDefault: jest.fn() };

    const ref = React.createRef<HTMLDivElement>();
    (ref as any).current = document.createElement('div');
    const el = ref.current as HTMLDivElement;
    const { result } = renderHook(() => useBodyScroll(ref));

    act(() => result.current[1](true));
    const touchEvent = new TouchEvent('touchmove', event as EventInit);
    const MockEvent = Object.assign(touchEvent, event);
    document.dispatchEvent(MockEvent);

    expect(el.style.overflow).not.toEqual('hidden');
    expect(event.preventDefault).toHaveBeenCalled();

    // Touch events with multiple fingers do nothing
    document.dispatchEvent(
      new TouchEvent('touchmove', {
        touches: [{}, {}, {}] as Array<Touch>
      })
    );
    expect(event.preventDefault).toHaveBeenCalledTimes(1);

    act(() => result.current[1](false));
    (window.navigator as any).platform = '';
  });

  it('should work correctly with options', () => {
    Object.defineProperty(window.navigator, 'platform', {
      value: '',
      writable: true
    });
    (window.navigator as any).platform = 'iPhone';
    const event = { preventDefault: jest.fn() };

    const ref = React.createRef<HTMLDivElement>();
    (ref as any).current = document.createElement('div');
    const el = ref.current as HTMLDivElement;
    const { result } = renderHook(() =>
      useBodyScroll(ref, { scrollLayer: true })
    );

    act(() => result.current[1](true));
    const touchEvent = new TouchEvent('touchmove', event as EventInit);
    const MockEvent = Object.assign(touchEvent, event);
    document.dispatchEvent(MockEvent);

    expect(el.style.overflow).toEqual('hidden');
    expect(event.preventDefault).not.toHaveBeenCalled();
    act(() => result.current[1](false));
    (window.navigator as any).platform = '';
  });

  it('should work correctly when set element repeatedly', () => {
    let _ref: RefObject<HTMLDivElement> | null = null;
    const ref = React.createRef<HTMLDivElement>();
    (ref as any).current = document.createElement('div');
    _ref = ref;
    const el = ref.current as HTMLDivElement;
    const { result, rerender } = renderHook(() => useBodyScroll(_ref));

    act(() => result.current[1](true));
    expect(el.style.overflow).toEqual('hidden');

    // Force tigger rerender at the same value
    _ref = React.createRef<HTMLDivElement>();
    rerender();

    _ref = ref;
    rerender();
    act(() => result.current[1](true));
    expect(el.style.overflow).toEqual('hidden');
  });

  it('should set body when missing all params', () => {
    const { result } = renderHook(() => useBodyScroll());

    act(() => result.current[1](true));
    expect(document.body.style.overflow).toEqual('hidden');
  });
});
