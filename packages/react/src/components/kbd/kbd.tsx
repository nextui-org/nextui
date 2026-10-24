"use client";

import type {KbdKey} from "./kbd.constants";
import type {DOMRenderProps} from "../../utils/dom";
import type {KbdVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {kbdVariants} from "@heroui/styles";
import React, {createContext, use} from "react";

import {composeSlotClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

import {kbdKeysLabelMap, kbdKeysMap} from "./kbd.constants";

/* -------------------------------------------------------------------------------------------------
 * Kbd Context
 * -----------------------------------------------------------------------------------------------*/
type KbdContext = {
  slots?: ReturnType<typeof kbdVariants>;
};

const KbdContext = createContext<KbdContext>({});

/* -------------------------------------------------------------------------------------------------
 * Kbd Root
 * -----------------------------------------------------------------------------------------------*/
interface KbdRootProps<E extends keyof React.JSX.IntrinsicElements = "kbd"> extends DOMRenderProps<
  E,
  undefined
> {
  children: ReactNode;
  className?: string;
  /** Visual variant. */
  variant?: KbdVariants["variant"];
}

const KbdRoot = <E extends keyof React.JSX.IntrinsicElements = "kbd">({
  children,
  className,
  variant,
  ...props
}: KbdRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof KbdRootProps<E>>) => {
  const slots = React.useMemo(() => kbdVariants({variant}), [variant]);
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <KbdContext value={contextValue}>
      <dom.kbd {...(props as any)} className={slots.base({className})}>
        {children}
      </dom.kbd>
    </KbdContext>
  );
};

KbdRoot.displayName = "HeroUI.Kbd";

/* -------------------------------------------------------------------------------------------------
 * Kbd Abbr
 * -----------------------------------------------------------------------------------------------*/
interface KbdAbbrProps<E extends keyof React.JSX.IntrinsicElements = "abbr"> extends DOMRenderProps<
  E,
  undefined
> {
  className?: string;
  /** The keyboard key to display */
  keyValue: KbdKey;
}

const KbdAbbr = <E extends keyof React.JSX.IntrinsicElements = "abbr">({
  className,
  keyValue,
  ...props
}: KbdAbbrProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof KbdAbbrProps<E>>) => {
  const {slots} = use(KbdContext);

  return (
    <dom.abbr
      className={composeSlotClassName(slots?.abbr, className)}
      title={kbdKeysLabelMap[keyValue]}
      {...(props as any)}
    >
      {kbdKeysMap[keyValue]}
    </dom.abbr>
  );
};

KbdAbbr.displayName = "HeroUI.Kbd.Abbr";

/* -------------------------------------------------------------------------------------------------
 * Kbd Content
 * -----------------------------------------------------------------------------------------------*/
interface KbdContentProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
}

const KbdContent = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: KbdContentProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof KbdContentProps<E>>) => {
  const {slots} = use(KbdContext);

  return (
    <dom.span className={composeSlotClassName(slots?.content, className)} {...(props as any)}>
      {children}
    </dom.span>
  );
};

KbdContent.displayName = "HeroUI.Kbd.Content";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {KbdRoot, KbdAbbr, KbdContent};

export type {KbdRootProps, KbdAbbrProps, KbdContentProps};
