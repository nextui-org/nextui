import type {ClassValue, StringToBoolean, OmitUndefined, ClassProp} from "tailwind-variants";
import type {ForwardRefRenderFunction, JSXElementConstructor, ReactElement} from "react";

type Variants = {[K: string]: {[P: string]: ClassValue}};

type ComponentProps<C> = C extends JSXElementConstructor<infer P> ? P : never;

type ValidateSubtype<T, U> = OmitUndefined<T> extends U ? "true" : "false";

type SuggestedVariants<CP> = {
  [K in keyof CP]?: ValidateSubtype<CP[K], string> extends "true"
    ? {[K2 in CP[K]]?: ClassValue}
    : ValidateSubtype<CP[K], boolean> extends "true"
    ? {
        true?: ClassValue;
        false?: ClassValue;
      }
    : never;
};

type ComposeVariants<CP> = SuggestedVariants<CP> | Variants;

type VariantValue<V, SV> = {
  [K in keyof V | keyof SV]?:
    | (K extends keyof V ? StringToBoolean<keyof V[K]> : never)
    | (K extends keyof SV
        ? ValidateSubtype<SV[K], object> extends "true"
          ? keyof OmitUndefined<SV[K]>
          : never
        : never);
};

type DefaultVariants<V, SV> = VariantValue<V, SV>;

type CompoundVariants<V, SV> = Array<VariantValue<V, SV> & ClassProp<ClassValue>>;

export type ExtendVariantProps = {
  variants?: Record<string, Record<string, string>>;
  defaultVariants?: Record<string, string>;
  compoundVariants?: Array<Record<string, boolean | string | Record<string, string>>>;
};

export type extendVariants = {
  <
    C extends JSXElementConstructor<any>,
    CP extends ComponentProps<C>,
    V extends ComposeVariants<CP>,
    SV extends SuggestedVariants<CP>,
    DV extends DefaultVariants<V, SV>,
    CV extends CompoundVariants<V, SV>,
  >(
    BaseComponent: C,
    styles: {
      variants?: V;
      defaultVariants?: DV;
      compoundVariants?: CV;
    },
  ): ForwardRefRenderFunction<
    ReactElement,
    {
      [key in keyof CP | keyof V]?:
        | (key extends keyof CP ? CP[key] : never)
        | (key extends keyof V ? StringToBoolean<keyof V[key]> : never);
    }
  >;
};

// main function
export declare const extendVariants: extendVariants;
