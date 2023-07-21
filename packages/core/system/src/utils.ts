import type {As, RightJoinProps, PropsOf, ComponentWithAs, TVReturnType} from "./types";

import clsx from "clsx";
import {forwardRef as baseForwardRef} from "react";

export function forwardRef<
  Props extends object,
  Component extends As,
  TVRT extends TVReturnType = () => any,
>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >,
  tvReturn?: TVRT,
) {
  const componentWithAs = baseForwardRef(component) as unknown as ComponentWithAs<
    Component,
    Props,
    TVRT
  >;

  // Tailwind-Variants return props
  componentWithAs.variants = tvReturn?.variants;
  componentWithAs.variantKeys = tvReturn?.variantKeys;

  return componentWithAs;
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

export const mapPropsVariantsWithCommon = <
  P extends Record<any, any>,
  VK extends keyof P,
  CK extends keyof P = never,
>(
  originalProps: P,
  variantKeys: VK[],
  commonKeys?: CK[],
) => {
  const props = Object.keys(originalProps)
    .filter((key) => !variantKeys.includes(key as VK) || commonKeys?.includes(key as CK))
    .reduce((acc, key) => ({...acc, [key]: originalProps[key as keyof P]}), {}) as Omit<
    P,
    Exclude<VK, CK>
  >;

  const variants = variantKeys.reduce(
    (acc, key) => ({...acc, [key]: originalProps[key]}),
    {},
  ) as Pick<P, VK>;

  return [props, variants] as const;
};

/**
 * Classnames utility
 */
export const cn = clsx;
