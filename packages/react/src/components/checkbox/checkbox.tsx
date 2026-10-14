"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {CheckboxVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {
  CheckboxButtonRenderProps,
  CheckboxFieldRenderProps,
} from "react-aria-components/Checkbox";

import {checkboxVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {
  CheckboxButton as CheckboxButtonPrimitive,
  CheckboxField as CheckboxFieldPrimitive,
} from "react-aria-components/Checkbox";
import {LabelContext} from "react-aria-components/Label";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {CheckboxGroupContext} from "../checkbox-group/checkbox-group";

const LABEL_SPAN_CONTEXT = {elementType: "span" as const};

interface CheckboxContext {
  slots?: ReturnType<typeof checkboxVariants>;
  state?: CheckboxFieldRenderProps;
}

const CheckboxContext = createContext<CheckboxContext>({});

/* -------------------------------------------------------------------------------------------------
 * Checkbox (Field) — React Aria `CheckboxField`.
 * -----------------------------------------------------------------------------------------------*/
interface CheckboxRootProps
  extends ComponentPropsWithRef<typeof CheckboxFieldPrimitive>, CheckboxVariants {
  /** The name of the checkbox, used when submitting an HTML form. */
  name?: string;
}

const CheckboxRoot = ({children, className, variant, ...props}: CheckboxRootProps) => {
  const checkboxGroupContext = use(CheckboxGroupContext);
  const effectiveVariant = variant ?? checkboxGroupContext.variant;
  const slots = React.useMemo(
    () => checkboxVariants({variant: effectiveVariant}),
    [effectiveVariant],
  );

  return (
    <CheckboxFieldPrimitive
      data-slot="checkbox"
      {...props}
      className={useResolvedClassName(className, slots.base())}
    >
      {(state) => (
        <CheckboxContext value={{slots, state}}>
          {typeof children === "function" ? children(state) : children}
        </CheckboxContext>
      )}
    </CheckboxFieldPrimitive>
  );
};

CheckboxRoot.displayName = "HeroUI.Checkbox";

/* -------------------------------------------------------------------------------------------------
 * Checkbox.Content — the clickable `CheckboxButton` label wrapping the control + `Label`.
 * Keep `Description`/`FieldError` as siblings of `Checkbox.Content`.
 * -----------------------------------------------------------------------------------------------*/
interface CheckboxContentProps extends ComponentPropsWithRef<typeof CheckboxButtonPrimitive> {}

const CheckboxContent = ({children, className, ...props}: CheckboxContentProps) => {
  const {slots} = use(CheckboxContext);

  return (
    <CheckboxButtonPrimitive
      data-slot="checkbox-content"
      {...props}
      className={useResolvedClassName(className, slots?.content())}
    >
      {(state) => (
        <LabelContext value={LABEL_SPAN_CONTEXT}>
          {typeof children === "function" ? children(state) : children}
        </LabelContext>
      )}
    </CheckboxButtonPrimitive>
  );
};

CheckboxContent.displayName = "HeroUI.Checkbox.Content";

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxControlProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const CheckboxControl = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: CheckboxControlProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CheckboxControlProps<E>>) => {
  const {slots} = use(CheckboxContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.control, className)}
      data-slot="checkbox-control"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

CheckboxControl.displayName = "HeroUI.Checkbox.Control";

/* -----------------------------------------------------------------------------------------------*/

interface CheckboxIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode | ((props: CheckboxFieldRenderProps) => ReactNode);
  className?: string;
}

const CheckboxIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: CheckboxIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CheckboxIndicatorProps<E>>) => {
  const {slots, state} = use(CheckboxContext);

  const isSelected = state?.isSelected;
  const isIndeterminate = state?.isIndeterminate;

  const content =
    typeof children === "function" ? (
      children(state ?? ({} as CheckboxFieldRenderProps))
    ) : children ? (
      children
    ) : (
      <>
        <svg
          aria-hidden="true"
          data-slot="checkbox-default-indicator--checkmark"
          fill="none"
          role="presentation"
          stroke="currentColor"
          strokeDasharray={22}
          strokeDashoffset={isSelected ? 44 : 66}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 17 18"
        >
          <polyline points="1 9 7 14 15 4" />
        </svg>
        {isIndeterminate ? (
          <svg
            aria-hidden="true"
            data-slot="checkbox-default-indicator--indeterminate"
            fill="none"
            role="presentation"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <line x1="21" x2="3" y1="12" y2="12" />
          </svg>
        ) : null}
      </>
    );

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.indicator, className)}
      data-slot="checkbox-indicator"
      {...(props as any)}
    >
      {content}
    </dom.span>
  );
};

CheckboxIndicator.displayName = "HeroUI.Checkbox.Indicator";

/* ----------------------------------------------------------------------------------------------*/

export {CheckboxRoot, CheckboxContent, CheckboxControl, CheckboxIndicator};
export type {
  CheckboxRootProps,
  CheckboxContentProps,
  CheckboxControlProps,
  CheckboxIndicatorProps,
  CheckboxFieldRenderProps,
  CheckboxButtonRenderProps,
};
