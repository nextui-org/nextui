import React, { Dispatch, MutableRefObject, SetStateAction } from 'react';
import useCurrentState from '../use-current-state';

export type BindingsChangeTarget =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | string;

const useInput = (
  initialValue: string
): {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  currentRef: MutableRefObject<string>;
  reset: () => void;
  bindings: {
    value: string;
    onChange: (event: BindingsChangeTarget) => void;
  };
} => {
  const [value, setValue, currentRef] = useCurrentState<string>(initialValue);

  return {
    value,
    setValue,
    currentRef,
    reset: () => setValue(initialValue),
    bindings: {
      value,
      onChange: (event: BindingsChangeTarget) => {
        if (typeof event === 'object' && event.target) {
          setValue(event.target.value);
        } else {
          setValue(event as string);
        }
      },
    },
  };
};

export default useInput;
