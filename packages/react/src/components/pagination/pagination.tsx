"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {PaginationVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {paginationVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";

import {useResolvedClassName} from "../../utils";
import {composeSlotClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {IconChevronLeft, IconChevronRight} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * Pagination Context
 * -----------------------------------------------------------------------------------------------*/
type PaginationContext = {
  slots?: ReturnType<typeof paginationVariants>;
};

const PaginationContext = createContext<PaginationContext>({});

/* -------------------------------------------------------------------------------------------------
 * Pagination Root
 * -----------------------------------------------------------------------------------------------*/
interface PaginationRootProps<
  E extends keyof React.JSX.IntrinsicElements = "nav",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
  /** Pagination size. */
  size?: PaginationVariants["size"];
}

const PaginationRoot = <E extends keyof React.JSX.IntrinsicElements = "nav">({
  children,
  className,
  size,
  ...props
}: PaginationRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof PaginationRootProps<E>>) => {
  const slots = React.useMemo(() => paginationVariants({size}), [size]);
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <PaginationContext value={contextValue}>
      <dom.nav
        aria-label="pagination"
        data-slot="pagination"
        role="navigation"
        {...(props as any)}
        className={composeSlotClassName(slots.base, className)}
      >
        {children}
      </dom.nav>
    </PaginationContext>
  );
};

PaginationRoot.displayName = "HeroUI.Pagination";

/* -------------------------------------------------------------------------------------------------
 * Pagination Summary
 * -----------------------------------------------------------------------------------------------*/
interface PaginationSummaryProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
}

const PaginationSummary = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: PaginationSummaryProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof PaginationSummaryProps<E>>) => {
  const {slots} = use(PaginationContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.summary, className)}
      data-slot="pagination-summary"
      // Auto-detect base direction from the summary's own text so mixed
      // number/word content (e.g. "1 to 5 of 10 invoices") is not bidi-reordered
      // by an RTL ancestor. User-provided `dir` still overrides via `...props`.
      dir="auto"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

PaginationSummary.displayName = "HeroUI.Pagination.Summary";

/* -------------------------------------------------------------------------------------------------
 * Pagination Content
 * -----------------------------------------------------------------------------------------------*/
interface PaginationContentProps<
  E extends keyof React.JSX.IntrinsicElements = "ul",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
}

const PaginationContent = <E extends keyof React.JSX.IntrinsicElements = "ul">({
  children,
  className,
  ...props
}: PaginationContentProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof PaginationContentProps<E>>) => {
  const {slots} = use(PaginationContext);

  return (
    <dom.ul
      className={composeSlotClassName(slots?.content, className)}
      data-slot="pagination-content"
      {...(props as any)}
    >
      {children}
    </dom.ul>
  );
};

PaginationContent.displayName = "HeroUI.Pagination.Content";

/* -------------------------------------------------------------------------------------------------
 * Pagination Item
 * -----------------------------------------------------------------------------------------------*/
interface PaginationItemProps<
  E extends keyof React.JSX.IntrinsicElements = "li",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
}

const PaginationItem = <E extends keyof React.JSX.IntrinsicElements = "li">({
  children,
  className,
  ...props
}: PaginationItemProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof PaginationItemProps<E>>) => {
  const {slots} = use(PaginationContext);

  return (
    <dom.li
      className={composeSlotClassName(slots?.item, className)}
      data-slot="pagination-item"
      {...(props as any)}
    >
      {children}
    </dom.li>
  );
};

PaginationItem.displayName = "HeroUI.Pagination.Item";

/* -------------------------------------------------------------------------------------------------
 * Pagination Link
 * -----------------------------------------------------------------------------------------------*/
interface PaginationLinkProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const PaginationLink = ({children, className, isActive, ...props}: PaginationLinkProps) => {
  const {slots} = use(PaginationContext);

  return (
    <ButtonPrimitive
      aria-current={isActive ? "page" : undefined}
      className={useResolvedClassName(className, slots?.link())}
      data-active={isActive ? "true" : undefined}
      data-slot="pagination-link"
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};

PaginationLink.displayName = "HeroUI.Pagination.Link";

/* -------------------------------------------------------------------------------------------------
 * Pagination Previous
 * -----------------------------------------------------------------------------------------------*/
interface PaginationPreviousProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  className?: string;
  children: React.ReactNode;
}

const PaginationPrevious = ({children, className, ...props}: PaginationPreviousProps) => {
  const {slots} = use(PaginationContext);
  const baseClass = `${slots?.link() ?? ""} pagination__link--nav`.trim();

  return (
    <ButtonPrimitive
      className={useResolvedClassName(className, baseClass)}
      data-slot="pagination-previous"
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};

PaginationPrevious.displayName = "HeroUI.Pagination.Previous";

/* -------------------------------------------------------------------------------------------------
 * Pagination Previous Icon
 * -----------------------------------------------------------------------------------------------*/
interface PaginationPreviousIconProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const PaginationPreviousIcon = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: PaginationPreviousIconProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof PaginationPreviousIconProps<E>>) => {
  return (
    <dom.span
      aria-hidden="true"
      className={className}
      data-slot="pagination-previous-icon"
      {...(props as any)}
    >
      {children ?? <IconChevronLeft />}
    </dom.span>
  );
};

PaginationPreviousIcon.displayName = "HeroUI.Pagination.PreviousIcon";

/* -------------------------------------------------------------------------------------------------
 * Pagination Next
 * -----------------------------------------------------------------------------------------------*/
interface PaginationNextProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  className?: string;
  children: React.ReactNode;
}

const PaginationNext = ({children, className, ...props}: PaginationNextProps) => {
  const {slots} = use(PaginationContext);
  const baseClass = `${slots?.link() ?? ""} pagination__link--nav`.trim();

  return (
    <ButtonPrimitive
      className={useResolvedClassName(className, baseClass)}
      data-slot="pagination-next"
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};

PaginationNext.displayName = "HeroUI.Pagination.Next";

/* -------------------------------------------------------------------------------------------------
 * Pagination Next Icon
 * -----------------------------------------------------------------------------------------------*/
interface PaginationNextIconProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const PaginationNextIcon = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: PaginationNextIconProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof PaginationNextIconProps<E>>) => {
  return (
    <dom.span
      aria-hidden="true"
      className={className}
      data-slot="pagination-next-icon"
      {...(props as any)}
    >
      {children ?? <IconChevronRight />}
    </dom.span>
  );
};

PaginationNextIcon.displayName = "HeroUI.Pagination.NextIcon";

/* -------------------------------------------------------------------------------------------------
 * Pagination Ellipsis
 * -----------------------------------------------------------------------------------------------*/
interface PaginationEllipsisProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

const PaginationEllipsis = <E extends keyof React.JSX.IntrinsicElements = "span">({
  className,
  ...props
}: PaginationEllipsisProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof PaginationEllipsisProps<E>>) => {
  const {slots} = use(PaginationContext);

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.ellipsis, className)}
      data-slot="pagination-ellipsis"
      {...(props as any)}
    >
      &hellip;
    </dom.span>
  );
};

PaginationEllipsis.displayName = "HeroUI.Pagination.Ellipsis";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  PaginationRoot,
  PaginationSummary,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationPreviousIcon,
  PaginationNext,
  PaginationNextIcon,
  PaginationEllipsis,
};

export type {
  PaginationRootProps,
  PaginationSummaryProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationPreviousProps,
  PaginationPreviousIconProps,
  PaginationNextProps,
  PaginationNextIconProps,
  PaginationEllipsisProps,
};
