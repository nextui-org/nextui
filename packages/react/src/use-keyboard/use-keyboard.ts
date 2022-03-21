import { KeyMod } from './codes';
import React, { useEffect } from 'react';
import { getActiveModMap, getCtrlKeysByPlatform } from './helper';
import { getKeyValue } from '../utils/object';

export type KeyboardOptions = {
  disableGlobalEvent?: boolean;
  stopPropagation?: boolean;
  preventDefault?: boolean;
  capture?: boolean;
  event?: 'keydown' | 'keypress' | 'keyup';
};

export type KeyboardResult = {
  bindings: {
    onKeyDown: React.KeyboardEventHandler;
    onKeyDownCapture: React.KeyboardEventHandler;
    onKeyPress: React.KeyboardEventHandler;
    onKeyPressCapture: React.KeyboardEventHandler;
    onKeyUp: React.KeyboardEventHandler;
    onKeyUpCapture: React.KeyboardEventHandler;
  };
};

export type UseKeyboardHandler = (
  event: React.KeyboardEvent | KeyboardEvent
) => void;

export type UseKeyboard = (
  handler: UseKeyboardHandler,
  keyBindings: Array<number> | number,
  options?: KeyboardOptions
) => KeyboardResult;

const useKeyboard: UseKeyboard = (handler, keyBindings, options = {}) => {
  const bindings = Array.isArray(keyBindings)
    ? (keyBindings as number[])
    : [keyBindings];
  const {
    disableGlobalEvent = false,
    capture = false,
    stopPropagation = false,
    preventDefault = false,
    event = 'keydown'
  } = options;
  const activeModMap = getActiveModMap(bindings);
  const keyCodes = bindings.filter(
    (item: number) => !getKeyValue(KeyMod, item)
  );
  const { CtrlCmd, WinCtrl } = getCtrlKeysByPlatform();

  const eventHandler = (event: React.KeyboardEvent | KeyboardEvent) => {
    if (activeModMap.Shift && !event.shiftKey) return;
    if (activeModMap.Alt && !event.altKey) return;
    if (activeModMap.CtrlCmd && !event[CtrlCmd]) return;
    if (activeModMap.WinCtrl && !event[WinCtrl]) return;
    if (keyCodes.length > 0 && !keyCodes.includes(event.keyCode)) return;
    if (stopPropagation) {
      event.stopPropagation();
    }
    if (preventDefault) {
      event.preventDefault();
    }
    handler && handler(event);
  };

  useEffect(() => {
    if (!disableGlobalEvent) {
      document.addEventListener(event, eventHandler);
    }
    return () => {
      document.removeEventListener(event, eventHandler);
    };
  }, [disableGlobalEvent]);

  const elementBindingHandler = (
    elementEventType: 'keydown' | 'keypress' | 'keyup',
    isCapture: boolean = false
  ) => {
    if (elementEventType !== event) return () => {};
    if (isCapture !== capture) return () => {};
    return (e: React.KeyboardEvent) => eventHandler(e);
  };

  return {
    bindings: {
      onKeyDown: elementBindingHandler('keydown'),
      onKeyDownCapture: elementBindingHandler('keydown', true),
      onKeyPress: elementBindingHandler('keypress'),
      onKeyPressCapture: elementBindingHandler('keypress', true),
      onKeyUp: elementBindingHandler('keyup'),
      onKeyUpCapture: elementBindingHandler('keyup', true)
    }
  };
};

export default useKeyboard;
