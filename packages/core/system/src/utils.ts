import type {As, RightJoinProps, PropsOf, ComponentWithAs} from "./types";

import {forwardRef as baseForwardRef} from "react";

export function forwardRef<
  Props extends object,
  Component extends As,
  CompoundComponents extends object = {},
>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >,
) {
  return baseForwardRef(component) as unknown as ComponentWithAs<Component, Props> &
    CompoundComponents;
}

export const toIterator = (obj: any) => {
  return {
    ...obj,
    [Symbol.iterator]: function () {
      const keys = Object.keys(this);
      let index = 0;

      return {
        next: () => {
          if (index >= keys.length) {
            return {done: true};
          }
          const key = keys[index];
          const value = this[key];

          index++;

          return {value: {key, value}, done: false};
        },
      };
    },
  };
};

export const mapPropsVariants = <T extends Record<string, any>, K extends keyof T>(
  props: T,
  variantKeys?: K[],
): readonly [Omit<T, K>, Pick<T, K> | {}] => {
  if (!variantKeys) {
    return [props, {}];
  }

  const omitted = Object.keys(props)
    .filter((key) => !variantKeys.includes(key as K))
    .reduce((acc, key) => ({...acc, [key]: props[key as keyof T]}), {});

  const picked = variantKeys.reduce((acc, key) => ({...acc, [key]: props[key]}), {});

  return [omitted, picked] as [Omit<T, K>, Pick<T, K>];
};
