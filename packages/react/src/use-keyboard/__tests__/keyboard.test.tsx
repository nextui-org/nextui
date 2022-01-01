import React from 'react';
import { mount } from 'enzyme';
import useKeyboard, { KeyMod, KeyCode } from '../index';
import { renderHook, act } from '@testing-library/react-hooks';
import { KeyboardResult } from '../use-keyboard';

describe('UseKeyboard', () => {
  it('should work correctly', () => {
    let code = null;
    const handler = jest.fn().mockImplementation((e) => {
      code = e.keyCode;
    });
    renderHook(() => useKeyboard(handler, KeyCode.KEY_H));
    document.dispatchEvent(
      new KeyboardEvent('keydown', { keyCode: KeyCode.KEY_H })
    );
    expect(handler).toBeCalledTimes(1);
    expect(code).toEqual(KeyCode.KEY_H);
  });

  it('should not trigger handler', () => {
    const handler = jest.fn().mockImplementation(() => {});
    renderHook(() => useKeyboard(handler, [KeyCode.KEY_0]));
    const event = new KeyboardEvent('keydown', { keyCode: KeyCode.KEY_1 });
    document.dispatchEvent(event);
    expect(handler).not.toBeCalled();
  });

  it('should trigger with command key', () => {
    const handler = jest.fn().mockImplementation(() => {});
    renderHook(() => useKeyboard(handler, [KeyCode.KEY_A, KeyMod.Shift]));
    const event = new KeyboardEvent('keydown', { keyCode: KeyCode.KEY_A });
    document.dispatchEvent(event);
    expect(handler).not.toBeCalled();
    const event2 = new KeyboardEvent('keydown', {
      keyCode: KeyCode.KEY_A,
      shiftKey: true
    });
    document.dispatchEvent(event2);
    expect(handler).toBeCalledTimes(1);
  });

  it('should ignore command when code does not exist', () => {
    const handler = jest.fn().mockImplementation(() => {});
    renderHook(() => useKeyboard(handler, [KeyCode.KEY_A, 12345]));
    const event = new KeyboardEvent('keydown', { keyCode: KeyCode.KEY_A });
    document.dispatchEvent(event);
    expect(handler).toBeCalled();
  });

  it('should work with each command', () => {
    const handler = jest.fn().mockImplementation(() => {});
    renderHook(() =>
      useKeyboard(handler, [
        KeyCode.KEY_A,
        KeyMod.Alt,
        KeyMod.CtrlCmd,
        KeyMod.WinCtrl
      ])
    );
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        keyCode: KeyCode.KEY_A
      })
    );
    expect(handler).not.toBeCalled();
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        keyCode: KeyCode.KEY_A,
        altKey: true
      })
    );
    expect(handler).not.toBeCalled();
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        keyCode: KeyCode.KEY_A,
        altKey: true,
        ctrlKey: true
      })
    );
    expect(handler).not.toBeCalled();
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        keyCode: KeyCode.KEY_A,
        altKey: true,
        ctrlKey: true,
        metaKey: true
      })
    );
    expect(handler).toBeCalledTimes(1);
  });

  it('should ignore global events', () => {
    const handler = jest.fn().mockImplementation(() => {});
    renderHook(() =>
      useKeyboard(handler, [KeyCode.KEY_A], { disableGlobalEvent: true })
    );
    const event = new KeyboardEvent('keydown', { keyCode: KeyCode.KEY_A });
    document.dispatchEvent(event);
    expect(handler).not.toBeCalled();
  });

  it('should respond to different event types', () => {
    const handler = jest.fn().mockImplementation(() => {});
    renderHook(() => useKeyboard(handler, [KeyCode.KEY_A], { event: 'keyup' }));
    document.dispatchEvent(
      new KeyboardEvent('keydown', { keyCode: KeyCode.KEY_A })
    );
    expect(handler).not.toBeCalled();

    document.dispatchEvent(
      new KeyboardEvent('keypress', { keyCode: KeyCode.KEY_A })
    );
    expect(handler).not.toBeCalled();

    document.dispatchEvent(
      new KeyboardEvent('keyup', { keyCode: KeyCode.KEY_A })
    );
    expect(handler).toBeCalled();
  });

  it('should pass the keyboard events', () => {
    const handler = jest.fn().mockImplementation(() => {});
    const nativeHandler = jest.fn().mockImplementation(() => {});
    const { result } = renderHook<void, KeyboardResult>(() =>
      useKeyboard(handler, KeyCode.Escape)
    );
    const wrapper = mount(
      <div role="button" tabIndex={0} onKeyDown={nativeHandler}>
        <span id="inner" {...result.current.bindings} />
      </div>
    );
    const inner = wrapper.find('#inner').at(0);
    act(() => {
      inner.simulate('keyup', {
        keyCode: KeyCode.Escape
      });
    });
    expect(handler).not.toBeCalled();
    expect(nativeHandler).not.toBeCalled();
    act(() => {
      inner.simulate('keydown', {
        keyCode: KeyCode.Escape
      });
    });
    expect(handler).toBeCalled();
    expect(nativeHandler).toBeCalled();
  });

  it('should prevent default events', () => {
    const handler = jest.fn().mockImplementation(() => {});
    const nativeHandler = jest.fn().mockImplementation(() => {});
    const { result } = renderHook<void, KeyboardResult>(() =>
      useKeyboard(handler, KeyCode.Escape, {
        disableGlobalEvent: true,
        stopPropagation: true
      })
    );
    const wrapper = mount(
      <div role="button" tabIndex={0} onKeyDown={nativeHandler}>
        <span id="inner" {...result.current.bindings} />
      </div>
    );
    const inner = wrapper.find('#inner').at(0);
    act(() => {
      inner.simulate('keydown', {
        keyCode: KeyCode.Escape
      });
    });
    expect(handler).toBeCalled();
    expect(nativeHandler).not.toBeCalled();
  });

  it('should trigger capture event', () => {
    const handler = jest.fn().mockImplementation(() => {});
    const { result } = renderHook<void, KeyboardResult>(() =>
      useKeyboard(handler, KeyCode.Escape, {
        capture: true,
        disableGlobalEvent: true
      })
    );
    const wrapper = mount(
      <div onKeyDownCapture={result.current.bindings.onKeyDownCapture}>
        <span id="inner" />
      </div>
    );
    const inner = wrapper.find('#inner').at(0);
    act(() => {
      inner.simulate('keydown', {
        keyCode: KeyCode.Escape
      });
    });
    expect(handler).toBeCalled();
  });
});
