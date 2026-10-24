"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {BadgeVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {badgeVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {cx} from "tailwind-variants";

import {composeSlotClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Badge Context
 * -----------------------------------------------------------------------------------------------*/
type BadgeContext = {
  slots?: ReturnType<typeof badgeVariants>;
};

const BadgeContext = createContext<BadgeContext>({});

/* -------------------------------------------------------------------------------------------------
 * Badge Anchor
 * -----------------------------------------------------------------------------------------------*/
interface BadgeAnchorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  className?: string;
  children: ReactNode;
}

const BadgeAnchor = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: BadgeAnchorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof BadgeAnchorProps<E>>) => {
  return (
    <dom.span
      {...(props as any)}
      className={cx("badge-anchor", className) ?? undefined}
      data-slot="badge-anchor"
    >
      {children}
    </dom.span>
  );
};

BadgeAnchor.displayName = "HeroUI.Badge.Anchor";

/* -------------------------------------------------------------------------------------------------
 * Badge Root
 * -----------------------------------------------------------------------------------------------*/
interface BadgeRootProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  /** Badge color. */
  color?: BadgeVariants["color"];
  /** Badge placement. */
  placement?: BadgeVariants["placement"];
  /** Badge size. */
  size?: BadgeVariants["size"];
  /** Badge variant. */
  variant?: BadgeVariants["variant"];
}

const BadgeRoot = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  color,
  placement,
  size,
  variant,
  ...props
}: BadgeRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof BadgeRootProps<E>>) => {
  const slots = React.useMemo(
    () => badgeVariants({color, placement, size, variant}),
    [color, placement, size, variant],
  );

  const badgeChildren = React.useMemo(() => {
    if (typeof children === "string" || typeof children === "number") {
      return <BadgeLabel>{children}</BadgeLabel>;
    }

    return children;
  }, [children]);

  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <BadgeContext value={contextValue}>
      <dom.span
        {...(props as any)}
        className={composeSlotClassName(slots.base, className)}
        data-slot="badge"
      >
        {badgeChildren}
      </dom.span>
    </BadgeContext>
  );
};

BadgeRoot.displayName = "HeroUI.Badge";

/* -------------------------------------------------------------------------------------------------
 * Badge Label
 * -----------------------------------------------------------------------------------------------*/
interface BadgeLabelProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const BadgeLabel = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: BadgeLabelProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof BadgeLabelProps<E>>) => {
  const {slots} = use(BadgeContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.label, className)}
      data-slot="badge-label"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

BadgeLabel.displayName = "HeroUI.Badge.Label";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {BadgeRoot, BadgeLabel, BadgeAnchor};

export type {BadgeRootProps, BadgeLabelProps, BadgeAnchorProps};
