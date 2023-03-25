import type {FocusableProps, PressEvents} from "@react-types/shared";
import type {SlotsToClasses, CardSlots, CardReturnType, CardVariantProps} from "@nextui-org/theme";

import {card} from "@nextui-org/theme";
import {MouseEvent, useCallback, useMemo} from "react";
import {mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";
import {useHover} from "@react-aria/interactions";
import {useButton as useAriaButton} from "@react-aria/button";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {callAllHandlers, clsx, dataAttr, ReactRef} from "@nextui-org/shared-utils";
import {useDOMRef} from "@nextui-org/dom-utils";
import {useDrip} from "@nextui-org/drip";
import {AriaButtonProps} from "@react-aria/button";

export interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref: ReactRef<HTMLDivElement | null>;
  /**
   * Whether the card should show a ripple animation on press, this prop is ignored if `disableAnimation` is true or `isPressable` is false.
   * @default false
   */
  disableRipple?: boolean;

  /**
   * Whether the card should allow text selection on press. (only for pressable cards)
   * @default true
   */
  allowTextSelectionOnPress?: boolean;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Card styles={{
   *    base:"base-classes",
   *    header: "dot-classes",
   *    body: "content-classes",
   *    footer: "avatar-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<CardSlots>;
}

export type UseCardProps = Props & PressEvents & FocusableProps & CardVariantProps;

export type ContextType = {
  slots: CardReturnType;
  styles?: SlotsToClasses<CardSlots>;
  isDisabled?: CardVariantProps["isDisabled"];
  isBordered?: CardVariantProps["isBordered"];
  isFooterBlurred?: CardVariantProps["isFooterBlurred"];
  disableAnimation?: CardVariantProps["disableAnimation"];
  fullWidth?: CardVariantProps["fullWidth"];
};

export function useCard(originalProps: UseCardProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, card.variantKeys);

  const {
    ref,
    as,
    children,
    disableRipple = false,
    onClick,
    onPress,
    autoFocus,
    className,
    styles,
    allowTextSelectionOnPress = true,
    ...otherProps
  } = props;

  const domRef = useDOMRef<HTMLDivElement>(ref);
  const Component = as || (originalProps.isPressable ? "button" : "div");

  const baseStyles = clsx(styles?.base, className);

  const {onClick: onDripClickHandler, drips} = useDrip();

  const handleDrip = (e: MouseEvent<HTMLDivElement>) => {
    if (!originalProps.disableAnimation && !disableRipple && domRef.current) {
      onDripClickHandler(e);
    }
  };

  const {buttonProps, isPressed} = useAriaButton(
    {
      onPress,
      elementType: as,
      isDisabled: !originalProps.isPressable,
      onClick: callAllHandlers(onClick, handleDrip),
      allowTextSelectionOnPress,
      ...otherProps,
    } as AriaButtonProps,
    domRef,
  );

  const {hoverProps, isHovered} = useHover({
    isDisabled: !originalProps.isHoverable,
    ...otherProps,
  });

  const {isFocusVisible, focusProps} = useFocusRing({
    autoFocus,
  });

  const slots = useMemo(
    () =>
      card({
        ...variantProps,
        isFocusVisible,
      }),
    [...Object.values(variantProps), isFocusVisible],
  );

  const context = useMemo<ContextType>(
    () => ({
      isBordered: originalProps.isBordered,
      isDisabled: originalProps.isDisabled,
      isFooterBlurred: originalProps.isFooterBlurred,
      disableAnimation: originalProps.disableAnimation,
      fullWidth: originalProps.fullWidth,
      slots,
      styles,
    }),
    [
      slots,
      styles,
      originalProps.isBordered,
      originalProps.isDisabled,
      originalProps.isFooterBlurred,
      originalProps.disableAnimation,
      originalProps.fullWidth,
    ],
  );

  const getCardProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        ref: domRef,
        className: slots.base({class: baseStyles}),
        role: originalProps.isPressable ? "button" : "section",
        tabIndex: originalProps.isPressable ? 0 : -1,
        "data-hover": dataAttr(isHovered),
        "data-pressed": dataAttr(isPressed),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-disabled": dataAttr(originalProps.isDisabled),
        ...mergeProps(
          originalProps.isPressable ? {...buttonProps, ...focusProps} : {},
          originalProps.isHoverable ? hoverProps : {},
          otherProps,
          props,
        ),
      };
    },
    [
      domRef,
      slots,
      baseStyles,
      originalProps.isPressable,
      originalProps.isHoverable,
      originalProps.isDisabled,
      isHovered,
      isPressed,
      isFocusVisible,
      buttonProps,
      focusProps,
      hoverProps,
      otherProps,
    ],
  );

  return {
    context,
    domRef,
    Component,
    styles,
    children,
    drips,
    isHovered,
    isPressed,
    isPressable: originalProps.isPressable,
    isHoverable: originalProps.isHoverable,
    disableAnimation: originalProps.disableAnimation,
    disableRipple,
    onDripClickHandler,
    isFocusVisible,
    getCardProps,
  };
}

export type UseCardReturn = ReturnType<typeof useCard>;
