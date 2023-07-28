import type {As, RightJoinProps, PropsOf, InternalForwardRefRenderFunction} from "./types";

import * as React from "react";
import clsx from "clsx";
import {forwardRef as baseForwardRef} from "react";

export function forwardRef<
  Component extends As,
  Props extends object,
  OmitKeys extends keyof any = never,
>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >,
) {
  return baseForwardRef(component) as InternalForwardRefRenderFunction<Component, Props, OmitKeys>;
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
  removeVariantProps = true,
): readonly [Omit<T, K> | T, Pick<T, K> | {}] => {
  if (!variantKeys) {
    return [props, {}];
  }

  const picked = variantKeys.reduce((acc, key) => {
    // Only include the key in `picked` if it exists in `props`
    if (key in props) {
      return {...acc, [key]: props[key]};
    } else {
      return acc;
    }
  }, {});

  if (removeVariantProps) {
    const omitted = Object.keys(props)
      .filter((key) => !variantKeys.includes(key as K))
      .reduce((acc, key) => ({...acc, [key]: props[key as keyof T]}), {});

    return [omitted, picked] as [Omit<T, K>, Pick<T, K>];
  } else {
    return [props, picked] as [T, Pick<T, K>];
  }
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
