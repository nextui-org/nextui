"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ChipVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {chipVariants} from "@heroui/styles";
import React, {createContext, use} from "react";

import {composeSlotClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Chip Context
 * -----------------------------------------------------------------------------------------------*/
type ChipContext = {
  slots?: ReturnType<typeof chipVariants>;
};

const ChipContext = createContext<ChipContext>({});

/* -------------------------------------------------------------------------------------------------
 * Chip Root
 * -----------------------------------------------------------------------------------------------*/
interface ChipRootProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
  /** Chip color. */
  color?: ChipVariants["color"];
  /** Chip size. */
  size?: ChipVariants["size"];
  /** Chip variant. */
  variant?: ChipVariants["variant"];
}

const ChipRoot = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  color,
  size,
  variant,
  ...props
}: ChipRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ChipRootProps<E>>) => {
  const slots = React.useMemo(() => chipVariants({color, size, variant}), [color, size, variant]);

  const chipChildren = React.useMemo(() => {
    if (typeof children === "string" || typeof children === "number") {
      return <ChipLabel>{children}</ChipLabel>;
    }

    return children;
  }, [children]);

  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <ChipContext value={contextValue}>
      <dom.span
        {...(props as any)}
        className={composeSlotClassName(slots.base, className)}
        data-slot="chip"
      >
        {chipChildren}
      </dom.span>
    </ChipContext>
  );
};

ChipRoot.displayName = "HeroUI.Chip";

/* -------------------------------------------------------------------------------------------------
 * Chip Label
 * -----------------------------------------------------------------------------------------------*/
interface ChipLabelProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ChipLabel = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: ChipLabelProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ChipLabelProps<E>>) => {
  const {slots} = use(ChipContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.label, className)}
      data-slot="chip-label"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

ChipLabel.displayName = "HeroUI.Chip.Label";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ChipRoot, ChipLabel};

export type {ChipRootProps, ChipLabelProps};
