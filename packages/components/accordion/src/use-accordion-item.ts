import {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import {useFocusRing} from "@react-aria/focus";
import {accordionItem} from "@nextui-org/theme";
import {clsx, callAllHandlers, dataAttr} from "@nextui-org/shared-utils";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {NodeWithProps} from "@nextui-org/aria-utils";
import {useAriaAccordionItem} from "@nextui-org/use-aria-accordion-item";
import {useCallback, useMemo} from "react";
import {chain, filterDOMProps, mergeProps} from "@react-aria/utils";
import {useHover, usePress} from "@react-aria/interactions";

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

  const {ref, as, item, onFocusChange} = props;

  const {
    classNames,
    className,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    motionProps = groupContext?.motionProps,
    isCompact = groupContext?.isCompact ?? false,
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    hideIndicator = groupContext.hideIndicator ?? false,
    disableAnimation = groupContext.disableAnimation ?? false,
    disableIndicatorAnimation = groupContext.disableIndicatorAnimation ?? false,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    onClick,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef<HTMLButtonElement>(ref);

  const state = groupContext?.state;
  const isDisabled = state.disabledKeys.has(item.key) || isDisabledProp || groupContext?.isDisabled;
  const isOpen = state.selectionManager.isSelected(item.key);

  const {buttonProps: buttonCompleteProps, regionProps} = useAriaAccordionItem(
    {item, isDisabled},
    {...state, focusedKey: groupContext.focusedKey},
    domRef,
  );

  const {onFocus: onFocusButton, onBlur: onBlurButton, ...buttonProps} = buttonCompleteProps;

  const {isFocused, isFocusVisible, focusProps} = useFocusRing({
    autoFocus: item.props?.autoFocus,
  });

  const {isHovered, hoverProps} = useHover({isDisabled});

  const {pressProps, isPressed} = usePress({
    ref: domRef,
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
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
        hideIndicator,
        disableAnimation,
        disableIndicatorAnimation,
      }),
    [isCompact, isDisabled, hideIndicator, disableAnimation, disableIndicatorAnimation],
  );

  const baseStyles = clsx(classNames?.base, className);

  const getBaseProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.base({class: baseStyles}),
        ...mergeProps(filterDOMProps(otherProps, {labelable: true}), props),
      };
    },
    [baseStyles, otherProps, slots, item.props, isOpen, isDisabled],
  );

  const getButtonProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        ref: domRef,
        "data-open": dataAttr(isOpen),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-disabled": dataAttr(isDisabled),
        "data-hover": dataAttr(isHovered),
        "data-pressed": dataAttr(isPressed),
        className: slots.trigger({class: classNames?.trigger}),
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
        ...mergeProps(buttonProps, hoverProps, pressProps, props),
        onClick: chain(pressProps.onClick, onClick),
      };
    },
    [
      domRef,
      slots,
      isOpen,
      isFocusVisible,
      isPressed,
      isHovered,
      isDisabled,
      isFocused,
      buttonProps,
      focusProps,
      pressProps,
      hoverProps,
      otherProps,
      item.props,
      handleFocus,
      handleBlur,
      classNames,
    ],
  );

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.content({class: classNames?.content}),
        ...mergeProps(regionProps, props),
      };
    },
    [slots, classNames, regionProps, isOpen, isDisabled],
  );

  const getIndicatorProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.indicator({class: classNames?.indicator}),
        ...props,
      };
    },
    [slots, classNames?.indicator, isOpen, isDisabled],
  );

  const getHeadingProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.heading({class: classNames?.heading}),
        ...props,
      };
    },
    [slots, classNames?.heading, isOpen, isDisabled],
  );

  const getTitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.title({class: classNames?.title}),
        ...props,
      };
    },
    [slots, classNames?.title, isOpen, isDisabled],
  );

  const getSubtitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.subtitle({class: classNames?.subtitle}),
        ...props,
      };
    },
    [slots, classNames, isOpen, isDisabled],
  );

  return {
    Component,
    item,
    slots,
    classNames,
    domRef,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    isOpen,
    isDisabled,
    hideIndicator,
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
