import React, { Dispatch, MutableRefObject, SetStateAction } from 'react';
import useCurrentState from '../../hooks/use-current-state';

export type BindingsChangeTarget =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | string;

const useInput = (
  initialValue: string
): {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  currentRef: MutableRefObject<string>;
  reset: () => void;
  bindings: {
    value: string;
    onChange: (event: BindingsChangeTarget) => void;
  };
} => {
  const [state, setState, currentRef] = useCurrentState<string>(initialValue);

  return {
    state,
    setState,
    currentRef,
    reset: () => setState(initialValue),
    bindings: {
      value: state,
      onChange: (event: BindingsChangeTarget) => {
        if (typeof event === 'object' && event.target) {
          setState(event.target.value);
        } else {
          setState(event as string);
        }
      },
    },
  };
};

export default useInput;
