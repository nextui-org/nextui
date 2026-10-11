"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {DateInputGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {
  DateInputProps as DateInputPrimitiveProps,
  DateSegmentProps as DateSegmentPrimitiveProps,
  DateInputProps as TimeInputPrimitiveProps,
  DateSegmentProps as TimeSegmentPrimitiveProps,
} from "react-aria-components/DateField";

import {dateInputGroupVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {
  DateInput as DateInputPrimitive,
  DateSegment as DateSegmentPrimitive,
} from "react-aria-components/DateField";
import {Group as GroupPrimitive} from "react-aria-components/Group";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Context
 * -----------------------------------------------------------------------------------------------*/
type DateInputGroupContext = {
  slots?: ReturnType<typeof dateInputGroupVariants>;
};

const DateInputGroupContext = createContext<DateInputGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface DateInputGroupRootProps
  extends ComponentPropsWithRef<typeof GroupPrimitive>, DateInputGroupVariants {}

const DateInputGroupRoot = ({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: DateInputGroupRootProps) => {
  const slots = React.useMemo(
    () => dateInputGroupVariants({fullWidth, variant}),
    [fullWidth, variant],
  );
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <DateInputGroupContext value={contextValue}>
      <GroupPrimitive
        className={useResolvedClassName(className, slots?.base())}
        data-slot="date-input-group"
        {...props}
      >
        {children}
      </GroupPrimitive>
    </DateInputGroupContext>
  );
};

DateInputGroupRoot.displayName = "HeroUI.DateInputGroup";

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Prefix
 * -----------------------------------------------------------------------------------------------*/
interface DateInputGroupPrefixProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const DateInputGroupPrefix = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: DateInputGroupPrefixProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DateInputGroupPrefixProps<E>>) => {
  const {slots} = use(DateInputGroupContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.prefix, className)}
      data-slot="date-input-group-prefix"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

DateInputGroupPrefix.displayName = "HeroUI.DateInputGroup.Prefix";

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Input
 * -----------------------------------------------------------------------------------------------*/
interface DateInputGroupInputProps
  extends
    DateInputPrimitiveProps,
    Partial<Omit<TimeInputPrimitiveProps, keyof DateInputPrimitiveProps>> {}

const DateInputGroupInput = ({className, ...props}: DateInputGroupInputProps) => {
  const {slots} = use(DateInputGroupContext);

  // TimeInput and DateInput have compatible interfaces
  // React Aria Components will handle the correct primitive based on parent context (TimeField vs DateField)
  // We use DateInputPrimitive as the default, but it will work with TimeField context
  return (
    <DateInputPrimitive
      className={useResolvedClassName(className, slots?.input())}
      data-slot="date-input-group-input"
      {...(props as DateInputPrimitiveProps)}
    />
  );
};

DateInputGroupInput.displayName = "HeroUI.DateInputGroup.Input";

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Segment
 * -----------------------------------------------------------------------------------------------*/

interface DateInputGroupSegmentProps
  extends
    DateSegmentPrimitiveProps,
    Partial<Omit<TimeSegmentPrimitiveProps, keyof DateSegmentPrimitiveProps>> {
  className?: string;
}

const DateInputGroupSegment = ({className, segment, ...props}: DateInputGroupSegmentProps) => {
  const {slots} = use(DateInputGroupContext);

  // TimeSegment and DateSegment have compatible interfaces
  // React Aria Components will handle the correct primitive based on parent context
  // We use DateSegmentPrimitive as the default, but it will work with TimeField context
  return (
    <DateSegmentPrimitive
      className={composeSlotClassName(slots?.segment, className)}
      data-slot="date-input-group-segment"
      segment={segment}
      {...props}
    />
  );
};

DateInputGroupSegment.displayName = "HeroUI.DateInputGroup.Segment";

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup InputContainer
 * -----------------------------------------------------------------------------------------------*/
interface DateInputGroupInputContainerProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const DateInputGroupInputContainer = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: DateInputGroupInputContainerProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DateInputGroupInputContainerProps<E>>) => {
  const {slots} = use(DateInputGroupContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.inputContainer, className)}
      data-slot="date-input-group-input-container"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

DateInputGroupInputContainer.displayName = "HeroUI.DateInputGroup.InputContainer";

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Suffix
 * -----------------------------------------------------------------------------------------------*/
interface DateInputGroupSuffixProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const DateInputGroupSuffix = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: DateInputGroupSuffixProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DateInputGroupSuffixProps<E>>) => {
  const {slots} = use(DateInputGroupContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.suffix, className)}
      data-slot="date-input-group-suffix"
      {...(props as any)}
    >
      {children}
    </dom.div>
  );
};

DateInputGroupSuffix.displayName = "HeroUI.DateInputGroup.Suffix";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DateInputGroupRoot,
  DateInputGroupInput,
  DateInputGroupInputContainer,
  DateInputGroupSegment,
  DateInputGroupPrefix,
  DateInputGroupSuffix,
};

export type {
  DateInputGroupRootProps,
  DateInputGroupInputProps,
  DateInputGroupInputContainerProps,
  DateInputGroupSegmentProps,
  DateInputGroupPrefixProps,
  DateInputGroupSuffixProps,
};
