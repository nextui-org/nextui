"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SwitchGroupVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {switchGroupVariants} from "@heroui/styles";
import React from "react";

import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Switch Group Root
 * -----------------------------------------------------------------------------------------------*/
interface SwitchGroupRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  /** Layout orientation. */
  orientation?: SwitchGroupVariants["orientation"];
}

const SwitchGroupRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  orientation,
  ...props
}: SwitchGroupRootProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof SwitchGroupRootProps<E>>) => {
  const slots = React.useMemo(() => switchGroupVariants({orientation}), [orientation]);

  return (
    <dom.div data-slot="switch-group" {...(props as any)} className={slots.base({className})}>
      <dom.div className={slots.items()} data-slot="switch-group-items">
        {children}
      </dom.div>
    </dom.div>
  );
};

SwitchGroupRoot.displayName = "HeroUI.SwitchGroup";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SwitchGroupRoot};

export type {SwitchGroupRootProps};
