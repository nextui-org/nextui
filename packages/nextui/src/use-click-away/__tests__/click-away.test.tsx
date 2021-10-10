import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useClickAway from '../index';

const simulateNativeClick = (el: Element) => {
  el.dispatchEvent(
    new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
  );
};

describe('UseClickAway', () => {
  it('should work correctly', () => {
    const handler = jest.fn();
    const ref = React.createRef<HTMLDivElement>();
    (ref as any).current = document.createElement('div');
    const el = ref.current as HTMLDivElement;
    document.body.appendChild(el);
    renderHook(() => useClickAway(ref, handler));

    simulateNativeClick(el);
    expect(handler).not.toHaveBeenCalled();
    simulateNativeClick(document.body);
    expect(handler).toHaveBeenCalled();
  });

  it('should no errors when element missing', () => {
    const errorSpy = jest.spyOn(console, 'error');
    const ref = React.createRef<HTMLDivElement>();
    renderHook(() => useClickAway(ref, () => {}));

    expect(errorSpy).not.toHaveBeenCalled();
  });
});
