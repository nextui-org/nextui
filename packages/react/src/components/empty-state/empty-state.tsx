"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ReactNode} from "react";

import {emptyStateVariants} from "@heroui/styles";
import React, {useMemo} from "react";

import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * EmptyState Root
 * -----------------------------------------------------------------------------------------------*/
interface EmptyStateRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const EmptyStateRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...rest
}: EmptyStateRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof EmptyStateRootProps<E>>) => {
  const resolvedClassName = useMemo(() => emptyStateVariants({className}), [className]);

  return (
    <dom.div className={resolvedClassName} data-slot="empty-state" {...(rest as any)}>
      {children || "No results found"}
    </dom.div>
  );
};

EmptyStateRoot.displayName = "HeroUI.EmptyState";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {EmptyStateRoot};

export type {EmptyStateRootProps};
