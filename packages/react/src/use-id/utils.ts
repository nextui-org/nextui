import type {DependencyList, EffectCallback} from "react";

import React, {useEffect, useLayoutEffect} from "react";

const __CLIENT__ = typeof window !== "undefined" && typeof window.document !== "undefined";

export const useReactId: () => string | undefined = (React as any).useId ?? (() => undefined);

export const useIsomorphicLayoutEffect: (
  effect: EffectCallback,
  deps?: DependencyList | undefined,
) => void = __CLIENT__ ? useLayoutEffect : useEffect;

export const formatId = (value?: number | string): string => {
  if (typeof value === "string") return value;

  return value ? `:nextui-${value}:` : "";
};
