import type {HTMLNextUIProps} from "../src/types";

import React, {useMemo} from "react";
import {tv, type VariantProps} from "@nextui-org/theme";
import {filterDOMProps, ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {objectToDeps} from "@nextui-org/shared-utils";

import {mapPropsVariants} from "../src/utils";
import {forwardRef} from "../src/utils";
/**
 * No slots
 */
const button = tv({
  base: "px-4 py-1.5 rounded-full hover:opacity-80",
  variants: {
    variant: {
      solid: "",
      flat: "",
    },
    color: {
      default: "bg-default text-default-foreground",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      success: "bg-success text-success-foreground",
      warning: "bg-warning text-warning-foreground",
      danger: "bg-danger text-danger-foreground",
      foreground: "bg-foreground text-background",
    },
    size: {
      sm: "px-unit-3 min-w-unit-16 h-unit-8 text-tiny gap-unit-2 rounded-small",
      md: "px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium",
      lg: "px-unit-6 min-w-unit-24 h-unit-12 text-medium gap-unit-3 rounded-large",
    },
    isDisabled: {
      true: "opacity-disabled pointer-events-none",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
    isDisabled: false,
  },
  compoundVariants: [
    {
      color: "default",
      variant: "flat",
      class: "bg-default/40 text-default-foreground",
    },
    {
      color: "primary",
      variant: "flat",
      class: "bg-primary/20 text-primary",
    },
  ],
});

interface ButtonProps extends HTMLNextUIProps<"button">, VariantProps<typeof button> {
  children: React.ReactNode;
  disableRipple?: boolean;
  ref?: ReactRef<HTMLButtonElement | null>;
}

export const Button = forwardRef<"button", ButtonProps>((originalProps, ref) => {
  // export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((originalProps, ref) => {
  const [props, variantProps] = mapPropsVariants(originalProps, button.variantKeys);

  const styles = useMemo(
    () => button({...variantProps, className: originalProps?.className}),
    [objectToDeps(variantProps), props.className],
  );

  const domRef = useDOMRef(ref);

  return (
    <button ref={domRef} {...filterDOMProps(props)} className={styles}>
      {props.children}
    </button>
  );
});

Button.displayName = "Button";
