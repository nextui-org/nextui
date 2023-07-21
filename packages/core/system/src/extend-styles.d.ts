import type {ClassValue} from "tailwind-variants";
import type {ForwardRefRenderFunction, ReactElement} from "react";

/**
 * Legend:
 *
 * C = Component
 * V = Variants
 * CP = Component Props
 * OV = Original Variants
 * CV = Composed Variants
 */

type Variants = {[K: string]: {[P: string]: ClassValue}};

type ComposeVariants<C extends ComponentType<any>, OV = C["variants"]> =
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

type MergeProps<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? T[K] | U[K]
      : T[K]
    : K extends keyof U
    ? U[K]
    : never;
};

type ExtendProps<
  CP,
  VP,
  // C extends ComponentType<any>,
  // // CV extends ComposeVariants<C>,
  // CV extends Variants,
  // OV extends C["variants"] = C["variants"],
  // CP extends object = React.ComponentProps<C>,
  // VP extends object = GetVariantProps<CV>,
> = CP | VP;

type ComponentType<P extends object = {}> = ComponentWithAs<"button", P>;

export type extendStyles = {
  <C extends ComponentType<any>, V extends Variants>(
    BaseComponent: C,
    styles: {base?: string; variants?: V},
  ): ForwardRefRenderFunction<
    ReactElement,
    ExtendProps<React.ComponentProps<C>, GetVariantProps<V>>
  >;
};

// main function
export declare const extendStyles: extendStyles;
