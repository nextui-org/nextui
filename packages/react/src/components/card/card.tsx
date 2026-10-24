"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {CardVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {cardVariants} from "@heroui/styles";
import React, {createContext, use} from "react";

import {composeSlotClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * Card Context
 * -----------------------------------------------------------------------------------------------*/
interface CardContext {
  slots?: ReturnType<typeof cardVariants>;
}

const CardContext = createContext<CardContext>({});

/* -------------------------------------------------------------------------------------------------
 * Card Root
 * -----------------------------------------------------------------------------------------------*/
interface CardRootProps<E extends keyof React.JSX.IntrinsicElements = "div"> extends DOMRenderProps<
  E,
  undefined
> {
  children: ReactNode;
  className?: string;
  /** Visual variant. @default "default" */
  variant?: CardVariants["variant"];
}

const CardRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  variant = "default",
  ...props
}: CardRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardRootProps<E>>) => {
  const slots = React.useMemo(() => cardVariants({variant}), [variant]);
  const contextValue = React.useMemo(() => ({slots}), [slots]);
  const surfaceContextValue = React.useMemo(
    () => ({variant: variant as SurfaceVariants["variant"]}),
    [variant],
  );

  const content = (
    <dom.div className={slots.base({className})} data-slot="card" {...(props as any)}>
      {children}
    </dom.div>
  );

  return (
    <CardContext value={contextValue}>
      {variant === "transparent" ? (
        content
      ) : (
        // Allows inner components to apply "on-surface" colors for proper contrast
        <SurfaceContext value={surfaceContextValue}>{content}</SurfaceContext>
      )}
    </CardContext>
  );
};

CardRoot.displayName = "HeroUI.Card";

/* -------------------------------------------------------------------------------------------------
 * Card Header
 * -----------------------------------------------------------------------------------------------*/
interface CardHeaderProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const CardHeader = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: CardHeaderProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardHeaderProps<E>>) => {
  const {slots} = use(CardContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.header, className)}
      data-slot="card-header"
      {...(props as any)}
    />
  );
};

CardHeader.displayName = "HeroUI.Card.Header";

/* -------------------------------------------------------------------------------------------------
 * Card Title
 * -----------------------------------------------------------------------------------------------*/
interface CardTitleProps<E extends keyof React.JSX.IntrinsicElements = "h3"> extends DOMRenderProps<
  E,
  undefined
> {
  children?: ReactNode;
  className?: string;
}

const CardTitle = <E extends keyof React.JSX.IntrinsicElements = "h3">({
  children,
  className,
  ...props
}: CardTitleProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardTitleProps<E>>) => {
  const {slots} = use(CardContext);

  return (
    <dom.h3
      className={composeSlotClassName(slots?.title, className)}
      data-slot="card-title"
      {...(props as any)}
    >
      {children}
    </dom.h3>
  );
};

CardTitle.displayName = "HeroUI.Card.Title";

/* -------------------------------------------------------------------------------------------------
 * Card Description
 * -----------------------------------------------------------------------------------------------*/
interface CardDescriptionProps<
  E extends keyof React.JSX.IntrinsicElements = "p",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const CardDescription = <E extends keyof React.JSX.IntrinsicElements = "p">({
  children,
  className,
  ...props
}: CardDescriptionProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CardDescriptionProps<E>>) => {
  const {slots} = use(CardContext);

  return (
    <dom.p
      className={composeSlotClassName(slots?.description, className)}
      data-slot="card-description"
      {...(props as any)}
    >
      {children}
    </dom.p>
  );
};

CardDescription.displayName = "HeroUI.Card.Description";

/* -------------------------------------------------------------------------------------------------
 * Card Content
 * -----------------------------------------------------------------------------------------------*/
interface CardContentProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const CardContent = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: CardContentProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardContentProps<E>>) => {
  const {slots} = use(CardContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.content, className)}
      data-slot="card-content"
      {...(props as any)}
    />
  );
};

CardContent.displayName = "HeroUI.Card.Content";

/* -------------------------------------------------------------------------------------------------
 * Card Footer
 * -----------------------------------------------------------------------------------------------*/
interface CardFooterProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const CardFooter = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: CardFooterProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardFooterProps<E>>) => {
  const {slots} = use(CardContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.footer, className)}
      data-slot="card-footer"
      {...(props as any)}
    />
  );
};

CardFooter.displayName = "HeroUI.Card.Footer";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {CardRoot, CardHeader, CardTitle, CardDescription, CardContent, CardFooter};

export type {
  CardRootProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
};
