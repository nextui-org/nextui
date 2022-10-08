import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";

export type CurrentStateType<S> = [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>];

export interface UseUseRefStateProps {}

export function useRefState<S>(initialState: S | (() => S)) {
  const [state, setState] = useState<S>(() => {
    return typeof initialState === "function" ? (initialState as () => S)() : initialState;
  });

  const ref = useRef<S>(initialState as S);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  const setValue = (val: SetStateAction<S>) => {
    const result = typeof val === "function" ? (val as (prevState: S) => S)(ref.current) : val;

    ref.current = result;
    setState(result);
  };

  return [state, setValue, ref] as CurrentStateType<S>;
}

export type UseRefStateReturn = ReturnType<typeof useRefState>;
