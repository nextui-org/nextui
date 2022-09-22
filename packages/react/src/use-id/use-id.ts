import type {DependencyList, EffectCallback} from "react";

import React, {useEffect, useLayoutEffect, useState, useCallback} from "react";

let identifier = Number(0);

const __REACT_USE_ID__ = Boolean(typeof (React as any).useId === "function");

const __CLIENT__ = Boolean(typeof window !== "undefined" && typeof window.document !== "undefined");

const useIsomorphicLayoutEffect: (
  effect: EffectCallback,
  deps?: DependencyList | undefined,
) => void = __CLIENT__ ? useLayoutEffect : useEffect;

const useReactId: () => string | undefined = (React as any).useId ?? (() => undefined);

export const useId = (id?: string): string => {
  const initial = useReactId();

  // TODO: Define an initial value
  const [clientSideId, setClientSideId] = useState<number | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    if (clientSideId === undefined) {
      setClientSideId((prevState: number | undefined) => prevState ?? ++identifier);
    }
  }, []);

  const formatId = useCallback((id?: number): string => `:nextui-${id ?? "id"}:`, []);

  if (typeof id === "string" && id.length > 0) return id;

  if (__REACT_USE_ID__ && initial) return initial;

  if (!__CLIENT__) return formatId();

  return formatId(clientSideId);
};
