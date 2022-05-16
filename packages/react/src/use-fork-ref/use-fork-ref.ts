import { useMemo } from 'react';
import type { Ref, MutableRefObject } from 'react';

const setRef = <T>(
  ref:
    | MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined,
  value: T | null
): void => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
};

const useForkRef = <InstanceA, InstanceB>(
  refA: Ref<InstanceA> | null | undefined,
  refB: Ref<InstanceB> | null | undefined
): Ref<InstanceA & InstanceB> | null => {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }

    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
};

export default useForkRef;
