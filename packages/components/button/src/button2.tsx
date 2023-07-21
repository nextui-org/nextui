import React from "react";
import {extendStyles} from "@nextui-org/system";
import {StringToBoolean} from "tailwind-variants";

import Button, {ButtonProps} from "./button";

export const MyButton2 = extendStyles(Button, {
  base: "bg-success text-success-foreground",
  variants: {
    isScalable: {
      true: "scale-125",
      false: "",
    },
    mySize: {
      lg: "px-12 py-6 text-lg",
      xl: "px-12 py-6 text-xl",
    },
    size: {
      xs: "px-8 py-4 text-sm",
      xl: "px-10 py-5 text-xl",
      "2xl": "bg-danger px-12 py-6 text-2xl",
    },
  },
});

const App = () => {
  return <MyButton2>Press me</MyButton2>;
};

// Extract the keys which exist in both types
type IntersectionKeys<T, U> = Extract<keyof T, keyof U>;

// Create a merged type for keys which exist in both types
type MergeCommon<T, U, K extends keyof T & keyof U> = {
  [P in K]: T[P] | U[P];
};

// For keys which exist only in T or U, use the original type
type MergeUnique<T, U, K extends keyof T & keyof U> = {
  [P in Exclude<keyof T | keyof U, K>]: P extends keyof T ? T[P] : P extends keyof U ? U[P] : never;
};

// Merge two types, combining overlapping keys
type MergeProps<T, U> = MergeCommon<T, U, IntersectionKeys<T, U>> &
  MergeUnique<T, U, IntersectionKeys<T, U>>;

type MyProps1 = {
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
  disableRipple?: boolean;
  children: React.ReactNode;
};

type MyProps2 = {
  size?: "xs" | "xl";
  isScalable?: boolean;
};

type Result = MergeProps<MyProps1, MyProps2>;

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
      : never
    : never;
};

// type Size = Result["size"];
// type IsScalable = Result["isScalable"];
// type IsDisabled = Result["isDisabled"];
// type DisableRipple = Result["disableRipple"];
// type Children = Result["children"];
// type BaseProps = {
//   size?: "sm" | "md" | "lg";
//   color?: "red" | "blue" | "green";
//   children?: React.ReactNode;
// };

type UserProps = {
  size: {
    xs: "";
    xl: "";
  };
  color: {
    black: "";
    white: "";
  };
};

type ParsedUserProps = {
  [K in keyof UserProps]: StringToBoolean<keyof UserProps[K]>;
};

type MergeProps3<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? T[K] | U[K]
      : T[K]
    : K extends keyof U
    ? U[K]
    : never;
};

type ExtendedProps = MergeProps3<ButtonProps, ParsedUserProps>;

type Size = ExtendedProps["size"];
type Color = ExtendedProps["color"];
type Children = ExtendedProps["children"];
