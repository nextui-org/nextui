import type {ClassValue, StringToBoolean, OmitUndefined} from "tailwind-variants";
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

type DefaultVariants<
  CP,
  V extends ComposeVariants<CP> = ComposeVariants<CP>,
  SV extends SuggestedVariants<CP> = SuggestedVariants<CP>,
> = {
  [K in keyof V | keyof SV]?:
    | (K extends keyof V ? StringToBoolean<keyof V[K]> : never)
    | (K extends keyof SV
        ? ValidateSubtype<SV[K], object> extends "true"
          ? keyof OmitUndefined<SV[K]>
          : never
        : never);
};

export type extendStyles = {
  <
    C extends JSXElementConstructor<any>,
    CP extends ComponentProps<C>,
    V extends ComposeVariants<CP>,
    DV extends DefaultVariants<CP, V>,
  >(
    BaseComponent: C,
    styles: {
      base?: ClassValue;
      variants?: V;
      defaultVariants?: DV;
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
export declare const extendStyles: extendStyles;
