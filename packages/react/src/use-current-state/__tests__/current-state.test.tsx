import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import useCurrentState from '../index';
import { renderHook, act } from '@testing-library/react-hooks';

describe('UseCurrentState', () => {
  it('should work correctly', () => {
    const { result } = renderHook(() => useCurrentState(''));
    expect(result.current[0]).toEqual('');

    act(() => result.current[1]('test'));
    expect(result.current[0]).toEqual('test');
    expect(result.current[2].current).toEqual('test');
  });

  it('functional initial mode should be supported', () => {
    const { result } = renderHook(() => useCurrentState(() => 1 + 1));
    expect(result.current[0]).toEqual(2);
    act(() => result.current[1](0));
    expect(result.current[0]).toEqual(0);
    expect(result.current[2].current).toEqual(0);
  });

  it('functional update mode should be supported', () => {
    const { result } = renderHook(() => useCurrentState(0));
    expect(result.current[0]).toEqual(0);

    act(() => result.current[1]((pre) => pre + 10));
    expect(result.current[0]).toEqual(10);
    expect(result.current[2].current).toEqual(10);
  });

  it('only ref should track latest value', () => {
    const Mock: React.FC<unknown> = () => {
      const [state, setState, stateRef] = useCurrentState('');
      useEffect(() => {
        return () => {
          setTimeout(() => {
            expect(state).not.toEqual('test2');
            expect(stateRef.current).toEqual('test2');
          }, 0);
        };
      }, []);
      useEffect(() => {
        setState('test');
        setState('test2');
      }, []);
      return <span />;
    };
    const wrapper = mount(<Mock />);
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
