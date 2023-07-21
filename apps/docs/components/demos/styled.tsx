/* eslint-disable react/display-name */

import React from "react";

type Variants = {[K: string]: {[P: string]: string}};

type StringToBoolean<T> = T extends "true" | "false" ? boolean : T;

type StylesProps<V extends Variants> = {
  [K in keyof V]?: StringToBoolean<keyof V[K]>;
} & {
  variants: V;
  [x: string]: any;
};

type ComponentType<P = {}> = React.ComponentType<P> | React.ForwardRefExoticComponent<P>;

export function extendStyles<P extends Variants>(
  Component: ComponentType<StylesProps<P>>,
  styles: {variants: P},
) {
  return React.forwardRef<HTMLButtonElement, StylesProps<P>>((props, ref) => {
    return <Component ref={ref} {...styles} {...props} />;
  });
}
