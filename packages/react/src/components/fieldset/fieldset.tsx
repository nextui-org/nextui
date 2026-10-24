"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ReactNode} from "react";

import {fieldsetVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {
  ButtonContext,
  CheckboxGroupContext,
  LinkContext,
  Provider,
  RadioGroupContext,
  SliderContext,
  ToggleButtonContext,
  ToggleButtonGroupContext,
} from "react-aria-components";

import {composeSlotClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Fieldset Context
 * -----------------------------------------------------------------------------------------------*/
type FieldsetContext = {
  slots?: ReturnType<typeof fieldsetVariants>;
};

const FieldsetContext = createContext<FieldsetContext>({});

/* -------------------------------------------------------------------------------------------------
 * Fieldset Root
 * -----------------------------------------------------------------------------------------------*/
interface FieldsetRootProps<
  E extends keyof React.JSX.IntrinsicElements = "fieldset",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const FieldsetRoot = <E extends keyof React.JSX.IntrinsicElements = "fieldset">({
  children,
  className,
  ...props
}: FieldsetRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldsetRootProps<E>>) => {
  const slots = React.useMemo(() => fieldsetVariants({}), []);

  // Mirror native `<fieldset disabled>` as `data-disabled="true"` so the
  // existing `[data-disabled="true"] .label` (and similar) ancestor selectors
  // cascade disabled styling to descendant fields, just like a direct
  // `isDisabled` prop on TextField/Checkbox/etc. would.
  const isDisabled = "disabled" in props && props.disabled === true;
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <FieldsetContext value={contextValue}>
      <dom.fieldset
        className={slots?.base({className})}
        data-disabled={isDisabled || undefined}
        data-slot="fieldset"
        {...(props as any)}
      >
        {isDisabled ? (
          // Forward `isDisabled` through React Aria contexts so descendant
          // components stay consistent with the native `<fieldset disabled>`
          // behaviour. There are two reasons we need to do this manually:
          //
          // 1. Some primitives (Slider, RadioGroup, CheckboxGroup, ...) render
          //    as `<div>` so the browser does not propagate the fieldset's
          //    `disabled` attribute to them — without this, they would still
          //    look enabled and remain interactive.
          // 2. Other primitives (Button, ToggleButton, Link, ...) do get
          //    natively disabled by the browser, but React Aria's internal
          //    `isDisabled` state — which drives `data-disabled` and the
          //    `{isDisabled}` render prop — only updates from props/context.
          //    Without this, the button is unclickable but its render prop
          //    keeps returning `isDisabled: false`.
          <Provider
            values={[
              [ButtonContext, {isDisabled: true}],
              [CheckboxGroupContext, {isDisabled: true}],
              [LinkContext, {isDisabled: true}],
              [RadioGroupContext, {isDisabled: true}],
              [SliderContext, {isDisabled: true}],
              [ToggleButtonContext, {isDisabled: true}],
              [ToggleButtonGroupContext, {isDisabled: true}],
            ]}
          >
            {children}
          </Provider>
        ) : (
          children
        )}
      </dom.fieldset>
    </FieldsetContext>
  );
};

FieldsetRoot.displayName = "HeroUI.Fieldset";

/* -------------------------------------------------------------------------------------------------
 * Fieldset Legend
 * -----------------------------------------------------------------------------------------------*/
interface FieldsetLegendProps<
  E extends keyof React.JSX.IntrinsicElements = "legend",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const FieldsetLegend = <E extends keyof React.JSX.IntrinsicElements = "legend">({
  className,
  ...props
}: FieldsetLegendProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldsetLegendProps<E>>) => {
  const {slots} = use(FieldsetContext);

  return (
    <dom.legend
      className={composeSlotClassName(slots?.legend, className)}
      data-slot="fieldset-legend"
      {...(props as any)}
    />
  );
};

FieldsetLegend.displayName = "HeroUI.Fieldset.Legend";

/* -------------------------------------------------------------------------------------------------
 * Field Group
 * -----------------------------------------------------------------------------------------------*/
interface FieldGroupProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const FieldGroup = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...rest
}: FieldGroupProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof FieldGroupProps<E>>) => {
  const {slots} = use(FieldsetContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.fieldGroup, className)}
      data-slot="fieldset-field-group"
      {...(rest as any)}
    />
  );
};

FieldGroup.displayName = "HeroUI.Fieldset.Group";

/* -------------------------------------------------------------------------------------------------
 * Field Actions
 * -----------------------------------------------------------------------------------------------*/
interface FieldsetActionsProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const FieldsetActions = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...rest
}: FieldsetActionsProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof FieldsetActionsProps<E>>) => {
  const {slots} = use(FieldsetContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.actions, className)}
      data-slot="fieldset-actions"
      {...(rest as any)}
    >
      {children}
    </dom.div>
  );
};

FieldsetActions.displayName = "HeroUI.Fieldset.Actions";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {FieldsetRoot, FieldsetLegend, FieldGroup, FieldsetActions};

export type {FieldsetRootProps, FieldsetLegendProps, FieldGroupProps, FieldsetActionsProps};
