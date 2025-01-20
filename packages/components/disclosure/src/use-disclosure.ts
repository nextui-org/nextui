import type {DisclosureSlots, DisclosureVariantProps, SlotsToClasses} from "@heroui/theme";

import {disclosure} from "@heroui/theme";
import {As, HTMLHeroUIProps, mapPropsVariants, PropGetter} from "@heroui/system";
import {ReactRef, useDOMRef} from "@heroui/react-utils";
import {useDisclosure as useAriaDisclosure} from "@react-aria/disclosure";
import {DisclosureProps, useDisclosureState} from "@react-stately/disclosure";
import {ReactNode, useCallback, useMemo, useRef} from "react";
import {clsx, dataAttr, objectToDeps} from "@heroui/shared-utils";
import {chain, mergeProps} from "@react-aria/utils";
import {useButton} from "@react-aria/button";
import {useFocusRing} from "@react-aria/focus";
import {usePress, useHover} from "@react-aria/interactions";
import {PressEvents} from "@react-types/shared";

export type DisclosureIndicatorProps = {
  /**
   * The current indicator, usually an arrow icon.
   */
  indicator?: ReactNode;
  /**
   * The current open status.
   */
  isExpanded?: boolean;
  /**
   * The current disabled status.
   * @default false
   */
  isDisabled?: boolean;
};

interface Props extends Omit<HTMLHeroUIProps<"div">, "title"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Start icon to be displayed inside the disclosure.
   */
  startContent?: ReactNode;
  /**
   * The accordion item `expanded` indicator, it's usually an arrow icon.
   * If you pass a function, NextUI will expose the current indicator and the open status,
   * In case you want to use a custom indicator or modify the current one.
   */
  indicator?: ReactNode | ((props: DisclosureIndicatorProps) => ReactNode) | null;
  /**
   * Customizable heading tag for Web accessibility:
   * use headings to describe content and use them consistently and semantically.
   * This will help all users to better find the content they are looking for.
   */
  HeadingComponent?: As;
  /**
   * The content of the component.
   */
  children?: ReactNode | null;
  title?: ReactNode | string;
  subtitle?: ReactNode | string;
  classNames?: SlotsToClasses<DisclosureSlots>;
  keepContentMounted?: boolean;
}

export type UseDisclosureProps = Props & DisclosureVariantProps & DisclosureProps & PressEvents;

export function useDisclosure(originalProps: UseDisclosureProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, disclosure.variantKeys);
  const {
    ref,
    as,
    className,
    defaultExpanded,
    onExpandedChange,
    classNames,
    title,
    subtitle,
    startContent,
    children,
    HeadingComponent = as || "h2",
    indicator,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    onClick,
  } = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);
  const {
    isDisabled,
    isExpanded: isExpandedProp,
    isCompact = false,
    hideIndicator = false,
    disableIndicatorAnimation = false,
    disableAnimation = false,
    hidden = false,
    keepContentMounted = false,
  } = originalProps;

  const slots = useMemo(
    () =>
      disclosure({
        ...variantProps,
        disableAnimation,
        disableIndicatorAnimation,
        isCompact,
        className,
      }),
    [objectToDeps(variantProps), className, disableAnimation, disableIndicatorAnimation, isCompact],
  );

  const state = useDisclosureState({
    isExpanded: isExpandedProp,
    defaultExpanded,
    onExpandedChange: (isExpanded) => {
      onExpandedChange?.(isExpanded);
    },
  });
  const isExpanded = state.isExpanded;

  const {isFocused, isFocusVisible, focusProps} = useFocusRing({
    autoFocus: originalProps?.autoFocus,
  });

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const {buttonProps: triggerProps, panelProps: contentProps} = useAriaDisclosure(
    props,
    state,
    contentRef,
  );

  const {buttonProps} = useButton(triggerProps, triggerRef);

  const {pressProps, isPressed} = usePress({
    ref: domRef,
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
  });
  const {isHovered, hoverProps} = useHover({isDisabled});

  const getBaseProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.base({class: clsx(classNames?.base, props?.className)}),
      ...props,
    }),
    [],
  );

  const getHeadingProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.heading({class: clsx(classNames?.heading, props?.className)}),
      ...props,
    }),
    [],
  );

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: triggerRef,
      className: slots.trigger({class: clsx(classNames?.trigger, props?.className)}),
      "aria-expanded": isExpanded,
      "data-expanded": isExpanded,
      "data-pressed": dataAttr(isPressed),
      "data-hover": dataAttr(isHovered),
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(isDisabled),
      "data-focus-visible": dataAttr(isFocusVisible),
      onFocus: chain(originalProps.onFocus, focusProps.onFocus),
      onBlur: chain(originalProps.onBlur, focusProps.onBlur),
      ...mergeProps(buttonProps, props, focusProps, hoverProps, pressProps, {
        onClick: chain(pressProps.onClick, onClick),
      }),
      disabled: isDisabled,
      hidden,
    }),
    [triggerProps, focusProps, pressProps, isExpanded, isDisabled, hidden],
  );

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: contentRef,
      className: slots.content({class: clsx(classNames?.content, props?.className)}),
      "data-expanded": dataAttr(isExpanded),
      ...mergeProps(contentProps, props),
    }),
    [contentProps, contentRef, isExpanded],
  );

  const getTitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-expanded": dataAttr(isExpanded),
        "data-disabled": dataAttr(isDisabled),
        className: slots.title({class: classNames?.title}),
        ...props,
      };
    },
    [slots, classNames?.title, isExpanded, isDisabled],
  );

  const getSubtitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-expanded": dataAttr(isExpanded),
        "data-disabled": dataAttr(isDisabled),
        className: slots.subtitle({class: classNames?.subtitle}),
        ...props,
      };
    },
    [slots, classNames?.subtitle, isExpanded, isDisabled],
  );

  const getIndicatorProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-expanded": dataAttr(isExpanded),
        "data-disabled": dataAttr(isDisabled),
        className: slots.indicator({class: classNames?.indicator}),
        ...props,
      };
    },
    [slots, classNames?.indicator, isExpanded, isDisabled, classNames?.indicator],
  );

  return {
    Component,
    HeadingComponent,
    domRef,
    startContent,
    classNames,
    slots,
    title,
    subtitle,
    children,
    isExpanded,
    isDisabled,
    indicator,
    hideIndicator,
    contentRef,
    keepContentMounted,
    getBaseProps,
    getTriggerProps,
    getContentProps,
    getHeadingProps,
    getTitleProps,
    getSubtitleProps,
    getIndicatorProps,
    state,
  };
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
