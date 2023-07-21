/* eslint-disable react/display-name */

import type {ClassValue, StringToBoolean, VariantProps} from "tailwind-variants";

import {ComponentWithAs, cn, mapPropsVariantsWithCommon} from "@nextui-org/system";
import React, {ForwardRefRenderFunction, ReactElement} from "react";
import {tv} from "@nextui-org/theme";

type MergeProps<T, U> = T | U;

/**
 * Legend:
 *
 * C = Component
 * V = Variants
 * CP = Component Props
 * OV = Original Variants
 * CV = Composed Variants
 */

type Variants = {
  [key: string]: {
    [key: string]: ClassValue;
  };
};

type ComposeVariants<OV> =
  | {
      [K in keyof OV]?:
        | {
            [K2 in keyof OV[K]]?: ClassValue;
          };
    }
  | Variants;

type GetVariantProps<V> = {
  [K in keyof V]?: StringToBoolean<keyof V[K]>;
};

type MergeProps2<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T // both types have this key
    ? K extends keyof U
      ? T[K] | U[K]
      : // only T has this key
      K extends keyof T
      ? T[K]
      : // only U has this key
      K extends keyof U
      ? U[K]
      : "never-1"
    : "never-2";
};

// {
//   [K in keyof V]?: StringToBoolean<keyof V[K]>;
// };
// | {
//     [K in keyof OV]?: StringToBoolean<keyof OV[K]>;
//   };
// | CP;

type GetMergedVariants<CV, CP> = CP;

type ExtendProps<CV, CP, OV, GV = GetVariantProps<CV>> = GetVariantProps<OV>;
// GV & Omit<CP, keyof GV>;

type ComponentType<P extends object = {}> = ComponentWithAs<"button", P>;

export function extendStyles<
  C extends ComponentType<any>,
  V,
  // OV extends C["variants"] = C["variants"],
  // CV extends ComposeVariants<OV> = ComposeVariants<OV>,
  // V extends Variants = Variants,
>(BaseComponent: C, styles: {base?: string; variants?: V}) {
  const componentStyles = tv({
    base: styles.base,
    variants: styles.variants,
  });

  type OriginalProps = React.ComponentProps<C>;
  type NewProps = VariantProps<typeof componentStyles>;

  // type CombinedProps = ExtendProps<CV, CP, OV>;
  type CombinedProps = NewProps;

  // We are casting this to ForwardRefRenderFunction to get rid of TypeScript error
  // @ts-ignore
  const ForwardedComponent = React.forwardRef(
    (originalProps: CombinedProps, ref: React.Ref<any>) => {
      const [baseProps, variantProps] = mapPropsVariantsWithCommon(
        originalProps,
        // @ts-ignore
        componentStyles.variantKeys,
        BaseComponent.variantKeys,
      );

      console.log({baseProps});
      // @ts-ignore
      const customClassname = React.useMemo(
        // @ts-ignore
        () => componentStyles(variantProps),
        [...Object.values(variantProps)],
      );
      // @ts-ignore
      const className = cn(customClassname, originalProps.className);

      // @ts-ignore
      return <BaseComponent ref={ref} {...baseProps} className={className} />;
    },
  ) as ForwardRefRenderFunction<ReactElement, CombinedProps>;

  // To make dev tools show a proper name
  ForwardedComponent.displayName = `Extended(${BaseComponent.displayName || BaseComponent.name})`;

  return ForwardedComponent;
}
