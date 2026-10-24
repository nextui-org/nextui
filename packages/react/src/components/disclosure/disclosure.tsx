"use client";

import type {Booleanish} from "../../utils/assertion";
import type {DOMRenderProps} from "../../utils/dom";
import type {DisclosureVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {ButtonProps} from "react-aria-components/Button";

import {disclosureVariants} from "@heroui/styles";
import React, {createContext, use, useRef} from "react";
import {Button} from "react-aria-components/Button";
import {
  DisclosurePanel,
  Disclosure as DisclosurePrimitive,
  DisclosureStateContext,
} from "react-aria-components/Disclosure";
import {Heading as DisclosureHeadingPrimitive} from "react-aria-components/Heading";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {IconChevronDown} from "../icons";

/* ------------------------------------------------------------------------------------------------
 * Disclosure Context
 * --------------------------------------------------------------------------------------------- */
type DisclosureContext = {
  slots?: ReturnType<typeof disclosureVariants>;
};

const DisclosureContext = createContext<DisclosureContext>({});

/* -------------------------------------------------------------------------------------------------
 * Disclosure Root
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureRootProps
  extends ComponentPropsWithRef<typeof DisclosurePrimitive>, DisclosureVariants {}

const DisclosureRoot = ({children, className, ...props}: DisclosureRootProps) => {
  const slots = React.useMemo(() => disclosureVariants({}), []);
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <DisclosureContext value={contextValue}>
      <DisclosurePrimitive
        data-slot="disclosure"
        {...props}
        className={useResolvedClassName(className, slots.base())}
      >
        {children}
      </DisclosurePrimitive>
    </DisclosureContext>
  );
};

DisclosureRoot.displayName = "HeroUI.Disclosure";

/* -------------------------------------------------------------------------------------------------
 * Disclosure Heading
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureHeadingProps extends ComponentPropsWithRef<typeof DisclosureHeadingPrimitive> {
  className?: string;
}

const DisclosureHeading = ({className, ...props}: DisclosureHeadingProps) => {
  const {slots} = use(DisclosureContext);

  return (
    <DisclosureHeadingPrimitive
      className={composeSlotClassName(slots?.heading, className)}
      data-slot="disclosure-heading"
      {...props}
    />
  );
};

DisclosureHeading.displayName = "HeroUI.Disclosure.Heading";

/* -------------------------------------------------------------------------------------------------
 * Disclosure Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureTriggerProps extends ButtonProps {}

const DisclosureTrigger = ({className, ...props}: DisclosureTriggerProps) => {
  const {slots} = use(DisclosureContext);

  return (
    <Button
      className={useResolvedClassName(className, slots?.trigger())}
      data-slot="disclosure-trigger"
      slot="trigger"
      {...props}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </Button>
  );
};

DisclosureTrigger.displayName = "HeroUI.Disclosure.Trigger";

/* -------------------------------------------------------------------------------------------------
 * Disclosure Content
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureContentProps extends ComponentPropsWithRef<typeof DisclosurePanel> {}

const DisclosureContent = ({children, className, ...props}: DisclosureContentProps) => {
  const {slots} = use(DisclosureContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const {isExpanded} = use(DisclosureStateContext)!;

  return (
    <DisclosurePanel
      ref={contentRef}
      className={useResolvedClassName(className, slots?.content())}
      data-expanded={dataAttr(isExpanded)}
      data-slot="disclosure-content"
      {...props}
    >
      {children}
    </DisclosurePanel>
  );
};

DisclosureContent.displayName = "HeroUI.Disclosure.Content";

/* -------------------------------------------------------------------------------------------------
 * Disclosure Body
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureBodyContentProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const DisclosureBody = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: DisclosureBodyContentProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DisclosureBodyContentProps<E>>) => {
  const {slots} = use(DisclosureContext);

  return (
    <dom.div className={slots?.body({})} data-slot="disclosure-body" {...(props as any)}>
      <div className={composeSlotClassName(slots?.bodyInner, className)}>{children}</div>
    </dom.div>
  );
};

DisclosureBody.displayName = "HeroUI.Disclosure.Body";

/* -------------------------------------------------------------------------------------------------
 * Disclosure Indicator
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const DisclosureIndicator = <E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: DisclosureIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DisclosureIndicatorProps<E>>) => {
  const {isExpanded} = use(DisclosureStateContext)!;
  const {slots} = use(DisclosureContext);

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: "disclosure-indicator";
        "data-expanded"?: Booleanish;
      }>,
      {
        ...(props as any),
        "data-expanded": dataAttr(isExpanded),
        className: composeSlotClassName(slots?.indicator, className),
        "data-slot": "disclosure-indicator",
      },
    );
  }

  return (
    <IconChevronDown
      className={composeSlotClassName(slots?.indicator, className)}
      data-expanded={dataAttr(isExpanded)}
      data-slot="disclosure-indicator"
      {...(props as any)}
    />
  );
};

DisclosureIndicator.displayName = "HeroUI.Disclosure.Indicator";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DisclosureRoot,
  DisclosureHeading,
  DisclosureTrigger,
  DisclosureContent,
  DisclosureBody,
  DisclosureIndicator,
};

export type {
  DisclosureRootProps,
  DisclosureContentProps,
  DisclosureHeadingProps,
  DisclosureTriggerProps,
  DisclosureIndicatorProps,
  DisclosureBodyContentProps,
};
