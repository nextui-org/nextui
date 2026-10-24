"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SwitchVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {SwitchButtonRenderProps, SwitchFieldRenderProps} from "react-aria-components/Switch";

import {switchVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {LabelContext} from "react-aria-components/Label";
import {
  SwitchButton as SwitchButtonPrimitive,
  SwitchField as SwitchFieldPrimitive,
} from "react-aria-components/Switch";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

const LABEL_SPAN_CONTEXT = {elementType: "span" as const};

interface SwitchContext {
  slots?: ReturnType<typeof switchVariants>;
  state?: SwitchFieldRenderProps;
}

const SwitchContext = createContext<SwitchContext>({});

/* -------------------------------------------------------------------------------------------------
 * Switch (Field) — React Aria `SwitchField`.
 * -----------------------------------------------------------------------------------------------*/
interface SwitchRootProps
  extends ComponentPropsWithRef<typeof SwitchFieldPrimitive>, SwitchVariants {}

const SwitchRoot = ({children, className, size, ...props}: SwitchRootProps) => {
  const slots = React.useMemo(() => switchVariants({size}), [size]);

  return (
    <SwitchFieldPrimitive
      data-slot="switch"
      {...props}
      className={useResolvedClassName(className, slots.base())}
    >
      {(state) => (
        <SwitchContext value={{slots, state}}>
          {typeof children === "function" ? children(state) : children}
        </SwitchContext>
      )}
    </SwitchFieldPrimitive>
  );
};

SwitchRoot.displayName = "HeroUI.Switch";

/* -------------------------------------------------------------------------------------------------
 * Switch.Content — the clickable `SwitchButton` label wrapping the control + `Label`.
 * Keep `Description`/`FieldError` as siblings of `Switch.Content`.
 * -----------------------------------------------------------------------------------------------*/
interface SwitchContentProps extends ComponentPropsWithRef<typeof SwitchButtonPrimitive> {}

const SwitchContent = ({children, className, ...props}: SwitchContentProps) => {
  const {slots} = use(SwitchContext);

  return (
    <SwitchButtonPrimitive
      data-slot="switch-content"
      {...props}
      className={useResolvedClassName(className, slots?.content())}
    >
      {(state) => (
        <LabelContext value={LABEL_SPAN_CONTEXT}>
          {typeof children === "function" ? children(state) : children}
        </LabelContext>
      )}
    </SwitchButtonPrimitive>
  );
};

SwitchContent.displayName = "HeroUI.Switch.Content";

/* -----------------------------------------------------------------------------------------------*/

interface SwitchControlProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const SwitchControl = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: SwitchControlProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SwitchControlProps<E>>) => {
  const {slots} = use(SwitchContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.control, className)}
      data-slot="switch-control"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

SwitchControl.displayName = "HeroUI.Switch.Control";

/* -----------------------------------------------------------------------------------------------*/

interface SwitchThumbProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const SwitchThumb = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: SwitchThumbProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SwitchThumbProps<E>>) => {
  const {slots} = use(SwitchContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.thumb, className)}
      data-slot="switch-thumb"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

SwitchThumb.displayName = "HeroUI.Switch.Thumb";

/* -----------------------------------------------------------------------------------------------*/

interface SwitchIconProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const SwitchIcon = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: SwitchIconProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SwitchIconProps<E>>) => {
  const {slots} = use(SwitchContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.icon, className)}
      data-slot="switch-icon"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

SwitchIcon.displayName = "HeroUI.Switch.Icon";

/* ----------------------------------------------------------------------------------------------*/

export {SwitchRoot, SwitchContent, SwitchControl, SwitchThumb, SwitchIcon};
export type {
  SwitchRootProps,
  SwitchContentProps,
  SwitchControlProps,
  SwitchThumbProps,
  SwitchIconProps,
  SwitchFieldRenderProps,
  SwitchButtonRenderProps,
};
