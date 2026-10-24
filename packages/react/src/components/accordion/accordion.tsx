"use client";

import type {Booleanish} from "../../utils/assertion";
import type {DOMRenderProps} from "../../utils/dom";
import type {AccordionVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {accordionVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {Button} from "react-aria-components/Button";
import {
  Disclosure,
  Heading as DisclosureHeading,
  DisclosurePanel,
  DisclosureStateContext,
} from "react-aria-components/Disclosure";
import {DisclosureGroup} from "react-aria-components/DisclosureGroup";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

const AccordionContext = createContext<{
  slots?: ReturnType<typeof accordionVariants>;
  hideSeparator?: boolean;
}>({});

const DEFAULT_SURFACE_CONTEXT = {variant: "default" as const};

/* -------------------------------------------------------------------------------------------------
 * Accordion Root
 * -----------------------------------------------------------------------------------------------*/
interface AccordionRootProps
  extends ComponentPropsWithRef<typeof DisclosureGroup>, AccordionVariants {
  hideSeparator?: boolean;
}

const AccordionRoot = ({
  children,
  className,
  hideSeparator = false,
  variant,
  ...props
}: AccordionRootProps) => {
  const slots = React.useMemo(() => accordionVariants({variant}), [variant]);

  const content = (
    <DisclosureGroup
      className={useResolvedClassName(className, slots.base())}
      data-slot="accordion"
      {...props}
    >
      {children}
    </DisclosureGroup>
  );
  const contextValue = React.useMemo(() => ({slots, hideSeparator}), [slots, hideSeparator]);

  return (
    <AccordionContext value={contextValue}>
      {variant === "surface" ? (
        // Allows inner components to apply "on-surface" colors for proper contrast
        <SurfaceContext value={DEFAULT_SURFACE_CONTEXT}>{content}</SurfaceContext>
      ) : (
        content
      )}
    </AccordionContext>
  );
};

AccordionRoot.displayName = "HeroUI.Accordion";

/* -------------------------------------------------------------------------------------------------
 * AccordionItem
 * -----------------------------------------------------------------------------------------------*/
interface AccordionItemProps extends ComponentPropsWithRef<typeof Disclosure> {}

const AccordionItem = ({className, ...props}: AccordionItemProps) => {
  const {hideSeparator, slots} = use(AccordionContext);

  return (
    <Disclosure
      className={useResolvedClassName(className, slots?.item())}
      data-hide-separator={hideSeparator ? "true" : undefined}
      data-slot="accordion-item"
      {...props}
    >
      {props.children}
    </Disclosure>
  );
};

AccordionItem.displayName = "HeroUI.Accordion.Item";

/* -------------------------------------------------------------------------------------------------
 * AccordionIndicator
 * -----------------------------------------------------------------------------------------------*/
interface AccordionIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const AccordionIndicator = <E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: AccordionIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof AccordionIndicatorProps<E>>) => {
  const {slots} = use(AccordionContext);
  const {isExpanded} = use(DisclosureStateContext)!;

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: "accordion-indicator";
        "data-expanded"?: Booleanish;
      }>,
      {
        ...(props as any),
        "data-expanded": dataAttr(isExpanded),
        className: composeSlotClassName(slots?.indicator, className),
        "data-slot": "accordion-indicator",
      },
    );
  }

  return (
    <IconChevronDown
      className={composeSlotClassName(slots?.indicator, className)}
      data-expanded={dataAttr(isExpanded)}
      data-slot="accordion-indicator"
      {...(props as any)}
    />
  );
};

AccordionIndicator.displayName = "HeroUI.Accordion.Indicator";

/* -------------------------------------------------------------------------------------------------
 * AccordionHeading
 * -----------------------------------------------------------------------------------------------*/
interface AccordionHeadingProps extends ComponentPropsWithRef<typeof DisclosureHeading> {
  className?: string;
}

const AccordionHeading = ({className, ...props}: AccordionHeadingProps) => {
  const {slots} = use(AccordionContext);

  return (
    <DisclosureHeading
      className={composeSlotClassName(slots?.heading, className)}
      data-slot="accordion-heading"
      {...props}
    />
  );
};

AccordionHeading.displayName = "HeroUI.Accordion.Heading";

/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger
 * -----------------------------------------------------------------------------------------------*/
interface AccordionTriggerProps extends ComponentPropsWithRef<typeof Button> {}

const AccordionTrigger = ({className, ...props}: AccordionTriggerProps) => {
  const {slots} = use(AccordionContext);

  return (
    <Button
      className={useResolvedClassName(className, slots?.trigger())}
      data-slot="accordion-trigger"
      slot="trigger"
      {...props}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </Button>
  );
};

AccordionTrigger.displayName = "HeroUI.Accordion.Trigger";

/* -------------------------------------------------------------------------------------------------
 * AccordionBody
 * -----------------------------------------------------------------------------------------------*/
interface AccordionBodyProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const AccordionBody = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: AccordionBodyProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AccordionBodyProps<E>>) => {
  const {slots} = use(AccordionContext);

  return (
    <dom.div className={slots?.body({})} data-slot="accordion-body" {...(props as any)}>
      <div className={composeSlotClassName(slots?.bodyInner, className)}>{children}</div>
    </dom.div>
  );
};

AccordionBody.displayName = "HeroUI.Accordion.Body";

/* -------------------------------------------------------------------------------------------------
 * AccordionPanel
 * -----------------------------------------------------------------------------------------------*/
interface AccordionPanelProps extends ComponentPropsWithRef<typeof DisclosurePanel> {}

const AccordionPanel = ({children, className, ...props}: AccordionPanelProps) => {
  const {slots} = use(AccordionContext);
  const {isExpanded} = use(DisclosureStateContext)!;

  return (
    <DisclosurePanel
      className={useResolvedClassName(className, slots?.panel())}
      data-expanded={dataAttr(isExpanded)}
      data-slot="accordion-panel"
      {...props}
    >
      {children}
    </DisclosurePanel>
  );
};

AccordionPanel.displayName = "HeroUI.Accordion.Panel";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  AccordionIndicator,
  AccordionBody,
  AccordionHeading,
};

export type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionPanelProps,
  AccordionIndicatorProps,
  AccordionBodyProps,
  AccordionHeadingProps,
};
