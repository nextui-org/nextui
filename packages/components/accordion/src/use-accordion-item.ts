import {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import {useFocusRing} from "@react-aria/focus";
import {accordionItem} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, ReactRef, callAllHandlers, dataAttr, extractProperty} from "@nextui-org/shared-utils";
import {NodeWithProps, useAccordionItem as useBaseAccordion} from "@nextui-org/aria-utils";
import {useCallback, useMemo} from "react";
import {mergeProps} from "@react-aria/utils";

import {AccordionItemBaseProps} from "./base/accordion-item-base";
import {useAccordionContext} from "./accordion-context";

export interface Props<T extends object> extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * The item node.
   */
  item: NodeWithProps<T, AccordionItemBaseProps<T>>;
}

export type UseAccordionItemProps<T extends object = {}> = Props<T> & AccordionItemBaseProps;

export function useAccordionItem<T extends object = {}>(props: UseAccordionItemProps<T>) {
  const groupContext = useAccordionContext();

  const {
    ref,
    as,
    item,
    styles = item.props?.styles,
    className = item.props?.className,
    isCompact = extractProperty(
      "isCompact",
      false,
      groupContext,
      item.props,
    ) as AccordionItemBaseProps["isCompact"],
    isDisabled: isDisabledProp = extractProperty(
      "isDisabled",
      false,
      groupContext,
      item.props,
    ) as AccordionItemBaseProps["isDisabled"],
    hideDivider = extractProperty(
      "hideDivider",
      false,
      groupContext,
      item.props,
    ) as AccordionItemBaseProps["hideDivider"],
    hideIndicator = extractProperty(
      "hideIndicator",
      false,
      groupContext,
      item.props,
    ) as AccordionItemBaseProps["hideIndicator"],
    disableAnimation = extractProperty(
      "disableAnimation",
      false,
      groupContext,
      item.props,
    ) as AccordionItemBaseProps["disableAnimation"],
    disableIndicatorAnimation = extractProperty(
      "disableIndicatorAnimation",
      false,
      groupContext,
      item.props,
    ) as AccordionItemBaseProps["disableIndicatorAnimation"],
    onFocusChange,
    motionProps = item.props?.motionProps ?? groupContext?.motionProps,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef<HTMLButtonElement>(ref);

  const state = groupContext?.state;
  const isDisabled = state.disabledKeys.has(item.key) || isDisabledProp || groupContext?.isDisabled;
  const isOpen = state.selectionManager.isSelected(item.key);

  const {buttonProps: buttonCompleteProps, regionProps} = useBaseAccordion(
    {item, isDisabled},
    {...state, focusedKey: groupContext.focusedKey},
    domRef,
  );

  const {onFocus: onFocusButton, onBlur: onBlurButton, ...buttonProps} = buttonCompleteProps;

  const {isFocused, isFocusVisible, focusProps} = useFocusRing({
    autoFocus: item.props?.autoFocus,
  });

  const handleFocus = () => {
    onFocusChange?.(true);
  };

  const handleBlur = () => {
    onFocusChange?.(false);
  };

  const slots = useMemo(
    () =>
      accordionItem({
        isCompact,
        isDisabled,
        hideDivider,
        hideIndicator,
        isFocusVisible,
        disableAnimation,
        disableIndicatorAnimation,
      }),
    [
      isCompact,
      isDisabled,
      hideDivider,
      hideIndicator,
      isFocusVisible,
      disableAnimation,
      disableIndicatorAnimation,
    ],
  );

  const baseStyles = clsx(styles?.base, className);

  const getBaseProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        className: slots.base({class: baseStyles}),
        ...mergeProps(otherProps, props),
      };
    },
    [baseStyles, otherProps],
  );

  const getButtonProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        ref: domRef,
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-focused": dataAttr(isFocused),
        "data-disabled": dataAttr(isDisabled),
        className: slots.trigger({class: styles?.trigger}),
        onFocus: callAllHandlers(
          handleFocus,
          onFocusButton,
          focusProps.onFocus,
          otherProps.onFocus,
          item.props?.onFocus,
        ),
        onBlur: callAllHandlers(
          handleBlur,
          onBlurButton,
          focusProps.onBlur,
          otherProps.onBlur,
          item.props?.onBlur,
        ),
        ...mergeProps(buttonProps, props),
      };
    },
    [domRef, isFocusVisible, isDisabled, isFocused, buttonProps, focusProps, slots, styles],
  );

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.content({class: styles?.content}),
        ...mergeProps(regionProps, props),
      };
    },
    [slots, styles, regionProps, isOpen, isDisabled],
  );

  const getIndicatorProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.indicator({class: styles?.indicator}),
        ...props,
      };
    },
    [slots, styles, isOpen, isDisabled],
  );

  const getHeadingProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        className: slots.heading({class: styles?.heading}),
        ...props,
      };
    },
    [slots, styles],
  );

  const getTitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        className: slots.title({class: styles?.title}),
        ...props,
      };
    },
    [slots, styles],
  );

  const getSubtitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        className: slots.subtitle({class: styles?.subtitle}),
        ...props,
      };
    },
    [slots, styles],
  );

  return {
    Component,
    item,
    slots,
    styles,
    domRef,
    isOpen,
    isDisabled,
    disableAnimation,
    motionProps,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getContentProps,
    getIndicatorProps,
    getTitleProps,
    getSubtitleProps,
  };
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>;
